import type { PlatformCategory, PlatformId } from "./types";

export type Platform = {
  id: PlatformId;
  label: string;
  /** Short scannable descriptor shown in the add-block list, e.g. "instant, US only". */
  descriptor: string;
  category: PlatformCategory;
  tier: 1 | 2 | 3;
  brandColor: string;
  buildUrl: (handle: string, amount?: number) => string;
  supportsAmountPrefill: boolean;
  /** False for platforms with no real clickable payment link — render as a copy/QR block instead. */
  linkable: boolean;
  deepLinkScheme?: string;
  /** Phase 2 placeholder — left empty on all platforms for now. */
  referralParam?: string;
  region?: string;
};

function stripLeading(handle: string, chars: string[]) {
  let h = handle;
  for (const c of chars) {
    if (h.startsWith(c)) h = h.slice(c.length);
  }
  return h;
}

const passthrough = (value: string) => value;

export const PLATFORMS: Record<PlatformId, Platform> = {
  // ---- Popular / tier 1 --------------------------------------------------
  venmo: {
    id: "venmo",
    label: "Venmo",
    descriptor: "instant, US only",
    category: "p2p",
    tier: 1,
    brandColor: "#3D95CE",
    supportsAmountPrefill: true,
    linkable: true,
    deepLinkScheme: "venmo://",
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["@"]);
      const base = `https://venmo.com/${h}?txn=pay`;
      return amount ? `${base}&amount=${amount}` : base;
    },
  },
  cashapp: {
    id: "cashapp",
    label: "Cash App",
    descriptor: "instant, US/UK",
    category: "p2p",
    tier: 1,
    brandColor: "#00D64F",
    supportsAmountPrefill: true,
    linkable: true,
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["$"]);
      const base = `https://cash.app/$${h}`;
      return amount ? `${base}/${amount}` : base;
    },
  },
  paypal: {
    id: "paypal",
    label: "PayPal",
    descriptor: "widely trusted, global",
    category: "p2p",
    tier: 1,
    brandColor: "#0070BA",
    supportsAmountPrefill: true,
    linkable: true,
    referralParam: "",
    buildUrl: (handle, amount) => {
      const h = stripLeading(handle, ["@"]);
      return amount ? `https://paypal.me/${h}/${amount}` : `https://paypal.me/${h}`;
    },
  },
  buymeacoffee: {
    id: "buymeacoffee",
    label: "Buy me a coffee",
    descriptor: "one-off tips, creator-friendly",
    category: "creator",
    tier: 1,
    brandColor: "#FFDD00",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://buymeacoffee.com/${stripLeading(handle, ["@"])}`,
  },
  kofi: {
    id: "kofi",
    label: "Ko-fi",
    descriptor: "one-off tips, no account needed",
    category: "creator",
    tier: 1,
    brandColor: "#FF5E5B",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://ko-fi.com/${stripLeading(handle, ["@"])}`,
  },
  zelle: {
    id: "zelle",
    label: "Zelle",
    descriptor: "bank-to-bank, US only",
    category: "p2p",
    tier: 1,
    brandColor: "#6D1ED4",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  crypto: {
    id: "crypto",
    label: "Crypto wallet",
    descriptor: "any chain, copy + QR",
    category: "crypto",
    tier: 1,
    brandColor: "#F7931A",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  custom: {
    id: "custom",
    label: "Custom link",
    descriptor: "paste any URL",
    category: "custom",
    tier: 1,
    brandColor: "#9FB3AC",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: passthrough,
  },

  // ---- Creator support ----------------------------------------------------
  patreon: {
    id: "patreon",
    label: "Patreon",
    descriptor: "become a member, not a tip",
    category: "creator",
    tier: 1,
    brandColor: "#FF424D",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://patreon.com/${stripLeading(handle, ["@"])}`,
  },
  githubsponsors: {
    id: "githubsponsors",
    label: "GitHub Sponsors",
    descriptor: "for open-source support",
    category: "creator",
    tier: 1,
    brandColor: "#EA4AAA",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://github.com/sponsors/${stripLeading(handle, ["@"])}`,
  },
  liberapay: {
    id: "liberapay",
    label: "Liberapay",
    descriptor: "low fees, open-source favorite",
    category: "creator",
    tier: 2,
    brandColor: "#F6C915",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://liberapay.com/${stripLeading(handle, ["@"])}`,
  },
  opencollective: {
    id: "opencollective",
    label: "Open Collective",
    descriptor: "for projects, not solo creators",
    category: "creator",
    tier: 2,
    brandColor: "#3385FF",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://opencollective.com/${stripLeading(handle, ["@"])}`,
  },
  streamlabs: {
    id: "streamlabs",
    label: "Streamlabs",
    descriptor: "streamer tip alerts",
    category: "creator",
    tier: 2,
    brandColor: "#80F5D2",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://streamlabs.com/${stripLeading(handle, ["@"])}/tip`,
  },
  streamelements: {
    id: "streamelements",
    label: "StreamElements",
    descriptor: "streamer tip alerts",
    category: "creator",
    tier: 2,
    brandColor: "#4E2AC2",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://streamelements.com/${stripLeading(handle, ["@"])}/tip`,
  },
  tipeee: {
    id: "tipeee",
    label: "Tipeee",
    descriptor: "popular with EU streamers",
    category: "creator",
    tier: 3,
    brandColor: "#E5364A",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://tipeee.com/${stripLeading(handle, ["@"])}`,
  },

  // ---- P2P / personal payment apps ---------------------------------------
  revolut: {
    id: "revolut",
    label: "Revolut",
    descriptor: "revtag, EU-friendly",
    category: "p2p",
    tier: 2,
    brandColor: "#191C1F",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://revolut.me/${stripLeading(handle, ["@"])}`,
  },
  wise: {
    id: "wise",
    label: "Wise",
    descriptor: "best for international support",
    category: "p2p",
    tier: 2,
    brandColor: "#9FE870",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://wise.com/pay/me/${stripLeading(handle, ["@"])}`,
  },
  applepay: {
    id: "applepay",
    label: "Apple Pay",
    descriptor: "instructions only, no link",
    category: "p2p",
    tier: 2,
    brandColor: "#000000",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  googlepay: {
    id: "googlepay",
    label: "Google Pay",
    descriptor: "instructions only, no link",
    category: "p2p",
    tier: 2,
    brandColor: "#4285F4",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  chime: {
    id: "chime",
    label: "Chime",
    descriptor: "$ChimeSign, US only",
    category: "p2p",
    tier: 2,
    brandColor: "#1EE776",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://chime.com/pay/${stripLeading(handle, ["$"])}`,
  },

  // ---- Crypto extras -------------------------------------------------------
  lightning: {
    id: "lightning",
    label: "Lightning address",
    descriptor: "for podcasters, writers",
    category: "crypto",
    tier: 2,
    brandColor: "#F7931A",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  ens: {
    id: "ens",
    label: "ENS name",
    descriptor: "friendlier label for an ETH address",
    category: "crypto",
    tier: 2,
    brandColor: "#5284FF",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },

  // ---- Business / invoicing tools ------------------------------------------
  square: {
    id: "square",
    label: "Square",
    descriptor: "invoicing, small business",
    category: "business",
    tier: 2,
    brandColor: "#3E4348",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: (handle) => `https://square.link/u/${stripLeading(handle, ["@"])}`,
  },
  stripe: {
    id: "stripe",
    label: "Stripe Payment Links",
    descriptor: "for existing Stripe accounts",
    category: "business",
    tier: 2,
    brandColor: "#635BFF",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: passthrough,
  },
  shopify: {
    id: "shopify",
    label: "Shopify Buy Button",
    descriptor: "if you also sell products",
    category: "business",
    tier: 2,
    brandColor: "#95BF47",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: passthrough,
  },

  // ---- Regional -------------------------------------------------------------
  pix: {
    id: "pix",
    label: "PIX",
    descriptor: "Brazil, QR-based",
    category: "regional",
    tier: 2,
    brandColor: "#32BCAD",
    region: "BR",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  upi: {
    id: "upi",
    label: "UPI",
    descriptor: "India, mobile deep link",
    category: "regional",
    tier: 2,
    brandColor: "#097939",
    region: "IN",
    supportsAmountPrefill: true,
    linkable: true,
    deepLinkScheme: "upi://",
    referralParam: "",
    buildUrl: (handle, amount) => {
      const base = `upi://pay?pa=${encodeURIComponent(handle)}&cu=INR`;
      return amount ? `${base}&am=${amount}` : base;
    },
  },
  alipay: {
    id: "alipay",
    label: "Alipay",
    descriptor: "China, QR-based",
    category: "regional",
    tier: 2,
    brandColor: "#1677FF",
    region: "CN",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  wechatpay: {
    id: "wechatpay",
    label: "WeChat Pay",
    descriptor: "China, QR-based",
    category: "regional",
    tier: 2,
    brandColor: "#07C160",
    region: "CN",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  gcash: {
    id: "gcash",
    label: "GCash",
    descriptor: "Philippines, QR-based",
    category: "regional",
    tier: 2,
    brandColor: "#0072CE",
    region: "PH",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  mpesa: {
    id: "mpesa",
    label: "M-Pesa",
    descriptor: "Kenya + East Africa, phone-based",
    category: "regional",
    tier: 2,
    brandColor: "#4CB847",
    region: "KE",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },
  interac: {
    id: "interac",
    label: "Interac e-Transfer",
    descriptor: "Canada, email-based",
    category: "regional",
    tier: 2,
    brandColor: "#F5A623",
    region: "CA",
    supportsAmountPrefill: false,
    linkable: false,
    referralParam: "",
    buildUrl: passthrough,
  },

  // ---- Wishlist / indirect -----------------------------------------------
  amazonwishlist: {
    id: "amazonwishlist",
    label: "Amazon wishlist",
    descriptor: "indirect, no cash handling",
    category: "wishlist",
    tier: 3,
    brandColor: "#FF9900",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: passthrough,
  },
  giftcard: {
    id: "giftcard",
    label: "Gift card request",
    descriptor: "Amazon/Steam, custom link",
    category: "wishlist",
    tier: 3,
    brandColor: "#9FB3AC",
    supportsAmountPrefill: false,
    linkable: true,
    referralParam: "",
    buildUrl: passthrough,
  },
};

/** The 6-8 most common options, pinned above the categorized list regardless of their home category. */
export const POPULAR_PLATFORM_IDS: PlatformId[] = [
  "venmo",
  "cashapp",
  "paypal",
  "buymeacoffee",
  "kofi",
  "zelle",
  "crypto",
  "custom",
];

/** Fixed section order for the "add payment method" list (Popular is rendered separately, first). */
export const CATEGORY_ORDER: { key: PlatformCategory; label: string }[] = [
  { key: "creator", label: "Creator support" },
  { key: "crypto", label: "Crypto" },
  { key: "p2p", label: "Personal payment apps" },
  { key: "business", label: "Business & invoicing" },
  { key: "regional", label: "Regional" },
  { key: "wishlist", label: "Wishlist & indirect" },
];

export const PLATFORM_ORDER: PlatformId[] = Object.keys(PLATFORMS) as PlatformId[];

export function getPlatformsByCategory(category: PlatformCategory): Platform[] {
  return PLATFORM_ORDER.map((id) => PLATFORMS[id]).filter((p) => p.category === category);
}

/** True when tier/category makes an item collapsed under "show more" by default. */
export function isCollapsedByDefault(platform: Platform): boolean {
  if (platform.tier === 3) return true;
  if (platform.tier === 2 && platform.category === "regional") return true;
  return false;
}
