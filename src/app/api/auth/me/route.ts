import { auth } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await auth.api.getSession(request);
    if (!session) {
        return NextResponse.json({ user: null }, { status: 400 })
    }
    return NextResponse.json({ user: session.user });

}