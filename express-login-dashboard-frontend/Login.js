// 1 - Acessar pagina web 
// 2 - Realizar Login
// 3 - Login Invalido
// 4 - Recuperação de senha
// 3 - Recuperação de senha e redefinir senha
// 4 - Redefinir senha

describe('Login', () => {
  it('Realizar o Login', () => {

    cy.visit('http://localhost:4000')

    cy.get('#E-mail').click().type('admin')
    cy.contains('button', 'Entrar').click() 
    
    // Assert
    cy.url().should('include', '/dashboard')        
    cy.get('.alert-success').should('contain', 'Login realizado com sucesso')
    cy.get('.navbar-brand').should('contain', 'HOME')

})
    
   it('Recuperação de senha', () => {
    // Arrange

    cy.visit('http://localhost:4000')

    cy.contains('button', 'Esqueceu a Senha').click() 
    cy.get('#E-mail').click().type('12@.gmail.com')
    cy.contains('button', 'Enviar Código').click() 

        // Assert
    cy.get('#E-mail').click().type('admin')
    cy.get('#Código de verificação').type('123456')
    cy.get('#Nova senha').click().type('123456')
    cy.get('#Confirmar nova senha').click().type('123456')
    cy.contains('button', 'Alterar senha').click() 
})
   it('Recuperação de senha', () => {
    // Assert
    cy.url().should('include', '/dashboard')        
    cy.get('.alert-success').should('contain', 'Senha alterada com sucesso')    
    cy.get('.navbar-brand').should('contain', 'HOME')
         
    })
 })
   