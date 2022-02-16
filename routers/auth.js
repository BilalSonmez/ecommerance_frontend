const https = require('https');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');

router.get('/login', async (req, res) => {
    //https://damp-reaches-15702.herokuapp.com
    /*let product = [];
    https.get(baseApiUrl + "/api/product/list", function(resp){
        var body = '';
    
        resp.on('data', function(chunk){
            body += chunk;
        });
    
        resp.on('end', function(){
            product = JSON.parse(body);
            res.render('./products.ejs', {
                title: 'Challange Products',
                product: product
            });
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });*/

    res.render('./login.ejs', {
        title: 'Challange Products'
    });
});

router.get('/register', async (req, res) => {
    //https://damp-reaches-15702.herokuapp.com
    let product = [];
    https.get(baseApiUrl + "/api/product/get/" + req.params.slug, function(resp){
        var body = '';
    
        resp.on('data', function(chunk){
            body += chunk;
        });
    
        resp.on('end', function(){
            product = JSON.parse(body);
            res.render('./details.ejs', {
                title: product.title,
                product: product
            });
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});

module.exports = router;