const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { ROLES, ADMIN, RECORDS_PER_PAGE } = require('../configs/enum')


router.get('/products', async (req, res) => {
    /**
     * 
     *  URL: "/admin/product/products"
     * 
     *  available params:
     *      - page: <Int>
     *      - query: <String>
     * 
     * 
     */

    const { page, query } = req.query;

    if( functions.intValidate(page) ){

        const pageIndex = parseInt( page )

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM
            ${ query ? `WHERE ma_san_pham LIKE '%${ query }%'` : "" }
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const products = await MySQL_QUERY(`
            SELECT                     
                ma_san_pham as product_id,
                ten_san_pham as product_name,
                trang_thai as status,
                ( select ten_dong from DONGSANPHAM where ma_dong = dong_san_pham ) as category,
                ( select ten_loai from LOAISANPHAM where ma_loai = loai_san_pham ) as type,
                ( select ten_nhom from NHOMSANPHAM where ma_nhom = nhom_san_pham ) as _group_
            FROM 
                SANPHAM
                    ${ query ? `WHERE ma_san_pham LIKE '%${ query }%'` : "" }
            LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)


            for( let i = 0 ; i < products.length; i++ ){
                products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                products[i].group = products[i]._group_
            }
    
    
        
            res.render('admin_product/admin_p_products', {
                layout: "admin",
                title: `Sản phẩm | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: `/admin/product/products`,
                    query,
                    total
                },
                products,
            })
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM
            ${ query ? `WHERE ma_san_pham LIKE '%${ query }%'` : "" }
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const products = await MySQL_QUERY(`
            SELECT                     
                ma_san_pham as product_id,
                ten_san_pham as product_name,
                trang_thai as status,
                ( select ten_dong from DONGSANPHAM where ma_dong = dong_san_pham ) as category,
                ( select ten_loai from LOAISANPHAM where ma_loai = loai_san_pham ) as type,
                ( select ten_nhom from NHOMSANPHAM where ma_nhom = nhom_san_pham ) as _group_
            FROM 
                SANPHAM
                ${ query ? `WHERE ma_san_pham LIKE '%${ query }%'` : "" }
            LIMIT ${ RECORDS_PER_PAGE };
            `)
    
        for( let i = 0 ; i < products.length; i++ ){
            products[i].index = i + 1;
            products[i].group = products[i]._group_
        }
    
        res.render('admin_product/admin_p_products', {
            layout: "admin",
            title: `Sản phẩm | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: `/admin/product/products`,
                query,
                total
            },
            products
        })
    }
})



router.get('/products/new', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/products/new"
     * 
     *  tham số khả dĩ
     *      existed
     */

    

    const queries = {
        brands: `
            SELECT * FROM THUONGHIEU
        `,
        cates: `
            SELECT * FROM DONGSANPHAM
        `,
        units: `
            SELECT * FROM DONVITINH
        `
    };

    const [ brands, cates, units ] = await Promise.all([
        MySQL_QUERY(queries.brands),
        MySQL_QUERY(queries.cates),
        MySQL_QUERY(queries.units),
    ])

    res.render('admin_product/admin_p_products_add', {
        layout: "admin",
        title: `Thêm sản phẩm | ${COMPANY}`,
        auth: req.session.auth,

        cates,
        brands,
        units,

        ...req.query,
    })
})

router.post('/product', async (req, res) => {
    /**
     * 
     *  BODY: {
     *  product_id: <String>,
        product_name: <String>,
        cate_id: <String>,
        type_id: <String>,
        group_id: <String>,
        unit_id: <String>,
        price: <Int>,
        is_new: <Bool>,
        is_for_sale: <Bool>,
        sale_percentage: <Int>,
        brand_id: <String>,
        in_stock: <Bool>,
        introducing: <String>,
        description: <String>,
        technical: <String>

        relatve_1,
        relatve_2,
        relatve_3,
        relatve_4,
     * }

        FiLES: {
            product_image: <FILE>,
            technical_images: <FILE>[]
        }


     * 


        CHƯA TEST
     */
    
    
    
    const { 
        product_id,
        product_name,
        cate_id,
        type_id,
        group_id,
        unit_id,
        brand_id,

        price,
        is_new,
        is_for_sale,
        sale_percentage,
        in_stock,

        introducing,
        description,
        technical,

        relatve_1,
        relatve_2,
        relatve_3,
        relatve_4 
    } = req.body;

    const {
        product_image,
        technical_images, 
    } = req.files ? req.files : {}

    const dataValidate = functions.nullCheck(req.body, ["product_id", "product_name", "cate_id", "price", "is_new", "introducing", "description", "technical" ])

    if( dataValidate ){

        const existedProduct = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM SANPHAM WHERE ma_san_pham = '${ product_id }'`)
        
        if( existedProduct[0].total == 0 ){
            
            if( product_image ){

                const ext = product_image.name.split('.').pop()
                const filename = `${product_id}-${functions.getFormatedUUID()}.${ext}`
    
                const imagePath = `public/assets/products/${ filename }`
                const savePath = `/assets/products/${ filename }`
    
                product_image.mv( imagePath )
    
                const insertQuery = `
                    INSERT INTO SANPHAM(ma_san_pham, ten_san_pham, gioi_thieu, mo_ta, thong_so_ky_thuat, gia, dang_giam_gia,
                        phan_tram_giam, san_pham_moi, anh_dai_dien,
                        dong_san_pham, loai_san_pham, nhom_san_pham, don_vi_tinh, thuong_hieu, trang_thai
                    )
                    VALUES('${product_id}', '${ product_name }', '${ introducing }', '${ description }', '${ technical }', ${price}, ${ is_for_sale ? "True": "False" }, 
                        ${ sale_percentage }, ${ is_new ? "True": "False" }, '${savePath}',
                        '${cate_id}', '${ type_id }', '${group_id}', '${unit_id}', '${brand_id}', ${ in_stock ? "True": "False" }
                    )
                `;                
                await MySQL_QUERY(insertQuery)

                if( technical_images ){                  
                    const queries = []
                    for( let i = 0 ; i < technical_images.length; i++ ){
                        const img = technical_images[i]
                        const ext = img.name.split('.').pop()
                        const img_id = functions.getFormatedUUID();

                        const filename = `${img_id}.${ext}`
            
                        const imagePath = `public/assets/products/exts/${ filename }`
                        const savePath = `/assets/products/exts/${ filename }`
            
                        img.mv( imagePath )
                        const query = `
                            ('${ product_id }','${ savePath }', '${ filename } - ${ product_id } - ${product_name}' )
                        `
                        queries.push( query )                        
                    }

                    const head = `INSERT INTO ANHBOSUNG(ma_san_pham, url, abs_ghi_chu) VALUES`
                    const tail = queries.join(', ')
                    const extendedImageQuery = head + tail;
                    await MySQL_QUERY( extendedImageQuery )
                }

                const uniqueSet = new Set( [ relatve_1, relatve_2, relatve_3, relatve_4 ])
                const relativeProducts = [...uniqueSet]
                
                const relQueries = []
                for( let i = 0; i < relativeProducts.length; i++ ){
                    const rel = relativeProducts[i]
                    if( rel ){
                        const query = `
                            ( '${ product_id }', '${ rel }' )                            
                        `;
                        relQueries.push( query )
                    }
                }

                const relQuery = `INSERT INTO SANPHAMLIENQUAN VALUES ${ relQueries.join(', ') }`;
                MySQL_QUERY( relQuery )

                res.redirect(`/admin/product/products/new`)    
            }else{
                res.redirect(`/admin/product/products/new?image=1`)    
            }           
        }else{
            res.redirect(`/admin/product/products/new?existed=1`)
        }    
    }else{
        res.send({ success: false })
    }
})




