'use server'

import {createSafeActionClient} from "next-safe-action";
import {NewPasswordSchema} from "@/types/new-password-schema";
import {getPasswordResetTokenByEmail} from "@/server/actions/tokens";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {passwordResetTokens, users} from "@/server/schema";
import bcrypt from "bcryptjs";

const safeAction = createSafeActionClient()

export const newPassword = safeAction
    .schema(NewPasswordSchema)
    .action(async ({parsedInput: {password, token}}) => {
        if (!token) return {error: 'Missing token'};

        const existingToken = await getPasswordResetTokenByEmail(token)
        if (!existingToken) return {error: 'Token not found'};

        const hasExpired = new Date(existingToken.expires) < new Date();
        if (hasExpired) return {error: 'Token expired'};

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, existingToken.email),
        })
        if (!existingUser) return {error: 'User not found'};

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.transaction(async (trx) => {
            await trx
                .update(users)
                .set({
                    password: hashedPassword
                })
                .where(eq(users.id, existingUser.id))
            await trx
                .delete(passwordResetTokens)
                .where(eq(passwordResetTokens.id, existingToken.id))
        })
        return {success: 'Password updated'};
    })