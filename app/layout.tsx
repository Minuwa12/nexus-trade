import { ClerkProvider } from '@clerk/nextjs'
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
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}