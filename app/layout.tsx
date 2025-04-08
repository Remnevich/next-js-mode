import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import Nav from "@/components/navigation/nav";
import {cn} from "@/lib/utils";

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
            className={cn('px-6 md:px-12 max-w-7xl mx-auto', `${interSans.variable}`)}
        >
        <Nav/>
        {children}
        </body>
        </html>
    );
}
