import('chai').then(({ expect }) => {
    const app = require('./app');
  
    describe('App', () => {
      it('should render index page', () => {
        const req = {};
        const res = {
          render: (view) => {
            expect(view).to.equal('index');
          },
        };
        app.get('/', (req, res));
      });
  
      it('should render cadastrar page', () => {
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