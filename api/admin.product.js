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
        products: `SELECT 
            ma_san_pham AS product_id,
            ten_san_pham AS product_name,
            anh_dai_dien AS image,
            gia AS price,
            dong_san_pham AS cate,
            loai_san_Pham AS type,
            nhom_san_pham AS grou_p
        FROM SANPHAM
        `,
    };

    const [ types, groups, products ] = await Promise.all([
        MySQL_QUERY(queries.types),
        MySQL_QUERY(queries.groups),
        MySQL_QUERY(queries.products)
    ])
    
    context.data = {
        types,
        groups,
        products
    }

    res.send(context)
})


module.exports = router