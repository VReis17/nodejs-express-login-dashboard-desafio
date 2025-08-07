/**
 * Configuração da API e serviços de autenticação
 */

import { API_CONFIG } from './config'

const API_BASE_URL = API_CONFIG.BASE_URL

// Interface para os tipos de dados da API
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface LoginResponse {
  success: boolean
  message: string
  token: string
  user: User
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: User
}

export interface ForgotPasswordResponse {
  success: boolean
  message: string
  resetCode: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
}

export interface ApiError {
  success: false
  message: string
  errors?: Array<{
    msg: string
    param: string
    location: string
  }>
}

// Classe para gerenciar chamadas da API
class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Método privado para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw data as ApiError
      }

      return data as T
    } catch (error) {
      if (error instanceof Error) {
        throw {
          success: false,
          message: error.message || 'Erro de conexão com o servidor'
        } as ApiError
      }
      throw error
    }
  }

  // Cadastrar novo usuário
  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Fazer login
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  // Solicitar recuperação de senha
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  // Redefinir senha
  async resetPassword(
    email: string,
    resetCode: string,
    newPassword: string
  ): Promise<ResetPasswordResponse> {
    return this.request<ResetPasswordResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, resetCode, newPassword }),
    })
  }
}

// Instância do serviço de API
export const apiService = new ApiService(API_BASE_URL)

// Funções utilitárias para gerenciar token
export const tokenManager = {
  // Salvar token no localStorage
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  },

  // Obter token do localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  },

  // Remover token do localStorage
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  },

  // Verificar se está logado
  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken()
  }
}

// Funções utilitárias para gerenciar dados do usuário
export const userManager = {
  // Salvar dados do usuário
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user))
    }
  },

  // Obter dados do usuário
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data')
      return userData ? JSON.parse(userData) : null
    }
    return null
  },

  // Remover dados do usuário
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data')
    }
  }
}

// Função para fazer logout
export const logout = () => {
  tokenManager.removeToken()
  userManager.removeUser()
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}
