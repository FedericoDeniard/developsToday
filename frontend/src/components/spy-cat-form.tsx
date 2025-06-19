"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CreateSpyCatRequest } from "@/lib/types"

interface SpyCatFormProps {
  onSubmit: (data: CreateSpyCatRequest) => Promise<void>
  isLoading?: boolean
}

export function SpyCatForm({ onSubmit, isLoading = false }: SpyCatFormProps) {
  const [formData, setFormData] = useState<CreateSpyCatRequest>({
    name: "",
    yearsOfExperience: 0,
    breed: "",
    salary: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    // Reset form after successful submission
    setFormData({
      name: "",
      yearsOfExperience: 0,
      breed: "",
      salary: 0,
    })
  }

  const handleInputChange = (field: keyof CreateSpyCatRequest, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Spy Cat</CardTitle>
        <CardDescription>Register a new agent in the Spy Cats Agency database.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Agent Whiskers"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                type="text"
                value={formData.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
                placeholder="Siamese"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange("yearsOfExperience", Number.parseInt(e.target.value) || 0)}
                placeholder="5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary ($)</Label>
              <Input
                id="salary"
                type="number"
                min="1"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", Number.parseInt(e.target.value) || 0)}
                placeholder="75000"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Adding..." : "Add Spy Cat"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
