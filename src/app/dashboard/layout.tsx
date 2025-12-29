import Sidebar from "@/components/dashboard/sidebar"
import TopBar from "@/components/dashboard/topbar"
import React from "react"
export const metadata = {
    title: "Flow-X Dashboard",
    description: "Flow-X is the next-gen open SaaS to build and run workflows with AI Superpowers",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="flex h-screen bg-[#0B0F14]">
        <Sidebar />
        <div className="flex-1 flex-co overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-auto bg-linear-to-br from-[#0B0F14] to-[#0E1320]">
                {children}
            </main>
        </div>
    </div>
}
