"use client"

import useSWR from "swr"

type User = {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
}

const fetcher = (url: string) => fetch(url, { credentials: "include", method: "GET" }).then(async (res) => {
    if (res.status === 401) return { user: null }
    const json = await res.json()
    return json;
});

export function useUser() {
    const { data, error, isLoading, mutate } = useSWR<{ user: User | null }>("/api/auth/me", fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false
    });
    console.log(isLoading)
    const user = data?.user ?? null
    async function refreshUser() {
        await mutate()
    }

    return {
        user,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        refreshUser
    }
}
