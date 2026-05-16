export const affiliate = {
  siteName: "エアコン難民レスキュー",
  siteUrl: "https://aircon-refuge.example.com",
  amazonTrackingId: "notestimatobe-22",
  disclosure:
    "当サイトは広告・アフィリエイトリンクを含みます。Amazonのアソシエイトとして、エアコン難民レスキューは適格販売により収入を得ています。",
  contractorAffiliateUrl: "https://example.com/aircon-contractor-affiliate",
  jobAffiliateUrl: "https://example.com/hvac-jobs-affiliate",
  privacyContact: "contact@example.com"
};

export const isAmazonConfigured =
  affiliate.amazonTrackingId !== "YOUR-AMAZON-ASSOCIATE-ID-22";

export function amazonSearchUrl(keyword: string) {
  const params = new URLSearchParams({
    k: keyword,
    tag: affiliate.amazonTrackingId
  });

  return `https://www.amazon.co.jp/s?${params.toString()}`;
}
