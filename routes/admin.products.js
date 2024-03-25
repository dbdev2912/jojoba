const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')


router.get('/', (req, res) => {



    res.render('admin_p_products', {
        layout: "admin",
        title: COMPANY,
        auth: req.session.auth,
    })
})


module.exports = router;