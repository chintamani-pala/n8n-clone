"use client"
import React, { useState } from 'react'
import { Search, Command, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'

const TopBar = () => {
    const { user, loading } = useUser()
    const [searchValue, setSearchValue] = useState('')
    if (loading) return null
    return (
        <header className='h-16 bg-[#121826] border-b border-[#1E293B] px-6 flex items-center justify-between'>
            <div className='flex item-center flex-1 max-w-md'>
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
                    <Plus className="w-4 h-4 mr-2" />
                    New Workflow
                </Button>
            </div>
        </header>
    )
}

export default TopBar