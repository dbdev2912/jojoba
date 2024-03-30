const express = require('express');
const router = express.Router();

const MySQL_QUERY = require('../db/connector')
const functions = require('../configs/functions')
const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ROLES, ADMIN } = require('../configs/enum')

router.get('/', (req, res) => {
    res.send("TEST API")
})

router.post('/signin', async (req, res) => {
    /**
     * 
     *  URL: localhost:5000/api/u/signin
     *  BODY: {
     *      username: <String>
     *      password: <String>
     *  } 
     * 
     * 
     *  Đăng nhập và thiết đặt session
     * 
     * 
     *  Nếu role là khách hàng => CHuyển hướng đến trang index
     *  Nếu role là admin => chuyển đến trang /admin/
     */


    const { username, password } = req.body;

    const nullCheck = functions.nullCheck({ username, password }, ["username", "password"])

    if (nullCheck) {

        if( username === ADMIN.username && password === ADMIN.password ){
            req.session.auth = { ...ADMIN, ten_dang_nhap: ADMIN.username, role: ROLES.admin }
            res.redirect('/admin')
        }else{            
            const user = await MySQL_QUERY(`SELECT * FROM TAIKHOAN WHERE ten_dang_nhap = '${username}' AND mat_khau='${password}'`)
            if (user && user.length > 0) {
    
                const { role } = user[0]
    
                if ( role == ROLES.admin ) {
    
                    req.session.auth = { ...user[0], role: ROLES.admin }
                    res.redirect('/admin')
    
                } else {
                    const customer = await MySQL_QUERY(`SELECT * FROM KHACHHANG WHERE ten_dang_nhap = '${username}'`)
                    
                    if (customer && customer[0]) {
                        req.session.auth = { ...user[0], ...customer[0], role: ROLES.khachhang }
                    }
    
                    res.redirect('/')
    
                }
    
            } else {
                res.redirect('/u/login?error=1')
            }
        }
    }
})


router.post('/signup', async (req, res) => {

    /**
     * 
     *  URL: localhost:5000/api/u/signup
     * 
     *  BODY: {
     *      username: <String>
     *      password: <String>
     *      reenter:  <String>
     *      firstname: <String>
     *      lastname: <String>
     *      phone: <String>
     *  } 
     * 
     * 
     */

    const { nullCheck } = functions;

    const { username, password, reenter, firstname, lastname, phone } = req.body;
    const validateData = nullCheck(req.body, ["username", "password", "reenter", "firstname", "lastname", "phone"])
    /**
     *  Kiểm tra tính hợp lệ của dữ liệu, nếu bất kỳ trường nào trong danh sách trên NULL thì coi như dữ liệu không đúng
     *  Dữ liệu từ UI luôn đúng nên bước này để kiểm tra dữ liệu đến từ API
     */
    if (validateData) {
        const user = await MySQL_QUERY(`SELECT * FROM TAIKHOAN WHERE ten_dang_nhap='${username}'`)
        /**
         * Kiểm tra người dùng với tên đăng nhập này đã tồn tại chưa, nếu đã tồn tại thì chuyển hướng đến trang báo lỗi
         */
        if ( user && user.length === 0 && username != ADMIN.username ) {
            /**
             * 
             * Kiểm tra độ dài của mật khẩu có nằm trong phạm vi cho phép hay không
             * 
             */
            if (password.length >= PASSWORD_MIN_LENGTH && password.length < PASSWORD_MAX_LENGTH) {
                /**
                 * 
                 * Kiểm tra mật khẩu và xác nhận mật khẩu có trùng khớp hay không
                 */
                if (password === reenter) {
                    /**
                     * Kiểm tra số di động này đã được dùng để đăng ký hay chưa
                     */
                    const phoneInUse = await MySQL_QUERY(`SELECT * FROM KHACHHANG WHERE so_dien_thoai='${phone}'`)
                    if (phoneInUse && phoneInUse.length == 0) {
                        /**
                         * Tạo mã khách hàng và thêm vào dữ liệu
                         */
                        const customerID = functions.getFormatedUUID()
                        const newAccountQuery = `
                            INSERT INTO TAIKHOAN( ten_dang_nhap, mat_khau, trang_thai, role )
                                          VALUES( '${username}', '${password}', 1, 'khachhang' );
                        `;

                        const newCustomerQuery = `
                            INSERT INTO KHACHHANG( ten_dang_nhap, ma_khach_hang, ho, ten, so_dien_thoai, dia_chi )
                                           VALUES( '${username}', '${customerID}', '${firstname}', '${lastname}', '${phone}', '' )
                        `;

                        await MySQL_QUERY(newAccountQuery)
                        await MySQL_QUERY(newCustomerQuery)

                        req.session.auth = {
                            ten_dang_nhap: username,
                            ma_khach_hang: customerID,
                            ho: firstname,
                            ten: lastname
                        }
                    } else {
                        res.redirect('/u/signup?phone=1')
                    }
                } else {
                    res.redirect('/u/signup?reenter=1')
                }
            } else {
                res.redirect('/u/signup?pwd=1')
            }
        } else {
            res.redirect('/u/signup?email=1')
        }
    } else {
        res.send({ success: false, content: "Invalid dataset" })
    }
})


module.exports = router;