router.post('/product/edit', async (req, res) => {
    /**
     * 
     *  BODY: {
     *  product_id: <String>,
        product_name: <String>,
        cate_id: <String>,
        type_id: <String>,
        group_id: <String>,
        unit_id: <String>,
        price: <Int>,
        is_new: <Bool>,
        is_for_sale: <Bool>,
        sale_percentage: <Int>,
        brand_id: <String>,
        in_stock: <Bool>,
        introducing: <String>,
        description: <String>,
        technical: <String>

        relatve_1,
        relatve_2,
        relatve_3,
        relatve_4,
     * }

        FiLES: {
            product_image: <FILE>,
            technical_images: <FILE>[]
        }


     * 


        CHƯA TEST
     */
    
    
    
    const { 
        product_id,
        product_name,
        cate_id,
        type_id,
        group_id,
        unit_id,
        brand_id,

        price,
        is_new,
        is_for_sale,
        sale_percentage,
        in_stock,

        introducing,
        description,
        technical,

        relatve_1,
        relatve_2,
        relatve_3,
        relatve_4 
    } = req.body;

    const {
        product_image,
        technical_images, 
    } =  req.files ? req.files : {}
    


    const dataValidate = functions.nullCheck(req.body, ["product_id", "product_name", "cate_id", "price", "is_new", "introducing", "description", "technical" ])
    
    if( dataValidate ){

        const existedProduct = await MySQL_QUERY(`SELECT * FROM SANPHAM WHERE ma_san_pham = '${ product_id }'`)
        
        if( existedProduct.length > 0 ){
            
            if( product_image ){
                console.log("START CHANGE IMAGE")
                const ext = product_image.name.split('.').pop()
                const filename = `${product_id}-${functions.getFormatedUUID()}.${ext}`
    
                const imagePath = `public/assets/products/${ filename }`
                const savePath = `/assets/products/${ filename }`

                await MySQL_QUERY(`
                    UPDATE SANPHAM SET anh_dai_dien='${ savePath }' WHERE ma_san_pham = '${product_id}'
                `)
                product_image.mv(imagePath)

                console.log("COMPLETED CHANGE IMAGE")
                
            }
            
            if(  technical_images ){
                let Technical_images = technical_images
                if( technical_images.length == undefined ){
                    Technical_images = [technical_images]
                }

                await MySQL_QUERY(`DELETE FROM ANHBOSUNG WHERE ma_san_pham='${product_id}'`)

                 const queries = []
                    for( let i = 0 ; i < Technical_images.length; i++ ){
                        const img = Technical_images[i]
                        const ext = img.name.split('.').pop()
                        const img_id = functions.getFormatedUUID();

                        const filename = `${img_id}.${ext}`
            
                        const imagePath = `public/assets/products/exts/${ filename }`
                        const savePath = `/assets/products/exts/${ filename }`
            
                        img.mv( imagePath )
                        const query = `
                            ('${ product_id }','${ savePath }', '${ filename } - ${ product_id } - ${product_name}' )
                        `
                        queries.push( query )
                    }

                    const head = `INSERT INTO ANHBOSUNG(ma_san_pham, url, abs_ghi_chu) VALUES`
                    const tail = queries.join(', ')
                    const extendedImageQuery = head + tail;
                    await MySQL_QUERY( extendedImageQuery )
            }


    
    
                const updateQuery = `
                    UPDATE SANPHAM SET
                        ten_san_pham = '${ product_name }',
                        dong_san_pham ='${ cate_id }',
                        loai_san_pham = '${type_id}',
                        nhom_san_pham = '${group_id}',
                        don_vi_tinh = '${unit_id}',
                        thuong_hieu = '${brand_id}',

                        gia = ${price},
                        san_pham_moi = ${is_new },
                        dang_giam_gia = ${is_for_sale },
                        phan_tram_giam = ${sale_percentage},
                        trang_thai = ${in_stock },

                        gioi_thieu = '${introducing}',
                        mo_ta = '${description}',
                        thong_so_ky_thuat = '${technical}'
                    WHERE ma_san_pham = '${ product_id }'
                `;        
                
                
                await MySQL_QUERY( updateQuery )
                await MySQL_QUERY(`DELETE FROM SANPHAMLIENQUAN WHERE san_pham_goc='${product_id}'`)       

                const uniqueSet = new Set( [ relatve_1, relatve_2, relatve_3, relatve_4 ])
                const relativeProducts = [...uniqueSet]
                
                const relQueries = []
                for( let i = 0; i < relativeProducts.length; i++ ){
                    const rel = relativeProducts[i]
                    if( rel ){
                        const query = `
                            ( '${ product_id }', '${ rel }' )                            
                        `;
                        relQueries.push( query )
                    }
                }
                if( relQueries.length > 0 ){
                    const relQuery = `INSERT INTO SANPHAMLIENQUAN VALUES ${ relQueries.join(', ') }`;
                    MySQL_QUERY( relQuery )
                }

                res.redirect(`/admin/product/products/edit/${ product_id }?success=1`)    
                  
        }else{
            res.redirect(`/admin/product/products/edit/${ product_id }`)
        }    
    }else{
        res.send({ success: false })
    }
    
})





