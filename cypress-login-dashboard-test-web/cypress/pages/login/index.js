class Login {
    loginAplication() {
        cy.get('[id="email"]').type('teste.automation1712@tests.com.br')
        cy.get('[id="email"]').type('QA@2024', { log: false })
        cy.get('[type="submit"]').click()
    }

    loginAplicationInvalidCredentials() {
        cy.get('[id="email"]').type('teste.automation1712@tests.com.br')
        cy.get('[id="email"]').type('QA@2027', { log: false })
        cy.get('[type="submit"]').click()
    }

    createUser() {
        cy.contains('a', 'Cadastre-se').click();
    }

    openLoginPage() {
        cy.visit('http://localhost:3001')
    }
    
    forgotPassword() {
        cy.contains('a', 'Esqueci minha senha').click();
    }

}

export default new Login()