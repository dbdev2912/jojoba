const express = require('express');
const router = express.Router(); 

const mysql = require('../db/connector')
const functions = require('../configs/functions')


router.get('/', (req, res) => {
    res.send("TEST API")
})

router.post('/signin', (req, res) => {
    console.log(req.body)
    res.redirect('/u/login')
})


router.post('/signup', (req, res) => {

    /**
     * 
     *  URL: localhost:5000/api/u/signup
     * 
     *  BODY: {
     *      username: <String>
     *      password: <String>
     *      reenter:  <String>
     *      firstname: <String>
     *      lastname: <String>
     *      phone: <String>
     *  } 
     * 
     * 
     */

    const { nullCheck } = functions; 

    const { username, password, reenter, firstname, lastname, phone } = req.body;
    const validateData = nullCheck(req.body, ["username", "password", "reenter", "firstname", "lastname", "phone"]) 

    if( validateData ){
        
    }else{
        
    }        
})

module.exports = router;