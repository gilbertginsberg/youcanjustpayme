export type Platform =
  | "venmo"
  | "cashapp"
  | "paypal"
  | "buymeacoffee"
  | "kofi"
  | "patreon"
  | "square"
  | "crypto"
  | "custom";

export type PaymentBlock = {
  id: string;
  platform: Platform;
  label: string;
  handleOrAddress: string;
  note?: string;
  suggestedAmounts?: number[];
  /** Only one block max can be featured — enforce in UI: toggling a new one un-features the old one. */
  featured: boolean;
  order: number;
};

export type Theme = {
  mode: "dark" | "light";
  /** hex, from curated set only — no free color picker */
  accent: string;
};

export type Plan = "free" | "pro";

export type CreatorPage = {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  blocks: PaymentBlock[];
  plan: Plan;
};

export type DirectoryCreator = {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  plan: Plan;
  accent: string;
};
