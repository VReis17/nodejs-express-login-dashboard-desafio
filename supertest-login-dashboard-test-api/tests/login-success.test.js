const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');

describe('API Login - Login com Sucesso', () => {
  let testUser;

  before(async () => {
    testUser = {
      name: 'Teste Usuario',
      email: 'teste@exemplo.com',
      password: '123456'
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

  it('deve fazer login com credenciais válidas e retornar token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200);

    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('user');
    expect(response.body.token).to.be.a('string');
  });
}); 