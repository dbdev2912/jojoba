const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');
// Routing 
router.get('/', async (req, res) => {

    
    

    const date = new Date();
    const month = date.getMonth() + 1
    const year = date.getFullYear()


    const queries = [
        `SELECT COUNT(*) AS total FROM SANPHAM`,
        `SELECT COUNT(*) AS total FROM DONHANG`,
        `SELECT SUM(so_luong * don_gia) AS total FROM CHITIETDATHANG`,
        `
            SELECT SUM(so_luong * don_gia) AS total 
            FROM CHITIETDATHANG AS C 
                INNER JOIN DONHANG AS D ON D.so_hoa_don = C.so_hoa_don
            WHERE MONTH(ngay_lap) = ${month} AND YEAR(ngay_lap) = ${ year }
        `,
        `SELECT COUNT(*) AS total FROM THULIENHE`
    ]

    const [ products, orders, invoices, monthlyInvoice, mailings ] = await Promise.all( queries.map(query => MySQL_QUERY(query)) )
   
    

    const illustrations = [
        { 
            icon: "fa fa-cubes",
            title: "Sản phẩm",
            value: products[0]?.total,
            bg: "#4455ff"
        },
        { 
            icon: "fa fa-shopping-cart",
            title: "Đơn hàng",
            value: orders[0]?.total,
            bg: "#00bb99"
        },
        { 
            icon: "fa fa-money",
            title: "Tổng doanh thu",
            value: functions.formatComnaSeperatedNumber( invoices[0]?.total ),
            bg: "#8800bb"
        },
        { 
            icon: "fa fa-money",
            title: "Doanh thu tháng",
            value: functions.formatComnaSeperatedNumber( monthlyInvoice[0]?.total  ),
            bg: "#ffc107"
        },
        { 
            icon: "fa fa-paper-plane-o",
            title: "Thư liên hệ",
            value: mailings[0]?.total,
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


