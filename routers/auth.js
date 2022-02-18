const axios = require('axios');
const express = require('express');
const { baseApiUrl } = require('../config/var');

const router = express.Router();

router.get('/profile', async (req, res) => {
    var sess = req.session;
    if (typeof sess.userData === "undefined") {
        res.writeHead(302, {
            "Location": '/'
        });
        res.end();
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sess.userData.token
    }
      
    axios.get(baseApiUrl + '/api/collection/list', {
        headers: headers
    }).then((response) => {
        var result = response.data;
        res.render('./profile.ejs', {
            title: 'Challange Products',
            collection: result,
            userData: typeof sess.userData !== "undefined" ? sess.userData : false
        });
    })
    .catch((error) => {
    })
});

// Giriş Sayfası
router.get('/login', async (req, res) => {
    var sess = req.session;
    if (typeof sess.userData !== "undefined") {
        res.writeHead(302, {
            "Location": '/'
        });
        res.end();
    }
    res.render('./login.ejs', {
        title: 'Challange Login',
        message: "",
        userData: typeof sess.userData !== "undefined" ? sess.userData : false
    });
});

// Giriş sayfası POST *
router.post('/login', function (req, res) {
    var sess = req.session;
    if (typeof sess.userData !== "undefined") {
        res.writeHead(302, {
            "Location": '/'
        });
        res.end();
    }
    axios.post(baseApiUrl + '/api/auth', req.body).then(function (response){
        var result = response.data;
        if (result.status) {
            req.session.userData = {
                "token": result.token,
                "expires": result.expires,
                "user": result.userData
            };
            res.writeHead(302, {
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
    var sess = req.session;
    if (typeof sess.userData !== "undefined") {
        res.writeHead(302, {
            "Location": '/'
        });
        res.end();
    }
    res.render('./register.ejs', {
        title: 'Challange Register',
        message: "",
        userData: typeof sess.userData !== "undefined" ? sess.userData : false
    });
});

// Kayıt Sayfası Post
router.post('/register', function (req, res) {
    var sess = req.session;
    if (typeof sess.userData !== "undefined") {
        res.writeHead(302, {
            "Location": '/'
        });
        res.end();
    }
    axios.post(baseApiUrl + '/api/auth/register', req.body).then(function (response){
        var result = response.data;
        if (result.status) {
            res.writeHead(302, {
                'Location': '/user/login/'
            });
            res.end();
        } else {
            res.render('./register.ejs', {
                title: 'Challange Register',
                message: result.message,
                userData: typeof sess.userData !== "undefined" ? sess.userData : false
            });
        }
    }).catch(function(error) {
        res.render('./register.ejs', {
            title: 'Challange Register',
            message: "Error",
            userData: typeof sess.userData !== "undefined" ? sess.userData : false
        });
    });
});

// Çıkış Sayfası
router.get('/logout', async (req, res) => {
    var sess = req.session;
    if (typeof sess.userData === "undefined") {
        res.writeHead(302, {
            "Location": '/user/login/'
        });
        res.end();
    } else {
        req.session.destroy();
        res.writeHead(302, {
            "Location": '/user/login/'
        });
        res.end();
    }
});
module.exports = router;