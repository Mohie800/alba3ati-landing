import type { IconName } from "@/components/icons";

export const roles = [
  {
    id: "ba3ati",
    name: "البعاتي",
    team: "البعاتي",
    color: "#4A90E2",
    image: "/roles/RoleBa3ati.png",
    description:
      "القاتل الذي يتخفى بين الأهالي. كل ليلة يختار ضحية للقضاء عليها.",
  },
  {
    id: "ba3ati-kabeer",
    name: "بعاتي كبير",
    team: "البعاتي",
    color: "#1A5276",
    image: "/roles/RoleBa3atiKabeer.png",
    description:
      "قائد البعاتي. كل ليلة يختار القتل أو تحويل لاعب إلى بعاتي (إذا لم يكن محمياً). التحويل متاح مرة واحدة فقط طوال اللعبة.",
  },
  {
    id: "al3omda",
    name: "العمدة",
    team: "الأهالي",
    color: "#50E3C2",
    image: "/roles/RoleAl3omda.png",
    description: "حامي القرية. كل ليلة يختار لاعباً لحمايته من البعاتي.",
  },
  {
    id: "damazeen",
    name: "شيخ الدمازين",
    team: "الأهالي",
    color: "#E94F37",
    image: "/roles/RoleDamazeen.png",
    description:
      "المحارب الشجاع. يمكنه إما القضاء على مشبوه أو حماية الجميع لليلة واحدة.",
  },
  {
    id: "sitalwada3",
    name: "الكاشف",
    team: "الأهالي",
    color: "#8E44AD",
    image: "/roles/RoleSitAlwada3.png",
    description: "العرّافة. كل ليلة تكشف الدور السري للاعب واحد.",
  },
  {
    id: "ballah",
    name: "بله اب سيف",
    team: "الأهالي",
    color: "#D35400",
    image: "/roles/RoleBallahAbuSeif.png",
    description:
      "المحارب الصامت. يملك سيفاً يستخدمه مرة واحدة طوال اللعبة للقضاء على لاعب بضربة لا يمكن صدها.",
  },
  {
    id: "abujanzeer",
    name: "ابو جنزير",
    team: "ابو جنزير",
    color: "#F1C40F",
    image: "/roles/RoleAbuJanzeer.png",
    description:
      "الذئب الوحيد. يلعب لوحده ضد الجميع. يفوز عندما يكون آخر من يبقى.",
  },
  {
    id: "jenabu",
    name: "جنابو",
    team: "الأهالي",
    color: "#2E86C1",
    image: "/roles/RoleJenabu.png",
    description:
      "المحقق. كل ليلة يختار لاعبين لمعرفة إذا كانوا في نفس الفريق أم لا.",
  },
  {
    id: "wadalzalat",
    name: "وَد الزلط",
    team: "الأهالي",
    color: "#90EE90",
    image: "/roles/RoleWadAlzalat.png",
    description:
      "حارس القرية بجردل الماء. يملك رشة ماء واحدة فقط طوال اللعبة — إذا رشّ بعاتي مات البعاتي، وإذا رشّ بريئاً مات هو نفسه.",
  },
];

export const features: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "house",
    title: "غرف خاصة وعامة",
    description: "أنشئ غرف خاصة بكود أو انضم لغرف عامة",
  },
  {
    icon: "microphone",
    title: "صوت مباشر",
    description: "محادثة صوتية مدمجة لمرحلة النقاش",
  },
  {
    icon: "timer",
    title: "مؤقت ذكي",
    description: "أوقات نقاش قابلة للتعديل",
  },
  {
    icon: "people",
    title: "5 إلى 20 لاعب",
    description: "أحجام غرف مرنة",
  },
  {
    icon: "masks",
    title: "9 أدوار فريدة",
    description: "كل دور بقدرات ليلية خاصة",
  },
  {
    icon: "phone",
    title: "iOS و Android",
    description: "متوفرة على كلا المنصتين",
  },
];

export const gameSteps: {
  step: number;
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    step: 1,
    title: "أنشئ غرفة أو انضم لغرفة",
    description: "5 إلى 20 لاعب",
    icon: "door",
  },
  {
    step: 2,
    title: "يتم توزيع الأدوار سرياً",
    description: "كل لاعب يحصل على دور سري",
    icon: "masks",
  },
  {
    step: 3,
    title: "مرحلة الليل",
    description: "كل دور ينفذ قدرته الليلية سراً",
    icon: "moon",
  },
  {
    step: 4,
    title: "مرحلة النهار",
    description: "اللاعبون يتناقشون عبر المحادثة الصوتية",
    icon: "sun",
  },
  {
    step: 5,
    title: "التصويت",
    description: "القرية تصوت لطرد مشتبه",
    icon: "ballot",
  },
  {
    step: 6,
    title: "من يفوز؟",
    description:
      "البعاتي يفوز بتجاوز عدد الأهالي. الأهالي يفوزون بكشف كل البعاتي. ابو جنزير يفوز ببقائه الأخير.",
    icon: "trophy",
  },
];

export const aboutHighlights: { icon: IconName; text: string }[] = [
  { icon: "masks", text: "أدوار سرية فريدة" },
  { icon: "microphone", text: "محادثة صوتية مباشرة" },
  { icon: "lightning", text: "لعب في الوقت الحقيقي" },
];
