describe('The Splash Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains("HIPAA")
  })
})