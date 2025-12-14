package com.example.demo.dto;

public class PaymentStatusResponse {
    private String paymentId;
    private String status;
    private String lastUpdated;

    public PaymentStatusResponse(String paymentId, String status, String lastUpdated) {
        this.paymentId = paymentId;
        this.status = status;
        this.lastUpdated = lastUpdated;
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

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
