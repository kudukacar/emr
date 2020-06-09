describe("The landing page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains("HIPAA");
  });
});