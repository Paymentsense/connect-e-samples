package com.paymentsense.sample.model;

// Limited subset of response fields
// Missing: billingAddress, shippingDetails
// See https://docs.connect.paymentsense.cloud/ConnectE/RestApi for full response details
public class PaymentResponse {
  private final String transactionDateTime;
  private final int statusCode;
  private final String message;
  private final String crossReference;
  private final String authCode;
  private final String cardName;
  private final String cardNumber;
  private final String expiryDate;
  private final String cardType;
  private final String userEmailAddress;

  private PaymentResponse(String transactionDateTime, int statusCode, String message, String crossReference, String authCode, 
      String cardNumber, String cardName, String expiryDate, String cardType, String userEmailAddress) {
    this.transactionDateTime = transactionDateTime;
    this.statusCode = statusCode;
    this.message = message;
    this.crossReference = crossReference;
    this.authCode = authCode;
    this.cardNumber = cardNumber;
    this.cardName = cardName;
    this.expiryDate = expiryDate;
    this.cardType = cardType;
    this.userEmailAddress = userEmailAddress;
  }

  public String getTransactionDateTime() {
    return this.transactionDateTime;
  }

  public int getStatusCode() {
    return this.statusCode;
  }

  public String getMessage() {
    return this.message;
  }

  public String getCrossReference() {
    return this.crossReference;
  }

  public String getAuthCode() {
    return this.authCode;
  }

  public String getCardNumber() {
    return this.cardNumber;
  }

  public String getCardName() {
    return this.cardName;
  }

  public String getExpiryDate() {
    return this.expiryDate;
  }

  public String getCardType() {
    return this.cardType;
  }

  public String getUserEmailAddress() {
    return this.userEmailAddress;
  }
}
