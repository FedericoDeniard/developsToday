import type {
  SpyCat,
  CreateSpyCatRequest,
  UpdateSpyCatRequest,
  ApiError,
  Mission,
  Note,
  CreateMissionRequest,
  CreateNoteRequest,
} from "./types"

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

  // Cat endpoints
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

  // Mission endpoints
  async getMissions(): Promise<Mission[]> {
    return this.request<Mission[]>("/missions")
  }

  async getMission(id: string): Promise<Mission> {
    return this.request<Mission>(`/missions/${id}`)
  }

  async createMission(data: CreateMissionRequest): Promise<{ mission_id: number; message: string }> {
    return this.request<{ mission_id: number; message: string }>("/missions", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async deleteMission(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/missions/${id}`, {
      method: "DELETE",
    })
  }

  async assignCatToMission(missionId: string, catId: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/missions/${missionId}/assign-cat`, {
      method: "PATCH",
      body: JSON.stringify({ cat_id: catId }),
    })
  }

  // Target endpoints
  async updateTargetStatus(
    targetId: string,
    status: "pending" | "active" | "completed" | "failed",
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/targets/${targetId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  // Note endpoints
  async getNotes(): Promise<Note[]> {
    return this.request<Note[]>("/notes")
  }

  async createNote(data: CreateNoteRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>("/notes", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
