import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Movie search app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
