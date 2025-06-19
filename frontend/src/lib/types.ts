export interface SpyCat {
  id: string
  name: string
  years_of_experience: number
  breed: string
  salary: number
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

export interface ApiError {
  detail: string
  errors?: Record<string, string[]>
}
