const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { ROLES, ADMIN, RECORDS_PER_PAGE } = require('../configs/enum')


router.get('/products', (req, res) => {
    /**
     * 
     *  URL: "/admin/product/products"
     * 
     * 
     */
    const products = [
        {

            index: 1,
            product_id: "BC - 01",
            image: "/img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_sale: true,
            is_new: true
        },
        {
            index: 2,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_new: true,
        },
        {
            index: 3,
            product_id: "BC - 01",
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_sale: true,
        },
        {
            index: 4,
            product_id: "BC - 01",
            image: "/img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 5,
            product_id: "BC - 01",
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 6,
            product_id: "BC - 01",
            image: "/img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 7,
            product_id: "BC - 01",
            image: "/img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
        },
        {
            index: 8,
            product_id: "BC - 01",
            image: "/img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 9,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_new: true,
        },
        {
            index: 10,
            product_id: "BC - 01",
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
        },
        {
            index: 11,
            product_id: "BC - 01",
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: true,
            is_new: true,
        },
        {
            index: 12,
            product_id: "BC - 01",
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: 5900000,
            sale_percentage: 10,
            stars: 5,
            category: "Bồn cầu",
            group: "Bồn cầu sứ",
            type: "Bồn cầu xả",
            status: false,
            is_sale: true,
        },
    ]

    res.render('admin_p_products', {
        layout: "admin",
        title: `Sản phẩm | ${COMPANY}`,
        auth: req.session.auth,
        products
    })
})



router.get('/products/new', (req, res) => {

    /**
     * 
     *  URL: "/admin/product/products/new"
     * 
     * 
     */
    res.render('admin_p_add', {
        layout: "admin",
        title: `Thêm sản phẩm | ${COMPANY}`,
        auth: req.session.auth,

    })
})

router.get('/product-categories', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-categories"
     * 
     *  available params:
     *      - page: <Int>
     * 
     * 
     */

    const { page } = req.query;

    if( functions.intValidate(page) ){

        const pageIndex = parseInt( page )

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM DONGSANPHAM
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const cates = await MySQL_QUERY(`
                SELECT 
                    ma_dong AS category_id,
                    ten_dong AS category_name,
                    dsp_ghi_chu AS note 
                FROM DONGSANPHAM LIMIT 12 OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < cates.length; i++ ){
                cates[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }   
          
            res.render('admin_p_categories', {
                layout: "admin",
                title: `Dòng sản phẩm | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/admin/product/product-categories"
                },
                categories: cates,
            })
            
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM DONGSANPHAM
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const cates = await MySQL_QUERY(`
            SELECT 
                ma_dong AS category_id,
                ten_dong AS category_name,
                dsp_ghi_chu AS note 
            FROM DONGSANPHAM LIMIT 12;
        `)
    
        for( let i = 0 ; i < cates.length; i++ ){
            cates[i].index = i + 1;
        }
    
        res.render('admin_p_categories', {
            layout: "admin",
            title: `Dòng sản phẩm | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/admin/product/product-categories"
            },
            categories: cates,
           
        })
    }

    // res.render('admin_p_categories', {
    //     layout: "admin",
    //     title: `Dòng sản phẩm | ${COMPANY}`,
    //     auth: req.session.auth,

    //     categories,
    // })
})

router.get('/product-categories/new', (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-categories/"
     *  available params:
     *      - existed 
     *      - success
     * 
     * 
     */
    const { existed, success } = req.query;

    res.render('admin_p_categories_add', {
        layout: "admin",
        title: `Dòng sản phẩm | ${COMPANY}`,
        auth: req.session.auth,
        success,
        existed
    })
})

router.post('/product-category', async (req, res) => {
    /**
     * 
     *  URL: "/admin/product/product-category"
     * 
     */

    const { cate_id, cate_name, note } = req.body;
    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    // if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["cate_id", "cate_name"] )

        if( validateData ){                        
            
            const cate = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM WHERE ma_dong='${ cate_id }'`)
            
            if( cate && cate.length === 0 ){
                const insertQuery = `
                    INSERT INTO DONGSANPHAM (ma_dong, ten_dong, dsp_ghi_chu) VALUES ('${ cate_id }', '${ cate_name }', '${ note }')
                `;
                await MySQL_QUERY( insertQuery );
                res.redirect('/admin/product/product-categories/new?success=1')
            }else{
                res.redirect('/admin/product/product-categories/new?existed=1')
            }
        }else{
            res.send({ success: false })
            /** Response này chỉ được truy cập thông qua API, tức là đường k hợp lệ */
        }

      
    // }else{
    //     /** Không có quyền thì đi tới trang 403  */
    //     res.redirect('/admin/e/no-privileged')
    // }    
})

