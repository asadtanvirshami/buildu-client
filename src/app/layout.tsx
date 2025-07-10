import type { Metadata } from "next";
import { Red_Hat_Display, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider/provider";
import { LanguageProvider } from "@/hooks/language/use-language";

const redhat = Red_Hat_Display({
  variable: "--font-redhat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Backtesting",
  description: "A comprehensive backtesting platform with advanced features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${redhat.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <LanguageProvider>
          {children}
        </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
