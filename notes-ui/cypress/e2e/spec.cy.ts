describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('[data-cy="btn-add"]').should('contain.text', 'Add')
    cy.get('[data-cy="note"]').should('have.length', '5')
  })
})
