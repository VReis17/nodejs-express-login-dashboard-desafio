class RegisterUser {

    registerUser() {
        cy.get('[id="name"]').type('QA Enginner')
        cy.get('[id="email"]').type('teste.automation17121@tests.com.br')
        cy.get('[id="password"]').type('QA@2024')
        cy.get('[id="confirmPassword"]').type('QA@2024')
        cy.get('[type="submit"]').click()
    }

}

export default new RegisterUser()