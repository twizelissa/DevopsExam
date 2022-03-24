describe("buy electrictiy feature", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/electricity/buy")
        cy.get("[placeholder=Meter_number]").clear()
        cy.get("[placeholder=Amount]").clear()
    })
    
    it("should get the page content", () => {
        cy.get("#_buy_electricity_page").should("exist")
        cy.get("[action=buyElectricity]").should("exist")
    })
    
    it("should return an error on nothing submitted", () => {
        cy.get("[action=buyElectricity]").click()
    
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("invalid meter, only 6 digits accepted")
    })
    
    it("should return an error on invalid meter submited", () => {
    
        cy.get("[placeholder=Meter_number]").type("1234")
        
        cy.get("[action=buyElectricity]").click()
        
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("invalid meter, only 6 digits accepted")
    })
    
    it("should return an error on invalid amount submitted", () => {
        
        cy.get("[placeholder=Meter_number]").type("123432")
        cy.get("[placeholder=Amount]").type("12")
        
        
        cy.get("[action=buyElectricity]").click()
        
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("invalid amount, only multiples of 100 not greater than 182,500 is accepted")
    })
    
    it("On success things will work fine", () => {
        
        cy.get("[placeholder=Meter_number]").type("123432")
        cy.get("[placeholder=Amount]").type("1200")
        
        
        cy.get("[action=buyElectricity]").click()
        
        cy.get("#SuccessMessage").should("exist")
        cy.get("#SuccessMessage").should("include.text", "Sucessfully")
    })
})