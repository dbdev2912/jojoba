const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
// Routing 
router.get('/', (req, res) => {


    const categoriesFilter = [
        {
            name: "Women",
            id: "category_1",
            active: "active",
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
        title: `Sản phẩm | ${ COMPANY }`,
        filter: categoriesFilter,
        previousPages,
        lastPage,
        auth: req.session.auth,

        
        products,
    })
});


router.get('/p/:product_id', (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sảm phẩm",
            url: "/products",            
        },
    ]

    

    const product = {
        product_id: "LB-210",
        product_name: "Joboba smart toilet",
        rating: 5,
        brand_id: 0,
        brand_name: "Jojoba taiwan",
        price: 8300000,
        sale_price: 7900000,
        availability: true,
        instroducing: "Đây là phần giới thiệu tổng quan về sản phẩm.",
        description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret. Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla consequat massa quis enim.

            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`,

        specification: `Thông số kĩ thuật`,
        preview: [],
        is_new: false,
        is_sale: false,
        in_stock: true
    }

    const lastPage = {
        name: `${product.product_name} ${product.product_id}`
    }

    const relatives = [
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
    ]

    res.render('product', {
        title: `${product.product_id} | ${product.product_name} | ${ COMPANY }`,
        previousPages,
        lastPage,
        auth: req.session.auth,

        
        product,
        relatives
    })
})



module.exports = router;
