import { Plus, ChevronDown, Send, Globe } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[150px] bg-[#111827] flex flex-col text-white min-h-0">
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
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10 gap-2 h-9 px-4 bg-white/10"
          >
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

      {/* Main */}
      <div className="flex flex-col flex-1 min-h-0">
        <header className="h-16 shrink-0 border-b flex items-center px-2">
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
        <div className="flex flex-col flex-1 min-h-0">
          {/* Chat Content (scrollable) */}
          <div className="flex-1 min-h-0 overflow-auto px-2 py-1 w-full">
            <h2 className="text-xl font-medium mb-1">Choose Your Assistant</h2>
            <div className="border rounded p-1 mb-2 flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center text-white">
                  <Plus className="h-4 w-4" />
                </div>
                <span>New Assistant</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="grid gap-2 w-full">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-medium">Assistants</h3>
                  <p className="text-sm text-gray-500">
                    Chat with AI Assistants that have the context of your business and are customized for specific
                    tasks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-medium">Workflows</h3>
                  <p className="text-sm text-gray-500">
                    Run AI Workflows to automate complex tasks across your tools and systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>K</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-medium">Knowledge Base</h3>
                  <p className="text-sm text-gray-500">
                    Connect company data to Assistants and Workflows to provide business context to AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Input Bar (always visible at bottom) */}
          <div className="shrink-0 p-1 border-t bg-white w-full">
            <div className="relative w-full">
              <div className="absolute bottom-full left-0 right-0 p-1 flex justify-center w-full">
                <div className="bg-gray-100 rounded p-1 flex items-center gap-2 text-xs text-gray-600 w-full">
                  <span>TIP</span>
                  <span>Use @ to reference information in the knowledge base. Use / for prompt library.</span>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <span>×</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded p-1 bg-white w-full">
                <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center text-white">
                  <Plus className="h-4 w-4" />
                </div>
                <span className="text-sm">New Assistant</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
                <div className="h-6 border-l mx-2"></div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <span className="text-sm">Workflows</span>
                </Button>
              </div>
              <div className="mt-1 border rounded p-1 flex items-center bg-white w-full">
                <Input
                  placeholder="Type your message here..."
                  className="border-0 shadow-none focus-visible:ring-0 flex-1"
                />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Globe className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 text-center w-full">
                Use @ to reference information in the knowledge base. Use / for prompt library.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
