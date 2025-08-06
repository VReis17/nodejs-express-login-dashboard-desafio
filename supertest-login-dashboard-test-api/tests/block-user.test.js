const request = require('supertest');
const { expect } = require('chai');
const app = require('../../express-login-dashboard-backend/server');

describe('API Login - Bloqueio de Usuário', () => {
  // Gerar email único para evitar duplicação
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);

  let testUser;

  before(async () => {
    testUser = {
      name: 'Usuario Bloqueio',
      email: 'usuario.bloqueio.' + timestamp + '.' + random + '@exemplo.com',
      password: '123456'
    };

    // Criar usuário de teste
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
  });

  it('deve bloquear usuário após múltiplas tentativas de login inválido', async () => {
    // Fazer 5 tentativas de login com senha incorreta
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'senha_incorreta'
        })
        .expect(401);
    }

    // Na 6ª tentativa, usuário deve estar bloqueado
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'senha_incorreta'
      })
      .expect(423);

    expect(response.body).to.have.property('success', false);
    expect(response.body.message).to.equal('Usuário bloqueado');
  });
});
﻿
