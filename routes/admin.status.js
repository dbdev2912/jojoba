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
     *  URL: "/admin/status"
     * 
     */


    // const status = [
    //     {
    //         status_id: "TT01",
    //         status_name: "Nhập hàng",
    //         note: ""     
    // ]

    // const status = await MySQL_QUERY(`
    //     SELECT 
    //        ma_trang_thai AS status_id, 
    //         ten_trang_thai AS status_name,
    //         ghi_chu AS note
    //     FROM TRANGTHAI
    // `)

    // res.render('admin_status/admin_status', {
    //     layout: "admin",
    //     title: `Trạng thái | ${COMPANY }`,
    //     auth: req.session.auth,
    //     status,
    // });

    const { page } = req.query;

    if( functions.intValidate(page) ){

        const pageIndex = parseInt( page )

        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM TRANGTHAI
        `);
        const { total } = totals[0]        
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )
        
        if( pageIndex > 0 && pageIndex <= maxPageIndex ){
            
            const status = await MySQL_QUERY(`
                SELECT 
                    ma_trang_thai AS status_id, 
                    ten_trang_thai AS status_name,
                    mac_dinh AS is_default,
                    ghi_chu AS note
                FROM TRANGTHAI LIMIT ${ RECORDS_PER_PAGE } OFFSET ${ (pageIndex - 1) * RECORDS_PER_PAGE };
            `)

            for( let i = 0 ; i < status.length; i++ ){
                status[i].index = (pageIndex - 1) * RECORDS_PER_PAGE + i + 1;
            }
    
    
        
            res.render('admin_status/admin_status', {
                layout: "admin",
                title: `Trạng thái | ${COMPANY}`,
                auth: req.session.auth,
                paginate: {
                    pageIndex,
                    maxPageIndex,
                    origin: "/admin/status"
                },
                status,
            })
        }else{
            res.render('admin_404_not_found', {
                layout: "admin",
                title: `404 - Not found| ${ COMPANY }`,
            });
        }
    
    }else{
        const totals = await MySQL_QUERY(`
            SELECT COUNT(*) AS total FROM TRANGTHAI
        `);
        const { total } = totals[0]     
        const maxPageIndex = Math.ceil( total / RECORDS_PER_PAGE )

        const status = await MySQL_QUERY(`
            SELECT 
                ma_trang_thai AS status_id, 
                ten_trang_thai AS status_name,
                mac_dinh AS is_default,
                ghi_chu AS note
            FROM TRANGTHAI LIMIT ${ RECORDS_PER_PAGE };
        `)
    
        for( let i = 0 ; i < status.length; i++ ){
            status[i].index = i + 1;
        }
    
        res.render('admin_status/admin_status', {
            layout: "admin",
            title: `Trạng thái | ${COMPANY}`,
            auth: req.session.auth,
            paginate: {
                pageIndex: 1,
                maxPageIndex,
                origin: "/admin/status"
            },
            status,
        })
    }
});


router.get('/new', (req, res) => {

    /**
     * 
     *  URL: "/admin/status/new"
     *  tham số khả dĩ
     * 
     *  - logo => Thiếu logo
     *  - existed => Mã thương hiệu đã tồn tại
     * 
     */ 

    const { logo, success, existed } = req.query

    res.render('admin_status/admin_status_add', {
        layout: "admin",
        title: `Thêm trạng thái | ${COMPANY }`,
        auth: req.session.auth,
        logo, success, existed
    });
});


router.get('/edit/:status_id', async (req, res) => {

    /**
     * 
     *  URL: "/admin/status/edit/:status_id"
     *  tham số khả dĩ
     * 
     *  - logo => Thiếu logo
     *  - existed => Mã thương hiệu đã tồn tại
     * 
     */ 


    const { status_id } = req.params;

    const status = await MySQL_QUERY(`
        SELECT * FROM TRANGTHAI WHERE ma_trang_thai = '${ status_id }';    
    `);

    if( status && status.length > 0 ){
        const { logo, success, existed } = req.query
    
        res.render('admin_status/admin_status_edit', {
            layout: "admin",
            title: `${ status_id } | ${COMPANY }`,
            logo, success, existed,
            auth: req.session.auth,
            status: status[0]
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
     * path: /admin/status
     * 
     *  BODY: {
     *      status_id: <String>
     *      status_name: <String>
     *      is_default: <String> ??? "On" or nothing
     *      note: <String>
     *  }
     */

    const {
        status_id,
        status_name,
        is_default,
        note,
    } = req.body;
    
    

    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Xét quyền, nếu admin thì tiếp, k thì đến forbidden */
    if( isPrivileged ){        
        
        const validateData = functions.nullCheck(req.body, ["status_id", "status_name"])

        if( validateData ){

            const existed = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM TRANGTHAI WHERE ma_trang_thai = '${status_id}'
            `);
            if( existed[0].total == 0 ){           
    
                const insertQuery = `
                    INSERT INTO TRANGTHAI (ma_trang_thai, ten_trang_thai, ghi_chu, mac_dinh )
                    VALUES ('${ status_id }', '${ status_name }', '${ note }', ${ is_default ? "TRUE" : "FALSE" })
                `
                
                await MySQL_QUERY( insertQuery )
    
                if(is_default){
                    await MySQL_QUERY(`
                        UPDATE TRANGTHAI SET mac_dinh = FALSE WHERE ma_trang_thai NOT IN ('${ status_id }');
                    `)    
                }
                res.redirect("/admin/status/new?success=1")
            }else{
                res.redirect("/admin/status/new?existed=1")
            }
        }else{
            res.send({ success:false, content: "What you wanna try doing ?" })
        }
    }else{
        res.redirect('/admin/e/no-privileged')
    }    
})



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

    const {
        status_id,
        status_name,
        is_default,
        note,
    } = req.body;
    

    const { auth } = req.session;

    const isPrivileged = functions.isAdmin(auth)
    /** Xét quyền, nếu admin thì tiếp, k thì đến forbidden */
    if( isPrivileged ){
        
        const validateData = functions.nullCheck(req.body, ["status_id", "status_name"])
        
        if( validateData ){

            const existed = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM TRANGTHAI WHERE ma_trang_thai = '${status_id}'
            `);

            if( existed && existed[0].total != 0 ){

                const updateQuery = `
                    UPDATE TRANGTHAI SET
                        ten_trang_thai = '${ status_name }',
                        ghi_chu = '${ note }',
                        mac_dinh = ${ is_default ? "TRUE" : "FALSE" }

                    WHERE ma_trang_thai = '${ status_id }'
                `;

                await MySQL_QUERY(updateQuery)

                if(is_default){
                    await MySQL_QUERY(`
                        UPDATE TRANGTHAI SET mac_dinh = FALSE WHERE ma_trang_thai NOT IN ('${ status_id }');
                    `)    
                }
                res.redirect(`/admin/status/edit/${ status_id }?success=1`)
            }else{
                res.redirect(`/admin/status/edit/${ status_id }`)
            }
        }else{
            res.send({ success:false, content: "What you wanna try doing ?" })
        }
    }else{
        res.redirect('/admin/e/no-privileged')
    }    
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

    // if( auth ){

        const existed = await MySQL_QUERY(`
            SELECT * FROM TRANGTHAI WHERE ma_trang_thai = '${status_id}'
        `);

        if( existed && existed[0] ){
            const existOrdersWithThisStatus = await MySQL_QUERY(`
                SELECT COUNT(*) AS total FROM DONHANG WHERE trang_thai = '${status_id}'
            `)
            if(existOrdersWithThisStatus && existOrdersWithThisStatus[0].total == 0){
                await MySQL_QUERY(`
                    DELETE FROM TRANGTHAI WHERE ma_trang_thai = '${ status_id }'
                `);

                context.success = true;
                context.content = "Xóa thành công!"
                if( existed[0].mac_dinh ){
                    const firstItem = await MySQL_QUERY(`
                        SELECT * FROM TRANGTHAI LIMIT 1
                    `);
                    if( firstItem[0] ){
                        await MySQL_QUERY(`UPDATE TRANGTHAI SET mac_dinh = TRUE WHERE ma_trang_thai = '${ firstItem[0].ma_trang_thai }'`)
                    }
                }
            }else{
                context.content = "Tồn tại ít nhất 1 đơn hàng đang có trạng thái này"    
            }
        }else{
            context.content = "Trạng thái không tồn tại hoặc đã bị xóa"
        }


    // }else{
    //     context.content = "Phiên đăng nhập hết hạn"
    // }
    res.send(context)
})


module.exports = router;


