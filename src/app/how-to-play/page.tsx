"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const roles = [
  {
    name: "البعاتي",
    team: "البعاتي",
    teamColor: "var(--role-ba3ati)",
    icon: "🗡️",
    description:
      "القاتل الذي يتخفى بين الأهالي. كل ليلة يختار ضحية للقضاء عليها.",
    ability: "اختيار لاعب للقضاء عليه كل ليلة",
    goal: "القضاء على جميع الأهالي حتى يتساوى عددهم مع عدد البعاتي أو يتجاوزه",
    tips: [
      "تصرف بشكل طبيعي أثناء النقاش ولا تلفت الانتباه",
      "وجّه الاتهامات بحذر نحو الأبرياء",
      "حاول معرفة من هو العمدة لاستهدافه",
      "تجنب استهداف نفس الفريق إذا كنتم أكثر من بعاتي",
    ],
  },
  {
    name: "العمدة",
    team: "الأهالي",
    teamColor: "var(--role-al3omda)",
    icon: "🛡️",
    description: "حامي القرية. كل ليلة يختار لاعباً لحمايته من البعاتي.",
    ability: "حماية لاعب واحد كل ليلة من القتل",
    goal: "حماية الأبرياء ومساعدة القرية في كشف البعاتي",
    tips: [
      "راقب سلوك اللاعبين لتحمي من تعتقد أنه مستهدف",
      "يمكنك حماية نفسك أيضاً إذا شعرت بالخطر",
      "انتبه لأنماط القتل لتتوقع الهدف التالي",
    ],
  },
  {
    name: "شيخ الدمازين",
    team: "الأهالي",
    teamColor: "var(--role-damazeen)",
    icon: "⚔️",
    description:
      "المحارب الشجاع. يمكنه إما القضاء على مشبوه أو حماية الجميع لليلة واحدة.",
    ability:
      "قدرة خاصة تُستخدم مرة واحدة فقط طوال اللعبة: إما قتل لاعب أو حماية الجميع",
    goal: "استخدام قدرته في اللحظة المناسبة لصالح القرية",
    tips: [
      "لا تتسرع في استخدام قدرتك — انتظر حتى تجمع معلومات كافية",
      "إذا كنت متأكداً من هوية البعاتي، استخدم القتل",
      "إذا كانت القرية في خطر كبير، استخدم الحماية الشاملة",
      "تذكّر: قدرتك تُستخدم مرة واحدة فقط!",
    ],
  },
  {
    name: "ست الودع",
    team: "الأهالي",
    teamColor: "var(--role-sitalwada3)",
    icon: "🔮",
    description: "العرّافة. كل ليلة تكشف الدور السري للاعب واحد.",
    ability: "كشف دور لاعب واحد كل ليلة",
    goal: "جمع المعلومات ومساعدة القرية في تحديد البعاتي",
    tips: [
      "لا تكشف هويتك مباشرة — البعاتي سيستهدفك فوراً",
      "شارك المعلومات بذكاء دون أن تفضح نفسك",
      "ابدأ بفحص اللاعبين الأكثر اشتباهاً",
      "إذا وجدت البعاتي، وجّه الاتهام بطريقة غير مباشرة",
    ],
  },
  {
    name: "بله اب سيف",
    team: "الأهالي",
    teamColor: "var(--role-ballah)",
    icon: "⚔️",
    description:
      "المحارب الصامت. يملك سيفاً يستخدمه مرة واحدة طوال اللعبة للقضاء على لاعب بضربة لا يمكن صدها.",
    ability: "قتل لاعب واحد بضربة سيف لا يمكن صدها — تُستخدم مرة واحدة فقط طوال اللعبة",
    goal: "استخدام السيف في اللحظة المناسبة للقضاء على البعاتي أو من يهدد القرية",
    tips: [
      "لا تتسرع في استخدام سيفك — انتظر حتى تكون متأكداً من هوية البعاتي",
      "ضربتك لا يمكن صدها حتى من العمدة أو الدمازين — استغل هذه الميزة",
      "إذا كشفت ست الودع هوية البعاتي، هذا أفضل وقت لاستخدام سيفك",
      "تذكّر: فرصتك واحدة فقط طوال اللعبة!",
    ],
  },
  {
    name: "ابو جنزير",
    team: "ابو جنزير",
    teamColor: "var(--role-abujanzeer)",
    icon: "⛓️",
    description:
      "الذئب الوحيد. يلعب لوحده ضد الجميع. يفوز عندما يكون آخر من يبقى.",
    ability: "اختيار لاعب للقضاء عليه كل ليلة (مستقل عن البعاتي)",
    goal: "البقاء حياً حتى النهاية والفوز وحده",
    tips: [
      "تحالف مع الأهالي ظاهرياً ضد البعاتي",
      "حاول أن توقع الفريقين ببعضهم",
      "لا تجذب الانتباه — ابقَ في الظل",
      "استهدف اللاعبين الأقوياء لتسهيل طريقك للفوز",
    ],
  },
];

