"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/icons";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const guidelines: { icon: IconName; title: string; color: string; items: string[] }[] = [
  {
    icon: "handshake",
    title: "١. الاحترام المتبادل",
    color: "var(--role-al3omda)",
    items: [
      "عامل جميع اللاعبين باحترام بغض النظر عن خلفيتهم أو مستواهم.",
      "لا يُسمح بالإهانات الشخصية أو التنمر أو التحرش بأي شكل.",
      "تقبّل الخسارة برحابة صدر واحتفل بالفوز بتواضع.",
      "تذكّر أن خلف كل شاشة إنسان — كن لطيفاً.",
    ],
  },
  {
    icon: "microphone",
    title: "٢. آداب المحادثة الصوتية",
    color: "var(--role-ba3ati)",
    items: [
      "تحدّث بأدب واحترام أثناء مرحلة النقاش.",
      "لا تصرخ أو تستخدم ألفاظاً مسيئة أو خادشة للحياء.",
      "أعطِ الجميع فرصة للتحدث ولا تقاطع الآخرين باستمرار.",
      "لا تستخدم المحادثة الصوتية لبث موسيقى أو أصوات مزعجة.",
    ],
  },
  {
    icon: "gamepad",
    title: "٣. اللعب النظيف",
    color: "var(--role-damazeen)",
    items: [
      "لا تستخدم برامج غش أو أدوات خارجية للحصول على ميزة غير عادلة.",
      "لا تتواصل مع لاعبين آخرين خارج اللعبة لكشف الأدوار (لا metagaming).",
      "لا تترك المباراة عمداً لإفساد تجربة اللعب على الآخرين.",
      "العب دورك بجدية — لا تكشف دورك عمداً إذا كنت البعاتي لإفساد اللعبة.",
    ],
  },
  {
    icon: "shield",
    title: "٤. المحتوى المحظور",
    color: "var(--role-sitalwada3)",
    items: [
      "يُمنع منعاً باتاً أي محتوى عنصري أو طائفي أو تمييزي.",
      "لا يُسمح بمشاركة محتوى جنسي أو عنيف بشكل مفرط.",
      "يُحظر الترويج لأنشطة غير قانونية أو خطيرة.",
      "لا تشارك معلومات شخصية للاعبين آخرين دون إذنهم.",
    ],
  },
  {
    icon: "lightning",
    title: "٥. الإبلاغ عن المخالفات",
    color: "var(--role-abujanzeer)",
    items: [
      "إذا واجهت سلوكاً مخالفاً، استخدم زر الإبلاغ داخل اللعبة.",
      "قدّم وصفاً واضحاً للمخالفة مع اسم اللاعب المخالف.",
      "لا تحاول أخذ الحق بيدك — دع فريقنا يتعامل مع الأمر.",
      "الإبلاغات الكاذبة المتكررة تُعتبر مخالفة بحد ذاتها.",
    ],
  },
  {
    icon: "scales",
    title: "٦. العقوبات",
    color: "var(--terracotta)",
    items: [
      "المخالفة الأولى: تحذير رسمي عبر إشعار داخل التطبيق.",
      "المخالفة الثانية: إيقاف مؤقت لمدة ٢٤ ساعة إلى ٧ أيام.",
      "المخالفة الثالثة: إيقاف مؤقت لمدة ٣٠ يوماً.",
      "المخالفات الجسيمة أو المتكررة: حظر دائم من اللعبة.",
    ],
  },
  {
    icon: "star",
    title: "٧. كن جزءاً إيجابياً من المجتمع",
    color: "var(--role-al3omda)",
    items: [
      "ساعد اللاعبين الجدد في فهم قواعد اللعبة وآلياتها.",
      "شارك استراتيجياتك ونصائحك مع المجتمع.",
      "أبلغ عن الأخطاء التقنية لمساعدتنا في تحسين اللعبة.",
      "تذكّر: البعاتي لعبة للمتعة — استمتع واجعل الآخرين يستمتعون!",
    ],
  },
];

export default function CommunityPage() {
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
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
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
        {/* Decorative triangles */}
        <div className="absolute top-8 right-12 opacity-15" style={{ width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: "20px solid var(--terracotta)" }} />
        <div className="absolute top-20 left-20 opacity-10" style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid var(--sand)" }} />
        <div className="absolute bottom-12 right-1/3 opacity-10 rotate-180" style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "16px solid var(--terracotta)" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {/* Geometric hexagon frame */}
          <div className="inline-block mb-6">
            <svg width="70" height="70" viewBox="0 0 70 70" className="mx-auto mb-4">
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
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
          >
            إرشادات المجتمع
          </h1>
          <p className="text-lg opacity-60 mb-2">آخر تحديث: فبراير ٢٠٢٦</p>
          <p className="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">
            مجتمع البعاتي مبني على المتعة والاحترام. هذه الإرشادات تساعدنا جميعاً على الاستمتاع باللعبة في بيئة آمنة ومرحبة.
          </p>
        </motion.div>
      </section>

      {/* Zigzag divider */}
      <div className="h-4 w-full" style={{
        background: `repeating-linear-gradient(
          90deg,
          transparent 0px, transparent 10px,
          var(--terracotta) 10px, var(--terracotta) 20px
        )`,
        opacity: 0.15,
        clipPath: "polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)",
      }} />

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-10">
          {guidelines.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              custom={sectionIdx}
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
              {/* Accent bar on the right (RTL) */}
              <div
                className="absolute top-0 right-0 w-1.5 h-full rounded-r-2xl"
                style={{ background: section.color, opacity: 0.6 }}
              />

              {/* Corner hexagons */}
              <div className="absolute top-3 left-3 opacity-10">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <polygon points="10,1 18,5 18,15 10,19 2,15 2,5" fill="none" stroke={section.color} strokeWidth="1" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Icon name={section.icon} size={30} color={section.color} />
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-reem-kufi)", color: section.color }}
                >
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-4 pr-2">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex gap-3 leading-relaxed"
                    style={{ color: "var(--sand)", opacity: 0.85 }}
                  >
                    <span className="mt-2 shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <polygon points="5,0 10,5 5,10 0,5" fill={section.color} opacity="0.5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Summary box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-2xl p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--terracotta-dark), var(--terracotta))",
          }}
        >
          {/* Pattern overlay */}
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
              القاعدة الذهبية
            </p>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.9)" }}>
              العب كما تحب أن يُلعَب معك. اللعبة أجمل عندما يستمتع الجميع.
            </p>
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
          <Link href="/" className="text-sm hover:opacity-100 transition-opacity" style={{ color: "var(--sand)", opacity: 0.5 }}>
            الرئيسية
          </Link>
          <Link href="/privacy" className="text-sm hover:opacity-100 transition-opacity" style={{ color: "var(--sand)", opacity: 0.5 }}>
            سياسة الخصوصية
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--sand)", opacity: 0.3 }}>
          &copy; {new Date().getFullYear()} البعاتي. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
