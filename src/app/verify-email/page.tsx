"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const { verifyEmail } = useAuth();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/auth/verify-email?token=${token}`);
                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                    toast.success("Email verified successfully");
                } else {
                    setStatus("error");
                    toast.error(data.error || "Verification failed");
                }
            } catch (error) {
                setStatus("error");
                toast.error("Something went wrong");
            }
        };

        verify();
    }, [token]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Verifying your email...</h1>
                <p className="text-muted-foreground">Please wait while we verify your email address.</p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold">Email Verified!</h1>
                <p className="text-muted-foreground max-w-md">
                    Thank you for verifying your email address. Your account is now fully active.
                </p>
                <div className="flex gap-4">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                <XCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground max-w-md">
                We couldn't verify your email address. The link might be invalid or expired.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" size="lg" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="container max-w-4xl mx-auto py-20">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
            }>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
