export type TeacherId =
  | "netsugashi-reitaro"
  | "tomuro-mamoru"
  | "kazetooshi-kiyoshi"
  | "mizumichi-nukeru"
  | "kaikae-shinji"
  | "genba-minoru";

export type Teacher = {
  id: TeacherId;
  name: string;
  subject: string;
  catchphrase: string;
  profile: string;
  image: string;
};

export const teachers = {
  "netsugashi-reitaro": {
    id: "netsugashi-reitaro",
    name: "熱逃 冷太郎",
    subject: "熱と仕組み",
    catchphrase: "冷やしてるんじゃない。熱を退学させてるんだ。",
    profile: "理科準備室の温度計を毎朝確認。黒板いっぱいの矢印で、熱の逃げ道を追い詰める熱血先生。",
    image: "/images/teachers/netsugashi-reitaro.webp"
  },
  "tomuro-mamoru": {
    id: "tomuro-mamoru",
    name: "止室 守",
    subject: "安全指導",
    catchphrase: "迷ったら止める。それがいちばん早い安全確認だ。",
    profile: "笛とチェックリストを常備。危ない作業の前だけ声がよく通る、生活指導室の番人。",
    image: "/images/teachers/tomuro-mamoru.webp"
  },
  "kazetooshi-kiyoshi": {
    id: "kazetooshi-kiyoshi",
    name: "風通 清志",
    subject: "掃除と空気",
    catchphrase: "風の欠席、だいたいホコリが原因です。",
    profile: "窓を開けるタイミングが絶妙。掃除ロッカーの在庫まで把握している、空気の学級委員。",
    image: "/images/teachers/kazetooshi-kiyoshi.webp"
  },
  "mizumichi-nukeru": {
    id: "mizumichi-nukeru",
    name: "水道 ぬける",
    subject: "排水と水漏れ",
    catchphrase: "水は正直。出口をふさぐと、すぐ職員室に来る。",
    profile: "雨の日ほど機嫌がいい設備担当。床の水滴を見ただけで、だいたいの流れを言い当てる。",
    image: "/images/teachers/mizumichi-nukeru.webp"
  },
  "kaikae-shinji": {
    id: "kaikae-shinji",
    name: "買替 進路",
    subject: "買い替え進路",
    catchphrase: "本体価格だけで進路希望を出すな。工事費まで面談だ。",
    profile: "家電チラシを赤ペンで添削する進路指導。勢い買いの前に、設置条件を静かに差し出す。",
    image: "/images/teachers/kaikae-shinji.webp"
  },
  "genba-minoru": {
    id: "genba-minoru",
    name: "現場 実",
    subject: "仕事入門",
    catchphrase: "工具より先に、見る目を持ってこい。",
    profile: "作業着で来る非常勤講師。口数は少ないけれど、現場で出る一言だけ妙に忘れられない。",
    image: "/images/teachers/genba-minoru.webp"
  }
} satisfies Record<TeacherId, Teacher>;
