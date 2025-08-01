"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClauseExplorer } from "./ClauseExplorer"
import { Clause } from "./types/iso"

interface ComplianceDashboardProps {
  clauses: Clause[]
  selectedClause: Clause | null
  onClauseSelect: (clause: Clause) => void
  highlightedClauseId?: string | null
}

export function ComplianceDashboard({ clauses, selectedClause, onClauseSelect, highlightedClauseId }: ComplianceDashboardProps) {
  /** NEW **/ // Prepare pie chart data for selected clause
  const getPieChartData = (clause: Clause) => {
    const compliantCount = Object.values(clause.departments).filter(status => status === "compliant").length
    const gapCount = Object.values(clause.departments).filter(status => status === "gap").length
    
    return [
      { name: "Compliant", value: compliantCount, color: "#10b981" },
      { name: "Gap", value: gapCount, color: "#ef4444" }
    ]
  }

  /** NEW **/ // Get status badge color
  const getStatusBadgeColor = (status: "compliant" | "gap") => {
    return status === "compliant"
      ? "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      : "text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
  }

  return (
    <div className="flex gap-6">
      {/* Left: Clause Explorer */}
      <ClauseExplorer
        clauses={clauses}
        selectedClauseId={selectedClause?.id || null}
        onClauseSelect={onClauseSelect}
        highlightedClauseId={highlightedClauseId}
      />

      {/* Right: Selected Clause Details */}
      <div className="flex-1">
        {selectedClause ? (
          <div className="space-y-6">
            {/* Clause Header */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    ISO {selectedClause.id} - {selectedClause.title}
                  </span>
                  <Badge 
                    variant="outline"
                    className={getStatusBadgeColor(selectedClause.status)}
                  >
                    {selectedClause.status === "compliant" ? "Compliant" : "Gap Identified"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedClause.description}
                </p>
              </CardContent>
            </Card>

            {/* Department Compliance Chart */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Department Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  {/* Pie Chart */}
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPieChartData(selectedClause)}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getPieChartData(selectedClause).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      Department Status
                    </h4>
                    {Object.entries(selectedClause.departments).map(([dept, status]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {dept}
                        </span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${getStatusBadgeColor(status)}`}
                        >
                          {status === "compliant" ? "Compliant" : "Gap"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Linked Services */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Linked Service Catalog ({selectedClause.linkedServices})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  This clause is linked to {selectedClause.linkedServices} services in the organization.
                  Click on a service to view its details and compliance status.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h4 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              Select a Clause
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Choose an ISO clause from the left panel to view its details and compliance status.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 