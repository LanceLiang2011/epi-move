import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Epi Move",
  description: "Information, activity tracking, and health logs for people with epilepsy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="mx-auto flex h-dvh max-w-2xl flex-col items-center overflow-auto">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
