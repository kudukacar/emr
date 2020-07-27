const faker = require('faker');

describe("Signup and login", () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  const { firstName, lastName, email, password } = user;

  it("signs up and logs out a user, and a logged in user can't access the sign up page", () => {
    cy.visit('/signup')

    cy.get('input[name=firstname]').type(firstName)

    cy.get("input[name=lastname]").type(lastName)

    cy.get("input[name=email]").type(email)

    cy.get("input[name=password]").type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.contains(firstName)

    cy.visit('/signup')

    cy.contains(firstName)

    cy.contains("Logout").click()

    cy.url().should('include', '/login')
  });

  it("requires all fields to be filled before submission and does not allow duplicate emails", () => {
    cy.visit("/signup")

    cy.get("input[name=submit]").click()

    cy.url().should('include', "/signup")

    cy.get("input[name=firstname]").type(`${firstName}{enter}`)
    
    cy.url().should('include', "/signup")

    cy.get("input[name=lastname]").type(`${lastName}{enter}`)

    cy.url().should("include", "/signup")

    cy.get("input[name=email]").type(`${email}{enter}`)

    cy.url().should("include", "/signup")

    cy.get("input[name=password]").type(`${password}{enter}`)

    cy.url().should("include", "/signup")

    cy.contains("already exists")
  });

  it("requires a password length of 8 before submission", () => {
    cy.visit("/signup")

    cy.get("input[name=firstname]").type(firstName)

    cy.get("input[name=lastname]").type(lastName)

    cy.get("input[name=email]").type(faker.internet.email())

    cy.get("input[name=password]").type(`passwor{enter}`)

    cy.url().should("include", "/signup")
  });

  it("logs in and logs out a valid user and a logged in user can't access the login page", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type(email)

    cy.get("input[name=password]").type(`${password}{enter}`)

    cy.url().should("include", "/dashboard")

    cy.contains(firstName)

    cy.visit("/login")

    cy.contains(firstName)

    cy.contains("Logout").click()

    cy.url().should("include", "/login")
  })

  it("does not allow an invalid user to log in", () => {
    cy.visit("/login")

    cy.get("input[name=email]").type(email)

    cy.get("input[name=password]").type(`password{enter}`)

    cy.url().should("include", "/login")

    cy.contains("Please enter a valid email and password")
  })

  it("does not allow a non-logged in user to access the dashboard", () => {
    cy.visit("/dashboard")

    cy.url().should("include", "/login")
  })
})