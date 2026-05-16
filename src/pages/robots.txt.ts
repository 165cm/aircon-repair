import { affiliate } from "@data/affiliate";
import { absoluteUrl } from "@utils/paths";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
