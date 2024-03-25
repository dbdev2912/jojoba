const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')
const { COMPANY } = require('../configs/enum')
// Routing 
router.get('/', (req, res) => {

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

    res.render('contact', {
        title: `Liên hệ | ${ COMPANY }`,
        auth: req.session.auth,
        previousPages,
        lastPage
        
    });
});

module.exports = router;