const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');
require('dotenv').config({ path: './config.env' });

class TestHelper {
  constructor(app) {
    this.app = app;
    this.baseUrl = process.env.API_BASE_PATH || '/api/auth';
  }

  /**
   * Gera dados de usuário únicos para teste
   * @param {string} prefix - Prefixo para o email
   * @returns {Object} Dados do usuário
   */
  generateTestUser(prefix = 'test') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    
    return {
      name: faker.person.fullName(),
      email: `${prefix}.${timestamp}.${random}@${process.env.TEST_EMAIL_DOMAIN || 'exemplo.com'}`,
      password: faker.internet.password({ length: 8 })
    };
  }

  /**
   * Cria um usuário de teste e retorna os dados
   * @param {Object} userData - Dados do usuário (opcional)
   * @returns {Promise<Object>} Dados do usuário criado
   */
  async createTestUser(userData = null) {
    const user = userData || this.generateTestUser();
    
    const response = await request(this.app)
      .post(`${this.baseUrl}/register`)
      .send(user)
      .expect(201);

    return {
      ...user,
      id: response.body.user?.id,
      token: null
    };
  }

  /**
   * Faz login com um usuário e retorna o token
   * @param {Object} user - Dados do usuário
   * @returns {Promise<string>} Token de autenticação
   */
  async loginUser(user) {
    const response = await request(this.app)
      .post(`${this.baseUrl}/login`)
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200);

    return response.body.token;
  }

  /**
   * Remove um usuário de teste
   * @param {Object} user - Dados do usuário
   * @param {string} token - Token de autenticação
   */
  async deleteTestUser(user, token) {
    try {
      if (token) {
        await request(this.app)
          .delete(`${this.baseUrl}/delete-account`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      }
    } catch (error) {
      console.log(`Erro ao deletar usuário ${user.email}:`, error.message);
    }
  }

  /**
   * Limpa todos os dados de teste
   * @param {Array} testUsers - Lista de usuários de teste
   */
  async cleanupTestUsers(testUsers) {
    for (const user of testUsers) {
      if (user.token) {
        await this.deleteTestUser(user, user.token);
      }
    }
  }

  /**
   * Valida estrutura de resposta de sucesso
   * @param {Object} response - Resposta da API
   * @param {string} expectedMessage - Mensagem esperada
   */
  validateSuccessResponse(response, expectedMessage = null) {
    expect(response.body).to.have.property('success', true);
    if (expectedMessage) {
      expect(response.body).to.have.property('message', expectedMessage);
    }
  }

  /**
   * Valida estrutura de resposta de erro
   * @param {Object} response - Resposta da API
   * @param {string} expectedMessage - Mensagem esperada
   */
  validateErrorResponse(response, expectedMessage = null) {
    expect(response.body).to.have.property('success', false);
    if (expectedMessage) {
      expect(response.body).to.have.property('message', expectedMessage);
    }
  }
}

module.exports = TestHelper; 