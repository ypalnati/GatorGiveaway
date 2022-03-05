describe("if page is loading",()=>{
it("renders correctly",()=>{
    cy.visit("http://localhost:3000/aboutus");
    cy.get('#contactus').focus().click();
    cy.get('[type="text"]').focus().type("Jayanth"); 
    cy.get('[type="email"]').focus().type("jayanth.atcha4@gmail.com");
    cy.get('textarea.form-control').focus().type("For Testing Purpose");
    cy.get('.row > .btn').focus().click();
   
})
});