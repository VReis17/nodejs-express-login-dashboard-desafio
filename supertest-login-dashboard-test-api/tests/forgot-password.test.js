const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');

describe('API Login - Recuperação de Senha', () => {
  let testUser;
  let resetCode;

  before(async () => {
    testUser = {
      name: 'Usuario Recuperacao',
      email: 'recuperacao@exemplo.com',
      password: 'senha_original'
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

  it('deve solicitar recuperação de senha com email válido', async () => {
    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: testUser.email
      })
      .expect(200);

    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('resetCode');
    resetCode = response.body.resetCode;
  });

  it('deve redefinir senha com código válido', async () => {
    const newPassword = 'nova_senha123';

    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        email: testUser.email,
        resetCode: resetCode,
        newPassword: newPassword
      })
      .expect(200);

    expect(response.body).to.have.property('success', true);
    testUser.password = newPassword;
  });

  it('deve fazer login com nova senha', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200);

    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('token');
  });
}); 