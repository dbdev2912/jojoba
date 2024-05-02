const TAX = 10; // 10% VAT
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 48;
const COMPANY = "Nhà phân phối Xuân Dũng Cần Thơ - Thiết bị vệ sinh, thiết bị nhà bếp, máy nước nóng"

const RECORDS_PER_PAGE = 12;

const roles = {
    khachhang: "khachhang",
    admin: "admin"
}

const defaultAccount = {
    username: "administrator",
    password: "1"
}

const descriptions = [
    "Nhà phân phối Xuân Dũng",
    "Bàn cầu Cần Thơ", "đồ inox giá tốt",
    "Bàn cầu JOJOBA", "Bàn cầu nhập khẩu", "Bàn cầu sứ cao cấp", "Bàn cầu Đài Loan", 
    "Thiết bị nhà vệ sinh", "Thiết bị nhà tắm", "máy nước nóng",
    "Toilet", "Porcelain toilet",
    "Dũng vòi", "Dũng inox"
]

const keywords = [
    "Cần Thơ", "Xuân Dũng rosta",
    "JOJOBA", "Rosta", "Caesar", "Greenlife"   
]

module.exports = {
    TAX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    COMPANY,

    RECORDS_PER_PAGE,

    ROLES: roles,
    ADMIN: defaultAccount,
    DESCRIPTIONS: descriptions,
    KEYWORDS: keywords,
    
}