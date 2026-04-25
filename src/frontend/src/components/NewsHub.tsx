import { useNewsData } from "../hooks/useNewsData";
import NewsTicker from "./NewsTicker";

export default function NewsHub() {
  const { news, isLoading } = useNewsData();

  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div
      data-ocid="newshub.page"
      className="min-h-screen flex flex-col"
      style={{ background: "#0f172a" }}
    >
      {/* ── Header ── */}
      <header
        data-ocid="newshub.header"
        className="w-full py-5 px-4 flex flex-col items-center justify-center gap-1"
        style={{
          background: "#1e293b",
          borderBottom: "1px solid oklch(0.28 0.01 240)",
          boxShadow: "0 2px 20px oklch(0 0 0 / 0.4)",
        }}
      >
        <h1
          className="font-display font-bold tracking-tight text-center leading-none"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            color: "oklch(0.68 0.18 72)",
            textShadow: "0 0 30px oklch(0.68 0.18 72 / 0.4)",
          }}
        >
          🔥 LIVE AI NEWS HUB 🔥
        </h1>
        <p
          className="text-xs tracking-widest font-mono"
          style={{ color: "oklch(0.55 0.01 240)" }}
        >
          AI-POWERED · HINDI + HINGLISH · AUTO-REFRESH
        </p>
      </header>

      {/* ── Status Bar ── */}
      <div
        className="w-full px-4 py-2 flex items-center justify-between text-xs font-mono"
        style={{
          background: "oklch(0.14 0.01 240)",
          borderBottom: "1px solid oklch(0.22 0.01 240)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor: news.isLive ? "oklch(0.68 0.18 72)" : "#f59e0b",
              boxShadow: news.isLive
                ? "0 0 6px oklch(0.68 0.18 72 / 0.8)"
                : "0 0 6px #f59e0b80",
            }}
          />
          <span style={{ color: "oklch(0.55 0.01 240)" }}>
            {news.isLive ? "AI Live Feed" : "Static Preview"}
          </span>
        </div>
        <div style={{ color: "oklch(0.55 0.01 240)" }}>
          {isLoading ? (
            <span data-ocid="newshub.loading_state">Refresh ho raha hai…</span>
          ) : (
            <span>
              AI-generated | Last updated:{" "}
              <span className="text-primary">{news.lastUpdated}</span>
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-3xl space-y-4">
          {/* Ticker Box */}
          {isLoading ? (
            <div
              data-ocid="newshub.ticker.loading_state"
              className="rounded-lg flex items-center justify-center"
              style={{
                height: "480px",
                borderTop: "2px solid oklch(0.68 0.18 72)",
                border: "1px solid oklch(0.28 0.01 240)",
                background: "oklch(0.15 0.01 240)",
              }}
            >
              <div className="text-center space-y-3">
                <div className="text-3xl animate-pulse">📡</div>
                <p
                  className="font-display font-semibold"
                  style={{ color: "oklch(0.68 0.18 72)" }}
                >
                  News load ho rahi hai…
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.55 0.01 240)" }}
                >
                  Thoda wait karein
                </p>
              </div>
            </div>
          ) : (
            <NewsTicker news={news} />
          )}

          {/* Live indicator strip */}
          <div
            className="flex items-center justify-between text-xs px-3 py-2 rounded"
            style={{
              background: "oklch(0.15 0.01 240)",
              border: "1px solid oklch(0.22 0.01 240)",
            }}
          >
            <span style={{ color: "oklch(0.55 0.01 240)" }}>
              🤖 AI-generated content in Hindi + Hinglish
            </span>
            <span
              className="font-mono"
              style={{ color: "oklch(0.68 0.18 72)" }}
            >
              Har 10 sec mein refresh
            </span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="w-full py-4 px-4 text-center text-xs"
        style={{
          background: "#1e293b",
          borderTop: "1px solid oklch(0.22 0.01 240)",
          color: "oklch(0.45 0.01 240)",
        }}
      >
        © {year}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "oklch(0.68 0.18 72)" }}
          className="hover:underline"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
