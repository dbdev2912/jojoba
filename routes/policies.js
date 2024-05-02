const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');

const { COMPANY, DESCRIPTIONS, KEYWORDS } = require('../configs/enum')


router.get('/', (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        }        
    ]
    const lastPage = { name: "Chính sách" }

    res.render('policies', {
        auth: req.session.auth,
        title: `Chính sách | ${ COMPANY }`,


        previousPages,
        lastPage,
    })
})

module.exports = router;