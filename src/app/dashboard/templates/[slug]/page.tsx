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
import { buildInitialFlow, EDGE_STYLE, reindexStepNumbers } from '@/components/dashboard/workflows/flow-utils';
import { nodeTypes } from '@/components/dashboard/workflows/custom-node';

const linkEdges = (sourceId: string, newId: string, eds: any[]) => {
    const outgoing = eds.filter((e) => e.source === sourceId)
    const remaining = eds.filter((e) => e.source !== sourceId)
    const edgeToNew = {
        id: `edge-${sourceId}-${newId}-${Date.now()}`,
        source: sourceId,
        target: newId,
        sourceHandle: "right",
        targetHandle: "left",
        animated: true,
        style: EDGE_STYLE
    }


    const newToTargets = outgoing.map((e) => ({
        id: `edge-${newId}-${e.target}-${Date.now()}`,
        source: newId,
        target: e.target,
        sourceHandle: "right",
        targetHandle: "left",
        animated: true,
        style: EDGE_STYLE
    }));

    return [...remaining, edgeToNew, ...newToTargets]
}


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

    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
    const [nodeErrors, setNodeErrors] = useState<Record<string, string>>({})
    const [configuredSteps, setConfiguredSteps] = useState<Record<number, boolean>>({})
    const [userConnections, setUserConnections] = useState<any[]>([]);
    const [connLoading, setConnLoading] = useState(false);



    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const handleNodesChange = useCallback((changes: any) => {
        onNodesChange(changes)
        setNodes((nds) => reindexStepNumbers(nds, edges));
    }, [onNodesChange, setNodes, edges]);

    const onDragStart = useCallback((event: React.DragEvent, nodeType: any) => {
        event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = "move";
    }, [])




    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        if (!reactFlowWrapper.current || !reactFlowInstance) return;

        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        const nodeData = JSON.parse(event.dataTransfer.getData("application/reactflow"))
        const position = reactFlowInstance.project({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top
        })
        const newId = `${nodeData.id}-${Date.now()}`

        setNodes((nds) => {
            const selectedStep = (selectedNode?.data as any)?.stepNumber ?? null;
            const currentStepCount = nds.reduce((count, n) => typeof (n.data as any)?.stepNumber === "number" ? count + 1 : count, 0)

            const insertionStep = selectedStep !== null ? selectedStep + 1 : currentStepCount + 1;

            //Shift step number for nodes at or after the insertion point
            const shifted = nds.map((n) => {
                const sn = (n.data as any)?.stepNumber;
                return typeof sn === "number" && sn >= insertionStep ? { ...n, data: { ...n.data, stepNumber: sn + 1 } } : n;
            })

            //Construct the new node data payload
            const newNode = {
                id: newId,
                type: "custom",
                position,
                data: {
                    label: nodeData.name,
                    description: nodeData.description,
                    icon: nodeData.icon,
                    stepNumber: insertionStep,
                    isConfigured: false,
                    config: null
                }
            }
            return reindexStepNumbers(shifted.concat(newNode), edges)
        });

        //Rewire edges so the new node sits between the selected node and its former targets
        if (selectedNode) {
            setEdges((eds) => {
                const newEdges = linkEdges(selectedNode.id, newId, eds);
                setNodes((nds) => reindexStepNumbers(nds, newEdges));
                return newEdges;
            })
        }
    }, [reactFlowInstance, selectedNode, edges, setEdges, setNodes])

    const onConnect = useCallback((params: Connection) => {
        const edgeId = `edge-${params.source}-${params.target}-${Date.now()}`;
        setEdges((eds) => addEdge({ ...params, id: edgeId, animated: true, style: EDGE_STYLE }, eds))
    }, [setEdges])

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, [])

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, [])

    const openModal = useCallback((nodeData: any) => {
        setModalNodeData(nodeData)
        setIsModalOpen(true)
    }, [])
    const closeModal = useCallback(() => {
        setIsModalOpen(false)
        setModalNodeData(null)
    }, [])

    const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
        openModal(node.data)
    }, [openModal])

    useEffect(() => {
        if (selectedNode) {
            const updated = nodes.find((n) => n.id === selectedNode.id)
            if (updated && Boolean((updated.data as any)?.isConfigured) !== Boolean(selectedNode.data?.isConfigured)) {
                setSelectedNode(updated)
            }
        }
    }, [nodes, selectedNode])


    useEffect(() => {
        const foundTemplate = mockTemplates.find((t) => t.id === slug);
        if (!foundTemplate) {
            setTemplate(null);
            return;
        }
        setTemplate(foundTemplate);

        const { nodes: initialNodes, edges: initialEdges } = buildInitialFlow(foundTemplate, configuredSteps)
        console.log("Initial Nodes:", initialNodes);
        console.log("Initial Edges:", initialEdges);

        const reindexedNodes = reindexStepNumbers(initialNodes, initialEdges);

        // Fallback if reindexing fails essentially
        if (reindexedNodes.length > 0) {
            setNodes(reindexedNodes);
        } else {
            console.warn("Reindexing returned 0 nodes, falling back to initialNodes");
            setNodes(initialNodes);
        }

        setEdges(initialEdges);
    }, [slug, configuredSteps, setNodes, setEdges]) // Added configuredSteps to deps

    if (!template && !slug) return <div className="p-6 text-white">Loading...</div>;
    return (
        <div className='flex h-full'>
            {/*left column - header and canvas*/}
            <div className="flex-1  p-6 flex flex-col h-full">
                {
                    !template ? (
                        <div className="flex items-center justify-center h-full">
                            <h1 className="text-xl font-bold text-gray-400">Template not found for slug: {slug}</h1>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        Edit Template: {template.name}
                                    </h1>
                                    <p className="text-gray-400">
                                        {
                                            template.description || "Design your workflow by connecting nodes"
                                        }
                                    </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    {/* Actions could go here */}
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
                                            onConnect={onConnect}
                                            onInit={setReactFlowInstance}
                                            onDrop={onDrop}
                                            onDragOver={onDragOver}
                                            onNodeClick={onNodeClick}
                                            onNodeDoubleClick={onNodeDoubleClick}
                                            nodeTypes={nodeTypes}
                                            fitView
                                            attributionPosition='bottom-right'
                                            className='bg-[#0B0F14]'
                                        >
                                            <Background color='#334155' gap={16} />
                                            <Controls className='bg-[#1E293B] border-[#334155] text-gray-300' />
                                        </ReactFlow>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )
                }
            </div>
            <div className="w-80 border border-[#1E293B] p-4 overflow-y-auto"></div>
        </div>
    )
}

export default Page