import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers, { AuthProvider } from "./SessionProvider";
import NoHeaderFooter from "@/components/NoHeaderFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Giftoria",
    template: "%s | Giftoria",
  },
  description: "A gift sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NoHeaderFooter>{children}</NoHeaderFooter>
        </Providers>
      </body>
    </html>
  );
}
