const express = require('express');
var ejs = require('ejs');
const bodyParser = require('body-parser');
const products = require('./routers/products');
const auth = require('./routers/auth');
const session = require('express-session');


const app = express();

app.use(session({
  secret: 'ETGizeDAZ6JcWrDeG7aI4IrOPZ5W1fCP',
  resave: false,
  saveUninitialized: true
}));
// Express templatesi
app.engine('.ejs', ejs.__express);
app.set('views', __dirname+'/views');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

//Route yapıları
app.get('/', function (req, res){
    console.log(req.session.tokenStr);
    res.render('./index.ejs', {
		  title: 'Challange E-Commerance'
	});
});
app.use('/product', products);
app.use('/user', auth);


app.listen(8000, function(){
    console.log("Started on 8000 Port");
});