describe("Sign Up New User", () => {
  it("tests Sign Up New User", () => {
    cy.viewport(1002, 922);
    cy.visit("http://localhost:5173/");
    cy.get("nav a:nth-of-type(4)").click();
    cy.get("#fullName").click();
    cy.get("#fullName").type("C");
    cy.get("#fullName").type("Cypress User");
    cy.get("#email").type("user@cypress.ca");
    cy.get("#password").type("password");
    cy.get("button").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHAHBIAIAIBJAJAJBKB
