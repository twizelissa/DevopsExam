describe("losf electrictiy feature", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/electricity/load")
    })
    
    it("should get the page content", () => {
        cy.get("#_load_balance_page").should("exist")
        cy.get("[placeholder=Token]").should("exist")
    })
    
    it("should get invalid token on add with invalid token", () => {
        cy.get("[placeholder=Token]").type("123")
        
        cy.get("[action=loadElectricty]").click()
        
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("Invalid token")
    })
    
    it("should show unknown token token", () => {
        cy.get("[placeholder=Token]").clear()
        cy.get("[placeholder=Token]").type(12835264)
        
        cy.get("[action=loadElectricty]").click()
        
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("Unknown token")
    })
    
    it("should show successs if token is valid", () => {
        cy.get("[placeholder=Token]").clear()
        cy.get("[placeholder=Token]").type(34700964)
        
        cy.get("[action=loadElectricty]").click()
        
        cy.get("#SuccessMessage").should("be.visible")
    })
})