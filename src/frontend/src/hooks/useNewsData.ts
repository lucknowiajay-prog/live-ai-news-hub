import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface GoldRate {
  xauUsd: string;
  change: string;
  trend: "up" | "down";
  india24k: string;
  india22k: string;
  globalSpot: string;
}

export interface WeatherCity {
  city: string;
  temp: string;
  condition: string;
  emoji: string;
}

export interface NewsSection {
  goldRate: GoldRate;
  weather: WeatherCity[];
  breakingNews: { category: string; items: string[] }[];
  futureTrends: string[];
  entertainment: string[];
  lastUpdated: string;
  isLive: boolean;
}

const FALLBACK_NEWS: NewsSection = {
  goldRate: {
    xauUsd: "$3,324.50",
    change: "+1.2%",
    trend: "up",
    india24k: "₹91,250/10g",
    india22k: "₹83,650/10g",
    globalSpot: "$107.2/g",
  },
  weather: [
    { city: "Delhi", temp: "38°C", condition: "Dhoop, Garmi", emoji: "☀️" },
    { city: "Mumbai", temp: "32°C", condition: "Umass, Badal", emoji: "⛅" },
    { city: "Chennai", temp: "35°C", condition: "Tez Dhoop", emoji: "🌡️" },
    { city: "Hyderabad", temp: "34°C", condition: "Thodi Badali", emoji: "🌤️" },
    { city: "Jaipur", temp: "40°C", condition: "Loo chal rahi", emoji: "🔥" },
  ],
  breakingNews: [
    {
      category: "🇮🇳 India",
      items: [
        "Lok Sabha mein naya Bill pass — Digital India ko milega boost",
        "Railway ne 500 naye trains ka plan kiya announce",
        "RBI ne repo rate mein kiya badlav — loan EMI pe hoga asar",
      ],
    },
    {
      category: "🇺🇸 USA",
      items: [
        "White House ne AI safety guidelines kiye jari",
        "Fed Reserve ka faisle — interest rate unchanged raha",
      ],
    },
    {
      category: "🌍 International",
      items: [
        "G20 summit mein climate change pe bani nayi treaty",
        "Iran aur Saudi Arabia ke beech diplomatic samjhauta",
        "UN ne global food crisis ko leke ki emergency baithak",
      ],
    },
  ],
  futureTrends: [
    "AI agents 2025 tak 40% software jobs ko karenge transform — Gartner report",
    "Quantum computing companies mein record $8B investment aaya is quarter",
    "India ka green hydrogen mission 2030 tak 5 lakh crore ka ecosystem banega",
    "Crypto market mein Bitcoin $100K ki taraf badh raha — analyst prediction",
    "Electric vehicles: India mein EV sales ne petrol cars ko pehli baar peeche chhoda",
  ],
  entertainment: [
    "Bollywood ki mega release 'Duniya' ne opening day pe Rs 120 crore kamaaye",
    "Virat Kohli ne Instagram pe 300 million followers ka milestone kiya cross",
    "Korean drama 'Eternal Love' India mein bana number 1 OTT show",
    "AI se bani pehli Indian film ka teaser viral — 1 crore views 24 ghante mein",
    "IPL 2026: Ticket booking shuru, 10 minute mein bikne lage finals ke passes",
  ],
  lastUpdated: new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  isLive: false,
};

function parseNewsContent(content: string, lastUpdated: number): NewsSection {
  try {
    const parsed = JSON.parse(content) as Partial<NewsSection>;
    return {
      ...FALLBACK_NEWS,
      ...parsed,
      lastUpdated: new Date(Number(lastUpdated) / 1_000_000).toLocaleTimeString(
        "en-IN",
        { hour: "2-digit", minute: "2-digit" },
      ),
      isLive: true,
    };
  } catch {
    return {
      ...FALLBACK_NEWS,
      lastUpdated: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isLive: false,
    };
  }
}

interface NewsResult {
  content: string;
  lastUpdated: bigint;
}

export function useNewsData(): {
  news: NewsSection;
  isLoading: boolean;
  isError: boolean;
} {
  const { actor, isFetching } = useActor(createActor);

  const { data, isLoading, isError } = useQuery<NewsSection>({
    queryKey: ["liveNews"],
    queryFn: async (): Promise<NewsSection> => {
      if (!actor || isFetching) {
        return {
          ...FALLBACK_NEWS,
          lastUpdated: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isLive: false,
        };
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (
          actor as unknown as { getNews: () => Promise<NewsResult> }
        ).getNews();
        return parseNewsContent(result.content, Number(result.lastUpdated));
      } catch {
        return {
          ...FALLBACK_NEWS,
          lastUpdated: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isLive: false,
        };
      }
    },
    enabled: !isFetching,
    refetchInterval: 10_000,
    staleTime: 9_000,
  });

  return {
    news: data ?? FALLBACK_NEWS,
    isLoading,
    isError,
  };
}

export { parseNewsContent };
