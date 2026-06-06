import { amazonProductUrl, amazonSearchUrl } from "./affiliate";

export type ProductCategory = {
  id: string;
  name: string;
  choiceName?: string;
  brand?: string;
  type?: "support" | "replacement";
  category?: "aircon-main" | "circulator" | "dehumidifier" | "air-purifier" | "remote" | "cleaning" | "drain" | "outdoor" | "comfort";
  description: string;
  symptoms: string[];
  safetyNote: string;
  amazonKeyword: string;
  amazonAsin?: string;
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
  choiceGuide?: {
    intro: string;
    regrets: string[];
    reviewCriteria?: string[];
    reviewCandidates?: {
      label: string;
      productName: string;
      bestFor: string;
      usp: string;
      referencePrice: string;
      amazonAsin?: string;
      amazonKeyword?: string;
      source?: {
        label: string;
        url: string;
      };
      scores: {
        label: string;
        score: number;
        note: string;
      }[];
    }[];
    options: {
      label: string;
      productName: string;
      bestFor: string;
      reason: string;
      pros?: string[];
      cons?: string[];
      amazonKeyword: string;
      source?: {
        label: string;
        url: string;
      };
    }[];
    verdict: string;
  };
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

type ReviewCandidate = NonNullable<NonNullable<ProductCategory["choiceGuide"]>["reviewCandidates"]>[number];

const reviewCriteriaSets = {
  thermometer: ["見やすさ", "記録・通知", "設置しやすさ", "家族共有", "価格納得感"],
  brush: ["安全性", "掃除効率", "届く範囲", "傷つけにくさ", "価格納得感"],
  drainCleaner: ["吸引しやすさ", "対応径", "逆流リスク低減", "保管性", "価格納得感"],
  outdoorCover: ["排熱配慮", "日よけ効果", "設置しやすさ", "耐候性", "価格納得感"],
  remote: ["対応メーカー", "設定しやすさ", "表示の見やすさ", "操作範囲", "価格納得感"],
  dehumidifier: ["除湿力", "部屋干し", "排水しやすさ", "低温対応", "価格納得感"],
  airPurifier: ["適用畳数", "フィルター", "静音性", "手入れ", "価格納得感"],
  cleaningCover: ["水はね対策", "サイズ対応", "固定しやすさ", "安全性", "価格納得感"],
  drainCap: ["対応径", "詰まりにくさ", "点検しやすさ", "外れにくさ", "価格納得感"],
  vibrationPad: ["防振性", "安定性", "耐荷重", "設置しやすさ", "価格納得感"]
} satisfies Record<string, string[]>;

function reviewCandidate(
  criteria: string[],
  input: Omit<ReviewCandidate, "scores"> & {
    scoreValues: number[];
    scoreNotes: string[];
  }
): ReviewCandidate {
  return {
    label: input.label,
    productName: input.productName,
    bestFor: input.bestFor,
    usp: input.usp,
    referencePrice: input.referencePrice,
    amazonAsin: input.amazonAsin,
    amazonKeyword: input.amazonKeyword,
    source: input.source,
    scores: criteria.map((label, index) => ({
      label,
      score: input.scoreValues[index] ?? input.scoreValues[input.scoreValues.length - 1] ?? 80,
      note: input.scoreNotes[index] ?? input.usp
    }))
  };
}

export const productCategories: ProductCategory[] = [
  {
    id: "thermo-hygrometer",
    name: "SwitchBot 温湿度計",
    choiceName: "温湿度計",
    brand: "SwitchBot",
    type: "support",
    category: "comfort",
    description: "室温と湿度を見える化して、冷房の効きや熱中症リスクを判断しやすくします。",
    symptoms: ["冷えない", "暑い", "予防"],
    safetyNote: "体感だけで判断せず、室温が下がらない場合は早めに避暑や業者相談も検討してください。",
    amazonKeyword: "SwitchBot 温湿度計",
    image: "/images/products/switchbot-hygrometer.jpg",
    amazonAsin: "B09PYKJ6CS",
    whyPick: "スマートホーム系の定番。室温・湿度を日々確認したい人向け。",
    priceBand: "2,000〜5,000円台",
    bestFor: "室温・湿度を見える化して、冷房の効きを判断したい部屋",
    choiceGuide: {
      intro: "温湿度計は、体感ではなく数字で冷房の効きと湿度を見たい時の道具です。スマホ記録まで使うか、置くだけで見やすいものにするかで選ぶと迷いません。",
      regrets: ["表示が小さく、離れた場所から室温を見にくい", "記録が残らず、夜間や外出中の変化を振り返れない"],
      reviewCriteria: reviewCriteriaSets.thermometer,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.thermometer, {
          label: "記録と通知の本命",
          productName: "SwitchBot 温湿度計プラス",
          bestFor: "スマホで履歴を残し、冷えない時間帯をあとから見たい人",
          usp: "大きめの表示とアプリ連携で、室温・湿度の変化を振り返りやすい候補。",
          referencePrice: "3,000円前後",
          amazonAsin: "B09PYKJ6CS",
          amazonKeyword: "SwitchBot 温湿度計プラス",
          source: { label: "SwitchBot公式比較", url: "https://support.switch-bot.com/hc/ja/articles/4433540028183-%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%E3%81%A8%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%E3%83%97%E3%83%A9%E3%82%B9%E3%81%AE%E7%9B%B8%E9%81%95%E7%82%B9" },
          scoreValues: [92, 95, 88, 93, 86],
          scoreNotes: ["画面が大きめで寝室でも確認しやすい。", "アプリ履歴で夜間や外出中の変化を追いやすい。", "置き・壁掛けで使う場所を選びにくい。", "スマートホーム化したい家庭と相性がいい。", "単体表示だけの商品より高いが、記録まで使うなら納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.thermometer, {
          label: "置くだけで見やすい",
          productName: "タニタ TT-559",
          bestFor: "スマホ連携なしで、家族がすぐ室温を見られるようにしたい人",
          usp: "快適レベル表示と最高・最低温湿度の確認ができ、設定なしで使いやすい。",
          referencePrice: "2,500円前後",
          amazonAsin: "B010CK58K4",
          amazonKeyword: "タニタ TT-559 温湿度計",
          source: { label: "タニタ公式仕様", url: "https://www.tanita.co.jp/product/hygrometer/3756/" },
          scoreValues: [94, 76, 93, 82, 90],
          scoreNotes: ["表示が大きく、離れた場所から確認しやすい。", "スマホ履歴は不要な人向け。", "電池を入れて置くだけで使いやすい。", "子供部屋や高齢者の部屋でも説明しやすい。", "単体用途なら価格とのバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.thermometer, {
          label: "屋外も測れる",
          productName: "SwitchBot 防水温湿度計",
          bestFor: "室外機まわりやベランダ側の温湿度も参考にしたい人",
          usp: "防水設計で屋外にも置きやすく、室内外の温度差を見たい時に便利。",
          referencePrice: "2,500円前後",
          amazonAsin: "B0BVLYPYT1",
          amazonKeyword: "SwitchBot 防水温湿度計",
          source: { label: "SwitchBot公式 防水温湿度計", url: "https://www.switchbot.jp/products/switchbot-indoor-outdoor-meter" },
          scoreValues: [82, 91, 90, 88, 87],
          scoreNotes: ["本体表示よりアプリ確認向き。", "屋外側の変化も履歴化しやすい。", "防水設計で設置場所の自由度が高い。", "ハブ連携で家族共有もしやすい。", "屋内だけならプラスやタニタも比較したい。"]
        }),
        reviewCandidate(reviewCriteriaSets.thermometer, {
          label: "小さく安い",
          productName: "SwitchBot 温湿度計",
          bestFor: "まず低予算で室温・湿度の記録を始めたい人",
          usp: "コンパクトで導入しやすく、アプリ記録を試したい時の入口になる。",
          referencePrice: "2,000円前後",
          amazonAsin: "B07L4L4X52",
          amazonKeyword: "SwitchBot 温湿度計",
          source: { label: "SwitchBot公式 温湿度計", url: "https://www.switchbot.jp/collections/automation/products/switchbot-meter" },
          scoreValues: [78, 90, 92, 88, 92],
          scoreNotes: ["表示の大きさはプラスに劣る。", "履歴管理を安く始めやすい。", "小型で置き場所を取りにくい。", "ハブ連携を考える家庭にも向く。", "価格を抑えたいなら有力。"]
        }),
        reviewCandidate(reviewCriteriaSets.thermometer, {
          label: "手軽な単体表示",
          productName: "ThermoPro TP50",
          bestFor: "デスクや寝室で、シンプルに温湿度だけ見たい人",
          usp: "単体表示型で操作が少なく、スマホ連携が不要な部屋に置きやすい。",
          referencePrice: "1,500円前後",
          amazonAsin: "B01H1R0K68",
          amazonKeyword: "ThermoPro TP50 温湿度計",
          source: { label: "ThermoPro公式", url: "https://buythermopro.com/" },
          scoreValues: [84, 70, 86, 70, 92],
          scoreNotes: ["机上で見る用途なら十分。", "履歴や通知は重視しない人向け。", "小型で置きやすい。", "共有より個人用の確認に向く。", "低価格で試しやすい。"]
        })
      ],
      options: [
        {
          label: "記録も見たい",
          productName: "SwitchBot 温湿度計プラス",
          bestFor: "スマホで履歴を残し、冷えない時間帯をあとから見たい人",
          reason: "温湿度の精度情報に加え、プラスは大きめの液晶と快適度表示があり、アプリ連携で日々の変化を追いやすい候補です。",
          amazonKeyword: "SwitchBot 温湿度計プラス",
          source: { label: "SwitchBot公式仕様", url: "https://support.switch-bot.com/hc/ja/articles/4433540028183-%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%E3%81%A8%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%E3%83%97%E3%83%A9%E3%82%B9%E3%81%AE%E7%9B%B8%E9%81%95%E7%82%B9" }
        },
        {
          label: "置くだけで十分",
          productName: "タニタ TT-559/TT-589",
          bestFor: "寝室や子供部屋に置いて、単体で見やすく使いたい人",
          reason: "快適レベル表示や最高・最低温湿度の確認に対応するモデルがあり、スマホ設定なしで使えるのが安心です。",
          amazonKeyword: "タニタ 温湿度計 TT-559 TT-589",
          source: { label: "タニタ公式仕様", url: "https://www.tanita.co.jp/product/hygrometer/3756/" }
        }
      ],
      verdict: "冷房の効きが悪い時間帯まで見たいならSwitchBot、置いてすぐ家族で確認したいならタニタが選びやすいです。"
    }
  },
  {
    id: "filter-brush",
    name: "アズマ工業 エアコンブラシ",
    choiceName: "エアコンブラシ",
    brand: "アズマ工業",
    type: "support",
    category: "cleaning",
    description: "フィルターのホコリを落とし、風量低下やカビ臭の予防に役立ちます。",
    symptoms: ["冷えない", "におい", "予防"],
    safetyNote: "必ず電源を切り、フィルター以外の内部部品を無理にこすらないでください。",
    amazonKeyword: "アズマ工業 エアコンブラシ フィルター 掃除",
    amazonAsin: "B00G65URYM",
    image: "/images/products/azuma-ac-brush.jpg",
    whyPick: "家庭用掃除用品で探しやすく、フィルター清掃の導入商品にしやすい。",
    priceBand: "800〜2,000円台",
    bestFor: "フィルター表面のホコリを安全に落としたい人",
    choiceGuide: {
      intro: "エアコンブラシは、フィルター掃除を楽にするための道具です。内部に突っ込むものではなく、フィルターや外装まわりをやさしく掃除できるかで選びます。",
      regrets: ["毛が硬すぎてフィルターやフィンを傷めそうになる", "細すぎるブラシで時間がかかり、結局掃除が続かない"],
      reviewCriteria: reviewCriteriaSets.brush,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.brush, {
          label: "フィルター掃除の本命",
          productName: "アズマ工業 空気清浄機・エアコンブラシ BA665",
          bestFor: "フィルター表面のホコリを安全に短時間で落としたい人",
          usp: "エアコン・空気清浄機用として用途が明確で、初心者が掃除範囲を間違えにくい。",
          referencePrice: "900円前後",
          amazonAsin: "B00G65URYM",
          amazonKeyword: "アズマ工業 BA665 エアコンブラシ",
          source: { label: "アズマ工業商品情報", url: "https://as-kitchen.as-1.co.jp/shop/g/g63-1441-08/" },
          scoreValues: [92, 92, 82, 90, 91],
          scoreNotes: ["フィルター表面用として安全ラインを引きやすい。", "広い面を短時間で掃除しやすい。", "細い奥までは狙わない設計。", "内部に突っ込みにくい用途で案内しやすい。", "価格も導入しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.brush, {
          label: "すき間仕上げ",
          productName: "まめいた エアコンすきまブラシ",
          bestFor: "吹き出し口や外装の見えるすき間を軽く整えたい人",
          usp: "細い部分の仕上げ向け。フィルター掃除後の見える範囲を整えやすい。",
          referencePrice: "600円前後",
          amazonAsin: "B0DZ5F5LJ2",
          amazonKeyword: "まめいた エアコンすきまブラシ",
          source: { label: "NITE 注意喚起", url: "https://www.nite.go.jp/jiko/chuikanki/press/2022fy/prs220707.html" },
          scoreValues: [82, 78, 92, 78, 90],
          scoreNotes: ["内部へ入れすぎない前提なら使いやすい。", "広いフィルター面は時間がかかる。", "細いすき間に届きやすい。", "力を入れすぎると部品を傷めやすい。", "安く買い足しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.brush, {
          label: "外装も一緒に",
          productName: "レック 激落ちくん すきまブラシ",
          bestFor: "エアコン外装や窓まわりなど、家中の細部掃除にも使いたい人",
          usp: "エアコン専用品に限らず、外装まわりの細かいホコリ落としに回しやすい。",
          referencePrice: "500円前後",
          amazonAsin: "B0CQNK583V",
          amazonKeyword: "レック 激落ちくん すきまブラシ エアコン",
          source: { label: "レック公式", url: "https://www.lecinc.co.jp/" },
          scoreValues: [78, 80, 88, 76, 93],
          scoreNotes: ["エアコン内部用ではなく外側掃除向き。", "細部のホコリ落としに使いやすい。", "サッシや外装にも流用しやすい。", "内部部品には使わない注意が必要。", "低価格で買い足しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.brush, {
          label: "広い面に強い",
          productName: "山崎産業 コンドル ハンディブラシ",
          bestFor: "フィルター以外の外装や周辺のホコリもまとめて払いたい人",
          usp: "家庭掃除用として扱いやすく、エアコンまわりの外側清掃に使い回しやすい。",
          referencePrice: "1,000円前後",
          amazonKeyword: "山崎産業 コンドル ハンディブラシ エアコン",
          source: { label: "山崎産業公式", url: "https://www.yamazaki-sangyo.co.jp/" },
          scoreValues: [80, 86, 76, 82, 84],
          scoreNotes: ["外側掃除用として使うなら安全。", "広い面のホコリ払いに向く。", "細い吹き出し口には不向き。", "柔らかめを選べば傷を抑えやすい。", "エアコン以外にも使える。"]
        }),
        reviewCandidate(reviewCriteriaSets.brush, {
          label: "フィンは慎重に",
          productName: "BBK フィンブラシ B-26",
          bestFor: "フィンの目詰まりを見える範囲で整えたい上級者",
          usp: "プロ向け寄りの道具。初心者は無理に使わず、フィルター掃除までに留めたい。",
          referencePrice: "1,500円前後",
          amazonAsin: "B079JK44WR",
          amazonKeyword: "BBK フィンブラシ B-26",
          source: { label: "BBKカタログ", url: "https://www.bbk.co.jp/japanese/product/docs/catalogvol7_03.pdf" },
          scoreValues: [62, 82, 92, 58, 75],
          scoreNotes: ["初心者には安全ラインを超えやすい。", "フィン清掃用途としては効率がある。", "細部には届くが扱いに注意。", "力加減を誤るとフィンを傷めやすい。", "必要な人だけ検討で十分。"]
        })
      ],
      options: [
        {
          label: "まず1本",
          productName: "アズマ工業 エアコンブラシ",
          bestFor: "フィルター掃除を短時間で済ませたい人",
          reason: "エアコン・空気清浄機用として探しやすく、フィルター表面のホコリ落としに用途を絞れるので、初心者でも使う範囲を間違えにくい候補です。",
          pros: ["フィルター表面のホコリ落としに用途を絞りやすい", "ブラシ面が広く、毎週の軽い掃除を短時間で済ませやすい"],
          cons: ["吹き出し口の細いすき間には入りにくい", "こびりついたカビや内部ファンの汚れまでは落とせない"],
          amazonKeyword: "アズマ工業 エアコンブラシ フィルター 掃除",
          source: { label: "アズマ工業商品情報", url: "https://as-kitchen.as-1.co.jp/shop/g/g63-1441-08/" }
        },
        {
          label: "細部も掃除",
          productName: "エアコンすき間ブラシ系",
          bestFor: "吹き出し口や外装の細いすき間も軽く整えたい人",
          reason: "細部向けは狭い場所に届きやすい一方、内部部品を無理にこすらない前提で選ぶと失敗しにくいです。",
          pros: ["吹き出し口や外装の細い溝など、手が届きにくい場所を軽く整えやすい", "フィルター掃除後に気になる見える範囲の仕上げに使いやすい"],
          cons: ["力を入れるとフィンやルーバーを傷めやすい", "掃除範囲が狭く、フィルター全体のホコリ落としには時間がかかる"],
          amazonKeyword: "エアコン すき間 ブラシ 掃除 フィルター",
          source: { label: "NITE 注意喚起", url: "https://www.nite.go.jp/jiko/chuikanki/press/2022fy/prs220707.html" }
        }
      ],
      verdict: "初心者はアズマ工業のようなフィルター用途のブラシを先に選び、内部清掃まで進めたい時は業者相談に切り替えるのが安全です。"
    }
  },
  {
    id: "drain-pump",
    name: "因幡電工 ドレンホースクリーナー",
    choiceName: "ドレンホースクリーナー",
    brand: "因幡電工",
    type: "support",
    category: "drain",
    description: "排水ホース先端の詰まりが疑われる水漏れ時に、外側から吸い出すための道具です。",
    symptoms: ["水漏れ", "排水"],
    safetyNote: "室内機の分解や高所作業が必要なら使用せず、専門業者へ相談してください。",
    amazonKeyword: "因幡電工 ドレンホースクリーナー エアコン",
    amazonAsin: "B01M1MQW78",
    image: "/images/products/inaba-drain-cleaner.jpg",
    whyPick: "水漏れ記事からの意図が強く、外側からの詰まり確認に絞って紹介しやすい。",
    priceBand: "2,000〜4,000円台",
    bestFor: "屋外側のドレンホース詰まりを外から吸い出したい人",
    choiceGuide: {
      intro: "ドレンホースクリーナーは、室内機を分解せず、屋外側のホース出口から詰まりを吸い出すための道具です。押し込むより吸い出す使い方を前提に選びます。",
      regrets: ["ホース径が合わず、うまく密着しない", "安い吸引器で押し戻してしまい、室内側へ汚水が戻る不安がある"],
      reviewCriteria: reviewCriteriaSets.drainCleaner,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "型番で選びやすい",
          productName: "SANEI ドレンホースクリーナー PR871",
          bestFor: "家庭用エアコンのドレンホース詰まりを外側から確認したい人",
          usp: "公式でエアコンのドレンホース詰まり向けと確認しやすく、初心者にも説明しやすい定番。",
          referencePrice: "2,700円前後",
          amazonAsin: "B01M1MQW78",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" },
          scoreValues: [94, 94, 90, 86, 90],
          scoreNotes: ["吸い出す用途を説明しやすい。", "φ14・φ16系のホースで検討しやすい。", "押し込みより吸引前提で案内しやすい。", "手動式で保管しやすい。", "価格と用途の明確さのバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "レビュー確認向き",
          productName: "SANEI PR871 量販店流通品",
          bestFor: "購入前に量販店レビューも見て安心したい人",
          usp: "同じPR871でも販売店レビューを確認しやすく、実使用の声を見て選びたい人に向く。",
          referencePrice: "2,500円前後",
          amazonAsin: "B01M1MQW78",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "ビックカメラ商品レビュー", url: "https://www.biccamera.com/bc/item/6511911/" },
          scoreValues: [92, 94, 88, 86, 89],
          scoreNotes: ["基本性能はPR871と同じ考え方。", "対応径を販売ページで確認しやすい。", "レビューを見て作業イメージを持ちやすい。", "保管性は標準的。", "価格差が小さい時はレビューの多い販売先が安心。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "周辺部材も見る",
          productName: "因幡電工 ドレン対策用品",
          bestFor: "ホース径や周辺部材も合わせて見直したい人",
          usp: "ドレンホースや防虫キャップなど周辺部材まで確認しやすく、再発予防と合わせて考えられる。",
          referencePrice: "2,000〜4,000円台",
          amazonKeyword: "因幡電工 ドレンホースクリーナー エアコン",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" },
          scoreValues: [84, 90, 86, 88, 84],
          scoreNotes: ["クリーナー単体より周辺確認向き。", "ホース径や部材をまとめて見やすい。", "防虫・詰まり予防まで考えやすい。", "部材単位で保管しやすい。", "必要部材だけ買うなら無駄が少ない。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "水まわりも兼用",
          productName: "GAONA ドレンホース関連クリーナー",
          bestFor: "カクダイ/GAONA系の水まわり部材も比較したい人",
          usp: "水まわり部材ブランドとして探しやすく、ホース・接続部材と合わせて検討しやすい。",
          referencePrice: "2,000〜4,000円台",
          amazonKeyword: "GAONA ドレンホース クリーナー エアコン",
          source: { label: "GAONA資料", url: "https://gaona.jp/wp/wp-content/uploads/2016/11/0fe9cc9c8bd061ad295e75d079b1844d.pdf" },
          scoreValues: [82, 84, 84, 86, 82],
          scoreNotes: ["商品型番はリンク先で確認したい。", "ホースや接続部材まで確認しやすい。", "押し戻しを避ける使い方を確認する。", "部材単位で保管しやすい。", "価格は販売先で差が出やすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "工具店で探す",
          productName: "ESCO ドレンホースクリーナー系",
          bestFor: "工具店の型番商品から、仕様を見て選びたい人",
          usp: "業務用品として探しやすく、ホース径や使用方法を販売ページで確認して選びやすい。",
          referencePrice: "3,000円前後",
          amazonKeyword: "ESCO ドレンホースクリーナー エアコン",
          source: { label: "ESCO公式", url: "https://www.esco-net.com/" },
          scoreValues: [82, 82, 84, 84, 78],
          scoreNotes: ["仕様を見て吸引用途を確認したい。", "対応ホース径は販売ページで確認する。", "押し戻しにならない使い方を確認する。", "工具として保管しやすい。", "定番品より価格差が出やすい。"]
        })
      ],
      options: [
        {
          label: "型番で安心",
          productName: "SANEI PR871",
          bestFor: "14・16mmのドレンホースで、用途が明記されたものを選びたい人",
          reason: "公式情報でエアコンのドレンホース詰まり向けとして確認しやすく、型番指定で迷わず探せる候補です。",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" }
        },
        {
          label: "配管材で探す",
          productName: "因幡電工 ドレン対策用品",
          bestFor: "ホース径や周辺部材も合わせて確認したい人",
          reason: "因幡電工はドレンホースや周辺部材の情報がまとまっており、ホース側の状態確認と合わせて選びやすいです。",
          amazonKeyword: "因幡電工 ドレンホースクリーナー エアコン",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" }
        }
      ],
      verdict: "道具単体で選ぶならSANEI PR871、ホース径や周辺部材も見直すなら因幡電工系の部材情報から確認すると安心です。"
    }
  },
  {
    id: "sanei-drain-cleaner-pr871",
    name: "SANEI ドレンホースクリーナー PR871",
    choiceName: "ドレンホースクリーナー",
    brand: "SANEI",
    type: "support",
    category: "drain",
    description: "エアコンのドレンホース詰まりを外側から吸引して確認する、型番指定で探しやすい定番候補です。",
    symptoms: ["水漏れ", "排水", "予防"],
    safetyNote: "ホース内へ空気を押し込む使い方は避け、室内側へ汚水が戻る不安がある時は専門業者へ相談してください。",
    amazonKeyword: "SANEI PR871 ドレンホースクリーナー エアコン",
    amazonAsin: "B01M1MQW78",
    image: "/images/products/inaba-drain-cleaner.jpg",
    whyPick: "公式仕様でエアコンのドレンホース詰まり解消用、φ14・φ16mm用と確認できるため、水漏れ記事の型番導線に向く。",
    priceBand: "2,000〜4,000円台",
    bestFor: "ドレンホース出口の詰まりが疑われる水漏れ",
    cautions: ["ホース径が合うか確認", "ホースに破れや穴がないか確認", "室内機の分解が必要なら使わない"],
    reviewSummary: "公式仕様で用途が明確。量販店レビューでも排水ホース詰まり用途の商品として確認できるため、汎用品より指名検索へつなげやすい候補。",
    reviewSources: [
      { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" },
      { label: "ビックカメラ商品レビュー", url: "https://www.biccamera.com/bc/item/6511911/" }
    ],
    choiceGuide: {
      intro: "PR871は型番指定で選びやすいドレンホースクリーナーです。比較するときは、ホース径に合うか、吸い出す使い方をしやすいかを見ます。",
      regrets: ["用途が曖昧なポンプを買って、室内側に汚水が戻る不安が残る", "ホース径が合わず、先端が密着しない"],
      reviewCriteria: reviewCriteriaSets.drainCleaner,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "型番で選びやすい",
          productName: "SANEI ドレンホースクリーナー PR871",
          bestFor: "家庭用エアコンのドレンホース詰まりを外側から確認したい人",
          usp: "公式でエアコンのドレンホース詰まり向けと確認しやすく、初心者にも説明しやすい定番。",
          referencePrice: "2,700円前後",
          amazonAsin: "B01M1MQW78",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" },
          scoreValues: [94, 94, 90, 86, 90],
          scoreNotes: ["吸い出す用途を説明しやすい。", "φ14・φ16系のホースで検討しやすい。", "押し込みより吸引前提で案内しやすい。", "手動式で保管しやすい。", "価格と用途の明確さのバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "レビュー確認向き",
          productName: "SANEI PR871 量販店流通品",
          bestFor: "購入前に量販店レビューも見て安心したい人",
          usp: "同じPR871でも販売店レビューを確認しやすく、実使用の声を見て選びたい人に向く。",
          referencePrice: "2,500円前後",
          amazonAsin: "B01M1MQW78",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "ビックカメラ商品レビュー", url: "https://www.biccamera.com/bc/item/6511911/" },
          scoreValues: [92, 94, 88, 86, 89],
          scoreNotes: ["基本性能はPR871と同じ考え方。", "対応径を販売ページで確認しやすい。", "レビューを見て作業イメージを持ちやすい。", "保管性は標準的。", "価格差が小さい時はレビューの多い販売先が安心。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "予防も同時に",
          productName: "因幡電工 防虫ドレンキャップ DC-1416",
          bestFor: "詰まり解消後に虫やゴミの侵入も減らしたい人",
          usp: "クリーナーではなく予防部材。水漏れ再発予防までセットで考えたい時に見る候補。",
          referencePrice: "500円前後",
          amazonAsin: "B003UL8ZQ2",
          amazonKeyword: "因幡電工 DC-1416 防虫ドレンキャップ",
          source: { label: "因幡電工ニュース", url: "https://www.inaba-denko.com/ja/news/detail/72" },
          scoreValues: [70, 92, 82, 96, 94],
          scoreNotes: ["詰まりを取る商品ではない。", "φ14・16系の予防部材として確認しやすい。", "目詰まり点検が必要。", "小さく保管しやすい。", "低価格で予防に足しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "周辺部材も見る",
          productName: "因幡電工 ドレン対策用品",
          bestFor: "ホース径や周辺部材も合わせて見直したい人",
          usp: "ドレンホースや接続部材まで確認しやすく、排水まわりをまとめて整えやすい。",
          referencePrice: "2,000〜4,000円台",
          amazonKeyword: "因幡電工 ドレンホース エアコン 部材",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" },
          scoreValues: [82, 90, 84, 88, 84],
          scoreNotes: ["単体クリーナーより周辺確認向き。", "ホース径や部材をまとめて見やすい。", "詰まり原因を外側から考えやすい。", "必要部材だけ保管しやすい。", "販売先で価格差が出やすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCleaner, {
          label: "工具店で探す",
          productName: "ESCO ドレンホースクリーナー系",
          bestFor: "工具店の型番商品から、仕様を見て選びたい人",
          usp: "業務用品として探しやすく、ホース径や使用方法を販売ページで確認して選びやすい。",
          referencePrice: "3,000円前後",
          amazonKeyword: "ESCO ドレンホースクリーナー エアコン",
          source: { label: "ESCO公式", url: "https://www.esco-net.com/" },
          scoreValues: [82, 82, 84, 84, 78],
          scoreNotes: ["仕様を見て吸引用途を確認したい。", "対応ホース径は販売ページで確認する。", "押し戻しにならない使い方を確認する。", "工具として保管しやすい。", "定番品より価格差が出やすい。"]
        })
      ],
      options: [
        {
          label: "迷ったら",
          productName: "SANEI PR871",
          bestFor: "家庭用エアコンのドレンホース詰まりを外側から確認したい人",
          reason: "公式仕様で用途と対応径を確認しやすく、水漏れ対策の初心者にも説明しやすい候補です。",
          amazonKeyword: "SANEI PR871 ドレンホースクリーナー",
          source: { label: "SANEI公式 PR871", url: "https://www.sanei.ltd/products/pr871/" }
        },
        {
          label: "予防も一緒",
          productName: "防虫ドレンキャップ",
          bestFor: "詰まりを取ったあと、虫やゴミの侵入も減らしたい人",
          reason: "詰まりの再発予防を考えるなら、クリーナーだけでなく出口側の防虫キャップも合わせて確認すると手戻りが少ないです。",
          amazonKeyword: "エアコン ドレンホース 防虫キャップ",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" }
        }
      ],
      verdict: "いま水漏れしているならPR871、解消後の再発予防まで考えるなら防虫キャップも同時に見ます。"
    }
  },
  {
    id: "outdoor-cover",
    name: "山善 エアコン室外機カバー",
    choiceName: "室外機カバー",
    brand: "山善",
    type: "support",
    category: "outdoor",
    description: "直射日光対策や周辺整理で、室外機が熱を逃がしやすい環境を作ります。",
    symptoms: ["冷えない", "室外機", "予防"],
    safetyNote: "吹き出し口や吸い込み口をふさぐカバーは逆効果です。風の通り道を確保してください。",
    amazonKeyword: "山善 エアコン 室外機カバー 日よけ",
    amazonAsin: "B0F1TB3F2W",
    image: "/images/products/yamazen-outdoor-cover.jpg",
    whyPick: "夏前の予防導線と相性がよく、室外機まわりの記事から自然に案内できる。",
    priceBand: "2,000〜6,000円台",
    bestFor: "直射日光を避けつつ、室外機の風の通り道を残したい人",
    choiceGuide: {
      intro: "室外機カバーは、見た目よりも風の通り道をふさがないことが大切です。日よけだけか、目隠しも兼ねるかで選びます。",
      regrets: ["前面をふさいで排熱しにくくなり、冷房効率が落ちる", "サイズが合わず、風や雨でずれやすい"],
      reviewCriteria: reviewCriteriaSets.outdoorCover,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.outdoorCover, {
          label: "日よけ最優先",
          productName: "山善 YMAG-8340 マグネット式日よけ",
          bestFor: "直射日光だけを軽く避けたいベランダや庭",
          usp: "マグネット式で前面をふさぎにくく、排熱を邪魔しにくい日よけ候補。",
          referencePrice: "3,000円前後",
          amazonAsin: "B0F1TB3F2W",
          amazonKeyword: "山善 YMAG-8340 室外機カバー",
          source: { label: "山善公式 YMAG-8340", url: "https://yamazenbizcom.jp/item/QV827.html" },
          scoreValues: [94, 90, 94, 82, 90],
          scoreNotes: ["前面を囲い込みにくい。", "上面の日よけに使いやすい。", "マグネット式で導入しやすい。", "強風時や冬場の扱いは確認したい。", "日よけだけなら価格も軽い。"]
        }),
        reviewCandidate(reviewCriteriaSets.outdoorCover, {
          label: "ワイド日よけ",
          productName: "山善 ひさし付きワイド マグネット式",
          bestFor: "大型室外機や西日が強い場所で上面を広く覆いたい人",
          usp: "ワイドタイプで日射を避けやすく、前面をふさがない方向で検討できる。",
          referencePrice: "4,000円前後",
          amazonAsin: "B0GR595MJM",
          amazonKeyword: "山善 ひさし付き ワイド マグネット 室外機カバー",
          source: { label: "山善公式 ひさし付き", url: "https://yamazenbizcom.jp/item/76124.html" },
          scoreValues: [92, 94, 88, 84, 86],
          scoreNotes: ["前面排熱を妨げにくい。", "広めの上面日よけに向く。", "サイズ確認は必要。", "屋外設置なので固定確認が大切。", "普通サイズより少し高め。"]
        }),
        reviewCandidate(reviewCriteriaSets.outdoorCover, {
          label: "伸縮で合わせる",
          productName: "タカラ産業 DRY・WAVE SLK85",
          bestFor: "室外機サイズに合わせて幅を調整したい人",
          usp: "伸縮式でサイズ調整しやすく、マグネットで日よけ・雪よけ用途に使える。",
          referencePrice: "4,000円前後",
          amazonAsin: "B01MAWCMZ3",
          amazonKeyword: "タカラ産業 SLK85 室外機カバー",
          source: { label: "タカラ産業公式 SLK85", url: "https://www.takaranet.co.jp/slk.html" },
          scoreValues: [90, 88, 90, 86, 84],
          scoreNotes: ["通気を確保しやすい構造で検討できる。", "日よけと雪よけを兼ねやすい。", "伸縮で合わせやすい。", "屋外での固定確認は必要。", "サイズ調整込みで納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.outdoorCover, {
          label: "見た目も整える",
          productName: "山善 KAAC-90T アルミ製室外機カバー",
          bestFor: "庭やベランダで目隠しと棚使いもしたい人",
          usp: "アルミ製で外観を整えやすい一方、排熱をふさがないサイズ確認が重要。",
          referencePrice: "12,000円前後",
          amazonAsin: "B0B42CTJ5T",
          amazonKeyword: "山善 KAAC-90T 室外機カバー",
          source: { label: "YAMAZEN BOOK", url: "https://book.yamazen.co.jp/product/exterior/?o=name&s=0&sid=80" },
          scoreValues: [74, 80, 72, 88, 72],
          scoreNotes: ["前面や側面の風通し確認が必須。", "日よけより目隠し用途が強い。", "組み立てとサイズ確認が必要。", "アルミ製で耐候性を期待しやすい。", "日よけだけなら割高。"]
        }),
        reviewCandidate(reviewCriteriaSets.outdoorCover, {
          label: "貼るだけ簡易",
          productName: "アーネスト 室外機用 日よけフィルム",
          bestFor: "カバーを置かず、上面だけ簡単に遮熱したい人",
          usp: "貼るタイプで設置が軽く、風で飛びにくい日よけ候補として検討しやすい。",
          referencePrice: "2,000円前後",
          amazonAsin: "B0899QQX7G",
          amazonKeyword: "アーネスト 室外機 日よけフィルム A-77281",
          source: { label: "山善公式カテゴリ掲載", url: "https://yamazenbizcom.jp/category/30400/" },
          scoreValues: [92, 82, 94, 76, 88],
          scoreNotes: ["排熱口をふさがない。", "遮熱は上面中心。", "貼るだけで導入しやすい。", "劣化や貼り替えは見ておきたい。", "簡易対策として安い。"]
        })
      ],
      options: [
        {
          label: "日よけ重視",
          productName: "山善 マグネット式ひさしカバー",
          bestFor: "直射日光だけを軽く避けたいベランダや庭",
          reason: "ひさし型は前面を囲い込みにくく、室外機の排熱を妨げにくい方向で検討できます。",
          amazonKeyword: "山善 エアコン 室外機カバー ひさし マグネット",
          source: { label: "山善公式商品情報", url: "https://yamazenbizcom.jp/item/76124.html" }
        },
        {
          label: "目隠しも",
          productName: "山善 アルミ製室外機カバー",
          bestFor: "庭やベランダで見た目も整えたい人",
          reason: "アルミ製の棚付きタイプなど選択肢があり、風の通り道とサイズを確認しながら選べます。",
          amazonKeyword: "山善 アルミ 室外機カバー KAAC",
          source: { label: "YAMAZEN BOOK", url: "https://book.yamazen.co.jp/product/exterior/?o=name&s=0&sid=80" }
        }
      ],
      verdict: "冷房効率を優先するなら日よけ型、外観も整えたいなら前面をふさぎすぎない目隠し型を選びます。"
    }
  },
  {
    id: "circulator",
    name: "アイリスオーヤマ サーキュレーター",
    choiceName: "サーキュレーター",
    brand: "アイリスオーヤマ",
    type: "support",
    category: "circulator",
    description: "冷気を部屋に回し、設定温度を下げすぎずに涼しさを補助します。",
    symptoms: ["冷えない", "節電", "暑い"],
    safetyNote: "エアコン本体の異常がある場合は、補助家電で無理に使い続けないでください。",
    amazonKeyword: "アイリスオーヤマ サーキュレーター 静音 エアコン 併用",
    amazonAsin: "B0D9JDC17F",
    image: "/images/products/iris-circulator.jpg",
    whyPick: "エアコン修理待ちの暑さ対策や冷気循環の補助として紹介しやすい。",
    priceBand: "4,000〜1万円台",
    bestFor: "冷気を部屋に回して、体感温度を整えたい人",
    choiceGuide: {
      intro: "サーキュレーターは冷気を作る家電ではなく、エアコンの冷気を部屋に回す補助役です。寝室なら静音、LDKなら首振りと風量を見ます。",
      regrets: ["安い小型機で風が届かず、部屋の奥が暑いままになる", "首振りや静音性が足りず、寝室で使いにくい"],
      reviewCriteria: ["冷気循環力", "静音性", "首振り・操作性", "手入れ", "価格納得感"],
      reviewCandidates: [
        {
          label: "風量と静音の本命",
          productName: "アイリスオーヤマ PCF-SDC15T-EC-W",
          bestFor: "寝室からLDKまで、静かさと風量を両立したい人",
          usp: "DC JETの強い直進風、上下左右首振り、細かな風量調整で失敗しにくい本命候補。",
          referencePrice: "11,000円前後",
          amazonAsin: "B0D9JDC17F",
          source: { label: "アイリスオーヤマ公式", url: "https://www.irisohyama.co.jp/products/support/4967576690119" },
          scores: [
            { label: "冷気循環力", score: 93, note: "15cmでも直進性が強く、エアコン併用の主役にしやすい。" },
            { label: "静音性", score: 88, note: "DCモーターで低風量運転が扱いやすい。" },
            { label: "首振り・操作性", score: 94, note: "上下左右首振りとリモコンで置き場所を選びにくい。" },
            { label: "手入れ", score: 90, note: "分解丸洗いを訴求しており、夏前後の掃除がしやすい。" },
            { label: "価格納得感", score: 88, note: "安さ最優先ではないが、機能差を考えると納得しやすい。" }
          ]
        },
        {
          label: "価格重視の定番",
          productName: "アイリスオーヤマ AZ-AC15TEC-B",
          bestFor: "価格を抑えつつ、上下左右首振りとリモコンは欲しい人",
          usp: "Amazon限定系でレビュー数が多く、初めての1台として入りやすい価格帯。",
          referencePrice: "6,000円前後",
          amazonAsin: "B0CY5D93HF",
          source: { label: "アイリスオーヤマ公式", url: "https://www.irisohyama.co.jp/circulator-i/circulator-i/" },
          scores: [
            { label: "冷気循環力", score: 86, note: "18畳目安で個室から小さめLDKまで使いやすい。" },
            { label: "静音性", score: 78, note: "ACモーター系なので寝室の弱運転ではDC機に劣る。" },
            { label: "首振り・操作性", score: 86, note: "上下左右首振りとリモコン付きで基本操作は十分。" },
            { label: "手入れ", score: 80, note: "標準的。丸洗い重視なら上位機も比較したい。" },
            { label: "価格納得感", score: 96, note: "価格とレビュー量のバランスが強い。" }
          ]
        },
        {
          label: "洗いやすさ重視",
          productName: "山善 YAR-CD20ES",
          bestFor: "前面ガードや羽根の手入れを重視する人",
          usp: "洗える構造と360度首振りで、部屋干し・空気循環をまとめて使いやすい。",
          referencePrice: "10,500円前後",
          amazonAsin: "B0C42N45RF",
          amazonKeyword: "山善 YAR-CD20ES サーキュレーター",
          source: { label: "山善公式仕様", url: "https://book.yamazen.co.jp/product/detail/I00005380" },
          scores: [
            { label: "冷気循環力", score: 88, note: "20畳目安でリビング補助にも使いやすい。" },
            { label: "静音性", score: 84, note: "DCモーター系として日常使いしやすい。" },
            { label: "首振り・操作性", score: 92, note: "360度首振りで部屋干しや空気循環に強い。" },
            { label: "手入れ", score: 94, note: "洗えるシリーズとして掃除しやすさが魅力。" },
            { label: "価格納得感", score: 84, note: "安さより手入れと機能のバランスで選ぶ商品。" }
          ]
        },
        {
          label: "大空間向け",
          productName: "Vornado 660-JP",
          bestFor: "首振りより、遠くまで届く強い循環力を重視する人",
          usp: "35畳対応クラスの強力循環。広いLDKや観葉植物まわりの空気循環にも向く。",
          referencePrice: "22,000円前後",
          amazonAsin: "B00V7QD7II",
          source: { label: "Vornado公式", url: "https://vornado.jp/store/purchase?id=14" },
          scores: [
            { label: "冷気循環力", score: 98, note: "遠くまで空気を押す力は候補内でも強い。" },
            { label: "静音性", score: 74, note: "強運転時は風量相応の音が出やすい。" },
            { label: "首振り・操作性", score: 70, note: "首振りで広げるより、固定して循環させる設計。" },
            { label: "手入れ", score: 84, note: "前面カバーを外して掃除できるが、国産小型機より大きい。" },
            { label: "価格納得感", score: 72, note: "高めだが、広い部屋の循環力を買う商品。" }
          ]
        },
        {
          label: "部屋になじむ",
          productName: "無印良品 MJ-OCF18",
          bestFor: "見た目と掃除のしやすさを重視して、寝室や書斎に置きたい人",
          usp: "360度首振り、18畳目安、シンプルな外観で生活感を抑えやすい。",
          referencePrice: "8,000円前後",
          amazonKeyword: "無印良品 MJ-OCF18 サーキュレーター",
          source: { label: "無印良品公式", url: "https://www.muji.com/jp/ja/store/cmdty/detail/4550584307980" },
          scores: [
            { label: "冷気循環力", score: 82, note: "18畳目安で個室から寝室には十分。" },
            { label: "静音性", score: 88, note: "DCモーター系で弱運転の使いやすさが魅力。" },
            { label: "首振り・操作性", score: 88, note: "360度首振りで置き場所を調整しやすい。" },
            { label: "手入れ", score: 90, note: "分解しやすい構造を重視する人に向く。" },
            { label: "価格納得感", score: 82, note: "機能とデザイン込みで納得できる人向け。" }
          ]
        }
      ],
      options: [
        {
          label: "定番バランス",
          productName: "アイリスオーヤマ PCF-SC15T",
          bestFor: "寝室から小さめLDKまで、上下左右首振りで使いたい人",
          reason: "公式情報で冷暖房効率の補助や直進性の高い気流が訴求されており、エアコン併用の説明がしやすい候補です。",
          amazonKeyword: "アイリスオーヤマ PCF-SC15T サーキュレーター",
          source: { label: "アイリスオーヤマ公式", url: "https://www.irisohyama.co.jp/circulator-i/circulator-i/" }
        },
        {
          label: "広めの部屋",
          productName: "DCモーター搭載サーキュレーター",
          bestFor: "リビングで風量と静音性を両立したい人",
          reason: "DCモーター系は細かな風量調整や静音性を重視しやすく、つけっぱなしの部屋で後悔しにくい選び方です。",
          amazonKeyword: "DCモーター サーキュレーター 上下左右 首振り 静音",
          source: { label: "アイリスオーヤマ商品サポート", url: "https://www.irisohyama.co.jp/products/support/4967576347761" }
        }
      ],
      verdict: "まずはPCF-SC15T系で十分。広めのLDKや寝室の静かさを重視するならDCモーター系を比較します。"
    }
  },
  {
    id: "remote-battery",
    name: "ELPA エアコン用汎用リモコン",
    choiceName: "汎用リモコン",
    brand: "ELPA",
    type: "support",
    category: "remote",
    description: "リモコン不調の切り分けに使いやすい、低コストの確認用品です。",
    symptoms: ["リモコン", "電源"],
    safetyNote: "本体側のランプ点滅やブレーカー異常がある場合は、本体故障の可能性もあります。",
    amazonKeyword: "ELPA エアコン 汎用 リモコン",
    amazonAsin: "B0871Y33BP",
    image: "/images/products/elpa-universal-remote.jpg",
    whyPick: "リモコン不調は購入意図が明確で、安価な切り分け商品として案内しやすい。",
    priceBand: "1,000〜3,000円台",
    bestFor: "リモコンだけが壊れた可能性を安く切り分けたい人",
    choiceGuide: {
      intro: "汎用リモコンは、対応メーカーと操作できる機能を先に見る商品です。古いエアコンほど年式とメーカーコードの確認が大切です。",
      regrets: ["メーカーは合っているのに、年式や特殊リモコンで動かない", "温度や電源は使えても、タイマーや細かな機能が足りない"],
      reviewCriteria: reviewCriteriaSets.remote,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.remote, {
          label: "機能多めの本命",
          productName: "ELPA RC-AC38",
          bestFor: "バックライトやオートサーチまで欲しい人",
          usp: "主要メーカー16社対応、オートサーチ、バックライト付き液晶など、汎用リモコンで後悔しにくい機能がまとまる。",
          referencePrice: "3,000円前後",
          amazonAsin: "B0871Y33BP",
          amazonKeyword: "ELPA RC-AC38 エアコンリモコン",
          source: { label: "ELPA公式 RC-AC38", url: "https://www.elpa.co.jp/product/av01/elpa1362.html" },
          scoreValues: [94, 92, 92, 92, 84],
          scoreNotes: ["主要メーカー16社対応で比較しやすい。", "オートサーチ付きで設定しやすい。", "バックライト付き液晶で夜も見やすい。", "タイマーなど主な操作をカバーしやすい。", "安さ最優先より機能重視。"]
        }),
        reviewCandidate(reviewCriteriaSets.remote, {
          label: "大画面で見やすい",
          productName: "オーム電機 OAR-N11",
          bestFor: "文字の見やすさとシンプル操作を重視したい人",
          usp: "大画面液晶、シンプルボタン、15メーカー対応で、家族用の代替リモコンにしやすい。",
          referencePrice: "2,000円前後",
          amazonAsin: "B01FVW89DQ",
          amazonKeyword: "オーム電機 OAR-N11 エアコン リモコン",
          source: { label: "オーム電機公式 OAR-N11", url: "https://www.ohm-electric.co.jp/product/c20/c2001/22591/" },
          scoreValues: [90, 88, 94, 84, 90],
          scoreNotes: ["15メーカー対応で候補にしやすい。", "シンプルボタンで迷いにくい。", "大画面液晶が強み。", "基本操作中心で見たい人向け。", "価格と使いやすさのバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.remote, {
          label: "低価格の定番",
          productName: "ELPA RC-32AC",
          bestFor: "電源・温度・運転切替を安く復旧したい人",
          usp: "タイマー付きの汎用エアコンリモコン。価格を抑えた切り分け用として使いやすい。",
          referencePrice: "1,500円前後",
          amazonAsin: "B004VCZ8PK",
          amazonKeyword: "ELPA RC-32AC エアコン リモコン",
          source: { label: "エルパ・ダイレクト RC-32AC", url: "https://www.elpadirect.jp/products/4901087191611/" },
          scoreValues: [86, 84, 82, 82, 94],
          scoreNotes: ["対応可否を先に確認したい。", "基本設定ができれば十分な人向け。", "表示は上位機ほどではない。", "主な操作の復旧に向く。", "安く切り分けしやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.remote, {
          label: "簡単操作",
          productName: "ELPA RC-22AC",
          bestFor: "ボタン数を抑えて簡単に使いたい人",
          usp: "簡単リモコン系。細かな機能より、電源・温度など基本操作を優先したい時に検討。",
          referencePrice: "1,500円前後",
          amazonAsin: "B001D2CTXA",
          amazonKeyword: "ELPA RC-22AC エアコン リモコン",
          source: { label: "ELPA取扱説明書", url: "https://www.elpa.co.jp/product/pdf/rc_22ac_spmanual.pdf" },
          scoreValues: [82, 90, 82, 78, 90],
          scoreNotes: ["対応機種確認は必須。", "操作を絞りたい人に向く。", "表示はシンプル。", "細かな機能は期待しすぎない。", "低価格で試しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.remote, {
          label: "まず電池も確認",
          productName: "メーカー純正リモコン検索",
          bestFor: "特殊リモコンや古い機種で汎用品が不安な人",
          usp: "汎用品で動かない不安がある場合は、型番から純正・代替リモコンを探すほうが安心。",
          referencePrice: "型番次第",
          amazonKeyword: "エアコン 純正 リモコン 型番",
          source: { label: "オーム電機 汎用リモコン設定", url: "https://www.ohm-electric.co.jp/support/setup/" },
          scoreValues: [88, 74, 80, 92, 72],
          scoreNotes: ["型番が合えば確実性が上がる。", "探す手間はかかる。", "表示やボタン配置が元に近い。", "特殊機能を使いたいなら純正寄り。", "価格は高くなることがある。"]
        })
      ],
      options: [
        {
          label: "かんたん重視",
          productName: "ELPA エアコン用リモコン",
          bestFor: "電源・温度・運転切替など主な操作をまず復旧したい人",
          reason: "主な操作に絞った製品があり、対応可否を確認しながらリモコン故障の切り分けに使いやすい候補です。",
          amazonKeyword: "ELPA エアコン 汎用 リモコン RC-32AC",
          source: { label: "ELPA公式 RC-32AC", url: "https://www.elpadirect.jp/products/4901087191611/" }
        },
        {
          label: "画面の見やすさ",
          productName: "オーム電機 OAR-N11",
          bestFor: "大画面液晶とシンプルボタンを重視したい人",
          reason: "公式情報で大画面液晶、15メーカー対応、タイマー機能が確認でき、家族で使うリモコンとして比較しやすいです。",
          amazonKeyword: "オーム電機 OAR-N11 エアコン リモコン",
          source: { label: "オーム電機公式 OAR-N11", url: "https://www.ohm-electric.co.jp/product/c20/c2001/22591/" }
        }
      ],
      verdict: "主な操作だけ急ぎたいならELPA、表示の見やすさとボタンの分かりやすさを重視するならオーム電機を比較します。"
    }
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
    choiceName: "除湿機",
    brand: "コロナ",
    type: "support",
    category: "dehumidifier",
    description: "梅雨〜夏の湿度、部屋干し、結露対策に使いやすいコンプレッサー式除湿機の候補です。",
    symptoms: ["除湿", "結露", "カビ", "省エネ"],
    safetyNote: "エアコンの故障を除湿機でごまかさず、水漏れや異音がある場合は本体点検を優先してください。",
    amazonKeyword: "コロナ 衣類乾燥除湿機 CD コンプレッサー",
    amazonAsin: "B0GKF7PS8Z",
    image: "/images/products/corona-dehumidifier.jpg",
    whyPick: "梅雨と夏の湿度対策記事から、エアコン周辺の関連家電として収益導線を広げやすい。",
    priceBand: "3〜5万円台",
    bestFor: "部屋干し、結露、湿度が高い部屋",
    cautions: ["低温時は方式に注意", "タンク容量と連続排水の有無を確認"],
    choiceGuide: {
      intro: "除湿機は、部屋干し・結露・湿度戻りを減らす補助家電です。夏中心ならコンプレッサー式、冬の部屋干しまで考えるなら方式の違いを見ます。",
      regrets: ["タンクが小さく、排水が面倒で使わなくなる", "冬場に除湿力が落ち、部屋干し目的では物足りない"],
      reviewCriteria: reviewCriteriaSets.dehumidifier,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.dehumidifier, {
          label: "梅雨夏の本命",
          productName: "コロナ CD-P6325",
          bestFor: "梅雨から夏の部屋干しと湿度対策を重視する人",
          usp: "コンプレッサー式で夏場の除湿と電気代のバランスを説明しやすい定番候補。",
          referencePrice: "22,000円前後",
          amazonAsin: "B0GKF7PS8Z",
          amazonKeyword: "コロナ CD-P6325 衣類乾燥除湿機",
          source: { label: "コロナ公式 Pシリーズ", url: "https://www.corona.co.jp/aircon/dehumidifier2/past/p/index.html" },
          scoreValues: [90, 88, 84, 72, 92],
          scoreNotes: ["梅雨から夏の除湿に向く。", "部屋干し用途で説明しやすい。", "タンク容量と排水頻度は確認。", "冬の低温時は方式上弱くなりやすい。", "価格と用途のバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.dehumidifier, {
          label: "部屋干し強化",
          productName: "コロナ CD-H1024/CD-H1025",
          bestFor: "洗濯物が多く、除湿力と連続排水を重視したい人",
          usp: "上位容量のコロナ候補。部屋干し量が多い家庭では小型機より余裕を持ちやすい。",
          referencePrice: "35,000円前後",
          amazonAsin: "B0F6CLJ9GD",
          amazonKeyword: "コロナ CD-H1025 衣類乾燥除湿機",
          source: { label: "コロナ除湿機", url: "https://www.corona.co.jp/aircon/dehumidifier2/" },
          scoreValues: [94, 92, 88, 74, 82],
          scoreNotes: ["除湿力に余裕を持ちやすい。", "洗濯物が多い家庭向き。", "排水しやすさを確認したい。", "冬中心ならハイブリッドも比較。", "価格は上がるが用途が合えば納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.dehumidifier, {
          label: "小部屋の定番",
          productName: "シャープ CV-R71/CV-S71",
          bestFor: "寝室や脱衣所など、小さめ空間の部屋干しに使いたい人",
          usp: "コンパクトな衣類乾燥除湿機として探しやすく、小部屋の湿度対策に合わせやすい。",
          referencePrice: "25,000円前後",
          amazonAsin: "B0D86RDSLM",
          amazonKeyword: "シャープ CV-S71 衣類乾燥除湿機",
          source: { label: "シャープ除湿機", url: "https://jp.sharp/joshitsu/" },
          scoreValues: [84, 88, 82, 72, 86],
          scoreNotes: ["小部屋中心なら十分検討できる。", "部屋干し用の導入候補にしやすい。", "タンクや排水の扱いを確認。", "冬場の使い方は方式を確認。", "小型として価格バランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.dehumidifier, {
          label: "冬も見る",
          productName: "パナソニック ハイブリッド式 F-YHX200B系",
          bestFor: "冬の部屋干しや一年中の除湿も重視する人",
          usp: "ハイブリッド式で季節をまたいで使いやすい一方、価格とサイズは上がりやすい。",
          referencePrice: "70,000円前後",
          amazonAsin: "B0D176XZ9D",
          amazonKeyword: "パナソニック F-YHX200B 衣類乾燥除湿機",
          source: { label: "パナソニック除湿機", url: "https://panasonic.jp/joshitsu/" },
          scoreValues: [92, 96, 86, 96, 66],
          scoreNotes: ["除湿力は高めを期待しやすい。", "部屋干し重視の家庭向き。", "タンクや本体サイズを確認。", "冬まで使うなら強い候補。", "価格は高め。"]
        }),
        reviewCandidate(reviewCriteriaSets.dehumidifier, {
          label: "低予算で試す",
          productName: "アイリスオーヤマ IJC-P70系",
          bestFor: "まず低予算で除湿機を導入したい人",
          usp: "価格を抑えやすいコンプレッサー式候補。小部屋・梅雨中心なら検討しやすい。",
          referencePrice: "18,000円前後",
          amazonAsin: "B0C1S1PJG5",
          amazonKeyword: "アイリスオーヤマ IJC-P70 除湿機",
          source: { label: "アイリスオーヤマ除湿機", url: "https://www.irisohyama.co.jp/products/electrical-appliances/air-conditioning/dehumidifier/" },
          scoreValues: [80, 78, 78, 70, 94],
          scoreNotes: ["小部屋中心で見たい。", "大量部屋干しは上位機も比較。", "排水頻度を確認したい。", "冬向きではない。", "価格を抑えたい人に向く。"]
        })
      ],
      options: [
        {
          label: "夏と梅雨",
          productName: "コロナ CDシリーズ",
          bestFor: "梅雨から夏の湿度対策と部屋干しを重視する人",
          reason: "公式情報でコンプレッサー式として訴求され、夏場の除湿と電気代のバランスで説明しやすい候補です。",
          amazonKeyword: "コロナ 衣類乾燥除湿機 CD コンプレッサー",
          source: { label: "コロナ公式 Pシリーズ", url: "https://www.corona.co.jp/aircon/dehumidifier2/p/index.html" }
        },
        {
          label: "冬も使う",
          productName: "ハイブリッド式除湿機",
          bestFor: "冬の部屋干しや低温時の除湿も重視する人",
          reason: "冬も使うなら方式の違いが満足度に直結します。価格だけでなく、使用季節と排水のしやすさで比べると失敗しにくいです。",
          amazonKeyword: "ハイブリッド式 衣類乾燥 除湿機",
          source: { label: "コロナ公式 Pシリーズ", url: "https://www.corona.co.jp/aircon/dehumidifier2/p/index.html" }
        }
      ],
      verdict: "梅雨から夏が中心ならコロナCD系、冬の部屋干しまで見るならハイブリッド式も比較します。"
    }
  },
  {
    id: "sharp-air-purifier",
    name: "空気清浄機 加湿なしモデル候補",
    choiceName: "空気清浄機",
    brand: "空気清浄機候補",
    type: "support",
    category: "air-purifier",
    description: "エアコンのカビ臭やホコリが気になる部屋で、空気環境を補助する関連家電です。",
    symptoms: ["におい", "カビ", "予防"],
    safetyNote: "空気清浄機はエアコン内部のカビを除去しません。臭いが強い場合は清掃や業者相談が必要です。",
    amazonKeyword: "空気清浄機 小型 静音 リビング",
    amazonAsin: "B0BPK5C73Q",
    image: "/images/products/sharp-air-purifier.jpg",
    whyPick: "カビ臭・アレルギー不安の記事から関連購入につなげやすい。",
    priceBand: "1〜4万円台",
    bestFor: "ホコリ、花粉、軽い生活臭が気になる部屋",
    cautions: ["フィルター交換費用を確認", "エアコン内部洗浄の代わりにはならない"],
    choiceGuide: {
      intro: "空気清浄機は、エアコン内部のカビを消す商品ではありません。ホコリ・花粉・軽い生活臭を補助する家電として、部屋の広さとフィルター費用を見ます。",
      regrets: ["適用畳数が小さく、部屋全体では物足りない", "交換フィルター代を見落としてランニングコストが高く感じる"],
      reviewCriteria: reviewCriteriaSets.airPurifier,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.airPurifier, {
          label: "小部屋の本命",
          productName: "シャープ FU-RC01",
          bestFor: "寝室やデスクまわりなど小さな空間を整えたい人",
          usp: "加湿なしで手入れを軽くしやすく、小空間向けとして説明しやすい。",
          referencePrice: "14,000円前後",
          amazonAsin: "B0BPK5C73Q",
          amazonKeyword: "シャープ FU-RC01 空気清浄機",
          source: { label: "シャープ公式 FU-RC01", url: "https://jp.sharp/kuusei/products/furc01/" },
          scoreValues: [78, 82, 88, 90, 88],
          scoreNotes: ["小空間向けとして使いやすい。", "フィルター交換費を確認したい。", "寝室でも置きやすい。", "加湿なしで手入れが軽め。", "小部屋用途なら納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.airPurifier, {
          label: "部屋全体向き",
          productName: "シャープ FU-T40/FU-S40系",
          bestFor: "寝室から小さめリビングまで、加湿なしで広めに使いたい人",
          usp: "小型より適用畳数に余裕を持ちやすく、部屋全体のホコリ・花粉対策に寄せやすい。",
          referencePrice: "23,000円前後",
          amazonAsin: "B0DP2KCT8V",
          amazonKeyword: "シャープ FU-T40 空気清浄機",
          source: { label: "シャープ空気清浄機", url: "https://jp.sharp/kuusei/" },
          scoreValues: [90, 84, 84, 84, 86],
          scoreNotes: ["部屋全体で使いやすい。", "交換フィルターの価格を確認。", "寝室では運転音も見たい。", "加湿なしで扱いやすい。", "リビング寄りなら小型より納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.airPurifier, {
          label: "デザイン重視",
          productName: "Blueair Blue Max 3250i",
          bestFor: "見た目とスマホ連携も重視したい人",
          usp: "海外系のシンプルデザインとスマート機能で、置きっぱなしでも生活感を抑えやすい。",
          referencePrice: "25,000円前後",
          amazonAsin: "B08KPHZWHL",
          amazonKeyword: "Blueair Blue Max 3250i",
          source: { label: "Blueair公式", url: "https://www.blueair.jp/" },
          scoreValues: [86, 82, 88, 82, 80],
          scoreNotes: ["適用床面積はモデル確認が必要。", "フィルター入手性を見たい。", "弱運転の静音性を重視したい。", "デザインとアプリ連携が魅力。", "国産小型より価格は上がりやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.airPurifier, {
          label: "海外定番",
          productName: "Levoit Core 300S",
          bestFor: "スマート操作とコスパを重視して海外メーカーも見たい人",
          usp: "コンパクトでレビュー量も見やすい候補。フィルター入手性は購入前に確認したい。",
          referencePrice: "18,000円前後",
          amazonAsin: "B092D322HR",
          amazonKeyword: "Levoit Core 300S 空気清浄機",
          source: { label: "Levoit公式", url: "https://levoit.com/" },
          scoreValues: [84, 78, 86, 82, 88],
          scoreNotes: ["部屋サイズに合うか確認したい。", "交換フィルターの継続入手を確認。", "寝室向きの静音性を期待しやすい。", "アプリ操作を使いたい人向け。", "価格と機能のバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.airPurifier, {
          label: "空調メーカー",
          productName: "ダイキン MC555A系",
          bestFor: "空調メーカーの加湿なし清浄機を選びたい人",
          usp: "空調メーカーとしての安心感があり、リビング寄りの空気清浄機候補として比較しやすい。",
          referencePrice: "35,000円前後",
          amazonAsin: "B0DBQJBJ2Q",
          amazonKeyword: "ダイキン MC555A 空気清浄機",
          source: { label: "ダイキン空気清浄機", url: "https://www.daikinaircon.com/ca/" },
          scoreValues: [92, 84, 82, 84, 74],
          scoreNotes: ["広めの部屋でも見やすい候補。", "フィルターや消耗品を確認。", "寝室ではサイズと音を見たい。", "加湿なしで扱いやすい。", "価格は高め。"]
        })
      ],
      options: [
        {
          label: "小空間",
          productName: "シャープ FU-RC01",
          bestFor: "寝室やデスクまわりなど小さな空間を整えたい人",
          reason: "公式情報で小空間向けとして説明され、加湿なしで手入れを軽くしたい人に向く候補です。",
          amazonKeyword: "シャープ FU-RC01 空気清浄機",
          source: { label: "シャープ公式 FU-RC01", url: "https://jp.sharp/kuusei/products/furc01/" }
        },
        {
          label: "部屋全体",
          productName: "加湿なし大型空気清浄機",
          bestFor: "リビング全体のホコリや花粉対策も考えたい人",
          reason: "部屋全体なら適用床面積に余裕を持つほうが後悔しにくく、フィルター交換費も含めて比較できます。",
          amazonKeyword: "空気清浄機 加湿なし 大型 静音",
          source: { label: "シャープ公式仕様", url: "https://jp.sharp/kuusei/products/furc01/spec/" }
        }
      ],
      verdict: "机まわり・寝室ならFU-RC01、リビング全体なら適用畳数に余裕がある大型候補を選びます。"
    }
  },
  {
    id: "aircon-cleaning-cover",
    name: "エアコン掃除用 養生カバー",
    choiceName: "掃除用養生カバー",
    brand: "掃除用品候補",
    type: "support",
    category: "cleaning",
    description: "家庭で外装やフィルター周辺を掃除する時の水はね・汚れ落ち対策に使うカバーです。",
    symptoms: ["掃除", "におい", "予防"],
    safetyNote: "養生しても電装部・送風ファン・基板への洗浄液噴射は避けてください。",
    amazonKeyword: "エアコン 掃除 養生カバー 洗浄カバー",
    amazonAsin: "B099Q44KY9",
    image: "/images/products/aircon-cleaning-cover.jpg",
    whyPick: "掃除記事の客単価を少し上げつつ、安全注意も同時に伝えられる。",
    priceBand: "1,500〜3,000円台",
    bestFor: "家庭での外装・フィルター周辺掃除",
    cautions: ["サイズを確認", "内部洗浄の安全を保証するものではない"],
    choiceGuide: {
      intro: "養生カバーは水はねを減らすための道具で、内部洗浄を安全にする免許証ではありません。サイズと排水しやすさで選びます。",
      regrets: ["サイズが合わず水が漏れる", "排水ホースや固定が弱く、作業中にずれてしまう"],
      reviewCriteria: reviewCriteriaSets.cleaningCover,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.cleaningCover, {
          label: "家庭用壁掛け向き",
          productName: "壁掛け用エアコン洗浄カバー",
          bestFor: "外装やフィルター周辺を軽く掃除したい人",
          usp: "家庭用壁掛けエアコンに合わせて探しやすい。内部洗浄ではなく水はね対策として使う。",
          referencePrice: "2,000円前後",
          amazonAsin: "B099Q44KY9",
          amazonKeyword: "壁掛け用 エアコン 洗浄カバー 養生",
          source: { label: "エアコンカバーサービス商品情報", url: "https://aircon-cover.co.jp/product_sheet2/" },
          scoreValues: [88, 86, 82, 78, 88],
          scoreNotes: ["水はね対策として使いやすい。", "壁掛けサイズか確認したい。", "固定と排水ホースの扱いが大切。", "内部洗浄を安全にするものではない。", "家庭用の軽い掃除なら導入しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.cleaningCover, {
          label: "プロ用品を確認",
          productName: "BBK 壁掛用エアコン洗浄シート",
          bestFor: "作業手順とサイズをきちんと確認して選びたい人",
          usp: "業務用寄りの洗浄用品。家庭で使う場合は無理な内部洗浄をしない前提で検討。",
          referencePrice: "5,000円前後",
          amazonAsin: "B09LQ63DVX",
          amazonKeyword: "BBK 壁掛用 エアコン 洗浄シート",
          source: { label: "BBKカタログ", url: "https://www.bbk.co.jp/japanese/product/docs/catalogvol7_03.pdf" },
          scoreValues: [90, 88, 84, 70, 76],
          scoreNotes: ["水はね対策としては本格的。", "サイズと用途の確認が必要。", "固定や排水の扱いを確認。", "初心者は内部洗浄に踏み込まない。", "価格は高め。"]
        }),
        reviewCandidate(reviewCriteriaSets.cleaningCover, {
          label: "軽量シート",
          productName: "横浜油脂工業 エアコン用洗浄シート 4697",
          bestFor: "水はね飛散を抑える軽いシートを探したい人",
          usp: "洗浄時の水はねを低減するシートとして確認でき、サイズを見て選びやすい。",
          referencePrice: "4,000円前後",
          amazonAsin: "B07C7P24SM",
          amazonKeyword: "横浜油脂 エアコン 洗浄シート 4697",
          source: { label: "横浜油脂工業資料", url: "https://www.yof-linda.co.jp/products/pdf/4697.pdf" },
          scoreValues: [86, 84, 80, 74, 80],
          scoreNotes: ["水はね対策に使いやすい。", "対応サイズを確認する。", "固定方法は作業前に確認。", "電装部への噴射は避ける。", "業務用品寄りとして価格を見る。"]
        }),
        reviewCandidate(reviewCriteriaSets.cleaningCover, {
          label: "天カセ用は別物",
          productName: "エアコンカバーサービス SA-P01D",
          bestFor: "天井カセット・天吊りエアコン用を探している人",
          usp: "壁掛け用ではなく天カセ・天吊り用。家庭用壁掛けとは用途が違うため、誤購入防止として比較に入れる。",
          referencePrice: "20,000円前後",
          amazonAsin: "B09LLYRV7D",
          amazonKeyword: "SA-P01D エアコン 洗浄カバー",
          source: { label: "エアコンカバーサービス SA-P01D", url: "https://aircon-cover.co.jp/product_sheet2/" },
          scoreValues: [92, 52, 82, 70, 50],
          scoreNotes: ["天カセ用途なら本格的。", "家庭用壁掛けには合わない。", "固定は業務用途前提。", "初心者向けではない。", "価格が高く家庭用途には過剰。"]
        }),
        reviewCandidate(reviewCriteriaSets.cleaningCover, {
          label: "まず外側だけ",
          productName: "養生シート・タオル併用",
          bestFor: "分解せず、外装やフィルター掃除だけに留める人",
          usp: "初心者は専用カバーより先に、外側掃除と水はね対策に絞るほうが安全。",
          referencePrice: "1,000円前後",
          amazonAsin: "B0FBLYFZBG",
          amazonKeyword: "エアコン 掃除 養生 シート カバー",
          source: { label: "NITE 注意喚起", url: "https://www.nite.go.jp/jiko/chuikanki/press/2022fy/prs220707.html" },
          scoreValues: [70, 88, 88, 94, 92],
          scoreNotes: ["本格洗浄ではなく軽い保護向き。", "サイズに縛られにくい。", "固定は簡易的。", "内部洗浄へ進みにくく安全。", "低価格で始めやすい。"]
        })
      ],
      options: [
        {
          label: "家庭用サイズ",
          productName: "壁掛け用エアコン洗浄カバー",
          bestFor: "外装やフィルター周辺を軽く掃除したい人",
          reason: "壁掛け用のサイズ表記があるものを選ぶと、家庭用エアコンに合わせやすくなります。",
          amazonKeyword: "壁掛け用 エアコン 洗浄カバー 養生",
          source: { label: "エアコンカバーサービス商品情報", url: "https://aircon-cover.co.jp/product_sheet2/" }
        },
        {
          label: "まず安全",
          productName: "養生シート・タオル併用",
          bestFor: "分解せず、外装やフィルター掃除だけに留める人",
          reason: "初心者は洗浄スプレーより、水はね対策と外側掃除に絞るほうが事故リスクを下げられます。",
          amazonKeyword: "エアコン 掃除 養生 シート カバー",
          source: { label: "NITE 注意喚起", url: "https://www.nite.go.jp/jiko/chuikanki/press/2022fy/prs220707.html" }
        }
      ],
      verdict: "内部洗浄をするために買うのではなく、外側掃除の水はね対策として選び、内部は無理せず業者へ任せます。"
    }
  },
  {
    id: "drain-insect-cap",
    name: "ドレンホース防虫キャップ",
    choiceName: "防虫ドレンキャップ",
    brand: "ドレン対策候補",
    type: "support",
    category: "drain",
    description: "ドレンホース出口から虫やゴミが入るのを防ぎ、水漏れや詰まり再発を予防します。",
    symptoms: ["水漏れ", "排水", "予防"],
    safetyNote: "目詰まりすると排水を妨げます。取り付け後も定期的に確認してください。",
    amazonKeyword: "エアコン ドレンホース 防虫キャップ",
    amazonAsin: "B003UL8ZQ2",
    image: "/images/products/drain-insect-cap.jpg",
    whyPick: "水漏れ解決後の再発予防として自然に提案できる低単価CV商品。",
    priceBand: "500〜1,500円台",
    bestFor: "ドレンホース詰まりの再発予防",
    cautions: ["ホース径に合うサイズを選ぶ", "年1回以上の点検が必要"],
    choiceGuide: {
      intro: "防虫キャップは、ドレンホース出口から虫やゴミが入るのを減らす小物です。取り付け後も目詰まり点検ができる形を選びます。",
      regrets: ["ホース径が合わず外れやすい", "網目が細かすぎてホコリや泥で詰まり、排水を妨げる"],
      reviewCriteria: reviewCriteriaSets.drainCap,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.drainCap, {
          label: "定番サイズ",
          productName: "因幡電工 DC-1416",
          bestFor: "一般的なドレンホース径に合わせて選びたい人",
          usp: "φ14・16兼用として確認しやすい定番候補。取り付け後の定期清掃は必須。",
          referencePrice: "500円前後",
          amazonAsin: "B003UL8ZQ2",
          amazonKeyword: "因幡電工 DC-1416 防虫ドレンキャップ",
          source: { label: "因幡電工ニュース", url: "https://www.inaba-denko.com/ja/news/detail/72" },
          scoreValues: [94, 84, 82, 90, 96],
          scoreNotes: ["φ14・16兼用で合わせやすい。", "目詰まり点検は必要。", "外して確認しやすい形を選びたい。", "ホース径が合えば外れにくい。", "低価格で導入しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCap, {
          label: "ポコポコ音も見る",
          productName: "因幡電工 音止ちゃん DHB-1416",
          bestFor: "虫対策だけでなく、ドレンのポコポコ音も気になる人",
          usp: "消音防虫バルブとして、虫・埃の侵入と気圧差の音をまとめて見たい時に候補になる。",
          referencePrice: "800円前後",
          amazonAsin: "B005F65PRA",
          amazonKeyword: "因幡電工 DHB-1416 音止ちゃん",
          source: { label: "ベストパーツ DHB-1416", url: "https://www.best-parts-ec.jp/products/detail/4187" },
          scoreValues: [88, 86, 78, 86, 86],
          scoreNotes: ["対応ホースを確認したい。", "弁構造は点検が必要。", "定期的に外して確認したい。", "接続条件が合えば安定しやすい。", "音も気になる人には納得しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCap, {
          label: "掃除しやすさ",
          productName: "ビバホーム 防虫ドレンキャップ DC-1416",
          bestFor: "販売ページでサイズと注意点を確認しながら買いたい人",
          usp: "因幡電工DC-1416を量販店ページで確認でき、サイズと定期清掃の注意を見ながら選べる。",
          referencePrice: "500円前後",
          amazonAsin: "B003UL8ZQ2",
          amazonKeyword: "屋外用ドレンホース 防虫ドレンキャップ DC-1416",
          source: { label: "ビバホーム商品情報", url: "https://www.vivahome.com/electrical-materials-air-conditioning/electrical-materials-air-conditioning-7/electrical-materials-air-conditioning-7-3/60008747.html" },
          scoreValues: [94, 84, 84, 90, 94],
          scoreNotes: ["定番径で選びやすい。", "詰まり防止に定期清掃が必要。", "販売ページで仕様確認しやすい。", "合う径なら使いやすい。", "価格が軽い。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCap, {
          label: "ホース交換も一緒",
          productName: "GAONA ドレンホース防虫キャップ付き部材",
          bestFor: "古いホースや接続部も一緒に確認したい人",
          usp: "防虫キャップ単体ではなく、ホースや接続部材まで見たい時の比較候補。",
          referencePrice: "1,000円前後",
          amazonAsin: "B01J7E6XMS",
          amazonKeyword: "GAONA ドレンホース 防虫キャップ",
          source: { label: "GAONA資料", url: "https://gaona.jp/wp/wp-content/uploads/2016/11/0fe9cc9c8bd061ad295e75d079b1844d.pdf" },
          scoreValues: [82, 82, 78, 84, 82],
          scoreNotes: ["対応径を確認したい。", "部材が増えるほど点検が必要。", "ホース交換と一緒に見やすい。", "接続部の状態確認が大切。", "単体より費用は上がる。"]
        }),
        reviewCandidate(reviewCriteriaSets.drainCap, {
          label: "詰まり対策優先",
          productName: "目の粗い防虫キャップ系",
          bestFor: "土やホコリが多く、細かすぎる網の詰まりが不安な人",
          usp: "防虫性だけを上げすぎると排水を妨げるため、点検しやすい形を優先したい。",
          referencePrice: "500〜1,000円前後",
          amazonKeyword: "エアコン ドレンホース 防虫キャップ 掃除しやすい",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" },
          scoreValues: [78, 92, 90, 78, 88],
          scoreNotes: ["汎用品は径確認が必要。", "詰まりにくさを優先しやすい。", "外して点検しやすい形を選ぶ。", "固定力は商品差がある。", "低価格で比較しやすい。"]
        })
      ],
      options: [
        {
          label: "定番サイズ",
          productName: "因幡電工 DC-1416系",
          bestFor: "一般的なドレンホース径に合わせて選びたい人",
          reason: "ドレン管まわりの部材メーカーとして、サイズ確認と合わせて探しやすい候補です。",
          amazonKeyword: "因幡電工 防虫ドレンキャップ DC-1416",
          source: { label: "因幡電工 ドレン管製品", url: "https://www.inaba-denko.com/ja/product/category/830000" }
        },
        {
          label: "掃除しやすさ",
          productName: "着脱しやすい防虫キャップ",
          bestFor: "ベランダや土の近くで、定期点検しやすいものがいい人",
          reason: "排水口は詰まりやすいので、安さより外しやすさと点検しやすさを優先すると後悔しにくいです。",
          amazonKeyword: "エアコン ドレンホース 防虫キャップ 掃除しやすい",
          source: { label: "ビバホーム商品情報", url: "https://www.vivahome.com/electrical-materials-air-conditioning/electrical-materials-air-conditioning-7/electrical-materials-air-conditioning-7-3/60008747.html" }
        }
      ],
      verdict: "まずはホース径に合う定番サイズを選び、取り付けたまま放置せず、夏前に外して点検できるものにします。"
    }
  },
  {
    id: "outdoor-vibration-pad",
    name: "室外機用 防振ゴム",
    choiceName: "防振ゴム",
    brand: "室外機まわり候補",
    type: "support",
    category: "outdoor",
    description: "室外機の振動が床やベランダに響く時の補助用品です。",
    symptoms: ["異音", "室外機", "予防"],
    safetyNote: "室外機は重量物です。持ち上げ作業が不安定になる場合は無理をしないでください。",
    amazonKeyword: "室外機 防振ゴム 防振マット エアコン",
    amazonAsin: "B00N3TWFTY",
    image: "/images/products/outdoor-vibration-pad.jpg",
    whyPick: "室外機の異音・振動記事から具体的に提案しやすい。",
    priceBand: "1,000〜3,000円台",
    bestFor: "ベランダや木造2階の室外機振動対策",
    cautions: ["設置面が平らか確認", "転倒防止を優先"],
    choiceGuide: {
      intro: "防振ゴムは、室外機の振動が床へ伝わるのを和らげる補助用品です。室外機を持ち上げる作業が必要なら、安全を最優先にします。",
      regrets: ["薄すぎて振動が変わらない", "設置が不安定になり、かえって音や転倒リスクが増える"],
      reviewCriteria: reviewCriteriaSets.vibrationPad,
      reviewCandidates: [
        reviewCandidate(reviewCriteriaSets.vibrationPad, {
          label: "厚み重視",
          productName: "WAKI 防振ゴム 厚型",
          bestFor: "ベランダや木造2階で軽い振動を抑えたい人",
          usp: "厚みと硬度を見ながら選びやすく、まず防振ゴムを試したい時の候補。",
          referencePrice: "1,000円前後",
          amazonAsin: "B00N3TWFTY",
          amazonKeyword: "WAKI 防振ゴム 室外機",
          source: { label: "WAKI公式", url: "https://www.waki-diy.co.jp/" },
          scoreValues: [90, 86, 86, 84, 90],
          scoreNotes: ["厚みがあるものを選ぶと変化を感じやすい。", "水平設置を崩さない確認が必要。", "耐荷重を確認したい。", "室外機を安全に持ち上げられるかが大切。", "低価格で試しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.vibrationPad, {
          label: "設備部材で見る",
          productName: "因幡電工 防振パッド系",
          bestFor: "空調部材メーカーの室外機まわり品で探したい人",
          usp: "空調部材と合わせて確認しやすく、置台や配管まわりも含めて相談しやすい。",
          referencePrice: "1,500円前後",
          amazonAsin: "B005ABAM20",
          amazonKeyword: "因幡電工 室外機 防振パッド",
          source: { label: "因幡電工 空調部材", url: "https://www.inaba-denko.com/ja/product/" },
          scoreValues: [88, 88, 90, 82, 84],
          scoreNotes: ["室外機向け部材として探しやすい。", "置台との相性を確認したい。", "耐荷重を見やすい販売先を選ぶ。", "設置作業は慎重に。", "汎用品より価格は上がることがある。"]
        }),
        reviewCandidate(reviewCriteriaSets.vibrationPad, {
          label: "業務用品から探す",
          productName: "TRUSCO 防振ゴム",
          bestFor: "サイズ・硬度・耐荷重を見て選びたい人",
          usp: "工業用品としてサイズ展開を見やすく、設置条件に合わせて選びやすい。",
          referencePrice: "1,000〜2,000円前後",
          amazonAsin: "B00B4T99Y4",
          amazonKeyword: "TRUSCO 防振ゴム 室外機",
          source: { label: "モノタロウ 防振材", url: "https://www.monotaro.com/s/c-122485/" },
          scoreValues: [86, 86, 90, 78, 86],
          scoreNotes: ["防振材として選びやすい。", "安定性はサイズ選び次第。", "耐荷重を確認しやすい。", "室外機用途か販売先で確認。", "価格とサイズ展開のバランスがいい。"]
        }),
        reviewCandidate(reviewCriteriaSets.vibrationPad, {
          label: "大判マット",
          productName: "防振マット 厚手タイプ",
          bestFor: "点ではなく面で振動を和らげたい人",
          usp: "大判タイプは設置面に合わせやすいが、水はけや水平を崩さない確認が必要。",
          referencePrice: "2,000円前後",
          amazonAsin: "B0F12VPTQB",
          amazonKeyword: "室外機 防振マット 厚手",
          source: { label: "モノタロウ 防振材", url: "https://www.monotaro.com/s/c-122485/" },
          scoreValues: [84, 78, 84, 82, 84],
          scoreNotes: ["面で支える用途に向く。", "排水や水平を妨げない確認が必要。", "室外機重量に耐えるか確認。", "カットや設置の手間がある。", "軽い振動なら試しやすい。"]
        }),
        reviewCandidate(reviewCriteriaSets.vibrationPad, {
          label: "小型ゴム板",
          productName: "光 防振ゴム KGB系",
          bestFor: "室外機脚の下に小さく挟めるゴム板を探したい人",
          usp: "小型の防振ゴム板として探しやすく、脚ごとに置いて軽い振動対策を試しやすい。",
          referencePrice: "1,000円前後",
          amazonAsin: "B003OBKX0E",
          amazonKeyword: "光 防振ゴム KGB 室外機",
          source: { label: "光公式", url: "https://www.hikari-net.co.jp/" },
          scoreValues: [82, 84, 82, 88, 90],
          scoreNotes: ["軽い振動対策として試しやすい。", "脚ごとの水平確認が必要。", "耐荷重とサイズを確認する。", "小型で設置しやすい。", "低価格で買い足しやすい。"]
        })
      ],
      options: [
        {
          label: "まず確認",
          productName: "室外機用防振ゴム",
          bestFor: "ベランダや木造2階で軽い振動が気になる人",
          reason: "厚みと耐荷重を確認して選ぶと、安すぎる薄型で変化を感じにくい失敗を避けやすくなります。",
          amazonKeyword: "室外機 防振ゴム 厚手 エアコン",
          source: { label: "防振材の選び方参考", url: "https://www.monotaro.com/s/c-122485/" }
        },
        {
          label: "音が強い",
          productName: "防振ゴムで解決しない異音の確認",
          bestFor: "金属音、ガタつき、配管の揺れが強い人",
          reason: "異音が強い時は部品摩耗や固定不良の可能性もあるため、ゴムだけで解決しようとしないほうが安心です。",
          amazonKeyword: "室外機 防振マット エアコン",
          source: { label: "NITE 注意喚起", url: "https://www.nite.go.jp/jiko/chuikanki/press/2022fy/prs220707.html" }
        }
      ],
      verdict: "軽い振動なら防振ゴム、金属音や大きな揺れがあるなら購入前に点検相談を優先します。"
    }
  }
];

const supportIndexHiddenIds = new Set(["sanei-drain-cleaner-pr871"]);

export const supportProducts = productCategories.filter(
  (product) => product.type !== "replacement" && !supportIndexHiddenIds.has(product.id)
);
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
  if (product.amazonAsin) {
    return amazonProductUrl(product.amazonAsin);
  }

  return amazonSearchUrl(product.amazonKeyword);
}