router.get('/product-categories/edit/:cate_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-categories/edit/:cate_id"
     * 
     * 
     */
    const { existed, success } = req.query;
    
    const { cate_id } = req.params;
    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM WHERE ma_dong = '${ cate_id }'`)
    
    if( cates && cates.length > 0 ){
        const cate = cates[0]

        res.render('admin_p_category_edit', {
            layout: "admin",
            title: `${ cate?.ma_dong } | ${COMPANY}`,
    
            auth: req.session.auth,
            cate,
            existed, 
            success
        })
    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }

})


router.post('/product-category/edit', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-unit/edit"
     * 
     */

    const { cate_id, cate_name, note } = req.body;
    const { auth } = req.session;
    

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    // if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["cate_id", "cate_name"] )

        if( validateData ){                        
            
            const cate = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM WHERE ma_dong='${ cate_id }'`)
            
            if( cate && cate.length > 0 ){                

                const updateQuery = `
                    UPDATE DONGSANPHAM SET ten_dong = '${ cate_name }', dsp_ghi_chu='${ note }'
                    WHERE ma_dong = '${ cate_id }'
                `;
                await MySQL_QUERY(updateQuery)
                
                res.redirect(`/admin/product/product-categories/edit/${cate_id}?success=1`)

            }else{
                res.redirect('/admin/e/not-found')
            }
        }else{
            res.send({ success: false })
             /** Response này chỉ được truy cập thông qua API, tức là đường k hợp lệ */
        }

      
    // }else{
    //     /** Không có quyền thì đi tới trang 403  */
    //     res.redirect('/admin/e/no-privileged')
    // }    
})



router.get('/product-types', (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-types"
     * 
     * 
     */

    const types = [
        {
            index: 0,
            type_id: "TYPE-01",
            type_name: "Bồn cầu",
            note: ""
        },
        {
            index: 1,
            type_id: "TYPE-02",
            type_name: "Lavabo",
            note: ""
        },
        {
            index: 2,
            type_id: "TYPE-03",
            type_name: "Vòi xịt",
            note: ""
        },
    ]

    res.render('admin_p_types', {
        layout: "admin",
        title: `Loại sản phẩm | ${COMPANY}`,
        auth: req.session.auth,

        types,
    })
})

router.get('/product-groups', (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-types"
     * 
     * 
     */

    const groups = [
        {
            index: 0,
            group_id: "TYPE-01",
            group_name: "Bồn cầu",
            note: ""
        },
        {
            index: 1,
            group_id: "TYPE-02",
            group_name: "Lavabo",
            note: ""
        },
        {
            index: 2,
            group_id: "TYPE-03",
            group_name: "Vòi xịt",
            note: ""
        },
    ]

    res.render('admin_p_groups', {
        layout: "admin",
        title: `Nhóm sản phẩm | ${COMPANY}`,
        auth: req.session.auth,

        groups,
    })
})






