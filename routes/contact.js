const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')
const { COMPANY } = require('../configs/enum')
const MySQL_QUERY = require('../db/connector')

// Routing 
router.get('/', async (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },        
    ]

    const lastPage = {
        name: "Liên hệ",
    }

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('contact', {
        title: `Liên hệ | ${ COMPANY }`,
        auth: req.session.auth,
        previousPages,
        lastPage,
        cates,
    });
});

module.exports = router;