router.get('/products/edit/:product_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/products/new"
     *  
     *  PARAMS: 
     *      - product_id: <String>
     * 
     *  tham số khả dĩ
     *      existed
     */

    const { product_id } = req.params;

    const queries = {
        brands: `
            SELECT * FROM THUONGHIEU
        `,
        cates: `
            SELECT * FROM DONGSANPHAM
        `,
        units: `
            SELECT * FROM DONVITINH ORDER by ma_don_vi DESC
        `,
        product: `SELECT * FROM SANPHAM WHERE ma_san_pham = '${ product_id }'`
    };
    

    const [ brands, cates, units, product ] = await Promise.all([
        MySQL_QUERY(queries.brands),
        MySQL_QUERY(queries.cates),
        MySQL_QUERY(queries.units),
        MySQL_QUERY(queries.product)
    ])

    if( product && product.length > 0 ){
        const extendedImagesQuery = `SELECT * FROM ANHBOSUNG WHERE ma_san_pham='${ product_id }'`
        const relativeProductsQuery = `
            SELECT san_pham_goc, ma_san_pham, anh_dai_dien
                FROM SANPHAM AS S
                    INNER JOIN SANPHAMLIENQUAN as L on S.ma_san_pham = L.san_pham_lien_quan
            WHERE san_pham_goc = '${ product_id }';
        `
        const [ extendedImages, relativeProducts ] = await Promise.all([
            MySQL_QUERY(extendedImagesQuery),
            MySQL_QUERY(relativeProductsQuery)
        ])

        res.render('admin_product/admin_p_products_edit', {
            layout: "admin",
            title: `${ product_id } - Cập nhật sản phẩm | ${COMPANY}`,
            auth: req.session.auth,
            product: product[0],
            cates,
            brands,
            units,
            extendedImages: extendedImages.length > 0 ? extendedImages : undefined,
            relative_1: relativeProducts[0],
            relative_2: relativeProducts[1],
            relative_3: relativeProducts[2],
            relative_4: relativeProducts[3],
            
            ...req.query,
        })

    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }
})

