import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Budget Tracker",
  description: "Track your expenses and manage your budget effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
