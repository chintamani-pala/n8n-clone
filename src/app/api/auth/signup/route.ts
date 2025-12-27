import { auth } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, name } = body;
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });
        return NextResponse.json({ message: "SignUp successful. Please check your email and click on the verification link to activate your account", }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}