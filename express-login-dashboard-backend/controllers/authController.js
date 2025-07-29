const authService = require('../services/authService');

const authController = {
  /**
   * Cadastrar novo usuário
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const result = await authService.registerUser(name, email, password);
      
      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          createdAt: result.user.createdAt
        }
      });
    } catch (error) {
      if (error.message === 'Usuário já existe') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      console.error('Erro no cadastro:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  },

  /**
   * Realizar login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.loginUser(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        token: result.token,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email
        }
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message === 'Senha incorreta') {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message === 'Usuário bloqueado') {
        return res.status(423).json({
          success: false,
          message: error.message
        });
      }
      
      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  },

  /**
   * Solicitar recuperação de senha
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      const result = await authService.forgotPassword(email);
      
      res.status(200).json({
        success: true,
        message: 'Código de recuperação enviado com sucesso',
        resetCode: result.resetCode // Em produção, isso seria enviado por email
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      console.error('Erro na recuperação de senha:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  },

  /**
   * Redefinir senha com código de recuperação
   */
  async resetPassword(req, res) {
    try {
      const { email, resetCode, newPassword } = req.body;
      
      await authService.resetPassword(email, resetCode, newPassword);
      
      res.status(200).json({
        success: true,
        message: 'Senha redefinida com sucesso'
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message === 'Código inválido ou expirado') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      console.error('Erro na redefinição de senha:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = authController; 