// router.get('/initial-info', async (req, res) => {

//     /**
//      * 
//      *  URL: "/admin/product/initial-info"
//      * 
//      * 
//      */


//     const context = {
//         success: false,
//         content: "Not privileges",
//         data: {}
//     }

//     const queries = {
//         types: `
//             SELECT * FROM LOAISANPHAM
//         `,
//         groups: `
//             SELECT * FROM NHOMSANPHAM
//         `,
//     };

//     const [ types, groups ] = await Promise.all([
//         MySQL_QUERY(queries.types),
//         MySQL_QUERY(queries.groups),
//     ])
    
//     context.data = {
//         types,
//         groups,
//     }

//     res.send(context)
// })



router.delete('/', (req, res)=> {
    console.log(req.body)
    res.send({ success: true })
})
















/** PRODUCT CATES */

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
                FROM DONGSANPHAM LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < cates.length; i++ ){
                cates[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }   
          
            res.render('admin_product/admin_p_categories', {
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
            FROM DONGSANPHAM LIMIT ${ RECORDS_PER_PAGE };
        `)
    
        for( let i = 0 ; i < cates.length; i++ ){
            cates[i].index = i + 1;
        }
    
        res.render('admin_product/admin_p_categories', {
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

    res.render('admin_product/admin_p_categories_add', {
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

        res.render('admin_product/admin_p_category_edit', {
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


router.delete('/product-category', async (req, res) => {


    /**
     * 
     *  URL: "/admin/product/product-type"
     *  
     */


    const { cate_id } = req.body;

    const { auth } = req.session;

    const context = {
        success: false,
        content: ""
    }

    // const isPrivileged = functions.isAdmin( auth )

    // if( isPrivileged){
        const cates = await MySQL_QUERY(`SELECT * FROM  DONGSANPHAM WHERE ma_dong = '${ cate_id }'`);
                

        if( cates && cates.length > 0 ){           

            const queries = {
                dependendedProducts: `SELECT COUNT(*) AS total FROM SANPHAM WHERE dong_san_pham = '${ cate_id }'`,
                dependendedTypes: `SELECT COUNT(*) AS total FROM LOAISANPHAM WHERE dong_san_pham = '${ cate_id }'`,
            }

            const [ 
                dependendedProducts,
                dependendedTypes
            ] = await Promise.all([
                MySQL_QUERY(queries.dependendedProducts),
                MySQL_QUERY(queries.dependendedTypes),
            ])

            if( dependendedProducts[0].total === 0 ){       
                
                if( dependendedTypes[0].total === 0 ){
                    
                    const query = `DELETE FROM DONGSANPHAM WHERE ma_dong='${ cate_id }'`
                    await MySQL_QUERY( query ); 
                    context.success = true;
                    context.content = "Xóa thành công"                               


                }else{
                    context.content = "Tồn tại loại sản phẩm đang thuộc dòng sản phẩm này"
                }
            }else{
                context.content = "Tồn tại sản phẩm đang thuộc dòng sản phẩm này"
            }
        }else{
            context.content = "Dòng sản phẩm không tồn tại hoặc đã bị xóa"
        }
    // }else{
        
    // }    

    res.send( context )
})


/** PRODUCT TYPE */

router.get('/product-types', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-types"
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
            SELECT COUNT(*) AS total FROM LOAISANPHAM
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const types = await MySQL_QUERY(`
                SELECT 
                    MA_LOAI AS type_id, 
                    TEN_LOAI AS type_name, 
                    TEN_DONG AS cate_name,
                    LSP_GHI_CHU AS note
                FROM 
                    LOAISANPHAM AS L 
                        INNER JOIN DONGSANPHAM AS D ON L.DONG_SAN_PHAM = D.MA_DONG 
                LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < types.length; i++ ){
                types[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }   
          
            res.render('admin_product/admin_p_types', {
                layout: "admin",
                title: `Loại sản phẩm | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/admin/product/product-types"
                },
                types,
            })
            
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM LOAISANPHAM
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const types = await MySQL_QUERY(`
            SELECT 
                MA_LOAI AS type_id, 
                TEN_LOAI AS type_name, 
                TEN_DONG AS cate_name,
                LSP_GHI_CHU AS note
            FROM 
                LOAISANPHAM AS L 
                    INNER JOIN DONGSANPHAM AS D ON L.DONG_SAN_PHAM = D.MA_DONG 
            LIMIT ${ RECORDS_PER_PAGE }
        `)
    
        for( let i = 0 ; i < types.length; i++ ){
            types[i].index = i + 1;
        }
    
        res.render('admin_product/admin_p_types', {
            layout: "admin",
            title: `Loại sản phẩm | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/admin/product/product-types"
            },
            types,
           
        })
    }
})


