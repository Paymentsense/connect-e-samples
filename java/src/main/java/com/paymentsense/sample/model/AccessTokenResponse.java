package com.paymentsense.sample.model;

public class AccessTokenResponse {
    private final String id;
    private final int expiresAt;

    private AccessTokenResponse(String id, int expiresAt) {
        this.id = id;
        this.expiresAt = expiresAt;
    }
    
    public String getId() {
        return this.id;
    }

    public int getExpiresAt() {
        return this.expiresAt;
    }
}
