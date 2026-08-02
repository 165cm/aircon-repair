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
  // 全ページ上部の帯用。スマホで1行に収まる長さにし、
  // Amazonアソシエイトを含む正式表記は全ページのフッターと /disclaimer/ に置く。
  disclosureShort: "広告・アフィリエイトリンクを含みます",
  contractorAffiliateUrl: serviceAffiliateUrls.contractor,
  cleaningAffiliateUrl: serviceAffiliateUrls.cleaning,
  jobAffiliateUrl: serviceAffiliateUrls.jobs,
  contactFormUrl: "/contact/",
  xUrl: "https://x.com/aircon_hoken",
  xHandle: "@aircon_hoken"
};

export const isAmazonConfigured =
  affiliate.amazonTrackingId !== "YOUR-AMAZON-ASSOCIATE-ID-22";

// 検索エンジン登録とアクセス計測の設定。
// 値が空文字のうちは <head> に何も出力されないため、安全にコミットできる。
// 取得したIDを貼るだけで有効化される。
export const analytics = {
  // Google Search Console: HTMLタグ確認の content 値だけ（例: <meta name="google-site-verification" content="ここ">）
  googleSiteVerification: "",
  // Bing Webmaster Tools: 確認用 meta の content 値（msvalidate.01）
  bingSiteVerification: "",
  // Google Analytics 4 の測定ID（G-XXXXXXXXXX）。アクセス数・流入元の計測用。
  ga4MeasurementId: "G-RGPGP9ZZG2",
  // Microsoft Clarity のプロジェクトID（任意）。ヒートマップ・行動記録用。
  clarityProjectId: ""
};

export function amazonSearchUrl(keyword: string) {
  const params = new URLSearchParams({
    k: keyword,
    tag: affiliate.amazonTrackingId
  });

  return `https://www.amazon.co.jp/s?${params.toString()}`;
}

export function amazonProductUrl(asin: string) {
  const params = new URLSearchParams({
    tag: affiliate.amazonTrackingId
  });

  return `https://www.amazon.co.jp/dp/${asin}?${params.toString()}`;
}
