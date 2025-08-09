class ResetPassword {

    resetPassword() {
        cy.get('[id="code"]').type('QA@2024')
        cy.get('[id="newPassword"]').type('QA@2024')
        cy.get('[id="confirmPassword"]').type('QA@2024')
        cy.get('[type="submit"]').click()
    }

}

export default new ResetPassword()