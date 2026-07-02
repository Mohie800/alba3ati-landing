import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

export const metadata: Metadata = {
  title: "كيف تلعب البعاتي — شرح الأدوار والقواعد",
  description:
    "تعلّم طريقة لعب البعاتي خطوة بخطوة: شرح كامل للأدوار التسعة (البعاتي، العمدة، الكاشف، ابو جنزير، وَد الزلط وغيرها)، مراحل الليل والنهار، التصويت، وشروط الفوز.",
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: "كيف تلعب البعاتي — شرح الأدوار والقواعد",
    description:
      "شرح كامل لأدوار لعبة البعاتي التسعة، مراحل الليل والنهار، التصويت، وشروط الفوز.",
    url: "/how-to-play",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف تلعب البعاتي — شرح الأدوار والقواعد",
    description: "شرح كامل لأدوار لعبة البعاتي ومراحل اللعب وشروط الفوز.",
  },
};

// Structured data for the guide page. Every FAQ answer and HowTo step below is
// also stated on the page itself, as Google's guidelines require.
const howToPlayJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/how-to-play/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "كيف تلعب البعاتي",
          item: `${siteUrl}/how-to-play`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/how-to-play/#howto`,
      name: "كيف تلعب لعبة البعاتي",
      description:
        "دليل خطوة بخطوة لطريقة لعب البعاتي: من إنشاء الغرفة وتوزيع الأدوار، مروراً بمرحلتي الليل والنهار والتصويت، وصولاً إلى شروط فوز كل فريق.",
      inLanguage: "ar",
      totalTime: "PT15M",
      image: `${siteUrl}/icon1.png`,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "إنشاء الغرفة والانضمام",
          text: "أنشئ غرفة خاصة بكود أو غرفة عامة، ثم انضم إليها من 5 إلى 20 لاعباً.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "توزيع الأدوار",
          text: "توزّع اللعبة الأدوار التسعة سرياً وعشوائياً؛ كل لاعب يرى دوره فقط ولا يعرف أدوار الآخرين.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "مرحلة الليل",
          text: "تنام القرية وينفّذ كل دور قدرته السرية: البعاتي يختار ضحية، العمدة يحمي لاعباً، الكاشف يكشف دوراً، وهكذا.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "نتائج الليل",
          text: "تستيقظ القرية وتُعلَن نتائج الليل: من نجا بحماية العمدة ومن تم القضاء عليه.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "مرحلة النقاش",
          text: "يتناقش اللاعبون عبر المحادثة الصوتية المباشرة لتحليل السلوكيات وكشف البعاتي.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "مرحلة التصويت",
          text: "تصوّت القرية لطرد اللاعب الأكثر اشتباهاً؛ في حالة التعادل لا يُطرد أحد.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
        {
          "@type": "HowToStep",
          position: 7,
          name: "شروط الفوز",
          text: "تتكرر المراحل حتى يفوز الأهالي بكشف كل البعاتي، أو يفوز البعاتي بالتساوي عدداً مع الأهالي، أو يفوز ابو جنزير بالبقاء آخر لاعب حياً.",
          url: `${siteUrl}/how-to-play/#phases`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/how-to-play/#faq`,
      inLanguage: "ar",
      mainEntity: [
        {
          "@type": "Question",
          name: "كم عدد اللاعبين في لعبة البعاتي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تتسع اللعبة من 5 إلى 20 لاعباً في الغرفة الواحدة.",
          },
        },
        {
          "@type": "Question",
          name: "كم عدد الأدوار في لعبة البعاتي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تضم اللعبة 9 أدوار فريدة: البعاتي، بعاتي كبير، العمدة، شيخ الدمازين، الكاشف، بله اب سيف، ابو جنزير، جنابو، ووَد الزلط — لكل دور قدرة ليلية خاصة.",
          },
        },
        {
          "@type": "Question",
          name: "كيف يفوز الأهالي في البعاتي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يفوز الأهالي عندما يكشفون جميع البعاتي ويطردونهم من القرية.",
          },
        },
        {
          "@type": "Question",
          name: "كيف يفوز البعاتي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يفوز البعاتي عندما يتساوى عددهم مع عدد الأهالي أو يتجاوزه.",
          },
        },
        {
          "@type": "Question",
          name: "هل لعبة البعاتي مجانية؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، لعبة البعاتي مجانية بالكامل ومتوفرة على iOS و Android.",
          },
        },
      ],
    },
  ],
};

export default function HowToPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToPlayJsonLd) }}
      />
      {children}
    </>
  );
}
