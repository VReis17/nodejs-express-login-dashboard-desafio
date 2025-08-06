const TestHelper = require('../helpers/testHelper');
const app = require('../../express-login-dashboard-backend/server');

/**
 * Hooks globais para configuração dos testes
 * Seguindo as heurísticas VADER para cobertura completa
 */

// Variável global para armazenar usuários de teste
global.testUsers = [];
global.testHelper = new TestHelper(app);

// Funções helper globais
global.addTestUser = function(user) {
  global.testUsers.push(user);
};

global.createAndAddTestUser = async function(userData = null) {
  const user = await global.testHelper.createTestUser(userData);
  global.addTestUser(user);
  return user;
};

global.loginAndUpdateUser = async function(user) {
  const token = await global.testHelper.loginUser(user);
  user.token = token;
  return token;
};

module.exports = {
  testUsers: global.testUsers,
  testHelper: global.testHelper
}; 