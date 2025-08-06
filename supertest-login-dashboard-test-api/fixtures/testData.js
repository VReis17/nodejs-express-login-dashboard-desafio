const { faker } = require('@faker-js/faker');
const testData = {
  
  validUsers: {
    standard: {
      name: 'João Silva',
      email: 'joao.silva@exemplo.com',
      password: '123456'
    },
    withSpecialChars: {
      name: 'Maria José da Silva',
      email: 'maria.jose@exemplo.com',
      password: 'senha@123'
    },
    longName: {
      name: 'Antônio Carlos de Oliveira Santos Júnior',
      email: 'antonio.carlos@exemplo.com',
      password: 'minhasenha123'
    }
  },

  invalidUsers: {
    invalidEmail: {
      name: 'Teste Inválido',
      email: 'email-invalido',
      password: '123456'
    },
    shortPassword: {
      name: 'Teste Senha Curta',
      email: 'teste@exemplo.com',
      password: '123'
    },
    emptyName: {
      name: '',
      email: 'teste@exemplo.com',
      password: '123456'
    },
    invalidEmailFormat: {
      name: 'Teste Email',
      email: 'teste@',
      password: '123456'
    }
  },

  maliciousUsers: {
    sqlInjection: {
      name: "'; DROP TABLE users; --",
      email: 'teste@exemplo.com',
      password: '123456'
    },
    xssAttack: {
      name: '<script>alert("XSS")</script>',
      email: 'teste@exemplo.com',
      password: '123456'
    },
    veryLongInput: {
      name: 'A'.repeat(1000),
      email: 'teste@exemplo.com',
      password: '123456'
    },
    specialChars: {
      name: '!@#$%^&*()_+-=[]{}|;:,.<>?',
      email: 'teste@exemplo.com',
      password: '123456'
    }
  },

  emptyUsers: {
    emptyName: {
      name: '',
      email: 'teste@exemplo.com',
      password: '123456'
    },
    emptyEmail: {
      name: 'Teste',
      email: '',
      password: '123456'
    },
    emptyPassword: {
      name: 'Teste',
      email: 'teste@exemplo.com',
      password: ''
    },
    allEmpty: {
      name: '',
      email: '',
      password: ''
    }
  },

  correctUsers: {
    minimumValid: {
      name: 'Test',
      email: 'test@exemplo.com',
      password: '123456'
    },
    maximumValid: {
      name: 'A'.repeat(100), // Nome com 100 caracteres
      email: 'teste.muito.longo@exemplo.com',
      password: 'A'.repeat(50) // Senha com 50 caracteres
    }
  },

  loginCredentials: {
    valid: {
      email: 'usuario.valido@exemplo.com',
      password: '123456'
    },
    invalidPassword: {
      email: 'usuario.valido@exemplo.com',
      password: 'senha_incorreta'
    },
    invalidEmail: {
      email: 'usuario.inexistente@exemplo.com',
      password: '123456'
    }
  },

  passwordRecovery: {
    validEmail: 'usuario.valido@exemplo.com',
    invalidEmail: 'usuario.inexistente@exemplo.com',
    validResetCode: '123456',
    invalidResetCode: '000000',
    newPassword: 'nova_senha123'
  },

  generate: {
    validUser: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 })
    }),


    userWithEmail: (email) => ({
      name: faker.person.fullName(),
      email: email,
      password: faker.internet.password({ length: 8 })
    }),

    multipleUsers: (count = 3) => {
      const users = [];
      for (let i = 0; i < count; i++) {
        users.push({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password({ length: 8 })
        });
      }
      return users;
    }
  }
};

module.exports = testData; 