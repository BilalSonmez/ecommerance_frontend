const express = require('express');

const router = express.Router();
const { default: axios } = require('axios');
const { baseApiUrl } = require('../config/var');

async function getProduct(slug) {
    let product = false;
    await axios.get(`${baseApiUrl}/api/product/get/${slug}`).then((response) => {
        product = response.data;
    }).catch(() => {
        product = false;
    });
    return product;
}

async function getCollection(userData) {
    if (typeof userData === 'undefined') {
        return false;
    }
    let collection = false;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
    };
    await axios.get(`${baseApiUrl}/api/collection/list/`, {
        headers,
    }).then((response) => {
        collection = response.data;
    }).catch(() => {
        collection = false;
    });
    return collection;
}

// Ürünlerin API aracılığıyla sayfaya çekilmesi
router.get('/', async (req, res) => {
    const sess = req.session;
    axios.get(`${baseApiUrl}/api/product/list`).then((response) => {
        const result = response.data;
        res.render('./products.ejs', {
            title: 'Challange Products',
            product: result,
            userData: typeof sess.userData !== 'undefined' ? sess.userData : false,
        });
    }).catch(() => {
        res.status(404).send('Not Found');
    });
});

// Ürünün API aracılığıyla sayfaya çekilmesi
router.get('/:slug', async (req, res) => {
    const sess = req.session;
    const product = await getProduct(req.params.slug);
    const collection = await getCollection(sess.userData);
    if (!product) {
        res.send(404, 'Not Found');
    } else {
        res.render('./details.ejs', {
            title: product.title,
            product,
            collection,
            userData: typeof sess.userData !== 'undefined' ? sess.userData : false,
        });
    }
});

module.exports = router;