router.get('/product-types/new', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-types/new"
     *  available params:
     *      - existed,
     *      - fkconflict
     *      - success
     * 
     */
    const { existed, success, fkconflict } = req.query;

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);

    res.render('admin_product/admin_p_types_add', {
        layout: "admin",
        title: `Loại sản phẩm | ${COMPANY}`,
        auth: req.session.auth,
        success,
        existed,
        fkconflict,
        cates
    })
})


router.post('/product-type', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-type"
     * 
     */

    const { type_id, type_name, cate_id, note } = req.body;
    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["type_id", "type_name", "cate_id"] )

        if( validateData ){                        
            
            const cate = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM WHERE ma_dong='${ cate_id }'`)

            if( cate && cate.length > 0 ){
                const type = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai='${ type_id }'`)

                if( type && type.length === 0 ){
                    const insertQuery = `
                        INSERT INTO LOAISANPHAM(ma_loai, ten_loai, dong_san_pham, lsp_ghi_chu ) 
                        VALUES( '${ type_id }', '${ type_name }', '${ cate_id }', '${ note }' );
                    `;

                    await MySQL_QUERY(insertQuery)
                    res.redirect('/admin/product/product-types/new?success=1')    
                }else{
                    res.redirect('/admin/product/product-types/new?existed=1')    
                }
            }else{
                res.redirect('/admin/product/product-types/new?fkconflict=1')
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

router.get('/product-types/edit/:type_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-types/edit/:type_id"
     *  Tham số khả dĩ
     * 
     *  - success: Thành công
     *  - fkconflict: Xung đột khóa ngoại
     * 
     */
    const { success, fkconflict } = req.query;
    
    const { type_id } = req.params;
    const types = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai = '${ type_id }'`)
    
    if( types && types.length > 0 ){
        const type = types[0];

        const cates = await MySQL_QUERY(`SELECT MA_DONG AS cate_id, TEN_DONG AS cate_name, IF( MA_DONG = '${ type.dong_san_pham }', TRUE, FALSE ) AS selected FROM DONGSANPHAM;`) 

        res.render('admin_product/admin_p_types_edit', {
            layout: "admin",
            title: `${ type?.ma_loai } | ${COMPANY}`,
    
            auth: req.session.auth,
            cates,
            type,
            success
        })
    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }
})

router.post('/product-type/edit', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-type/edit"
     *  
     */

    const { type_id, type_name, cate_id, note } = req.body;
    const { auth } = req.session;
    

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    // if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["type_id", "type_name", "cate_id"] )

        if( validateData ){                        
            
            const types = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai='${ type_id }'`)
            
            if( types && types.length > 0 ){           

                const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM WHERE ma_dong='${ cate_id }'`);
                if( cates && cates.length > 0 ){

                    const updateQuery = `
                        UPDATE LOAISANPHAM SET
                            ten_loai = '${type_name}',
                            dong_san_pham = '${ cate_id }',
                            lsp_ghi_chu = '${ note }'
                        WHERE ma_loai='${type_id}'
                    `;

                    await MySQL_QUERY(updateQuery);
                    res.redirect(`/admin/product/product-types/edit/${ type_id }?success=1`)

                }else{
                    res.redirect('/admin/e/not-found')
                }
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


router.delete('/product-type', async (req, res) => {


    /**
     * 
     *  URL: "/admin/product/product-type"
     *  
     */


    const { type_id } = req.body;

    const { auth } = req.session;

    const context = {
        success: false,
        content: ""
    }

    // const isPrivileged = functions.isAdmin( auth )

    // if( isPrivileged){
        const types = await MySQL_QUERY(`SELECT * FROM  LOAISANPHAM WHERE ma_loai='${ type_id }'`);

        

        if( types && types.length > 0 ){           

            const queries = {
                dependendedProducts: `SELECT COUNT(*) AS total FROM SANPHAM WHERE loai_san_pham = '${ type_id }'`,
                dependendedGroups: `SELECT COUNT(*) AS total FROM NHOMSANPHAM WHERE loai_san_pham = '${ type_id }'`,
            }
            const [ 
                dependendedProducts,
                dependendedGroups
            ] = await Promise.all([
                MySQL_QUERY(queries.dependendedProducts),
                MySQL_QUERY(queries.dependendedGroups),
            ])

            if( dependendedProducts[0].total === 0 ){       
                
                if( dependendedGroups[0].total === 0 ){
                    
                    const query = `DELETE FROM LOAISANPHAM WHERE ma_loai='${ type_id }'`
                    await MySQL_QUERY( query ); 
                    context.success = true;
                    context.content = "Xóa thành công"                               


                }else{
                    context.content = "Tồn tại nhóm sản phẩm đang thuộc loại sản phẩm này"
                }
            }else{
                context.content = "Tồn tại sản phẩm đang thuộc nhóm sản phẩm này"
            }
        }else{
            context.content = "Loại sản phẩm không tồn tại hoặc đã bị xóa"
        }
    // }else{
        
    // }    

    res.send( context )
})

/** PRODUCT GROUP */

router.get('/product-groups', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-groups"
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
            SELECT COUNT(*) AS total FROM NHOMSANPHAM
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const groups = await MySQL_QUERY(`
                SELECT 
                    MA_NHOM AS group_id, 
                    TEN_NHOM AS group_name, 
                    TEN_LOAI AS type_name,
                    NSP_GHI_CHU AS note
                FROM 
                    NHOMSANPHAM AS N 
                        INNER JOIN LOAISANPHAM AS L ON N.LOAI_SAN_PHAM = L.MA_LOAI 
                ORDER BY TEN_LOAI
                LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < groups.length; i++ ){
                groups[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }   
          
            res.render('admin_product/admin_p_groups', {
                layout: "admin",
                title: `Loại sản phẩm | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/admin/product/product-groups"
                },
                groups,
            })
            
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM NHOMSANPHAM
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const groups = await MySQL_QUERY(`
            SELECT 
                MA_NHOM AS group_id, 
                TEN_NHOM AS group_name, 
                TEN_LOAI AS type_name,
                NSP_GHI_CHU AS note
            FROM 
                NHOMSANPHAM AS N 
                    INNER JOIN LOAISANPHAM AS L ON N.LOAI_SAN_PHAM = L.MA_LOAI 
            ORDER BY TEN_LOAI
            LIMIT ${ RECORDS_PER_PAGE }
        `)
    
        for( let i = 0 ; i < groups.length; i++ ){
            groups[i].index = i + 1;
        }
    
        res.render('admin_product/admin_p_groups', {
            layout: "admin",
            title: `Loại sản phẩm | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/admin/product/product-groups"
            },
            groups,
           
        })
    }

})

