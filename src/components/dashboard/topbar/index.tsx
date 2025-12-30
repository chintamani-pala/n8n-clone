"use client"
import React, { useState, useEffect } from 'react'
import { Search, Command, Plus, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'

const TopBar = () => {
    const { user, loading } = useUser()
    const [searchValue, setSearchValue] = useState('')
    const [sheetOpen, setSheetOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setSheetOpen(false)
    }, [pathname])

    if (loading) return null
    return (
        <header className='h-16 bg-[#121826] border-b border-[#1E293B] px-4 md:px-6 flex items-center justify-between'>
            <div className="md:hidden mr-4">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-[#121826] border-[#1E293B]">
                        <Sidebar className="flex h-full border-r-0" />
                    </SheetContent>
                </Sheet>
            </div>

            <div className='flex item-center flex-1 max-w-sm'>
                <div className='relative w-full'>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"></Search>
                    <Input
                        placeholder='Search workflows...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className='pl-10 bg-[#1E293B] border-[#334155] text-gray-200 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20'
                    />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                        <Kbd className='px-2 py-1 text-xs text-gray-500 bg-[#334155] rounded'>
                            <Command className="w-3 h-3 inline mr-1" />

                        </Kbd>
                    </div>
                </div>

            </div>
            <div className='flex items-center space-x-4'>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-medium glow">
                    <Plus className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">New Workflow</span>
                </Button>
            </div>
        </header>
    )
}

export default TopBar