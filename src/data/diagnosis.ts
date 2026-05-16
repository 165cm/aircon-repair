export type DiagnosisItem = {
  id: string;
  label: string;
  urgency: "low" | "medium" | "high";
  safeChecks: string[];
  stopSigns: string[];
  repairSignals: string[];
  replacementSignals: string[];
  productIds: string[];
  articleSlugs: string[];
};

export const diagnosisItems: DiagnosisItem[] = [
  {
    id: "not-cooling",
    label: "冷えない・暑い",
    urgency: "medium",
    safeChecks: [
      "フィルターにホコリが詰まっていないか確認する",
      "室外機の前後に荷物や草木がないか確認する",
      "冷房16〜18度で10分ほど動かし、風が冷たいか見る"
    ],
    stopSigns: [
      "室外機が動かない、焦げ臭い、ブレーカーが落ちる",
      "冷媒漏れや配線に触る必要がありそう",
      "高齢者・乳幼児・ペットがいる部屋で室温が下がらない"
    ],
    repairSignals: [
      "購入から7年未満で、フィルター・室外機まわりに明確な原因がありそう",
      "エラーコードが出ていて、メーカー修理の対象部品が残っていそう",
      "設置環境や畳数は合っていて、症状が一部だけに限られる"
    ],
    replacementSignals: [
      "購入から10年以上で、冷えない・異音・水漏れなどが重なっている",
      "修理見積もりが新品本体の半額前後まで高くなりそう",
      "部屋の広さに対して能力不足、または省エネ性能の古さが気になる"
    ],
    productIds: ["thermo-hygrometer", "filter-brush", "outdoor-cover", "circulator", "aircon-6tatami", "aircon-10tatami"],
    articleSlugs: ["not-cooling", "outdoor-unit-check", "call-contractor"]
  },
  {
    id: "water-leak",
    label: "水漏れする",
    urgency: "medium",
    safeChecks: [
      "室内機の下に家電や紙類を置かない",
      "ドレンホース先端が水や泥でふさがっていないか外側から見る",
      "フィルターを外して乾いたホコリを掃除する"
    ],
    stopSigns: [
      "室内機の分解が必要",
      "天井・壁の中から水が出ている",
      "脚立作業が不安定になる高さに設置されている"
    ],
    repairSignals: [
      "ドレン詰まりなど排水経路の問題が疑われ、年式が新しめ",
      "本体は冷えていて、水漏れ以外の症状が少ない",
      "設置から短期間で施工や排水勾配の確認が必要そう"
    ],
    replacementSignals: [
      "10年以上使用し、水漏れに加えて冷えない・異音もある",
      "内部の腐食や複数部品交換が必要と言われた",
      "クリーニングや軽修理を繰り返している"
    ],
    productIds: ["drain-pump", "filter-brush"],
    articleSlugs: ["water-leak", "drain-hose", "call-contractor"]
  },
  {
    id: "noise",
    label: "異音・振動がある",
    urgency: "high",
    safeChecks: [
      "室外機の周りに接触している物がないか確認する",
      "フィルターや前面パネルがきちんとはまっているか見る",
      "音が出るタイミングとランプ点滅をメモする"
    ],
    stopSigns: [
      "金属音、焦げ臭さ、煙、火花がある",
      "室外機のファンに物が絡んでいるが手が届かない",
      "内部から連続した大きな異音がする"
    ],
    repairSignals: [
      "外装やフィルターの取り付けずれなど、原因が表面にありそう",
      "購入から7年未満で、保証やメーカー修理の余地がある",
      "異音が一時的で、冷え方は大きく落ちていない"
    ],
    replacementSignals: [
      "10年以上使用し、圧縮機やファンモーター系の異常が疑われる",
      "大きな金属音や振動が続き、修理費が高額になりそう",
      "異音に加えて冷えない、ブレーカーが落ちる症状がある"
    ],
    productIds: ["thermo-hygrometer"],
    articleSlugs: ["strange-noise", "call-contractor"]
  },
  {
    id: "remote",
    label: "リモコンが効かない",
    urgency: "low",
    safeChecks: [
      "電池を新しいものに替える",
      "スマホカメラ越しに送信部が光るか確認する",
      "本体の応急運転ボタンで反応するか確認する"
    ],
    stopSigns: [
      "本体側の電源が入らない",
      "ブレーカーやコンセントまわりに異常がある",
      "焦げ臭さや異音を伴う"
    ],
    repairSignals: [
      "リモコン交換や電池交換で切り分けできそう",
      "本体の応急運転では動く",
      "購入年数が浅く、本体側の症状が少ない"
    ],
    replacementSignals: [
      "本体基板や受光部の故障で、年式が古い",
      "リモコン以外にも冷えない・異音・水漏れがある",
      "純正部品の入手が難しい"
    ],
    productIds: ["remote-battery"],
    articleSlugs: ["remote-not-working", "call-contractor"]
  },
  {
    id: "cleaning",
    label: "掃除・カビ臭が気になる",
    urgency: "medium",
    safeChecks: [
      "フィルターと外装だけを安全に掃除する",
      "送風運転で内部を乾燥させる",
      "においが強い場合は使用頻度と設置年数をメモする"
    ],
    stopSigns: [
      "市販スプレーを電装部品にかける必要がある",
      "ファンや熱交換器の奥を分解して洗いたい",
      "お掃除機能付きで分解手順が分からない"
    ],
    repairSignals: [
      "フィルターや外装清掃で改善しそう",
      "年式が新しく、におい以外の不調がない",
      "プロの分解クリーニング費用で延命できそう"
    ],
    replacementSignals: [
      "10年以上使用し、カビ臭・冷えない・水漏れが重なっている",
      "お掃除機能付きで分解清掃費が高く、修理費も見込まれる",
      "省エネ性能や部屋の広さに合わないことも気になる"
    ],
    productIds: ["filter-brush"],
    articleSlugs: ["filter-cleaning", "cleaning-spray-risk", "call-contractor"]
  }
];
