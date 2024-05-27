const express = require('express');
const router = express.Router();

const { COMPANY, ROLES, RECORDS_PER_PAGE } = require('../configs/enum')

const MySQL_QUERY = require('../db/connector')

const functions = require('../configs/functions')
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

    const currentCart = req.session.cart;
    let cart = []
    // cart = [
    //     {
    //         product_id: 285
    //         product_name: "Chain bucket bag",
    //         image: "/img/shop-cart/cp-1.jpg",
    //         price: 1700000,
    //         quantity: 2,
    //         start: 5            
    //     },
    // ]
    if (currentCart && currentCart.length > 0) {
        const productIds = currentCart.map(item => item.product_id)
        const query = `
            SELECT 
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                anh_dai_dien AS image,
                dang_giam_gia AS is_for_sale,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS price,

                phan_tram_giam AS sale_off
            FROM SANPHAM
            WHERE ma_san_pham IN (${productIds.map(id => `'${id}'`).join(', ')})
        `;

        const products = await MySQL_QUERY(query)
        products.map(product => {
            const { product_id } = product;
            const cartItem = currentCart.find(item => item.product_id == product_id)
            if (cartItem) {
                product.quantity = cartItem.quantity
            }
        })
        cart = products
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const { price, quantity } = cart[i]
        total += quantity * price;
    }

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('cart', {
        title: `Giỏ hàng | ${COMPANY}`,
        previousPages,
        lastPage,
        auth: req.session.auth,
        cates,

        total,
        cart,

    });
});


