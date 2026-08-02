export type MakerContact = {
  id: string;
  /** メーカー名（読者が保証書や本体シールで見る名前） */
  name: string;
  /** 読者が本体やリモコンで見かけるブランド名 */
  brands: string[];
  /** 修理受付・問い合わせの公式ページ */
  repairUrl: string;
  /** エアコンのサポート入口（型番検索・取説・FAQ） */
  supportUrl: string;
  /** そのメーカーの窓口で先に案内される内容 */
  note: string;
  /**
   * 公式の電話番号。番号は変わることがあるため、
   * 公式ページで確認できたものだけを入れる。空のままなら表示しない。
   */
  tel?: string;
};

/**
 * 家庭用エアコンの主要メーカーの公式窓口。
 *
 * 電話番号はここに直接書かない方針にしている。番号は改廃があり、
 * 古い番号を載せると困っている読者を余計に迷わせるため、
 * 公式ページへ送って最新の番号を見てもらう。
 * 公式ページで番号を確認できた場合だけ tel に入れる。
 *
 * URLは各社の公式ドメインのみ。リンク切れを見つけたら、
 * 公式サポートのトップページに差し替える。
 */
export const makerContacts: MakerContact[] = [
  {
    id: "daikin",
    name: "ダイキン工業",
    brands: ["うるさらX", "risora", "DAIKIN"],
    repairUrl: "https://www.daikincc.com/inquiry.html",
    supportUrl: "https://www.daikincc.com/inquiry.html",
    note: "修理受付、部品、取扱説明書の入口がまとまっています。"
  },
  {
    id: "panasonic",
    name: "パナソニック",
    brands: ["エオリア", "Eolia", "Panasonic"],
    repairUrl: "https://panasonic.jp/aircon/support.html",
    supportUrl: "https://panasonic.jp/aircon/support.html",
    note: "出張修理の申し込みには品番が必要です。"
  },
  {
    id: "mitsubishi-electric",
    name: "三菱電機",
    brands: ["霧ヶ峰", "MITSUBISHI"],
    repairUrl: "https://www.mitsubishielectric.co.jp/ldg/repair/kirigamine.html",
    supportUrl: "https://www.mitsubishielectric.co.jp/support/",
    note: "故障診断と修理料金の目安を見てから依頼できます。"
  },
  {
    id: "hitachi",
    name: "日立（日立グローバルライフソリューションズ）",
    brands: ["白くまくん", "HITACHI"],
    repairUrl: "https://kadenfan.hitachi.co.jp/support/inquiry/repair/consultation.html",
    supportUrl: "https://kadenfan.hitachi.co.jp/support/ra/toiawase.html",
    note: "故障診断のあと、そのままWebで修理依頼まで進めます。"
  },
  {
    id: "fujitsu-general",
    name: "富士通ゼネラル",
    brands: ["nocria", "ノクリア"],
    repairUrl: "https://www.fujitsu-general.com/jp/support/index.html",
    supportUrl: "https://www.fujitsu-general.com/jp/support/diagnosis/as/index.html",
    note: "形名とランプの点滅からチャットで診断できます。"
  },
  {
    id: "sharp",
    name: "シャープ",
    brands: ["プラズマクラスターエアコン", "SHARP"],
    repairUrl: "https://jp.sharp/support/rp_4649.html",
    supportUrl: "https://jp.sharp/support/air_con/",
    note: "電話、LINE、チャットから相談方法を選べます。"
  },
  {
    id: "toshiba",
    name: "東芝ライフスタイル",
    brands: ["大清快", "TOSHIBA"],
    repairUrl: "https://www.toshiba-lifestyle.com/jp/support/uketsuke/",
    supportUrl: "https://www.toshiba-lifestyle.com/jp/support/air_conditioners/",
    note: "出張修理をWebフォームから申し込めます。"
  },
  {
    id: "mitsubishi-heavy",
    name: "三菱重工サーマルシステムズ",
    brands: ["ビーバーエアコン", "BEAVER"],
    repairUrl: "https://www.mhi.com/jp/group/mhiair/inquiry.html",
    supportUrl: "https://www.mhi.com/jp/group/mhiair/",
    note: "エラーコードが出ているときは、形式と一緒に伝えます。"
  },
  {
    id: "corona",
    name: "コロナ",
    brands: ["CORONA", "冷房専用エアコン"],
    repairUrl: "https://www.corona.co.jp/support/service/",
    supportUrl: "https://www.corona.co.jp/support/faq/aircon.html",
    note: "修理・アフターサービスの窓口が分かれています。"
  },
  {
    id: "irisohyama",
    name: "アイリスオーヤマ",
    brands: ["IRIS OHYAMA"],
    repairUrl: "https://www.irisohyama.co.jp/support/repair-fee-sim-large/aircon",
    supportUrl: "https://www.irisohyama.co.jp/support/",
    note: "品番と症状から修理料金の目安を出してから申し込めます。"
  },
  {
    id: "hisense",
    name: "ハイセンスジャパン",
    brands: ["Hisense"],
    repairUrl: "https://www.hisense.co.jp/repair/contact/",
    supportUrl: "https://www.hisense.co.jp/support/",
    note: "修理申込フォームから受け付けています。"
  },
  {
    id: "tcl",
    name: "TCLジャパンエレクトロニクス",
    brands: ["TCL"],
    repairUrl: "https://www.tcl.com/jp/ja/services.html",
    supportUrl: "https://www.tcl.com/jp/ja/product-help",
    note: "問い合わせ前に、型番・保証書・購入時のレシートを用意します。"
  }
];
