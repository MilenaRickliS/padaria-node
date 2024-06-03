import('chai').then(({ expect }) => {
    const app = require('./app');
    const nock = require('nock');
  
    describe('App', () => {
      it('should render home page with posts', () => {
        const req = {};
        const res = {
          render: (view, data) => {
            expect(view).to.equal('home');
            expect(data.posts).to.be.an('array');
          },
        };
        nock('http://localhost:8000')
          .get('/pao')
          .reply(200, [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
        app.get('/home', (req, res));
      });
    });
  });