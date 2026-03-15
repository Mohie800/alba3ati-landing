"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    message.trim().length > 0 && (email.trim().length > 0 || phone.trim().length > 0);

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
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "فشل إرسال الرسالة");
      }

      setFormState("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
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
          <Link href="/">
            <Image src="/icon1.png" alt="البعاتي" width={40} height={40} />
          </Link>
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
              <foreignObject x="15" y="16" width="30" height="30"><Icon name="envelope" size={24} color="var(--terracotta)" /></foreignObject>
            </svg>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black mb-4"
            style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--terracotta)" }}
          >
            تواصل معنا
          </h1>
          <p className="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">
            لديك سؤال أو اقتراح أو ملاحظة؟ نحب نسمع منك! أرسل لنا رسالة وسنرد عليك في أقرب وقت.
          </p>
        </motion.div>
      </section>

      {/* Zigzag divider */}
      <div className="h-4 w-full" style={{
        background: `repeating-linear-gradient(90deg, transparent 0px, transparent 10px, var(--terracotta) 10px, var(--terracotta) 20px)`,
        opacity: 0.15,
        clipPath: "polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)",
      }} />

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-16">
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
              <div className="flex justify-center mb-6"><Icon name="check" size={60} color="var(--role-al3omda)" /></div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-reem-kufi)", color: "var(--role-al3omda)" }}
              >
                تم إرسال رسالتك بنجاح!
              </h2>
              <p className="opacity-70 mb-8">شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.</p>
              <button
                onClick={() => setFormState("idle")}
                className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: "var(--terracotta)",
                  color: "white",
                }}
              >
                إرسال رسالة أخرى
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-10 space-y-6 relative"
              style={{
                background: "var(--indigo-light)",
                border: "1px solid rgba(199, 91, 57, 0.15)",
              }}
            >
              {/* Corner decorations */}
              <div className="absolute top-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute top-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute bottom-3 right-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />
              <div className="absolute bottom-3 left-3 w-3 h-3 rotate-45" style={{ background: "var(--terracotta)", opacity: 0.3 }} />

              {/* Name */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  الاسم <span className="opacity-50">(اختياري)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك"
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

              {/* Email & Phone row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 opacity-80">
                    البريد الإلكتروني
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
                <div>
                  <label className="block text-sm font-bold mb-2 opacity-80">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+249 XXX XXX XXX"
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
              </div>
              <p className="text-xs opacity-50 -mt-3">* يجب إدخال البريد الإلكتروني أو رقم الهاتف على الأقل</p>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold mb-2 opacity-80">
                  الرسالة <span style={{ color: "var(--terracotta)" }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
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

              {/* Error message */}
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
                  {errorMsg || "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى."}
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!canSubmit || formState === "sending"}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: canSubmit ? "var(--terracotta)" : "rgba(199, 91, 57, 0.3)",
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
                    جاري الإرسال...
                  </span>
                ) : (
                  "إرسال الرسالة"
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
