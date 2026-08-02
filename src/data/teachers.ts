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
  name: "風見",
  subject: "現役エアコン修理技師・エアコン保健室の案内役",
  catchphrase: "この症状だけでは、まだ故障とは断定できません。順番に切り分ければ、原因は見えてきます。",
  profile: "風見正治、45歳。現場経験をもとに、止めるべきサイン、安全にできる確認、修理や買い替えの目安を分かりやすく整理します。",
  detailProfile: [
    "現役の修理技師として、冷えない、水漏れ、異音、リモコン不調などの相談を受けています。",
    "得意なのは、測定と状況確認で原因を一つずつ切り分けること。分解や高所作業はすすめません。",
    "暑さに弱く、白衣を空調服に改造しました。工具の手入れには少し細かい45歳です。"
  ],
  image: "/images/kazami/kazami-bust.png",
  avatarImage: "/images/kazami/kazami-x-avatar.png"
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
