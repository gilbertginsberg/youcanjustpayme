import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  Coffee,
  Heart,
  CircleDollarSign,
  Landmark,
  Bitcoin,
  Link2,
  DollarSign,
} from "lucide-react";
import type { Platform } from "./types";

export type PlatformDef = {
  label: string;
  brandColor: string;
  icon: LucideIcon;
  buildUrl: (handleOrAddress: string, amount?: number) => string;
  supportsAmountPrefill: boolean;
  deepLinkScheme?: string;
  /** Phase 2 placeholder — left empty on all platforms for now. */
  referralParam?: string;
};

function stripLeading(handle: string, chars: string[]) {
  let h = handle;
  for (const c of chars) {
    if (h.startsWith(c)) h = h.slice(c.length);
  }
  return h;
}

export const PLATFORMS: Record<Platform, PlatformDef> = {
  venmo: {
    label: "Venmo",
    brandColor: "#3D95CE",
    icon: DollarSign,
    supportsAmountPrefill: true,
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["@"]);
      const base = `https://venmo.com/${h}?txn=pay`;
      return amount ? `${base}&amount=${amount}` : base;
    },
  },
  cashapp: {
    label: "Cash App",
    brandColor: "#00D64F",
    icon: CircleDollarSign,
    supportsAmountPrefill: true,
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["$"]);
      const base = `https://cash.app/$${h}`;
      return amount ? `${base}/${amount}` : base;
    },
  },
  paypal: {
    label: "PayPal",
    brandColor: "#0070BA",
    icon: Wallet,
    supportsAmountPrefill: true,
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["@"]);
      return amount ? `https://paypal.me/${h}/${amount}` : `https://paypal.me/${h}`;
    },
  },
  buymeacoffee: {
    label: "Buy me a coffee",
    brandColor: "#FFDD00",
    icon: Coffee,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (handle) => `https://buymeacoffee.com/${stripLeading(handle, ["@"])}`,
  },
  kofi: {
    label: "Ko-fi",
    brandColor: "#FF5E5B",
    icon: Heart,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (handle) => `https://ko-fi.com/${stripLeading(handle, ["@"])}`,
  },
  patreon: {
    label: "Patreon",
    brandColor: "#FF424D",
    icon: Heart,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (handle) => `https://patreon.com/${stripLeading(handle, ["@"])}`,
  },
  square: {
    label: "Square",
    brandColor: "#3E4348",
    icon: Landmark,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (handle) => `https://square.link/u/${stripLeading(handle, ["@"])}`,
  },
  crypto: {
    label: "Crypto",
    brandColor: "#F7931A",
    icon: Bitcoin,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (address) => address,
  },
  custom: {
    label: "Custom link",
    brandColor: "#9FB3AC",
    icon: Link2,
    supportsAmountPrefill: false,
    referralParam: "",
    buildUrl: (url) => url,
  },
};

export const PLATFORM_ORDER: Platform[] = [
  "venmo",
  "cashapp",
  "paypal",
  "buymeacoffee",
  "kofi",
  "patreon",
  "square",
  "crypto",
  "custom",
];