router.get('/product-groups/new', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-groups/new"
     *  available params:
     *      - existed,
     *      - fkconflict
     *      - success
     * 
     */
    const { existed, success, fkconflict } = req.query;

    const types = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM`);

    res.render('admin_product/admin_p_groups_add', {
        layout: "admin",
        title: `Nhóm sản phẩm | ${COMPANY}`,
        auth: req.session.auth,
        success,
        existed,
        fkconflict,
        types
    })
})

router.post('/product-group', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-group"
     * 
     */

    const { group_id, group_name, type_id, note } = req.body;
    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["group_id", "group_name", "type_id"] )

        if( validateData ){      

            const type = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai='${ type_id }'`)

            if( type && type.length > 0 ){
                const group = await MySQL_QUERY(`SELECT * FROM NHOMSANPHAM WHERE ma_nhom='${ group_id }'`)

                if( group && group.length === 0 ){
                    const insertQuery = `
                        INSERT INTO NHOMSANPHAM(ma_nhom, ten_nhom, loai_san_pham, nsp_ghi_chu ) 
                        VALUES( '${ group_id }', '${ group_name }', '${ type_id }', '${ note }' );
                    `;
                    await MySQL_QUERY(insertQuery)
                    res.redirect('/admin/product/product-groups/new?success=1')    
                }else{
                    res.redirect('/admin/product/product-groups/new?existed=1')    
                }
            }else{
                res.redirect('/admin/product/product-groups/new?fkconflict=1')
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

router.get('/product-groups/edit/:group_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-groups/edit/:group_id"
     *  Tham số khả dĩ
     * 
     *  - success: Thành công
     *  - fkconflict: Xung đột khóa ngoại
     * 
     */
    const { success, fkconflict } = req.query;
    
    const { group_id } = req.params;
    const groups = await MySQL_QUERY(`SELECT * FROM NHOMSANPHAM WHERE ma_nhom = '${ group_id }'`)
    
    if( groups && groups.length > 0 ){
        const group = groups[0];

        const types = await MySQL_QUERY(`SELECT MA_LOAI AS type_id, TEN_LOAI AS type_name, IF( MA_LOAI = '${ group.loai_san_pham }', TRUE, FALSE ) AS selected FROM LOAISANPHAM;`) 

        res.render('admin_product/admin_p_groups_edit', {
            layout: "admin",
            title: `${ group?.ma_nhom } | ${COMPANY}`,
    
            auth: req.session.auth,
            types,
            group,
            fkconflict,
            success
        })
    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }
})


