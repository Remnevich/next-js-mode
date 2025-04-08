import NextAuth from "next-auth"
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import type {Adapter} from "next-auth/adapters"
import GitHubProvider from "next-auth/providers/github"

import {db} from "./index"
import Yandex from "@/server/yandex/yandex"

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: DrizzleAdapter(db) as Adapter,
    secret: process.env.AUTH_SECRET!,
    session: {strategy: "jwt"},
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Yandex({
            clientId: process.env.YANDEX_ID!,
            clientSecret: process.env.YANDEX_SECRET!,
        }),
    ],
})