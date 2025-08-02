const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const userRepository = require('../repositories/userRepository');

describe('Testes de Autenticação', () => {
  beforeEach(async () => {
    await userRepository.clearAll();
  });

  describe('Login com sucesso', () => {
    it('deve permitir login com credenciais válidas', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@teste.com',
        password: '123456'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(loginResponse.body.success).to.be.true;
      expect(loginResponse.body.message).to.equal('Login realizado com sucesso');
      expect(loginResponse.body.token).to.be.a('string');
      expect(loginResponse.body.user).to.have.property('id');
      expect(loginResponse.body.user).to.have.property('name', userData.name);
      expect(loginResponse.body.user).to.have.property('email', userData.email);
    });
  });
}); 