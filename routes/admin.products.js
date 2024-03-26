const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')


router.get('/', (req, res) => {

    const products = [
        {
            
            index: 1,
            product_id: "BC - 01",
            image: "/img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,            
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_sale: true,
            is_new: true
        },
        {
            index: 2,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_new: true,
        },
        {
            index: 3,
            product_id: "BC - 01",
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_sale: true,
        },
        {
            index: 4,
            product_id: "BC - 01",
            image: "/img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 5,
            product_id: "BC - 01",
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 6,
            product_id: "BC - 01",
            image: "/img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 7,
            product_id: "BC - 01",
            image: "/img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
        },
        {
            index: 8,
            product_id: "BC - 01",
            image: "/img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 9,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_new: true,
        },
        {
            index: 10,
            product_id: "BC - 01",
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 11,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_new: true,
        },
        {
            index: 12,
            product_id: "BC - 01",
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_sale: true,
        },
    ]

    res.render('admin_p_products', {
        layout: "admin",
        title: `Sản phẩm | ${COMPANY}`,
        auth: req.session.auth,
        products
    })
})



router.get('/new', (req, res) => {


    res.render('admin_p_add', {
        layout: "admin",
        title: `Thêm sản phẩm | ${ COMPANY }`,
        auth: req.session.auth,

    })
})




module.exports = router;