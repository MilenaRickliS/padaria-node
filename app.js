const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const uuid = require('uuid');

//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs'); 
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
const url = 'http://localhost:8000/pao';
axios.get(url)
.then(response => {
    console.log('sucesso');
})
.catch(error => {
    console.error(`Erro ao acessar a API: ${error}`);
});



const {addDoc, collection,doc, getDocs, getDoc, updateDoc, deleteDoc, setDoc} = require('firebase/firestore');

const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
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


//rota principal 
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
})

app.get('/conta', (req, res) => {
    const user = auth.currentUser;
    if (user) {
        req.session.carrinho = req.session.carrinho || [];
        res.render('conta', { user: user, carrinho: req.session.carrinho });
    } else {
        res.redirect('/');
    }
})  

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); 
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
        res.redirect('/');
    }
});
app.post('/cadastrar', async (req, res) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); 
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
        res.redirect('/cadastrar');
    }
});

app.get('/home', async (req, res) => {
    const user = auth.currentUser;
    console.log(user); 
    const url = "http://localhost:8000/pao"; 
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
    const url = "http://localhost:8000/pao"; 
    const response = await axios.get(url);
    const posts = response.data;
    const produto = posts.find((p) => p.id === id);
    

    if(produto){
        if(!req.session.carrinho){
            req.session.carrinho = [];
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


app.get('/finalizar', async (req, res) => {
    const enderecoRef = collection(db, 'end');
    const pagamentoRef = collection(db, 'pagamento');
  
    const enderecoSnapshot = await getDocs(enderecoRef);
    const pagamentoSnapshot = await getDocs(pagamentoRef);
  
    const enderecoData = enderecoSnapshot.docs.map((doc) => doc.data());
    const pagamentoData = pagamentoSnapshot.docs.map((doc) => doc.data());
  
    res.render('finalizar', { endereco: enderecoData, pagamento: pagamentoData });
  });


let pagamento = [];
let endereco = [];

app.post('/finalizar', async (req, res) => {
  const {nome,cep, estado, cidade, rua, numero, complemento, telefone} = req.body;
  const id = uuid.v4();
  const enderecoRef = doc(collection(db, 'end'), id);
  await setDoc(enderecoRef, {id, nome, cep, estado, cidade, rua, numero, complemento, telefone});
  endereco.push({ id, nome, cep, estado, cidade, rua, numero, complemento, telefone});
  res.redirect('/finalizar');
})

app.get('/delete/:id', async (req, res) => {  
    const id = req.params.id;  
    const enderecoRef = doc(db, 'end', id);
    const enderecoDoc = await getDoc(enderecoRef);
    if (enderecoDoc.exists()) {
      await deleteDoc(enderecoRef);
      const indice = endereco.findIndex((endereco) => endereco.id === id);
      endereco.splice(indice, 1);
      res.redirect('/finalizar');
    } else {
      res.status(404).send('Endereço não encontrado');
    }
  })
  app.get('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const enderecoRef = doc(db, 'end', id);
    const enderecoDoc = await getDoc(enderecoRef);
    if (enderecoDoc.exists()) {
      const enderecoData = enderecoDoc.data();
      res.render('editar-endereco', { endereco: enderecoData });
    } else {
      res.status(404).send('Endereço não encontrado');
    }
  });
  
  app.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const enderecoRef = doc(db, 'end', id);
    const enderecoDoc = await getDoc(enderecoRef, id);
    if (enderecoDoc.exists()) {
      const { nome, cep, estado, cidade, rua, numero, complemento, telefone } = req.body;
      await updateDoc(enderecoRef, {
        nome,
        cep,
        estado,
        cidade,
        rua,
        numero,
        complemento,
        telefone,
      });
      res.redirect('/finalizar');
    } else {
      res.status(404).send('Endereço não encontrado');
    }
  });


// Rota para processar o formulário
// app.post('/pagamento', async (req, res) => {
//     const forma = req.body;
//     forma.nome = req.body.forma; 
//     await addDoc(collection(db, 'pagamento'), forma);
//     pagamento.push(forma);
//     res.redirect('/finalizar');
//   })
app.post('/pagamento', async (req, res) => {
    const forma = req.body;
    const id = uuid.v4();
    const pagamentoRef = doc(collection(db, 'pagamento'), id);
    await setDoc(pagamentoRef, {id, forma});
    pagamento.push({ id, forma });
    res.redirect('/finalizar');
})
app.get('/deletePagamento/:id', async (req, res) => {  
    const id = req.params.id;  
    const pagamentoRef = doc(db, 'pagamento', id);
    const pagamentoDoc = await getDoc(pagamentoRef);
    if (pagamentoDoc.exists()) {
      await deleteDoc(pagamentoRef);
      const indice = pagamento.findIndex((pagamento) => pagamento.id === id);
      pagamento.splice(indice, 1);
      res.redirect('/finalizar');
    } else {
      res.status(404).send('forma de pagamento não encontrada');
    }
  })
  app.get('/editarPagamento/:id', async (req, res) => {
    const id = req.params.id;
    const pagamentoRef = doc(db, 'pagamento', id);
    const pagamentoDoc = await getDoc(pagamentoRef);
    if (pagamentoDoc.exists()) {
      const pagamentoData = pagamentoDoc.data();
      res.render('editar-pagamento', { pagamento: pagamentoData });
    } else {
      res.status(404).send('Forma de pagamento não encontrado');
    }
  });
  
  app.post('/editarPagamento/:id', async (req, res) => {
    const id = req.params.id;
    const pagamentoRef = doc(db, 'pagamento', id);
    const pagamentoDoc = await getDoc(pagamentoRef);
    if (pagamentoDoc.exists()) {
      const pagamentoData = pagamentoDoc.data();
      pagamentoData.forma.forma = req.body.forma;
      await updateDoc(pagamentoRef, pagamentoData);
      res.redirect('/finalizar');
    } else {
      res.status(404).send('Forma de pagamento não encontrado');
    }
  });

app.listen(port, () =>{
    console.log('Servidor rodando na porta', port)
})





