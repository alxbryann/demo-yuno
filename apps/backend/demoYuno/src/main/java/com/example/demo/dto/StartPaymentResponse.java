package com.example.demo.dto;

public class StartPaymentResponse {
    private String paymentId;
    private String status;
    private String redirectUrl;

    public StartPaymentResponse(String paymentId, String status, String redirectUrl) {
        this.paymentId = paymentId;
        this.status = status;
        this.redirectUrl = redirectUrl;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }
}
