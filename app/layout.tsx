import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Scene App",
  description: "Control your smart home scenes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
