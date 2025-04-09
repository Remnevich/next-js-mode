'use server'

import {createSafeActionClient} from 'next-safe-action'
import {RegisterSchema} from "@/types/register-schema";
import bcrypt from 'bcryptjs'
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

const safeAction = createSafeActionClient()

export const emailRegister = safeAction
    .schema(RegisterSchema)
    .action(async ({parsedInput: {email, password, name}}) => {
        const handlePassword = await bcrypt.hash(password, 10)
        console.log(handlePassword)

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        // If Email is already in database than say it's in use, if not, do the register
        if (existingUser) {
            // if (!existingUser.emailVerified) {
            // const verificationToken =
            // }
            return {error: 'Email already in use'};
        }

        return {success: 'All good'}
    })