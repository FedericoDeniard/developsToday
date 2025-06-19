"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cat, DollarSign, TrendingUp, Users } from "lucide-react"
import type { SpyCat } from "@/lib/types"

interface StatsCardsProps {
  cats: SpyCat[]
}

export function StatsCards({ cats }: StatsCardsProps) {
  const totalCats = cats.length
  const totalSalary = cats.reduce((sum, cat) => sum + cat.salary, 0)
  const averageSalary = totalCats > 0 ? totalSalary / totalCats : 0
  const averageExperience = totalCats > 0 ? cats.reduce((sum, cat) => sum + cat.years_of_experience, 0) / totalCats : 0

  const experienceDistribution = {
    junior: cats.filter((cat) => cat.years_of_experience < 4).length,
    mid: cats.filter((cat) => cat.years_of_experience >= 4 && cat.years_of_experience < 7).length,
    senior: cats.filter((cat) => cat.years_of_experience >= 7).length,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          <Cat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCats}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="outline" className="text-xs">
              {experienceDistribution.junior} Junior
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {experienceDistribution.mid} Mid
            </Badge>
            <Badge variant="default" className="text-xs">
              {experienceDistribution.senior} Senior
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalSalary)}</div>
          <p className="text-xs text-muted-foreground">Annual compensation budget</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(averageSalary)}</div>
          <p className="text-xs text-muted-foreground">Per agent compensation</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageExperience.toFixed(1)} years</div>
          <p className="text-xs text-muted-foreground">Team experience level</p>
        </CardContent>
      </Card>
    </div>
  )
}
