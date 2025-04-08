import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const interSans = Inter({
    subsets: ['cyrillic'],
    variable: '--font-inter',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: "Next mode project",
    description: "Created bu Remnev",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${interSans.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
