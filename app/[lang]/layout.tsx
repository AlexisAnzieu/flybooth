import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "../providers";
import { inter } from "../font";

export const metadata: Metadata = {
  metadataBase: new URL("https://flybooth.app"),
  title: "Flybooth - Photobooth",
  description: " Photobooth on fly, from small gatherings to big venues.",
  openGraph: {
    images: ["/opengraph.png"],
    description: "Photobooth on fly, from small gatherings to big venues.",
    title: "Flybooth - Photobooth",
    url: "https://flybooth.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.svg" />
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
