const express = require('express');
const router = express.Router();
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')

const MySQL_QUERY = require('../db/connector')

// Routing 
router.get('/', async (req, res) => {


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


    const products = [
        {
            image: "/img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5900000",
            sale_price: "4800000",
            stars: 5,
            is_sale: true,
            is_new: true
        },
        {
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },
        {
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_sale: true,
        },
        {
            image: "/img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },

    ]

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


    res.render('products', {
        title: `Sản phẩm | ${COMPANY}`,
        filter: categoriesFilter,
        previousPages,
        lastPage,
        auth: req.session.auth,


        products,
        cates,
    })
});


router.get('/p/:product_id', async (req, res) => {

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sảm phẩm",
            url: "/products",
        },
    ]




    const product = {
        product_id: "LB-210",
        product_name: "Joboba smart toilet",
        rating: 5,
        brand_id: 0,
        brand_name: "Jojoba taiwan",
        price: 8300000,
        sale_price: 7900000,
        availability: true,
        instroducing: "Đây là phần giới thiệu tổng quan về sản phẩm.",
        description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret. Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla consequat massa quis enim.

            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`,

        specification: `Thông số kĩ thuật`,
        preview: [],
        is_new: false,
        is_sale: false,
        in_stock: true
    }

    const lastPage = {
        name: `${product.product_name} ${product.product_id}`
    }

    const relatives = [
        {
            image: "/img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5900000",
            sale_price: "4800000",
            stars: 5,
            is_sale: true,
            is_new: true
        },
        {
            image: "/img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },
        {
            image: "/img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_sale: true,
        },
        {
            image: "/img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
    ]

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`)

    res.render('product', {
        title: `${product.product_id} | ${product.product_name} | ${COMPANY}`,
        previousPages,
        lastPage,
        auth: req.session.auth,

        cates,
        product,
        relatives
    })
})


router.get('/cate/:cate_id', async (req, res) => {
    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sảm phẩm",
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
                url: `/products/type/${ type.ma_loai }`
            }
          
            const corrGroups = groups.filter( g => g.loai_san_pham === type.ma_loai ) 
            cloneType.options = corrGroups.map(g => {
                return {
                    url: `/products/group/${ g.ma_nhom }`,
                    label: g.ten_nhom
                }
            })

            categoriesFilter.push(cloneType)
        }

        if( categoriesFilter.length > 0 ){
            categoriesFilter[0].active = "active"
        }

        const lastPage = {
            name: cate.ten_dong
        }

        res.render('products', {
            title: `${cate.ten_dong} | ${COMPANY}`,
            filter: categoriesFilter,
            previousPages,
            lastPage,
            auth: req.session.auth,
            accordion_title: cate.ten_dong,


            products: [],
            cates,
        })

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
            name: "Sảm phẩm",
            url: "/products",
        },
    ]

    const { group_id } = req.params;
    const groups = await MySQL_QUERY(`
        SELECT ma_nhom, ten_nhom, ma_loai, ten_loai
        FROM NHOMSANPHAM AS N 
            INNER JOIN LOAISANPHAM AS L ON L.ma_loai = N.loai_san_pham 
        WHERE MA_NHOM = '${ group_id }'
    `)

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);

    if( groups && groups.length > 0 ){
        const group = groups[0]
        const typePage = {
            name: group.ten_loai,
            url: `/products/type/${ group.ten_loai }`
        }
        previousPages.push(typePage)

        res.render('products_group', {
            title: `${ group.ten_nhom } | ${COMPANY}`,
            previousPages,
            lastPage: { name: group.ten_nhom },
            auth: req.session.auth,
            cates,
            accordion_title: group.ten_nhom
        })

    }else{
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
    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: "Sảm phẩm",
            url: "/products",
        },
    ]

    const { type_id } = req.params;
    const types = await MySQL_QUERY(`
        SELECT ma_loai, ten_loai, ma_dong, ten_dong
        FROM DONGSANPHAM AS D INNER JOIN 
                LOAISANPHAM AS L ON L.dong_san_pham = D.ma_dong
        WHERE MA_LOAI = '${ type_id }'
    `)

    const cates = await MySQL_QUERY(`SELECT * FROM DONGSANPHAM`);

    if( types && types.length > 0 ){
        const type =types[0]

        const catePage = {
            name: type.ten_dong,
            url: `/products/type/${ type.ten_loai }`
        }
        
        previousPages.push(catePage)

        res.render('products_type', {
            title: `${ type.ten_loai } | ${COMPANY}`,
            previousPages,
            lastPage: { name: type.ten_loai },
            auth: req.session.auth,
            cates,
            accordion_title: types.ten_nhom
        })

    }else{
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
