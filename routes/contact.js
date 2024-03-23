const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

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
        title: "Liên hệ | Cửa hàng Xuân Dũng",
        previousPages,
        lastPage
    });
});

module.exports = router;