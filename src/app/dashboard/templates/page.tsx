
"use client"
import { mockTemplates, Template } from '@/lib/mock'
import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const TemplatePage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    const categories = ["all", ...Array.from(new Set(mockTemplates.map(template => template.category)))]

    const filteredTemplates = mockTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleUseTemplatee = (template: Template) => {
        console.log("Use template")
    }

    const handlePreview = (template: Template) => {
        setPreviewTemplate(template)
    }
    return (
        <div className='p-6 space-y-6'>
            <div>
                <h1 className='text-3xl font-bold text-white mb-2'>
                    Template Gallery
                </h1>
                <p className='text-gray-400'>
                    Get started quickly with pre-build automation templates
                </p>
            </div>

            {/*Filters*/}
            <div className="flex items-center space-x-4 bg-[#121826] p-4 rounded-lg border border-[#1E293B]">
                <div className='relative flex-1 max-w-md'>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder='Search templates...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='pl-10 bg-[#1E293B] border-[#334155] text-gray-200'
                    />
                </div>
                <div className='flex items-center space-x-2'>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size={"sm"}
                            onClick={() => setSelectedCategory(category)}
                            className={
                                selectedCategory === category
                                    ? "bg-green-500 hover:bg-green-600 text-black"
                                    : "border-[#334155] text-gray-300 hover:bg-[#1E293B]"
                            }
                        >
                            {category === "all" ? "All" : category}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Badge variant={"outline"} className='border-[#334155] text-gray-400'>
                        {filteredTemplates.length} template
                        {filteredTemplates.length !== 1 ? "s" : ""}
                    </Badge>
                </div>
            </div>
            {/*Templates grid*/}
            {
                filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onUseTemplate={handleUseTemplatee}
                                onPreview={handlePreview}
                            />
                        ))} */}
                    </div>
                ) : (
                    <p>No templates found</p>
                )
            }
        </div>
    )
}

export default TemplatePage