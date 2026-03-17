"use client";

import { useEffect, useState, useMemo } from "react";
import { Icon } from "@/components/icons";

const DEEP_LINK_SCHEME = "alba3ati";
const ANDROID_PACKAGE = "com.alba3ati.app";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.alba3ati.app";
const APP_STORE_URL = "https://apps.apple.com/app/alba3ati/id_YOUR_APP_ID";
const ROOM_ID_REGEX = /^[a-z0-9]{7}$/i;

const patternStyles = `
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
`;

export default function JoinRoomClient({ roomId }: { roomId: string }) {
  const [status, setStatus] = useState<"trying" | "fallback">("trying");

  const isIOS = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod/i.test(navigator.userAgent),
    [],
  );
  const isAndroid = useMemo(
    () =>
      typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent),
    [],
  );

  const isValidRoom = ROOM_ID_REGEX.test(roomId);

  useEffect(() => {
    if (!isValidRoom) {
      setStatus("fallback");
      return;
    }

    // Android: use Intent URL — opens app if installed, Play Store if not (no error dialog)
    if (isAndroid) {
      const intentUrl = `intent://join/${roomId}#Intent;scheme=${DEEP_LINK_SCHEME};package=${ANDROID_PACKAGE};end`;
      window.location.href = intentUrl;
    } else {
      // iOS / other: try custom scheme
      window.location.href = `${DEEP_LINK_SCHEME}://join/${roomId}`;
    }

    // If we're still here after 1.5s, the app didn't open — show fallback
    const timer = setTimeout(() => {
      setStatus("fallback");
    }, 1500);

    return () => clearTimeout(timer);
  }, [roomId, isAndroid, isValidRoom]);

  const handleOpenApp = () => {
    if (isAndroid) {
      const intentUrl = `intent://join/${roomId}#Intent;scheme=${DEEP_LINK_SCHEME};package=${ANDROID_PACKAGE};end`;
      window.location.href = intentUrl;
    } else {
      window.location.href = `${DEEP_LINK_SCHEME}://join/${roomId}`;
    }
  };

  const handleDownload = () => {
    if (isIOS) {
      window.location.href = APP_STORE_URL;
    } else {
      window.location.href = PLAY_STORE_URL;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: patternStyles }} />
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #232342 50%, #1a1a2e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "var(--font-cairo), Cairo, sans-serif",
          direction: "rtl",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(199,91,57,0.15) 0%, transparent 70%)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,213,183,0.1) 0%, transparent 70%)",
            animation: "pulseGlow 5s ease-in-out infinite 1s",
          }}
        />

        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Logo area */}
          <div
            style={{
              marginBottom: "32px",
              animation: "floatUp 3s ease-in-out infinite",
            }}
          >
            <div
              style={{
                fontSize: "56px",
                marginBottom: "8px",
              }}
            >
              <Icon name="masks" size={48} color="#c75b39" />
            </div>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#c75b39",
                margin: 0,
                lineHeight: 1.2,
                fontFamily: "var(--font-reem-kufi), Reem Kufi, sans-serif",
              }}
            >
              البعاتي
            </h1>
          </div>

          {/* Card */}
          <div
            style={{
              background: "rgba(45, 45, 74, 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "32px 24px",
              border: "1px solid rgba(232, 213, 183, 0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {status === "trying" ? (
              <>
                {/* Loading spinner */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "4px solid rgba(232,213,183,0.2)",
                    borderTopColor: "#c75b39",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "@keyframes spin { to { transform: rotate(360deg); } }",
                  }}
                />
                <p style={{ color: "#e8d5b7", fontSize: "18px", margin: 0 }}>
                  جاري فتح التطبيق...
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    color: "#e8d5b7",
                    fontSize: "20px",
                    fontWeight: 700,
                    margin: "0 0 8px",
                  }}
                >
                  صديقك يدعوك للعب!
                </p>

                {/* Room code display */}
                <div
                  style={{
                    background: "rgba(26, 26, 46, 0.6)",
                    borderRadius: "12px",
                    padding: "16px",
                    margin: "16px 0 24px",
                    border: "1px solid rgba(199, 91, 57, 0.3)",
                  }}
                >
                  <p
                    style={{
                      color: "#a0a0a0",
                      fontSize: "14px",
                      margin: "0 0 6px",
                    }}
                  >
                    كود الغرفة
                  </p>
                  <p
                    style={{
                      color: "#c75b39",
                      fontSize: "32px",
                      fontWeight: 800,
                      margin: 0,
                      fontFamily: "monospace",
                      letterSpacing: "4px",
                      direction: "ltr",
                    }}
                  >
                    {roomId}
                  </p>
                </div>

                {/* Open app button */}
                <button
                  onClick={handleOpenApp}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #c75b39, #a84a2e)",
                    border: "none",
                    borderRadius: "14px",
                    cursor: "pointer",
                    marginBottom: "12px",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 16px rgba(199, 91, 57, 0.35)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(199,91,57,0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(199,91,57,0.35)";
                  }}
                >
                  افتح التطبيق
                </button>

                {/* Divider */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    margin: "20px 0",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(232,213,183,0.15)",
                    }}
                  />
                  <span style={{ color: "#a0a0a0", fontSize: "14px" }}>
                    ما عندك التطبيق؟
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(232,213,183,0.15)",
                    }}
                  />
                </div>

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    background: "linear-gradient(135deg, #e8d5b7, #d4b896)",
                    border: "none",
                    borderRadius: "14px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    transition: "transform 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {isIOS ? (
                      <>
                        <Icon name="apple" size={18} color="#1a1a2e" /> حمّل من
                        App Store
                      </>
                    ) : isAndroid ? (
                      <>
                        <Icon name="googlePlay" size={18} color="#1a1a2e" />{" "}
                        حمّل من Google Play
                      </>
                    ) : (
                      "حمّل التطبيق"
                    )}
                  </span>
                </button>

                {/* Show both store links on desktop */}
                {!isIOS && !isAndroid && (
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "12px",
                    }}
                  >
                    <a
                      href={PLAY_STORE_URL}
                      style={{
                        flex: 1,
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#e8d5b7",
                        background: "rgba(26, 26, 46, 0.6)",
                        border: "1px solid rgba(232,213,183,0.2)",
                        borderRadius: "10px",
                        textDecoration: "none",
                        textAlign: "center",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name="googlePlay" size={14} color="#e8d5b7" />{" "}
                        Google Play
                      </span>
                    </a>
                    <a
                      href={APP_STORE_URL}
                      style={{
                        flex: 1,
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#e8d5b7",
                        background: "rgba(26, 26, 46, 0.6)",
                        border: "1px solid rgba(232,213,183,0.2)",
                        borderRadius: "10px",
                        textDecoration: "none",
                        textAlign: "center",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name="apple" size={14} color="#e8d5b7" /> App
                        Store
                      </span>
                    </a>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <p
            style={{
              color: "rgba(232, 213, 183, 0.4)",
              fontSize: "13px",
              marginTop: "24px",
            }}
          >
            لعبة البعاتي
          </p>
        </div>
      </div>
    </>
  );
}
