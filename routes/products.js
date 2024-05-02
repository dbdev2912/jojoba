const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY, ROLES, ADMIN, RECORDS_PER_PAGE, DESCRIPTIONS, KEYWORDS } = require('../configs/enum')
const functions = require('../configs/functions')

const MySQL_QUERY = require('../db/connector')


// Routing 
router.get('/', async (req, res) => {

    /**
     * 
     * params:
     *      - page: <Int>
     * 
     */

    const queries = {
        cates: `SELECT * FROM DONGSANPHAM`,
        types: `SELECT * FROM LOAISANPHAM`,
        groups: `SELECT * FROM NHOMSANPHAM`,
    }

    const [cates, types] = await Promise.all([
        MySQL_QUERY(queries.cates),
        MySQL_QUERY(queries.types),

    ])

    // const categoriesFilter = [
    //     {
    //         name: "Women",
    //         id: "category_1",
    //         url: "/cate/category_1"  
    //         active: "active",
    //         options: [
    //             { url: "/", label: "Coats" },
    //             { url: "/", label: "Long" },
    //             { url: "/", label: "Short" },
    //         ]
    //     },
    // ]

    const categoriesFilter = [];
    for (let i = 0; i < cates.length; i++) {
        const cate = cates[i]
        const cloneCate = {
            name: cate.ten_dong,
            id: cate.ma_dong,
            url: `/products/cate/${cate.ma_dong}`,
            options: []
        }

        const corrTypes = types.filter(type => type.dong_san_pham === cate.ma_dong)
        cloneCate.options = corrTypes.map(type => {
            return {
                url: `/products/type/${type.ma_loai}`,
                label: type.ten_loai
            }
        })

        categoriesFilter.push(cloneCate)
    }

    if (categoriesFilter.length > 0) {
        categoriesFilter[0].active = "active";
    }

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
    ]

    const lastPage = {
        name: "Sản phẩm"
    }




    // const products = await MySQL_QUERY(`
    //     SELECT 
    //         ma_san_pham AS product_id,
    //         ten_san_pham AS product_name,
    //         gia AS price,
    //         if( dang_giam_gia = true, gia * phan_tram_giam / 100, gia ) AS sale_price,
    //         dang_giam_gia AS is_sale,
    //         san_pham_moi AS is_new,
    //         anh_dai_dien AS image,
    //         5 as stars
    //     FROM SANPHAM;
    // `)

    const keywords = [
        ...KEYWORDS,
        cates.map(cate => cate.ten_dong),
        types.map(type => type.ten_loai)
    ]

    let { query } = req.query
    const splitedQuery = query ? query.split(';') : []

    const { page } = req.query
    if (functions.intValidate(page)) {

        const pageIndex = parseInt(page)

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM
            ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                `WHERE gia >= ${ splitedQuery[0] } 
                        ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                            AND gia <= ${ splitedQuery[1] }
                        `: `` }
                    `: 
                `` }
        `);
        
        const { total } = totals[0]
        const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

        if (pageIndex > 0 && pageIndex <= maxPageIndex) {
            const products = await MySQL_QUERY(`
                SELECT
                    ma_san_pham AS product_id,
                    ten_san_pham AS product_name,
                    gia AS price,
                    if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                    dang_giam_gia AS is_sale,
                    san_pham_moi AS is_new,
                    (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                    anh_dai_dien AS image,
                    5 as stars
                FROM SANPHAM

                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `WHERE gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }

                    LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
            `)

            for (let i = 0; i < products.length; i++) {
                products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }

            res.render('products', {
                title: `Sản phẩm | ${COMPANY}`,
                filter: categoriesFilter,
                previousPages,
                lastPage,
                auth: req.session.auth,
                KEYWORDS: keywords.join(',').slice(0, 250),

                products,
                cates,

                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/products",
                    query: req.query.query
                },
            })

        } else {
            res.render('404_not_found', {
                cates,
                title: `404 - Not found| ${COMPANY}`,
            });
        }
    } else {
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM
        `);
        const { total } = totals[0]
        const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)
        const products = await MySQL_QUERY(`
                SELECT
                    ma_san_pham AS product_id,
                    ten_san_pham AS product_name,
                    gia AS price,
                    if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                    dang_giam_gia AS is_sale,
                    (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                    san_pham_moi AS is_new,
                    anh_dai_dien AS image,
                    5 as stars
                FROM SANPHAM
                
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `WHERE gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }

                    LIMIT ${RECORDS_PER_PAGE};
            `)

        for (let i = 0; i < products.length; i++) {
            products[i].index = i + 1
        }

        res.render('products', {
            title: `Sản phẩm | ${COMPANY}`,
            filter: categoriesFilter,
            previousPages,
            lastPage,
            auth: req.session.auth,
            KEYWORDS: keywords.join(',').slice(0, 250),

            products,
            cates,

            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/products",
                query: req.query.query
            },
        })
    }
});


router.get('/p/:product_id', async (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
    ]

    const { product_id } = req.params;

// 
    const query = `
        SELECT 
            ma_san_pham AS product_id,
            ten_san_pham AS product_name,
            5 AS rating,
            thuong_hieu AS brand_id,
            (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu = thuong_hieu) AS brand_name,
            (SELECT ten_dong FROM DONGSANPHAM WHERE ma_dong = dong_san_pham) AS cate,
            (SELECT ten_loai FROM LOAISANPHAM WHERE ma_loai = loai_san_pham) AS type,
            (SELECT ten_nhom FROM NHOMSANPHAM WHERE ma_nhom = nhom_san_pham) AS grou_p,
            gia AS price,
            if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
            dang_giam_gia AS is_sale,
            san_pham_moi AS is_new,
            trang_thai AS in_stock,

            anh_dai_dien AS image,
            gioi_thieu AS instroducing,
            mo_ta AS description,
            thong_so_ky_thuat AS specification

        FROM SANPHAM
            WHERE MA_SAN_PHAM = '${product_id}'
    `;

    const relativesQuery = `
        SELECT 
            ma_san_pham AS product_id,
            dang_giam_gia AS is_sale,
            san_pham_moi AS is_new,
            5 AS stars,
            anh_dai_dien AS image,
            "" AS image_alt,
            ten_san_pham AS product_name,
            gia AS price,
            if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price
        FROM SANPHAM 
            AS S INNER JOIN SANPHAMLIENQUAN AS L ON L.san_pham_lien_quan = S.ma_san_pham
        WHERE 
            L.san_pham_goc = '${product_id}'
    `;

    const extendedImageQuery = `
        SELECT * FROM ANHBOSUNG WHERE ma_san_pham = '${product_id}';
    `

    const [products, cates, relatives, images] = await Promise.all([
        MySQL_QUERY(query),
        MySQL_QUERY(`SELECT * FROM DONGSANPHAM`),
        MySQL_QUERY(relativesQuery),
        MySQL_QUERY(extendedImageQuery)
    ])

    // const product = {
    //     product_id: "LB-210",
    //     product_name: "Joboba smart toilet",
    //     rating: 5,
    //     brand_id: 0,
    //     brand_name: "Jojoba taiwan",
    //     price: 8300000,
    //     sale_price: 7900000,
    //     availability: true,
    //     instroducing: "Đây là phần giới thiệu tổng quan về sản phẩm.",
    //     description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret. Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla consequat massa quis enim.

    //         Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`,

    //     specification: `Thông số kĩ thuật`,
    //     preview: [],
    //     is_new: false,
    //     is_sale: false,
    //     in_stock: true
    // }

    const product = products[0]

    // console.log(product)
    if (product) {

        const lastPage = {
            name: `${product.product_name} `
        }

        // const relatives = [
        //     {
        //         image: "/img/product/product-1.jpg",
        //         product_name: "Buttons tweed blazer",
        //         price: "5900000",
        //         sale_price: "4800000",
        //         stars: 5,
        //         is_sale: true,
        //         is_new: true
        //     },
        //     {
        //         image: "/img/product/product-2.jpg",
        //         product_name: "Flowy striped skirt",
        //         price: "59",
        //         sale_price: "48",
        //         stars: 5,
        //         is_new: true,
        //     },
        //     {
        //         image: "/img/product/product-3.jpg",
        //         product_name: "Cotton T-shirt",
        //         price: "59",
        //         sale_price: "48",
        //         stars: 5,
        //         is_sale: true,
        //     },
        //     {
        //         image: "/img/product/product-4.jpg",
        //         product_name: "Slim strped pocket shirt",
        //         price: "59",
        //         sale_price: "48",
        //         stars: 5,
        //     },
        // ]

        const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

        const descriptions = [
            ...DESCRIPTIONS,
            product.product_name,
            product.product_id,
            product.brand_name,
            product.cate,
            product.type,
            product.grou_p
        ]
        const keywords = [
            ...KEYWORDS,
            product.cate,
            product.type,
            product.grou_p
        ]

        res.render('product', {
            title: `${product.product_id} | ${product.product_name} | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,

            DESCRIPTION: descriptions.join(',').slice(0, 250),
            KEYWORDS: keywords.join(',').slice(0, 250),
            cates,
            product,
            relatives,
            images
        })
    } else {
        const lastPage = {
            name: `${product_id}`
        }
        res.render('404_not_found', {

            title: `404 - Not found| ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,
            cates,

        });
    }

})