router.get('/product-units', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-units"
     * 
     *  available params:
     *      - page: <Int>
     * 
     * 
     */

    const { page } = req.query;

    if( functions.intValidate(page) ){

        const pageIndex = parseInt( page )

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM DONVITINH
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const units = await MySQL_QUERY(`
                SELECT 
                    ma_don_vi AS unit_id,
                    ten_don_vi AS unit_name,
                    ghi_chu AS note 
                FROM DONVITINH LIMIT 12 OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < units.length; i++ ){
                units[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }
    
    
        
            res.render('admin_p_units', {
                layout: "admin",
                title: `Đơn vị tính | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/admin/product/product-units"
                },
                units,
            })
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM DONVITINH
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const units = await MySQL_QUERY(`
            SELECT 
                ma_don_vi AS unit_id,
                ten_don_vi AS unit_name,
                ghi_chu AS note 
            FROM DONVITINH LIMIT 12;
        `)
    
        for( let i = 0 ; i < units.length; i++ ){
            units[i].index = i + 1;
        }
    
        res.render('admin_p_units', {
            layout: "admin",
            title: `Đơn vị tính | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/admin/product/product-units"
            },
            units,
        })
    }
})

router.get('/product-units/new', (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-units/new"
     *  
     *  ADMIN PRIVILEGE REQUIRED BUT NOT NOW
     * 
     */
    const { existed, success } = req.query;

    

    res.render('admin_p_units_add', {
        layout: "admin",
        title: `Đơn vị tính | ${COMPANY}`,

        auth: req.session.auth,

        existed, 
        success
    })
})

router.get('/product-units/edit/:unit_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-units/edit/:unit_id"
     * 
     * 
     */
    const { existed, success } = req.query;
    
    const { unit_id } = req.params;
    const units = await MySQL_QUERY(`SELECT * FROM DONVITINH WHERE ma_don_vi = '${ unit_id }'`)
    
    if( units && units.length > 0 ){
        const unit = units[0]

        res.render('admin_p_units_edit', {
            layout: "admin",
            title: `${ unit?.ma_don_vi } | ${COMPANY}`,
    
            auth: req.session.auth,
            unit,
            existed, 
            success
        })
    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }

})

router.post('/product-unit', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-unit"
     * 
     */

    const { unit_id, unit_name, note } = req.body;
    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["unit_id", "unit_name"] )

        if( validateData ){                        
            
            const unit = await MySQL_QUERY(`SELECT * FROM DONVITINH WHERE ma_don_vi='${ unit_id }'`)
            
            if( unit && unit.length === 0 ){
                const insertQuery = `
                    INSERT INTO DONVITINH (ma_don_vi, ten_don_vi, ghi_chu) VALUES ('${ unit_id }', '${ unit_name }', '${ note }')
                `;
                await MySQL_QUERY( insertQuery );
                res.redirect('/admin/product/product-units/new?success=1')
            }else{
                res.redirect('/admin/product/product-units/new?existed=1')
            }
        }else{
            res.send({ success: false })
            /** Response này chỉ được truy cập thông qua API, tức là đường k hợp lệ */
        }

      
    }else{
        /** Không có quyền thì đi tới trang 403  */
        res.redirect('/admin/e/no-privileged')
    }    
})

router.post('/product-unit/edit', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-unit/edit"
     * 
     */

    const { unit_id, unit_name, note } = req.body;
    const { auth } = req.session;
    

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["unit_id", "unit_name"] )

        if( validateData ){                        
            
            const unit = await MySQL_QUERY(`SELECT * FROM DONVITINH WHERE ma_don_vi='${ unit_id }'`)
            
            if( unit && unit.length > 0 ){                

                const updateQuery = `
                    UPDATE DONVITINH SET ten_don_vi = '${ unit_name }', ghi_chu='${ note }'
                    WHERE ma_don_vi = '${ unit_id }'
                `;
                await MySQL_QUERY(updateQuery)
                
                res.redirect(`/admin/product/product-units/edit/${unit_id}?success=1`)

            }else{
                res.redirect('/admin/e/not-found')
            }
        }else{
            res.send({ success: false })
             /** Response này chỉ được truy cập thông qua API, tức là đường k hợp lệ */
        }

      
    }else{
        /** Không có quyền thì đi tới trang 403  */
        res.redirect('/admin/e/no-privileged')
    }    
})

module.exports = router;