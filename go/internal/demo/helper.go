package demo

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
)

func getApiKey(r *http.Request) string {
	apiKey := r.URL.Query().Get("key")
	if apiKey != "" {
		return apiKey
	}

	return getConnectKey()
}

func getApiHostURL() string {
	return os.Getenv("API_URL")
}

func getWebHostURL() string {
	return os.Getenv("WEB_URL")
}

func getConnectKey() string {
	return os.Getenv("CONNECT_E_KEY")
}

func getPort() string {
	return getEnvOrDefault("PORT", "8080")
}

func getGatewayUsername() string {
	return os.Getenv("GATEWAY_USERNAME")
}

func getGatewayPassword() string {
	return os.Getenv("GATEWAY_PASSWORD")
}

func getMerchantURL() string {
	return os.Getenv("MERCHANT_URL")
}

func getWebhookURL() string {
	webhookURL := os.Getenv("WEBHOOK_URL")

	if webhookURL != "" {
		webhookURL += "/webhooks"
	}
	return webhookURL
}

func getSandboxFlag(c echo.Context) bool {
	return c.QueryParam("isSandbox") == "true"
}

func getCDNURL() string {
	return os.Getenv("CDN_URL")
}

func getEnvOrDefault(key string, d string) string {
	osVar := os.Getenv(key)
	if osVar == "" {
		return d
	}
	return osVar
}

func getValueOrDefault(v string, d string) string {
	if v == "" {
		return d
	}
	return v
}

func getUserIP(r *http.Request) string {
	forwarded := r.Header.Get("X-Forwarded-For")
	if forwarded != "" {
		ips := strings.Split(forwarded, ",")

		if len(ips) > 0 {
			return strings.Trim(ips[0], " ")
		}

		return forwarded
	}

	return r.RemoteAddr
}

func getCurrencyCode() string {
	countryCode := strings.ToLower(os.Getenv("COUNTRY_CODE"))

	// Refer https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes to expand and add more currency codes
	if countryCode != "" {
		switch countryCode {
		case "gb":
			return "826"
		case "ie":
			fallthrough
		case "es":
			fallthrough
		case "it":
			return "978"
		default:
			fmt.Println("Falling back to currency code 826")
			return "826"
		}

	}
	fmt.Println("Country Code not speciied in enviornment")
	return "826"

}