router.get('/cate/:cate_id', async (req, res) => {

    /**
     * 
     * Tham số khả dĩ:
     *  - page: <Int>
     * 
     */

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
    ]


    const { cate_id } = req.params;
    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);
    const cate = cates.find(c => c.ma_dong == cate_id)

    if (cate) {

        const categoriesFilter = []

        const types = await MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE dong_san_pham = '${cate_id}'`)
        const groups = await MySQL_QUERY(`SELECT * FROM NHOMSANPHAM`)


        // const categoriesFilter = [
        //     {
        //         name: "Women",
        //         id: "category_1",
        //         active: "active",
        //         options: [
        //             { url: "/", label: "Coats" },
        //             { url: "/", label: "Long" },
        //             { url: "/", label: "Short" },
        //         ]
        //     },
        // ]


        for (let i = 0; i < types.length; i++) {
            const type = types[i]
            const cloneType = {
                name: type.ten_loai,
                id: type.ma_loai,
                options: undefined,
                url: `/products/type/${type.ma_loai}`
            }

            const corrGroups = groups.filter(g => g.loai_san_pham === type.ma_loai)
            cloneType.options = corrGroups.map(g => {
                return {
                    url: `/products/group/${g.ma_nhom}`,
                    label: g.ten_nhom
                }
            })

            categoriesFilter.push(cloneType)
        }

        if (categoriesFilter.length > 0) {
            categoriesFilter[0].active = "active"
        }

        const lastPage = {
            name: cate.ten_dong
        }

        const descriptions = [
            ...DESCRIPTIONS,
            cate.ten_dong,
        ]

        const keywords = [
            ...KEYWORDS,
            cate.ma_dong,
            cate.ten_dong,
            types.map(t => t.ten_loai)
        ]

        const { query } = req.query;
        const splitedQuery = query ? query.split(';') : []


        const { page } = req.query
        if (functions.intValidate(page)) {

            const pageIndex = parseInt(page)

            const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM  WHERE dong_san_pham='${cate.ma_dong}'
            ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                `AND gia >= ${ splitedQuery[0] } 
                        ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                            AND gia <= ${ splitedQuery[1] }
                        `: `` }
                    `: 
                `` }
        `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

            if (pageIndex > 0 && pageIndex <= maxPageIndex) {
                const products = await MySQL_QUERY(`
                SELECT
                    ma_san_pham AS product_id,
                    ten_san_pham AS product_name,
                    gia AS price,
                    if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                    dang_giam_gia AS is_sale,
                    (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                    san_pham_moi AS is_new,
                    anh_dai_dien AS image,
                    5 as stars
                FROM SANPHAM
                WHERE dong_san_pham='${cate.ma_dong}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }
                    LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
            `)

                for (let i = 0; i < products.length; i++) {
                    products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                }

                res.render('products', {
                    title: `${cate.ten_dong} | ${COMPANY}`,
                    filter: categoriesFilter,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    accordion_title: cate.ten_dong,

                    DESCRIPTION: descriptions.join(',').slice(0, 250),
                    KEYWORDS: keywords.join(',').slice(0, 250),

                    products,
                    cates,

                    paginate: {
                        pageIndex,
                        maxPageIndex,
                        origin: `/products/cate/${cate.ma_dong}`,
                        query,
                    },
                })

            } else {
                res.render('404_not_found', {

                    title: `404 - Not found| ${COMPANY}`,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    cates,
                    
                });
            }
        } else {
            const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM SANPHAM  WHERE dong_san_pham='${cate.ma_dong}'
        `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)
            const products = await MySQL_QUERY(`
                SELECT
                    ma_san_pham AS product_id,
                    ten_san_pham AS product_name,
                    gia AS price,
                    if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                    dang_giam_gia AS is_sale,
                    san_pham_moi AS is_new,
                    (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                    anh_dai_dien AS image,
                    5 as stars
                FROM SANPHAM
                    WHERE dong_san_pham='${cate.ma_dong}'
                    ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                        `AND gia >= ${ splitedQuery[0] } 
                                ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                    AND gia <= ${ splitedQuery[1] }
                                `: `` }
                            `: 
                        `` }
                    LIMIT ${RECORDS_PER_PAGE};
            `)

            for (let i = 0; i < products.length; i++) {
                products[i].index = i + 1
            }

            res.render('products', {
                title: `${cate.ten_dong} | ${COMPANY}`,
                filter: categoriesFilter,
                previousPages,
                lastPage,
                auth: req.session.auth,
                accordion_title: cate.ten_dong,

                DESCRIPTION: descriptions.join(',').slice(0, 250),
                KEYWORDS: keywords.join(',').slice(0, 250),
                products,
                cates,

                paginate: {
                    pageIndex: 1,
                    maxPageIndex,
                    origin: `/products/cate/${cate.ma_dong}`,
                    query,
                },
            })
        }

    } else {

        const lastPage = {
            name: cate_id
        }

        res.render('404_not_found', {
            title: `404 - NOT FOUND | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,
            cates,
        })
    }
})


