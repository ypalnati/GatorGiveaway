import '@testing-library/cypress/add-commands'

describe("if login is successful",()=>{
    it("test login",()=>{
        cy.visit("http://localhost:3000/");
       
        //login by giving correct creds
        cy.get("input[name=username]").type("a").should('have.value','a');
        cy.get("input[name=password]").type("a").should('have.value', 'a');
        cy.findAllByText('Sign In').focus().click()

        //logout
        cy.findAllByText('LogOut').focus().click()

        //check if login appears again after logout
        cy.findAllByText('Sign In').should("exist")


    })
    });