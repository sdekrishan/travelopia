describe('Testing the travelopia application', () => {
  it('should load the form page at first', () => {
    cy.visit('http://localhost:3000/')
  })

  it('Fills out the form and submits', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid=name]').type('John Doe');
    cy.get('[data-testid=email]').type('john@example.com'); 
    cy.get('[data-testid=destination]').select('India');
    cy.get("[data-testid=totalTravellers]").type('5');
    cy.get("[data-testid=budget]").type("500")
    cy.get('form').submit(); 
  });

  it('Posting the form',()=>{
    cy.visit("http://localhost:3000/");
    // cy.intercept("POST",'http://localhost:8080/',{"value":"booking successful"}).as('postRequest');
    
    cy.intercept('POST', 'http://localhost:8080/', { status: 'success' }).as('postRequest');

    cy.get('[data-testid=name]').type('John Doe');
    cy.get('[data-testid=email]').type('john@example.com'); 
    cy.get('[data-testid=destination]').select('India');
    cy.get("[data-testid=totalTravellers]").type('5');
    cy.get("[data-testid=budget]").type("500")
    cy.get('form').submit();

    cy.wait('@postRequest').then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body.status).to.eq('success');
    });

    // cy.url().should('include', '/thank-you'); // Replace '/thank-you' with the URL of the thank-you page
    // cy.get('.success-message').should('contain', 'Thank you!'); // Replace '.success-message' with the appropriate selector for the success message element
  })
})