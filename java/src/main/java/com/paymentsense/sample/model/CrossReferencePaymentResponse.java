package com.paymentsense.sample.model;

public class CrossReferencePaymentResponse {
  private final int statusCode;
  private final String authCode;
  private final String message;
  private final String paReq;
  private final String acsUrl;
  private final String md;
  private final String stepUpUrl;
  private final String jwt;

  private CrossReferencePaymentResponse(int statusCode, String authCode, String message, String paReq, String acsUrl,
      String md, String stepUpUrl, String jwt) {
    this.statusCode = statusCode;
    this.authCode = authCode;
    this.message = message;
    this.paReq = paReq;
    this.acsUrl = acsUrl;
    this.md = md;
    this.stepUpUrl = stepUpUrl;
    this.jwt = jwt;
  }

  public int getStatusCode() {
    return this.statusCode;
  }

  public String getAuthCode() {
    return this.authCode;
  }

  public String getMessage() {
    return this.message;
  }

  public String getPaReq() {
    return this.paReq;
  }

  public String getAcsUrl() {
    return this.acsUrl;
  }

  public String getMd() {
    return this.md;
  }

  public String getStepUpUrl() {
    return this.stepUpUrl;
  }

  public String getJwt() {
    return this.jwt;
  }
}