router.post('/product-group/edit', async (req, res) => {

    /**
     * 
     *  URL: "/admin/product/product-group/edit"
     *  
     */

    const { group_id, group_name, type_id, note } = req.body;
    const { auth } = req.session;
    

    const isPrivileged = functions.isAdmin(auth)
    /** Kiểm tra quyền, nếu Admin thì đi tiếp  */
    // if( isPrivileged ){        

        const validateData = functions.nullCheck( req.body, ["group_id", "group_name", "type_id"] )

        if( validateData ){                        
            
            const groups = await MySQL_QUERY(`SELECT * FROM NHOMSANPHAM WHERE ma_nhom='${ group_id }'`)
            
            if( groups && groups.length > 0 ){
                const group = groups[0]               

                const types = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai='${ type_id }'`);
                if( types && types.length > 0 ){

                    const updateQuery = `
                        UPDATE NHOMSANPHAM SET
                            ten_nhom = '${group_name}',
                            loai_san_pham = '${ type_id }',
                            nsp_ghi_chu = '${ note }'
                        WHERE ma_nhom='${group_id}'
                    `;

                    await MySQL_QUERY(updateQuery);
                    res.redirect(`/admin/product/product-groups/edit/${ group_id }?success=1`)

                }else{
                    res.redirect('/admin/e/not-found')
                }
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

router.delete('/product-group', async (req, res) => {


    /**
     * 
     *  URL: "/admin/product/product-group"
     *  
     */


    const { group_id } = req.body;

    const { auth } = req.session;

    const context = {
        success: false,
        content: ""
    }

    // const isPrivileged = functions.isAdmin( auth )

    // if( isPrivileged){
        const groups = await MySQL_QUERY(`SELECT * FROM  NHOMSANPHAM WHERE ma_nhom='${ group_id }'`);

        

        if( groups && groups.length > 0 ){           
            const dependendedProducts = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM SANPHAM WHERE nhom_san_pham = '${ group_id }'`)

            if( dependendedProducts[0].total == 0 ){
                const query = `DELETE FROM NHOMSANPHAM WHERE ma_nhom='${group_id}'`
                await MySQL_QUERY( query ); 
                context.success = true;
                context.content = "Xóa thành công"                               
            }else{
                context.content = "Tồn tại sản phẩm đang thuộc nhóm sản phẩm này"
            }
        }else{
            context.content = "Nhóm không tồn tại hoặc đã bị xóa"
        }
    // }else{
        
    // }    

    res.send( context )
})



