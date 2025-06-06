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

  it('should filter doggos that has no breed', () => {
    cy.visit('/');

    cy.contains('label', 'Has Breed')
      .should('exist')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'All');

    cy.contains('label', 'Has Breed')
      .parent()
      .find('[class$="control"]')
      .click();

    cy.get('[class$="menu"]')
      .find('[class$="option"]')
      .contains('False')
      .click();

    cy.contains('label', 'Has Breed')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'False');

    cy.get(
      '[data-testid="doggos-container"] [data-testid^="doggo-breed-name"]',
    ).each(($name) => {
      expect($name.text().trim()).to.equal('Beautiful Doggo');
    });
  });

  it('should disable breeds select if has breed is false', () => {
    cy.visit('/');

    cy.contains('label', 'Has Breed')
      .should('exist')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'All');

    cy.contains('label', 'Has Breed')
      .parent()
      .find('[class$="control"]')
      .click();

    cy.get('[class$="menu"]')
      .find('[class$="option"]')
      .contains('False')
      .click();

    cy.contains('label', 'Has Breed')
      .parent()
      .find('[class$="singleValue"] span')
      .should('have.text', 'False');

    cy.contains('label', 'Breeds')
      .parent()
      .find('[class$="control"]')
      .should('have.attr', 'aria-disabled', 'true');
  });

  it('should filter doggos by breed', () => {
    const breed = 'Akita';

    cy.visit('/');

    cy.contains('label', 'Breeds')
      .should('exist')
      .parent()
      .find('[class$="placeholder"]')
      .should('have.text', 'Select a breed');

    cy.contains('label', 'Breeds').parent().find('[class$="control"]').click();

    cy.get('[class$="menu"]').find('[class$="option"]').contains(breed).click();

    cy.get(
      '[data-testid="doggos-container"] [data-testid^="doggo-breed-name"]',
    ).each(($name) => {
      expect($name.text().trim()).to.equal(breed);
    });
  });
});
