
import { expect } from 'chai';
const request = require('supertest');

describe('/home', () => {
  it('should render home page', async () => {
    const res = await request(app).get('/home');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('Home Page');
  });

  it('should render home page with carrinho', async () => {
    const user = { id: 1, name: 'John Doe' };
    req.session.user = user;
    req.session.carrinho = [{ id: 1, name: 'Product 1', price: 10 }];
    const res = await request(app).get('/home');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('Home Page');
    expect(res.text).to.contain('Product 1');
  });
});

describe('/adicionar/:id', () => {
    it('should add product to carrinho', async () => {
      const id = 1;
      const produto = { id: 1, name: 'Product 1', price: 10 };
      req.session.carrinho = [];
      const res = await request(app).get(`/adicionar/${id}`);
      expect(res.status).to.equal(302);
      expect(req.session.carrinho).to.deep.equal([produto]);
    });
  
    it('should not add product to carrinho if it already exists', async () => {
      const id = 1;
      const produto = { id: 1, name: 'Product 1', price: 10 };
      req.session.carrinho = [produto];
      const res = await request(app).get(`/adicionar/${id}`);
      expect(res.status).to.equal(302);
      expect(req.session.carrinho).to.deep.equal([produto]);
    });
  });