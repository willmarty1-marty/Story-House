import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Story — Builder",
  description: "Create beautiful digital storybooks for homes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
