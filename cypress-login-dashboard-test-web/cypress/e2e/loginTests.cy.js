/// <reference types="cypress" />
import home from "../pages/home";
import login from "../pages/login";
import registerUser from "../pages/register-user";
import resetPassword from "../pages/reset-password";
import forgotPassword from "../pages/forgot-password";


Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login', () => {

  before(async () => {
    login.openLoginPage();
    login.createUser();
    registerUser.registerUser();
  });

  beforeEach(async () => {
    login.openLoginPage();
  });
  
  it('Test Case 1: Login com sucesso', () => {
    login.loginAplication();
    home.homeValidate();
  });

  it('Test Case 2: Login com credenciais inválidas', () => {
    login.loginAplicationInvalidCredentials();
    cy.contains('div', 'Senha incorreta').should('be.visible');
  });

  it('Test Case 3: Bloqueio de login após 3 tentativas inválidas', () => {  
    login.loginAplicationInvalidCredentials();
    login.loginAplicationInvalidCredentials();
    login.loginAplicationInvalidCredentials();
    cy.contains('div', 'Acesso bloqueado').should('be.visible');
  });

  it('Test Case 4: Recuperação de senha', () => {
    login.forgotPassword();
    forgotPassword.forgotPassword();
    cy.contains('div', 'Código de recuperação enviado').should('be.visible');
    resetPassword.resetPassword();
    cy.contains('div', 'Senha atualizada com sucesso').should('be.visible').then(() => {
      login.loginAplication();
      home.homeValidate();
    });
  });
  
})