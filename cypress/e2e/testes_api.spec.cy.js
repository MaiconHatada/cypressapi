/// <reference types ="cypress" />

describe('deve conseguir fazer os testes na api barriga react', () => {
    let token

    before(() => {
        cy.getToken('ferragens.saobraz@gmail.com', "12345678")
            .then(tkn => {
                token = tkn
        })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('deve fazer a requisição da url', () => {
        cy.request({
            method: 'POST',
            url: "https://barrigarest.wcaquino.me/contas",
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta de testes passo 25'
            }
    }).as(`response`)

    cy.get("@response").then(res => {
        expect(res.status).be.equal(201)
        expect(res.body).be.property('id')
        expect(res.body).be.property('nome', 'Conta de testes passo 25')
    })

  
    })



})