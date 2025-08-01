"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  FileText,
  LayoutGrid,
  ChevronRight,
  Globe,
  Upload,
  RefreshCw,
  FolderPlus,
  MoreHorizontal,
  Send,
  Bot,
  Workflow,
  Database,
  Settings,
  User,
  Bell,
  Filter,
  SortDesc,
  Grid3X3,
  List,
  Star,
  Clock,
  Zap,
  Brain,
  Sparkles,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Users,
  MessageSquare,
  Calendar,
  Download,
  Moon,
  Sun,
  FolderOpen,
  Trash2,
  Shield,
  Cloud,
  AlertCircle,
  Mail,
  X,
  Check,
  ChevronDown,
  Building2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes"
import { DirectoryTree } from "@/components/directory-tree"
import { PeopleTab } from "./my-organization/PeopleTab"
import { OrgChartTab } from "./my-organization/OrgChartTab/OrgChartTab"
import { ServicesTab } from "./my-organization/ServicesTab/ServicesTab"
import { IsoTab } from "./my-organization/IsoTab/IsoTab"
import { DocumentsTab } from "./my-organization/IsoDocumentsTab/DocumentsTab"
import { ComplianceLibraryTab } from "./knowledge/ComplianceLibraryTab"

type Section = "assistants" | "chat" | "knowledge" | "compliance" | "services" | "workflows" | "templates" | "analytics" | "directory" | "groups" | "organization-settings" | "access-control"

// Analytics Data
const usageData = [
  { month: "Jan", chatMessages: 1200, workflows: 45, knowledge: 89, cost: 245 },
  { month: "Feb", chatMessages: 1890, workflows: 67, knowledge: 123, cost: 378 },
  { month: "Mar", chatMessages: 2340, workflows: 89, knowledge: 156, cost: 467 },
  { month: "Apr", chatMessages: 3200, workflows: 112, knowledge: 198, cost: 623 },
  { month: "May", chatMessages: 2890, workflows: 98, knowledge: 234, cost: 589 },
  { month: "Jun", chatMessages: 3890, workflows: 134, knowledge: 267, cost: 756 },
]

const modelPerformanceData = [
  { model: "ChatGPT 4o", usage: 45, satisfaction: 4.8, responseTime: 1.2 },
  { model: "Claude 3.5", usage: 32, satisfaction: 4.7, responseTime: 1.5 },
  { model: "Gemini Pro", usage: 23, satisfaction: 4.5, responseTime: 1.8 },
  { model: "Custom AI", usage: 15, satisfaction: 4.3, responseTime: 2.1 },
]

const dailyActivityData = [
  { time: "00:00", messages: 12, users: 3 },
  { time: "04:00", messages: 8, users: 2 },
  { time: "08:00", messages: 145, users: 23 },
  { time: "12:00", messages: 234, users: 45 },
  { time: "16:00", messages: 189, users: 38 },
  { time: "20:00", messages: 98, users: 18 },
]

const costBreakdownData = [
  { name: "AI Models", value: 1250, color: "#3b82f6" },
  { name: "Storage", value: 340, color: "#10b981" },
  { name: "Compute", value: 890, color: "#f59e0b" },
  { name: "Bandwidth", value: 230, color: "#ef4444" },
]

const assistants = [
  {
    id: 1,
    name: "ChatGPT 4o",
    provider: "Arketic",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    icon: Bot,
    description: "Advanced conversational AI with reasoning capabilities",
    status: "active",
    lastUsed: "2 hours ago",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: Brain,
    description: "Powerful AI assistant for complex reasoning tasks",
    status: "active",
    lastUsed: "1 day ago",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Gemini Pro",
    provider: "Google",
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
    icon: Sparkles,
    description: "Multimodal AI with advanced understanding",
    status: "active",
    lastUsed: "3 hours ago",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Data Analyst",
    provider: "Cassidy",
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
    icon: LayoutGrid,
    description: "Specialized assistant for data analysis and insights",
    status: "custom",
    lastUsed: "5 hours ago",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Content Writer",
    provider: "Custom",
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    icon: FileText,
    description: "Creative writing and content generation specialist",
    status: "custom",
    lastUsed: "1 week ago",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Code Assistant",
    provider: "Custom",
    color: "bg-gradient-to-br from-gray-700 to-gray-900",
    icon: Bot,
    description: "Programming and development helper",
    status: "custom",
    lastUsed: "2 days ago",
    rating: 4.8,
  },
]

const knowledgeItems = [
  {
    id: 1,
    name: "Company Handbook",
    type: "PDF",
    owner: "@mehmetoglu",
    size: "2.4 MB",
    pages: "156 pages",
    lastEdited: "2 hours ago",
    status: "synced",
  },
  {
    id: 2,
    name: "Product Documentation",
    type: "Website",
    owner: "@mehmetoglu",
    size: "15.2 MB",
    pages: "89 pages",
    lastEdited: "1 day ago",
    status: "syncing",
  },
  {
    id: 3,
    name: "Sales Playbook",
    type: "Document",
    owner: "@sarah.wilson",
    size: "5.1 MB",
    pages: "45 pages",
    lastEdited: "3 days ago",
    status: "synced",
  },
]

