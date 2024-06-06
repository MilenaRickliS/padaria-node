import('chai').then(({ expect }) => {
    const app = require('../app');
    const nock = require('nock');
  
    describe('app', () => {
      it('deve renderizar a página inicial com posts', () => {
        const req = {};
        const res = {
          render: (views, data) => {
            expect(views).to.equal('home');
            expect(data.posts).to.be.an('array');
          },
        };
        nock('http://localhost:8000')
          .get('/pao')
          .reply(200, [
            {
              id: 1,
              name: "Pão Italiano",
              image: "https://pubimg.band.uol.com.br/files/91cfe899a8842aec1cc7.png",
              price: 15
          },
          {
              id: 2,
              name: "Pão Mandioquinha",
              image: "https://cknj.com.br/teste/wp-content/uploads/2022/06/Pao-Mandioquinha-01-1536x1154.jpg",
              price: 15
          },
          {
              id: 3,
              name: "Pão Francês",
              image: "https://conteudo.imguol.com.br/c/entretenimento/45/2020/10/19/pao-frances---dona-deola-1603113166267_v2_300x400.jpg",
              price: 0.5
          },
          {
              id: 4,
              name: "Pão Multigrão",
              image: "https://www.receitasagora.com.br/wp-content/uploads/2021/05/receita-de-pao-multigraos-1-430x305.jpg",
              price: 11
          },
          {
              id: 5,
              name: "Pão Integral",
              image: "https://saborecia.com.br/wp-content/uploads/2020/07/pao-integral.jpg",
              price: 11
          },
          {
              id: 6,
              name: "Pão de Linho",
              image: "https://melepimenta.com/wp-content/uploads/2024/02/Receita-pao-forma-integral-Baixa-5.jpg",
              price: 9
          },
          {
              id: 7,
              name: "Pão Caseiro",
              image: "https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,w=640,h=360,fit=cover/wp-content/uploads/2019/08/paocaseiro-910x607.jpg",
              price: 4.5
          },
          {
              id: 8,
              name: "Pão de Forma",
              image: "https://panutti.com.br/resize/imagecache//d40af2ce78d32f5af427587c80c12a5e.JPG",
              price: 4.5
          },
          {
              id: 9,
              name: "Pão Centeio",
              image: "https://www.italianinhoalimentos.com.br/wp-content/uploads/2018/10/pao-centeio.jpg",
              price: 4.5
          },
          {
              id: 10,
              name: "Pão Ciabatta",
              image: "https://www.confeiteiradesucesso.com/wp-content/uploads/2019/03/paociabattarceita56.jpg.webp",
              price: 11
          }
          ]);
        app.get('/home', (req, res));
      });
    });
  });