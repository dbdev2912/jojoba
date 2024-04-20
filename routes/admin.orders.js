const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY, RECORDS_PER_PAGE } = require('../configs/enum')
const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');
// Routing 
const fs = require('fs');

router.get('/', async (req, res) => {

    /**
     * 
     *  URL: "/admin/orders"
     * 
     */


    const { page } = req.query;

    if (functions.intValidate(page)) {

        const pageIndex = parseInt(page)

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM TRANGTHAI
        `);
        const { total } = totals[0]
        const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

        if (pageIndex > 0 && pageIndex <= maxPageIndex) {

            const orders = await MySQL_QUERY(`
                SELECT 
                    so_hoa_don AS order_id,
                    ngay_lap AS create_at,
                    ten_dang_nhap AS order_by,
                    concat( dia_chi_nhan_hang, ', ', xa_phuong_tt, ', ', quan_huyen, ', ', tinh_tp ) AS to_address,
                    ( SELECT SUM( so_luong * don_gia )  FROM CHITIETDATHANG WHERE so_hoa_don = D.so_hoa_don GROUP BY so_hoa_don ) AS total,
                    nguoi_nhan AS recipient,
                    ten_trang_thai AS status
                FROM 
                    DONHANG AS D 
                        INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai                    
                LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
            `)


            for (let i = 0; i < orders.length; i++) {
                orders[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                orders[i].create_at = functions.formatDate( orders[i].create_at )
            }

            res.render('admin_orders/orders', {
                layout: "admin",
                title: `Đơn hàng | ${COMPANY}`,
                auth: req.session.auth,

                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: `/admin/orders`
                },

                orders,
            });
        } else {
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${COMPANY}`,
            });
        }

    } else {
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM TRANGTHAI
        `);
        const { total } = totals[0]
        const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

        const orders = await MySQL_QUERY(`
            SELECT 
                so_hoa_don AS order_id,
                ngay_lap AS create_at,
                ten_dang_nhap AS order_by,
                concat( dia_chi_nhan_hang, ', ', xa_phuong_tt, ', ', quan_huyen, ', ', tinh_tp ) AS to_address,
                ( SELECT SUM( so_luong * don_gia )  FROM CHITIETDATHANG WHERE so_hoa_don = D.so_hoa_don GROUP BY so_hoa_don ) AS total,
                nguoi_nhan AS recipient,
                ten_trang_thai AS status
            FROM 
                DONHANG AS D 
                    INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai
            
            LIMIT ${RECORDS_PER_PAGE}
        `)


        for (let i = 0; i < orders.length; i++) {
            orders[i].index = i + 1;
            orders[i].create_at = functions.formatDate( orders[i].create_at )
        }

        res.render('admin_orders/orders', {
            layout: "admin",
            title: `Đơn hàng | ${COMPANY}`,
            auth: req.session.auth,

            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: `/u/orders`
            },

            orders,
        });
    }
});

router.get('/:order_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/orders/order_id"
     */


    const { order_id } = req.params;

    const orderQuery = await MySQL_QUERY(`
        SELECT 
            so_hoa_don AS order_id,
            ngay_lap AS create_at,
            D.ten_dang_nhap AS order_by,
            concat(K.ho, ' ', K.ten) AS order_by_full_name,
            concat( dia_chi_nhan_hang, ', ', xa_phuong_tt, ', ', quan_huyen, ', ', tinh_tp ) AS to_address,
            ( SELECT SUM( so_luong * don_gia )  FROM CHITIETDATHANG WHERE so_hoa_don = D.so_hoa_don GROUP BY so_hoa_don ) AS total,
            nguoi_nhan AS recipient,
            ten_trang_thai AS status,

            phi_van_chuyen AS shipping_fee            
        FROM 
            DONHANG AS D 
                INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai
                    INNER JOIN KHACHHANG AS K ON K.ten_dang_nhap = D.ten_dang_nhap
        
        WHERE so_hoa_don = '${ order_id }'
    `)

    

    if( orderQuery && orderQuery[0] ){
        const order = orderQuery[0]

        order.final_cost = order.shipping_fee + order.total

        order.create_at = functions.formatDate(order.create_at)

        const products = await MySQL_QUERY(`
            SELECT 
                P.ma_san_pham AS product_id, 
                ten_san_pham AS product_name, 
                anh_dai_dien AS image, 
                (SELECT ten_dong FROM DONGSANPHAM WHERE ma_dong = dong_san_pham ) AS product_cate,
                (SELECT ten_loai FROM LOAISANPHAM WHERE ma_loai = loai_san_pham ) AS product_type,
                (SELECT ten_nhom FROM NHOMSANPHAM WHERE ma_nhom = nhom_san_pham ) AS product_group,
                don_vi_tinh AS product_unit,
                trang_thai AS in_stock,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu = thuong_hieu) AS brand,
                don_gia AS sold_price, 
                so_luong AS quantity,
                (don_gia * so_luong) AS subtotal
            
            FROM SANPHAM AS P 
                INNER JOIN CHITIETDATHANG AS C ON P.ma_san_pham = C.ma_san_pham
            WHERE so_hoa_don = '${ order_id }';
        `)

        
        res.render("admin_orders/order", {
            layout: "admin",
            
            title: `${order_id} | ${COMPANY}`,
            auth: req.session.auth,
            order,
            products,
    
        })
    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${COMPANY}`,
        });
    } 
});


router.post('/edit', async (req, res) => {
    /**
     * 
     *  path: /admin/status/edit
     *  BODY: {
     *      status_id: <String>
     *      status_name: <String>
     *      is_default: <String> ??? "On" or nothing
     *      note: <String>
     *  }
     */

})



router.delete('/', async (req, res) => {

    /**
    * 
    *  URL: "/admin/status"
    *  
    */


    const { status_id } = req.body;

    const { auth } = req.session;

    const context = {
        success: false,
        content: ""
    }

    res.send(context)
})


module.exports = router;