// Mock data for sites and departments
const sites = [
  { id: 1, name: "Main Office", location: "New York, NY" },
  { id: 2, name: "Branch Office", location: "San Francisco, CA" },
  { id: 3, name: "Remote Office", location: "Austin, TX" },
]

const departments = [
  { id: 1, name: "Engineering", site: "Main Office" },
  { id: 2, name: "Sales", site: "Main Office" },
  { id: 3, name: "Marketing", site: "Branch Office" },
  { id: 4, name: "Support", site: "Main Office" },
  { id: 5, name: "Sales", site: "Branch Office" },
  { id: 6, name: "Support", site: "Branch Office" },
  { id: 7, name: "Marketing", site: "Remote Office" },
]

const availableUsers = [
  { id: 1, name: "John Doe", email: "john.doe@company.com", department: "Engineering", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "JD" },
  { id: 2, name: "Jane Smith", email: "jane.smith@company.com", department: "Sales", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "JS" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@company.com", department: "Engineering", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "MJ" },
  { id: 4, name: "Emma Davis", email: "emma.davis@company.com", department: "Engineering", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "ED" },
  { id: 5, name: "David Kim", email: "david.kim@company.com", department: "Marketing", site: "Branch Office", avatar: "/placeholder-user.jpg", initials: "DK" },
  { id: 6, name: "Sarah Wilson", email: "sarah.wilson@company.com", department: "Sales", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "SW" },
  { id: 7, name: "Alex Chen", email: "alex.chen@company.com", department: "Engineering", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "AC" },
  { id: 8, name: "Lisa Brown", email: "lisa.brown@company.com", department: "Support", site: "Main Office", avatar: "/placeholder-user.jpg", initials: "LB" },
]

export default function ArketicClone() {
  const [activeSection, setActiveSection] = useState<Section>("analytics")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAssistant, setSelectedAssistant] = useState("ChatGPT 4o")
  const [chatMessage, setChatMessage] = useState("")
  const [selectedKnowledgeItems, setSelectedKnowledgeItems] = useState<number[]>([])
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [dateRange, setDateRange] = useState("7d")
  const { theme, setTheme } = useTheme()
  const [intensities, setIntensities] = useState<number[]>([])
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    groupType: "static" as "static" | "dynamic",
    selectedUsers: [] as number[],
    selectedSites: [] as number[],
    selectedDepartments: [] as number[]
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{
    name: string;
    type: 'static' | 'dynamic';
    members: Array<{
      name: string;
      department: string;
      site: string;
      avatar: string;
      initials: string;
    }>;
  } | null>(null);
  const [activeOrgTab, setActiveOrgTab] = useState("people")

  useEffect(() => {
    setIntensities(Array.from({ length: 168 }, () => Math.random()))
  }, [])

  const filteredAssistants = assistants.filter(
    (assistant) =>
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleKnowledgeItemSelect = (id: number) => {
    setSelectedKnowledgeItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleKnowledgeItemClick = (id: number) => {
    setSelectedKnowledgeItem(id)
  }

  const handleBackToKnowledgeList = () => {
    setSelectedKnowledgeItem(null)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log("Sending message:", chatMessage)
      setChatMessage("")
    }
  }

  const renderSidebar = () => (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col text-white border-r border-slate-700 dark:border-slate-800/50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
          C
        </div>
        <div>
          <span className="font-bold text-lg text-white">Arketic</span>
          <div className="text-xs text-slate-400 dark:text-slate-500">AI Platform</div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-11 px-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 dark:border-blue-400/30"
          onClick={() => setActiveSection("chat")}
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">New Chat</span>
        </Button>
      </div>

      <div className="flex-1 px-4 space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          AI Chat
        </div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "chat" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("chat")}
        >
          <Bot className="h-4 w-4" />
          <span>Chat</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "assistants" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("assistants")}
        >
          <Sparkles className="h-4 w-4" />
          <span>Assistants</span>
        </Button>

        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6">
          Analytics
        </div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "analytics" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("analytics")}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Dashboard</span>
        </Button>

        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6">
          Automation
        </div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "workflows" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("workflows")}
        >
          <Workflow className="h-4 w-4" />
          <span>Workflows</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "templates" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("templates")}
        >
          <FileText className="h-4 w-4" />
          <span>Templates</span>
        </Button>

        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6">
          Business Context
        </div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "knowledge" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("knowledge")}
        >
          <Database className="h-4 w-4" />
          <span>Knowledge Base</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "compliance" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("compliance")}
        >
          <Shield className="h-4 w-4" />
          <span>Compliance Library</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "services" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("services")}
        >
          <LayoutGrid className="h-4 w-4" />
          <span>Service Catalog</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>

        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6">
          My Organization
        </div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "directory" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("directory")}
        >
          <Building2 className="h-4 w-4" />
          <span>My Organization</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "groups" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("groups")}
        >
          <FolderOpen className="h-4 w-4" />
          <span>Groups</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "organization-settings" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("organization-settings")}
        >
          <Settings className="h-4 w-4" />
          <span>Organization Settings</span>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white hover:bg-white/10 dark:hover:bg-white/5 gap-3 h-10 px-3 rounded-lg transition-all ${
            activeSection === "access-control" ? "bg-white/10 dark:bg-white/5 text-blue-300 dark:text-blue-400" : ""
          }`}
          onClick={() => setActiveSection("access-control")}
        >
          <Shield className="h-4 w-4" />
          <span>Access Control</span>
        </Button>
      </div>

      <div className="p-4 border-t border-slate-700 dark:border-slate-800/50">
        <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 dark:border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className="text-xs border-yellow-500/50 text-yellow-400 dark:border-yellow-400/50 dark:text-yellow-300"
              >
                Free Plan
              </Badge>
              <span className="text-xs text-slate-400 dark:text-slate-500">10 days left</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 dark:text-slate-500">Credits Used</span>
                  <span className="text-slate-300 dark:text-slate-400">210.5K / 250K</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 dark:text-slate-500">Knowledge Base</span>
                  <span className="text-slate-300 dark:text-slate-400">136MB / 500MB</span>
                </div>
                <Progress value={27} className="h-2" />
              </div>
            </div>

            <Button
              size="sm"
              className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderHeader = () => (
    <header className="border-b bg-white/80 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6 h-16 sticky top-0 z-10 dark:border-slate-800/50">
      <div className="flex items-center gap-4">
        <Badge
          variant="secondary"
          className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
        >
          <Zap className="h-3 w-3 mr-1" />
          Transform your work with enterprise AI solutions
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 dark:text-slate-400">Speak with our sales team and AI experts</span>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
        >
          Talk to sales
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@mehmetoglu" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    MO
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">mehmetoglu</p>
                  <p className="text-xs leading-none text-muted-foreground">mehmet@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )

  const renderAnalytics = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor your AI usage, performance, and costs</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Messages</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">24,567</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Users</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">1,234</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+8.2%</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-600 dark:bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Monthly Cost</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">$2,456</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
                    <span className="text-sm text-red-600 dark:text-red-400">-3.1%</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-orange-600 dark:bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Response Time</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">1.4s</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">-0.2s</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-600 dark:bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="usage" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Monthly Usage Trends
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Chat messages, workflows, and knowledge base usage over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      chatMessages: {
                        label: "Chat Messages",
                        color: "hsl(var(--chart-1))",
                      },
                      workflows: {
                        label: "Workflows",
                        color: "hsl(var(--chart-2))",
                      },
                      knowledge: {
                        label: "Knowledge Queries",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="chatMessages"
                          stackId="1"
                          stroke="var(--color-chatMessages)"
                          fill="var(--color-chatMessages)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="workflows"
                          stackId="1"
                          stroke="var(--color-workflows)"
                          fill="var(--color-workflows)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="knowledge"
                          stackId="1"
                          stroke="var(--color-knowledge)"
                          fill="var(--color-knowledge)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Daily Activity Pattern
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    User activity and message volume throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      messages: {
                        label: "Messages",
                        color: "hsl(var(--chart-1))",
                      },
                      users: {
                        label: "Active Users",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="messages"
                          stroke="var(--color-messages)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-messages)", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="var(--color-users)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-users)", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    AI Model Performance
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Usage distribution and satisfaction ratings by AI model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      usage: {
                        label: "Usage %",
                        color: "hsl(var(--chart-1))",
                      },
                      satisfaction: {
                        label: "Satisfaction",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={modelPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="model" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Response Time Analysis
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Average response times across different AI models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modelPerformanceData.map((model, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-medium">
                            {model.model.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{model.model}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Satisfaction: {model.satisfaction}/5.0
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{model.responseTime}s</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">avg response</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Monthly Cost Trends
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Track your AI platform costs over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      cost: {
                        label: "Cost ($)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="cost"
                          stroke="var(--color-cost)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-cost)", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <LayoutGrid className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Cost Breakdown
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Distribution of costs across different services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Cost",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costBreakdownData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Cost Summary</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Detailed breakdown of your monthly expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {costBreakdownData.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{item.name}</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${item.value}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {((item.value / costBreakdownData.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}% of
                        total
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    User Activity Heatmap
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Most active hours and user engagement patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {intensities.map((intensity, i) => (
                      <div
                        key={i}
                        className="h-4 rounded-sm"
                        style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
                        title={`Hour ${i % 24}, Day ${Math.floor(i / 24) + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>Less active</span>
                    <div className="flex gap-1">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity) => (
                        <div
                          key={opacity}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: `rgba(59, 130, 246, ${opacity})` }}
                        />
                      ))}
                    </div>
                    <span>More active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  const renderAssistants = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Assistants</h1>
            <p className="text-slate-600 mt-1">Choose from powerful AI models or create custom assistants</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search assistants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-white border-slate-200"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Used</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg bg-white">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              New Assistant
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Assistants</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredAssistants.map((assistant) => {
            const IconComponent = assistant.icon
            return (
              <Card
                key={assistant.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-slate-200 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-12 w-12 ${assistant.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-900">{assistant.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {assistant.provider}
                          </Badge>
                          <Badge variant={assistant.status === "active" ? "default" : "secondary"} className="text-xs">
                            {assistant.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-slate-600 mb-4 line-clamp-2">
                    {assistant.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{assistant.lastUsed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-slate-600 font-medium">{assistant.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Start Chat
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="flex-1 flex flex-col bg-slate-50/50">
      <div className="p-4 border-b bg-white/80 backdrop-blur-sm flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          History
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">June 13, 2025 - Untitled</span>
          <Button variant="ghost" size="sm">
            Editor
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <Bot className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your AI Assistant</h2>
            <p className="text-slate-600">Select an assistant or explore our powerful features</p>
          </div>

          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                <SelectTrigger className="w-full h-12">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {assistants.map((assistant) => (
                    <SelectItem key={assistant.id} value={assistant.name}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-6 w-6 ${assistant.color} rounded-md flex items-center justify-center text-white`}
                        >
                          <assistant.icon className="h-3 w-3" />
                        </div>
                        {assistant.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid gap-6 mb-8">
            <Card
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300"
              onClick={() => setActiveSection("assistants")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 mb-2">AI Assistants</h3>
                    <p className="text-slate-600 text-sm">
                      Chat with AI Assistants that have the context of your business and are customized for specific
                      tasks.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300"
              onClick={() => setActiveSection("workflows")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <Workflow className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 mb-2">Workflows</h3>
                    <p className="text-slate-600 text-sm">
                      Run AI Workflows to automate complex tasks across your tools and systems.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 transition-colors ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300"
              onClick={() => setActiveSection("knowledge")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 mb-2">Knowledge Base</h3>
                    <p className="text-slate-600 text-sm">
                      Connect company data to Assistants and Workflows to provide business context to AI.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-orange-600 transition-colors ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="p-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-4 bg-white border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <span className="font-medium text-slate-900">{selectedAssistant}</span>
                <Badge variant="outline" className="ml-auto">
                  Ready
                </Badge>
              </div>
              <Separator className="mb-3" />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveSection("workflows")}>
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflows
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActiveSection("knowledge")}>
                  <Database className="h-4 w-4 mr-2" />
                  Knowledge
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message here..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="min-h-[60px] resize-none bg-white border-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                <Globe className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="h-10 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500 text-center">
            Use <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">@</kbd> to reference knowledge base •
            Use <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">/</kbd> for prompt library
          </div>
        </div>
      </div>
    </div>
  )

  const renderKnowledge = () => {
    // If a knowledge item is selected, show the detail view
    if (selectedKnowledgeItem) {
      const selectedItem = knowledgeItems.find(item => item.id === selectedKnowledgeItem)
      if (!selectedItem) return null

      return (
        <div className="flex-1 flex flex-col bg-slate-50/50">
          <div className="p-6 border-b bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToKnowledgeList}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedItem.name}</h2>
                <p className="text-slate-600 text-sm">Knowledge Item Details</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {selectedItem.type}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      <Database className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{selectedItem.name}</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Manage and organize content within this knowledge item. Upload files, sync directories, or create new folders to structure your information.
                      </p>
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Knowledge
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Files
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Directories
                        </Button>
                        <Button variant="outline" size="sm">
                          <FolderPlus className="h-4 w-4 mr-2" />
                          New Folder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Content Items</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <SortDesc className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-b bg-slate-50 p-4">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-600">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-2">Last Modified</div>
                    </div>
                  </div>

                  <div className="p-4 text-center text-slate-500">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No content yet</h3>
                    <p className="text-slate-600 mb-4 max-w-md mx-auto">
                      Start by uploading files, syncing directories, or creating new folders to organize your knowledge.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Directories
                      </Button>
                      <Button variant="outline" size="sm">
                        <FolderPlus className="h-4 w-4 mr-2" />
                        New Folder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    }

    // Default knowledge list view
    return (
      <div className="flex-1 flex flex-col bg-slate-50/50">
        <div className="p-6 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Knowledge Base</h2>
              <p className="text-slate-600 text-sm">Organize and connect your company's information to AI</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              General Knowledge
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">General Knowledge</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Organize your company's essential information and connect it to your AI assistants for seamless
                      access in chats.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Knowledge
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Integrations
                      </Button>
                      <Button variant="outline" size="sm">
                        <FolderPlus className="h-4 w-4 mr-2" />
                        New Folder
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Knowledge Items</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <SortDesc className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-600">
                    <div className="col-span-1">
                      <Checkbox
                        checked={selectedKnowledgeItems.length === knowledgeItems.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedKnowledgeItems(knowledgeItems.map((item) => item.id))
                          } else {
                            setSelectedKnowledgeItems([])
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Owner</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Last Modified</div>
                  </div>
                </div>

                {knowledgeItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${index !== knowledgeItems.length - 1 ? "border-b" : ""}`}
                    onClick={() => handleKnowledgeItemClick(item.id)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center text-sm">
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedKnowledgeItems.includes(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => handleKnowledgeItemSelect(item.id)}
                        />
                      </div>
                      <div className="col-span-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-medium">
                            {item.type === "PDF" ? "PDF" : item.type === "Website" ? "WEB" : "DOC"}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{item.name}</div>
                            <div className="text-xs text-slate-500">{item.pages}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {item.owner.replace("@", "").substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-slate-600">{item.owner}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-slate-600">{item.size}</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={item.status === "synced" ? "default" : "secondary"} className="text-xs">
                            {item.status}
                          </Badge>
                          <span className="text-slate-500 text-xs">{item.lastEdited}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>
                Showing {knowledgeItems.length} of {knowledgeItems.length} items
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <span>Page 1 of 1</span>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderWorkflows = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
            <p className="text-slate-600 mt-1">Automate complex tasks across your tools and systems</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
              <Workflow className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No workflows yet</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Create your first workflow to automate repetitive tasks and streamline your processes.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTemplates = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Templates</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Pre-built workflows and automation templates</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Customer Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Automated responses</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Handle customer inquiries with AI-powered responses and escalation workflows.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Data Analysis</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Report generation</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Automate data collection, analysis, and report generation for business insights.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  New
                </Badge>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Lead Qualification</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sales automation</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Automate lead scoring and qualification with AI-powered conversation analysis.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Featured
                </Badge>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderDirectory = () => {
    return (
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              My Organization
            </h1>
            
            {/* Metric Ribbon */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span className="text-slate-600 dark:text-slate-400">Sites</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-slate-600 dark:text-slate-400">Departments</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-slate-600 dark:text-slate-400">Users</span>
                <Badge variant="secondary">64</Badge>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-slate-600 dark:text-slate-400">ISO Gaps</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
          </div>

          {/* Secondary Tabs */}
          <Tabs value={activeOrgTab} onValueChange={setActiveOrgTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
              <TabsTrigger value="iso">ISO Compliance</TabsTrigger>
              <TabsTrigger value="documents">ISO Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="mt-0">
              <PeopleTab />
            </TabsContent>

            <TabsContent value="org-chart" className="mt-0">
              <OrgChartTab />
            </TabsContent>

            <TabsContent value="iso" className="mt-0">
              <IsoTab />
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <DocumentsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  const renderGroups = () => {
    const handleUsersClick = (groupName: string, type: 'static' | 'dynamic') => {
      // Mock data for group members
      const mockMembers = {
        'Administrators': [
          { name: 'John Doe', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'JD' },
          { name: 'Jane Smith', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'JS' },
          { name: 'Mike Johnson', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'MJ' }
        ],
        'All Engineering': [
          { name: 'John Doe', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'JD' },
          { name: 'Mike Johnson', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'MJ' },
          { name: 'Emma Davis', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'ED' },
          { name: 'David Kim', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'DK' },
          { name: 'Sarah Wilson', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'SW' },
          { name: 'Alex Chen', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'AC' },
          { name: 'Lisa Brown', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'LB' },
          { name: 'Tom Wilson', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'TW' },
          { name: 'Rachel Green', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'RG' },
          { name: 'Chris Lee', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'CL' },
          { name: 'Maria Garcia', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'MG' },
          { name: 'James Taylor', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'JT' }
        ],
        'All Sales': [
          { name: 'Jane Smith', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'JS' },
          { name: 'Bob Johnson', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'BJ' },
          { name: 'Alice Brown', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'AB' },
          { name: 'Charlie Davis', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'CD' },
          { name: 'Diana Evans', department: 'Sales', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'DE' },
          { name: 'Frank Miller', department: 'Sales', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'FM' },
          { name: 'Grace Wilson', department: 'Sales', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'GW' },
          { name: 'Henry Adams', department: 'Sales', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'HA' }
        ],
        'Project Alpha Team': [
          { name: 'Emma Davis', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'ED' },
          { name: 'Sarah Wilson', department: 'Sales', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'SW' },
          { name: 'David Kim', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'DK' },
          { name: 'Alex Chen', department: 'Engineering', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'AC' },
          { name: 'Lisa Brown', department: 'Support', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'LB' },
          { name: 'Tom Wilson', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'TW' }
        ],
        'All Support': [
          { name: 'Lisa Brown', department: 'Support', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'LB' },
          { name: 'Rachel Green', department: 'Support', site: 'Main Office', avatar: '/placeholder-user.jpg', initials: 'RG' },
          { name: 'Chris Lee', department: 'Support', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'CL' },
          { name: 'Maria Garcia', department: 'Support', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'MG' }
        ],
        'All Marketing': [
          { name: 'David Kim', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'DK' },
          { name: 'Tom Wilson', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'TW' },
          { name: 'Diana Evans', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'DE' },
          { name: 'Frank Miller', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'FM' },
          { name: 'Grace Wilson', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'GW' },
          { name: 'Henry Adams', department: 'Marketing', site: 'Branch Office', avatar: '/placeholder-user.jpg', initials: 'HA' }
        ]
      };

      setSelectedGroup({
        name: groupName,
        type: type,
        members: mockMembers[groupName as keyof typeof mockMembers] || []
      });
      setIsUsersModalOpen(true);
    };

    return (
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Groups</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Manage user groups and their organizational relationships</p>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              onClick={() => setShowCreateGroupModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>

          {/* Groups with Relationships */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Static Group - Administrators */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Administrators
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    Static
                  </Badge>
                </div>
                <CardDescription>Full system access and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleUsersClick('Administrators', 'static')}
                  >
                    3 users
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Group - All Engineering */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-600" />
                    All Engineering
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Dynamic
                  </Badge>
                </div>
                <CardDescription>All engineering team members across sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => handleUsersClick('All Engineering', 'dynamic')}
                    >
                      12 users
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Included Departments:</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                        <Users className="h-2 w-2 text-purple-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Main Office • Engineering (12 users)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Group - All Sales */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    All Sales
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Dynamic
                  </Badge>
                </div>
                <CardDescription>All sales team members across sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => handleUsersClick('All Sales', 'dynamic')}
                    >
                      8 users
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Included Departments:</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                        <BarChart3 className="h-2 w-2 text-orange-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Main Office • Sales (4 users)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                        <BarChart3 className="h-2 w-2 text-orange-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Branch Office • Sales (4 users)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Static Group - Project Alpha Team */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Project Alpha Team
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    Static
                  </Badge>
                </div>
                <CardDescription>Cross-functional project team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                  <Badge 
                    variant="secondary"
                    className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleUsersClick('Project Alpha Team', 'static')}
                  >
                    6 users
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Group - All Support */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-green-600" />
                    All Support
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Dynamic
                  </Badge>
                </div>
                <CardDescription>All support team members across sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => handleUsersClick('All Support', 'dynamic')}
                    >
                      4 users
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Included Departments:</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <MessageSquare className="h-2 w-2 text-green-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Main Office • Support (2 users)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <MessageSquare className="h-2 w-2 text-green-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Branch Office • Support (2 users)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Group - All Marketing */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-pink-600" />
                    All Marketing
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Dynamic
                  </Badge>
                </div>
                <CardDescription>All marketing team members across sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => handleUsersClick('All Marketing', 'dynamic')}
                    >
                      6 users
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Included Departments:</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                        <MessageSquare className="h-2 w-2 text-pink-600" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Branch Office • Marketing (6 users)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Modal */}
          {isUsersModalOpen && selectedGroup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {selectedGroup.name} Members
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {selectedGroup.members.length} members • {selectedGroup.type === 'static' ? 'Static Group' : 'Dynamic Group'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUsersModalOpen(false)}
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="space-y-3">
                    {selectedGroup.members.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-slate-100">{member.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{member.department} • {member.site}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {selectedGroup.type === 'static' ? 'Manual' : 'Auto'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOrganizationSettings = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Organization Settings</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your organization's configuration and preferences</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Settings className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2 px-4 py-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="user-management" className="flex items-center gap-2 px-4 py-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="directory-sync" className="flex items-center gap-2 px-4 py-2">
              <RefreshCw className="h-4 w-4" />
              Directory Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  General Information
                </CardTitle>
                <CardDescription>Basic organization details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Organization Name
                    </label>
                    <Input 
                      placeholder="Enter organization name" 
                      defaultValue="Acme Corporation"
                      className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Industry
                    </label>
                    <Select defaultValue="technology">
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Website
                    </label>
                    <Input 
                      placeholder="https://example.com" 
                      defaultValue="https://acme.com"
                      className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Time Zone
                    </label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">UTC</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Enter organization description" 
                    defaultValue="Leading technology company focused on AI and automation solutions."
                    className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-management" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  User Management
                </CardTitle>
                <CardDescription>Configure user registration and access policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Allow User Registration</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Users can sign up without invitation</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Require Email Verification</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Users must verify their email address</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Require 2FA for all users</p>
                  </div>
                  <Checkbox />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Session Timeout</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="8">
                    <SelectTrigger className="w-32 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>Data protection and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Data Encryption</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Encrypt all data at rest and in transit</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Audit Logging</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Track all user activities and changes</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">GDPR Compliance</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">EU data protection compliance</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Data Retention</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Automatically delete old data</p>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-32 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="directory-sync" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  Directory Synchronization
                </CardTitle>
                <CardDescription>Sync your organization structure from external directory services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Active Directory Integration */}
                <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Active Directory</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Microsoft Active Directory integration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sites</span>
                        <Badge variant="outline" className="text-xs">2</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Main Office, Branch Office
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Departments</span>
                        <Badge variant="outline" className="text-xs">5</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Engineering, Sales, Marketing, Support
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Users</span>
                        <Badge variant="outline" className="text-xs">30</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Last sync: 2 minutes ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Auto-sync enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Every 15 minutes</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                </div>

                {/* Azure Active Directory Integration */}
                <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                        <Cloud className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Azure Active Directory</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Microsoft Azure AD integration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
                        Pending
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sites</span>
                        <Badge variant="outline" className="text-xs">0</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Not configured
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Departments</span>
                        <Badge variant="outline" className="text-xs">0</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Not configured
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Users</span>
                        <Badge variant="outline" className="text-xs">0</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Not synced
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Auto-sync disabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600 dark:text-yellow-400">Configuration required</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                </div>

                {/* Google Workspace Integration */}
                <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Google Workspace</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Google Workspace integration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sites</span>
                        <Badge variant="outline" className="text-xs">1</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Main Office
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Departments</span>
                        <Badge variant="outline" className="text-xs">3</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Engineering, Sales, Marketing
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Users</span>
                        <Badge variant="outline" className="text-xs">18</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Last sync: 5 minutes ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Auto-sync enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Every 30 minutes</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                </div>

                {/* Sync Configuration */}
                <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                  <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Global Sync Settings</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                        Default Sync Interval
                      </label>
                      <Select defaultValue="15">
                        <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="manual">Manual only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                        Conflict Resolution
                      </label>
                      <Select defaultValue="local">
                        <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local wins</SelectItem>
                          <SelectItem value="remote">Remote wins</SelectItem>
                          <SelectItem value="manual">Manual resolution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="font-medium text-slate-900 dark:text-slate-100">Sync Notifications</h6>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about sync status and conflicts</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  const renderAccessControl = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Access Control</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage user roles, permissions, and access policies</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
            <Button variant="outline" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Permissions
            </Button>
          </div>
        </div>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Roles Management */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Roles & Permissions
                    </CardTitle>
                    <CardDescription>Define roles and their associated permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Admin Role */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Administrator</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Full system access and management</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
                          3 users
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Badge variant="outline" className="text-xs">All Permissions</Badge>
                        <Badge variant="outline" className="text-xs">User Management</Badge>
                        <Badge variant="outline" className="text-xs">System Settings</Badge>
                        <Badge variant="outline" className="text-xs">Data Access</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Users
                        </Button>
                      </div>
                    </div>

                    {/* Manager Role */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                            <Users className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Manager</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Team and project management</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                          8 users
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Badge variant="outline" className="text-xs">Team Management</Badge>
                        <Badge variant="outline" className="text-xs">Project Access</Badge>
                        <Badge variant="outline" className="text-xs">Reports</Badge>
                        <Badge variant="outline" className="text-xs">Limited Settings</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Users
                        </Button>
                      </div>
                    </div>

                    {/* User Role */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <User className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">User</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Standard user access</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                          19 users
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Badge variant="outline" className="text-xs">Basic Access</Badge>
                        <Badge variant="outline" className="text-xs">Chat</Badge>
                        <Badge variant="outline" className="text-xs">Knowledge</Badge>
                        <Badge variant="outline" className="text-xs">Personal Settings</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Users
                        </Button>
                      </div>
                    </div>

                    {/* Guest Role */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Guest</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Limited read-only access</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300">
                          5 users
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Badge variant="outline" className="text-xs">Read Only</Badge>
                        <Badge variant="outline" className="text-xs">Public Content</Badge>
                        <Badge variant="outline" className="text-xs">No Edit</Badge>
                        <Badge variant="outline" className="text-xs">Limited Access</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Users
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Role Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Roles</span>
                      <Badge variant="secondary">4</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Active Roles</span>
                      <Badge variant="secondary">4</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Custom Roles</span>
                      <Badge variant="secondary">0</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                      <span className="text-sm text-slate-900 dark:text-slate-100">2 hours ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Role
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Permissions
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync with Directory
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">New Guest role created</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">1 day ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">Manager permissions updated</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">3 days ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">Administrator role modified</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">1 week ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Users Management */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      User Management
                    </CardTitle>
                    <CardDescription>Manage user accounts and role assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">John Doe</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">john.doe@company.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
                            Administrator
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Sarah Wilson" />
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
                              SW
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Sarah Wilson</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">sarah.wilson@company.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                            Manager
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Mike Johnson" />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                              MJ
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Mike Johnson</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">mike.johnson@company.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                            User
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Emily Davis" />
                            <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                              ED
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Emily Davis</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">emily.davis@company.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300">
                            Guest
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="David Brown" />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                              DB
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">David Brown</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">david.brown@company.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                            Manager
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Invites */}
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-yellow-600" />
                      Pending Invites
                    </CardTitle>
                    <CardDescription>Users who have been invited but haven't joined yet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">alex.smith@company.com</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Invited as User • 2 days ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Resend
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">lisa.wang@company.com</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Invited as Guest • 1 day ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Resend
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      User Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Users</span>
                      <Badge variant="secondary">35</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Active Users</span>
                      <Badge variant="secondary">32</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Pending Invites</span>
                      <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
                        3
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                      <span className="text-sm text-slate-900 dark:text-slate-100">2 hours ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Invite User
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Import
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Directory
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">Sarah Wilson promoted to Manager</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">2 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">5 users invited to platform</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">2 days ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-100">Mike Johnson role changed to User</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">3 days ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <ServicesTab />
      </div>
    </div>
  )

  const renderCompliance = () => (
    <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <ComplianceLibraryTab />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "analytics":
        return renderAnalytics()
      case "assistants":
        return renderAssistants()
      case "chat":
        return renderChat()
      case "knowledge":
        return renderKnowledge()
      case "compliance":
        return renderCompliance()
      case "services":
        return renderServices()
      case "workflows":
        return renderWorkflows()
      case "templates":
        return renderTemplates()
      case "directory":
        return renderDirectory()
      case "groups":
        return renderGroups()
      case "organization-settings":
        return renderOrganizationSettings()
      case "access-control":
        return renderAccessControl()
      default:
        return renderAnalytics()
    }
  }

  // Handlers for Create Group modal
  const handleCreateGroup = () => {
    console.log("Creating group:", newGroupData);
    // Here you would typically make an API call to create the group
    setShowCreateGroupModal(false);
    setNewGroupData({
      name: "",
      description: "",
      groupType: "static",
      selectedUsers: [],
      selectedSites: [],
      selectedDepartments: []
    });
  };

  const handleUserToggle = (userId: number) => {
    setNewGroupData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }));
  };

  const handleSiteToggle = (siteId: number) => {
    setNewGroupData(prev => ({
      ...prev,
      selectedSites: prev.selectedSites.includes(siteId)
        ? prev.selectedSites.filter(id => id !== siteId)
        : [...prev.selectedSites, siteId]
    }));
  };

  const handleDepartmentToggle = (deptId: number) => {
    setNewGroupData(prev => ({
      ...prev,
      selectedDepartments: prev.selectedDepartments.includes(deptId)
        ? prev.selectedDepartments.filter(id => id !== deptId)
        : [...prev.selectedDepartments, deptId]
    }));
  };

  const resetCreateGroupForm = () => {
    setNewGroupData({
      name: "",
      description: "",
      groupType: "static",
      selectedUsers: [],
      selectedSites: [],
      selectedDepartments: []
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {renderSidebar()}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderHeader()}
        {renderContent()}
        
        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Create New Group
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Choose between static and dynamic group types
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCreateGroupModal(false);
                    resetCreateGroupForm();
                  }}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Group Type Selection - Moved to top */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Group Type *
                    </label>
                    <RadioGroup 
                      value={newGroupData.groupType} 
                      onValueChange={(value: "static" | "dynamic") => 
                        setNewGroupData(prev => ({ ...prev, groupType: value }))
                      }
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                        <RadioGroupItem value="static" id="static" />
                        <label htmlFor="static" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Static Group</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Manually add individual users</p>
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                        <RadioGroupItem value="dynamic" id="dynamic" />
                        <label htmlFor="dynamic" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                              <Bot className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Dynamic Group</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Auto-update based on sites/departments</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                        Group Name *
                      </label>
                      <Input 
                        placeholder="Enter group name" 
                        value={newGroupData.name}
                        onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                        Description
                      </label>
                      <Textarea 
                        placeholder="Enter group description" 
                        value={newGroupData.description}
                        onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Static Group - User Selection */}
                  {newGroupData.groupType === "static" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Select Users
                        </label>
                        <Badge variant="secondary">
                          {newGroupData.selectedUsers.length} selected
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                        {availableUsers.map((user) => (
                          <div
                            key={user.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              newGroupData.selectedUsers.includes(user.id)
                                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
                                : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                            }`}
                            onClick={() => handleUserToggle(user.id)}
                          >
                            <Checkbox
                              checked={newGroupData.selectedUsers.includes(user.id)}
                              onCheckedChange={() => handleUserToggle(user.id)}
                            />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user.email}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-500">{user.department} • {user.site}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Group - Directory Style Selection */}
                  {newGroupData.groupType === "dynamic" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Select Sites and Departments
                        </label>
                        <Badge variant="secondary">
                          {newGroupData.selectedSites.length + newGroupData.selectedDepartments.length} selected
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {/* Main Office */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Main Office</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">New York, NY • 3 departments • 18 users</p>
                              </div>
                            </div>
                            <Checkbox
                              checked={newGroupData.selectedSites.includes(1)}
                              onCheckedChange={() => handleSiteToggle(1)}
                            />
                          </div>
                          
                          <div className="border-t border-slate-200 dark:border-slate-700">
                            {/* Engineering Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <Users className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Engineering</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">12 users • Development and technical operations</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(1)}
                                  onCheckedChange={() => handleDepartmentToggle(1)}
                                />
                              </div>
                            </div>

                            {/* Sales Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                                    <BarChart3 className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Sales</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">4 users • Sales and customer management</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(2)}
                                  onCheckedChange={() => handleDepartmentToggle(2)}
                                />
                              </div>
                            </div>

                            {/* Support Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                                    <MessageSquare className="h-3 w-3 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Support</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">2 users • Customer support and assistance</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(4)}
                                  onCheckedChange={() => handleDepartmentToggle(4)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Branch Office */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Branch Office</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">San Francisco, CA • 2 departments • 12 users</p>
                              </div>
                            </div>
                            <Checkbox
                              checked={newGroupData.selectedSites.includes(2)}
                              onCheckedChange={() => handleSiteToggle(2)}
                            />
                          </div>
                          
                          <div className="border-t border-slate-200 dark:border-slate-700">
                            {/* Marketing Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                                    <MessageSquare className="h-3 w-3 text-pink-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Marketing</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">6 users • Marketing and communications</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(3)}
                                  onCheckedChange={() => handleDepartmentToggle(3)}
                                />
                              </div>
                            </div>

                            {/* Sales Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                                    <BarChart3 className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Sales</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">4 users • Sales and customer management</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(5)}
                                  onCheckedChange={() => handleDepartmentToggle(5)}
                                />
                              </div>
                            </div>

                            {/* Support Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                                    <MessageSquare className="h-3 w-3 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Support</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">2 users • Customer support and assistance</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(6)}
                                  onCheckedChange={() => handleDepartmentToggle(6)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Remote Office */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Remote Office</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Austin, TX • 1 department • 6 users</p>
                              </div>
                            </div>
                            <Checkbox
                              checked={newGroupData.selectedSites.includes(3)}
                              onCheckedChange={() => handleSiteToggle(3)}
                            />
                          </div>
                          
                          <div className="border-t border-slate-200 dark:border-slate-700">
                            {/* Marketing Department */}
                            <div className="ml-6">
                              <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                                    <MessageSquare className="h-3 w-3 text-pink-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Marketing</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">6 users • Marketing and communications</p>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={newGroupData.selectedDepartments.includes(7)}
                                  onCheckedChange={() => handleDepartmentToggle(7)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateGroupModal(false);
                    resetCreateGroupForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!newGroupData.name.trim() || 
                    (newGroupData.groupType === "static" && newGroupData.selectedUsers.length === 0) ||
                    (newGroupData.groupType === "dynamic" && newGroupData.selectedSites.length === 0 && newGroupData.selectedDepartments.length === 0)
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Create Group
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
