"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Activity, CreditCard, Settings, LayoutTemplate as Template, Workflow, User, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
    {
        name: "Overview",
        href: "/dashboard",
        icon: Activity
    },
    {
        name: "Workflows",
        href: "/dashboard/workflows",
        icon: Workflow
    },
    {
        name: "Templates",
        href: "/dashboard/templates",
        icon: Template
    },
    {
        name: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings
    }
]
const Sidebar = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        router.push("/");
    }
    return (
        <div className={cn('w-64 bg-[#121826] border-r border-[#E293B] flex-col hidden md:flex', className)}>
            <div className='px-4 pt-3 pb-2'>
                <Link href="/" className="flex items-center">
                    <Image
                        src={require("@/assets/logo.png")}
                        alt='FlowX'
                        width={250}
                        height={190}
                        className='-my-15'
                    />
                </Link>
            </div>
            <nav className='flex-1 px-4 pt-0'>
                <ul className='space-y-5'>
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isAcive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <li key={item.name}>
                                <Link href={item.href} className={cn('flex items-center space-x-3 px-3 py-1.5 rounded text-sm font-medium leading-tight transition-all duration-200', isAcive ? 'bg-green-500/10 text-green-400 glow' : 'text-gray-300 hover:bg-[#1E293B]')}>
                                    <Icon className='w-4 h-4' />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className='mt-auto p-3 border-t border-[#1E293B] space-y-4 mb-2'>
                <Link href="/dashboard/settings" className='flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#1E293B] hover:text-white transition-colors'>
                    <User className='w-4 h-4' />
                    <span>Profile</span>
                </Link>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#1E293B] hover:text-white transition-colors"
                >
                    <LogOut className='w-4 h-4 text-red-400' />
                    <span className='text-red-400'>Logout</span>

                </button>
            </div>
        </div>
    )
}

export default Sidebar