/** PRODUCT UNIT */


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
                FROM DONVITINH LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < units.length; i++ ){
                units[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }
    
    
        
            res.render('admin_product/admin_p_units', {
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
            FROM DONVITINH LIMIT ${ RECORDS_PER_PAGE };
        `)
    
        for( let i = 0 ; i < units.length; i++ ){
            units[i].index = i + 1;
        }
    
        res.render('admin_product/admin_p_units', {
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

    

    res.render('admin_product/admin_p_units_add', {
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

        res.render('admin_product/admin_p_units_edit', {
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

router.delete('/product-unit', async (req, res) => {


    /**
     * 
     *  URL: "/admin/product/product-group"
     *  
     */


    const { unit_id } = req.body;

    const { auth } = req.session;

    const context = {
        success: false,
        content: ""
    }

    // const isPrivileged = functions.isAdmin( auth )

    // if( isPrivileged){
        const units = await MySQL_QUERY(`SELECT * FROM  DONVITINH WHERE ma_don_vi='${ unit_id }'`);

        if( units && units.length > 0 ){           
            const dependendedProducts = await MySQL_QUERY(`SELECT COUNT(*) AS total FROM SANPHAM WHERE don_vi_tinh = '${ unit_id }'`);

            if( dependendedProducts[0].total == 0 ){
                const query = `DELETE FROM DONVITINH WHERE ma_don_vi='${unit_id}'`
                await MySQL_QUERY( query ); 
                context.success = true;
                context.content = "Xóa thành công"                               
            }else{
                context.content = "Tồn tại sản phẩm đang thuộc nhóm sản phẩm này"
            }
        }else{
            context.content = "Nhóm không tồn tại hoặc đã bị xóa"
        }
    // }else{
        
    // }    

    res.send( context )
})


module.exports = router;