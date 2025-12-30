
"use client"
import { mockTemplates, Template } from '@/lib/mock'
import React, { useState } from 'react'
import { Search, Filter, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import TemplateCard from '@/components/dashboard/template/template-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'


const TemplatePage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
    const router = useRouter();

    const categories = ["all", ...Array.from(new Set(mockTemplates.map(template => template.category)))]

    const filteredTemplates = mockTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleUseTemplatee = (template: Template) => {
        router.push(`/dashboard/workflows/${template.id}`)
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
            <div className="flex flex-col md:flex-row md:items-center gap-4 bg-[#121826] p-4 rounded-lg border border-[#1E293B]">
                <div className='relative w-full md:flex-1 md:max-w-md'>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder='Search templates...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='pl-10 bg-[#1E293B] border-[#334155] text-gray-200'
                    />
                </div>
                <div className='flex flex-wrap items-center gap-2'>
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
                <div className="flex items-center space-x-2 md:ml-auto">
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
                        {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onUseTemplate={handleUseTemplatee}
                                onPreview={handlePreview}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className='text-lg font-medium text-white mb-2'>No templates found</h3>
                        <p className='text-gray-400'>Try adjusting your search terms or category filters</p>
                    </div>
                )
            }

            {/*Preview Dialog */}
            <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
                <DialogContent className='bg-[#121826] border-[#1E293B] text-white max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-xl flex items-center space-x-3'>
                            <span className='text-3xl'>
                                {
                                    previewTemplate && previewTemplate?.icon === "CreditCard" && "💳"
                                }
                                {
                                    previewTemplate && previewTemplate?.icon === "FileText" && "📄"
                                }
                                {
                                    previewTemplate && previewTemplate?.icon === "Mail" && "📧"
                                }
                                {
                                    previewTemplate && previewTemplate?.icon === "Webhook" && "🔗"
                                }
                            </span>
                            <span>
                                {previewTemplate?.name}
                            </span>
                        </DialogTitle>
                        <DialogDescription className='text-gray-400'>
                            {previewTemplate?.description}
                        </DialogDescription>
                    </DialogHeader>

                    {
                        previewTemplate && (
                            <div className='space-y-6 mt-6'>
                                <div>
                                    <h4 className='text-sm font-medium text-gray-400 uppercase tracking-wide mb-3'>Workflow Steps</h4>

                                    <div className='space-y-3'>
                                        {
                                            previewTemplate?.steps?.map((step, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-3 bg-[#1E293B] rounded-lg border">
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/30 text-white">
                                                        <span className='text-sm font-medium text-green-400'>
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white font-medium">
                                                            {step}
                                                        </div>
                                                    </div>
                                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <Button
                                        onClick={() => {
                                            handleUseTemplatee(previewTemplate);
                                            setPreviewTemplate(null);
                                        }}
                                        className='flex-1 bg-green-500 hover:bg-green-600 text-black font-medium glow'
                                    >
                                        Use This Template
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            setPreviewTemplate(null);
                                        }}
                                        className='border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white'
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TemplatePage