const express = require('express');
const router = express.Router();

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ROLES, ADMIN } = require('../configs/enum')



router.get('/initial-info', async (req, res) => {

    /**
     * 
     *  URL: "/api/admin/product/initial-info"
     * 
     * 
     */


    const context = {
        success: true,
        content: "Successfully retrieve data",
        data: {}
    }

    const queries = {
        types: `
            SELECT * FROM LOAISANPHAM
        `,
        groups: `
            SELECT * FROM NHOMSANPHAM
        `,
    };

    const [ types, groups ] = await Promise.all([
        MySQL_QUERY(queries.types),
        MySQL_QUERY(queries.groups),
    ])
    
    context.data = {
        types,
        groups,
    }

    res.send(context)
})


module.exports = router