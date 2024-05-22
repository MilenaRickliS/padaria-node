import('chai').then(chai => {
    const expect = chai.expect;
    import('./math').then(math => {
      const soma = math.soma;

      describe('Função de Soma', () => {
        it('Deve somar dois números corretamente', () => {
          const resultado = soma(1, 2);
          expect(resultado).to.equal(3);
        });

        it('Deve somar números positivos e negativos', () => {
          const resultado = soma(2, -3);
          expect(resultado).to.equal(-1);
        });
      });
    });
  });