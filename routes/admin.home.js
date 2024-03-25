const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
const functions = require('../configs/functions')
// Routing 
router.get('/', (req, res) => {

    
    const illustrations = [
        { 
            icon: "fa fa-cubes",
            title: "Sản phẩm",
            value: 1010,
            bg: "#4455ff"
        },
        { 
            icon: "fa fa-shopping-cart",
            title: "Đơn hàng",
            value: 10,
            bg: "#00bb99"
        },
        { 
            icon: "fa fa-money",
            title: "Doanh thu tháng",
            value: functions.formatComnaSeperatedNumber(1_000_000_000),
            bg: "#8800bb"
        },
        { 
            icon: "fa fa-paper-plane-o",
            title: "Thư liên hệ",
            value: 10,
            bg: "#525252"
        },
    ]
   

    res.render('admin_home', {
        layout: "admin",
        title: COMPANY,
        auth: req.session.auth,

        illustrations,
    });
});






module.exports = router;


