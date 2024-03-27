const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
const functions = require('../configs/functions')
// Routing 


router.get('/no-privileged', (req, res) => {

    /**
     * 
     *  URL: "/admin/e/no-privileged"
     * 
     */

    res.render('admin_403_forbidden', {
        layout: "admin",
        title: `403 - Forbidden | ${COMPANY }`,
    });
});


router.get('/not-found', (req, res) => {

    /**
     * 
     *  URL: "/admin/e/not-found"
     * 
     */

    res.render('admin_404_not_found', {
        layout: "admin",
        title: `404 - Not found| ${COMPANY }`,
    });
});




module.exports = router;


