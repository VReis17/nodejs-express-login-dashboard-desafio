module.exports = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura-aqui',
    bcryptRounds: 10,
    resetCodeExpiry: 30 * 60 * 1000,
    maxLoginAttempts: 3
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },

  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || 'seu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'sua-senha-de-app'
  }
}; 