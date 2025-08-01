"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Grid3X3, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ComplianceDocument, ComplianceFilters, ViewMode } from "./types/compliance"
import { ComplianceSidebar } from "./components/ComplianceSidebar"
import { ComplianceCard } from "./components/ComplianceCard"
import { ComplianceTable } from "./components/ComplianceTable"
import { AddComplianceModal } from "./components/AddComplianceModal"
import complianceData from "./mock/compliance.json"

export function ComplianceLibraryTab() {
  const [documents] = useState<ComplianceDocument[]>(complianceData)
  const [filters, setFilters] = useState<ComplianceFilters>({})
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  // Filter documents based on current filters
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description.toLowerCase().includes(searchLower) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          doc.authority.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Authority filter
      if (filters.authority && filters.authority.length > 0) {
        if (!filters.authority.includes(doc.authority)) return false
      }

      // Country filter
      if (filters.country && filters.country.length > 0) {
        if (!filters.country.includes(doc.country)) return false
      }

      // Year filter
      if (filters.year && filters.year.length > 0) {
        const docYear = new Date(doc.issuedDate).getFullYear().toString()
        if (!filters.year.includes(docYear)) return false
      }

      // Language filter
      if (filters.language && filters.language.length > 0) {
        if (!filters.language.includes(doc.language)) return false
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(doc.status)) return false
      }

      return true
    })
  }, [documents, filters])

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const handleFiltersChange = (newFilters: ComplianceFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <ComplianceSidebar 
          filters={filters}
          onFiltersChange={handleFiltersChange}
          documents={documents}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compliance Library</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage standards, regulations, and compliance documents
              </p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search compliance documents..."
                value={filters.search || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Document
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredDocuments.length} of {documents.length} documents
                </p>
              </div>

              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocuments.map((doc) => (
                    <ComplianceCard 
                      key={doc.id} 
                      document={doc}
                      onView={() => console.log("View", doc.id)}
                      onEdit={() => console.log("Edit", doc.id)}
                      onDelete={() => console.log("Delete", doc.id)}
                    />
                  ))}
                </div>
              ) : (
                <ComplianceTable 
                  documents={filteredDocuments}
                  onView={(id: string) => console.log("View", id)}
                  onEdit={(id: string) => console.log("Edit", id)}
                  onDelete={(id: string) => console.log("Delete", id)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AddComplianceModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(data: any) => {
          console.log("Save document:", data)
          setShowAddModal(false)
        }}
      />
    </div>
  )
} 