const gamePhases = [
  {
    phase: "إنشاء الغرفة والانضمام",
    icon: "🚪",
    color: "var(--role-al3omda)",
    description:
      "يقوم أحد اللاعبين بإنشاء غرفة (خاصة بكود أو عامة) ثم ينضم باقي اللاعبين.",
    details: [
      "الحد الأدنى ٥ لاعبين والحد الأقصى ١٥ لاعباً",
      "يمكن لمنشئ الغرفة تحديد عدد كل دور حسب عدد اللاعبين",
      "الغرف الخاصة تحتاج كود للانضمام، والعامة متاحة للجميع",
    ],
  },
  {
    phase: "توزيع الأدوار",
    icon: "🎭",
    color: "var(--role-sitalwada3)",
    description: "يتم توزيع الأدوار سرياً على جميع اللاعبين بشكل عشوائي.",
    details: [
      "كل لاعب يرى دوره فقط ولا يعرف أدوار الآخرين",
      "يمكن لمنشئ الغرفة التحكم في عدد كل دور",
      "الأدوار المتاحة: البعاتي، العمدة، شيخ الدمازين، ست الودع، بله اب سيف، ابو جنزير",
    ],
  },
  {
    phase: "مرحلة الليل",
    icon: "🌙",
    color: "var(--role-ba3ati)",
    description: "القرية تنام وكل صاحب دور خاص ينفذ قدرته سراً.",
    details: [
      "البعاتي يختار ضحية للقضاء عليها",
      "العمدة يختار لاعباً لحمايته",
      "ست الودع تكشف دور لاعب واحد",
      "شيخ الدمازين يستخدم قدرته (إن لم يستخدمها بعد)",
      "بله اب سيف يستخدم سيفه (إن لم يستخدمه بعد)",
      "ابو جنزير يختار ضحيته",
      "جميع الإجراءات تتم بشكل سري ومتزامن",
    ],
  },
  {
    phase: "نتائج الليل",
    icon: "🌅",
    color: "var(--terracotta)",
    description: "القرية تستيقظ وتكتشف ما حدث أثناء الليل.",
    details: [
      "يُعلَن عن اللاعبين الذين تم القضاء عليهم",
      "إذا حمى العمدة الضحية بنجاح، ينجو اللاعب",
      "اللاعبون المقضي عليهم يخرجون من اللعبة",
    ],
  },
  {
    phase: "مرحلة النقاش",
    icon: "☀️",
    color: "var(--role-al3omda)",
    description:
      "اللاعبون يتناقشون عبر المحادثة الصوتية المباشرة لتحديد المشتبه بهم.",
    details: [
      "محادثة صوتية مدمجة في اللعبة",
      "كل لاعب يحاول إقناع الآخرين بنظريته",
      "البعاتي يحاول التمويه وتوجيه الاتهامات بعيداً عنه",
      "الأهالي يحاولون تحليل السلوكيات لكشف البعاتي",
      "وقت النقاش محدد بمؤقت قابل للتعديل",
    ],
  },
  {
    phase: "مرحلة التصويت",
    icon: "🗳️",
    color: "var(--role-damazeen)",
    description: "القرية تصوت لطرد اللاعب الأكثر اشتباهاً.",
    details: [
      "كل لاعب يصوت لطرد لاعب واحد",
      "اللاعب الحاصل على أكثر الأصوات يُطرد من القرية",
      "في حالة التعادل، لا يُطرد أحد",
    ],
  },
  {
    phase: "شروط الفوز",
    icon: "🏆",
    color: "var(--role-abujanzeer)",
    description:
      "اللعبة تستمر بتكرار الليل والنهار حتى يتحقق شرط فوز أحد الفرق.",
    details: [
      "فوز البعاتي: عندما يتساوى عدد البعاتي مع الأهالي أو يتجاوزه",
      "فوز الأهالي: عندما يتم القضاء على جميع البعاتي",
      "فوز ابو جنزير: عندما يكون آخر لاعب على قيد الحياة",
    ],
  },
];

