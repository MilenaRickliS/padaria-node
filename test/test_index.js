import('chai').then(({ expect }) => {
  const app = require('../app');
  const req = {};
  const res = {
    render: (views) => {
      expect(views).to.equal(expect.views);
    },
  };

  describe('app', () => {
    it('deve renderizar a página index ', () => {
      res.views = 'index';
      app.get('/', (req, res));
    });

    it('deve renderizar a página de cadastrar', () => {
      res.views = 'cadastrar';
      app.get('/cadastrar', (req, res));
    });
  });
});