"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  // JSON que viene de tu checkout builder
  const schema = {
    theme: {
      primaryColor: "#7C3AED",
      radius: 12,
    },
    fields: [
      { type: "text", label: "Full name" },
      { type: "card", label: "Card number" },
    ],
  };

  // Escuchar el "token" que envía el iframe
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type === "PAYMENT_TOKEN") {
        console.log("Token recibido:", event.data.token);

        // aquí normalmente llamarías a tu backend
        // fetch("/api/pay", { method: "POST", body: JSON.stringify({ token }) })
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Pasamos el schema al iframe (simple)
  const iframeUrl =
    "http://localhost:3001/checkout" +
    "?schema=" +
    encodeURIComponent(JSON.stringify(schema));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4">Checkout</h1>

        {/* 👇 AQUÍ SE INCRUSTA EL IFRAME */}
        <iframe src={iframeUrl} className="w-full h-[320px] border rounded" />

        <p className="text-xs text-gray-500 mt-2">Payment handled securely</p>
      </div>
    </div>
  );
}
