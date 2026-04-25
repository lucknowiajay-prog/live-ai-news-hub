import type { NewsSection } from "../hooks/useNewsData";

interface NewsTickerProps {
  news: NewsSection;
}

function GoldSection({ gold }: { gold: NewsSection["goldRate"] }) {
  const isUp = gold.trend === "up";
  return (
    <div className="ticker-section py-5 px-1">
      <h2 className="section-header mb-3">💰 SONE KA BHAV</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono">XAU/USD:</span>
          <span className="text-foreground font-semibold">{gold.xauUsd}</span>
          <span
            className={`font-semibold text-xs px-1 rounded ${isUp ? "text-emerald-400" : "text-red-400"}`}
          >
            {gold.change} {isUp ? "↑" : "↓"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono">Global Spot:</span>
          <span className="text-foreground font-semibold">
            {gold.globalSpot}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">India 24K:</span>
          <span className="text-foreground font-semibold">{gold.india24k}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">India 22K:</span>
          <span className="text-foreground font-semibold">{gold.india22k}</span>
        </div>
      </div>
    </div>
  );
}

function WeatherSection({ cities }: { cities: NewsSection["weather"] }) {
  return (
    <div className="ticker-section py-5 px-1">
      <h2 className="section-header mb-3">🌦 MAUSAM</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {cities.map((city) => (
          <div
            key={city.city}
            className="flex items-center gap-2 bg-secondary/40 rounded-md px-3 py-2"
          >
            <span className="text-xl">{city.emoji}</span>
            <div>
              <p className="text-primary font-semibold text-sm leading-tight">
                {city.city}
              </p>
              <p className="text-foreground text-sm font-mono">{city.temp}</p>
              <p className="text-muted-foreground text-xs">{city.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BreakingNewsSection({
  sections,
}: {
  sections: NewsSection["breakingNews"];
}) {
  return (
    <div className="ticker-section py-5 px-1">
      <h2 className="section-header mb-3">📰 BREAKING NEWS</h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.category}>
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
              {section.category}
            </p>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span className="text-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function FutureTrendsSection({ trends }: { trends: string[] }) {
  return (
    <div className="ticker-section py-5 px-1">
      <h2 className="section-header mb-3">🔮 FUTURE TRENDS</h2>
      <ul className="space-y-2">
        {trends.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5 shrink-0">›</span>
            <span className="text-foreground leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EntertainmentSection({ items }: { items: string[] }) {
  return (
    <div className="py-5 px-1">
      <h2 className="section-header mb-3">🎬 ENTERTAINMENT</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5 shrink-0">★</span>
            <span className="text-foreground leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NewsContent({ news }: { news: NewsSection }) {
  return (
    <div>
      <GoldSection gold={news.goldRate} />
      <WeatherSection cities={news.weather} />
      <BreakingNewsSection sections={news.breakingNews} />
      <FutureTrendsSection trends={news.futureTrends} />
      <EntertainmentSection items={news.entertainment} />
    </div>
  );
}

export default function NewsTicker({ news }: NewsTickerProps) {
  return (
    <div
      data-ocid="news.ticker"
      className="relative overflow-hidden rounded-lg"
      style={{
        height: "480px",
        borderTop: "2px solid oklch(0.68 0.18 72)",
        borderLeft: "1px solid oklch(0.28 0.01 240)",
        borderRight: "1px solid oklch(0.28 0.01 240)",
        borderBottom: "1px solid oklch(0.28 0.01 240)",
        background: "oklch(0.15 0.01 240)",
      }}
    >
      {/* Fade masks */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: "48px",
          background:
            "linear-gradient(to bottom, oklch(0.15 0.01 240) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: "64px",
          background:
            "linear-gradient(to top, oklch(0.15 0.01 240) 0%, transparent 100%)",
        }}
      />

      {/* Scrolling content — duplicated for seamless loop */}
      <div
        data-ocid="news.ticker_content"
        className="news-ticker absolute w-full px-5"
      >
        <NewsContent news={news} />
        {/* Duplicate for seamless loop */}
        <NewsContent news={news} />
      </div>
    </div>
  );
}
