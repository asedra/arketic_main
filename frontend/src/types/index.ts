// Global type definitions for Arketic AI platform

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer'
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
