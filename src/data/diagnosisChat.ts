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

// 終端でCTAのあとに添える、保健室の先生らしい締めのひとこと（表示時にランダムで1つ選ぶ）
export const farewells: Record<RecommendationKind, string[]> = {
  "stop-call-pro": [
    "連絡先のメモまでできたら、あとは無理しないで休んでくださいね。お大事に。",
    "ここまで自分で判断できれば十分です。あとはプロに任せましょう。お大事に。",
    "怖かったですね。でも、止める判断ができたのは満点です。お大事に。"
  ],
  repair: [
    "症状のメモまで準備できれば、相談は半分終わったようなものです。お大事に。",
    "また様子が変わったら、いつでも保健室に来てくださいね。",
    "電話の前に深呼吸をひとつ。メモがあれば落ち着いて話せますよ。"
  ],
  "diy-wait": [
    "今日は自分でよく確認できましたね。はなまるです。",
    "落ち着いて対処できていて、えらいです。また何かあったらいつでもどうぞ。",
    "無理のない範囲で様子を見てあげてください。先生はいつでもここにいます。"
  ],
  products: [
    "道具は急いで買わなくて大丈夫。部屋に合うかだけ、ゆっくり確かめてくださいね。",
    "買う前に型番とサイズの確認だけ忘れずに。それさえ合えば失敗しにくいですよ。"
  ],
  replacement: [
    "大きな買い物なので、今日は比較するだけでも一歩前進です。",
    "焦らなくて大丈夫。迷ったらまた整理しに来てくださいね。",
    "総額で比べる癖がつけば、あとで後悔しにくいですよ。応援しています。"
  ],
  cleaning: [
    "においの相談はよくあることなので、恥ずかしがらなくて大丈夫ですよ。",
    "無理にスプレーしなかったのは正しい判断です。お大事に。",
    "プロに頼むのはサボりじゃなくて、エアコンへの思いやりです。"
  ]
};

export const diagnosisChat: DiagnosisChatScript = {
  startNodeId: "greeting",
  nodes: {
    // ===== あいさつ（受付＝熱逃先生） =====
    greeting: {
      id: "greeting",
      kind: "question",
      teacher: "netsugashi-reitaro",
      messages: [
        { timeGreeting: true },
        {
          variants: [
            "今日はどうしましたか？いちばん近い症状を教えてください。",
            "エアコンの調子、心配ですよね。まず、いちばん近い症状はどれですか？",
            "ゆっくりで大丈夫ですよ。いちばん近い症状を選んでください。"
          ]
        },
        { text: "選んだあとに、止めるサイン、安全に見られる場所、修理か買い替えかを順番に聞きます。" }
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
        { text: "今は直そうとしなくて大丈夫。コンセントを抜ける範囲なら抜いて、業者に相談してください。" },
        { text: "無理に動かすと故障が広がることがあります。すずね先生の風紀委員モード、ここだけは厳しめです。" }
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
        { text: "すずね先生のおすすめは、修理相談と買い替え比較を同時に進めて、早く涼しい部屋に戻すことです。" }
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
        { text: "壁紙が濡れる、天井から落ちる、配線の近くに水がある時のこと。" },
        { text: "原因が外から見えない水漏れは、自分で分解しないでね。" }
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
        { text: "ドレンホースは、室内機の水を外へ出す細いホース。" },
        { text: "先端だけ見るよ。高い場所や壁の中は触らないでね。" }
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
        { text: "ここは年数だけで分けよう。" },
        { text: "買ってから10年以上たっている？" }
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
        { text: "室内機の型番シール、保証書、購入履歴で見るよ。" },
        { text: "年式が不明なら、まず修理相談で見てもらうのが安全。" }
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
        { text: "キーン、ガリガリ、ギギギのような硬い音。" },
        { text: "大きい音が続くなら、原因を探す前に止めよう。" }
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
        { text: "今すぐ止めて！金属音・焦げ臭さ・煙・火花は危険サインだよ ⚠️" },
        { text: "コンセントを抜いて業者に連絡してね。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "noise__q1": {
      id: "noise__q1",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "外から見える物だけ確認。" },
        { text: "室外機に物が当たっている、フィルターが浮いている。どちらかある？" }
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
        { text: "室外機は、ベランダや外に置いてある大きな箱。" },
        { text: "ファンの中には手を入れないで、周りの物だけ見るよ。" }
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
        { text: "今は買うものなしで大丈夫。再発した時のために、音のタイミングだけメモしておきましょう。" }
      ],
      actions: [{ type: "article", slug: "strange-noise" }]
    },
    "noise__q2": {
      id: "noise__q2",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "まだ大きい音が続くなら、中の故障かも。" },
        { text: "買ってから10年以上たっている？" }
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
        { text: "どんな音が・いつ・どのくらい続くかをメモして相談しよう。動画もあると伝わりやすいよ。" }
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
        { text: "本体は部屋の壁についているエアコンそのもの。" },
        { text: "本体から焦げ臭い、異音、ランプ異常がなければ次へ進もう。" }
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
        { text: "それはリモコンだけの問題じゃないかも ⚠️" },
        { text: "電源・配線は触らず、使用を止めて業者に相談してね。" }
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
        { text: "裏ぶたを開けて、単3や単4の電池を同じ向きで入れるだけ。" },
        { text: "液漏れしていたら素手で触らず、無理せず交換相談でOK。" }
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
        { text: "本体カバー付近にある小さな運転ボタンのこと。" },
        { text: "場所が分からない、押すのが不安なら無理しなくてOK。" }
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
        { text: "内部は、カバーの奥にあるファンや熱交換器のこと。" },
        { text: "見えていても、分解やスプレーは故障リスクがあるよ。" }
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
        { text: "すずね先生の小さなお願いです。スプレーは勢いがありますが、電装部品にはとても相性が悪いです。" }
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
        { text: "電装部品へのスプレーや分解は危険だよ ⚠️" },
        { text: "そこはプロに任せるのが正解。" }
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
        { text: "送風運転は、冷やさず風だけ出す運転。" },
        { text: "内部を乾かして、においを出にくくする目的だよ。" }
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
        { text: "フィルターは前カバーの内側にある薄い網。" },
        { text: "外せる範囲でホコリを取るだけ。奥は触らないでね。" }
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
        { text: "カビ臭が残るなら、奥の汚れかも。" },
        { text: "買ってから10年以上たっている？" }
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
        { text: "ここから先は、プロの分解クリーニングが確実です。" },
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
