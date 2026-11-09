import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const logoFont = localFont({
  src: "../public/font/ProtestStrike-Regular.ttf",
  display: "swap",
});

export const inter = Inter({ subsets: ["latin"] });
