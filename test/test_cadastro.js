const request = require('supertest');
const app = require('../app');

describe('Testando a API de usuários', () => {
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/cadastrar')
      .send({
        email: 'teste@teste.com',
        senha: '123456'
      });
    expect(res.statusCode).toEqual(201);
  });
});