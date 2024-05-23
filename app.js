const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const compression=require('compression')
app.use(compression())
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})
require('dotenv').config()
const path=require('path');
const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const fetchProducts = require('./views/api/fetchProducts')
const fetchProductsId = require('./views/api/fetchProductsId');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');


//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs'); // extensão dos arquivos
app.set('views', __dirname + '/views/pages'); //onde estão os arquivos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

let a = db.collection('users')
app.post('/data', async (req,res) => {
let docRef = a.doc(req.body.user.name)
await docRef.set({
    name: req.body.user.name,
    photoUrl: req.body.user.photoUrl,
});
    res.send('done');
})

app.post('/upload',upload.single('file'),async(req,res)=>{
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    const fileName = name + path.extname(req.file.originalname)
    await app.storage.file(fileName).createWriteStream().end(req.file.buffer)
    res.send('done');
  })


//configurar o estilo que esta na public
app.use(express.static('public'));

//configurar bodyParser do formulario
app.use(bodyParser.urlencoded({extended: true}));

//rota principal 
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
})

app.get('/conta', (req, res) => {
    res.render('conta')
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
    if (user) {
        const produtos = await fetchProducts('pão');
        res.render('home', { user: user, produtos });
    } else {
        res.redirect('/');
    }
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const produtos = await fetchProducts('pão');
    const produto = produtos.find(p => p.id === parseInt(id));
    
    res.render('products', { produto: produto }); 
  });


   
//subir servidor
app.listen(port, () =>{
    console.log('Servidor rodando na porta', port)
})