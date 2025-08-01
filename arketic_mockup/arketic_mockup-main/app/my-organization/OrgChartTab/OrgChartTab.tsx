"use client"

import { useState } from "react"
import { TreeSidebar } from "./TreeSidebar"
import { Canvas } from "./Canvas"
import { NodeDrawer } from "./NodeDrawer"
import orgData from "../mock/org.json"

export interface OrgNode {
  id: string
  name: string
  type: "site" | "department" | "title" | "user"
  email?: string
  avatar?: string
  initials?: string
  role?: string
  children?: OrgNode[]
}

export function OrgChartTab() {
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleNodeClick = (node: OrgNode) => {
    setSelectedNode(node)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Left Tree Sidebar */}
      <div className="w-80 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <TreeSidebar 
          data={orgData} 
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <Canvas 
          data={orgData}
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Right Drawer */}
      <NodeDrawer
        node={selectedNode}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
} 