const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');

describe('API Register - Cadastro de Usuário', () => {
  // Gerar email único para evitar duplicação
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);

  const testUser = {
    name: 'usuario teste',
    email: 'usuario.teste.' + timestamp + '.' + random + '@exemplo.com',
    password: '123456'
  };

  after(function (done) {
    request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .then(loginResponse => {
        if (loginResponse.body.token) {
          return request(app)
            .delete('/api/auth/delete-account')
            .set('Authorization', 'Bearer ' + loginResponse.body.token);
        }
      })
      .then(() => done())
      .catch(() => done());
  });

  it('deve cadastrar usuário com dados válidos', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('user');
  });
});
﻿
