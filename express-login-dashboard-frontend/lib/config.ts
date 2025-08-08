/**
 * Configuração da aplicação
 */

// URL da API - em produção deve ser definida via variável de ambiente
export const API_CONFIG = {
  BASE_URL: typeof window !== 'undefined' 
    ? (window as any).__API_BASE_URL__ || 'http://localhost:3000/api'
    : 'http://localhost:3000/api'
}

// Endpoints da API
export const API_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password'
} as const