const tips = [
  {
    icon: "🧠",
    title: "راقب وحلّل",
    description:
      "انتبه لسلوك اللاعبين وردود أفعالهم. من يتهم من؟ من يدافع عن من؟ هذه الأنماط تكشف الكثير.",
  },
  {
    icon: "🤫",
    title: "لا تكشف أوراقك",
    description:
      "إذا كان لديك دور خاص، لا تكشف هويتك مبكراً. المعلومات قوة — استخدمها بحكمة.",
  },
  {
    icon: "🎭",
    title: "أتقن التمثيل",
    description:
      "سواء كنت بعاتي أو أهالي، تعلم كيف تتحكم في لغة جسدك ونبرة صوتك أثناء النقاش.",
  },
  {
    icon: "🤝",
    title: "ابنِ تحالفات",
    description:
      "التعاون مع لاعبين تثق بهم يزيد فرصك في البقاء. لكن كن حذراً — قد يكون حليفك هو البعاتي!",
  },
  {
    icon: "📊",
    title: "تتبع المعلومات",
    description:
      "حاول تذكر تصويتات اللاعبين ومواقفهم في كل جولة. الأنماط المتكررة تساعد في كشف الأدوار.",
  },
  {
    icon: "🎯",
    title: "اختر معاركك",
    description:
      "لا تتهم كل من يختلف معك. ركّز على الأدلة الحقيقية وقدّم حججاً مقنعة عند التصويت.",
  },
];

