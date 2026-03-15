import type { IconName } from "@/components/icons";

export const roles = [
  {
    id: "ba3ati",
    name: "البعاتي",
    team: "البعاتي",
    color: "#4A90E2",
    description:
      "القاتل الذي يتخفى بين الأهالي. كل ليلة يختار ضحية للقضاء عليها.",
  },
  {
    id: "al3omda",
    name: "العمدة",
    team: "الأهالي",
    color: "#50E3C2",
    description: "حامي القرية. كل ليلة يختار لاعباً لحمايته من البعاتي.",
  },
  {
    id: "damazeen",
    name: "شيخ الدمازين",
    team: "الأهالي",
    color: "#E94F37",
    description:
      "المحارب الشجاع. يمكنه إما القضاء على مشبوه أو حماية الجميع لليلة واحدة.",
  },
  {
    id: "sitalwada3",
    name: "ست الودع",
    team: "الأهالي",
    color: "#8E44AD",
    description: "العرّافة. كل ليلة تكشف الدور السري للاعب واحد.",
  },
  {
    id: "ballah",
    name: "بله اب سيف",
    team: "الأهالي",
    color: "#D35400",
    description:
      "المحارب الصامت. يملك سيفاً يستخدمه مرة واحدة طوال اللعبة للقضاء على لاعب بضربة لا يمكن صدها.",
  },
  {
    id: "abujanzeer",
    name: "ابو جنزير",
    team: "ابو جنزير",
    color: "#F1C40F",
    description:
      "الذئب الوحيد. يلعب لوحده ضد الجميع. يفوز عندما يكون آخر من يبقى.",
  },
];

export const features: { icon: IconName; title: string; description: string }[] = [
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
    title: "6 أدوار فريدة",
    description: "كل دور بقدرات ليلية خاصة",
  },
  {
    icon: "phone",
    title: "iOS و Android",
    description: "متوفرة على كلا المنصتين",
  },
];

export const gameSteps: { step: number; title: string; description: string; icon: IconName }[] = [
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
