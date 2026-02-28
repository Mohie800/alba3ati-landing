"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const sections = [
  {
    title: "١. المعلومات التي نجمعها",
    items: [
      "معلومات الحساب: عند إنشاء حساب، نجمع اسم المستخدم والبريد الإلكتروني وصورة الملف الشخصي (اختياري).",
      "بيانات اللعب: نسجل إحصائيات اللعب مثل عدد المباريات، الانتصارات، والأدوار التي لعبتها لتحسين تجربتك.",
      "بيانات الجهاز: نجمع معلومات تقنية مثل نوع الجهاز ونظام التشغيل لضمان توافق اللعبة.",
      "المحادثات الصوتية: لا يتم تسجيل أو تخزين المحادثات الصوتية داخل اللعبة. جميع المكالمات تتم في الوقت الحقيقي فقط.",
    ],
  },
  {
    title: "٢. كيف نستخدم معلوماتك",
    items: [
      "تشغيل اللعبة وإدارة حسابك وتوفير تجربة لعب سلسة.",
      "تحسين أداء اللعبة وإصلاح الأخطاء التقنية.",
      "إرسال إشعارات مهمة تتعلق بحسابك أو تحديثات اللعبة (يمكنك إيقافها في أي وقت).",
      "تحليل أنماط اللعب لتطوير ميزات جديدة وتحسين توازن الأدوار.",
    ],
  },
  {
    title: "٣. مشاركة المعلومات",
    items: [
      "لا نبيع معلوماتك الشخصية لأي طرف ثالث.",
      "قد نشارك بيانات مجهولة الهوية مع شركائنا لتحليل الأداء.",
      "قد نكشف عن معلوماتك إذا طُلب منا ذلك بموجب القانون أو لحماية حقوقنا.",
    ],
  },
  {
    title: "٤. أمان البيانات",
    items: [
      "نستخدم تشفير SSL/TLS لحماية البيانات أثناء النقل.",
      "يتم تخزين كلمات المرور بشكل مشفر ولا يمكن لأي شخص الوصول إليها.",
      "نراجع إجراءاتنا الأمنية بانتظام لضمان حماية بياناتك.",
    ],
  },
  {
    title: "٥. حقوقك",
    items: [
      "يمكنك طلب نسخة من بياناتك الشخصية في أي وقت.",
      "يمكنك طلب حذف حسابك وجميع البيانات المرتبطة به.",
      "يمكنك تعديل معلومات حسابك من خلال إعدادات التطبيق.",
      "يمكنك إلغاء الاشتراك في الإشعارات التسويقية في أي وقت.",
    ],
  },
  {
    title: "٦. الأطفال",
    items: [
      "لعبة البعاتي مخصصة للأعمار ١٣ سنة فما فوق.",
      "لا نجمع عن قصد معلومات من الأطفال دون سن ١٣.",
      "إذا اكتشفنا أن طفلاً دون السن المحدد قد أنشأ حساباً، سنقوم بحذفه فوراً.",
    ],
  },
  {
    title: "٧. التحديثات على هذه السياسة",
    items: [
      "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر.",
      "سنُعلمك بأي تغييرات جوهرية عبر إشعار داخل التطبيق.",
      "استمرارك في استخدام اللعبة بعد التحديث يعني موافقتك على السياسة المعدّلة.",
    ],
  },
  {
    title: "٨. تواصل معنا",
    items: [
      "إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: privacy@alba3ati.com",
    ],
  },
];

export default function PrivacyPage() {
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
            linear-gradient(45deg, transparent 40%, var(--terracotta) 40%, var(--terracotta) 60%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, var(--terracotta) 40%, var(--terracotta) 60%, transparent 60%)
          `,
          backgroundSize: "80px 80px",
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
          <span
            className="text-xl font-black"
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--sand)" }}
          >
            البعاتي
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        {/* Decorative diamonds */}
        <div className="absolute top-10 right-10 w-6 h-6 rotate-45 opacity-20" style={{ background: "var(--terracotta)" }} />
        <div className="absolute top-16 left-16 w-4 h-4 rotate-45 opacity-15" style={{ background: "var(--sand)" }} />
        <div className="absolute bottom-10 right-1/4 w-5 h-5 rotate-45 opacity-10" style={{ background: "var(--terracotta)" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {/* Geometric frame */}
          <div className="inline-block mb-6">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto mb-4">
              <rect x="5" y="5" width="50" height="50" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" transform="rotate(45 30 30)" />
              <rect x="12" y="12" width="36" height="36" fill="none" stroke="var(--sand)" strokeWidth="1" opacity="0.4" transform="rotate(45 30 30)" />
              <circle cx="30" cy="30" r="4" fill="var(--terracotta)" />
            </svg>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black mb-4"
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
          >
            سياسة الخصوصية
          </h1>
          <p className="text-lg opacity-60 mb-2">آخر تحديث: فبراير ٢٠٢٦</p>
          <p className="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">
            نحن في البعاتي نقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك.
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
        clipPath: "polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)",
      }} />

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              custom={sectionIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="relative rounded-2xl p-8"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(199, 91, 57, 0.15)",
              }}
            >
              {/* Corner diamond decorations */}
              <div className="absolute top-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute bottom-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />

              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
              >
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex gap-3 leading-relaxed"
                    style={{ color: "var(--sand)", opacity: 0.85 }}
                  >
                    <span className="mt-1.5 shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <rect x="2" y="2" width="8" height="8" fill="var(--terracotta)" transform="rotate(45 6 6)" opacity="0.6" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
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
          <Link href="/community" className="text-sm hover:opacity-100 transition-opacity" style={{ color: "var(--sand)", opacity: 0.5 }}>
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
