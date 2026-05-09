import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KestKlar — KeSt berechnen für österreichische Anleger";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "#000",
            }}
          >
            K
          </div>
          <span style={{ fontSize: "28px", color: "#999", fontWeight: 400 }}>
            KestKlar
          </span>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          KeSt berechnen in 10 Minuten
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#999",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          Für Interactive Brokers, Scalable Capital & andere nicht-steuereinfache
          Broker in Österreich. PDF hochladen → E1kv-Kennzahlen vorbereiten.
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              color: "#666",
              border: "1px solid #333",
              padding: "8px 16px",
            }}
          >
            kestklar.at
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
