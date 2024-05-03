// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// Comando onde passamos o metodo POST - passando usuario e senha e pegamos o token e retornamos
Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user, 
            senha: passwd, 
            redirecionar: false
        }

    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
    })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('ferragens.saobraz@gmail.com', "12345678").then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`},
            })

        }).its('status').should('eq',200)
    })


Cypress.Commands.add('getContaByName', name => {
    cy.getToken('ferragens.saobraz@gmail.com', "12345678").then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                    nome: name
            }
            }).then(res => {
                return res.body[0].id
            })
        })
    })




