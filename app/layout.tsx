import type { Metadata } from "next";

import { Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";
import { Room } from "./Room";

const fontSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: "Etiquette Luxe",
  description: "Official Online Site by Ma Layka Nogoy-Marinay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* <Header /> */}
            <Room>
              {children}
            </Room>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
