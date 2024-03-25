const TAX = 10; // 10% VAT
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 48;
const COMPANY = "Cửa hàng Xuân Dũng"


const roles = {
    khachhang: "khachhang",
    admin: "admin"
}

const defaultAccount = {
    username: "administrator",
    password: "1"
}

module.exports = {
    TAX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    COMPANY,

    ROLES: roles,
    ADMIN: defaultAccount
}