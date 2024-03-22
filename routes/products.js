const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

// Routing 
router.get('/', (req, res) => {
    
    const categoriesFilter = [
        {
            name: "Women",
            id: "category_1",
            options: [
                { url: "/", label: "Coats" },
                { url: "/", label: "Long" },
                { url: "/", label: "Short" },
            ]
        },
        {
            name: "Men",
            id: "category_2",
            options: [
                { url: "/", label: "Last" },
                { url: "/", label: "Chance" },
                { url: "/", label: "You surrender" },
            ]
        },
        {
            name: "Kids",
            id: "category_3",
            options: [
                { url: "/", label: "Or you die" },
                { url: "/", label: "Long" },
                { url: "/", label: "Short" },
            ]
        }
    ]

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
    ]

    const lastPage = {
        name: "Sản phẩm"
    }


    const products = [
        {
            image: "/img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5900000",
            sale_price: "4800000",
            stars: 5,
            is_sale: true,
            is_new: true
        },
        {
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },
        {
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_sale: true,
        },
        {
            image: "/img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },

    ]

    res.render('products', {
        title: "Sản phẩm | Cửa hàng Xuân Dũng",
        filter: categoriesFilter,
        previousPages,
        lastPage,
        products
    })
});






module.exports = router;
