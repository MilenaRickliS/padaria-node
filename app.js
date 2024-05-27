const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Importando as bibliotecas de sessões e cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
//configurar o uso da biblioteca cookie-parser
app.use(cookieParser());

const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const fetchProducts = require('./views/api/fetchProducts')

const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');


//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs'); // extensão dos arquivos
app.set('views', __dirname + '/views/pages'); //onde estão os arquivos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// //configurar o uso da biblioteca cookie-parser
// app.use(cookieParser());

//configurar a sessão 
app.use(
    session({
        secret: 'minhachave', //chave para assinar os cookies da sessão
        resave: false, //evitar de regravar as sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas (anônimas)
    })
);


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

// let a = db.collection('users')
// app.post('/data', async (req,res) => {
// let docRef = a.doc(req.body.user.name)
// await docRef.set({
//     name: req.body.user.name,
//     photoUrl: req.body.user.photoUrl,
// });
//     res.send('done');
// })

// app.post('/upload',upload.single('file'),async(req,res)=>{
//     const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
//     const fileName = name + path.extname(req.file.originalname)
//     await app.storage.file(fileName).createWriteStream().end(req.file.buffer)
//     res.send('done');
//   })


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
app.get('/products', (req, res) => {
    res.render('products')
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

const formatCurrency = (price, currency) => {
    // implement your currency formatting logic here
    return `R$ ${price.toFixed(2)}`;
  };
  
  const cartItems = []; // your cart items data
  const isCartVisible = true; // your cart visibility flag
  
  app.get('/cart', (req, res) => {
    const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);
    res.render('cart', { cartItems, isCartVisible, totalPrice, formatCurrency });
  });
  
  app.post('/remove-item', (req, res) => {
    const itemId = req.body.id;
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    cartItems = updatedCartItems;
    res.redirect('/cart');
  });
 
  app.post('/add-to-cart', async (req, res) => {
    const p = await fetchProducts('pão');
    const productId = req.body.productId;
    const product = p.find(p => p.id === productId);
    // const product = pp.find(p => p.id === pp.id);
  
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({ id: productId, quantity: 1 });
    }
  
    res.redirect('/cart');
  });

   
//subir servidor
app.listen(port, () =>{
    console.log('Servidor rodando na porta', port)
})





