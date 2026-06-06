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
  makerRecommendations?: {
    maker: string;
    bestFor: string;
    strength: string;
    strengthKeyword?: string;
    weakness: string;
    weaknessKeyword?: string;
    howToChoose: string;
    howToChooseKeyword?: string;
    amazonKeyword?: string;
    isPick?: boolean;
    source: {
      label: string;
      url: string;
    };
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
    cautions: ["標準工事込みか確認", "室外機置き場と配管穴を確認", "木造/鉄筋で畳数目安が変わる"],
    reviewSummary: "6畳は価格差が出にくい反面、寝室・子供部屋では静かさ、手入れのしやすさ、狭い壁面への設置性で満足度が変わります。安さだけでなく、室内機サイズと内部清潔機能を見て選ぶのが現実的です。",
    makerRecommendations: [
      {
        maker: "ダイキン",
        bestFor: "寝室や書斎で、無難に長く使える定番を選びたい人",
        strength: "Eシリーズは6畳から18畳まで型番がそろい、畳数表や電源条件を公式仕様で確認しやすい。空調専業メーカーとして、購入前相談やサポート導線も探しやすいです。",
        weakness: "6畳の低価格帯では、上位機のような自動掃除・高度センサーまで求めると予算が上がります。シンプル機で十分かを先に決めると選びやすいです。",
        howToChoose: "迷ったら最初の比較軸。木造最上階や西日が強い部屋は、同じダイキンでも8畳用も並べて見ます。",
        source: { label: "ダイキン Eシリーズ仕様", url: "https://www.ac.daikin.co.jp/roomaircon/products/e_series/spec" }
      },
      {
        maker: "三菱電機 霧ヶ峰",
        bestFor: "子供部屋や高齢者の部屋で、基本性能と見守り系の安心感を重視したい人",
        strength: "GVシリーズは基本機能と品質にこだわったスタンダードモデル。高温みまもり、はずせるボディ、清潔コート熱交換器など、初心者にも意味が伝わりやすい機能がまとまっています。",
        weakness: "GVシリーズでは左右風向が手動調整など、上位機ほど全自動ではありません。風向を細かく自動制御したい部屋は上位シリーズも比較します。",
        howToChoose: "6畳の個室で、機能を盛りすぎず安心して選びたい時の本命候補。リモコン操作の分かりやすさも確認します。",
        source: { label: "三菱電機 GVシリーズ", url: "https://www.mitsubishielectric.co.jp/home/kirigamine_setsubi/product/2025_gv/index.html" }
      },
      {
        maker: "富士通ゼネラル ノクリア",
        bestFor: "窓上・窓横など、室内機を置ける壁面が限られる6畳部屋",
        strength: "Cシリーズは横幅728mm・高さ250mmのコンパクトモデル。狭いスペースにも設置しやすく、熱交換器加熱除菌も訴求されています。",
        weakness: "コンパクトさを優先すると、上位機の気流制御や省エネ機能とは別軸の選び方になります。設置性が問題ない部屋では他社の清潔機能やセンサーも比較したいです。",
        howToChoose: "梁・カーテンレール・窓位置で普通サイズが厳しい時に優先。購入前に室内機寸法と左右の余白を測ります。",
        source: { label: "ノクリア Cシリーズ", url: "https://www.generalww.com/jp/products/aircon/2026/lineup/nocria-c/index.html" }
      },
      {
        maker: "COMFEE'",
        bestFor: "6畳の個室で、価格とシンプルさを優先して候補を広げたい人",
        strength: "2026年モデルの6畳機を公式に展開。海外系ブランドらしく、必要機能に絞った低価格候補として比較しやすいです。",
        weakness: "国内大手に比べると、修理窓口・工事対応・長期の部品入手性は購入前に確認したいところです。",
        howToChoose: "最安候補として見るなら、販売元、工事保証、メーカー保証、返品条件までセットで確認します。",
        amazonKeyword: "COMFEE エアコン 6畳 工事費込み",
        isPick: true,
        source: { label: "COMFEE' エアコン", url: "https://www.feelcomfee.com/jp/products/air-conditioner" }
      }
    ]
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
    id: "aircon-8tatami",
    name: "8畳用 ルームエアコン 工事費込み候補",
    brand: "買い替え候補",
    type: "replacement",
    category: "aircon-main",
    description: "子供部屋・夫婦寝室・書斎向け。6畳では能力不足を感じる時や、木造・西日の部屋で比較したい候補です。",
    symptoms: ["冷えない", "買い替え", "8畳", "修理比較"],
    safetyNote: "本体購入時は標準工事の範囲、専用コンセント、配管穴、電圧、追加工事費を必ず確認してください。",
    amazonKeyword: "エアコン 8畳 工事費込み ルームエアコン",
    image: "/images/products/aircon-6tatami.jpg",
    whyPick: "6畳寝室からのサイズアップ需要と、木造・西日条件の部屋からの流入に向く。",
    priceBand: "8〜13万円台",
    bestFor: "子供部屋、夫婦寝室、在宅勤務の書斎",
    cautions: ["標準工事込みか確認", "室外機置き場と配管穴を確認", "木造最上階・西日では10畳も比較"],
    reviewSummary: "8畳は6畳用で妥協するか、10畳用まで上げるかで迷いやすいサイズです。子供部屋・夫婦寝室・在宅勤務の書斎なら、温度ムラ、清潔機能、夜間の使いやすさを優先すると選びやすくなります。",
    makerRecommendations: [
      {
        maker: "三菱電機 霧ヶ峰",
        bestFor: "子供部屋・夫婦寝室で、暑さの見守りと手入れのしやすさを重視したい人",
        strength: "GVシリーズは8畳モデルも用意され、基本機能と品質を重視。高温みまもりやはずせるボディなど、家族の個室で安心につながる機能を説明しやすいです。",
        weakness: "高度な人感センサーや自動風向制御を求めるなら上位シリーズの検討が必要です。価格だけでGVに決めず、欲しい便利機能の有無を確認します。",
        howToChoose: "子供部屋・寝室の買い替えで、複雑な機能より分かりやすい安心感を優先する時に向きます。",
        source: { label: "三菱電機 GVシリーズ", url: "https://www.mitsubishielectric.co.jp/home/kirigamine_setsubi/product/2025_gv/index.html" }
      },
      {
        maker: "パナソニック エオリア",
        bestFor: "寝室で空気の清潔感やニオイ対策も気になる人",
        strength: "JシリーズはナノイーX搭載のスタンダードモデル。エアコン内部だけでなく、部屋の空気に対する清潔訴求が分かりやすいです。",
        weakness: "清潔機能の試験値は実使用空間そのものではなく、カビを完全に除去する機能でもありません。フィルター掃除や換気は別に必要です。",
        howToChoose: "寝室のニオイ、花粉、カビ不安を軽くしたい人向け。自動掃除の有無やアプリ対応はシリーズごとに確認します。",
        source: { label: "パナソニック Jシリーズ", url: "https://panasonic.jp/housing-aircon/Jseries.html" }
      },
      {
        maker: "ダイキン",
        bestFor: "在宅勤務の書斎など、毎日長く使う8畳部屋",
        strength: "Eシリーズは8畳モデルを含む基本ラインが公式仕様で見やすく、畳数・電源・配管条件を確認しやすい。相談窓口やサポート導線も初心者向きです。",
        weakness: "低価格帯では機能がシンプルです。長時間運転の省エネや快適性まで重視するなら、同じダイキンでも上位シリーズと比較します。",
        howToChoose: "迷った時の基準メーカー。木造・西日・在宅勤務で暑さが残るなら10畳用も比較します。",
        source: { label: "ダイキン Eシリーズ仕様", url: "https://www.ac.daikin.co.jp/roomaircon/products/e_series/spec" }
      },
      {
        maker: "TCL",
        bestFor: "8畳の寝室・書斎で、AI節電や優しい気流など新しさも試したい人",
        strength: "AI節電シリーズは8畳モデルを含み、AI自動運転、優しい気流、室温パトロールなど、機能の個性がはっきりしています。",
        weakness: "日本の家庭用エアコンとしては新興寄りなので、販売店の工事体制と故障時の相談先を必ず確認します。",
        howToChoose: "価格だけでなく、設置工事込みか、保証窓口が国内で明確か、レビュー件数が十分かを見ます。",
        amazonKeyword: "TCL エアコン 8畳 工事費込み",
        isPick: true,
        source: { label: "TCL AI節電シリーズ", url: "https://www.tcl.com/jp/ja/air-conditioners/ai-energy-saving-ac" }
      }
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
    cautions: ["LDK続きなら能力不足に注意", "日当たりと断熱性能を確認", "追加工事費の条件を確認"],
    reviewSummary: "10畳はリビング利用が増え、冷房の効きだけでなく空気清浄、内部清潔、日当たりへの対応が効いてきます。LDK続きやキッチン熱があるなら、10畳表記だけで決めず14畳用も比較します。",
    makerRecommendations: [
      {
        maker: "ダイキン",
        bestFor: "独立した10畳リビングで、まず外しにくい基準機を選びたい人",
        strength: "Eシリーズの仕様表では10畳クラスを含め、電源・畳数・配管条件を確認しやすい。公式にも部屋条件を考慮する必要があるとされ、初心者にサイズ選びの注意を伝えやすいです。",
        weakness: "標準機だけでLDK続きや西日までカバーできるとは限りません。部屋条件が重い場合は14畳用や上位シリーズも見ます。",
        howToChoose: "独立した10畳なら最初の比較候補。キッチン・吹き抜け・南西向きなら能力アップを検討します。",
        source: { label: "ダイキン Eシリーズ仕様", url: "https://www.ac.daikin.co.jp/roomaircon/products/e_series/spec" }
      },
      {
        maker: "日立 白くまくん",
        bestFor: "リビングで内部の汚れやカビ対策を重視したい人",
        strength: "Dシリーズは凍結洗浄 Light、カビバスター、ステンレス・クリーンを搭載するベーシックモデル。熱交換器や通風路の清潔訴求が強く、リビング利用と相性が良いです。",
        weakness: "凍結洗浄は汚れやカビをすべて洗い流すものではなく、運転条件によって動作しない場合もあります。過信せずフィルター掃除は必要です。",
        howToChoose: "キッチンに近いリビングや、カビ臭が気になりやすい部屋で比較候補に入れます。",
        source: { label: "日立 Dシリーズ", url: "https://kadenfan.hitachi.co.jp/ra/lineup/dseries_26/" }
      },
      {
        maker: "東芝 大清快",
        bestFor: "風が直接当たるのが苦手なリビング、ペットや家族が長くいる部屋",
        strength: "V-DZシリーズはプラズマ空清＆無風感空調を訴求し、高さ250mmの室内機、無線LAN内蔵など機能も豊富。リビングの快適性で比較しやすいです。",
        weakness: "ハイスペック寄りなので価格は上がりやすく、奥行きも確認が必要です。清潔機能や空清機能が本当に必要かを見極めます。",
        howToChoose: "風あたりの不快感を減らしたい、空気清浄も一台でまとめたい時の候補です。",
        source: { label: "東芝 V-DZシリーズ", url: "https://www.toshiba-lifestyle.com/jp/air_conditioners/v-dz/" }
      },
      {
        maker: "ハイセンス",
        bestFor: "10畳前後で、日本向け仕様の海外メーカーも価格比較に入れたい人",
        strength: "Mシリーズは日本向け専用ラインで生産されるルームエアコンとして訴求。基本機能と価格のバランスを見たい時に候補になります。",
        weakness: "国内大手ほど修理網の印象が強いブランドではないため、購入店の工事保証とメーカー保証の受け方を確認します。",
        howToChoose: "テレビ家電でブランドに馴染みがある人向け。エアコンでは設置後サポートまで見て判断します。",
        amazonKeyword: "ハイセンス エアコン 10畳 工事費込み",
        isPick: true,
        source: { label: "ハイセンス Mシリーズ", url: "https://www.hisense.co.jp/aircon/ha-m-series-e/" }
      }
    ]
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
    cautions: ["200V機種が多い", "専用回路の確認が必要", "室外機サイズと搬入経路を確認"],
    reviewSummary: "14畳は本体価格も工事費も上がりやすく、メーカー選びの差が出ます。省エネ・清潔機能・気流制御だけでなく、200V電源、室外機寸法、追加工事費まで同時に確認します。",
    makerRecommendations: [
      {
        maker: "日立 白くまくん",
        bestFor: "LDKで油汚れ・カビ・室外機の汚れまで気になる家庭",
        strength: "Dシリーズでも室内機・室外機の凍結洗浄、カビバスター、ステンレス・クリーンを訴求。キッチン近くのLDKで説明しやすい清潔機能がまとまっています。",
        weakness: "凍結洗浄は汚れやカビをすべて除去するものではありません。LDKの油汚れが強い家では、定期的なフィルター掃除と専門清掃も前提にします。",
        howToChoose: "14畳LDKで清潔機能を重視するなら本命候補。室外機凍結洗浄は設定条件も確認します。",
        source: { label: "日立 Dシリーズ", url: "https://kadenfan.hitachi.co.jp/ra/lineup/dseries_26/" }
      },
      {
        maker: "パナソニック エオリア",
        bestFor: "家族が長く過ごすLDKで、省エネ・清潔・空気ケアをまとめて考えたい人",
        strength: "Xシリーズは省エネ、ナノイーX、フィルターお掃除ロボットなどを訴求するハイグレードモデル。長時間使うLDKでは電気代と手入れの両面で比較軸になります。",
        weakness: "上位機は価格が高く、機能が多いぶん将来の清掃費や修理費も確認したいところです。シンプルで十分ならJ/C系も比較します。",
        howToChoose: "長時間つけっぱなしのLDKで、初期費用より10年使う前提の快適性を重視する時に向きます。",
        source: { label: "パナソニック Xシリーズ", url: "https://panasonic.jp/aircon/Xseries.html" }
      },
      {
        maker: "三菱電機 霧ヶ峰",
        bestFor: "暑さが厳しいLDKで、基本性能と耐暑運転の分かりやすさを重視したい人",
        strength: "GVシリーズは14畳モデルもあり、屋外温度50℃でも冷房運転が止まらないSTRONG冷房を訴求。標準機の範囲で基本性能を重視する人に説明しやすいです。",
        weakness: "高度なセンサー制御や自動掃除は上位シリーズの領域です。広いLDKでは、GVだけでなく上位グレードも含めて比較します。",
        howToChoose: "予算を抑えつつ14畳の基本性能を確保したい時の比較候補。200V条件は必ず確認します。",
        source: { label: "三菱電機 GVシリーズ", url: "https://www.mitsubishielectric.co.jp/home/kirigamine_setsubi/product/2025_gv/index.html" }
      },
      {
        maker: "TCL",
        bestFor: "14畳LDKで、価格を抑えつつAI節電や立体気流も見たい人",
        strength: "AI節電シリーズは14畳モデルまで展開。AI自動運転、立体気流、室温パトロールなど、低価格帯でも機能訴求が分かりやすいです。",
        weakness: "14畳は工事費と電源条件の影響が大きいため、安く見えても追加工事で総額が上がることがあります。",
        howToChoose: "本体価格に惹かれた時ほど、200V条件、標準工事範囲、販売店保証を先に確認します。",
        amazonKeyword: "TCL エアコン 14畳 工事費込み",
        isPick: true,
        source: { label: "TCL AI節電シリーズ", url: "https://www.tcl.com/jp/ja/air-conditioners/ai-energy-saving-ac" }
      }
    ]
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
    id: "aircon-18tatami",
    name: "18畳以上 大型ルームエアコン候補",
    brand: "買い替え候補",
    type: "replacement",
    category: "aircon-main",
    description: "大きなLDK・吹き抜け・広いワンルーム向け。200V・専用回路が必須になることが多く、現地調査が重要な候補です。",
    symptoms: ["冷えない", "買い替え", "大型", "省エネ"],
    safetyNote: "200V・専用回路の確認が必須です。室外機サイズと搬入経路、電気工事の必要性を販売店・業者へ必ず確認してください。",
    amazonKeyword: "エアコン 18畳 200V 工事費込み ルームエアコン 大型",
    image: "/images/products/aircon-14tatami.jpg",
    whyPick: "大空間向けで単価が高く、18畳以上の検索需要から丁寧に条件確認を促す導線に向く。",
    priceBand: "20〜40万円台以上",
    bestFor: "18畳以上のLDK、吹き抜けのある大空間",
    cautions: ["単相200V・三相など電源条件を確認", "専用回路と専用コンセントが必要", "室外機の重量・搬入経路を事前確認", "家庭用の限界を超える場合は業務用も要検討"],
    reviewSummary: "18畳以上は、カタログ畳数より現地条件が重要です。吹き抜け、二間続き、日射、断熱、200V電源、室外機重量で失敗しやすいため、メーカー比較と同時に販売店・工事業者への相談を前提にします。",
    makerRecommendations: [
      {
        maker: "ダイキン",
        bestFor: "大きなLDKで、空調メーカーの相談導線とサイズ展開を重視したい人",
        strength: "Eシリーズでも18畳程度まで仕様表で確認でき、ダイキンは購入前相談・サポート窓口が探しやすい。大空間で不安がある初心者には相談しやすさが強みです。",
        weakness: "18畳以上は標準機を型番だけで選ぶと能力不足になりがちです。吹き抜けや高断熱でない家では、上位機や現地負荷計算も必要です。",
        howToChoose: "まず相談前提の基準候補。部屋条件が重い時は、18畳表記より一段上や業務用も視野に入れます。",
        source: { label: "ダイキン Eシリーズ仕様", url: "https://www.ac.daikin.co.jp/roomaircon/products/e_series/spec" }
      },
      {
        maker: "三菱重工 ビーバーエアコン",
        bestFor: "広いLDKで、素早く冷やす・暖める力感を重視したい人",
        strength: "Sシリーズはフラッグシップモデルで、主に6畳から26畳までのラインアップ。JET運転、ワープ運転、清潔機能、暖房強化型の選択肢など、大空間で比較しやすい要素があります。",
        weakness: "シリーズによって機能差が大きく、取り扱い店舗や工事条件も確認が必要です。名前だけでなくS/R/T/SKの違いを見ます。",
        howToChoose: "18畳以上や26畳級まで視野に入る時、三菱重工は候補に入れる価値があります。寒冷地なら暖房強化型も確認します。",
        source: { label: "三菱重工 ビーバーエアコン", url: "https://www.mhi-mth.co.jp/customer/room/s/" }
      },
      {
        maker: "日立 白くまくん",
        bestFor: "大きなLDKで、内部清潔と室外機まわりの汚れ対策を重視したい人",
        strength: "Dシリーズは18畳クラスも含み、室内機・室外機の凍結洗浄、ステンレス・クリーン、カビバスターを訴求。LDKで長時間使う家庭に説明しやすいです。",
        weakness: "凍結洗浄の効果は環境条件に左右され、すべての汚れを落とすものではありません。大型機では清潔機能だけでなく能力・電源・工事も優先します。",
        howToChoose: "LDKの使用時間が長く、内部の汚れ対策も気になる家庭向け。最終判断は現地調査とセットで行います。",
        source: { label: "日立 Dシリーズ", url: "https://kadenfan.hitachi.co.jp/ra/lineup/dseries_26/" }
      },
      {
        maker: "ハイアール huu",
        bestFor: "18畳以上で、海外大手の大容量モデルも比較に入れたい人",
        strength: "huuはAIエコ、フィルター自動お掃除、外気温50℃冷房などを訴求し、大容量モデルの展開もあります。",
        weakness: "大空間はメーカー以前に現地条件の影響が大きいです。吹き抜けや二間続きでは、家庭用の限界も含めて相談が必要です。",
        howToChoose: "海外メーカーの大型候補を見るなら、販売店の設置実績、電源工事、室外機搬入まで確認します。",
        amazonKeyword: "ハイアール エアコン 18畳 200V 工事費込み",
        isPick: true,
        source: { label: "ハイアール huu", url: "https://www.haier.com/jp/markets/huu/" }
      }
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
