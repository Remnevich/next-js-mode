import NextAuth from "next-auth"
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import type {Adapter} from "next-auth/adapters"
import GitHubProvider from "next-auth/providers/github"
import Yandex from "@/server/yandex/yandex"
import Credentials from "next-auth/providers/credentials";
import {LoginSchema} from "@/types/login-schema";

import {db} from "./index"
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import bcrypt from "bcryptjs";


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
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const {email, password} = validatedFields?.data
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email)
                    })

                    if (!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (passwordMatch) return user
                }
                return null
            }
        })
    ],
})