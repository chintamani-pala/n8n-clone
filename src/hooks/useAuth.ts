"use client"
import { useState, useEffect } from "react"

type User = {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    //signUp
    async function signup(name: string, email: string, password: string) {
        setLoading(true)
        setError(null)
        try {
            const result = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await result.json();
            if (!result.ok) {
                throw new Error(data.error || "Signup failed")
            }
            return true; //verification email step comes next
        } catch (error: any) {
            setError(error.message)
            return false
        }
        finally {
            setLoading(false)
        }

    }

    //email varification
    async function verifyEmail(email: string, code: string) {
        setLoading(true)
        setError(null)
        try {
            const result = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, code })
            });
            const data = await result.json();
            if (!result.ok) {
                throw new Error(data.error || "Verification failed")
            }
            setUser(data.user)
            return true; //verification email step comes next
        } catch (error: any) {
            setError(error.message)
            return false
        }
        finally {
            setLoading(false)
        }

    }

    //login
    async function login(email: string, password: string) {
        setLoading(true)
        setError(null)
        try {
            const result = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await result.json();
            if (!result.ok) {
                if (result.status === 403) {
                    throw new Error("Please verify your email address before logging in. Check your inbox for the verification email")
                }
                throw new Error(data.error || "Login failed")
            }
            //after login fetch user
            await me()
            return true; //verification email step comes next
        } catch (error: any) {
            setError(error.message)
            return false
        }
        finally {
            setLoading(false)
        }
    }

    //logout
    async function logout() {
        setLoading(true)
        setError(null)
        try {
            const result = await fetch("/api/auth/logout", {
                method: "POST"
            });
            setUser(null)
        } catch (error: any) {
            setError(error.message)
            return false
        }
        finally {
            setLoading(false)
        }
    }
    //me
    async function me() {
        setLoading(true)
        setError(null)
        try {
            const result = await fetch("/api/auth/me", {
                method: "POST"
            });
            if (!result.ok) {
                return setUser(null)
            }
            const data = await result.json();
            setUser(data.user)
        } catch (error: any) {
            setError(error.message)
            return false
        }
        finally {
            setLoading(false)
        }
    }
    return {
        user,
        loading,
        error,
        signup,
        verifyEmail,
        login,
        logout,
        me
    }
}