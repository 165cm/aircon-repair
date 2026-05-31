export const affiliate = {
  siteName: "私立 涼峰工業高校【エアコン修理科】",
  siteUrl: "https://165cm.github.io/aircon-repair",
  amazonTrackingId: "notestimatobe-22",
  disclosure:
    "当サイトには広告・アフィリエイトリンクが含まれます。私立 涼峰工業高校【エアコン修理科】は、Amazonアソシエイトとして適格販売により収入を得ています。",
  contractorAffiliateUrl: "https://curama.jp/aircon/repair/",
  cleaningAffiliateUrl: "https://curama.jp/aircon/clean/",
  jobAffiliateUrl: "https://jp.indeed.com/jobs?q=%E3%82%A8%E3%82%A2%E3%82%B3%E3%83%B3%E4%BF%AE%E7%90%86&sc=0kf%3Aocc%28LGKPS%29%3B",
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
