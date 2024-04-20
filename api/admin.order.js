const express = require('express');
const router = express.Router();

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ROLES, ADMIN } = require('../configs/enum')

router.post('/add__product', async (req, res) => {
    const { product_id, order_id } = req.body;

    const context = {
        success: false,
        content: "",
        error: ""
    }    

    const [ orderExisted,  productExisted, productExistedInTheOrder, products ] = await Promise.all([
        MySQL_QUERY(`SELECT COUNT(*) AS total FROM DONHANG WHERE so_hoa_don = '${ order_id }'`), 
        MySQL_QUERY(`SELECT COUNT(*) AS total FROM SANPHAM WHERE ma_san_pham = '${ product_id }'`), 
        MySQL_QUERY(`SELECT COUNT(*) AS total FROM CHITIETDATHANG WHERE ma_san_pham = '${product_id}' AND so_hoa_don='${ order_id }'`),
        MySQL_QUERY(`
            SELECT 
                P.ma_san_pham AS product_id, 
                ten_san_pham AS product_name, 
                anh_dai_dien AS image, 
                (SELECT ten_dong FROM DONGSANPHAM WHERE ma_dong = dong_san_pham ) AS product_cate,
                (SELECT ten_loai FROM LOAISANPHAM WHERE ma_loai = loai_san_pham ) AS product_type,
                (SELECT ten_nhom FROM NHOMSANPHAM WHERE ma_nhom = nhom_san_pham ) AS product_group,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS price,
                don_vi_tinh AS product_unit,
                trang_thai AS in_stock,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu = thuong_hieu) AS brand
            
            FROM SANPHAM AS P 
                WHERE ma_san_pham = '${product_id}'
        `)
    ])

    

    if(orderExisted && orderExisted[0].total > 0){
        if( productExisted && productExisted[0].total > 0 ){
            if( productExistedInTheOrder && productExistedInTheOrder[0].total == 0 ){
                
                const product = products[0]                               

                const insertQuery = `
                    INSERT IGNORE INTO CHITIETDATHANG( so_hoa_don, ma_san_pham, so_luong, don_gia )
                    VALUES( '${order_id }', '${ product_id }', 1,  ${ product.price })
                `
                await MySQL_QUERY(insertQuery)

                context.success = true;
                context.content = "Thêm thành công"
                context.product = product
            }else{
                context.content = "Sản phẩm này đã tồn tại trong đơn hàng"
                context.error  = "existed-product"    
            }
        }else{
            context.content = "Sản phẩm không tồn tại"
            context.error  = "product-not-found"
        }
    }else{
        context.content = "Đơn hàng không tồn tại"
        context.error  = "order-not-found"
    }    
    res.send(context)
})

module.exports = router