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
                
                const total = await MySQL_QUERY(`
                    SELECT SUM(so_luong * don_gia) AS total FROM CHITIETDATHANG WHERE so_hoa_don = '${ order_id }';
                `)

                const shippingFee = await MySQL_QUERY(`
                    SELECT phi_van_chuyen AS shipping_fee FROM DONHANG WHERE so_hoa_don = '${ order_id }';
                `)

                context.success = true;
                context.content = "Thêm thành công"
                context.product = product
                context.total = functions.renderPrice(total[0]?.total)
                context.shipping_fee = functions.renderPrice(shippingFee[0]?.shipping_fee)
                context.final = functions.renderPrice( total[0]?.total + shippingFee[0]?.shipping_fee)
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


router.get(`/d/:order_id/product/:product_id`, async (req, res) => {
    const { order_id, product_id } = req.params;
    
    const product = await MySQL_QUERY(`
        SELECT C.ma_san_pham, ten_san_pham, don_gia, so_luong
        FROM 
            SANPHAM AS S INNER JOIN CHITIETDATHANG AS C ON C.ma_san_pham = S.ma_san_pham 
        WHERE so_hoa_don = '${order_id}' AND 
              C.ma_san_pham = '${product_id}';
    `)

    if( product.length > 0 ){
        res.send({ success: true, product: product[0] })
    }else{
        res.send({success: false, error: "not-found", content: "Không tìm thấy sản phẩm trong đơn hàng" })    
    }
})

router.post(`/update__product`, async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;
    const context = { success: false }
    if( functions.intValidate(price) && functions.intValidate(quantity) ){

        const parsedPrice = parseInt(price)
        const parsedQuantity = parseInt(quantity)

        if( parsedPrice >= 0 ){
            
            if( parsedQuantity > 0 ){

                await MySQL_QUERY(`
                    UPDATE CHITIETDATHANG SET don_gia=${ price }, so_luong=${ quantity } 
                    WHERE so_hoa_don = '${ order_id }' AND ma_san_pham = '${ product_id }'
                `)        
                context.success = true;
            }else{
                context.content = "Số lượng phải lớn hơn 0"
            }
        }else{
            context.content = "Gía bán phải lớn hơn hoặc bằng 0"
        }
    }else{
        context.content = "Invaid param set"
    }
    res.send(context)
})

router.delete('/remove__product', async (req, res) => {

    /**
     * 
     * VALIDATION SIDE DATA
     * 
     */   

    const { product_id, order_id } = req.body
    await MySQL_QUERY(`
        DELETE FROM CHITIETDATHANG WHERE so_hoa_don = '${ order_id }' AND ma_san_pham = '${ product_id }'
    `)
    res.send({ success: true })
})

router.post('/edit__info', async (req, res) => {

    /**
     * 
     * VALIDATION SIDE DATA, SHIPPING FEE REQUIRED
     * 
     */

    const { order_id, status_id, shipping_fee } = req.body;

    const order = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM DONHANG WHERE so_hoa_don='${ order_id }'`)
    const context = { success: false }
    if(order[0].total > 0 ){        
        const status = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM TRANGTHAI WHERE ma_trang_thai='${ status_id }'`)
        if(status[0].total > 0){
            await MySQL_QUERY(`
                UPDATE DONHANG SET trang_thai = '${ status_id }', phi_van_chuyen = ${ shipping_fee }
                    WHERE so_hoa_don = '${ order_id }'
            `)
            context.success = true;
        }else{
            context.content = "Trạng thái không tồn tại"    
        }
    }else{
        context.content = "Đơn hàng không tồn tại"
    }
    res.send(context)
})


router.delete('/remove__order',  async (req, res) => {
    const { order_id } = req.body;

    await MySQL_QUERY(`
        DELETE FROM CHITIETDATHANG WHERE so_hoa_don = '${ order_id }'
    `)

    await MySQL_QUERY(`
        DELETE FROM DONHANG WHERE so_hoa_don = '${ order_id }'
    `)

    res.send({ success: true })
})

module.exports = router