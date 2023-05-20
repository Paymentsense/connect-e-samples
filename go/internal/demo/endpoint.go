package demo

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

type endpoint struct {
	paymentService paymentService
	webhooks       map[string]time.Time
}

func newEndpoint(paymentService paymentService) *endpoint {
	webhooks := make(map[string]time.Time)

	return &endpoint{
		paymentService: paymentService,
		webhooks:       webhooks,
	}
}

func (e endpoint) init() (*echo.Echo, error) {
	var relativePath = "./"

	if _, err := os.Stat("web"); err != nil {
		relativePath = "../../"
	}

	r := echo.New()
	r.Renderer = newRenderer(relativePath + "web/*/**.html")

	r.GET("/", e.standard)
	r.GET("/complete/:id", e.standardComplete)
	r.GET("/checkout", e.checkout)
	r.POST("/checkout-complete", e.checkoutComplete)
	r.POST("/refund", e.refund)
	r.GET("/recurring", e.recurring)
	r.GET("/standard-address", e.standardAddress)
	r.GET("/standard-billing-address", e.standardBillingAddress)
	r.POST("/webhooks", e.addWebhook)
	r.GET("/webhooks", e.listWebhooks)
	r.GET("/health-check", func(c echo.Context) error {
		return c.String(http.StatusOK, http.StatusText(http.StatusOK))
	})
	r.GET("/configure", func(c echo.Context) error {
		return c.Render(http.StatusOK, "config.html", nil)
	})
	r.Static("/.well-known", relativePath+"assets")

	// angular endpoints
	r.GET("/angular", e.angular)
	r.Static("/angular", relativePath+"web/app")
	api := r.Group("/api")
	{
		api.GET("/access-token", e.accessToken)
	}

	r.HTTPErrorHandler = func(err error, context echo.Context) {
		context.Logger().Errorf("error processing %s : %+v", context.Path(), err)
		r.DefaultHTTPErrorHandler(err, context)
	}

	return r, nil
}

func (e endpoint) standard(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "standard.html", paymentToken)
}

func (e endpoint) standardComplete(c echo.Context) error {
	id := c.Param("id")

	sandboxFlag := getSandboxFlag(c)
	key := getApiKey(c.Request())
	paymentInfo, err := e.paymentService.getPaymentInfo(key, id, sandboxFlag, getUserIP(c.Request()))
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "complete.html", paymentInfo)
}

func (e endpoint) checkout(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "checkout.html", paymentToken)
}

func (e endpoint) checkoutComplete(c echo.Context) error {
	checkoutComplete := checkoutComplete{}
	if err := c.Bind(&checkoutComplete); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.Render(http.StatusOK, "checkout-complete.html", checkoutComplete)
}

func (e endpoint) refund(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	request := crossReferencePaymentRequest{
		CrossReference: paymentToken.CrossReference,
	}

	result, err := e.paymentService.executeCrossReferencePayment(getApiKey(c.Request()), paymentToken.AccessToken, request, getSandboxFlag(c), getUserIP(c.Request()))
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "refund-complete.html", result)
}

func (e endpoint) recurring(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "recurring-payment.html", paymentToken)
}

func (e endpoint) standardAddress(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "standard-address.html", paymentToken)
}

func (e endpoint) standardBillingAddress(c echo.Context) error {
	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	return c.Render(http.StatusOK, "standard-billing-address.html", paymentToken)
}

func (e endpoint) addWebhook(c echo.Context) error {
	m := struct {
		ID string `json:"id" form:"id"`
	}{}

	if err := c.Bind(&m); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	e.webhooks[m.ID] = time.Now()

	return nil
}

func (e endpoint) listWebhooks(c echo.Context) error {
	writer, err := json.Marshal(e.webhooks)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.Blob(http.StatusOK, echo.MIMEApplicationJSON, writer)
}

func (e endpoint) angular(c echo.Context) error {
	m := struct {
		HostBaseURL string `json:"hostBaseUrl" form:"hostBaseUrl"`
	}{
		HostBaseURL: getWebHostURL(),
	}

	return c.Render(http.StatusOK, "index.html", m)
}

func (e endpoint) accessToken(c echo.Context) error {
	c.Request().Header.Add("Access-Control-Allow-Origin", "*")

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		return err
	}

	tkn := paymentTokenResponse{
		ID: paymentToken.ID,
	}
	writer, err := json.Marshal(tkn)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.Blob(http.StatusOK, echo.MIMETextPlain, writer)
}

func (e endpoint) getPaymentToken(c echo.Context) (paymentToken, error) {
	paymentToken := paymentToken{}
	if err := c.Bind(&paymentToken); err != nil {
		return paymentToken, err
	}

	metaDataString := c.QueryParam("metadatastring")
	if metaDataString != "" {
		metaData := map[string]string{}
		for _, row := range strings.Split(metaDataString, ",") {
			kv := strings.Split(row, ":")
			if len(kv) == 2 && len(kv[0]) > 0 && len(kv[1]) > 0 {
				metaData[kv[0]] = kv[1]
			}
		}
		if len(metaData) > 0 {
			paymentToken.MetaData = metaData
		}
	}

	if paymentToken.ID != "" {
		paymentToken.AccessToken = paymentToken.ID
		paymentToken.HostBaseURL = e.paymentService.webURL
		return paymentToken, nil
	}

	if err := e.paymentService.createPaymentToken(getApiKey(c.Request()), &paymentToken, getSandboxFlag(c), getUserIP(c.Request())); err != nil {
		return paymentToken, err
	}

	return paymentToken, nil
}
