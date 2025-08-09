class Home {

    homeValidate() {
        cy.contains('h1', 'Métricas Técnicas de Performance')
    }

}

export default new Home()