export default function HowToPlayPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-cairo)",
        background: "var(--indigo)",
        color: "var(--sand-light)",
      }}
    >
      {/* Geometric pattern background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(60deg, transparent 45%, var(--terracotta) 45%, var(--terracotta) 55%, transparent 55%),
            linear-gradient(-60deg, transparent 45%, var(--terracotta) 45%, var(--terracotta) 55%, transparent 55%)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: "rgba(26, 26, 46, 0.85)",
          borderColor: "rgba(199, 91, 57, 0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold transition-colors hover:opacity-80"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--terracotta)",
            }}
          >
            ← العودة للرئيسية
          </Link>
          <Link href="/">
            <Image src="/icon1.png" alt="البعاتي" width={40} height={40} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div
          className="absolute top-8 right-12 opacity-15"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "20px solid var(--terracotta)",
          }}
        />
        <div
          className="absolute top-20 left-20 opacity-10"
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "14px solid var(--sand)",
          }}
        />
        <div
          className="absolute bottom-12 right-1/3 opacity-10 rotate-180"
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "16px solid var(--terracotta)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="inline-block mb-6">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              className="mx-auto mb-4"
            >
              <polygon
                points="35,5 61,18 61,52 35,65 9,52 9,18"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="1.5"
              />
              <polygon
                points="35,12 54,22 54,48 35,58 16,48 16,22"
                fill="none"
                stroke="var(--sand)"
                strokeWidth="1"
                opacity="0.3"
              />
              <polygon
                points="35,22 44,27 44,43 35,48 26,43 26,27"
                fill="var(--terracotta)"
                opacity="0.4"
              />
            </svg>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--terracotta)",
            }}
          >
            كيف تلعب البعاتي؟
          </h1>
          <p className="text-lg opacity-60 mb-2">دليل اللعب الكامل</p>
          <p className="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">
            البعاتي لعبة اجتماعية سودانية مستوحاة من ألعاب الأدوار الخفية. تتطلب
            الذكاء والخداع والمراقبة. تعرّف على قواعد اللعبة وأدوار اللاعبين
            واستراتيجيات الفوز.
          </p>
        </motion.div>
      </section>

      {/* Quick nav */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "مراحل اللعبة", href: "#phases" },
            { label: "الأدوار", href: "#roles" },
            { label: "نصائح", href: "#tips" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(199, 91, 57, 0.15)",
                color: "var(--terracotta)",
                border: "1px solid rgba(199, 91, 57, 0.3)",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Zigzag divider */}
      <div
        className="h-4 w-full"
        style={{
          background: `repeating-linear-gradient(
          90deg,
          transparent 0px, transparent 10px,
          var(--terracotta) 10px, var(--terracotta) 20px
        )`,
          opacity: 0.15,
          clipPath:
            "polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)",
        }}
      />

      {/* ===== SECTION 1: Game Overview ===== */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          custom={0}
          className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--terracotta-dark), var(--terracotta))",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, white 40%, white 60%, transparent 60%)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-reem-kufi)", color: "white" }}
            >
              ما هي لعبة البعاتي؟
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              البعاتي لعبة جماعية سودانية تجمع بين ٥ إلى ١٥ لاعباً. يتم توزيع
              أدوار سرية على اللاعبين: بعضهم &quot;بعاتي&quot; (أشرار) وبعضهم
              &quot;أهالي&quot; (أبرياء) مع أدوار خاصة. اللعبة تدور بين مرحلتي
              الليل والنهار — في الليل ينفذ كل دور قدرته السرية، وفي النهار
              يتناقش الجميع عبر المحادثة الصوتية ويصوتون لطرد المشتبه بهم.
            </p>
            <div
              className="flex flex-wrap justify-center gap-6 text-sm"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">👥</span>
                <span>٥ - ١٥ لاعب</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎭</span>
                <span>٦ أدوار مختلفة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎙️</span>
                <span>محادثة صوتية مباشرة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <span>١٠ - ٣٠ دقيقة</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== SECTION 2: Game Phases ===== */}
      <section
        id="phases"
        className="max-w-4xl mx-auto px-6 pb-16 scroll-mt-20"
      >
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-3"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--terracotta)",
            }}
          >
            مراحل اللعبة
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-8"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          {gamePhases.map((phase, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(199, 91, 57, 0.15)",
              }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 right-0 w-1.5 h-full rounded-r-2xl"
                style={{ background: phase.color, opacity: 0.6 }}
              />

              {/* Corner hexagon */}
              <div className="absolute top-3 left-3 opacity-10">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <polygon
                    points="10,1 18,5 18,15 10,19 2,15 2,5"
                    fill="none"
                    stroke={phase.color}
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Step number */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${phase.color}20` }}
                >
                  {phase.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${phase.color}30`,
                        color: phase.color,
                      }}
                    >
                      الخطوة {idx + 1}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold mt-1"
                    style={{
                      fontFamily: "var(--font-reem-kufi)",
                      color: phase.color,
                    }}
                  >
                    {phase.phase}
                  </h3>
                </div>
              </div>

              <p
                className="text-base mb-4 leading-relaxed"
                style={{ color: "var(--sand)", opacity: 0.85 }}
              >
                {phase.description}
              </p>

              <ul className="space-y-3 pr-2">
                {phase.details.map((detail, di) => (
                  <li
                    key={di}
                    className="flex gap-3 leading-relaxed text-sm"
                    style={{ color: "var(--sand)", opacity: 0.75 }}
                  >
                    <span className="mt-1.5 shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <polygon
                          points="5,0 10,5 5,10 0,5"
                          fill={phase.color}
                          opacity="0.5"
                        />
                      </svg>
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zigzag divider */}
      <div
        className="h-4 w-full"
        style={{
          background: `repeating-linear-gradient(
          90deg,
          transparent 0px, transparent 10px,
          var(--terracotta) 10px, var(--terracotta) 20px
        )`,
          opacity: 0.15,
          clipPath:
            "polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)",
        }}
      />

      {/* ===== SECTION 3: Roles ===== */}
      <section id="roles" className="max-w-4xl mx-auto px-6 py-16 scroll-mt-20">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-3"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--terracotta)",
            }}
          >
            الأدوار والقدرات
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-8"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
          </div>
          <p className="mt-4 opacity-60 max-w-xl mx-auto">
            كل دور في البعاتي له قدرات وأهداف مختلفة. تعرّف على كل دور وكيف
            تلعبه بذكاء.
          </p>
        </motion.div>

        {/* Teams overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              team: "الأهالي",
              color: "var(--role-al3omda)",
              icon: "🏘️",
              desc: "هدفهم كشف البعاتي وحماية القرية",
            },
            {
              team: "البعاتي",
              color: "var(--role-ba3ati)",
              icon: "🗡️",
              desc: "هدفهم القضاء على الأهالي دون انكشاف",
            },
            {
              team: "ابو جنزير",
              color: "var(--role-abujanzeer)",
              icon: "⛓️",
              desc: "يلعب وحده ويفوز بالبقاء الأخير",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="rounded-xl p-5 text-center"
              style={{
                background: `${t.color}15`,
                border: `1px solid ${t.color}30`,
              }}
            >
              <span className="text-3xl block mb-2">{t.icon}</span>
              <h3
                className="font-bold text-lg mb-1"
                style={{ color: t.color, fontFamily: "var(--font-reem-kufi)" }}
              >
                فريق {t.team}
              </h3>
              <p className="text-sm opacity-70">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Role cards */}
        <div className="space-y-8">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "var(--indigo-light)",
                border: `1px solid ${role.teamColor}30`,
              }}
            >
              {/* Role header */}
              <div
                className="p-6 pb-4"
                style={{
                  background: `linear-gradient(135deg, ${role.teamColor}20, transparent)`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: `${role.teamColor}25` }}
                  >
                    {role.icon}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-black"
                      style={{
                        fontFamily: "var(--font-reem-kufi)",
                        color: role.teamColor,
                      }}
                    >
                      {role.name}
                    </h3>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${role.teamColor}25`,
                        color: role.teamColor,
                      }}
                    >
                      فريق {role.team}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role details */}
              <div className="p-6 pt-2 space-y-4">
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--sand)", opacity: 0.85 }}
                >
                  {role.description}
                </p>

                {/* Ability */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: `${role.teamColor}10`,
                    border: `1px solid ${role.teamColor}15`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">⚡</span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: role.teamColor }}
                    >
                      القدرة الليلية
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--sand)", opacity: 0.8 }}
                  >
                    {role.ability}
                  </p>
                </div>

                {/* Goal */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(232,213,183,0.05)",
                    border: "1px solid rgba(232,213,183,0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🎯</span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: "var(--sand)" }}
                    >
                      الهدف
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--sand)", opacity: 0.8 }}
                  >
                    {role.goal}
                  </p>
                </div>

                {/* Tips */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">💡</span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: "var(--sand)" }}
                    >
                      نصائح اللعب
                    </span>
                  </div>
                  <ul className="space-y-2 pr-1">
                    {role.tips.map((tip, ti) => (
                      <li
                        key={ti}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ color: "var(--sand)", opacity: 0.7 }}
                      >
                        <span className="mt-1.5 shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8">
                            <polygon
                              points="4,0 8,4 4,8 0,4"
                              fill={role.teamColor}
                              opacity="0.5"
                            />
                          </svg>
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zigzag divider */}
      <div
        className="h-4 w-full"
        style={{
          background: `repeating-linear-gradient(
          90deg,
          transparent 0px, transparent 10px,
          var(--terracotta) 10px, var(--terracotta) 20px
        )`,
          opacity: 0.15,
          clipPath:
            "polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)",
        }}
      />

      {/* ===== SECTION 4: General Tips ===== */}
      <section id="tips" className="max-w-4xl mx-auto px-6 py-16 scroll-mt-20">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-3"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--terracotta)",
            }}
          >
            نصائح عامة
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-8"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--terracotta)" }}
            />
            <div
              className="h-[2px] w-12"
              style={{ background: "var(--terracotta)" }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeIn}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(199, 91, 57, 0.15)",
              }}
            >
              <div className="absolute top-3 left-3 opacity-10">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <polygon
                    points="8,0 16,8 8,16 0,8"
                    fill="none"
                    stroke="var(--terracotta)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <span className="text-3xl block mb-3">{tip.icon}</span>
              <h3
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  color: "var(--terracotta)",
                }}
              >
                {tip.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--sand)", opacity: 0.75 }}
              >
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl p-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--terracotta-dark), var(--terracotta))",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, white 40%, white 60%, transparent 60%)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative z-10">
            <p
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-reem-kufi)", color: "white" }}
            >
              جاهز تلعب؟
            </p>
            <p
              className="text-lg mb-6"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              حمّل البعاتي الآن وابدأ رحلتك في عالم الخداع والذكاء!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://apps.apple.com/app/alba3ati/id6746601498"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "var(--indigo)" }}
              >
                App Store 🍎
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.alba3ati.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "var(--indigo)" }}
              >
                Google Play 🤖
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8 px-6 text-center"
        style={{
          borderColor: "rgba(199, 91, 57, 0.15)",
          background: "rgba(26, 26, 46, 0.5)",
        }}
      >
        <div className="flex justify-center gap-8 mb-4">
          <Link
            href="/"
            className="text-sm hover:opacity-100 transition-opacity"
            style={{ color: "var(--sand)", opacity: 0.5 }}
          >
            الرئيسية
          </Link>
          <Link
            href="/privacy"
            className="text-sm hover:opacity-100 transition-opacity"
            style={{ color: "var(--sand)", opacity: 0.5 }}
          >
            سياسة الخصوصية
          </Link>
          <Link
            href="/community"
            className="text-sm hover:opacity-100 transition-opacity"
            style={{ color: "var(--sand)", opacity: 0.5 }}
          >
            إرشادات المجتمع
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--sand)", opacity: 0.3 }}>
          &copy; {new Date().getFullYear()} البعاتي. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
