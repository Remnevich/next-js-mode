'use server'

import {createSafeActionClient} from 'next-safe-action'
import {RegisterSchema} from "@/types/register-schema";
import bcrypt from 'bcryptjs'
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";

const safeAction = createSafeActionClient()

export const emailRegister = safeAction
    .schema(RegisterSchema)
    .action(async ({parsedInput: {email, password, name}}) => {
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10)
        // check existing user
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        // If Email is already in database than say it's in use, if not, do the register
        if (existingUser) {
            if (!existingUser.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(email);
                await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

                return {success: 'Email confirmation resent'}
            }
            return {error: 'Email already in use'};
        }

        // logic when the user not registered
        await db.insert(users).values({
            email: email,
            name,
            password: hashedPassword
        })

        const verificationToken = await generateEmailVerificationToken(email)

        await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

        return {success: 'Email confirm sent'}
    })