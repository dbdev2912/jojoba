const TAX = 10; // 10% VAT
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 48;
const COMPANY = "Cửa hàng Xuân Dũng"

const RECORDS_PER_PAGE = 12;

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

    RECORDS_PER_PAGE,

    ROLES: roles,
    ADMIN: defaultAccount
}