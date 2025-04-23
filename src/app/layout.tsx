import React from 'react'
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const dsFont = localFont({
      src: [
              {
                path: './fonts/ds/DS-DIGIB.ttf',
                weight: "700",
                style: "normal",
              },
              {
                path: './fonts/ds/DS-DIGIT.ttf',
                weight: "700",
                style: "normal",
              },
              {
                path: './fonts/ds/DS-DIGI.ttf',
                weight: "400",
                style: "normal",
              },
              {
                path: './fonts/ds/DS-DIGII.ttf',
                weight: "400",
                style: "normal",
              }
      ],
      variable: '--font-ds'
})

export const metadata: Metadata = {
  title: "Bolt",
  description: "How Speed are you???",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${dsFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
