package demo

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type Endpoint struct {
	paymentService paymentService
	webhooks       map[string]time.Time
}

func NewEndpoint(paymentService paymentService) Endpoint {
	webhooks := make(map[string]time.Time)

	return Endpoint{
		paymentService: paymentService,
		webhooks:       webhooks,
	}
}

func (e Endpoint) Init() (*gin.Engine, error) {
	var relativePath = "./"

	if _, err := os.Stat("web"); err != nil {
		relativePath = "../../"
	}

	r := gin.Default()
	r.LoadHTMLGlob(relativePath + "web/*/**.html")

	r.GET("/", e.standard)
	r.GET("/wallet", e.wallet)
	r.GET("/complete/:id", e.standardComplete)
	r.GET("/checkout", e.checkout)
	r.POST("/checkout-complete", e.checkoutComplete)
	r.POST("/refund", e.refund)
	r.GET("/recurring", e.recurring)
	r.GET("/standard-address", e.standardAddress)
	r.POST("/webhooks", e.addWebhook)
	r.GET("/webhooks", e.listWebhooks)
	r.GET("/health-check", func(c *gin.Context) {
		c.String(http.StatusOK, "%s", "Ok")
	})
	r.GET("/angular", e.angular)
	r.Static("/angular", relativePath+"web/app")
	r.GET("/configure", func(c *gin.Context) {
		c.HTML(http.StatusOK, "config.html", nil)
	})
	api := r.Group("/api")
	{
		api.GET("/access-token", e.accessToken)
	}

	return r, nil
}

func (e Endpoint) standard(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "standard.html", paymentToken)
}

func (e Endpoint) wallet(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "wallet.html", paymentToken)
}

func (e Endpoint) standardComplete(c *gin.Context) {
	e.addHeaders(c.Writer)

	id := c.Param("id")

	paymentInfo, err := e.paymentService.getPaymentInfo(getApiKey(c.Request), id, getSandboxFlag(c))
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment info. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "complete.html", paymentInfo)
}

func (e Endpoint) checkout(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "checkout.html", paymentToken)
}

func (e Endpoint) checkoutComplete(c *gin.Context) {
	e.addHeaders(c.Writer)

	checkoutComplete := checkoutComplete{}
	if err := c.Bind(&checkoutComplete); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.HTML(http.StatusOK, "checkout-complete.html", checkoutComplete)
}

func (e Endpoint) refund(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	request := crossReferencePaymentRequest{
		CrossReference: paymentToken.CrossReference,
	}

	result, err := e.paymentService.executeCrossReferencePayment(getApiKey(c.Request), paymentToken.AccessToken, request, getSandboxFlag(c))
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to execute cross reference payment. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "refund-complete.html", result)
}

func (e Endpoint) recurring(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "recurring-payment.html", paymentToken)
}

func (e Endpoint) standardAddress(c *gin.Context) {
	e.addHeaders(c.Writer)

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	c.HTML(http.StatusOK, "standard-address.html", paymentToken)
}

func (e Endpoint) addWebhook(c *gin.Context) {
	m := struct {
		ID string `json:"id" form:"id"`
	}{}

	if err := c.Bind(&m); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	e.webhooks[m.ID] = time.Now()
}

func (e Endpoint) listWebhooks(c *gin.Context) {
	writer, err := json.Marshal(e.webhooks)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Data(http.StatusOK, "application/json", writer)
}

func (e Endpoint) angular(c *gin.Context) {
	e.addHeaders(c.Writer)

	m := struct {
		HostBaseURL string `json:"hostBaseUrl" form:"hostBaseUrl"`
	}{
		HostBaseURL: getWebHostURL(),
	}

	c.HTML(http.StatusOK, "index.html", m)
}

func (e Endpoint) accessToken(c *gin.Context) {
	c.Writer.Header().Add("Access-Control-Allow-Origin", "*")

	paymentToken, err := e.getPaymentToken(c)
	if err != nil {
		c.String(http.StatusBadRequest, "error trying to get payment token. err: %v", err)
		return
	}

	tkn := paymentTokenResponse{
		ID: paymentToken.ID,
	}
	writer, err := json.Marshal(tkn)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Data(http.StatusOK, "plain/text", writer)
}

func (e Endpoint) addHeaders(w http.ResponseWriter) {
	w.Header().Add("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
	w.Header().Add("Content-Security-Policy", "default-src 'self' * 'unsafe-inline' *.paymentsense.cloud *.appspot.com *.bootstrapcdn.com fonts.googleapis.com fonts.gstatic.com; frame-ancestors 'none'; frame-src *;")
}

func (e Endpoint) getPaymentToken(c *gin.Context) (paymentToken, error) {
	paymentToken := paymentToken{}
	if err := c.Bind(&paymentToken); err != nil {
		return paymentToken, err
	}

	if paymentToken.ID != "" {
		paymentToken.AccessToken = paymentToken.ID
		paymentToken.HostBaseURL = e.paymentService.webURL
		return paymentToken, nil
	}

	if err := e.paymentService.createPaymentToken(getApiKey(c.Request), &paymentToken, getSandboxFlag(c)); err != nil {
		return paymentToken, err
	}

	return paymentToken, nil
}
