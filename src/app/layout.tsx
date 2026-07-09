import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import Provider from "./providers";

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
