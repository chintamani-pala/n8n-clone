import { PgBooleanBuilder } from 'drizzle-orm/pg-core';
import React from 'react'
import { NodeProps } from 'reactflow';
import { ICON_MAP } from './flow-utils';
import { ArrowRightIcon } from "lucide-react"

interface NodeData {
  label: string;
  descriptions: string;
  icon: string;
  isStartNode: boolean;
  stepNumber: number;
  isConfigured: boolean;
}
const CustomNode = ({ data, isConnectable }: NodeProps<NodeData>) => {
  const IconComponent = ICON_MAP[data.icon] || ArrowRightIcon;
  const isRunning = Boolean((data as any)?.isRunning);
  const hasError = Boolean((data as any)?.hasError)
  return (
    <div className={`bg-[#1E293B] p-4 rounded-md border shadow-md min-w-[180px] relative cursor-pointer` + (hasError ? "border-red-500 ring-2 ring-red-600" : isRunning ? "border-green-400 ring-2 ring-green-500 animated-pulse" : "border-[#1E293B] hover:border-green-400")}>
      {
        hasError && (
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-black">!</div>
        )
      }
    </div>
  )
}

export default CustomNode

export const nodeTypes = { custom: CustomNode }