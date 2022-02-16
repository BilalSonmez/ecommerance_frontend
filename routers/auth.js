const axios = require('axios');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');

// Giriş Sayfası
router.get('/login', async (req, res) => {
    res.render('./login.ejs', {
        title: 'Challange Login',
        message: ""
    });
});

// Giriş sayfası POST *
router.post('/login', function (req, res) {
    axios.post(baseApiUrl + '/api/auth', req.body).then(function (response){
        var result = response.data;
        if (result.status) {
            req.session.tokenStr = result.token;
            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
        } else {
            res.render('./login.ejs', {
                title: 'Challange Login',
                message: "Error! E-Mail & Password Incorrect"
            });
        }
    }).catch(function(error) {
        res.render('./login.ejs', {
            title: 'Challange Login',
            message: "Error! E-Mail & Password Incorrect"
        });
    });
});

// Kayıt Sayfası
router.get('/register', async (req, res) => {
    res.render('./register.ejs', {
        title: 'Challange Register'
    });
});

module.exports = router;