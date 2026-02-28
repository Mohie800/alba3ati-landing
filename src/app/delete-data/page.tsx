"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "sending" | "success" | "error";

export default function DeleteDataPage() {
  const [username, setUsername] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = username.trim().length > 0 && confirmed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setFormState("sending");
    setErrorMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009";
      const res = await fetch(`${apiUrl}/api/contact/landing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username.trim(),
          email: email.trim() || undefined,
          message: `[طلب حذف بيانات]\n\nاسم المستخدم: ${username.trim()}\nمعلومات الجهاز: ${deviceInfo.trim() || "غير محدد"}\nالسبب: ${reason.trim() || "غير محدد"}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "فشل إرسال الطلب");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    }
  };

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
        <div className="absolute top-10 right-10 w-6 h-6 rotate-45 opacity-20" style={{ background: "var(--terracotta)" }} />
        <div className="absolute top-16 left-16 w-4 h-4 rotate-45 opacity-15" style={{ background: "var(--sand)" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="inline-block mb-6">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto mb-4">
              <rect x="5" y="5" width="50" height="50" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" transform="rotate(45 30 30)" />
              <rect x="12" y="12" width="36" height="36" fill="none" stroke="var(--sand)" strokeWidth="1" opacity="0.4" transform="rotate(45 30 30)" />
              <text x="30" y="36" textAnchor="middle" fill="var(--terracotta)" fontSize="20">🗑</text>
            </svg>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black mb-4"
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
          >
            طلب حذف البيانات
          </h1>
          <p className="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">
            يمكنك طلب حذف جميع بياناتك المرتبطة بحسابك في لعبة البعاتي.
            سيتم معالجة طلبك خلال ٧ أيام عمل.
          </p>
        </motion.div>
      </section>

      {/* Zigzag divider */}
      <div className="h-4 w-full" style={{
        background: `repeating-linear-gradient(90deg, transparent 0px, transparent 10px, var(--terracotta) 10px, var(--terracotta) 20px)`,
        opacity: 0.15,
        clipPath: "polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)",
      }} />

      {/* Info section */}
      <section className="max-w-2xl mx-auto px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-8 relative"
          style={{
            background: "var(--indigo-light)",
            border: "1px solid rgba(199, 91, 57, 0.15)",
          }}
        >
          <div className="absolute top-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
          <div className="absolute bottom-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />

          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
          >
            البيانات التي سيتم حذفها:
          </h2>
          <ul className="space-y-3">
            {[
              "معلومات الحساب (اسم المستخدم)",
              "إحصائيات اللعب (عدد المباريات، الانتصارات، الأدوار)",
              "سجل الغرف والمباريات السابقة",
              "معرّف الجهاز المرتبط بالحساب",
              "أي بلاغات أو تقارير مرتبطة بالحساب",
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 leading-relaxed" style={{ color: "var(--sand)", opacity: 0.85 }}>
                <span className="mt-1.5 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" fill="var(--terracotta)" transform="rotate(45 6 6)" opacity="0.6" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm opacity-50">
            ملاحظة: المحادثات الصوتية لا يتم تخزينها أصلاً، لذلك لا توجد بيانات صوتية لحذفها.
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-8 pb-16">
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-12 text-center"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(80, 227, 194, 0.3)",
              }}
            >
              <div className="text-6xl mb-6">✓</div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--role-al3omda)" }}
              >
                تم استلام طلبك بنجاح!
              </h2>
              <p className="opacity-70 mb-4">
                سيتم معالجة طلب حذف بياناتك خلال ٧ أيام عمل.
              </p>
              <p className="opacity-50 text-sm">
                سنتواصل معك عبر البريد الإلكتروني (إن وُجد) عند اكتمال الحذف.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-10 space-y-6 relative"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(199, 91, 57, 0.15)",
              }}
            >
              <div className="absolute top-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute top-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute bottom-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute bottom-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />

              {/* Username */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  اسم المستخدم في اللعبة <span style={{ color: "var(--terracotta)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسمك في اللعبة"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2"
                  style={{
                    background: "rgba(26, 26, 46, 0.6)",
                    border: "1px solid rgba(199, 91, 57, 0.2)",
                    color: "var(--sand-light)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "var(--terracotta)",
                  }}
                />
              </div>

              {/* Device info */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  معلومات الجهاز <span className="opacity-50">(اختياري - يساعد في تحديد حسابك)</span>
                </label>
                <input
                  type="text"
                  value={deviceInfo}
                  onChange={(e) => setDeviceInfo(e.target.value)}
                  placeholder="مثال: Samsung Galaxy S24, iPhone 15"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 text-left"
                  style={{
                    background: "rgba(26, 26, 46, 0.6)",
                    border: "1px solid rgba(199, 91, 57, 0.2)",
                    color: "var(--sand-light)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "var(--terracotta)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  البريد الإلكتروني <span className="opacity-50">(اختياري - للتأكيد عند اكتمال الحذف)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 text-left"
                  style={{
                    background: "rgba(26, 26, 46, 0.6)",
                    border: "1px solid rgba(199, 91, 57, 0.2)",
                    color: "var(--sand-light)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "var(--terracotta)",
                  }}
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  سبب الحذف <span className="opacity-50">(اختياري)</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="أخبرنا لماذا تريد حذف بياناتك (اختياري)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 resize-none"
                  style={{
                    background: "rgba(26, 26, 46, 0.6)",
                    border: "1px solid rgba(199, 91, 57, 0.2)",
                    color: "var(--sand-light)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "var(--terracotta)",
                  }}
                />
              </div>

              {/* Confirmation checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-current shrink-0"
                  style={{ accentColor: "var(--terracotta)" }}
                />
                <span className="text-sm opacity-80 leading-relaxed">
                  أفهم أن حذف البيانات <strong style={{ color: "var(--terracotta)" }}>لا يمكن التراجع عنه</strong> وأن
                  جميع بيانات حسابي وإحصائياتي ستُحذف نهائياً.
                </span>
              </label>

              {/* Error */}
              {formState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-4 text-sm"
                  style={{
                    background: "rgba(233, 79, 55, 0.15)",
                    border: "1px solid rgba(233, 79, 55, 0.3)",
                    color: "var(--role-damazeen)",
                  }}
                >
                  {errorMsg || "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى."}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit || formState === "sending"}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: canSubmit ? "#E74C3C" : "rgba(231, 76, 60, 0.3)",
                  color: "white",
                  fontFamily: "var(--font-reem-kufi)",
                }}
              >
                {formState === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري إرسال الطلب...
                  </span>
                ) : (
                  "تأكيد طلب حذف البيانات"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
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
          <Link href="/contact" className="text-sm hover:opacity-100 transition-opacity" style={{ color: "var(--sand)", opacity: 0.5 }}>
            تواصل معنا
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--sand)", opacity: 0.3 }}>
          &copy; {new Date().getFullYear()} البعاتي. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
