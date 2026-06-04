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
  detailProfile: string[];
  image: string;
  avatarImage: string;
};

export const healthRoomTeacher = {
  id: "tomuro-mamoru",
  name: "すずね",
  subject: "保健室の先生",
  catchphrase: "安全確認から、修理か買い替えの判断まで一緒に整理します。",
  profile: "エアコンの不調を、止めるべきサイン、外側だけの確認、次の相談先に分けて案内するエアコン保健室の担当です。",
  detailProfile: [
    "エアコン専門の保健室で、冷えない、水漏れ、異音、リモコン不調の相談を受けています。",
    "得意なことは、症状を聞いて危険サインを先に見つけること。分解や高所作業はすすめません。",
    "髪留めは送風口モチーフ。暑い日は少しだけ口調がきびしくなりますが、判断はいつも落ち着き重視です。"
  ],
  image: "/images/teachers/kuuchou-tamotsu-profile.png",
  avatarImage: "/images/teachers/kuuchou-tamotsu-avatar.png"
} satisfies Teacher;

export const teachers = {
  "netsugashi-reitaro": {
    id: "netsugashi-reitaro",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "tomuro-mamoru": {
    id: "tomuro-mamoru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "kazetooshi-kiyoshi": {
    id: "kazetooshi-kiyoshi",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "mizumichi-nukeru": {
    id: "mizumichi-nukeru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "kaikae-shinji": {
    id: "kaikae-shinji",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "genba-minoru": {
    id: "genba-minoru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    detailProfile: healthRoomTeacher.detailProfile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  }
} satisfies Record<TeacherId, Teacher>;
