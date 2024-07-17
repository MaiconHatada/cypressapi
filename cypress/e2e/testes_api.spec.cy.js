/// <reference types ="cypress" />
const dayjs = require('dayjs')

describe.only('deve conseguir fazer os testes na api barriga react', () => {
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
            url: "/contas",
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta de testes passo 29'
            }
    }).as(`response`)

    cy.get("@response").then(res => {
        expect(res.status).be.equal(201)
        expect(res.body).be.property('id')
        expect(res.body).be.property('nome', 'Conta de testes passo 29')
    })
})

    it('deve alterar uma conta existente', () => {
        cy.request({
            method: 'PUT',
            url: "/contas/2104102",
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta de testes alterada'
            },
            //failOnStatusCode: false
    }).as(`response`)

    cy.get("@response").then(res => {
        expect(res.status).be.equal(200)
        expect(res.body).be.property('id')
        expect(res.body).be.property('nome', 'Conta de testes alterada')
    }) 
})
    it('nao deve alterar uma conta existente', () => {
        cy.request({
            method: 'POST',
            url: "/contas",
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false // deixa o testes seguir se encontra HTTP 4xx ou 5xx
    }).as(`response`)

    cy.get("@response").then(res => {
        console.log(res)
        expect(res.status).be.equal(400)
        expect(res.body.error).be.equal('Já existe uma conta com esse nome!')
    }) 
})
    it.only('deve fazer uma movimentação', () => {
        cy.getContaByName('Conta para movimentacoes').then(contaId => {
        cy.request({
            method: 'POST',
            url: "/transacoes",
            headers: { Authorization: `JWT ${token}` },
            body: {
                conta_id: contaId,
                data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'), // deixar data do dia
                data_transacao: dayjs().format('DD/MM/YYYY'),
                descricao: "desc",
                envolvido: "Eu",
                status:true,
                tipo: "REC",
                valor: "10000"
            }
        })
    }).as(`response`)

    cy.get("@response").its('status').should('be.equal', 201)
    
    })

    })
    

