import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Run on the Node.js runtime so we can read the logo off disk.
export const runtime = "nodejs";

export const alt = "لعبة البعاتي — لعبة أدوار اجتماعية سودانية بمحادثة صوتية مباشرة";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css)
const INDIGO = "#1a1a2e";
const INDIGO_MID = "#232342";
const TERRACOTTA = "#c75b39";
const SAND = "#e8d5b7";
const SAND_LIGHT = "#f5ede0";

// Arabic copy — kept in constants so we can subset the font to exactly these glyphs.
const TITLE_AR = "لعبة البعاتي";
const TAGLINE_AR = "لعبة أدوار اجتماعية سودانية";
const SUB_LEFT_AR = "محادثة صوتية مباشرة";
const SUB_RIGHT_AR = "من ٥ إلى ٢٠ لاعباً";

/**
 * Fetch a Google font as a raw TTF that satori can parse. Passing `text`
 * returns a tiny subset, and the default (non-browser) fetch UA makes Google
 * serve `truetype` instead of `woff2`. Best-effort: returns null on any failure
 * so image generation (and the build) never breaks — we fall back to a Latin
 * wordmark rendered with the built-in font.
 */
async function loadArabicFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Cairo:wght@700&text=${encodeURIComponent(
      text,
    )}`;
    const css = await (await fetch(url)).text();
    const match = css.match(
      /src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"]?(?:opentype|truetype)['"]?\)/,
    );
    if (!match) return null;
    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public", "icon1.png"));
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [arFont, logoSrc] = await Promise.all([
    loadArabicFont(TITLE_AR + TAGLINE_AR + SUB_LEFT_AR + SUB_RIGHT_AR),
    loadLogo(),
  ]);

  const Diamond = ({ s = 12, c = TERRACOTTA }: { s?: number; c?: string }) => (
    <div
      style={{
        width: s,
        height: s,
        background: c,
        transform: "rotate(45deg)",
      }}
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
          background: `linear-gradient(135deg, ${INDIGO} 0%, ${INDIGO_MID} 100%)`,
          fontFamily: arFont ? "Cairo" : "sans-serif",
          position: "relative",
        }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 48, left: 48, display: "flex", gap: 14 }}>
          <Diamond s={16} />
          <Diamond s={10} c={SAND} />
        </div>
        <div style={{ position: "absolute", bottom: 48, right: 48, display: "flex", gap: 14 }}>
          <Diamond s={10} c={SAND} />
          <Diamond s={16} />
        </div>

        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            width={190}
            height={190}
            alt=""
            style={{ marginBottom: 28 }}
          />
        ) : null}

        {arFont ? (
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: SAND_LIGHT,
              lineHeight: 1,
              display: "flex",
            }}
          >
            {TITLE_AR}
          </div>
        ) : (
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: SAND_LIGHT,
              letterSpacing: 6,
              display: "flex",
            }}
          >
            ALBA3ATI
          </div>
        )}

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "30px 0" }}>
          <div style={{ width: 70, height: 3, background: TERRACOTTA }} />
          <Diamond s={14} />
          <div style={{ width: 70, height: 3, background: TERRACOTTA }} />
        </div>

        {arFont ? (
          <>
            <div style={{ fontSize: 44, color: SAND, display: "flex" }}>
              {TAGLINE_AR}
            </div>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontSize: 30,
                color: SAND,
                opacity: 0.7,
              }}
            >
              <span style={{ display: "flex" }}>{SUB_LEFT_AR}</span>
              <Diamond s={9} c={SAND} />
              <span style={{ display: "flex" }}>{SUB_RIGHT_AR}</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 36, color: SAND, opacity: 0.85, display: "flex" }}>
            Sudanese social deduction game · live voice chat
          </div>
        )}

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
    {
      ...size,
      fonts: arFont
        ? [{ name: "Cairo", data: arFont, style: "normal", weight: 700 }]
        : [],
    },
  );
}
