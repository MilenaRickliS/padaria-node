describe('Testando a página de login', () => {
    it('Deve fazer login com sucesso', () => {
      cy.visit('/login');
      cy.get('[data-cy=email]').type('teste@teste.com');
      cy.get('[data-cy=senha]').type('123456');
      cy.get('[data-cy=btn-login]').click();
      cy.url().should('include', '/home');
      cy.get('[data-cy=nome-usuario]').should('contain', 'Teste');
    });
  });