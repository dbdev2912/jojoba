const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')
const { COMPANY, DESCRIPTIONS, KEYWORDS } = require('../configs/enum')
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

    const descriptions = [
        ...DESCRIPTIONS,
        "130B2 KV2, P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ"
    ]

    const keywords = [
        ...KEYWORDS,
        "bàn cầu", "lavabo", "bồn tắm", "sen tắm", "gương soi"
    ]

    res.render('contact', {
        title: `Liên hệ | ${ COMPANY }`,
        auth: req.session.auth,
        previousPages,
        lastPage,
        cates,

        DESCRIPTION: descriptions.join(','),
        KEYWORDS: keywords.join(','),

    });
});

module.exports = router;