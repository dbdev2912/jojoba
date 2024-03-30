const express = require('express');
const router = express.Router(); 

const { COMPANY } = require('../configs/enum')

const MySQL_QUERY = require('../db/connector')
// Routing 

router.get('/cart', async (req, res) => {
    /**
     * 
     * http://localhost:5000/u/cart
     * 
     */
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

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('cart', {
        title: `Giỏ hàng | ${ COMPANY }`,
        previousPages,
        lastPage,
        auth: req.session.auth,
        cates,


        cart,

    });
});


router.get('/checkout', async (req, res) => {

    /**
     *  http://localhost:5000/u/checkout
     * 
     * 
     */

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
    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)


    res.render('checkout', {
        title: `Thanh toán | ${ COMPANY }`,
        previousPages,
        lastPage,
        auth: req.session.auth,


        cart,
        total,
        cates
    });
});


router.get('/orders', async (req, res) => {
    /**
     * 
     * http://localhost:5000/u/orders
     * 
     */
    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },                    
    ]

    

    const lastPage = {
        name: "Lịch sử mua hàng",
    }

    const orders = [
        { 
            order_id: "DH0000001", 
            create_at: "2024-03-25T11:30:22", 
            to_address: "130B2 KV2, P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ ", 
            total: 10600000, 
            status: "Đang vận chuyển", 
            recipient: "Lê Tấn Phát" 
        },
        { 
            order_id: "DH0000001", 
            create_at: "2024-03-25T11:30:22", 
            to_address: "130B2 KV2, P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ ", 
            total: 10600000, 
            status: "Đang vận chuyển", 
            recipient: "Lê Tấn Phát" 
        },
    ]
    
    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('orders', {
        title: `Giỏ hàng | ${ COMPANY }`,
        previousPages,
        lastPage,
        auth: req.session.auth,

        orders,
        cates,
    });
});


router.get('/order/:order_id', async (req, res) => {
    /**
     * 
     * http://localhost:5000/u/order/:order_id
     * 
     */

    const { order_id } = req.params 

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },  
        {
            name: "Lịch sử mua hàng",
            url: "/u/orders",
            icon: "fa fa-home",
        },           
    ]

    const lastPage = {
        name: order_id,
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

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)
    res.render('order', {
        title: `Đơn hàng ${ order_id } | ${ COMPANY }`,
        previousPages,
        lastPage,
        auth: req.session.auth,


        cart,
        cates,
    });
});



router.get('/login', (req, res) => {
     /**
     *  URL: http://localhost:5000/u/login?error=1
     *  Các tham số hợp lệ:
     *      - error => Tài khoản hoặc mật khẩu không chính xác
     * 
     *  Nếu đã tồn tại thông tin phiên thì chuyển hướng về trang chủ
     */

    const { auth } = req.session;


    if( auth && auth.ten_dang_nhap ){
        res.redirect('/')
    }else{           

        const errors = req.query;

        res.render('login', {
            title: `Đăng nhập | ${ COMPANY }`,
            ...errors
        })   
    }
})

router.get('/signup', (req, res) => {  
    /**
     *  URL: http://localhost:5000/u/signup?email=1&pwd=1&reenter=1&phone=1
     *  Các tham số hợp lệ:
     *      - email => Email đã tồn tại
     *      - pwd => Mật khẩu quá ngắn
     *      - reenter => Mật khẩu và lặp lại mật khẩu không khớp
     *      - phone => Số di động này đã được dùng để đăng ký cho một tài khoản khác
     * 
     *  Nếu đã tồn tại thông tin phiên thì chuyển hướng về trang chủ
     */
    
    const { auth } = req.session;    
    if( auth && auth.ten_dang_nhap ){
        res.redirect('/')
    }else{
        const errors = req.query;
        res.render('signup', {
            title: `Đăng ký | ${ COMPANY }`,
            ...errors
        })   
    }
})


router.get('/signout', (req, res) => {
    delete req.session.auth;
    res.redirect('/u/login')
})







module.exports = router;