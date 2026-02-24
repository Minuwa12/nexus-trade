import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusTrade | Command Center",
  description: "Secure Trading Vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505]">
        {children}
      </body>
    </html>
  );
}