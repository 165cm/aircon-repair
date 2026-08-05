export type CleaningAffiliateStatus = "partnered" | "pending";

export type CleaningAffiliateService = {
  id: string;
  name: string;
  status: CleaningAffiliateStatus;
  programId: string;
  bestFor: string;
  summary: string;
  priceNote?: string;
  areaNote?: string;
  affiliateUrl?: string;
  impressionUrl?: string;
  ctaLabel?: string;
  featured?: boolean;
};

export const cleaningAffiliateServices: CleaningAffiliateService[] = [
  {
    id: "yourmystar",
    name: "ユアマイスター",
    status: "partnered",
    programId: "s00000020962001",
    bestFor: "全国対応と予約の簡単さを優先",
    summary: "日程とメニューを選び、対応するプロを提案してもらいたい人向けです。",
    priceNote: "通常タイプ10,800円（税込）から",
    areaNote: "日本全国対応",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B9YLG+G2Q42+4HQS+6E71E",
    impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B9YLG+G2Q42+4HQS+6E71E",
    ctaLabel: "空き日程と料金を確認する",
    featured: true
  },
  {
    id: "r-cleaning",
    name: "アールクリーニング",
    status: "partnered",
    programId: "s00000022947001",
    bestFor: "一都三県で価格を抑えたい",
    summary: "東京・神奈川・千葉・埼玉の対象地域で、キャンペーン価格を重視する人向けです。",
    priceNote: "通常タイプ10,780円（税込）の掲載を確認",
    areaNote: "一都三県中心",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B9YLG+9IYGI+4X26+5YRHE",
    impressionUrl: "https://www18.a8.net/0.gif?a8mat=4B9YLG+9IYGI+4X26+5YRHE",
    ctaLabel: "対象地域とキャンペーンを確認"
  },
  {
    id: "seifu",
    name: "エアコンクリーニング清風",
    status: "partnered",
    programId: "s00000020635002",
    bestFor: "お掃除機能付きや専門性を重視",
    summary: "エアコン専門店へ、型番を伝えて正式な作業可否と見積もりを確認したい人向けです。",
    priceNote: "通常タイプ13,200円（税込）",
    areaNote: "関東・関西・東海の対象地域",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B9YLG+BB99U+4F7Y+BX3J6",
    impressionUrl: "https://www18.a8.net/0.gif?a8mat=4B9YLG+BB99U+4F7Y+BX3J6",
    ctaLabel: "型番から無料見積もりを確認"
  },
  {
    id: "house-cleaning-on",
    name: "ハウスクリーニングのオン",
    status: "partnered",
    programId: "s00000020635001",
    bestFor: "定額料金と追加費用の分かりやすさ",
    summary: "事前の現地見積もりなしで、出張料・交通費や土日祝の割増を避けたい人向けです。",
    priceNote: "通常タイプ13,200円（税込）",
    areaNote: "関東・関西・東海・福岡中心",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B9YLG+GO5PU+4F7Y+5YJRM",
    impressionUrl: "https://www16.a8.net/0.gif?a8mat=4B9YLG+GO5PU+4F7Y+5YJRM",
    ctaLabel: "定額料金と対応地域を確認"
  }
];

export const pendingCleaningAffiliateServices: CleaningAffiliateService[] = [
  {
    id: "kajitaku-aircon",
    name: "カジタク（エアコンクリーニング）",
    status: "pending",
    programId: "s00000022597002",
    bestFor: "大手グループと仕上がり保証を重視",
    summary: "提携承認後に、料金・保証条件・対象地域を再確認して掲載予定です。"
  },
  {
    id: "duskin",
    name: "ダスキン",
    status: "pending",
    programId: "s00000008131011",
    bestFor: "大手の作業手順や窓口を重視",
    summary: "提携承認後に、地域別料金と対象店舗を確認して掲載予定です。"
  },
  {
    id: "bears",
    name: "ベアーズ",
    status: "pending",
    programId: "s00000022841003",
    bestFor: "Web予約で完結したい",
    summary: "提携承認後に、対象地域と最新プランを確認して掲載予定です。"
  },
  {
    id: "osouji-kakumei",
    name: "おそうじ革命",
    status: "pending",
    programId: "s00000017949001",
    bestFor: "定額制と再作業制度を比較したい",
    summary: "提携承認後に、最新料金と保証条件を確認して掲載予定です。"
  },
  {
    id: "house-cleaning-110",
    name: "ハウスクリーニング110番",
    status: "pending",
    programId: "s00000015223035",
    bestFor: "全国対応の相談窓口を比較したい",
    summary: "提携承認後に、加盟店対応・見積もり条件を確認して掲載予定です。"
  },
  {
    id: "osouji-honpo",
    name: "おそうじ本舗",
    status: "pending",
    programId: "s00000026415001",
    bestFor: "店舗網と完全分解オプションを重視",
    summary: "提携承認後に、改定後料金と対象機種を確認して掲載予定です。"
  },
  {
    id: "toho-gas-cleaning",
    name: "東邦ガスくらし ハウスクリーニング",
    status: "pending",
    programId: "s00000027185001",
    bestFor: "愛知・岐阜・三重で地域企業を重視",
    summary: "提携承認後に、対象地域と最新料金を確認して掲載予定です。"
  }
];

export const primaryCleaningAffiliate = cleaningAffiliateServices.find((service) => service.featured) ?? cleaningAffiliateServices[0];
