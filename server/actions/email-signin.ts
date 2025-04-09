'use server'

import {createSafeActionClient} from 'next-safe-action'
import {LoginSchema} from '@/types/login-schema'
import {users} from "@/server/schema";
import {eq} from "drizzle-orm";
import {db} from "@/server";

const safeAction = createSafeActionClient()

export const emailSignIn = safeAction
    .schema(LoginSchema)
    .action(async ({parsedInput: {email, code, password}}) => {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        if (existingUser?.email === email) {
            return {error: 'Email not found'};
        }

        console.log(email, code, password)
        return {success: email}
    })