router.get('/group/:group_id', async (req, res) => {
    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
    ]

    const categoriesFilter = []

    const { group_id } = req.params;


    const groups = await MySQL_QUERY(`
        SELECT ma_nhom, ten_nhom, ma_loai, ten_loai, ma_dong, ten_dong
        FROM NHOMSANPHAM AS N 
            INNER JOIN LOAISANPHAM AS L ON L.ma_loai = N.loai_san_pham 
                INNER JOIN DONGSANPHAM AS D ON D.ma_dong = L.dong_san_pham

        WHERE MA_NHOM = '${group_id}'
    `)

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);

    if (groups && groups.length > 0) {
        const group = groups[0]
        const catePage = {
            name: group.ten_dong,
            url: `/products/cate/${group.ma_dong}`
        }
        const typePage = {
            name: group.ten_loai,
            url: `/products/type/${group.ma_loai}`
        }
        previousPages.push(catePage)
        previousPages.push(typePage)


        const lastPage = { name: group.ten_nhom }





        const { page, query } = req.query

        const splitedQuery = query ? query.split(';') : []
        if (functions.intValidate(page)) {

            const pageIndex = parseInt(page)

            const totals = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM SANPHAM  WHERE nhom_san_pham='${group.ma_nhom}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }
                
            `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

            if (pageIndex > 0 && pageIndex <= maxPageIndex) {
                const products = await MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                anh_dai_dien AS image,
                5 as stars
            FROM SANPHAM
            WHERE nhom_san_pham='${group.ma_nhom}'

            ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                `AND gia >= ${ splitedQuery[0] } 
                        ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                            AND gia <= ${ splitedQuery[1] }
                        `: `` }
                    `: 
                `` }

                LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
        `)

                for (let i = 0; i < products.length; i++) {
                    products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                }

                res.render('products', {
                    title: `${group.ten_nhom} | ${COMPANY}`,
                    filter: categoriesFilter,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    accordion_title: group.ten_nhom,


                    products,
                    cates,
                    paginate: {
                        pageIndex,
                        maxPageIndex,
                        origin: `/products/group/${group.ma_nhom}`,
                        query,
                    },
                })

            } else {
                res.render('404_not_found', {

                    title: `404 - Not found| ${COMPANY}`,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    cates,

                });
            }
        } else {
            const totals = await MySQL_QUERY(`
        SELECT COUNT(*) AS total FROM SANPHAM  WHERE nhom_san_pham='${group.ma_nhom}'
    `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)
            const products = await MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                anh_dai_dien AS image,
                5 as stars
            FROM SANPHAM
                WHERE nhom_san_pham='${group.ma_nhom}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }

                LIMIT ${RECORDS_PER_PAGE};
        `)

            for (let i = 0; i < products.length; i++) {
                products[i].index = i + 1
            }

            res.render('products', {
                title: `${group.ten_nhom} | ${COMPANY}`,
                filter: categoriesFilter,
                previousPages,
                lastPage,
                auth: req.session.auth,


                products,
                cates,
                accordion_title: group.ten_nhom,

                paginate: {
                    pageIndex: 1,
                    maxPageIndex,
                    origin: `/products/group/${group.ma_nhom}`,
                    query
                },
            })
        }


    } else {
        res.render('404_not_found', {
            title: `404 - NOT FOUND | ${COMPANY}`,
            previousPages,
            lastPage: { name: group_id },
            auth: req.session.auth,
            cates,
        })
    }
})


