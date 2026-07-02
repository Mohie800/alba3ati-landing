import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Run on the Node.js runtime so we can read the logo off disk.
export const runtime = "nodejs";

export const alt =
  "لعبة البعاتي — لعبة أدوار اجتماعية سودانية بمحادثة صوتية مباشرة";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css)
const INDIGO = "#1a1a2e";
const INDIGO_MID = "#232342";
const TERRACOTTA = "#c75b39";
const SAND = "#e8d5b7";
const SAND_LIGHT = "#f5ede0";

// The card renders Latin text only. satori's bidi/shaping is unreliable for
// multi-word Arabic, and the logo already carries the Arabic "البعاتي" wordmark,
// so the Arabic identity is present without risking broken glyph ordering.
// (The Arabic copy still reaches search/social via the og:title & description.)
async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public", "icon1.png"));
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const logoSrc = await loadLogo();

  const Diamond = ({ s = 12, c = TERRACOTTA }: { s?: number; c?: string }) => (
    <div
      style={{ width: s, height: s, background: c, transform: "rotate(45deg)" }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          background: `linear-gradient(135deg, ${INDIGO} 0%, ${INDIGO_MID} 100%)`,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 48, left: 48, display: "flex", gap: 14 }}>
          <Diamond s={16} />
          <Diamond s={10} c={SAND} />
        </div>
        <div style={{ position: "absolute", top: 48, right: 48, display: "flex", gap: 14 }}>
          <Diamond s={10} c={SAND} />
          <Diamond s={16} />
        </div>

        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} width={200} height={200} alt="" style={{ marginBottom: 20 }} />
        ) : null}

        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            color: SAND_LIGHT,
            letterSpacing: 10,
            display: "flex",
          }}
        >
          ALBA3ATI
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "24px 0" }}>
          <div style={{ width: 80, height: 3, background: TERRACOTTA }} />
          <Diamond s={14} />
          <div style={{ width: 80, height: 3, background: TERRACOTTA }} />
        </div>

        <div style={{ fontSize: 40, fontWeight: 600, color: SAND, display: "flex", textAlign: "center" }}>
          Sudanese social deduction party game
        </div>
        <div style={{ marginTop: 18, fontSize: 28, color: SAND, opacity: 0.75, display: "flex", textAlign: "center" }}>
          Live voice chat · 5–20 players · Free on iOS &amp; Android
        </div>

        {/* Bottom brand bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: `linear-gradient(90deg, ${TERRACOTTA}, ${SAND}, ${TERRACOTTA})`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
