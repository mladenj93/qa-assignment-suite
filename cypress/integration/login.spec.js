

// Github https://github.com/mladenj93/qa-assignment-suite

var credentials = {
    email: "mladen.jovanovic.edu@gmail.com",
    password: "M1234567890"
}

var locators = {
    email: "#username",
    password: "#password",
    loginBtn: "#login-form button",
    navDropDown: '.user-group',
    logoutBtn: '[data-testid="logoutButton"]',
    errors: {
        emailRequired: '[data-testid="emailRequired"]',
        passwordRequired: '[data-testid="passwordRequired"]',
        emailIncorrect: '[data-testid="emailIncorrect"]',
        wrongCredentials: '[data-testid="infoWrongCredentials"]'
    }
}

describe("Login test", () => {
    beforeEach(() => {
        cy.visit('https://the.suite.st/login')
    })

    it('It should be able to enter correct username / password and be loggedin', () => {

        cy.get(locators.email).type(credentials.email)
        cy.get(locators.password).type(credentials.password)
        cy.get(locators.loginBtn).click()
        
        cy.wait(2000)
        cy.get("body")
            .should('have.class', 'app-logged-app-tests')

        cy.get(locators.navDropDown).click()
        cy.get(locators.logoutBtn).click()
        
    })

    it('Form should not submit if either username or password is empty', () => {
        cy.get(locators.email).clear()
        cy.get(locators.password).clear()
        cy.get(locators.loginBtn).click()

        cy.get(locators.errors.emailRequired)
            .should($error => expect($error).to.not.have.class('ng-hide'))

        cy.get(locators.errors.passwordRequired)
            .should($error => expect($error).to.not.have.class('ng-hide')) 
    })

    it('Form should validate username to be a valid email address', () => {
        cy.get(locators.email).type("invalidemail")
        cy.get(locators.password).type("password")
        cy.get(locators.loginBtn).click()

        cy.get(locators.errors.emailIncorrect)
            .should($error => expect($error).to.not.have.class('ng-hide'))
    })

    it('Form should display an error message in case of failed login', () => {
        cy.get(locators.email).type(credentials.email)
        cy.get(locators.password).type("invalidPassword")
        cy.get(locators.loginBtn).click()

        cy.get(locators.errors.wrongCredentials)
            .should($error => expect($error).to.not.have.class('ng-hide'))
    })

})