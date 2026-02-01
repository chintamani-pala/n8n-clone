import React from 'react'
import { ArrowRight } from "lucide-react"
import { ICON_MAP, TOOL_NODES } from './flow-utils';



interface NodeData {
    label: string;
    description: string;
    icon: string;
    isStartNode?: boolean;
    stepNumber: number
}

interface Connections {
    id: string;
    platform: string;
    account_name: string;
    metadata: string;
    created_at: string;
    updated_at: string;
}
interface NodeConfigurationModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeData: NodeData | null;
    onConfigured: (stepNumber: number, config?: any) => void;
}

const OAUTH_PROVIDERS = [
    "stripe",
    "gmail",
    "slack",
    "discord",
    "notion",
    "sheets"
]

const API_KEY_PROVIDERS = [
    "openai",
    "claude",
    "gemini"
]

const CORE_PROVIDERS = [
    "http-request",
    "send-notifications",
    "webhook-trigger",
    "schedule-trigger"
]

function isOAuthProvider(platformName: any) {
    return OAUTH_PROVIDERS.includes(platformName.toLowerCase())
}


const getPlatformName = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("gmail")) return "gmail"
    if (lower.includes("slack")) return "slack"
    if (lower.includes("discord")) return "discord"
    if (lower.includes("notion")) return "notion"
    if (lower.includes("sheets")) return "sheets"
    if (lower.includes("openai")) return "openai"
    if (lower.includes("claude")) return "claude"
    if (lower.includes("gemini")) return "gemini"
    if (lower.includes("http")) return "http-request"
    if (lower.includes("webhook")) return "webhook-trigger"
    if (lower.includes("schedule")) return "schedule-trigger"
    if (lower.includes("stripe")) return "stripe"
    if (lower.includes("send notifications")) return "send-notifications"
    return label.toLowerCase().replace(/\s+/g, "-")
}


function isApiKeyProvider(platformName: any) {
    return API_KEY_PROVIDERS.includes(platformName.toLowerCase())
}


function isCoreProvider(platformName: any) {
    return CORE_PROVIDERS.includes(platformName.toLowerCase())
}

const inputCls = "w-full px-3 py-2 bg-[#0b0f14] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
const selectCls = "w-full px-3 py-2 bg-[#0b0f14] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"

const Field = ({ label, children }: { label: string, children: React.ReactNode }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            {children}
        </div>
    )
}

const NodeConfigurationModal = ({ isOpen, onClose, nodeData, onConfigured }: NodeConfigurationModalProps) => {

    const [connections, setConnections] = React.useState<Connections[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedConnection, setSelectedConnection] = React.useState<Connections | null>(null);
    const [apiKey, setApiKey] = React.useState<string | null>(null);
    const [apiEndPoint, setApiEndPoint] = React.useState<string | null>(null);
    const [coreConfig, setCoreConfig] = React.useState<Record<string, any>>({});

    const getDisplayName = (platform: string) => {
        const names = TOOL_NODES.reduce<Record<string, string>>((acc, category) => {
            category.items.forEach((item) => {
                acc[item.id] = item.name
            })
            return acc
        }, {})
        return names[platform] ?? "";
    }

    const IconComponent = (nodeData && ICON_MAP[nodeData.icon]) || ICON_MAP.ArrowRight || ArrowRight;
    const platformName = nodeData ? getPlatformName(nodeData?.label) : "";
    const isOAuth = isOAuthProvider(platformName);
    const isApiKey = isApiKeyProvider(platformName);
    const isCore = isCoreProvider(platformName);
    const displayName = getDisplayName(platformName);

    return (
        <div>NodeConfigurationModal</div>
    )
}

export default NodeConfigurationModal
