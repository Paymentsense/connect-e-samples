package demo

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/google/uuid"
)

type paymentToken struct {
	ID                    string            `json:"id" form:"id" query:"id"`
	CurrencyCode          string            `json:"currencyCode" form:"currencyCode" query:"currencyCode"`
	Amount                string            `json:"amount" form:"amount" query:"amount"`
	TransactionType       string            `json:"transactionType" form:"transactionType" query:"transactionType"`
	TransactionSource     string            `json:"transactionSource" form:"transactionSource" query:"transactionSource"`
	OrderID               string            `json:"orderId" form:"orderId" query:"orderId"`
	OrderDescription      string            `json:"orderDescription" form:"orderDescription" query:"orderDescription"`
	UserAgent             string            `json:"userAgent" form:"userAgent" query:"userAgent"`
	UserEmailAddress      string            `json:"userEmailAddress" form:"userEmailAddress" query:"userEmailAddress"`
	UserPhoneNumber       string            `json:"userPhoneNumber" form:"userPhoneNumber" query:"userPhoneNumber"`
	UserIpAddress         string            `json:"userIpAddress" form:"userIpAddress" query:"userIpAddress"`
	GatewayUsername       string            `json:"gatewayUsername" form:"gatewayUsername" query:"gatewayUsername"`
	GatewayPassword       string            `json:"gatewayPassword" form:"gatewayPassword" query:"gatewayPassword"`
	UserAddress1          string            `json:"userAddress1" form:"userAddress1" query:"userAddress1"`
	UserAddress2          string            `json:"userAddress2" form:"userAddress2" query:"userAddress2"`
	UserAddress3          string            `json:"userAddress3" form:"userAddress3" query:"userAddress3"`
	UserAddress4          string            `json:"userAddress4" form:"userAddress4" query:"userAddress4"`
	UserCity              string            `json:"userCity" form:"userCity" query:"userCity"`
	UserState             string            `json:"userState" form:"userState" query:"userState"`
	UserPostcode          string            `json:"userPostcode" form:"userPostcode" query:"userPostcode"`
	UserCountryCode       string            `json:"userCountryCode" form:"userCountryCode" query:"userCountryCode"`
	HostBaseURL           string            `json:"hostBaseUrl" form:"hostBaseUrl" query:"hostBaseUrl"`
	AccessToken           string            `json:"accessToken" form:"accessToken" query:"accessToken"`
	CrossReference        string            `json:"crossReference" form:"crossReference" query:"crossReference"`
	MerchantURL           string            `json:"merchantUrl" form:"merchantUrl" query:"merchantUrl"`
	MerchantTransactionID string            `json:"merchantTransactionId" form:"merchantTransactionId" query:"merchantTransactionId"`
	PreviousTransactionID string            `json:"previousTransactionId" form:"previousTransactionId" query:"previousTransactionId"`
	WebhookURL            string            `json:"webhookUrl" form:"webhookUrl" query:"webhookUrl"`
	CustomerID            string            `json:"customerId" form:"customerId" query:"customerId"`
	PaymentMethodID       string            `json:"paymentMethodId" form:"paymentMethodId" query:"paymentMethodId"`
	WaitPreExecute        bool              `json:"waitPreExecute" form:"waitPreExecute" query:"waitPreExecute"`
	MetaData              map[string]string `json:"metaData,omitempty"`
	CDNBaseURL            string            `json:"cndBaseUrl" form:"cdnBaseUrl" query:"cdnBaseUrl"`
}

type paymentTokenResponse struct {
	ID        string `json:"id"`
	ExpiresAt int64  `json:"expiresAt"`
}

type paymentInfo struct {
	TransactionDateTime string `json:"transactionDateTime"`
	StatusCode          int32  `json:"statusCode" form:"statusCode"`
	Message             string `json:"message"`
	CrossReference      string `json:"crossReference"`
	AuthCode            string `json:"authCode" form:"authCode"`
	CardNumber          string `json:"cardNumber"`
	ExpiryDate          string `json:"expiryDate"`
	CardType            string `json:"cardType"`
	CardName            string `json:"cardName"`
}

type checkoutComplete struct {
	ConnectAuthCode           string `json:"connectAuthCode" form:"connectAuthCode"`
	ConnectStatusCode         int    `json:"connectStatusCode" form:"connectStatusCode"`
	ConnectPaymentToken       string
	ConnectUserEmailAddress   string
	ConnectBillingAddress1    string
	ConnectBillingAddress2    string
	ConnectBillingAddress3    string
	ConnectBillingAddress4    string
	ConnectBillingCity        string
	ConnectBillingState       string
	ConnectBillingPostcode    string
	ConnectBillingCountryCode string
}

