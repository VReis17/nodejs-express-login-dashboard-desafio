const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');
const testData = require('../fixtures/testData');
const userRepository = require('../../express-login-dashboard-backend/repositories/userRepository');

/**
 * Testes de Registro de Usuário
 * Cobertura completa de cenários de validação
 */

describe('API Register - Cadastro de Usuário', () => {
  
  describe('Cenários de Cadastro Válido', () => {
    it('deve cadastrar usuário com dados válidos padrão', async () => {
      await userRepository.clearAll();
      
      const user = await global.createAndAddTestUser(testData.validUsers.standard);
      
      expect(user.id).to.exist;
      expect(user.name).to.equal(testData.validUsers.standard.name);
      expect(user.email).to.equal(testData.validUsers.standard.email);
    });

    it('deve cadastrar usuário com caracteres especiais no nome', async () => {
      await userRepository.clearAll();
      
      const user = await global.createAndAddTestUser(testData.validUsers.withSpecialChars);
      
      expect(user.id).to.exist;
      expect(user.name).to.equal(testData.validUsers.withSpecialChars.name);
    });

    it('deve cadastrar múltiplos usuários únicos', async () => {
      const users = testData.generate.multipleUsers(3);
      
      for (const userData of users) {
        const user = await global.createAndAddTestUser(userData);
        expect(user.id).to.exist;
        expect(user.email).to.equal(userData.email);
      }
    });
  });

  describe('Cenários de Validação de Erro', () => {
    it('deve rejeitar email inválido', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.invalidUsers.invalidEmail)
        .expect(400);

      global.testHelper.validateErrorResponse(response);
    });

    it('deve rejeitar senha muito curta', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.invalidUsers.shortPassword)
        .expect(400);

      global.testHelper.validateErrorResponse(response);
    });

    it('deve rejeitar usuário com email duplicado', async () => {
      const firstUser = await global.createAndAddTestUser();
      
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Outro Usuário',
          email: firstUser.email,
          password: '123456'
        })
        .expect(400);

      global.testHelper.validateErrorResponse(response, 'Usuário já existe');
    });
  });

  describe('Cenários de Caracteres Especiais', () => {
    it('deve aceitar caracteres especiais no nome', async () => {
      const user = await global.createAndAddTestUser(testData.maliciousUsers.specialChars);
      
      expect(user.id).to.exist;
      expect(user.name).to.equal(testData.maliciousUsers.specialChars.name);
    });
  });

  describe('Cenários de Campos Vazios', () => {
    it('deve rejeitar nome vazio', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.emptyUsers.emptyName)
        .expect(400);

      global.testHelper.validateErrorResponse(response);
    });

    it('deve rejeitar email vazio', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.emptyUsers.emptyEmail)
        .expect(400);

      global.testHelper.validateErrorResponse(response);
    });

    it('deve rejeitar todos os campos vazios', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.emptyUsers.allEmpty)
        .expect(400);

      global.testHelper.validateErrorResponse(response);
    });
  });

  describe('Cenários de Estrutura de Resposta', () => {
    it('deve retornar estrutura de resposta correta', async () => {
      const userData = testData.generate.validUser();
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message', 'Usuário cadastrado com sucesso');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('name', userData.name);
      expect(response.body.user).to.have.property('email', userData.email);
      expect(response.body.user).to.have.property('createdAt');
      expect(response.body.user).to.not.have.property('password');
    });
  });
});
﻿
