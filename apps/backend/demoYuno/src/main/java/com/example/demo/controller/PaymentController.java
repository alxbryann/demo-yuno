package com.example.demo.controller;

import com.example.demo.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payment", description = "Payment Management API")
public class PaymentController {

    @Operation(summary = "Start a payment", description = "Initiates a new payment process")
    @PostMapping("/start")
    public StartPaymentResponse startPayment(@RequestBody StartPaymentRequest request) {
        // Mock logic
        String paymentId = UUID.randomUUID().toString();
        return new StartPaymentResponse(paymentId, "PENDING", "https://checkout.example.com/" + paymentId);
    }

    @Operation(summary = "Continue a payment", description = "Continues an existing payment with a method token")
    @PostMapping("/continue")
    public PaymentStatusResponse continuePayment(@RequestBody ContinuePaymentRequest request) {
        // Mock logic
        return new PaymentStatusResponse(request.getPaymentId(), "PROCESSING", "2023-10-27T10:00:00Z");
    }

    @Operation(summary = "Check payment status", description = "Retrieves the current status of a payment")
    @GetMapping("/status/{paymentId}")
    public PaymentStatusResponse checkStatus(@PathVariable String paymentId) {
        // Mock logic
        return new PaymentStatusResponse(paymentId, "COMPLETED", "2023-10-27T10:05:00Z");
    }

    @Operation(summary = "Get payment style", description = "Retrieves the styling configuration for the payment interface")
    @GetMapping("/style")
    public StyleResponse getStyle() {
        // Mock logic
        Map<String, String> styles = new HashMap<>();
        styles.put("borderRadius", "5px");
        styles.put("fontFamily", "Arial, sans-serif");
        return new StyleResponse("light", "#007bff", styles);
    }
}
