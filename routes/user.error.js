const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
const functions = require('../configs/functions')
const MySQL_QUERY = require('../db/connector')
// Routing 


router.get('/no-privileged', async  (req, res) => {

    /**
     * 
     *  URL: "/admin/e/no-privileged"
     * 
     */

    const cates = await MySQL_QUERY('SELECT * FROM DONGSANPHAM')

    res.render('403_forbidden', {
        cates,
        title: `403 - Forbidden | ${COMPANY }`,
    });
});


router.get('/not-found', async (req, res) => {

    /**
     * 
     *  URL: "/admin/e/not-found"
     * 
     */
    const cates = await MySQL_QUERY('SELECT * FROM DONGSANPHAM')

    res.render('404_not_found', {   
        cates,      
        title: `404 - Not found| ${COMPANY }`,
    });
});




module.exports = router;


