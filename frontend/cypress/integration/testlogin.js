import '@testing-library/cypress/add-commands'

describe("if login is successful",()=>{
    it("test login",()=>{
        cy.visit("http://localhost:3000/");
       
        cy.get("input[name=username]").type("GatorUser1").should('have.value','GatorUser1');
        cy.get("input[name=password]").type("user1@123").should('have.value', 'user1@123');


    })
    });

    describe("if sign exists",()=>{
        it("test signin",()=>{
            cy.visit("http://localhost:3000/");
            cy.findAllByText("Sign In").should("exist");
        })
        });