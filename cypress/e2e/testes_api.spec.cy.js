/// <reference types ="cypress" />

describe('deve conseguir fazer os testes na api barriga react',() => {

})

it('deve fazer a requisição da url', () => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: "ferragens.saobraz@gmail.com", 
            senha: "12345678", 
            redirecionar: false
        }

    }).its('body.token').should('not.be.empty')
})