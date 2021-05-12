/// <reference types="cypress" />


describe('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html#')
  })
  it("testendo eventos de alertas", () => {
    const stub = cy.stub().as("alert")
    cy.on("window:alert", stub) // mocar evento de alert no stub
    cy.get('#formCadastrar').click()
      .then(()=>expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio"))
    cy.get('#formNome').type("Eduardo")
    cy.get('#formCadastrar').click()
      .then(()=>{
        expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio")
      })
    cy.get('[data-cy=dataSobrenome]').type("Soares")
    cy.get('#formCadastrar').click().then(()=>{
      expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio")
    })
    cy.get('#formSexoMasc').click()
    cy.get('#formCadastrar').click();

    //data atual via cypress Cypress Cypress.moment().format("DD/MM/YYYY")


  })
  it("testando eventos de confirmação", () => {
    const stub = cy.stub().as("alert");
    cy.on("window:alert", stub);
    cy.on("window:confirm", msg =>{
      expect(msg).to.be.equal("Confirm Simples")
    })
    cy.get('#confirm').click().then(()=>{
      expect(stub.getCall(0)).to.be.calledWith("Confirmado")
    })
  });
  it("testando fixtures para objetos de entidades", ()=>{
    cy.fixture("pessoa").as("entidadePessoa").then( function () {
      cy.get('#formNome')
        .type(this.entidadePessoa.name)
        .get('[data-cy=dataSobrenome]')
        .type(this.entidadePessoa.sobrenome)
        .get(`[name=formSexo][value=${this.entidadePessoa.sexo}]`).click()
        .get(`[name=formComidaFavorita][value=${this.entidadePessoa.comida}]`).click()
        .get('#formCadastrar')
        .click();
    })
  })
  it("testando método de pesquisa", ()=>{
    cy.get("[name=formSexo]").each((value)=>{
       if(value.val() == "M") cy.wrap(value).click();
    })
    cy.get("[name=formComidaFavorita]").each((value)=>{
      if(value.val() == "pizza") cy.wrap(value).click();
    })
  })
});

