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

// 講師の発話。text は台本、fromItem は diagnosis.ts の配列を流用（文章を二重定義しない）
export type InstructorMessage =
  | { text: string }
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

// 終端に常設する導線（別の症状を聞く／最初から）はランタイム側で付与する。
export const diagnosisChat: DiagnosisChatScript = {
  startNodeId: "greeting",
  nodes: {
    // ===== あいさつ（受付＝熱逃先生） =====
    greeting: {
      id: "greeting",
      kind: "question",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "「起動、冷え、着風！」エアコン修理科の保健室へようこそ。" },
        { text: "今日はどんな調子ですか？ 気になる症状をひとつ選んでください。順番に、一緒に切り分けていきましょう。" }
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
        { text: "まずは安全確認から。迷ったら止める——それがいちばん早い安全確認です。" },
        { text: "次のどれかに当てはまりますか？" },
        { fromItem: { field: "stopSigns", as: "list" } }
      ],
      quickReplies: [
        { label: "当てはまる", next: "not-cooling__stop" },
        { label: "当てはまらない", next: "not-cooling__q1" }
      ]
    },
    "not-cooling__stop": {
      id: "not-cooling__stop",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "よく気づきました。それは無理をしてはいけないサインです。" },
        { text: "今日は使用を止めて、コンセントを抜き、症状を専門業者に伝えましょう。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "not-cooling__q1": {
      id: "not-cooling__q1",
      kind: "question",
      symptom: "not-cooling",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "了解です。冷房は風の通り道が命。外側からこの3つを確認してみましょう。" },
        { fromItem: { field: "safeChecks", as: "list" } }
      ],
      quickReplies: [
        { label: "確認したら冷えてきた", next: "not-cooling__diy" },
        { label: "確認してもまだ冷えない", next: "not-cooling__q2" }
      ]
    },
    "not-cooling__diy": {
      id: "not-cooling__diy",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "diy-wait",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "よかった、風の道が戻りましたね。" },
        { text: "次に詰まらせないよう、フィルター掃除と空気の循環を整えておくと安心です。無理な出費はいりません。" }
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
        { text: "外側に原因がなければ、年式と症状の数で進む道が分かれます。どちらが近いですか？" },
        { fromItem: { field: "repairSignals", as: "list" } },
        { fromItem: { field: "replacementSignals", as: "list" } }
      ],
      quickReplies: [
        { label: "7年未満・症状は1つ", next: "not-cooling__repair" },
        { label: "10年以上・症状が重なる", next: "not-cooling__replacement" }
      ]
    },
    "not-cooling__repair": {
      id: "not-cooling__repair",
      kind: "terminal",
      symptom: "not-cooling",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "工具より先に、見る目を持ってこい——つまり症状メモです。" },
        { text: "エラーコード・音・冷え方を控えてから相談すると、話が早く済みますよ。" }
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
        { text: "本体価格だけで進路希望を出すな。工事費まで面談だ。" },
        { text: "畳数に合う候補と工事込みの総額を見てから、修理と比べると迷いにくくなります。" }
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
        { text: "水まわりはまず安全確認。電源の近くは触らないのが鉄則です。" },
        { text: "次のどれかに当てはまりますか？" },
        { fromItem: { field: "stopSigns", as: "list" } }
      ],
      quickReplies: [
        { label: "当てはまる", next: "water-leak__stop" },
        { label: "当てはまらない", next: "water-leak__q1" }
      ]
    },
    "water-leak__stop": {
      id: "water-leak__stop",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "それは止めるサインです。使用を止めて、電源まわりに水がかからないようにしましょう。" },
        { text: "高所作業や壁内の水は、無理せず専門業者へ。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "water-leak__q1": {
      id: "water-leak__q1",
      kind: "question",
      symptom: "water-leak",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "水は正直。出口をふさぐと、すぐ下に出てきます。外側からこの3つを見てみましょう。" },
        { fromItem: { field: "safeChecks", as: "list" } }
      ],
      quickReplies: [
        { label: "水が止まった", next: "water-leak__diy" },
        { label: "まだ漏れる", next: "water-leak__q2" }
      ]
    },
    "water-leak__diy": {
      id: "water-leak__diy",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "diy-wait",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "出口が通れば、水はちゃんと帰ります。" },
        { text: "ドレンホースの先端を時々見て、フィルターは乾いた状態で掃除しておきましょう。" }
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
        { text: "出口を見ても止まらないなら、年式と他の症状で道が分かれます。どちらが近いですか？" },
        { fromItem: { field: "repairSignals", as: "list" } },
        { fromItem: { field: "replacementSignals", as: "list" } }
      ],
      quickReplies: [
        { label: "年式が新しめ・水漏れだけ", next: "water-leak__repair" },
        { label: "10年以上・他の不調もある", next: "water-leak__replacement" }
      ]
    },
    "water-leak__repair": {
      id: "water-leak__repair",
      kind: "terminal",
      symptom: "water-leak",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "排水経路の問題が疑われます。どこから・いつ漏れるかをメモして相談しましょう。" }
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
        { text: "複数部品の交換が要りそうなら、買い替えとの総額比較が早道です。畳数と工事費から見ていきましょう。" }
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
        { text: "異音は機械のSOSのことがあります。ここは特に慎重に。" },
        { text: "次のどれかに当てはまりますか？ ひとつでも当てはまれば、すぐ止めるのが正解です。" },
        { fromItem: { field: "stopSigns", as: "list" } }
      ],
      quickReplies: [
        { label: "当てはまる", next: "noise__stop" },
        { label: "当てはまらない", next: "noise__q1" }
      ]
    },
    "noise__stop": {
      id: "noise__stop",
      kind: "terminal",
      symptom: "noise",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "迷わず止めましょう。金属音・焦げ臭さ・煙・火花は、運転を続けてはいけないサインです。" },
        { text: "コンセントを抜き、症状を専門業者に伝えてください。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "noise__q1": {
      id: "noise__q1",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "音の正体は、たいてい『どこかが当たっている』か『ゆるんでいる』です。外側からこの3つを確認しましょう。" },
        { fromItem: { field: "safeChecks", as: "list" } }
      ],
      quickReplies: [
        { label: "音が消えた・弱まった", next: "noise__diy" },
        { label: "まだ大きな音がする", next: "noise__q2" }
      ]
    },
    "noise__diy": {
      id: "noise__diy",
      kind: "terminal",
      symptom: "noise",
      recommendation: "diy-wait",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "接触やゆるみが取れたようですね。ここで買うものはありません。" },
        { text: "音が出るタイミングだけメモしておくと、再発したときに役立ちます。" }
      ],
      actions: [{ type: "article", slug: "strange-noise" }]
    },
    "noise__q2": {
      id: "noise__q2",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "表面で直らない音は、中身の可能性があります。年式と症状で道が分かれます。どちらが近いですか？" },
        { fromItem: { field: "repairSignals", as: "list" } },
        { fromItem: { field: "replacementSignals", as: "list" } }
      ],
      quickReplies: [
        { label: "7年未満・症状は1つ", next: "noise__repair" },
        { label: "10年以上・症状が重なる", next: "noise__replacement" }
      ]
    },
    "noise__repair": {
      id: "noise__repair",
      kind: "terminal",
      symptom: "noise",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "どんな音が・いつ・どのくらい続くかをメモして相談しましょう。動画があるとなお伝わります。" }
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
        { text: "圧縮機やファンモーター系の異常は修理費が高くなりがちです。買い替えとの総額比較を先に。" }
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
        { text: "リモコン不調は基本的に低リスクです。ただ、本体側に次のサインがあれば話は別。" },
        { text: "当てはまりますか？" },
        { fromItem: { field: "stopSigns", as: "list" } }
      ],
      quickReplies: [
        { label: "当てはまる", next: "remote__stop" },
        { label: "当てはまらない", next: "remote__q1" }
      ]
    },
    "remote__stop": {
      id: "remote__stop",
      kind: "terminal",
      symptom: "remote",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "それはリモコンだけの問題ではないかもしれません。電源・配線まわりは触らず、使用を止めて相談を。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "remote__q1": {
      id: "remote__q1",
      kind: "question",
      symptom: "remote",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "では、いちばん安い確認から。電池交換と送信部チェックで、不要な修理依頼を減らせます。" },
        { fromItem: { field: "safeChecks", as: "list" } }
      ],
      quickReplies: [
        { label: "本体が動いた・直った", next: "remote__diy" },
        { label: "押しても無反応", next: "remote__q2" }
      ]
    },
    "remote__diy": {
      id: "remote__diy",
      kind: "terminal",
      symptom: "remote",
      recommendation: "diy-wait",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "電池や送信部で切り分けできましたね。応急運転で本体が動くなら、急ぎの修理は不要なことが多いです。" },
        { text: "スマホカメラで送信部が光らないときだけ、対応機種を確認して汎用リモコンを検討しましょう。" }
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
        { text: "本体側か、リモコン側か、年式で道が分かれます。どちらが近いですか？" },
        { fromItem: { field: "repairSignals", as: "list" } },
        { fromItem: { field: "replacementSignals", as: "list" } }
      ],
      quickReplies: [
        { label: "応急運転では動く・年式浅い", next: "remote__repair" },
        { label: "本体も古く他の不調もある", next: "remote__replacement" }
      ]
    },
    "remote__repair": {
      id: "remote__repair",
      kind: "terminal",
      symptom: "remote",
      recommendation: "repair",
      teacher: "genba-minoru",
      messages: [
        { text: "受光部や基板側が疑わしいときは、型番と症状をメモして相談を。リモコン交換で済むこともあります。" }
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
        { text: "純正部品が手に入りにくい古い機種で不調が重なるなら、買い替え比較も視野に。" }
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
        { text: "掃除で気をつけたいのは、スプレーと分解です。安全な範囲を超えると、かえって壊します。" },
        { text: "次に当てはまりますか？" },
        { fromItem: { field: "stopSigns", as: "list" } }
      ],
      quickReplies: [
        { label: "当てはまる", next: "cleaning__stop" },
        { label: "当てはまらない", next: "cleaning__q1" }
      ]
    },
    "cleaning__stop": {
      id: "cleaning__stop",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "stop-call-pro",
      teacher: "tomuro-mamoru",
      messages: [
        { text: "電装部品へのスプレーや奥の分解は、自己流だと故障や発火の元です。そこはプロに任せましょう。" }
      ],
      actions: [{ type: "cleaning" }, { type: "article", slug: "cleaning-spray-risk" }]
    },
    "cleaning__q1": {
      id: "cleaning__q1",
      kind: "question",
      symptom: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "風の欠席、だいたいホコリが原因です。まずは安全な範囲だけ。" },
        { fromItem: { field: "safeChecks", as: "list" } }
      ],
      quickReplies: [
        { label: "においが減った", next: "cleaning__diy" },
        { label: "まだカビ臭が気になる", next: "cleaning__q2" }
      ]
    },
    "cleaning__diy": {
      id: "cleaning__diy",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "diy-wait",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "フィルター掃除と送風乾燥でここまで来ましたね。" },
        { text: "定期的な掃除でカビ臭は出にくくなります。奥は無理に触らないのがコツです。" }
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
        { text: "奥のカビは無理に分解せず、プロの分解クリーニングか、年式しだいで買い替えかを比べます。どちらが近いですか？" },
        { fromItem: { field: "repairSignals", as: "list" } },
        { fromItem: { field: "replacementSignals", as: "list" } }
      ],
      quickReplies: [
        { label: "年式が新しめ・におい中心", next: "cleaning__cleaning" },
        { label: "10年以上・他の不調もある", next: "cleaning__replacement" }
      ]
    },
    "cleaning__cleaning": {
      id: "cleaning__cleaning",
      kind: "terminal",
      symptom: "cleaning",
      recommendation: "cleaning",
      teacher: "kazetooshi-kiyoshi",
      messages: [
        { text: "奥の汚れは、プロの分解クリーニングが安全で確実です。市販スプレーで奥を狙うより、結局はやく済みます。" }
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
        { text: "お掃除機能付きで分解清掃費が高く、他の不調も重なるなら、買い替えとの比較が現実的です。" }
      ],
      actions: [{ type: "replacement" }]
    }
  }
};
