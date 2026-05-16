import { affiliate } from "@data/affiliate";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", affiliate.siteUrl).toString()}\n`, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
