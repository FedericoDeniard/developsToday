import type { SpyCat, CreateSpyCatRequest, UpdateSpyCatRequest, ApiError } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: "An unexpected error occurred",
      }))
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async getSpyCats(): Promise<SpyCat[]> {
    return this.request<SpyCat[]>("/cats")
  }

  async getSpyCat(id: string): Promise<SpyCat> {
    return this.request<SpyCat>(`/cats/${id}`)
  }

  async createSpyCat(data: CreateSpyCatRequest): Promise<SpyCat> {
    return this.request<SpyCat>("/cats", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateSpyCatSalary(id: string, data: UpdateSpyCatRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/cats/${id}/salary`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deleteSpyCat(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/cats/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
