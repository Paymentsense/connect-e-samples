package com.paymentsense.sample.model;

public class CrossReferencePaymentRequest {
  private final String crossReference;
  private final String cv2;

  public CrossReferencePaymentRequest(String crossReference, String cv2) {
    this.crossReference = crossReference;
    this.cv2 = cv2;
  }

  public String getCrossReference() {
    return this.crossReference;
  }

  public String getCv2() {
    return this.cv2;
  }
}
