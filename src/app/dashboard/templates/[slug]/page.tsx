"use client"
import { useUser } from '@/hooks/useUser';
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Node,
    addEdge,
    Connection
} from "reactflow";
import "reactflow/dist/style.css"
import { mockTemplates } from "@/lib/mock";
import { toast } from "sonner"
import { Card, CardContent } from '@/components/ui/card';
const Page = () => {
    const params = useParams();
    const slug = params.slug as string;
    const { user } = useUser()

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [template, setTemplate] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalNodeData, setModalNodeData] = useState<any>(null);

    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const handleNodesChange = useCallback((changes: any) => {
        onNodesChange(changes)
        // setNodes((nds)=> );
    }, [onNodesChange, setNodes, edges]);
    useEffect(() => {
        const template = mockTemplates.find((template) => template.id === slug);
        if (template) {
            setTemplate(template);
        }
    }, [slug])

    return (
        <div className='flex h-full'>
            {/*left column - header and canvas*/}
            <div className="flex-1  p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Edit Template: {template?.name || slug}
                        </h1>
                        <p className="text-gray-400">
                            {
                                template?.description || "Design your workflow by connecting nodes"
                            }
                        </p>
                    </div>
                    <div className='flex items-center gap-3'>



                    </div>
                </div>
                {/*canvas controls */}
                <Card className='bg-[#121826] border-[#1E293B] flex-1 relative'>
                    <CardContent className='p-0 h-full'>
                        <div ref={reactFlowWrapper} className='h-full w-full'>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={handleNodesChange}
                                onEdgesChange={onEdgesChange}
                                onNodeClick={(event, node) => setSelectedNode(node)}
                            >
                                <Background />
                                <Controls />
                            </ReactFlow>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default Page