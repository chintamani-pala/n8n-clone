import {
    Webhook,
    Mail,
    Database,
    Code,
    MessageSquare,
    FileText,
    Brain,
    Zap,
    Filter,
    ArrowRight,
    CreditCard,
    Clock,
    Hash,
    Bell,
    Timer,
    RotateCcw,
    Globe,
    Bot,
    FileSpreadsheet,
    LayoutList
} from "lucide-react";
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Node,
    addEdge,
    Connection,
    Edge
} from "reactflow";
export interface Position {
    x: number;
    y: number;
}

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Webhook,
    Mail,
    Database,
    Code,
    MessageSquare,
    FileText,
    Brain,
    Zap,
    Filter,
    ArrowRight,
    CreditCard,
    Clock,
    Hash,
    Bell,
    Timer,
    RotateCcw,
    Globe,
    Bot,
    FileSpreadsheet,
    LayoutList
}

export const EDGE_STYLE = {
    stroke: "#10B981",
    strokeWidth: 2,
    strokeDasharray: "5,5"
}

export const TOOL_NODES = [
    {
        id: "ai",
        category: "AI & Machine Learning",
        items: [
            { id: "openai", name: "OpenAI", icon: Brain, description: "Generate text/images with GPT" },
            { id: "claude", name: "Claude", icon: Bot, description: "Anthropic's helper" },
            { id: "gemini", name: "Gemini", icon: Zap, description: "Google's multimodal AI" },
        ]
    },
    {
        id: "integrations",
        category: "Integrations",
        items: [
            { id: "gmail", name: "Gmail", icon: Mail, description: "Send & receive emails" },
            { id: "slack", name: "Slack", icon: MessageSquare, description: "Send messages to channels" },
            { id: "discord", name: "Discord", icon: Hash, description: "Post to Discord servers" },
            { id: "notion", name: "Notion", icon: LayoutList, description: "Manage pages & databases" },
            { id: "sheets", name: "Google Sheets", icon: FileSpreadsheet, description: "Read/Write spreadsheet rows" },
            { id: "stripe", name: "Stripe", icon: CreditCard, description: "Process payments" },
            { id: "webhook-custom", name: "Custom Webhook", icon: Webhook, description: "Send data out via webhook" },
        ]
    },
    {
        id: "triggers",
        category: "Triggers",
        items: [
            { id: "webhook-trigger", name: "Webhook Trigger", icon: Webhook, description: "Start flow on request" },
            { id: "schedule-trigger", name: "Schedule", icon: Clock, description: "Run at fixed intervals" },
        ]
    },
    {
        id: "actions",
        category: "Core Actions",
        items: [
            { id: "http-request", name: "HTTP Request", icon: Globe, description: "Make external API calls" },
            { id: "send-notifications", name: "Send Notification", icon: Bell, description: "App/Email alerts" },
        ]
    }
]

export const getIconForStep = (stepName: string): string => {
    const iconKeys = Object.keys(ICON_MAP);
    const foundKey = iconKeys.find((key) => stepName.includes(key));
    return foundKey || "ArrowRight"
}

export const getNodePosition = (index: number): Position => {
    const positions: Position[] = [
        { x: 150, y: 280 },
        { x: 400, y: 180 },
        { x: 650, y: 180 },
        { x: 900, y: 180 }
    ]
    return positions[index] || { x: 150 + index * 250, y: 280 };
}

