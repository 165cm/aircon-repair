const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function sitePath(path: string) {
  if (!path || path.startsWith("http") || path.startsWith("#")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) {
    return normalized;
  }
  return `${base}${normalized}`;
}

export function absoluteUrl(path: string, origin = "https://aircon-hokenshitsu.com") {
  return new URL(sitePath(path), origin).toString();
}
