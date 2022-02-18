const https = require('https');
const express = require('express');
const router = express.Router();
const { baseApiUrl } = require('../config/var');
const { default: axios } = require('axios');

//Ürünlerin API aracılığıyla sayfaya çekilmesi
router.get('/', async (req, res) => {
    var sess = req.session;
    axios.get(baseApiUrl + "/api/product/list").then((response) => {
        var result = response.data;
        res.render('./products.ejs', {
            title: 'Challange Products',
            product: result,
            userData: typeof sess.userData !== "undefined" ? sess.userData : false
        });
    }).catch((error) => {

    });
});

//Ürünün API aracılığıyla sayfaya çekilmesi
router.get('/:slug', async (req, res) => {
    var sess = req.session;
    var product = await getProduct(req.params.slug);
    var collection = await getCollection(sess.userData);
    if (!product) {
        res.send(404, "Not Found");
    } else {
        res.render('./details.ejs', {
            title: product.title,
            product: product,
            collection: collection,
            userData: typeof sess.userData !== "undefined" ? sess.userData : false
        });
    }
});

async function getProduct(slug) {
    var product = false;
    await axios.get(baseApiUrl + "/api/product/get/" + slug).then((response) => {
        product = response.data;
    }).catch((error) => {
        product = false;
    });
    return product;
}

async function getCollection(userData) {
    if (typeof userData === "undefined") {
        return false;
    }
    var collection = false;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.token
    }
    await axios.get(baseApiUrl + "/api/collection/list/", {
        headers: headers
    }).then((response) => {
        collection = response.data;
    }).catch((error) => {
        collection = false;
    });
    return collection;
}

module.exports = router;