"use client"

import { useState } from "react"
import { Plus, Upload, RefreshCw, FolderPlus, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function KnowledgePage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[150px] bg-[#111827] flex flex-col text-white">
        <div className="p-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="font-semibold">Arketic</span>
        </div>

        <div className="mt-4 px-2">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2 h-9 px-3">
            <Plus className="h-4 w-4" />
            <span className="text-xs">New Chat</span>
          </Button>
        </div>

        <div className="mt-4">
          <div className="px-4 py-2 text-xs text-gray-400">AI Chat</div>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2 h-9 px-4">
            <span className="text-xs">All Chat</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2 h-9 px-4">
            <span className="text-xs">All Chats</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2 h-9 px-4">
            <span className="text-xs">Assistants</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b flex items-center justify-between px-4 h-16">
          <div className="text-sm text-blue-600 font-medium">Transform your work with enterprise AI solutions</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Speak with our sales team and AI experts</span>
            <div className="flex items-center gap-1 ml-4">
              <span className="text-sm text-blue-600">Talk to sales</span>
              <div className="flex -space-x-2">
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Knowledge Base Content */}
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
              <span>General Knowledge</span>
            </Button>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-lg font-medium">General Knowledge</h2>
              <span className="text-sm text-gray-500">@mehmetoglu</span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Organize your company's essential information and connect it to your AI assistants for seamless access in
              chats.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Sync from Integrations
              </Button>
              <Button variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 mr-1" />
                New Folder
              </Button>
            </div>

            <div className="mt-6">
              <div className="border rounded-md">
                <div className="grid grid-cols-12 p-3 border-b bg-gray-50 text-sm font-medium">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3">Owner</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-1">Last edited</div>
                </div>

                <div className="grid grid-cols-12 p-3 border-b hover:bg-gray-50 text-sm items-center">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-5 flex items-center">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    dynetics.com
                  </div>
                  <div className="col-span-3 text-gray-500">@mehmetoglu</div>
                  <div className="col-span-2 text-gray-500">0 pages</div>
                  <div className="col-span-1 text-gray-500 flex items-center justify-between">
                    <span>9 hours ago</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-3 hover:bg-gray-50 text-sm items-center">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-5 flex items-center">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarFallback>W</AvatarFallback>
                    </Avatar>
                    wotech.com.tr
                  </div>
                  <div className="col-span-3 text-gray-500">@mehmetoglu</div>
                  <div className="col-span-2 text-gray-500">57 pages</div>
                  <div className="col-span-1 text-gray-500 flex items-center justify-between">
                    <span>2 days ago</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>Showing 2 of 2 items</span>
                <div className="flex items-center gap-2">
                  <span>1 of 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
