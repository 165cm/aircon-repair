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

export const diagnosisChat: DiagnosisChatScript = {
  startNodeId: "greeting",
  nodes: {
    // ===== あいさつ（受付＝熱逃先生） =====
    greeting: {
      id: "greeting",
      kind: "question",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "やあ！エアコン修理科の保健室へようこそ 👋" },
        { text: "どんな症状が出てる？ 一緒に見ていこう。" }
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
        { text: "ちょっと待って！まず大事な確認から。" },
        { text: "次のどれかに当てはまる？" },
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
        { text: "それは止めるサインだよ ⚠️" },
        { text: "コンセントを抜いて、業者に相談してね。無理しないで。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "not-cooling__q1": {
      id: "not-cooling__q1",
      kind: "question",
      symptom: "not-cooling",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "了解！まず外側から3つ確認してみて。" },
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
        { text: "直ったね！よかった 😊" },
        { text: "フィルターは定期的に掃除しておくと詰まりにくいよ。無理な出費はなし。" }
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
        { text: "年式と症状の数で、次の道が変わってくるよ。" },
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
        { text: "症状メモを持って相談が一番早いよ。" },
        { text: "エラーコード・音・冷え方を控えてから連絡してみて。" }
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
        { text: "修理費と新品の価格、まず比べてから決めよう。" },
        { text: "工事込みの総額を見ると迷いにくくなるよ。" }
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
        { text: "水まわりは電源の近くに触らないのが鉄則！" },
        { text: "次のどれかある？" },
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
        { text: "それは止めるサインだよ ⚠️" },
        { text: "高所作業や壁内の水は、無理せず業者に任せてね。" }
      ],
      actions: [{ type: "contractor" }, { type: "danger-anchor" }]
    },
    "water-leak__q1": {
      id: "water-leak__q1",
      kind: "question",
      symptom: "water-leak",
      teacher: "mizumichi-nukeru",
      messages: [
        { text: "出口がふさがると下に出てきちゃうんだよね 💧" },
        { text: "外側からこの3つ見てみて。" },
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
        { text: "水が止まったね！よかった 😊" },
        { text: "ドレンの先端、時々チェックしてみてね。" }
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
        { text: "年式と他の症状で道が変わるよ。どっちに近い？" },
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
        { text: "どこから・いつ漏れるかをメモして相談しよう。" }
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
        { text: "複数部品の交換になりそうなら、買い替えとの比較が早道だよ。" }
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
        { text: "異音は機械のSOSかも。ここは特に慎重に！" },
        { text: "次のどれかある？ ひとつでも当てはまったらすぐ止めて。" },
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
        { text: "「当たってる」か「ゆるんでる」ことが多いよ。外側から見てみて。" },
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
        { text: "直ったね！ここは買うものなし 👌" },
        { text: "音のタイミングをメモしておくと、再発のときに役立つよ。" }
      ],
      actions: [{ type: "article", slug: "strange-noise" }]
    },
    "noise__q2": {
      id: "noise__q2",
      kind: "question",
      symptom: "noise",
      teacher: "netsugashi-reitaro",
      messages: [
        { text: "表面で直らない音は中身の話かも。年式と症状で見てみよう。" },
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
        { text: "圧縮機系の異常は修理費が高くなりがち。買い替えと比べてみて。" }
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
        { text: "リモコン不調は基本低リスク。でも本体にこのサインがあったら別の話。" },
        { text: "当てはまるのある？" },
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
        { text: "まず一番安い確認から！電池交換で直ることも多いよ。" },
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
        { text: "切り分けできたね 👍 急ぎじゃないなら様子見でOK。" },
        { text: "送信部が光らないときだけ、汎用リモコンを検討してみて。" }
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
        { text: "本体側か、リモコン側か、年式で見てみよう。" },
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
        { text: "型番と症状をメモして相談してみて。リモコン交換で済むこともあるよ。" }
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
        { text: "純正部品が入りにくい古い機種で不調が重なるなら、買い替え比較も考えてみて。" }
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
        { text: "掃除のスプレーと分解には気をつけてね！" },
        { text: "次のどれかある？" },
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
        { text: "ホコリが原因のことが多いよ！まず安全な範囲だけやってみて 🌬️" },
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
        { text: "においが消えたね！よかった 😊" },
        { text: "定期的なフィルター掃除でカビ臭は出にくくなるよ。奥は触らないのがコツ。" }
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
        { text: "奥のカビは自力はムリ！プロか買い替えか比べてみよう。" },
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
        { text: "奥の汚れはプロの分解クリーニングが確実だよ 🧹" },
        { text: "市販スプレーより早くてきれいになるから、長い目で見るとお得。" }
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
        { text: "お掃除機能付きで清掃費が高く、不調が重なるなら買い替えとの比較が現実的だよ。" }
      ],
      actions: [{ type: "replacement" }]
    }
  }
};
