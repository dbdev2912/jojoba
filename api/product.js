const express = require('express');
const router = express.Router();

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ROLES, ADMIN } = require('../configs/enum')



router.post('/add__cart', async (req, res) => {
    const { product_id } = req.body;
    const cart = req.session.cart
    
    if( cart && Array.isArray(cart)){
        const isProduct_existed = cart.find( p => p.product_id == product_id )
        if( !isProduct_existed ){
            req.session.cart.push({ product_id, quantity: 1 })
            res.send({ success: true, len: req.session.cart.length })
        }else{
            res.send({ success: false, type: "existed" })
        }
    }else{
        req.session.cart = [ { product_id, quantity: 1 } ]
        res.send({ success: true, len: 1 })
    }
})


router.get('/cart__count', async (req, res) => {
    const { cart } = req.session;
    let len = 0
    if( cart && Array.isArray(cart) ){
        len = cart.length;
    }
    res.send({ success: true, data: len })
})

router.post('/cart__remove', (req, res) => {
    const { product_id } = req.body;

    const { cart } = req.session;
    if( cart && Array.isArray(cart) ){
        const newCart = cart.filter( item => item.product_id != product_id )
        req.session.cart = newCart;
    }else{
        req.session.cart = []
    }
    res.send({ success: true })
})



router.post('/cart__update', (req, res) => {
    const { product_id, quantity } = req.body;

    const { cart } = req.session;
    if( cart && Array.isArray(cart) ){
        for( let i = 0; i < cart.length; i++ ){
            if( cart[i].product_id == product_id ){
                cart[i].quantity = quantity
            }
        }
        req.session.cart = cart;
    }else{
        req.session.cart = []
    }
    res.send({ success: true })
})

module.exports = router