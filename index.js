const express = require('express');
var ejs = require('ejs');
const products = require('./routers/products');
const auth = require('./routers/auth');


const app = express();
app.engine('.ejs', ejs.__express);
app.set('views', __dirname+'/views');
app.use(express.static('public'))

app.get('/', function (req, res){
    res.render('./index.ejs', {
		title: 'Challange E-Commerance',
		name: 'Kenan Atmaca',
		site: 'kenanatmaca.com',
		data: {bio:'bla bla bla...',twitter: '@uikenan', instagram: '@kenan.jpeg'}
	});
});
app.use('/product', products);
app.use('/user', auth);


app.listen(8000, function(){
    console.log("Started on 8000 Port");
});