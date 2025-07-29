/**
 * Arquivo de exemplo para configurações da aplicação
 * 
 * Copie este arquivo para config.js e ajuste as configurações conforme necessário
 */

module.exports = {
  // Configurações do Servidor
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },

  // Configurações de Segurança
  security: {
    jwtSecret: process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura-aqui',
    bcryptRounds: 10,
    resetCodeExpiry: 30 * 60 * 1000, // 30 minutos em millisegundos
    maxLoginAttempts: 3
  },

  // Configurações de Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requests por IP
  },

  // Configurações de Email (para produção)
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || 'seu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'sua-senha-de-app'
  }
}; 