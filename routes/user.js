const express = require('express');
const router = express.Router(); 

// Routing 
router.get('/cart', (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },            
    ]

    const lastPage = {
        name: "Giỏ hàng",
    }


    const cart = [
        {
            product_name: "Chain bucket bag",
            image: "/img/shop-cart/cp-1.jpg",
            price: 1700000,
            quantity: 2,
            start: 5            
        },
        {
            product_name: "Zip-pockets pebbled tote briefcase",
            image: "/img/shop-cart/cp-2.jpg",
            price: 1000000,
            quantity: 1,
            start: 5            
        },
        {
            product_name: "Black jean",
            image: "/img/shop-cart/cp-3.jpg",
            price: 2000000,
            quantity: 3,
            start: 5         
        },
    ]


    res.render('cart', {
        title: "Giỏ hàng | Cửa hàng Xuân Dũng",
        previousPages,
        lastPage,
        cart,

    });
});


router.get('/checkout', (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Giỏ hàng",
            url: "/u/cart",            
        },
    ]

    const lastPage = {
        name: "Thanh toán",
    }

    const cart = [
        {
            product_name: "Chain bucket bag",
            image: "/img/shop-cart/cp-1.jpg",
            price: 1700000,
            quantity: 2,
            start: 5, 
            subtotal: 1700000 * 2
        },
        {
            product_name: "Zip-pockets pebbled tote briefcase",
            image: "/img/shop-cart/cp-2.jpg",
            price: 1000000,
            quantity: 1,
            start: 5,    
            subtotal: 1000000 * 1            
        },
        {
            product_name: "Black jean",
            image: "/img/shop-cart/cp-3.jpg",
            price: 2000000,
            quantity: 3,
            start: 5,   
            subtotal: 2000000 * 3             
        },
    ]
    const total = cart.reduce((acc, curr) => acc + curr.subtotal, 0)

    res.render('checkout', {
        title: "Thanh toán | Cửa hàng Xuân Dũng",
        previousPages,
        lastPage,
        cart,
        total
    });
});


router.get('/login', (req, res) => {

    res.render('login')   
})

router.get('/signup', (req, res) => {  

    

    res.render('signup')   
})




module.exports = router;