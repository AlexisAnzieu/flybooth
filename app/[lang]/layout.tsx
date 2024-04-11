import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import useTranslation from "next-translate/useTranslation";

import { Providers } from "../providers";
import { inter } from "../font";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

polyfillCountryFlagEmojis();


export function generateMetadata(): Metadata {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation("main");

  return {
    metadataBase: new URL("https://flybooth.app"),
    title: "Flybooth - Photobooth on fly",
    description: t("landing.subtitle"),
    openGraph: {
      images: ["/opengraph.png"],
      description: t("landing.subtitle"),
      title: "Flybooth - Photobooth on fly",
      url: "https://flybooth.app",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = useTranslation();

  return (
    <html lang={lang}>
      <link rel="shortcut icon" href="/favicon.svg" />
      <body style={{fontFamily: '"Twemoji Country Flags", "Helvetica", "Comic Sans", serif;'}} className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
