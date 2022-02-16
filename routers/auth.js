const https = require('https');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');

// Giriş Sayfası
router.get('/login', async (req, res) => {
    res.render('./login.ejs', {
        title: 'Challange Login'
    });
});

// Giriş sayfası POST *
router.post('/login', async (req, res) => {
    https.post(baseApiUrl + "/api/auth/", function(resp){
        var body = '';
    
        resp.on('data', function(chunk){
            body += chunk;
        });
    
        resp.on('end', function(){
            var data = JSON.parse(body);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});

// Kayıt Sayfası
router.get('/register', async (req, res) => {
    res.render('./register.ejs', {
        title: 'Challange Register'
    });
});

module.exports = router;