const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');

describe('API Login - Login Inválido', () => {
  let testUser;

  before(async () => {
    testUser = {
      name: 'Usuario Teste',
      email: 'usuario.teste@exemplo.com',
      password: 'senha123'
    };

    await request(app)
      .post('/api/auth/register')
      .send(testUser);
  });

  after(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    if (loginResponse.body.token) {
      await request(app)
        .delete('/api/auth/delete-account')
        .set('Authorization', `Bearer ${loginResponse.body.token}`);
    }
  });

  it('deve retornar erro 401 com senha incorreta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'senha_incorreta'
      })
      .expect(401);

    expect(response.body).to.have.property('success', false);
    expect(response.body.message).to.equal('Senha incorreta');
  });

  it('deve retornar erro 404 com email inexistente', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'email.inexistente@exemplo.com',
        password: 'qualquer_senha'
      })
      .expect(404);

    expect(response.body).to.have.property('success', false);
    expect(response.body.message).to.equal('Usuário não encontrado');
  });
}); 