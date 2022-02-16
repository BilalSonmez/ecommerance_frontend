const https = require('https');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');

router.get('/login', async (req, res) => {
    res.render('./login.ejs', {
        title: 'Challange Login'
    });
});

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

router.get('/register', async (req, res) => {
    res.render('./register.ejs', {
        title: 'Challange Register'
    });
});

module.exports = router;