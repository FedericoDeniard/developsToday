import { type NextRequest, NextResponse } from "next/server"
import type { SpyCat, CreateSpyCatRequest } from "@/lib/types"

// Mock database - in a real app, this would be a proper database
const spyCats: SpyCat[] = [
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

export async function GET() {
  try {
    return NextResponse.json(spyCats)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch spy cats" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSpyCatRequest = await request.json()

    // Validation
    const errors: Record<string, string[]> = {}

    if (!body.name || body.name.trim().length === 0) {
      errors.name = ["Name is required"]
    }

    if (!body.breed || body.breed.trim().length === 0) {
      errors.breed = ["Breed is required"]
    }

    if (typeof body.yearsOfExperience !== "number" || body.yearsOfExperience < 0) {
      errors.yearsOfExperience = ["Years of experience must be a non-negative number"]
    }

    if (typeof body.salary !== "number" || body.salary <= 0) {
      errors.salary = ["Salary must be a positive number"]
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 })
    }

    const newCat: SpyCat = {
      id: Date.now().toString(),
      name: body.name.trim(),
      yearsOfExperience: body.yearsOfExperience,
      breed: body.breed.trim(),
      salary: body.salary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    spyCats.push(newCat)

    return NextResponse.json(newCat, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to create spy cat" }, { status: 500 })
  }
}
