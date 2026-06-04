const serviceAffiliateUrls = {
  contractor: "https://curama.jp/",
  cleaning: "https://curama.jp/",
  jobs: "https://jp.indeed.com/jobs?q=%E3%82%A8%E3%82%A2%E3%82%B3%E3%83%B3%E4%BF%AE%E7%90%86&sc=0kf%3Aocc%28LGKPS%29%3B"
};

export const affiliate = {
  siteName: "エアコン保健室",
  siteUrl: "https://aircon-hokenshitsu.com",
  amazonTrackingId: "notestimatobe-22",
  disclosure:
    "当サイトには広告・アフィリエイトリンクが含まれます。エアコン保健室は、Amazonアソシエイトとして適格販売により収入を得ています。",
  contractorAffiliateUrl: serviceAffiliateUrls.contractor,
  cleaningAffiliateUrl: serviceAffiliateUrls.cleaning,
  jobAffiliateUrl: serviceAffiliateUrls.jobs,
  contactFormUrl: "/contact/"
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
