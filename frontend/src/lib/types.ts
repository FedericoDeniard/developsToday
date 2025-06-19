export interface SpyCat {
  id: number
  name: string
  years_of_experience: number
  breed: string
  salary: number
  created_at?: string
  updated_at?: string
}

export interface CreateSpyCatRequest {
  name: string
  years_of_experience: number
  breed: string
  salary: number
}

export interface UpdateSpyCatRequest {
  salary: number
}

export interface Mission {
  id: number
  assigned_cat?: number | null
  status: "pending" | "active" | "completed" | "failed"
  title: string
  targets?: Target[]
  created_at?: string
  updated_at?: string
}

export interface Target {
  id: number
  assigned_mission: number
  status: "pending" | "active" | "completed" | "failed"
  name: string
  country: string
  created_at?: string
  updated_at?: string
}

export interface Note {
  id: number
  target_id: number
  message: string
  created_at?: string
  updated_at?: string
}

export interface CreateMissionRequest {
  assigned_cat?: number | null
  status: "pending" | "active" | "completed" | "failed"
  title: string
  targets: {
    status: "pending" | "active" | "completed" | "failed"
    name: string
    country: string
  }[]
}

export interface CreateNoteRequest {
  target_id: number
  message: string
}

export interface ApiError {
  detail: string
  errors?: Record<string, string[]>
}
