describe("if page is loading",()=>{
it("renders correctly",()=>{
    cy.visit("http://localhost:3000/aboutus");
    cy.get('.left > .nav-link').click();
    cy.get('[type="text"]').type("Jayanth"); 
    cy.get('[type="email"]').type("jayanth.atcha4@gmail.com");
    cy.get('textarea.form-control').type("For Testing Purpose");
    cy.get('.row > .btn').click();
   
})
});