router.get('/type/:type_id', async (req, res) => {


    /**
         * 
         * Tham số khả dĩ:
         *  - page: <Int>
         * 
         */

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
    ]


    const { type_id } = req.params;
    const [cates, types] = await Promise.all([
        MySQL_QUERY(`SELECT * FROM DONGSANPHAM`),
        MySQL_QUERY(`SELECT * FROM LOAISANPHAM WHERE ma_loai = '${type_id}'`),
    ])
    const type = types[0]

    if (type) {

        const categoriesFilter = []
        const groups = await MySQL_QUERY(`SELECT * FROM NHOMSANPHAM WHERE loai_san_pham='${type_id}'`)

        const parentCate = cates.find(c => c.ma_dong == type.dong_san_pham)
        previousPages.push({
            name: parentCate.ten_dong,
            url: `/products/cate/${parentCate.ma_dong}`,
        },)

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i]
            const cloneGroup = {
                name: group.ten_nhom,
                id: group.ten_nhom,
                options: undefined,
                url: `/products/group/${group.ma_nhom}`
            }

            categoriesFilter.push(cloneGroup)
        }

        if (categoriesFilter.length > 0) {
            categoriesFilter[0].active = "active"
        }

        const lastPage = {
            name: type.ten_loai
        }



        const { page, query } = req.query
        const splitedQuery = query ? query.split(';') : []


        if (functions.intValidate(page)) {

            const pageIndex = parseInt(page)

            const totals = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM SANPHAM  WHERE loai_san_pham='${type.ma_loai}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }    
            `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

            if (pageIndex > 0 && pageIndex <= maxPageIndex) {
                const products = await MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                anh_dai_dien AS image,
                5 as stars
            FROM SANPHAM
            WHERE loai_san_pham='${type.ma_loai}'

            ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                `AND gia >= ${ splitedQuery[0] } 
                        ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                            AND gia <= ${ splitedQuery[1] }
                        `: `` }
                    `: 
                `` } 

                LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
        `)

                for (let i = 0; i < products.length; i++) {
                    products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                }

                res.render('products', {
                    title: `${type.ten_loai} | ${COMPANY}`,
                    filter: categoriesFilter,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,


                    products,
                    cates,
                    accordion_title: type.ten_loai,

                    paginate: {
                        pageIndex,
                        maxPageIndex,
                        origin: `/products/type/${type.ma_loai}`,
                        query,
                    },
                })

            } else {
                res.render('404_not_found', {

                    title: `404 - Not found| ${COMPANY}`,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    cates,

                });
            }
        } else {
            const totals = await MySQL_QUERY(`
        SELECT COUNT(*) AS total FROM SANPHAM  WHERE loai_san_pham='${type.ma_loai}'
    `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)
            const products = await MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                anh_dai_dien AS image,
                5 as stars
            FROM SANPHAM
                WHERE loai_san_pham='${type.ma_loai}'

                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` } 

                LIMIT ${RECORDS_PER_PAGE};
        `)

            for (let i = 0; i < products.length; i++) {
                products[i].index = i + 1
            }

            res.render('products', {
                title: `${type.ten_loai} | ${COMPANY}`,
                filter: categoriesFilter,
                previousPages,
                lastPage,
                auth: req.session.auth,


                products,
                cates,
                accordion_title: type.ten_loai,

                paginate: {
                    pageIndex: 1,
                    maxPageIndex,
                    origin: `/products/type/${type.ma_loai}`,
                    query,
                },
            })
        }

    } else {

        const lastPage = {
            name: type_id
        }

        res.render('404_not_found', {
            title: `404 - NOT FOUND | ${COMPANY}`,
            previousPages,
            lastPage,
            auth: req.session.auth,
            cates,
        })
    }

})




router.get('/brand/:brand_id', async (req, res) => {
    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
        {
            name: "Thương hiệu"
        },
    ]

    const categoriesFilter = []
    

    const { brand_id } = req.params;
    const { page, query } = req.query
    


    const brands = await MySQL_QUERY(`
        SELECT * FROM THUONGHIEU WHERE ma_thuong_hieu = '${brand_id}'
    `)

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);

    if (brands && brands.length > 0) {
        const brand = brands[0]

        const lastPage = { name: brand.ten_thuong_hieu }
        const splitedQuery = query ? query.split(';') : []

        
        if (functions.intValidate(page)) {

            const pageIndex = parseInt(page)

            const totals = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM SANPHAM WHERE thuong_hieu='${brand_id}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }    
            `);
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)

            if (pageIndex > 0 && pageIndex <= maxPageIndex) {
                const products = await MySQL_QUERY(`
                SELECT
                    ma_san_pham AS product_id,
                    ten_san_pham AS product_name,
                    gia AS price,
                    if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                    dang_giam_gia AS is_sale,
                    san_pham_moi AS is_new,
                    anh_dai_dien AS image,
                    (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                    5 as stars
                FROM SANPHAM
                WHERE thuong_hieu='${brand_id}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }

                    LIMIT ${RECORDS_PER_PAGE} OFFSET ${(pageIndex - 1) * RECORDS_PER_PAGE};
        `)

                for (let i = 0; i < products.length; i++) {
                    products[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
                }

                res.render('products', {
                    title: `${brand.ten_thuong_hieu} | ${COMPANY}`,
                    filter: categoriesFilter,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    accordion_title: brand.ten_thuong_hieu,


                    products,
                    cates,
                    paginate: {
                        pageIndex,
                        maxPageIndex,
                        origin: `/products/brand/${brand.ma_thuong_hieu}`,
                        query
                    },
                })

            } else {
                res.render('404_not_found', {

                    title: `404 - Not found| ${COMPANY}`,
                    previousPages,
                    lastPage,
                    auth: req.session.auth,
                    cates,

                });
            }
        } else {
            const totals = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM SANPHAM WHERE thuong_hieu='${brand_id}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }
            `);
            
            const { total } = totals[0]
            const maxPageIndex = Math.ceil(total / RECORDS_PER_PAGE)
            const products = await MySQL_QUERY(`
            SELECT
                ma_san_pham AS product_id,
                ten_san_pham AS product_name,
                gia AS price,
                if( dang_giam_gia = true, gia - (gia * phan_tram_giam / 100), gia ) AS sale_price,
                dang_giam_gia AS is_sale,
                san_pham_moi AS is_new,
                anh_dai_dien AS image,
                (SELECT ten_thuong_hieu FROM THUONGHIEU WHERE ma_thuong_hieu=thuong_hieu) AS brand_name,
                5 as stars
            FROM SANPHAM
                WHERE thuong_hieu='${brand_id}'
                ${ splitedQuery[0] && functions.intValidate(splitedQuery[0]) ? 
                    `AND gia >= ${ splitedQuery[0] } 
                            ${ splitedQuery[1] && functions.intValidate(splitedQuery[1]) ? `
                                AND gia <= ${ splitedQuery[1] }
                            `: `` }
                        `: 
                    `` }
                LIMIT ${RECORDS_PER_PAGE};
        `)

            for (let i = 0; i < products.length; i++) {
                products[i].index = i + 1
            }

            res.render('products', {
                title: `${ brand.ten_thuong_hieu } | ${COMPANY}`,
                filter: categoriesFilter,
                previousPages,
                lastPage,
                auth: req.session.auth,


                products,
                cates,
                accordion_title: brand.ten_thuong_hieu,

                paginate: {
                    pageIndex: 1,
                    maxPageIndex,
                    origin: `/products/brand/${ brand_id }`,
                    query
                },
            })
        }


    } else {
        res.render('404_not_found', {
            title: `404 - NOT FOUND | ${COMPANY}`,
            previousPages,
            lastPage: { name: group_id },
            auth: req.session.auth,
            cates,
        })
    }
})

module.exports = router;
