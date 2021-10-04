package com.paymentsense.sample.model;

// Limited subset of request fields
// See https://docs.connect.paymentsense.cloud/ConnectE/RestApi for a full list of request parameters
public class AccessTokenRequest {
    private String gatewayUsername;
    private String gatewayPassword;
    private final String currencyCode;
    private final String amount;
    private final String transactionType;
    private final String orderId;
    private final String orderDescription;
    private String merchantUrl;

    public AccessTokenRequest(String gatewayUsername, String gatewayPassword, String currencyCode, String amount,
        String transactionType, String orderId, String orderDescription, String merchantUrl) {
        this.gatewayUsername = gatewayUsername;
        this.gatewayPassword = gatewayPassword;
        this.currencyCode = currencyCode;
        this.amount = amount;
        this.transactionType = transactionType;
        this.orderId = orderId;
        this.orderDescription = orderDescription;
        this.merchantUrl = merchantUrl;
    }

    public String getGatewayUsername() {
        return this.gatewayUsername;
    }

    public void setGatewayUsername(String gatewayUsername) {
        this.gatewayUsername = gatewayUsername;
    }

    public String getGatewayPassword() {
        return this.gatewayPassword;
    }

    public void setGatewayPassword(String gatewayPassword) {
        this.gatewayPassword = gatewayPassword;
    }

    public String getCurrencyCode() {
        return this.currencyCode;
    }

    public String getAmount() {
        return this.amount;
    }

    public String getTransactionType() {
        return this.transactionType;
    }

    public String getOrderId() {
        return this.orderId;
    }

    public String getOrderDescription() {
        return this.orderDescription;
    }

    public String getMerchantUrl() {
        return this.merchantUrl;
    }

    public void setMerchantUrl(String merchantUrl) {
        this.merchantUrl = merchantUrl;
    }
}