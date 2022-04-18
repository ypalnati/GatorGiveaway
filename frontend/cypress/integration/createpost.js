import '@testing-library/cypress/add-commands'
import 'cypress-file-upload';

describe("create a post",()=>{
    it("create a post",()=>{

        const filepath = 'pics/book.jpeg';
        cy.visit("http://localhost:3000/");
       
        cy.get("input[name=username]").type("a").should('have.value','a');
        cy.get("input[name=password]").type("a").should('have.value', 'a');
        cy.findAllByText('Sign In').focus().click()
       
        cy.get(`[data-testid="AddIcon"]`).click()

        cy.get("input[name=name]").type("test");
        cy.get("textarea[name=Description]").type("test");
        cy.get("input[name=Location]").type("test");
        cy.get("input[name=Dimensions]").type("test");
        cy.get("input[name=Weight]").type("12");
        cy.get("input[name=Age]").type("10");
        cy.get("input[name=Count]").type("10");
        cy.get('input[type="file"]').attachFile(filepath)
        
        cy.findAllByText('Submit').focus().click()

    

    })
    });
