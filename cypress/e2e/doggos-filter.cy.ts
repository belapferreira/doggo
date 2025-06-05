describe('Doggos Filter', () => {
  it('should filter doggos by type', () => {
    cy.visit('/');

    cy.contains('label', 'Type')
      .should('exist')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'Jpg');

    cy.contains('label', 'Type').parent().find('[class$="control"]').click();

    cy.get('[class$="menu"]').find('[class$="option"]').contains('Gif').click();

    cy.contains('label', 'Type')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'Gif');

    cy.get('[data-testid="doggos-container"] img').each(($img) => {
      expect($img.attr('src')).to.match(/\.gif(\?|$)/i);
    });
  });
});
