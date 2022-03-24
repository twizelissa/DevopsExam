describe("check electrictiy balance feature", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/electricity/check")
        cy.get("[placeholder=Meter_number]").clear()
    })
    
    it("should get the page content", () => {
        cy.get("#_check_balance_page").should("exist")
        cy.get("[placeholder=Meter_number]").should("exist")
    })
    
    it("should get invalid meter on add with invalid invalid meter", () => {
        cy.get("[placeholder=Meter_number]").type("123")
        
        cy.get("[action=checkElectricity]").click()
        
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("Invalid meter number")
    })
    
    it("should show success if everything is on success", () => {
        
        cy.get("[placeholder=Meter_number]").type("240510")
        
        cy.get("[action=checkElectricity]").click()
        
        cy.get("#SuccessMessage").should("exist")
        cy.get("#SuccessMessage").contains("Success you have electirity for 0 days")
    })
})