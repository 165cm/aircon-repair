/// <reference types="astro/client" />

interface Window {
  __airconAmazonTrackingReady?: boolean;
  dataLayer?: Array<Record<string, unknown>>;
}
