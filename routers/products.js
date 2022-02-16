const https = require('https');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');

//Ürünlerin API aracılığıyla sayfaya çekilmesi
router.get('/', async (req, res) => {
    let product = [];
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
    });
});

//Ürünün API aracılığıyla sayfaya çekilmesi
router.get('/:slug', async (req, res) => {
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