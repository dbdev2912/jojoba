const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');

const { COMPANY } = require('../configs/enum')

// Routing 
router.get('/', async (req, res) => {

    // const newProducts = [
    //     {
    //         image: "img/product/product-1.jpg",
    //         product_name: "Buttons tweed blazer",
    //         price: "5900000",
    //         sale_price: "4800000",
    //         stars: 5,
    //         is_sale: true,
    //         is_new: true
    //     },
    // ]

    const newProducts = await MySQL_QUERY(`
        SELECT
            ma_san_pham AS product_id,
            ten_san_pham AS product_name,
            gia AS price,
            dang_giam_gia AS is_sale,
            san_pham_moi AS is_new,
            IF( dang_giam_gia = 1, gia * phan_tram_giam / 100, 0) AS sale_price,
            anh_dai_dien AS image,
            5 AS stars
        FROM SANPHAM 
        WHERE loai_san_pham = 'ban-cau'
        LIMIT 8
    `)

    const keys = [
        {name: "ban-cau", label: "Bàn cầu" }, 
        {name: "bon-tam", label: "Bồn tắm" }, 
        {name: "lavabo", label: "Lavabo" }, 
        {name: "guong-soi", label: "Gương soi" }, 
        {name: "sen-tam", label: "Sen tắm" }, 

    ]

    const data = await Promise.all( keys.map( key => {
        const { name } = key
        return MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                IF( dang_giam_gia = 1, gia * phan_tram_giam / 100, 0) AS sale_price,
                anh_dai_dien AS image,
                5 AS stars,
                loai_san_pham
            FROM SANPHAM 
            WHERE loai_san_pham = '${ name }'
            LIMIT 8
        `)
        
    }) )

    const hotProductOptions = []

    for( let i = 0; i < keys.length; i++ ){
        const { name, label } = keys[i];
        const clone = {
            name, label,
            products: []
        }
        for( let j = 0 ; j < data.length; j++ ){
            const firstItem = data[j][0]
            if( firstItem ){
                const { loai_san_pham } = firstItem
                if( loai_san_pham == name ){
                    clone.products = data[j]
                }
            }
        }
        hotProductOptions.push( clone )
    }

    const trendingItems = [
        { 
            title: "Mới",
            ids: [ "LB-T21", "LB-T23", "LB-T07" ],            
        },
        { 
            title: "Bán chạy",
            ids: [  "GĐL-04", "GDDB-13", "GĐL-11" ],            
        },
        { 
            title: "Phụ kiện",
            ids: [ "HG01-304", "RT-G1", "LV-02" ],            
        },
    ]

    const trendingProducts_id = []
    for( let i = 0 ; i < trendingItems.length; i++ ){
        trendingProducts_id.push( ...trendingItems[i].ids )        
    }

    const rawTrendingProducts = await MySQL_QUERY(`
        SELECT 
            ma_san_pham AS product_id,
            ten_san_pham AS product_name,
            anh_dai_dien AS image,
            gia AS price,
            5 AS stars
        FROM SANPHAM 
        WHERE ma_san_pham IN (${ trendingProducts_id.map(id => `'${ id }'`).join(',') })
    `)

    for( let i = 0 ; i < trendingItems.length; i++ ){
        const { ids } = trendingItems[i]
        const correspondingProducts = rawTrendingProducts.filter( product => ids.indexOf( product.product_id )!= -1 )
        trendingItems[i].items = correspondingProducts
    }    


    

    // const trendingItems = [
    //     {
    //         title: "Mới",
    //         items: [
    //             { product_name: "Chain bucket bag", image: "img/trend/ht-1.jpg", image_alt: "", price: 5900000, stars: 5 },
    //             { product_name: "Predant earings", image: "img/trend/ht-2.jpg", image_alt: "", price: 5900000, stars: 5 },
    //             { product_name: "Cotton T-shirt", image: "img/trend/ht-3.jpg", image_alt: "", price: 5900000, stars: 5 },
    //         ]
    //     },
    // ]

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('index', {
        title: COMPANY,
        auth: req.session.auth,
        active_position: 0, 

        cates,
        products: newProducts,
        hotProductOptions,
        trending: trendingItems
    });
});






module.exports = router;


