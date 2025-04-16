'use server'

import {createSafeActionClient} from 'next-safe-action'
import {LoginSchema} from '@/types/login-schema'
import {users} from "@/server/schema";
import {eq} from "drizzle-orm";
import {db} from "@/server";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";
import {signIn} from "@/server/auth";
import {AuthError} from "next-auth"

const safeAction = createSafeActionClient()

export const emailSignIn = safeAction
    .schema(LoginSchema)
    .action(async ({parsedInput: {email, code, password}}) => {
        try {
            const existingUser = await db.query.users.findFirst({
                where: eq(users.email, email)
            })
            if (existingUser?.email !== email) {
                return {error: 'Email not found'};
            }


            if (!existingUser.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(existingUser.email)
                await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

                return {success: 'Confirmation Email Sent'}
            }

            await signIn('credentials', {
                email,
                password,
                redirectTo: '/'
            })

            return {success: "User Signed In!"}
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                switch (e.type) {
                    case "CredentialsSignin":
                        return {error: "Email or Password Incorrect"}
                    case 'AccessDenied':
                        return {error: e.message}
                    case 'OAuthSignInError':
                        return {error: e.message}
                    default:
                        return {error: 'Something went wrong'}
                }
            }
            throw e
        }
    })