type crossReferencePaymentRequest struct {
	CrossReference string `json:"crossReference"`
	Cv2            string `json:"cv2"`
}

type crossReferencePaymentResponse struct {
	StatusCode int32  `json:"statusCode"`
	AuthCode   string `json:"authCode"`
	Message    string `json:"message"`
}

type paymentService struct {
	apiURL string
	webURL string
	cdnURL string
	client *http.Client
}

func newPaymentService(apiURL, webURL, cdnURL string) paymentService {
	return paymentService{
		apiURL: apiURL,
		webURL: webURL,
		cdnURL: cdnURL,
		client: http.DefaultClient,
	}
}

func (p paymentService) getPaymentInfo(apiKey, id string, isSandbox bool, ipAddress string) (paymentInfo, error) {
	paymentInfo := paymentInfo{}

	if err := p.callAPI(apiKey, http.MethodGet, p.apiURL+"/payments/"+id, nil, &paymentInfo, isSandbox, ipAddress); err != nil {
		return paymentInfo, err
	}

	return paymentInfo, nil
}

func (p paymentService) createPaymentToken(apiKey string, paymentToken *paymentToken, isSandbox bool, ipAddress string) error {
	buildDefaultToken(paymentToken)

	tr := paymentTokenResponse{}
	if err := p.callAPI(apiKey, http.MethodPost, p.apiURL+"/access-tokens", paymentToken, &tr, isSandbox, ipAddress); err != nil {
		return err
	}

	paymentToken.ID = tr.ID
	paymentToken.AccessToken = tr.ID
	paymentToken.HostBaseURL = p.webURL
	paymentToken.CDNBaseURL = p.cdnURL

	return nil
}

func (p paymentService) executeCrossReferencePayment(apiKey string, token string, request crossReferencePaymentRequest, isSandbox bool, ipAddress string) (crossReferencePaymentResponse, error) {
	pr := crossReferencePaymentResponse{}

	if err := p.callAPI(apiKey, http.MethodPost, p.apiURL+"/cross-reference-payments/"+token, request, &pr, isSandbox, ipAddress); err != nil {
		return pr, err
	}

	return pr, nil
}

func (p paymentService) callAPI(apiKey, method, url string, body interface{}, response interface{}, isSandbox bool, ipAddress string) error {
	var req *http.Request
	var err error

	if body == nil {
		req, err = http.NewRequest(method, url, nil)
	} else {
		b, err := json.Marshal(body)
		if err != nil {
			return err
		}

		req, err = http.NewRequest(method, url, bytes.NewBuffer(b))
		if err != nil {
			return err
		}
	}

	if err != nil {
		return err
	}

	req.Header.Add("Authorization", "Bearer "+apiKey)
	req.Header.Add("Content-Type", "application/json")
	if isSandbox {
		//Duplicated while we rollout update
		req.Header.Add("IS-SANDBOX", "true")
		req.Header.Add("IS_SANDBOX", "true")
	}

	req.Header.Set("X-Forwarded-For", ipAddress)

	resp, err := p.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return fmt.Errorf("failed to parse HTTP response: %v", err)
		}

		return fmt.Errorf(string(body))
	}

	if response != nil {
		bodyDecoder := json.NewDecoder(resp.Body)
		if err = bodyDecoder.Decode(response); err != nil {
			return err
		}
	}

	return nil
}

func buildDefaultToken(paymentToken *paymentToken) {
	paymentToken.Amount = getValueOrDefault(paymentToken.Amount, "100")
	paymentToken.CurrencyCode = getValueOrDefault(paymentToken.CurrencyCode, "826")
	paymentToken.GatewayUsername = getValueOrDefault(paymentToken.GatewayUsername, getGatewayUsername())
	paymentToken.GatewayPassword = getValueOrDefault(paymentToken.GatewayPassword, getGatewayPassword())
	paymentToken.MerchantURL = getValueOrDefault(paymentToken.MerchantURL, getMerchantURL())
	paymentToken.OrderID = getValueOrDefault(paymentToken.OrderID, strings.Replace(uuid.New().String(), "-", "", -1))
	paymentToken.TransactionType = getValueOrDefault(paymentToken.TransactionType, "SALE")
	paymentToken.WebhookURL = getValueOrDefault(paymentToken.WebhookURL, getWebhookURL())
}
