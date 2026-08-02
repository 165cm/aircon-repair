import type { TeacherId } from "./teachers";

// 症状（diagnosis.ts の DiagnosisItem.id と一致）
export type SymptomId = "not-cooling" | "water-leak" | "noise" | "remote" | "cleaning";

// 4+2種の誠実な行動（収益より行動を優先）
export type RecommendationKind =
  | "stop-call-pro" // 危険サイン → 使用停止＋業者相談（商品の話はしない）
  | "repair" // 修理業者へ相談
  | "diy-wait" // 安全な確認・安価なDIY・様子見
  | "products" // 補助商品の提案
  | "replacement" // 畳数比較で買い替え
  | "cleaning"; // プロの分解クリーニング

// 講師の発話。text は台本、variants は同じ場面の言い回し違い（表示時にランダムで1つ選ぶ）、
// timeGreeting は時間帯あいさつ（朝/昼/夜で変わる）、fromItem は diagnosis.ts の配列を流用（文章を二重定義しない）
export type InstructorMessage =
  | { text: string }
  | { variants: string[] }
  | { timeGreeting: true }
  | { fromItem: { field: "safeChecks" | "stopSigns" | "repairSignals" | "replacementSignals"; as: "list" } };

// タップ式クイックリプライ
export type QuickReply = { label: string; next: string };

// 終端ノードに並べる行動CTA（誠実順）
export type ChatAction =
  | { type: "product"; productId: string; role?: string }
  | { type: "contractor" }
  | { type: "cleaning" }
  | { type: "replacement" }
  | { type: "article"; slug: string }
  | { type: "danger-anchor" };

type BaseNode = { id: string; teacher: TeacherId; messages: InstructorMessage[] };

export type QuestionNode = BaseNode & {
  kind: "question";
  symptom?: SymptomId;
  quickReplies: QuickReply[];
};

export type TerminalNode = BaseNode & {
  kind: "terminal";
  symptom: SymptomId;
  recommendation: RecommendationKind;
  actions: ChatAction[];
};

export type ChatNode = QuestionNode | TerminalNode;

export type DiagnosisChatScript = {
  startNodeId: string;
  nodes: Record<string, ChatNode>;
};

export type SymptomGuide = {
  intro: string;
  possibilities: Array<{
    title: string;
    mechanism: string;
    professionalReason: string;
  }>;
  contactMemo: string;
  stampMessage: string;
};

