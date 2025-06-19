import { type NextRequest, NextResponse } from "next/server"
import type { UpdateSpyCatRequest } from "@/lib/types"

// Mock database - same reference as in the main route
const spyCats = [
  {
    id: "1",
    name: "Agent Whiskers",
    yearsOfExperience: 5,
    breed: "Siamese",
    salary: 75000,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Shadow Paws",
    yearsOfExperience: 8,
    breed: "Maine Coon",
    salary: 95000,
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    name: "Midnight",
    yearsOfExperience: 3,
    breed: "British Shorthair",
    salary: 60000,
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
  },
]

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body: UpdateSpyCatRequest = await request.json()

    const catIndex = spyCats.findIndex((cat) => cat.id === id)

    if (catIndex === -1) {
      return NextResponse.json({ message: "Spy cat not found" }, { status: 404 })
    }

    // Validation
    if (typeof body.salary !== "number" || body.salary <= 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: { salary: ["Salary must be a positive number"] } },
        { status: 400 },
      )
    }

    spyCats[catIndex] = {
      ...spyCats[catIndex],
      salary: body.salary,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(spyCats[catIndex])
  } catch (error) {
    return NextResponse.json({ message: "Failed to update spy cat" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const catIndex = spyCats.findIndex((cat) => cat.id === id)

    if (catIndex === -1) {
      return NextResponse.json({ message: "Spy cat not found" }, { status: 404 })
    }

    spyCats.splice(catIndex, 1)

    return NextResponse.json({ message: "Spy cat deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete spy cat" }, { status: 500 })
  }
}
