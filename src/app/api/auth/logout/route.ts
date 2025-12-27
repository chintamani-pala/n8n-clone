import { auth } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const session = await auth.api.signOut({
            headers: request.headers
        });
        //Return session data - better auth handles cookie removal automatically
        return NextResponse.json({ message: "Logout successful" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}