// 問診だけでは故障を断定せず、一般的に考えられる原因と専門確認が必要な理由を伝える。
export const symptomGuides: Record<SymptomId, SymptomGuide> = {
  "not-cooling": {
    intro: "冷えない原因は一つとは限りません。ヒアリング時点では、主に次の可能性が考えられます。",
    possibilities: [
      {
        title: "風量不足・熱の逃げ道不足",
        mechanism: "フィルターや熱交換器の汚れ、室外機まわりの障害物で空気が流れにくくなると、作った冷気や熱をうまく運べません。",
        professionalReason: "フィルターと室外機の周囲は確認できますが、内部の熱交換器やファンは分解が必要です。"
      },
      {
        title: "冷媒不足・ガス漏れ",
        mechanism: "冷媒は室内の熱を屋外へ運ぶ役割があります。不足すると風は出ても十分に冷やせないことがあります。",
        professionalReason: "圧力測定、漏れ箇所の確認、機種ごとの適正量での充填には専用工具と知識が必要です。"
      },
      {
        title: "センサー・基板・圧縮機の不調",
        mechanism: "温度を正しく検知できない、制御信号が届かない、冷媒を循環させられない場合も冷房能力が落ちます。",
        professionalReason: "通電部の測定や部品の分解を伴うため、一般の方が内部を確認する範囲ではありません。"
      }
    ],
    contactMemo: "型番、購入年、設定温度、風が冷たいか、室外機が動いているか、いつから冷えないかを伝えてください。",
    stampMessage: "ここまで分かれば、問い合わせ準備はバッチリです👍 型番メモも忘れずにお願いしますね🔧"
  },
  "water-leak": {
    intro: "水漏れは、排水経路だけでなく汚れや冷え方が関係することもあります。次の可能性を切り分けます。",
    possibilities: [
      {
        title: "ドレンホースの詰まり・折れ",
        mechanism: "結露水の出口がふさがると、水が室内機側へ戻ってあふれることがあります。",
        professionalReason: "先端の確認はできますが、壁内の詰まりや配管経路の修正は専用の吸引作業が必要です。"
      },
      {
        title: "内部の汚れ・排水部品の不調",
        mechanism: "熱交換器やドレンパンの汚れ、部品のずれや破損で水が正しい経路へ流れない場合があります。",
        professionalReason: "電装部品の近くを分解するため、内部洗浄や部品確認は専門業者の範囲です。"
      },
      {
        title: "風量不足や冷媒不足による凍結",
        mechanism: "内部が異常に冷えて霜が付き、運転後に溶けた水が一度に流れて漏れるケースもあります。",
        professionalReason: "汚れ、冷媒、センサーのどれが原因かは外観だけでは判断できず、測定が必要です。"
      }
    ],
    contactMemo: "漏れている場所、量、運転開始から何分後か、設定温度をメモし、安全な位置から写真を撮ってください。",
    stampMessage: "水漏れ写真が1枚あると、現場はかなり助かります📷 床で滑らないよう気をつけてくださいね。"
  },
  noise: {
    intro: "音の種類と発生場所によって、外側の振動から内部部品の不調まで複数の可能性があります。",
    possibilities: [
      {
        title: "外装・設置部分の振動",
        mechanism: "フィルターの浮き、室外機に触れている物、据付台のがたつきで音が大きくなることがあります。",
        professionalReason: "外から物を離す確認はできますが、本体の固定や配管の修正は施工確認が必要です。"
      },
      {
        title: "ファン・モーターの摩耗",
        mechanism: "回転部の汚れ、変形、軸受けの摩耗で、カタカタ音やこすれる音が続く場合があります。",
        professionalReason: "回転部はけがや感電の危険があり、停止後でも分解して触らないでください。"
      },
      {
        title: "圧縮機・冷媒系の不調",
        mechanism: "室外機から大きな金属音や異常振動が続く場合は、冷媒を循環させる部品の不調も考えられます。",
        professionalReason: "運転状態の測定と分解確認が必要なため、音を無理に再現せず修理相談へ進みます。"
      }
    ],
    contactMemo: "音が室内機と室外機のどちらから出るか、運転直後か継続中か、においや振動を伴うかを伝えてください。",
    stampMessage: "音は消える前に短い動画を1本。これ、現場では本当に助かるんですよ📱"
  },
  remote: {
    intro: "リモコンが反応しない時は、送信側・受信側・本体側の順に可能性を分けると整理できます。",
    possibilities: [
      {
        title: "電池・端子・送信部の不調",
        mechanism: "電池残量の低下、液漏れ、端子の接触不良で赤外線を正しく送れないことがあります。",
        professionalReason: "新品電池で改善しない場合は、リモコン本体の交換可否を型番から確認します。"
      },
      {
        title: "本体の受光部・基板の不調",
        mechanism: "リモコンが信号を送っていても、本体側が受信または制御できない場合があります。",
        professionalReason: "受光部や基板は通電部に近く、カバーを開けた測定は修理技師の範囲です。"
      },
      {
        title: "電源・本体保護動作",
        mechanism: "停電後やエラー発生時など、本体が保護のため操作を受け付けていない可能性もあります。",
        professionalReason: "焦げ臭さ、異音、点滅がある場合は操作を繰り返さず、エラー内容を伝えて相談してください。"
      }
    ],
    contactMemo: "本体とリモコンの型番、表示やランプの状態、新品電池で試したか、応急運転で動くかを伝えてください。",
    stampMessage: "電池を替えた日もメモしておくと完璧です👍 小さな情報ほど、切り分けに効くんです。"
  },
  cleaning: {
    intro: "においや汚れは、見えるホコリだけでなく内部の湿気や排水部分が関係することがあります。",
    possibilities: [
      {
        title: "フィルター・外装のホコリ",
        mechanism: "たまったホコリが湿気や生活臭を含み、運転時の風と一緒ににおうことがあります。",
        professionalReason: "取扱説明書で外せるフィルターと外装までは、一般の方でも清掃できます。"
      },
      {
        title: "熱交換器・送風ファンの汚れ",
        mechanism: "冷房時の結露で内部が湿り、ホコリやカビが付着すると、カビ臭や風量低下につながります。",
        professionalReason: "市販スプレーは電装部品へかかるおそれがあり、分解洗浄は専門業者へ依頼します。"
      },
      {
        title: "ドレンパン・排水経路の汚れ",
        mechanism: "結露水がたまる部分やホースの汚れが、においの発生源になる場合があります。",
        professionalReason: "外から見えない排水部品は分解が必要で、水漏れを招かない確認技術も必要です。"
      }
    ],
    contactMemo: "においの種類、冷房開始直後か常時か、フィルター清掃日、使用年数、水漏れの有無を伝えてください。",
    stampMessage: "スプレーで一気に……は、ちょっと待ったです🙅‍♂️ 奥はプロに任せてくださいね🔧"
  }
};

// 終端でCTAのあとに添える、風見先生らしい締めのひとこと（表示時にランダムで1つ選ぶ）
export const farewells: Record<RecommendationKind, string[]> = {
  "stop-call-pro": [
    "ここから先は、無理に触らなくて大丈夫です。運転を止めたまま、修理技師に任せてください。",
    "使用を止める判断で合っています。型番と症状を伝えられれば、相談が進みやすくなります。",
    "安全のための確認はここまでです。暑い場合は、先に人が涼しい場所へ移動してください。"
  ],
  repair: [
    "型番、使用年数、症状、発生した時間をメモしておくと、修理相談がスムーズです。",
    "症状が変わったり、焦げ臭さや異常音が出たりした場合は、運転を止めて相談してください。",
    "この症状だけでは、まだ故障とは断定できません。ここからは修理技師に切り分けてもらいましょう。"
  ],
  "diy-wait": [
    "安全に確認できる範囲はここまでです。しばらく運転の様子を見てください。",
    "改善しても、同じ症状が繰り返す場合は修理相談へ切り替えましょう。",
    "分解はせず、音・におい・冷え方に変化がないかだけ確認してください。"
  ],
  products: [
    "道具は急いで買わなくて大丈夫です。用途と本体の型番が合うかを先に確認してください。",
    "購入前に型番とサイズを確認すると、選び間違いを減らせます。"
  ],
  replacement: [
    "修理費だけでなく、本体・工事・撤去を含む総額で比較してください。",
    "急いで決める必要はありません。使用年数と部屋の広さも並べて検討しましょう。",
    "10年以上使っている場合は、修理相談と買い替え比較を同時に進めると判断しやすくなります。"
  ],
  cleaning: [
    "内部洗浄は分解が必要です。市販スプレーで奥まで洗おうとせず、専門業者へ相談してください。",
    "外側とフィルターの清掃で改善しない場合は、内部の汚れを確認してもらいましょう。",
    "電装部品に水分がかかると故障につながります。見える範囲より奥は触らないでください。"
  ]
};

