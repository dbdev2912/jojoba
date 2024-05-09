const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');

const { COMPANY, DESCRIPTIONS, KEYWORDS, RECORDS_PER_PAGE } = require('../configs/enum')


router.get('/', async (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        }        
    ]

    const lastPage = { name: "Tìm kiếm" }

    const { query } = req.query;
    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)
    
    const countString = `
        SELECT
            COUNT(*) AS total
        FROM SANPHAM AS S
            LEFT JOIN DONGSANPHAM AS D ON  S.dong_san_pham = D.ma_dong
                LEFT OUTER JOIN LOAISANPHAM AS L ON S.loai_san_pham = L.ma_loai
                    LEFT OUTER JOIN NHOMSANPHAM AS N ON S.nhom_san_pham = N.ma_nhom
                        LEFT OUTER JOIN THUONGHIEU AS T ON S.thuong_hieu = T.ma_thuong_hieu
        WHERE
            ma_san_pham LIKE '%${query}%' OR
            ten_san_pham LIKE '%${query}%' OR 
            ten_dong LIKE '%${query}%' OR 
            ten_loai LIKE '%${query}%' OR 
            ten_nhom LIKE '%${query}%' OR 
            ten_thuong_hieu LIKE '%${query}%' 
    `
    const rawTotal = await MySQL_QUERY(countString)    
    const total = rawTotal[0] ? rawTotal[0].total : 0

    const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

    const queryString = `
        SELECT
            ma_san_pham AS product_id,
            ten_san_pham AS product_name,
            gia AS price,
            if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
            dang_giam_gia AS is_sale,
            san_pham_moi AS is_new,
            (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
            anh_dai_dien AS image,
            5 as stars,        
            ten_dong,
            ten_loai,
            ten_nhom,
            ten_thuong_hieu
        FROM SANPHAM AS S
            LEFT JOIN DONGSANPHAM AS D ON  S.dong_san_pham = D.ma_dong
                LEFT OUTER JOIN LOAISANPHAM AS L ON S.loai_san_pham = L.ma_loai
                    LEFT OUTER JOIN NHOMSANPHAM AS N ON S.nhom_san_pham = N.ma_nhom
                        LEFT OUTER JOIN THUONGHIEU AS T ON S.thuong_hieu = T.ma_thuong_hieu
        WHERE
            ma_san_pham LIKE '%${query}%' OR
            ten_san_pham LIKE '%${query}%' OR 
            ten_dong LIKE '%${query}%' OR 
            ten_loai LIKE '%${query}%' OR 
            ten_nhom LIKE '%${query}%' OR 
            ten_thuong_hieu LIKE '%${query}%' 

    `;

    const products = await MySQL_QUERY(queryString)        
    console.log(products)
    res.render('search', {
        auth: req.session.auth,
        title: `Chính sách | ${ COMPANY }`,
        products,
        previousPages,
        lastPage,
        query,   
        total,
        cates,
        
        paginate: {
            pageIndex: 1,
            maxPageIndex,
            origin: "/search",
            query: req.query.query
        },
    })

})

module.exports = router;