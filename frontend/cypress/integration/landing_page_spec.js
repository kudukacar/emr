describe("The landing page", () => {
  it("successfully loads and can navigate to login and signup pages", () => {
    cy.visit("/")

    cy.contains("Start").click()

    cy.url().should('include', '/signup')

    cy.contains("Smart").click()

    cy.contains("Login").click()

    cy.url().should('include', '/login')
  });
});