export const diagnosisChat: DiagnosisChatScript = {
  startNodeId: "greeting",
  nodes: {
    // ===== あいさつ（風見先生） =====
    greeting: {
      id: "greeting",
      kind: "question",
      teacher: "netsugashi-reitaro",
      messages: [
        { timeGreeting: true },
        {
          variants: [
            "今日はどうしましたか。まず、いちばん近い症状を教えてください。",
            "エアコンの調子が悪いと心配ですよね。まず、いちばん近い症状を選んでください。",
            "この症状だけでは、まだ故障とは断定できません。順番に切り分けていきましょう。"
          ]
        },
        { text: "止めるべきサイン、安全に確認できる場所、修理や買い替えの目安を順番に整理します。" }
      ],
      quickReplies: [
        { label: "冷えない・暑い", next: "not-cooling__danger-gate" },
        { label: "水漏れする", next: "water-leak__danger-gate" },
        { label: "異音・振動がする", next: "noise__danger-gate" },
        { label: "リモコンが効かない", next: "remote__danger-gate" },
        { label: "掃除・カビ臭", next: "cleaning__danger-gate" }
      ]
    },

    // ========================================================
    // A. 冷えない・暑い
    // ========================================================
    "not-cooling__danger-gate": {
      id: "not-cooling__danger-gate",
      kind: "question",
      symptom: "not-cooling",
      teacher: "tomuro-mamoru",
      messages: [
        {
          variants: [
            "冷えないんですね。暑い日は不安になりますよね。",
            "冷えないと、部屋にいるだけで体力を使いますよね。",
            "冷えない相談は、この保健室でいちばん多いんですよ。一緒に見ていきましょう。"
          ]
        },
        { text: "最初に、体と家を守るための危ないサインだけ確認します。" },
        { text: "焦げ臭い、ブレーカーが落ちる、室外機がまったく動かない。この中に近いものはありますか？" }
      ],
      quickReplies: [
        { label: "ある", next: "not-cooling__stop" },
        { label: "ない", next: "not-cooling__q1" },
        { label: "わからない", next: "not-cooling__unknown-danger" },
        { label: "危険サインって何？", next: "not-cooling__danger-help" }
      ]
    },
    "not-cooling__danger-help": {
      id: "not-cooling__danger-help",
      kind: "question",
      symptom: "not-cooling",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "聞いてくれてありがとう。ここを飛ばさないの、大事です。" },
        { text: "危険サインは、使い続けると火災や故障が広がりそうな合図です。" },
        { text: "焦げ臭い、煙、火花、ブレーカーが何度も落ちる時は、原因探しより先に止めましょう。" }
      ],
      quickReplies: [
        { label: "ありそう", next: "not-cooling__stop" },
        { label: "なさそう", next: "not-cooling__q1" },
        { label: "まだ迷う", next: "not-cooling__unknown-danger" }
      ]
    },
    "not-cooling__unknown-danger": {
      id: "not-cooling__unknown-danger",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "わからない時は、それだけで十分な相談理由になります。" },
        { text: "迷う時は安全側にしましょう。運転を止めて、型番と症状をメモして相談してください。" },
        { text: "部屋が暑い場合は、エアコンより先に人を涼しい場所へ避難させてくださいね。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "call-contractor" }]
    },
    "not-cooling__stop": {
      id: "not-cooling__stop",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "教えてくれてありがとう。それは止めるサインです。" },
        { text: "今は直そうとしなくて大丈夫です。安全にコンセントを抜ける場合だけ抜いて、業者に相談してください。" },
        { text: "無理に動かすと故障が広がることがあります。ここから先は、確認を続けず運転を止めてください。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "not-cooling__q1": {
      id: "not-cooling__q1",
      kind: "question",
      symptom: "not-cooling",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "危険サインがなさそうなら、次は外から見える範囲だけ見ましょう。" },
        { text: "フィルター掃除と、室外機の前を空ける。この2つで風の通り道が戻ることがあります。" },
        { text: "脚立に乗ったり、カバーの奥を触ったりはしなくてOKです。試せましたか？" }
      ],
      quickReplies: [
        { label: "冷えてきた", next: "not-cooling__diy" },
        { label: "まだ冷えない", next: "not-cooling__q2" },
        { label: "フィルターって何？", next: "not-cooling__filter-help" },
        { label: "わからない", next: "not-cooling__repair" }
      ]
    },
    "not-cooling__filter-help": {
      id: "not-cooling__filter-help",
      kind: "question",
      symptom: "not-cooling",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "大丈夫、フィルターは難しい部品ではありません。" },
        { text: "室内機の前カバーを開けると見える、薄い網の部品です。ホコリが詰まると、冷たい風が部屋に出にくくなります。" },
        { text: "外せる範囲でホコリを取るだけでOK。中の金属部分や配線には触らないでください。" }
      ],
      quickReplies: [
        { label: "掃除して冷えた", next: "not-cooling__diy" },
        { label: "まだ冷えない", next: "not-cooling__q2" },
        { label: "開けるのが不安", next: "not-cooling__repair" }
      ]
    },
    "not-cooling__diy": {
      id: "not-cooling__diy",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "diy-wait",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        {
          variants: [
            "冷えてきたんですね。よかった、まずはひと安心です。",
            "冷えてきましたか。それを聞けて、先生もほっとしました。",
            "よかった！風が戻ってきたなら、まずは合格点です。"
          ]
        },
        { text: "この場合は大きな修理より、風の通り道が詰まっていた可能性があります。" },
        { text: "フィルターは月1回くらい見るだけでも違います。今日は無理な出費なしで大丈夫そうです。" }
      ],
      actions: [
        { type: "product", productId: "filter-brush", role: "primary-support" },
        { type: "product", productId: "circulator", role: "secondary-support" },
        { type: "article", slug: "not-cooling" }
      ]
    },
    "not-cooling__q2": {
      id: "not-cooling__q2",
      kind: "question",
      symptom: "not-cooling",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "まだ冷えないんですね。ここまで確認できたので、次は年数で整理しましょう。" },
        { text: "10年を超えると、部品代や電気代の面で、修理だけでなく買い替え比較も現実的になります。" },
        { text: "買ってから10年以上たっていますか？" }
      ],
      quickReplies: [
        { label: "10年以上", next: "not-cooling__replacement" },
        { label: "10年未満", next: "not-cooling__repair" },
        { label: "年数がわからない", next: "not-cooling__repair" },
        { label: "10年って何で見る？", next: "not-cooling__age-help" }
      ]
    },
    "not-cooling__age-help": {
      id: "not-cooling__age-help",
      kind: "question",
      symptom: "not-cooling",
      teacher: "kaikae-shinji",
      messages: [
        { text: "いい質問です。年数は正確でなくても大丈夫です。" },
        { text: "本体の下や横にある型番シール、保証書、購入履歴を見ると手がかりになります。" },
        { text: "わからなければ「年式不明」で相談してOK。プロはそこも含めて確認できます。" }
      ],
      quickReplies: [
        { label: "10年以上だった", next: "not-cooling__replacement" },
        { label: "10年未満だった", next: "not-cooling__repair" },
        { label: "やっぱり不明", next: "not-cooling__repair" }
      ]
    },
    "not-cooling__repair": {
      id: "not-cooling__repair",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "10年未満、または年式が不明なら、まず修理相談で状態を見てもらうのがよさそうです。" },
        { text: "連絡前に、エラーコード、音、冷え方、いつからかをメモしておくと話が早くなります。" },
        { text: "『冷えないです』だけより、『何分運転してもぬるい風です』のほうが伝わります。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "call-contractor" }]
    },
    "not-cooling__replacement": {
      id: "not-cooling__replacement",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "replacement",
      teacher: "kaikae-shinji",
      messages: [
        { text: "10年以上使っているんですね。ここは買い替えも同じ紙に並べて比べましょう。" },
        { text: "修理が悪いわけではありません。ただ、修理費が高い時は新品の本体価格と工事費込みの総額を見ると判断しやすいです。" },
        { text: "風見先生のおすすめは、修理相談と買い替え比較を同時に進め、早く涼しい部屋に戻すことです。" }
      ],
      actions: [
        { type: "replacement" },
        { type: "product", productId: "aircon-10tatami", role: "replacement-candidate" }
      ]
    },

    // ========================================================
    // B. 水漏れする
    // ========================================================
    "water-leak__danger-gate": {
      id: "water-leak__danger-gate",
      kind: "question",
      symptom: "water-leak",
      teacher: "tomuro-mamoru",
      messages: [
        {
          variants: [
            "水漏れですね。床や壁が濡れると焦りますよね。",
            "水漏れは見つけた瞬間がいちばん慌てますよね。落ち着いて一緒に見ましょう。",
            "ポタポタ落ちる音、気になりますよね。まずタオルで受けながらで大丈夫です。"
          ]
        },
        { text: "まずは電気まわりに近いかを確認します。水と電気が近い時は、自分で原因を探さないほうが安全です。" },
        { text: "水がコンセント近くにある、天井や壁から出る、高い場所で作業が必要。どれかありますか？" }
      ],
      quickReplies: [
        { label: "ある", next: "water-leak__stop" },
        { label: "ない", next: "water-leak__q1" },
        { label: "わからない", next: "water-leak__unknown-danger" },
        { label: "壁から水って何？", next: "water-leak__danger-help" }
      ]
    },
    "water-leak__danger-help": {
      id: "water-leak__danger-help",
      kind: "question",
      symptom: "water-leak",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "壁紙が濡れる、天井から落ちる、配線の近くに水がある状態です。" },
        { text: "原因が外から見えない水漏れは、自分で分解しないでください。" }
      ],
      quickReplies: [
        { label: "それっぽい", next: "water-leak__stop" },
        { label: "室内機の下だけ", next: "water-leak__q1" },
        { label: "まだ迷う", next: "water-leak__unknown-danger" }
      ]
    },
    "water-leak__unknown-danger": {
      id: "water-leak__unknown-danger",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "repair",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "迷う水漏れは、触らず写真を撮るのがいちばん役に立ちます。" },
        { text: "水を受けるだけにして、どこから、いつ、どのくらい漏れるかを伝えて相談してください。" },
        { text: "高い場所や壁の中は、見えない配線や配管があるので無理しないでくださいね。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "water-leak" }]
    },
    "water-leak__stop": {
      id: "water-leak__stop",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "教えてくれてありがとう。それは自分で追いかけないほうがいい水漏れです。" },
        { text: "運転を止めて、水を受けるだけにしましょう。高所作業や壁内の水は、無理せず業者に任せてください。" },
        { text: "写真を1枚撮っておくと、相談の時にかなり伝わりやすいです。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "water-leak__q1": {
      id: "water-leak__q1",
      kind: "question",
      symptom: "water-leak",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "危険な水漏れではなさそうなら、外側だけ確認します。" },
        { text: "外に出ている細いホースは、室内の水を外へ逃がす通り道です。" },
        { text: "ホースの先が泥や水でふさがっていないか、見られる範囲で確認できますか？" }
      ],
      quickReplies: [
        { label: "水が止まった", next: "water-leak__diy" },
        { label: "まだ漏れる", next: "water-leak__q2" },
        { label: "ホースって何？", next: "water-leak__hose-help" },
        { label: "外を見るのが無理", next: "water-leak__repair" }
      ]
    },
    "water-leak__hose-help": {
      id: "water-leak__hose-help",
      kind: "question",
      symptom: "water-leak",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "ドレンホースは、室内機の水を外へ出す細いホースです。" },
        { text: "確認するのは先端だけです。高い場所や壁の中は触らないでください。" }
      ],
      quickReplies: [
        { label: "先端が詰まっていた", next: "water-leak__diy" },
        { label: "先端は大丈夫", next: "water-leak__q2" },
        { label: "見つからない", next: "water-leak__repair" }
      ]
    },
    "water-leak__diy": {
      id: "water-leak__diy",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "diy-wait",
      teacher: "mizumichi-nukeru",
      messages: [
        {
          variants: [
            "水が止まったんですね。よかった、床の被害が広がらずに済みそうです。",
            "止まりましたか。自分で原因に気づけたの、すごいことですよ。",
            "ひと安心ですね。濡れた床はゆっくり拭いて、滑らないように気をつけて。"
          ]
        },
        { text: "ドレンホースの先端がふさがると、水の逃げ道がなくなって室内側に戻ることがあります。" },
        { text: "今後は強い雨の後や夏の前に、先端だけ軽く見ておくと安心です。" }
      ],
      actions: [
        { type: "product", productId: "drain-pump", role: "primary-support" },
        { type: "article", slug: "drain-hose" }
      ]
    },
    "water-leak__q2": {
      id: "water-leak__q2",
      kind: "question",
      symptom: "water-leak",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "ここからは、使用年数で修理と買い替えの目安を分けます。" },
        { text: "購入してから10年以上たっていますか？" }
      ],
      quickReplies: [
        { label: "10年以上", next: "water-leak__replacement" },
        { label: "10年未満", next: "water-leak__repair" },
        { label: "年数がわからない", next: "water-leak__repair" },
        { label: "10年って何で見る？", next: "water-leak__age-help" }
      ]
    },
    "water-leak__age-help": {
      id: "water-leak__age-help",
      kind: "question",
      symptom: "water-leak",
      teacher: "kaikae-shinji",
      messages: [
        { text: "室内機の型番シール、保証書、購入履歴を確認してみましょう。" },
        { text: "年式が不明なら、まず修理相談で確認してもらうのが安全です。" }
      ],
      quickReplies: [
        { label: "10年以上だった", next: "water-leak__replacement" },
        { label: "10年未満だった", next: "water-leak__repair" },
        { label: "わからない", next: "water-leak__repair" }
      ]
    },
    "water-leak__repair": {
      id: "water-leak__repair",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "まだ漏れるなら、外側だけでは解決しない原因かもしれません。" },
        { text: "どこから、いつ、運転開始から何分くらいで漏れるかをメモして相談しましょう。" },
        { text: "水漏れは写真がとても役に立ちます。無理のない位置から1枚だけで大丈夫です。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "water-leak" }]
    },
    "water-leak__replacement": {
      id: "water-leak__replacement",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "replacement",
      teacher: "kaikae-shinji",
      messages: [
        { text: "10年以上で水漏れが続くなら、修理だけでなく買い替えも比べてよさそうです。" },
        { text: "排水だけの問題なら修理で済むこともありますが、複数部品の交換になると費用が上がりやすいです。" },
        { text: "修理見積もりと新品の工事込み総額を並べると、判断しやすくなります。" }
      ],
      actions: [{ type: "replacement" }]
    },

    // ========================================================
    // C. 異音・振動がある（urgency: high → ゲート強め）
    // ========================================================
    "noise__danger-gate": {
      id: "noise__danger-gate",
      kind: "question",
      symptom: "noise",
      teacher: "tomuro-mamoru",
      messages: [
        {
          variants: [
            "異音ですね。音は不安になりやすいので、まず危険な音かどうかを分けましょう。",
            "いつもと違う音は気になりますよね。まず、危険な音かどうかだけ分けましょう。",
            "音の相談ですね。耳で気づけたのは早期発見です。順番に確認しましょう。"
          ]
        },
        { text: "金属がこすれる音、焦げ臭い、煙や火花。このあたりは使用停止を優先します。" },
        { text: "どれか近いものはありますか？" }
      ],
      quickReplies: [
        { label: "ある", next: "noise__stop" },
        { label: "ない", next: "noise__q1" },
        { label: "わからない", next: "noise__unknown-danger" },
        { label: "金属音って何？", next: "noise__danger-help" }
      ]
    },
    "noise__danger-help": {
      id: "noise__danger-help",
      kind: "question",
      symptom: "noise",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "キーン、ガリガリ、ギギギのような、硬いものがこすれる音です。" },
        { text: "大きな音が続く場合は、原因を探す前に運転を止めてください。" }
      ],
      quickReplies: [
        { label: "近い音がする", next: "noise__stop" },
        { label: "軽いカタカタだけ", next: "noise__q1" },
        { label: "まだ迷う", next: "noise__unknown-danger" }
      ]
    },
    "noise__unknown-danger": {
      id: "noise__unknown-danger",
      kind: "terminal",
      symptom: "noise",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "音は文字だけで判断しにくいので、迷うのは自然です。" },
        { text: "迷う時は止めるのが正解。動画を撮れるなら短く撮って、業者に相談してください。" },
        { text: "ただし、無理に音を再現するために長く運転し続けなくて大丈夫です。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "strange-noise" }]
    },
    "noise__stop": {
      id: "noise__stop",
      kind: "terminal",
      symptom: "noise",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "金属音、焦げ臭さ、煙、火花は使用を止めるべきサインです。確認を続けず、運転を止めてください。" },
        { text: "安全にコンセントを抜ける場合だけ抜いて、業者へ連絡してください。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "noise__q1": {
      id: "noise__q1",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "ここからは、外から見えるものだけ確認します。" },
        { text: "室外機に物が当たっている、またはフィルターが浮いている状態はありますか？" }
      ],
      quickReplies: [
        { label: "音が消えた・弱まった", next: "noise__diy" },
        { label: "まだ大きな音がする", next: "noise__q2" },
        { label: "確認できない", next: "noise__repair" },
        { label: "室外機って何？", next: "noise__outdoor-help" }
      ]
    },
    "noise__outdoor-help": {
      id: "noise__outdoor-help",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "室外機は、ベランダや建物の外に置かれている大きな箱です。" },
        { text: "ファンの中には手を入れず、周囲に物が当たっていないかだけ確認してください。" }
      ],
      quickReplies: [
        { label: "周りの物で直った", next: "noise__diy" },
        { label: "まだ音がする", next: "noise__q2" },
        { label: "見るのが不安", next: "noise__repair" }
      ]
    },
    "noise__diy": {
      id: "noise__diy",
      kind: "terminal",
      symptom: "noise",
      recommendation: "diy-wait",
      teacher: "netsugashi-reitaro",
      messages: [
        {
          variants: [
            "音が弱まったんですね。よかったです。",
            "静かになりましたか。原因が外側で済んで何よりです。",
            "よかった。音の正体がわかると、急に安心しますよね。"
          ]
        },
        { text: "物が当たっていたり、フィルターが浮いていたりすると、思ったより大きな音が出ることがあります。" },
        { text: "今は道具を買う必要はなさそうです。再発した時のために、音が出たタイミングだけメモしておきましょう。" }
      ],
      actions: [{ type: "article", slug: "strange-noise" }]
    },
    "noise__q2": {
      id: "noise__q2",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "まだ大きな音が続く場合は、内部の部品に原因がある可能性があります。" },
        { text: "購入してから10年以上たっていますか？" }
      ],
      quickReplies: [
        { label: "10年以上", next: "noise__replacement" },
        { label: "10年未満", next: "noise__repair" },
        { label: "年数がわからない", next: "noise__repair" },
        { label: "判断できない", next: "noise__repair" }
      ]
    },
    "noise__repair": {
      id: "noise__repair",
      kind: "terminal",
      symptom: "noise",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "どのような音が、いつ、どのくらい続くかをメモして相談してください。短い動画があると、さらに伝わりやすくなります。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "strange-noise" }]
    },
    "noise__replacement": {
      id: "noise__replacement",
      kind: "terminal",
      symptom: "noise",
      recommendation: "replacement",
      teacher: "kaikae-shinji",
      messages: [
        { text: "10年以上で大きな音が続くなら、買い替え比較も見ておきたいところです。" },
        { text: "圧縮機やモーター系の修理は費用が高くなりがちです。" },
        { text: "修理できるかを相談しつつ、新品の総額も見ておくと、夏場に判断が遅れにくくなります。" }
      ],
      actions: [{ type: "replacement" }]
    },

    // ========================================================
    // D. リモコンが効かない（urgency: low → ゲート軽め・最安DIY優先）
    // ========================================================
    "remote__danger-gate": {
      id: "remote__danger-gate",
      kind: "question",
      symptom: "remote",
      teacher: "tomuro-mamoru",
      messages: [
        {
          variants: [
            "リモコン不調ですね。まずは安く済むことが多い症状です。",
            "リモコンが効かないと地味に困りますよね。実は、安く済むことが多い症状です。",
            "大丈夫、リモコンの相談は軽く済むケースが多いんですよ。"
          ]
        },
        { text: "ただし、本体側に異常がある場合は話が変わります。" },
        { text: "本体が焦げ臭い、変な音がする、電源が入らない。どれかありますか？" }
      ],
      quickReplies: [
        { label: "ある", next: "remote__stop" },
        { label: "ない", next: "remote__q1" },
        { label: "わからない", next: "remote__unknown-danger" },
        { label: "本体ってどこ？", next: "remote__unit-help" }
      ]
    },
    "remote__unit-help": {
      id: "remote__unit-help",
      kind: "question",
      symptom: "remote",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "本体は、部屋の壁についているエアコンそのものです。" },
        { text: "本体からの焦げ臭さ、異音、ランプ異常がなければ次へ進みましょう。" }
      ],
      quickReplies: [
        { label: "異常ありそう", next: "remote__stop" },
        { label: "異常なさそう", next: "remote__q1" },
        { label: "まだ迷う", next: "remote__unknown-danger" }
      ]
    },
    "remote__unknown-danger": {
      id: "remote__unknown-danger",
      kind: "terminal",
      symptom: "remote",
      recommendation: "repair",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "判断に迷うなら、本体を無理に触らないのが正解です。" },
        { text: "型番、ランプの色、リモコンで押したボタンをメモして相談しましょう。" },
        { text: "『リモコンだけ』か『本体側』かを分けるだけでも、相談がぐっと進みます。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "remote-not-working" }]
    },
    "remote__stop": {
      id: "remote__stop",
      kind: "terminal",
      symptom: "remote",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "リモコンだけでなく、本体側に異常がある可能性があります。" },
        { text: "電源や配線には触らず、使用を止めて業者に相談してください。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "remote__q1": {
      id: "remote__q1",
      kind: "question",
      symptom: "remote",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "危険サインがなさそうなら、まず電池から見ます。" },
        { text: "リモコンは電池残量が少ないだけでも、押せたり押せなかったりします。" },
        { text: "新品の電池に交換しても、まだ反応しませんか？" }
      ],
      quickReplies: [
        { label: "本体が動いた・直った", next: "remote__diy" },
        { label: "押しても無反応", next: "remote__q2" },
        { label: "電池交換が不安", next: "remote__battery-help" },
        { label: "わからない", next: "remote__repair" }
      ]
    },
    "remote__battery-help": {
      id: "remote__battery-help",
      kind: "question",
      symptom: "remote",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "裏ぶたを開け、表示されている向きに合わせて単3または単4電池を交換します。" },
        { text: "液漏れしている場合は素手で触らず、無理せず交換を相談してください。" }
      ],
      quickReplies: [
        { label: "交換したら直った", next: "remote__diy" },
        { label: "まだ無反応", next: "remote__q2" },
        { label: "液漏れしている", next: "remote__repair" }
      ]
    },
    "remote__diy": {
      id: "remote__diy",
      kind: "terminal",
      symptom: "remote",
      recommendation: "diy-wait",
      teacher: "netsugashi-reitaro",
      messages: [
        {
          variants: [
            "動いたんですね。よかった、まずは大きな故障ではなさそうです。",
            "直りましたか。電池だけで済むと、なんだか得した気分ですよね。",
            "よかった。リモコンの不調は電池が原因のことが本当に多いんです。"
          ]
        },
        { text: "この場合は、電池切れや接触不良だった可能性があります。" },
        { text: "また反応が悪くなる時は、送信部が光るかを確認して、必要ならリモコン交換を検討しましょう。" }
      ],
      actions: [
        { type: "product", productId: "remote-battery", role: "primary-support" },
        { type: "article", slug: "remote-not-working" }
      ]
    },
    "remote__q2": {
      id: "remote__q2",
      kind: "question",
      symptom: "remote",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "新品電池でも反応しないんですね。次は本体側とリモコン側を分けます。" },
        { text: "本体の応急運転ボタンで動くなら、リモコン側の不調の可能性が高いです。" },
        { text: "本体も動かないなら、本体側の故障や電源まわりの確認が必要になります。" }
      ],
      quickReplies: [
        { label: "応急運転では動く", next: "remote__repair" },
        { label: "本体も動かない", next: "remote__replacement" },
        { label: "応急運転って何？", next: "remote__emergency-help" },
        { label: "わからない", next: "remote__repair" }
      ]
    },
    "remote__emergency-help": {
      id: "remote__emergency-help",
      kind: "question",
      symptom: "remote",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "本体カバー付近にある、小さな運転ボタンのことです。" },
        { text: "場所が分からない、または押すのが不安な場合は、無理に操作しなくて大丈夫です。" }
      ],
      quickReplies: [
        { label: "押したら動いた", next: "remote__repair" },
        { label: "本体も動かない", next: "remote__replacement" },
        { label: "押せない・不安", next: "remote__repair" }
      ]
    },
    "remote__repair": {
      id: "remote__repair",
      kind: "terminal",
      symptom: "remote",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "応急運転で動く、または判断がつかない場合は、まず相談が安心です。" },
        { text: "型番と症状をメモしておくと、リモコン交換で済むか、本体側を見るべきかを分けやすくなります。" },
        { text: "無理に本体カバーを開けなくて大丈夫です。" }
      ],
      actions: [{ type: "contractor" }, { type: "article", slug: "remote-not-working" }]
    },
    "remote__replacement": {
      id: "remote__replacement",
      kind: "terminal",
      symptom: "remote",
      recommendation: "replacement",
      teacher: "kaikae-shinji",
      messages: [
        { text: "本体も動かないなら、リモコンだけの問題ではなさそうです。" },
        { text: "古い機種で純正部品が入りにくい場合は、修理より買い替えのほうが早いことがあります。" },
        { text: "修理相談と一緒に、部屋に合う新品候補も確認しておきましょう。" }
      ],
      actions: [{ type: "replacement" }]
    },

    // ========================================================
    // E. 掃除・カビ臭が気になる
    // ========================================================
    "cleaning__danger-gate": {
      id: "cleaning__danger-gate",
      kind: "question",
      symptom: "cleaning",
      teacher: "tomuro-mamoru",
      messages: [
        {
          variants: [
            "掃除やカビ臭ですね。においがあると気になりますよね。",
            "カビ臭は、気になりだすと止まらないですよね。落ち着いて整理しましょう。",
            "掃除の相談ですね。やる気があるうちに、安全な範囲だけ決めておきましょう。"
          ]
        },
        { text: "ただ、掃除は『外側だけ』と『内部』で安全度が大きく変わります。" },
        { text: "内部にスプレーしたい、奥のファンを洗いたい。どちらかありますか？" }
      ],
      quickReplies: [
        { label: "ある", next: "cleaning__stop" },
        { label: "ない", next: "cleaning__q1" },
        { label: "わからない", next: "cleaning__unknown-danger" },
        { label: "内部ってどこ？", next: "cleaning__inside-help" }
      ]
    },
    "cleaning__inside-help": {
      id: "cleaning__inside-help",
      kind: "question",
      symptom: "cleaning",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "内部とは、カバーの奥にあるファンや熱交換器のことです。" },
        { text: "見えていても、分解やスプレーは故障につながる可能性があります。" }
      ],
      quickReplies: [
        { label: "奥を掃除したい", next: "cleaning__stop" },
        { label: "外側だけでいい", next: "cleaning__q1" },
        { label: "まだ迷う", next: "cleaning__unknown-danger" }
      ]
    },
    "cleaning__unknown-danger": {
      id: "cleaning__unknown-danger",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "cleaning",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "掃除で迷う時は、内部は触らないでください。" },
        { text: "外側とフィルターだけ掃除して、カビ臭が残るならプロに相談しましょう。" },
        { text: "風見先生からのお願いです。スプレーは電装部品と相性が悪いので、内部には使わないでください。" }
      ],
      actions: [{ type: "cleaning" }, { type: "article", slug: "cleaning-spray-risk" }]
    },
    "cleaning__stop": {
      id: "cleaning__stop",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "電装部品へのスプレーや、本体の分解は危険です。" },
        { text: "分解が必要なので、ここからは修理技師や専門業者の範囲です。" }
      ],
      actions: [{ type: "cleaning" }, { type: "article", slug: "cleaning-spray-risk" }]
    },
    "cleaning__q1": {
      id: "cleaning__q1",
      kind: "question",
      symptom: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "内部に触らないなら、安全にできる範囲があります。" },
        { text: "外側の拭き掃除、フィルター掃除、送風運転。この3つはにおい対策の入口です。" },
        { text: "フィルター掃除と送風運転は試せましたか？" }
      ],
      quickReplies: [
        { label: "においが減った", next: "cleaning__diy" },
        { label: "まだカビ臭が気になる", next: "cleaning__q2" },
        { label: "送風運転って何？", next: "cleaning__fan-help" },
        { label: "フィルターって何？", next: "cleaning__filter-help" }
      ]
    },
    "cleaning__fan-help": {
      id: "cleaning__fan-help",
      kind: "question",
      symptom: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "送風運転は、冷やさずに風だけを出す運転です。" },
        { text: "内部を乾かし、においを出にくくする目的で使います。" }
      ],
      quickReplies: [
        { label: "試して減った", next: "cleaning__diy" },
        { label: "まだ臭う", next: "cleaning__q2" },
        { label: "送風が見つからない", next: "cleaning__q2" }
      ]
    },
    "cleaning__filter-help": {
      id: "cleaning__filter-help",
      kind: "question",
      symptom: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "フィルターは、前カバーの内側にある薄い網です。" },
        { text: "外せる範囲でホコリを取るだけにして、奥は触らないでください。" }
      ],
      quickReplies: [
        { label: "掃除して減った", next: "cleaning__diy" },
        { label: "まだ臭う", next: "cleaning__q2" },
        { label: "開けるのが不安", next: "cleaning__cleaning" }
      ]
    },
    "cleaning__diy": {
      id: "cleaning__diy",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "diy-wait",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        {
          variants: [
            "においが減ったんですね。よかったです。",
            "減りましたか。鼻が覚えているうちに対処できて何よりです。",
            "よかった。外側のお手入れだけで変わると、ちょっと嬉しいですよね。"
          ]
        },
        { text: "ホコリや湿気が原因なら、フィルター掃除と送風だけで軽くなることがあります。" },
        { text: "奥は触らず、定期的に外側だけ整えるのが安全なコツです。" }
      ],
      actions: [
        { type: "product", productId: "filter-brush", role: "primary-support" },
        { type: "article", slug: "filter-cleaning" },
        { type: "article", slug: "cleaning-spray-risk" }
      ]
    },
    "cleaning__q2": {
      id: "cleaning__q2",
      kind: "question",
      symptom: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "カビ臭が残る場合は、内部の汚れが原因の可能性があります。" },
        { text: "購入してから10年以上たっていますか？" }
      ],
      quickReplies: [
        { label: "10年以上", next: "cleaning__replacement" },
        { label: "10年未満", next: "cleaning__cleaning" },
        { label: "年数がわからない", next: "cleaning__cleaning" },
        { label: "判断できない", next: "cleaning__cleaning" }
      ]
    },
    "cleaning__cleaning": {
      id: "cleaning__cleaning",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "カビ臭が残るなら、奥の汚れが原因かもしれません。" },
        { text: "ここから先は分解が必要なので、専門業者へクリーニングを相談してください。" },
        { text: "市販スプレーで無理に奥へ吹き込むより、電装部品を守りながら洗ってもらうほうが安心です。" }
      ],
      actions: [{ type: "cleaning" }, { type: "article", slug: "cleaning-spray-risk" }]
    },
    "cleaning__replacement": {
      id: "cleaning__replacement",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "replacement",
      teacher: "kaikae-shinji",
      messages: [
        { text: "10年以上でカビ臭や不調が重なるなら、買い替え比較も現実的です。" },
        { text: "お掃除機能付きはクリーニング費用が高くなることもあります。" },
        { text: "清掃費、修理費、新品の工事込み総額を並べて、納得できるほうを選びましょう。" }
      ],
      actions: [{ type: "replacement" }]
    }
  }
};
