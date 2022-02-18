const axios = require('axios');
const express = require('express');
const { baseApiUrl } = require('../config/var');

const router = express.Router();

router.post('/create', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        res.writeHead(302, {
            Location: '/',
        });
        res.end();
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    const data = {
        title: req.body.title,
        contentLink: req.body.contentLink,
        ownerId: sess.userData.user._id,
        products: [],
    };

    axios.post(`${baseApiUrl}/api/collection/add`, data, { headers }).then((response) => {
        const result = response.data;
        if (result.status) {
            res.writeHead(302, {
                Location: '/user/profile/',
            });
            res.end();
        }
    }).catch(() => {
    });
});

router.post('/update', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        res.writeHead(302, {
            Location: '/',
        });
        res.end();
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    const data = {
        title: req.body.title,
        contentLink: req.body.contentLink,
    };

    axios.post(`${baseApiUrl}/api/collection/update/${req.body.collectionId}`, data, { headers }).then((response) => {
        const result = response.data;
        if (result.status) {
            res.writeHead(302, {
                Location: `/collection/${req.body.contentLink}`,
            });
            res.end();
        }
    })
        .catch(() => {
        });
});

router.post('/delete', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        res.writeHead(302, {
            Location: '/',
        });
        res.end();
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    axios.post(`${baseApiUrl}/api/collection/delete/${req.body.collectionId}`, {}, { headers }).then((response) => {
        const result = response.data;
        if (result.status) {
            return res.send({ status: result.status });
        }
        return res.status(404).send('Not Found');
    })
        .catch((error) => {
            console.log(error);
            return res.status(404).send('Not Found');
        });
});

router.post('/addItem', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        return res.send({ status: false });
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    return axios.post(
        `${baseApiUrl}/api/collection/add/${req.body.collectionId}`,
        { productId: req.body.productId },
        { headers },
    ).then(() => res.send({ status: true })).catch(() => res.send({ status: false }));
});

router.post('/removeItem', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        return res.send({ status: false });
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    return axios.post(
        `${baseApiUrl}/api/collection/remove/${req.body.collectionId}`,
        { productId: req.body.productId },
        { headers },
    ).then(() => res.send({ status: true })).catch(() => res.send({ status: false }));
});

router.get('/:slug', (req, res) => {
    const sess = req.session;
    if (typeof sess.userData === 'undefined') {
        return res.status(404).send('Not Found');
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sess.userData.token}`,
    };

    return axios.get(`${baseApiUrl}/api/collection/get/${req.params.slug}`, { headers }).then((response) => {
        const result = response.data;
        return res.render('./collection.ejs', {
            title: result.title,
            collection: result,
            userData: typeof sess.userData !== 'undefined' ? sess.userData : false,
        });
    })
        .catch((error) => {
            console.log(error);
            return res.send(404, 'Not Found');
        });
});

module.exports = router;
