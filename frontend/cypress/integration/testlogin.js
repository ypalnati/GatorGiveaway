import '@testing-library/cypress/add-commands'

describe("if login is successful",()=>{
    it("test login",()=>{
        cy.visit("http://localhost:3000/");
       
        cy.get("input[name=username]").type("a").should('have.value','a');
        cy.get("input[name=password]").type("a").should('have.value', 'a');
        cy.findAllByText('Sign In').focus().click()
       
        


    })
    });

    // describe("if sign exists",()=>{
    //     it("test signin",()=>{
    //         cy.visit("http://localhost:3000/");
    //         cy.findAllByText("Sign In").should("exist");
    //     })
    //     });

