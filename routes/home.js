const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')

// Routing 
router.get('/', (req, res) => {

    const newProducts = [
        {
            image: "img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5900000",
            sale_price: "4800000",
            stars: 5,
            is_sale: true,
            is_new: true
        },
        {
            image: "img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },
        {
            image: "img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_sale: true,
        },
        {
            image: "img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: "59",
            sale_price: "48",
            stars: 5,
        },

    ]

    const trendingItems = [
        {
            title: "Mới",
            items: [
                { product_name: "Chain bucket bag", image: "img/trend/ht-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Predant earings", image: "img/trend/ht-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Cotton T-shirt", image: "img/trend/ht-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
        {
            title: "Bán chạy",
            items: [
                { product_name: "Cotton T-Shirt", image: "img/trend/bs-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Zip-pockets pebbled tote", image: "img/trend/bs-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Round leather bag", image: "img/trend/bs-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
        {
            title: "Phụ kiện",
            items: [
                { product_name: "Bow wrap skirt", image: "img/trend/f-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Metallic earrings", image: "img/trend/f-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Flap cross-body bag", image: "img/trend/f-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
    ]

    res.render('index', {
        title: COMPANY,
        auth: req.session.auth,
        active_position: 0, 

        
        products: newProducts,
        trending: trendingItems
    });
});






module.exports = router;


