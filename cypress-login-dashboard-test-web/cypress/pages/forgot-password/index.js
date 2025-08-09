class ForgotPassword {

    forgotPassword() {
        cy.get('[placeholder="email"]').type('teste.automation17121@tests.com.br')
        cy.get('[type="submit"]').click()
    }

}

export default new ForgotPassword()