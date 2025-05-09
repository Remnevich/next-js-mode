'use server'

import {db} from "@/server";
import {eq} from "drizzle-orm";
import {emailTokens, passwordResetTokens, users} from "@/server/schema";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.token, email)
        })
        return verificationToken
    } catch (e) {
        return null
    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    }

    const verificationToken = await db.insert(emailTokens).values({
        email,
        token,
        expires
    }).returning()

    return verificationToken
}

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByEmail(token)
    if (!existingToken) return {error: 'Token not found'}

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) return {error: 'Token has expired'}

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email)
    })
    if (!existingUser) return {error: 'Email does not exist'}

    await db.update(users).set({
        emailVerified: new Date(),
        email: existingToken.email
    }).where(eq(users.id, existingUser.id))

    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    return {success: 'Email has been verified'}
}

export const getPasswordResetTokenByEmail = async (token: string) => {
    try {
        const passwordResetToken = await db.query.passwordResetTokens.findFirst({
            where: eq(passwordResetTokens.token, token)
        })

        return passwordResetToken
    } catch (e) {
        return null
    }
}