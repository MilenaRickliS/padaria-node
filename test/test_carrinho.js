import('chai').then(({ expect }) =>{
    const app = require('../app');
describe('carrinho', () => {
  it('deve adicionar produto ao carrinho', () => {
    const req = { session: {} };
    const res = { redirect: () => {} };
    app.get('/adicionar/:id', (req, res));
    expect(req.session.carrinho).to.be.an('array');
    expect(req.session.carrinho.length).to.equal(1);
  });

  it('deve remover produto do carrinho', () => {
    const req = { session: { carrinho: [{ id: 1, name: 'Pão Italiano' }] } };
    const res = { redirect: () => {} };
    app.get('/remover/:id', (req, res));
    expect(req.session.carrinho).to.be.an('array');
    expect(req.session.carrinho.length).to.equal(0);
  });

  it('deve renderizar a página de carrinho', () => {
    const req = { session: { carrinho: [{ id: 1, name: 'Pão Italiano' }] } };
    const res = { render: () => {} };
    app.get('/carrinho', (req, res));
    expect(res.render).to.have.been.calledWith('carrinho', {
      carrinho: req.session.carrinho,
      total: 15,
    });
  });
});
});