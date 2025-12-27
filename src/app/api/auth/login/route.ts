import { auth } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    try {
        const session = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        });
        //Return session data - better auth handles cookie settings automatically
        return NextResponse.json({ message: "Login successful" }, session);
    } catch (error: any) {
        if (error.message && error.message.includes("email") && error.message.includes("verify")) {
            return NextResponse.json({ error: "Please verify your email address before logging in. Check your inbox for the verification email" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}