router.get('/checkout', async (req, res) => {

    /**
     *  http://localhost:5000/u/checkout
     *  
     *  available params:
     *      - existed: 1 => Account đã tồn tại
     *      - pwd: 1 => Không tìm thấy mật khẩu
     *      - success: 1 => Thành công
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

    // const cart = [
    //     {
    //         product_name: "Chain bucket bag",
    //         image: "/img/shop-cart/cp-1.jpg",
    //         price: 1700000,
    //         quantity: 2,
    //         start: 5, 
    //         subtotal: 1700000 * 2
    //     },        
    // ]

    const { success, pwd, existed } = req.query;

    const currentCart = req.session.cart;
    let cart = []
    if (currentCart && currentCart.length > 0) {
        const productIds = currentCart.map(item => item.product_id)
        const query = `
            SELECT 
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                anh_dai_dien AS image,
                dang_giam_gia AS is_for_sale,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS price,

                phan_tram_giam AS sale_off
            FROM SANPHAM
            WHERE ma_san_pham IN (${productIds.map(id => `'${id}'`).join(', ')})
        `;

        const products = await MySQL_QUERY(query)
        products.map(product => {
            const { product_id } = product;
            const cartItem = currentCart.find(item => item.product_id == product_id)
            if (cartItem) {
                product.quantity = cartItem.quantity
            }
        })
        cart = products
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const { price, quantity } = cart[i]
        cart[i].subtotal = price * quantity;

        total += quantity * price;
    }

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    if (cart && cart.length > 0) {

        res.render('checkout', {
            title: `Thanh toán | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,

            success, pwd, existed,

            cart,
            total,
            cates,

        });
    } else {
        res.render('checkout-not-found', {
            title: `Thanh toán | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,


            cart,
            total,
            cates
        });
    }
});


router.get('/orders', async (req, res) => {
    /**
     * 
     * http://localhost:5000/u/orders
     * 
     * tham số khả dĩ
     *     - page: <Int> số trang hiện tại
     * 
     * 
     *  Hiển thị 12 ( hoặc toàn bộ đơn hàng hiện có )
     *  Nếu không tìm thấy ng dùng trong phiên thì redirect đến trang đăng nhập
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
        name: "Đơn hàng",
    }

    // const orders = [
    //     {
    //         order_id: "DH0000001",
    //         create_at: "2024-03-25T11:30:22",
    //         to_address: "130B2 KV2, P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ ",
    //         total: 10600000,
    //         status: "Đang vận chuyển",
    //         recipient: "Lê Tấn Phát"
    //     },
    // ]

    const { auth } = req.session;

    if( auth ){
        
        const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)      
        
        const { page } = req.query;

        const  totals = await MySQL_QUERY(`        
            SELECT COUNT(*) AS total
            FROM 
                DONHANG AS D 
                    INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai
            WHERE ten_dang_nhap = '${ auth.ten_dang_nhap }'            
        `)

        const { total } = totals[0]
        const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

        if( page && functions.intValidate(page)){
            const pageIndex = parseInt(page)
            
            

            if( pageIndex > 0 && pageIndex <= maxPageIndex ){

                const orders = await MySQL_QUERY(`
                    SELECT 
                        so_hoa_don AS order_id,
                        ngay_lap AS create_at,
                        concat( dia_chi_nhan_hang, ', ', xa_phuong_tt, ', ', quan_huyen, ', ', tinh_tp ) AS to_address,
                        ( SELECT SUM( so_luong * don_gia )  FROM CHITIETDATHANG WHERE so_hoa_don = D.so_hoa_don GROUP BY so_hoa_don ) AS total,
                        nguoi_nhan AS recipient,
                        ten_trang_thai AS status
                    FROM 
                        DONHANG AS D 
                            INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai
                    WHERE ten_dang_nhap = '${ auth.ten_dang_nhap }' 
                    LIMIT ${ RECORDS_PER_PAGE } OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE };
                `)

                
                for (let i = 0; i < orders.length; i++) {
                    orders[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                }

                res.render('orders', {
                    title: `Đơn hàng | ${COMPANY}`,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,

                    paginate: {
                        pageIndex,
                        maxPageIndex,
                        origin: `/u/orders`
                    },
    
                    orders,
                    cates,
                });

            }else{
                res.render('404_not_found', {
                    previousPages,
                    lastPage,
        
                    title: `404 - Not found| ${COMPANY }`,
                    auth: req.session.auth,
                });
            }          

        }else{

            const firstItems = await MySQL_QUERY(`
                SELECT 
                    so_hoa_don AS order_id,
                    ngay_lap AS create_at,
                    concat( dia_chi_nhan_hang, ', ', xa_phuong_tt, ', ', quan_huyen, ', ', tinh_tp ) AS to_address,
                    ( SELECT SUM( so_luong * don_gia )  FROM CHITIETDATHANG WHERE so_hoa_don = D.so_hoa_don GROUP BY so_hoa_don ) AS total,
                    nguoi_nhan AS recipient,
                    ten_trang_thai AS status
                FROM 
                    DONHANG AS D 
                        INNER JOIN TRANGTHAI AS T ON D.trang_thai = T.ma_trang_thai
                WHERE ten_dang_nhap = '${ auth.ten_dang_nhap }' LIMIT ${ RECORDS_PER_PAGE }
            `)

            for( let i = 0; i < firstItems.length; i++ ){
                firstItems[i].index = i + 1
            }


            res.render('orders', {
                title: `Đơn hàng | ${ COMPANY }`,
                previousPages,
                lastPage,
                auth: req.session.auth,

                paginate: {
                    pageIndex: 1,
                    maxPageIndex,
                    origin: `/u/orders`
                },

                orders: firstItems,
                cates,
            });
        }

    }else{
        res.redirect('/u/login')
    }   

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
            name: "Đơn hàng",
            url: "/u/orders",
            icon: "fa fa-home",
        },
    ]

    const lastPage = {
        name: order_id,
    }


    // const cart = [
    //     {
    //         product_name: "Chain bucket bag",
    //         image: "/img/shop-cart/cp-1.jpg",
    //         price: 1700000,
    //         quantity: 2,
    //         star: 5
    //     },
    // ]

    const orders = await MySQL_QUERY(`
        SELECT 

            so_hoa_don, ten_dang_nhap, ngay_lap,
            tinh_tp, quan_huyen, xa_phuong_tt,

            dia_chi_nhan_hang, dh_ghi_chu, nguoi_nhan,
            di_dong, email,
            ten_trang_thai, phi_van_chuyen



        FROM DONHANG AS D
            INNER JOIN TRANGTHAI AS T ON T.ma_trang_thai = D.trang_thai
        WHERE so_hoa_don = '${ order_id }'
    `);

    const order = orders[0]
    order.ngay_lap = functions.formatDate( order.ngay_lap )
    order.full_dia_chi = `${ order.dia_chi_nhan_hang }, ${ order.xa_phuong_tt }, ${ order.quan_huyen }, ${ order.tinh_tp }`
    if( order ){

        const cart = await MySQL_QUERY(`
            SELECT 
                SP.ma_san_pham AS product_id, 
                ten_san_pham AS product_name, 
                anh_dai_dien AS image, 
                so_luong AS quantity, 
                don_gia AS price
            FROM SANPHAM AS SP INNER JOIN CHITIETDATHANG AS CT 
                ON SP.ma_san_pham = CT.ma_san_pham



            WHERE so_hoa_don = '${ order_id }'
        `)
    
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
            const { price, quantity } = cart[i]
            cart[i].subtotal = price * quantity;
    
            total += quantity * price;
        }
    
        const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)
        res.render('order', {
            title: `Đơn hàng ${order_id} | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,
            
            order,
            total,
            cart,
            cates,
        });
    }else{
        res.render('404_not_found', {
            previousPages,
            lastPage,

            title: `404 - Not found| ${COMPANY }`,
            auth: req.session.auth,
        });
    }

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


    if (auth && auth.ten_dang_nhap) {
        res.redirect('/')
    } else {

        const errors = req.query;

        res.render('login', {
            title: `Đăng nhập | ${COMPANY}`,
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
    if (auth && auth.ten_dang_nhap) {
        res.redirect('/')
    } else {
        const errors = req.query;
        res.render('signup', {
            title: `Đăng ký | ${COMPANY}`,
            ...errors
        })
    }
})


router.get('/signout', (req, res) => {
    delete req.session.auth;
    res.redirect('/u/login')
})


const getDefaultStatus = async () => {
    const query = `
        SELECT * FROM TRANGTHAI WHERE mac_dinh = TRUE
    `;
    const defaultNiggers = await MySQL_QUERY(query);
    const nigger = defaultNiggers[0]

    if (nigger) {
        const { ma_trang_thai } = nigger;
        return ma_trang_thai;
    } else {
        const allNiggersQuery = `
            SELECT * FROM TRANGTHAI LIMIT 1
        `
        const firstNiggers = await MySQL_QUERY(allNiggersQuery)
        const firstNigger = firstNiggers[0]
        if (firstNigger) {
            const { ma_trang_thai } = firstNigger
            return ma_trang_thai
        } else {
            const status_id = functions.getFormatedUUID();
            const insertQuery = `
                INSERT INTO TRANGTHAI(ma_trang_thai, ten_trang_thai, mac_dinh)
                VALUES('${status_id}', 'Trạng thái mặc định', TRUE)
            `
            await MySQL_QUERY(insertQuery)
            return status_id
        }
    }
}

const AddOrderDetail = async (order_id, cart) => {
    const productIds = cart.map(item => item.product_id)


    const query = `
            SELECT 
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                anh_dai_dien AS image,
                dang_giam_gia AS is_for_sale,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS price,

                phan_tram_giam AS sale_off
            FROM SANPHAM
            WHERE ma_san_pham IN (${productIds.map(id => `'${id}'`).join(', ')})
        `;

    const products = await MySQL_QUERY(query)
    products.map(product => {
        const { product_id } = product;
        const cartItem = cart.find(item => item.product_id == product_id)
        if (cartItem) {
            product.quantity = cartItem.quantity
        }
    })
    const head = "INSERT INTO CHITIETDATHANG(so_hoa_don, ma_san_pham, so_luong, don_gia) VALUES";
    const tail = products.map( product => {
        const { product_id, quantity, price } = product;
        return `('${ order_id }', '${ product_id }', ${ quantity }, ${ price } )`
    }).join(', ')
    await MySQL_QUERY(head + tail)
}

router.post('/checkout', async (req, res) => {

    /**
     * BODY: {
     *      firstname: "Khánh Tree \\'",
     *      lastname: 'Nè',
     *      province: 'Thành phố Cần Thơ',
     *      district: 'Huyện Cờ Đỏ',
     *      ward: 'Thị trấn Cờ Đỏ',
     *      address: `12'14, cao hùng '\\12"`,
     *      note: '',
     *      phone: '0368474601',
     *      email: 'hvcong.email@gmail.com',
     *      create_account: "on" || undefined,
     *      password: ''
     *  }
     * 
     */

    const {
        firstname,
        lastname,
        province,
        district,
        ward,
        address,
        phone,
        email,
        note,
        create_account,
        password
    } = req.body;


    const validateData = functions.nullCheck(req.body, ["firstname", "lastname", "province", "district", "ward", "address", "phone", "email"])
    

    if (validateData) {
        const { auth, cart } = req.session;

        if (cart && cart.length > 0) {

            const orderID = `DH${functions.getFormatedUUID()}`
            const date = new Date()
            const createdOn = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const defaultStatus = await getDefaultStatus()
            const formattedAddress = functions.formatEscapeString(address)
            const formatedNotes = functions.formatEscapeString(note)
            const trueRecipient = `${functions.formatEscapeString(firstname)} ${functions.formatEscapeString(lastname)}`;
            const formatedPassword = functions.formatEscapeString(password)

            if (auth) {
                const { ten_dang_nhap } = auth;

                const insertOrderQuery = `
                    INSERT INTO DONHANG(so_hoa_don, ten_dang_nhap, ngay_lap, tinh_tp, quan_huyen, xa_phuong_tt, dia_chi_nhan_hang, nguoi_lap_don, dh_ghi_chu, nguoi_nhan, email, di_dong, trang_thai, phi_van_chuyen )
                    VALUES ('${orderID}', '${ten_dang_nhap}', '${createdOn}', 
                            '${province}', '${district}', '${ward}', '${formattedAddress}', 'Administrator', '${formatedNotes}',
                            '${trueRecipient}', '${email}', '${phone}', '${defaultStatus}', 0
                    )
                `
                await MySQL_QUERY(insertOrderQuery)
                // Thêm chi tiết đơn hàng ở đây

                await AddOrderDetail(orderID, cart)
                res.redirect(`/u/order/${orderID}`)
            } else {
                if (create_account) {

                    if (password) {

                        const existed = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM TAIKHOAN WHERE ten_dang_nhap='${email}'`)
                        if (existed && existed[0].total == 0) {

                            const customerID = functions.getFormatedUUID()

                            const newAccountQueryString = `
                                INSERT INTO TAIKHOAN(ten_dang_nhap, mat_khau, role)
                                VALUES ( '${email}', '${formatedPassword}', '${ROLES.khachhang}' )
                            `
                            const newCustomerQuery = `
                                INSERT INTO KHACHHANG( ten_dang_nhap, ma_khach_hang, ho, ten, so_dien_thoai, dia_chi )
                                VALUES ( '${email}', '${customerID}', '${functions.formatEscapeString(firstname)}', '${functions.formatEscapeString(lastname)}', '${phone}', '${formattedAddress}' );
                            `

                            const insertOrderQuery = `
                                INSERT INTO DONHANG(so_hoa_don, ten_dang_nhap, ngay_lap, tinh_tp, quan_huyen, xa_phuong_tt, dia_chi_nhan_hang, nguoi_lap_don, dh_ghi_chu, nguoi_nhan, email, di_dong, trang_thai, phi_van_chuyen )
                                VALUES ('${orderID}', '${email}', '${createdOn}', 
                                        '${province}', '${district}', '${ward}', '${formattedAddress}', 'Administrator', '${formatedNotes}',
                                        '${trueRecipient}', '${email}', '${phone}', '${defaultStatus}', 0
                                )
                            `

                            await MySQL_QUERY(newAccountQueryString)
                            // console.log("INSERTED NEW ACCOUNT")
                            await MySQL_QUERY(newCustomerQuery)
                            // console.log("INSERTED NEW CUSTOMER")
                            await MySQL_QUERY(insertOrderQuery)
                            // console.log("INSERTED NEW ORDER")


                            // Thêm chi tiết đơn hàng ở đây
                            await AddOrderDetail(orderID, cart)
                            res.redirect(`/u/order/${orderID}`)
                        } else {
                            res.redirect('/u/checkout?existed=1')
                        }
                    } else {
                        res.redirect('/u/checkout?pwd=1')
                    }
                } else {
                    const insertOrderQuery = `
                        INSERT INTO DONHANG(so_hoa_don, ten_dang_nhap, ngay_lap, tinh_tp, quan_huyen, xa_phuong_tt, dia_chi_nhan_hang, nguoi_lap_don, dh_ghi_chu, nguoi_nhan, email, di_dong, trang_thai, phi_van_chuyen )
                        VALUES ('${orderID}', '${email}', '${createdOn}', 
                                '${province}', '${district}', '${ward}', '${formattedAddress}', 'Administrator', '${formatedNotes}',
                                '${trueRecipient}', '${email}', '${phone}', '${defaultStatus}', 0
                        )
                     `
                    await MySQL_QUERY(insertOrderQuery)

                    await AddOrderDetail(orderID, cart)
                    // Thêm chi tiết đơn hàng ở đây
                    res.redirect(`/u/order/${orderID}`)
                }
            }
        } else {
            /**
             * No products found in cart
             * 
             */
            res.redirect('/u/checkout')
        }
    } else {
        res.send({ success: false, content: "Opps!!" })
    }


})



module.exports = router;