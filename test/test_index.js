import('chai').then(({ expect }) => {
    const app = require('./app');
  
    describe('App', () => {
      it('deve renderizar a página index ', () => {
        const req = {};
        const res = {
          render: (view) => {
            expect(view).to.equal('index');
          },
        };
        app.get('/', (req, res));
      });
  
      it('deve renderizar a página de cadastrar', () => {
        const req = {};
        const res = {
          render: (view) => {
            expect(view).to.equal('cadastrar');
          },
        };
        app.get('/cadastrar', (req, res));
      });
    });
  });