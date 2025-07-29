const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepository = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-aqui';

const authService = {
  /**
   * Cadastrar novo usuário
   */
  async registerUser(name, email, password) {
    // Verificar se usuário já existe
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Criptografar senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      isBlocked: false,
      loginAttempts: 0,
      resetCode: null,
      resetCodeExpiry: null,
      createdAt: new Date().toISOString()
    };

    await userRepository.create(user);

    return { user };
  },

  /**
   * Realizar login
   */
  async loginUser(email, password) {
    // Buscar usuário
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se usuário está bloqueado
    if (user.isBlocked) {
      throw new Error('Usuário bloqueado');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      // Incrementar tentativas de login
      user.loginAttempts += 1;
      
      // Bloquear usuário após 3 tentativas
      if (user.loginAttempts >= 3) {
        user.isBlocked = true;
      }
      
      await userRepository.update(user);
      
      throw new Error('Senha incorreta');
    }

    // Login bem-sucedido - resetar tentativas
    user.loginAttempts = 0;
    await userRepository.update(user);

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  },

  /**
   * Solicitar recuperação de senha
   */
  async forgotPassword(email) {
    // Buscar usuário
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Gerar código de recuperação
    const resetCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    const resetCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

    // Atualizar usuário com código de recuperação
    user.resetCode = resetCode;
    user.resetCodeExpiry = resetCodeExpiry.toISOString();
    await userRepository.update(user);

    // Em produção, aqui seria enviado um email com o código
    // Por enquanto, retornamos o código na resposta
    
    return { resetCode };
  },

  /**
   * Redefinir senha com código de recuperação
   */
  async resetPassword(email, resetCode, newPassword) {
    // Buscar usuário
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar código de recuperação
    if (!user.resetCode || user.resetCode !== resetCode) {
      throw new Error('Código inválido ou expirado');
    }

    // Verificar se código expirou
    const now = new Date();
    const codeExpiry = new Date(user.resetCodeExpiry);
    
    if (now > codeExpiry) {
      throw new Error('Código inválido ou expirado');
    }

    // Criptografar nova senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Atualizar usuário
    user.password = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpiry = null;
    user.isBlocked = false; // Desbloquear usuário
    user.loginAttempts = 0; // Resetar tentativas
    await userRepository.update(user);

    return { success: true };
  }
};

module.exports = authService; 