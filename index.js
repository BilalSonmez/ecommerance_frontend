const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const products = require('./routers/products');
const auth = require('./routers/auth');
const collection = require('./routers/collection');

const app = express();

app.use(session({
    secret: 'ETGizeDAZ6JcWrDeG7aI4IrOPZ5W1fCP',
    resave: false,
    saveUninitialized: true,
}));
// Express templatesi
app.engine('.ejs', ejs.__express);
app.set('views', `${__dirname}/views`);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route yapıları
app.get('/', (req, res) => {
    const sess = req.session;
    res.render('./index.ejs', {
        title: 'Challange E-Commerance',
        userData: typeof sess.userData !== 'undefined' ? sess.userData : false,
    });
});
app.use('/product', products);
app.use('/user', auth);
app.use('/collection', collection);

app.listen(8000, () => {
    console.log('Started on 8000 Port');
});
