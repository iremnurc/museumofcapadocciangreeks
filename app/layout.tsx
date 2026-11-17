import type { Metadata } from "next";
import { Commissioner, EB_Garamond } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin", "greek"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-garamond",
  display: "swap",
});

const commissioner = Commissioner({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600"],
  variable: "--font-commissioner",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: site.name, type: "website", locale: "en_GB" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${commissioner.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
