import { Archivo, Inter, Martian_Mono } from "next/font/google";
import localFont from "next/font/local";

export const logoFont = localFont({
  src: "../public/font/ProtestStrike-Regular.ttf",
  display: "swap",
});

export const inter = Inter({ subsets: ["latin"] });

// Printer page: Archivo's width axis gives condensed display type and
// regular-width body text from one family.
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

// Printer page: only used on the paper objects (print strip, receipt),
// standing in for the thermal printer's built-in font.
export const martianMono = Martian_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-thermal",
});
