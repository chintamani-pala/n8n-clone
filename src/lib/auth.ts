import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "../db/auth-schema";
import { nextCookies } from "better-auth/next-js"
import { EmailService } from "@/services/emailService";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: authSchema.user,
            session: authSchema.session,
            account: authSchema.account,
        }
    }),
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
            const finalURL = `${baseURL}/verify-email?token=${token}`;
            await EmailService.sendVerificationEmail({
                to: user.email!,
                url: finalURL,
                name: user.name!
            })
        }
    },
    passwords: {
        minimumLength: 8, bcryptRounds: 12, sessions: { cookieName: "fx_session", cookieSecure: true, ttl: 60 * 60 * 24 * 30 } //30 days
    },
    plugins: [nextCookies()]
});