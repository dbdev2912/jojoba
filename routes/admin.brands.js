const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

const { COMPANY } = require('../configs/enum')
const functions = require('../configs/functions');
const MySQL_QUERY = require('../db/connector');
// Routing 


router.get('/', async (req, res) => {

    /**
     * 
     *  URL: "/admin/brands"
     * 
     */


    // const brands = [
    //     {
    //         brand_id: "BRAND-01",
    //         brand_name: "JOJOBA TAIWAN",
    //         email: "",
    //         hotline: "",
    //         address: "",
    //         note: "",
    //         logo: "/assets/brands/jojoba.png"
    //     },        
    // ]

    const brands = await MySQL_QUERY(`
        SELECT 
            ma_thuong_hieu AS brand_id, 
            ten_thuong_hieu AS brand_name,
            logo
        FROM THUONGHIEU
    `)

    res.render('admin_brands/admin_brands', {
        layout: "admin",
        title: `Thương hiệu | ${COMPANY }`,
        auth: req.session.auth,
        brands,
    });
});


router.get('/new', (req, res) => {

    /**
     * 
     *  URL: "/admin/brands/new"
     *  tham số khả dĩ
     * 
     *  - logo => Thiếu logo
     *  - existed => Mã thương hiệu đã tồn tại
     * 
     */ 

    const { logo, success, existed } = req.query

    res.render('admin_brands/admin_brands_add', {
        layout: "admin",
        title: `Thương hiệu | ${COMPANY }`,
        logo, success, existed
    });
});


router.get('/edit/:brand_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/brands/new"
     *  tham số khả dĩ
     * 
     *  - logo => Thiếu logo
     *  - existed => Mã thương hiệu đã tồn tại
     * 
     */ 


    const { brand_id } = req.params;

    const brands = await MySQL_QUERY(`
        SELECT * FROM  THUONGHIEU WHERE ma_thuong_hieu = '${brand_id}';    
    `);

    if( brands && brands.length > 0 ){
        const { logo, success, existed } = req.query
    
        res.render('admin_brands/admin_brands_edit', {
            layout: "admin",
            title: `${ brand_id } | ${COMPANY }`,
            logo, success, existed,
            brand: brands[0]
        });

    }else{
        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${ COMPANY }`,
        });
    }    

});


router.post('/', async (req, res) => {
    /**
     * 
     * path: /admin/brands
     * 
     */

    const {
        brand_id,
        brand_name,

        brand_email,
        brand_hotline,
        note,
    } = req.body;
    const logo = req.files?.brand_logo;


    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Xét quyền, nếu admin thì tiếp, k thì đến forbidden */
    if( isPrivileged ){
        /** Nếu tồn tại logo thì tiếp, nếu k thì thì chuyển hướng đến trang lỗi */
        if(logo){
            const validateData = functions.nullCheck(req.body, ["brand_id", "brand_name"])
            if(validateData){

                const brands = await MySQL_QUERY(`SELECT * FROM THUONGHIEU WHERE ma_thuong_hieu = '${brand_id}';`);
                
                if( brands.length == 0 ){

                    const ext = logo.name.split('.').pop()
                    const filename = `${functions.getFormatedUUID()}.${ext}`
                    
                    const logoPath = `public/assets/brands/${ filename }`
                    const savePath = `/assets/brands/${ filename }`

                    /** Dịch chuyển ảnh đến thư mục  */
                    logo.mv(logoPath)
                    


                    const insertQuery = `
                        INSERT INTO THUONGHIEU(ma_thuong_hieu, ten_thuong_hieu, email, hotline, dia_chi, th_ghi_chu, logo)
                        VALUES( '${ brand_id }', '${ brand_name }', '${ brand_email }', '${ brand_hotline }', '','${ note }', '${ savePath }' );
                    `;
                    await MySQL_QUERY(insertQuery);
    
                    res.redirect('/admin/brands/new?success=1')
                }else{
                    res.redirect('/admin/brands/new?existed=1')
                }
            }else{
                res.send({ success: false })
            }

        }else{
            res.redirect('/admin/brands/new?logo=1')
        }

    }else{
        res.redirect('/admin/e/no-privileged')
    }    
})



module.exports = router;


