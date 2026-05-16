import { amazonSearchUrl } from "./affiliate";

export type ProductCategory = {
  id: string;
  name: string;
  brand?: string;
  type?: "support" | "replacement";
  category?: "aircon-main" | "circulator" | "dehumidifier" | "air-purifier" | "remote" | "cleaning" | "drain" | "outdoor" | "comfort";
  description: string;
  symptoms: string[];
  safetyNote: string;
  amazonKeyword: string;
  image?: string;
  whyPick?: string;
  priceBand?: string;
  bestFor?: string;
  cautions?: string[];
  reviewSummary?: string;
  reviewSources?: {
    label: string;
    url: string;
  }[];
};

export const categoryLabels = {
  "aircon-main": "エアコン本体",
  circulator: "サーキュレーター",
  dehumidifier: "除湿機",
  "air-purifier": "空気清浄機",
  remote: "汎用リモコン",
  cleaning: "掃除・養生",
  drain: "ドレン対策",
  outdoor: "室外機まわり",
  comfort: "温湿度・快適"
} satisfies Record<NonNullable<ProductCategory["category"]>, string>;

export const productCategories: ProductCategory[] = [
  {
    id: "thermo-hygrometer",
    name: "SwitchBot 温湿度計",
    brand: "SwitchBot",
    type: "support",
    category: "comfort",
    description: "室温と湿度を見える化して、冷房の効きや熱中症リスクを判断しやすくします。",
    symptoms: ["冷えない", "暑い", "予防"],
    safetyNote: "体感だけで判断せず、室温が下がらない場合は早めに避暑や業者相談も検討してください。",
    amazonKeyword: "SwitchBot 温湿度計",
    image: "/images/products/switchbot-hygrometer.jpg",
    whyPick: "スマートホーム系の定番。室温・湿度を日々確認したい人向け。"
  },
  {
    id: "filter-brush",
    name: "アズマ工業 エアコンブラシ",
    brand: "アズマ工業",
    type: "support",
    category: "cleaning",
    description: "フィルターのホコリを落とし、風量低下やカビ臭の予防に役立ちます。",
    symptoms: ["冷えない", "におい", "予防"],
    safetyNote: "必ず電源を切り、フィルター以外の内部部品を無理にこすらないでください。",
    amazonKeyword: "アズマ工業 エアコンブラシ フィルター 掃除",
    image: "/images/products/azuma-ac-brush.jpg",
    whyPick: "家庭用掃除用品で探しやすく、フィルター清掃の導入商品にしやすい。"
  },
  {
    id: "drain-pump",
    name: "因幡電工 ドレンホースクリーナー",
    brand: "因幡電工",
    type: "support",
    category: "drain",
    description: "排水ホース先端の詰まりが疑われる水漏れ時に、外側から吸い出すための道具です。",
    symptoms: ["水漏れ", "排水"],
    safetyNote: "室内機の分解や高所作業が必要なら使用せず、専門業者へ相談してください。",
    amazonKeyword: "因幡電工 ドレンホースクリーナー エアコン",
    image: "/images/products/inaba-drain-cleaner.jpg",
    whyPick: "水漏れ記事からの意図が強く、外側からの詰まり確認に絞って紹介しやすい。"
  },
  {
    id: "sanei-drain-cleaner-pr871",
    name: "SANEI ドレンホースクリーナー PR871",
    brand: "SANEI",
    type: "support",
    category: "drain",
    description: "エアコンのドレンホース詰まりを外側から吸引して確認する、型番指定で探しやすい定番候補です。",
    symptoms: ["水漏れ", "排水", "予防"],
    safetyNote: "ホース内へ空気を押し込む使い方は避け、室内側へ汚水が戻る不安がある時は専門業者へ相談してください。",
    amazonKeyword: "SANEI PR871 ドレンホースクリーナー エアコン",
    image: "/images/products/inaba-drain-cleaner.jpg",
    whyPick: "公式仕様でエアコンのドレンホース詰まり解消用、φ14・φ16mm用と確認できるため、水漏れ記事の型番導線に向く。",
    priceBand: "2,000〜4,000円台",
    bestFor: "ドレンホース出口の詰まりが疑われる水漏れ",
    cautions: ["ホース径が合うか確認", "ホースに破れや穴がないか確認", "室内機の分解が必要なら使わない"],
    reviewSummary: "公式仕様で用途が明確。量販店レビューでも排水ホース詰まり用途の商品として確認できるため、汎用品より指名検索へつなげやすい候補。",
    reviewSources: [
      { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" },
      { label: "ビックカメラ商品レビュー", url: "https://www.biccamera.com/bc/item/6511911/" }
    ]
  },
  {
    id: "outdoor-cover",
    name: "山善 エアコン室外機カバー",
    brand: "山善",
    type: "support",
    category: "outdoor",
    description: "直射日光対策や周辺整理で、室外機が熱を逃がしやすい環境を作ります。",
    symptoms: ["冷えない", "室外機", "予防"],
    safetyNote: "吹き出し口や吸い込み口をふさぐカバーは逆効果です。風の通り道を確保してください。",
    amazonKeyword: "山善 エアコン 室外機カバー 日よけ",
    image: "/images/products/yamazen-outdoor-cover.jpg",
    whyPick: "夏前の予防導線と相性がよく、室外機まわりの記事から自然に案内できる。"
  },
  {
    id: "circulator",
    name: "アイリスオーヤマ サーキュレーター",
    brand: "アイリスオーヤマ",
    type: "support",
    category: "circulator",
    description: "冷気を部屋に回し、設定温度を下げすぎずに涼しさを補助します。",
    symptoms: ["冷えない", "節電", "暑い"],
    safetyNote: "エアコン本体の異常がある場合は、補助家電で無理に使い続けないでください。",
    amazonKeyword: "アイリスオーヤマ サーキュレーター 静音 エアコン 併用",
    image: "/images/products/iris-circulator.jpg",
    whyPick: "エアコン修理待ちの暑さ対策や冷気循環の補助として紹介しやすい。"
  },
  {
    id: "remote-battery",
    name: "ELPA エアコン用汎用リモコン",
    brand: "ELPA",
    type: "support",
    category: "remote",
    description: "リモコン不調の切り分けに使いやすい、低コストの確認用品です。",
    symptoms: ["リモコン", "電源"],
    safetyNote: "本体側のランプ点滅やブレーカー異常がある場合は、本体故障の可能性もあります。",
    amazonKeyword: "ELPA エアコン 汎用 リモコン",
    image: "/images/products/elpa-universal-remote.jpg",
    whyPick: "リモコン不調は購入意図が明確で、安価な切り分け商品として案内しやすい。"
  },
  {
    id: "aircon-6tatami",
    name: "6畳用 ルームエアコン 工事費込み候補",
    brand: "買い替え候補",
    type: "replacement",
    category: "aircon-main",
    description: "寝室や個室向け。修理費が高い、10年以上使っている、冷えない症状が続く時の比較候補です。",
    symptoms: ["冷えない", "買い替え", "修理比較"],
    safetyNote: "本体購入時は標準工事の範囲、専用コンセント、配管穴、電圧、追加工事費を必ず確認してください。",
    amazonKeyword: "エアコン 6畳 工事費込み ルームエアコン",
    image: "/images/products/aircon-6tatami.jpg",
    whyPick: "単身・個室ニーズが強く、冷えない記事からの買い替え導線に向く。",
    priceBand: "7〜10万円台",
    bestFor: "寝室、子供部屋、書斎などの小部屋",
    cautions: ["標準工事込みか確認", "室外機置き場と配管穴を確認", "木造/鉄筋で畳数目安が変わる"]
  },
  {
    id: "daikin-e-6tatami-s225ates",
    name: "ダイキン Eシリーズ S225ATES-W 6畳候補",
    brand: "ダイキン",
    type: "replacement",
    category: "aircon-main",
    description: "6畳向けのスタンダード機。コンパクト室内機と内部クリーン系機能を重視して比較したい候補です。",
    symptoms: ["冷えない", "買い替え", "6畳", "修理比較"],
    safetyNote: "購入前に標準工事、配管穴、専用コンセント、既設機の取り外し、追加工事費を確認してください。",
    amazonKeyword: "ダイキン S225ATES-W 6畳 工事費込み",
    image: "/images/products/aircon-6tatami.jpg",
    whyPick: "価格.comの6畳用ランキングで上位候補として確認でき、Eシリーズの指名検索需要を取り込みやすい。",
    priceBand: "8〜12万円台",
    bestFor: "寝室、子供部屋、書斎などの6畳前後",
    cautions: ["工事費込みか確認", "無線LANなど必要機能は別途確認", "木造最上階や西日が強い部屋では8畳以上も比較"],
    reviewSummary: "価格比較サイトの仕様情報で6畳用Eシリーズとして確認でき、販売店情報では高さ250mmのコンパクト室内機、水内部クリーン、ストリーマ内部クリーンが訴求点。",
    reviewSources: [
      { label: "価格.com仕様", url: "https://kakaku.com/item/K0001676976/spec/" },
      { label: "製品仕様参考", url: "https://www.takara-co.jp/products/S225ATES-W" }
    ]
  },
  {
    id: "mitsubishi-gv-6tatami-msz-gv2225",
    name: "三菱 霧ヶ峰 GV MSZ-GV2225-W 6畳候補",
    brand: "三菱電機",
    type: "replacement",
    category: "aircon-main",
    description: "基本機能と品質重視の6畳向けスタンダード候補。シンプルな買い替え記事と相性が良い機種です。",
    symptoms: ["冷えない", "買い替え", "6畳", "修理比較"],
    safetyNote: "設置場所、室外機置き場、既設配管利用の可否、工事保証を販売店へ確認してください。",
    amazonKeyword: "三菱 霧ヶ峰 MSZ-GV2225-W 6畳 工事費込み",
    image: "/images/products/aircon-6tatami.jpg",
    whyPick: "三菱公式でGVシリーズの6畳モデルが確認でき、シンプル機能を求める買い替え層に提案しやすい。",
    priceBand: "8〜12万円台",
    bestFor: "寝室、子供部屋、はじめての買い替え",
    cautions: ["自動掃除など上位機能の有無を確認", "左右風向など操作範囲を確認", "販売店ごとの工事内容を確認"],
    reviewSummary: "公式情報では基本機能と品質にこだわったスタンダードモデル。低価格帯の比較軸として、ダイキンEシリーズと並べやすい候補。",
    reviewSources: [
      { label: "三菱電機 GVシリーズ", url: "https://www.mitsubishielectric.co.jp/home/kirigamine_setsubi/product/2025_gv/index.html" },
      { label: "三菱電機WIN2K", url: "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?ccd=1040101411&pid=337788" }
    ]
  },
  {
    id: "aircon-10tatami",
    name: "10畳用 ルームエアコン 工事費込み候補",
    brand: "買い替え候補",
    type: "replacement",
    category: "aircon-main",
    description: "リビングや広めの部屋向け。畳数不足で冷えない場合は、能力に余裕のある機種を比較します。",
    symptoms: ["冷えない", "買い替え", "省エネ"],
    safetyNote: "部屋の広さ、日当たり、木造/鉄筋、電源電圧、室外機置き場を確認してから選んでください。",
    amazonKeyword: "エアコン 10畳 工事費込み ルームエアコン 省エネ",
    image: "/images/products/aircon-10tatami.jpg",
    whyPick: "リビング需要があり、修理より買い替えを検討する高単価導線にしやすい。",
    priceBand: "10〜15万円台",
    bestFor: "10畳前後のリビング、ダイニング、広めの寝室",
    cautions: ["LDK続きなら能力不足に注意", "日当たりと断熱性能を確認", "追加工事費の条件を確認"]
  },
  {
    id: "daikin-e-10tatami-s285ates",
    name: "ダイキン Eシリーズ S285ATES-W 10畳候補",
    brand: "ダイキン",
    type: "replacement",
    category: "aircon-main",
    description: "10畳前後の部屋向け。能力不足で冷えない時に、スタンダード機として比較しやすい候補です。",
    symptoms: ["冷えない", "買い替え", "10畳", "省エネ"],
    safetyNote: "10畳でもLDK続き・西日・木造最上階なら14畳候補や現地相談も比較してください。",
    amazonKeyword: "ダイキン S285ATES-W 10畳 工事費込み",
    image: "/images/products/aircon-10tatami.jpg",
    whyPick: "10畳用の型番検索需要を取り込みやすく、S225ATESと同じEシリーズ導線でサイズ違い比較を作れる。",
    priceBand: "9〜14万円台",
    bestFor: "独立した10畳前後のリビング、広めの寝室",
    cautions: ["100V/15A条件を確認", "LDK続きでは能力不足に注意", "配管延長や既設撤去費を確認"],
    reviewSummary: "販売店情報で10畳用Eシリーズとして確認でき、コンパクト室内機・水内部クリーン系を訴求できる定番候補。",
    reviewSources: [
      { label: "製品仕様参考", url: "https://www.takara-co.jp/products/S285ATES-W" },
      { label: "エアコンマーケット製品情報", url: "https://www.ac-mrk.com/s285ates-w/" }
    ]
  },
  {
    id: "mitsubishi-gv-10tatami-msz-gv2825",
    name: "三菱 霧ヶ峰 GV MSZ-GV2825-W 10畳候補",
    brand: "三菱電機",
    type: "replacement",
    category: "aircon-main",
    description: "10畳用の霧ヶ峰GVシリーズ候補。基本性能重視で、リビングの買い替え比較に入れやすい機種です。",
    symptoms: ["冷えない", "買い替え", "10畳", "省エネ"],
    safetyNote: "LDK続き、キッチン熱、西日が強い部屋では14畳用も比較してください。",
    amazonKeyword: "三菱 霧ヶ峰 MSZ-GV2825-W 10畳 工事費込み",
    image: "/images/products/aircon-10tatami.jpg",
    whyPick: "三菱公式で10畳GVモデルが確認でき、ダイキンEシリーズとの比較記事を作りやすい。",
    priceBand: "9〜14万円台",
    bestFor: "10畳前後の独立リビング、広めの個室",
    cautions: ["室内機サイズと設置スペースを確認", "必要な清潔機能の有無を確認", "工事保証の条件を確認"],
    reviewSummary: "価格.comで10畳用GVシリーズの仕様確認ができ、公式では基本機能と品質にこだわるスタンダードモデルとして掲載。",
    reviewSources: [
      { label: "三菱電機 GVシリーズ", url: "https://www.mitsubishielectric.co.jp/home/kirigamine_setsubi/product/2025_gv/index.html" },
      { label: "価格.com仕様", url: "https://kakaku.com/item/K0001676757/spec/" }
    ]
  },
  {
    id: "aircon-14tatami",
    name: "14畳用 省エネ ルームエアコン候補",
    brand: "買い替え候補",
    type: "replacement",
    category: "aircon-main",
    description: "LDKなど広い部屋向け。古い大型機の修理費が高い時は、省エネ性能も含めて比較します。",
    symptoms: ["冷えない", "買い替え", "省エネ"],
    safetyNote: "200V機種や専用回路が必要な場合があります。電気工事の要否は販売店・工事業者に確認してください。",
    amazonKeyword: "エアコン 14畳 省エネ 工事費込み ルームエアコン",
    image: "/images/products/aircon-14tatami.jpg",
    whyPick: "商品単価が高く、省エネ・修理費比較の記事から収益導線を作りやすい。",
    priceBand: "15〜30万円台",
    bestFor: "14畳前後のLDK、家族が集まる広めの部屋",
    cautions: ["200V機種が多い", "専用回路の確認が必要", "室外機サイズと搬入経路を確認"]
  },
  {
    id: "daikin-e-14tatami-s405atep",
    name: "ダイキン Eシリーズ S405ATEP-W 14畳候補",
    brand: "ダイキン",
    type: "replacement",
    category: "aircon-main",
    description: "14畳LDK向けの高単価候補。200V機種として、修理費が高い大型機の買い替え比較に向きます。",
    symptoms: ["冷えない", "買い替え", "14畳", "省エネ"],
    safetyNote: "200V・専用回路・室外機サイズ・搬入経路を必ず確認し、電気工事は資格者へ依頼してください。",
    amazonKeyword: "ダイキン S405ATEP-W 14畳 工事費込み",
    image: "/images/products/aircon-14tatami.jpg",
    whyPick: "14畳は成約単価が高く、価格.comでも注目度の高い型番として確認できるため買い替え導線の主力にしやすい。",
    priceBand: "15〜25万円台",
    bestFor: "14畳前後のLDK、家族が集まる広めの部屋",
    cautions: ["単相200V条件を確認", "専用回路とコンセント形状を確認", "室外機特殊設置費を確認"],
    reviewSummary: "価格比較サイトの仕様情報で14畳用Eシリーズとして確認でき、販売店情報では14畳用・単相200V・水内部クリーン機能付きとして掲載。",
    reviewSources: [
      { label: "価格.com仕様", url: "https://kakaku.com/item/K0001676982/spec/" },
      { label: "製品仕様参考", url: "https://www.takara-co.jp/products/S405ATEP-W" }
    ]
  },
  {
    id: "corona-dehumidifier",
    name: "コロナ 衣類乾燥除湿機 CDシリーズ候補",
    brand: "コロナ",
    type: "support",
    category: "dehumidifier",
    description: "梅雨〜夏の湿度、部屋干し、結露対策に使いやすいコンプレッサー式除湿機の候補です。",
    symptoms: ["除湿", "結露", "カビ", "省エネ"],
    safetyNote: "エアコンの故障を除湿機でごまかさず、水漏れや異音がある場合は本体点検を優先してください。",
    amazonKeyword: "コロナ 衣類乾燥除湿機 CD コンプレッサー",
    image: "/images/products/corona-dehumidifier.jpg",
    whyPick: "梅雨と夏の湿度対策記事から、エアコン周辺の関連家電として収益導線を広げやすい。",
    priceBand: "3〜5万円台",
    bestFor: "部屋干し、結露、湿度が高い部屋",
    cautions: ["低温時は方式に注意", "タンク容量と連続排水の有無を確認"]
  },
  {
    id: "sharp-air-purifier",
    name: "空気清浄機 加湿なしモデル候補",
    brand: "空気清浄機候補",
    type: "support",
    category: "air-purifier",
    description: "エアコンのカビ臭やホコリが気になる部屋で、空気環境を補助する関連家電です。",
    symptoms: ["におい", "カビ", "予防"],
    safetyNote: "空気清浄機はエアコン内部のカビを除去しません。臭いが強い場合は清掃や業者相談が必要です。",
    amazonKeyword: "空気清浄機 小型 静音 リビング",
    image: "/images/products/sharp-air-purifier.jpg",
    whyPick: "カビ臭・アレルギー不安の記事から関連購入につなげやすい。",
    priceBand: "1〜4万円台",
    bestFor: "ホコリ、花粉、軽い生活臭が気になる部屋",
    cautions: ["フィルター交換費用を確認", "エアコン内部洗浄の代わりにはならない"]
  },
  {
    id: "aircon-cleaning-cover",
    name: "エアコン掃除用 養生カバー",
    brand: "掃除用品候補",
    type: "support",
    category: "cleaning",
    description: "家庭で外装やフィルター周辺を掃除する時の水はね・汚れ落ち対策に使うカバーです。",
    symptoms: ["掃除", "におい", "予防"],
    safetyNote: "養生しても電装部・送風ファン・基板への洗浄液噴射は避けてください。",
    amazonKeyword: "エアコン 掃除 養生カバー 洗浄カバー",
    image: "/images/products/aircon-cleaning-cover.jpg",
    whyPick: "掃除記事の客単価を少し上げつつ、安全注意も同時に伝えられる。",
    priceBand: "1,500〜3,000円台",
    bestFor: "家庭での外装・フィルター周辺掃除",
    cautions: ["サイズを確認", "内部洗浄の安全を保証するものではない"]
  },
  {
    id: "drain-insect-cap",
    name: "ドレンホース防虫キャップ",
    brand: "ドレン対策候補",
    type: "support",
    category: "drain",
    description: "ドレンホース出口から虫やゴミが入るのを防ぎ、水漏れや詰まり再発を予防します。",
    symptoms: ["水漏れ", "排水", "予防"],
    safetyNote: "目詰まりすると排水を妨げます。取り付け後も定期的に確認してください。",
    amazonKeyword: "エアコン ドレンホース 防虫キャップ",
    image: "/images/products/drain-insect-cap.jpg",
    whyPick: "水漏れ解決後の再発予防として自然に提案できる低単価CV商品。",
    priceBand: "500〜1,500円台",
    bestFor: "ドレンホース詰まりの再発予防",
    cautions: ["ホース径に合うサイズを選ぶ", "年1回以上の点検が必要"]
  },
  {
    id: "outdoor-vibration-pad",
    name: "室外機用 防振ゴム",
    brand: "室外機まわり候補",
    type: "support",
    category: "outdoor",
    description: "室外機の振動が床やベランダに響く時の補助用品です。",
    symptoms: ["異音", "室外機", "予防"],
    safetyNote: "室外機は重量物です。持ち上げ作業が不安定になる場合は無理をしないでください。",
    amazonKeyword: "室外機 防振ゴム 防振マット エアコン",
    image: "/images/products/outdoor-vibration-pad.jpg",
    whyPick: "室外機の異音・振動記事から具体的に提案しやすい。",
    priceBand: "1,000〜3,000円台",
    bestFor: "ベランダや木造2階の室外機振動対策",
    cautions: ["設置面が平らか確認", "転倒防止を優先"]
  }
];

export const supportProducts = productCategories.filter((product) => product.type !== "replacement");
export const replacementProducts = productCategories.filter((product) => product.type === "replacement");

export function productsForSymptom(symptom: string) {
  return productCategories.filter((product) => product.symptoms.includes(symptom));
}

export function productById(id: string) {
  return productCategories.find((product) => product.id === id);
}

export function productsByIds(ids: string[]) {
  return ids.map(productById).filter((product): product is ProductCategory => Boolean(product));
}

export function productUrl(product: ProductCategory) {
  return amazonSearchUrl(product.amazonKeyword);
}
