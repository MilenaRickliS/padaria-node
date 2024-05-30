const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs'); // extensão dos arquivos
app.set('views', __dirname + '/views/pages'); //onde estão os arquivos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//configurar o estilo que esta na public
app.use(express.static('public'));
//configurar bodyParser do formulario
app.use(bodyParser.urlencoded({extended: true}));


//Importando as bibliotecas de sessões e cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
//configurar o uso da biblioteca cookie-parser
app.use(cookieParser());
//configurar a sessão 
app.use(
    session({
        secret: 'minhachave', //chave para assinar os cookies da sessão
        resave: false, //evitar de regravar as sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas (anônimas)
    })
);

const axios = require('axios');
// const fetchProducts = require('./views/api/fetchProducts')
// URL da API que queremos acessar
const url = 'http://localhost:8080/pao';
axios.get(url)
.then(response => {
    // Tratamento bem-sucedido da resposta
    // console.log(response.data);
    console.log('sucesso')
})
.catch(error => {
    // Tratamento de erro
    console.error(`Erro ao acessar a API: ${error}`);
});


const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCpJbL-v5bvJDSAfhDSqhvNw--ScMZujvs",
    authDomain: "persistencia-ec152.firebaseapp.com",
    projectId: "persistencia-ec152",
    storageBucket: "persistencia-ec152.appspot.com",
    messagingSenderId: "835629827698",
    appId: "1:835629827698:web:306647a1e1df9782e024eb"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

//rota principal 
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
})

app.get('/conta', (req, res) => {
    const user = auth.currentUser;
    res.render('conta', {user: user})
})  


app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
        res.redirect('/');
    }
});
app.post('/cadastrar', async (req, res) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
        res.redirect('/cadastrar');
    }
});

app.get('/home', async (req, res) => {
    const user = auth.currentUser;
    console.log(user); 
    const url = "http://localhost:8080/pao"; // Exemplo de URL da API
    const response = await axios.get(url);
    const posts = response.data;
    if (user) {
        req.session.carrinho = req.session.carrinho || [];
        res.render('home', { posts , carrinho: req.session.carrinho });
    } else {
        res.redirect('/');
    }
});

//rota para adicionar produtos no carrinho 
app.get('/adicionar/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const url = "http://localhost:8080/pao"; // Exemplo de URL da API
    const response = await axios.get(url);
    const posts = response.data;
    const produto = posts.find((p) => p.id === id);
    

    if(produto){
        if(!req.session.carrinho){
            req.session.carrinho = []
        }
        req.session.carrinho.push(produto);
    }
    res.redirect('/home');
})

app.get('/remover/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carrinho = req.session.carrinho || [];
  
    const indice = carrinho.findIndex((produto) => produto.id === id);
    if (indice !== -1) {
      carrinho.splice(indice, 1);
    }
  
    res.redirect('/carrinho');
  });

app.get('/carrinho', (req, res) => {
    const carrinho = req.session.carrinho || [];
    const total = carrinho.reduce((acc, produto) => acc + produto.price, 0);
  
    res.render('carrinho', { carrinho, total });
});
   
//subir servidor
app.listen(port, () =>{
    console.log('Servidor rodando na porta', port)
})





