import * as simpleIcons from "simple-icons";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  Landmark,
  QrCode,
  Banknote,
  Smartphone,
  Radio,
  Gift,
  Link2,
} from "lucide-react";
import type { PlatformId } from "./types";

/**
 * Maps a platform id to the simple-icons slug that renders its real brand
 * mark. Anything left out here falls back to a generic lucide icon below —
 * simple-icons doesn't ship every brand in our list (Chime, Tipeee,
 * StreamElements, GCash, M-Pesa, Interac, UPI have no dedicated logo).
 */
const SIMPLE_ICON_KEY: Partial<Record<PlatformId, keyof typeof simpleIcons>> = {
  venmo: "siVenmo",
  cashapp: "siCashapp",
  paypal: "siPaypal",
  buymeacoffee: "siBuymeacoffee",
  kofi: "siKofi",
  zelle: "siZelle",
  patreon: "siPatreon",
  githubsponsors: "siGithubsponsors",
  liberapay: "siLiberapay",
  opencollective: "siOpencollective",
  streamlabs: "siStreamlabs",
  revolut: "siRevolut",
  wise: "siWise",
  applepay: "siApplepay",
  googlepay: "siGooglepay",
  crypto: "siBitcoin",
  lightning: "siLightning",
  ens: "siEns",
  square: "siSquare",
  stripe: "siStripe",
  shopify: "siShopify",
  pix: "siPix",
  alipay: "siAlipay",
  wechatpay: "siWechat",
};

/** Generic lucide fallback for platform ids with no simple-icons entry. */
const LUCIDE_FALLBACK: Partial<Record<PlatformId, LucideIcon>> = {
  chime: Banknote,
  tipeee: Radio,
  streamelements: Radio,
  gcash: Smartphone,
  mpesa: Smartphone,
  interac: Landmark,
  upi: QrCode,
  amazonwishlist: Gift,
  giftcard: Gift,
  custom: Link2,
};

const DEFAULT_FALLBACK: LucideIcon = Wallet;

export type PlatformIconProps = {
  id: PlatformId;
  className?: string;
  /** brandColor from the registry — used to tint lucide fallbacks. */
  color?: string;
};

/**
 * Renders a platform's brand icon: a real simple-icons SVG mark when one
 * exists, otherwise a generic lucide icon tinted with the platform's brand
 * color so it still reads as visually distinct.
 */
export function PlatformIcon({ id, className, color }: PlatformIconProps) {
  const key = SIMPLE_ICON_KEY[id];
  if (key) {
    const icon = simpleIcons[key] as { path: string; title: string } | undefined;
    if (icon) {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={className}
          fill={color ?? `#${(icon as unknown as { hex: string }).hex}`}
          aria-label={icon.title}
        >
          <path d={icon.path} />
        </svg>
      );
    }
  }
  const Fallback = LUCIDE_FALLBACK[id] ?? DEFAULT_FALLBACK;
  return <Fallback className={className} style={color ? { color } : undefined} />;
}
