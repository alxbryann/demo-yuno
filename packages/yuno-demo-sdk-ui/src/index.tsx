import React from "react";

export interface YunoIframeProps {
  url: string;
  width?: string;
  height?: string;
}

export function YunoIframe({
  url,
  width = "100%",
  height = "600px",
}: YunoIframeProps) {
  return (
    <iframe
      src={url}
      style={{
        width,
        height,
        border: "none",
        borderRadius: "8px",
      }}
      title="Yuno Checkout"
      allow="payment"
    />
  );
}

export default YunoIframe;
