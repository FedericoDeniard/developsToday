"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, CheckCircle, AlertCircle, Play, Target } from "lucide-react"
import type { SpyCat } from "@/lib/types"

interface Mission {
  id: string
  title: string
  description: string
  location: string
  status: "pending" | "active" | "completed" | "failed"
  priority: "low" | "medium" | "high" | "critical"
  assignedCatId?: string
  startDate?: string
  endDate?: string
  progress: number
}

interface MissionTrackerProps {
  cats: SpyCat[]
}

export function MissionTracker({ cats }: MissionTrackerProps) {
  const [missions] = useState<Mission[]>([])

  const getStatusIcon = (status: Mission["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "active":
        return <Play className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Mission["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "active":
        return "default"
      case "completed":
        return "outline"
      case "failed":
        return "destructive"
    }
  }

  const getPriorityColor = (priority: Mission["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
    }
  }

  const getAssignedCat = (catId?: string) => {
    return cats.find((cat) => cat.id.toString() === catId)
  }

  const activeMissions = missions.filter((m) => m.status === "active").length
  const completedMissions = missions.filter((m) => m.status === "completed").length
  const pendingMissions = missions.filter((m) => m.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Mission Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingMissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {missions.length > 0 ? Math.round((completedMissions / missions.length) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missions List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Missions</CardTitle>
          <CardDescription>Track ongoing and upcoming spy operations</CardDescription>
        </CardHeader>
        <CardContent>
          {missions.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Missions Available</h3>
              <p className="text-muted-foreground">Mission data will be loaded from your database when available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {missions.map((mission) => {
                const assignedCat = getAssignedCat(mission.assignedCatId)

                return (
                  <div key={mission.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{mission.title}</h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(mission.priority)}`} />
                          <Badge variant={getStatusColor(mission.status)} className="flex items-center gap-1">
                            {getStatusIcon(mission.status)}
                            {mission.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {mission.location}
                          </div>
                          {assignedCat && (
                            <div className="flex items-center gap-1">
                              <span>Assigned to: {assignedCat.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {mission.status === "active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{mission.progress}%</span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