export function reindexStepNumbers(nds: Node[], eds: Edge[]): Node[] {
    const isStep = (n: Node) => typeof (n.data as any)?.stepNumber === "number";
    const stepNodes = nds.filter(isStep);
    const idSet = new Set(stepNodes.map(n => n.id));
    const incommingCount = new Map<string, number>();
    const outgoingMap = new Map<string, string[]>();

    idSet.forEach(id => {
        incommingCount.set(id, 0);
    })

    eds.forEach(edge => {
        if (idSet.has(edge.target)) {
            incommingCount.set(edge.target, (incommingCount.get(edge.target) || 0) + 1);
        }
        if (idSet.has(edge.source) && idSet.has(edge.target)) {
            const arr = outgoingMap.get(edge.source) || [];
            arr.push(edge.target);
            outgoingMap.set(edge.source, arr);
        }
    })

    const startId = [...idSet].find((id) => (incommingCount.get(id) || 0) === 0) || stepNodes.sort((a, b) => a.position.x - b.position.x)[0]?.id;
    const chain: string[] = [];

    let cursor: any = startId;
    const visited = new Set<string>();

    while (cursor && !visited.has(cursor)) {
        visited.add(cursor);
        chain.push(cursor);
        const nextCandidates = (outgoingMap.get(cursor) || []).filter(id => idSet.has(id));
        if (!nextCandidates.length) {
            break;
        }
        const next = nextCandidates.map((id) => nds.find((n) => n.id === id)!).sort((a, b) => a.position.x - b.position.x)[0]?.id || null;
        cursor = next || null;
    }
    const remaining = [...idSet].filter(id => !chain.includes(id));
    const remainingOrdered = remaining?.map((id) => nds.find((n) => n.id === id))
        .filter((n): n is Node => !!n)
        .sort((a, b) => a?.position.x === b?.position.x ? a?.position.y - b?.position?.y : a?.position.x - b?.position.x).map((n) => n.id)
    const finalOrder = [...chain, ...remainingOrdered];
    const idToStep = new Map<string, number>();
    finalOrder.forEach((id, index) => idToStep.set(id, index + 1));
    return nds.map((n) => {
        const newStep = idToStep.get(n.id);
        return isStep(n) && newStep && (n.data as any)?.stepNumber !== newStep ? { ...n, data: { ...n.data, stepNumber: newStep } } : n;
    })
}


export function buildInitialFlow(
    foundTemplate: any,
    configuredSteps: Record<number, boolean>
) {
    let nodes: Node[] = foundTemplate.steps?.map((step: any, index: number) => {
        return {
            id: `step-${index}`,
            type: "custom",
            position: getNodePosition(index),
            data: {
                label: step, //label shon on the canvas
                description: `Step ${index + 1}`, //helper text
                icon: getIconForStep(step),  // icon delivered by label content
                isStartNode: index === 0, // flags first node
                stepNumber: index + 1,// execution order
                isConfigured: !!configuredSteps[index + 1], //UI ready state
            }
        }
    })
    let edges: Edge[] = foundTemplate.steps.slice(1).map((_: any, index: number) => {
        return {
            id: `edge-${index}-${index + 1}`,
            source: `step-${index}`,
            target: `step-${index + 1}`,
            sourceHandle: "right",
            targetHandle: "left",
            animated: true,
            style: EDGE_STYLE,
        }
    })

    const aiConnIndex = foundTemplate.steps.findIndex((step: any) => step.toLowerCase().includes("ai generate"));
    if (aiConnIndex !== -1) {
        const insertionStep = aiConnIndex + 2;
        nodes = nodes.map((n, index) => {
            const sn = (n.data as any)?.stepNumber;
            return typeof sn === "number" && sn >= insertionStep ?
                {
                    ...n,
                    data: {
                        ...n.data,
                        stepNumber: sn + 1
                    }
                } : n;
        })

        const aiNodeId = "ai-tool-1"
        nodes.push({
            id: aiNodeId,
            type: "custom",
            position: { x: 400, y: 350 },
            data: {
                label: "OpenAi Model", //label shon on the canvas
                description: `AI Processing`, //helper text
                icon: "Brain",  // icon delivered by label content
                isStartNode: false, // flags first node
                stepNumber: insertionStep,// execution order
                isConfigured: !!configuredSteps[insertionStep], //UI ready state
            }
        })
        const sourceId = `step-${aiConnIndex}`;
        const targetId = `step-${aiConnIndex + 1}`;
        edges = edges.filter((e) => !(e.source === sourceId && e.target === targetId))
        edges.push({
            id: `edge-${sourceId}-${aiNodeId}`,
            source: sourceId,
            target: aiNodeId,
            sourceHandle: "bottom",
            targetHandle: "top",
            animated: true,
            style: EDGE_STYLE,
        })

        edges.push({
            id: `edge-${aiNodeId}-${targetId}`,
            source: aiNodeId,
            target: targetId,
            sourceHandle: "right",
            targetHandle: "left",
            animated: true,
            style: EDGE_STYLE,
        })
    }

    return { nodes, edges };
}