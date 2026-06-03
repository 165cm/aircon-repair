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
  avatarImage: string;
};

export const healthRoomTeacher = {
  id: "tomuro-mamoru",
  name: "すずね",
  subject: "保健室の先生",
  catchphrase: "まず深呼吸。風の音を聞いてから、次の処置を決めましょう。",
  profile: "エアコンの不調を、安全確認、修理相談、買い替え検討の順にやさしく整理する保健室の先生。髪留めだけ少し送風口っぽい。",
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
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "tomuro-mamoru": {
    id: "tomuro-mamoru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "kazetooshi-kiyoshi": {
    id: "kazetooshi-kiyoshi",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "mizumichi-nukeru": {
    id: "mizumichi-nukeru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "kaikae-shinji": {
    id: "kaikae-shinji",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  },
  "genba-minoru": {
    id: "genba-minoru",
    name: healthRoomTeacher.name,
    subject: healthRoomTeacher.subject,
    catchphrase: healthRoomTeacher.catchphrase,
    profile: healthRoomTeacher.profile,
    image: healthRoomTeacher.image,
    avatarImage: healthRoomTeacher.avatarImage
  }
} satisfies Record<TeacherId, Teacher>;
