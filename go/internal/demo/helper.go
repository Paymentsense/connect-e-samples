package demo

import (
	"net/http"
	"os"
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
