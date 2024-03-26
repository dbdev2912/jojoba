const { product, product_md4 , product_record, adminProduct_tableRecord } = require('./product');

const { order_record } = require('./orders')

const { adminSideBar } = require('./admin')


module.exports = {
    product,
    product_md4,
    product_record,
    order_record,
    adminSideBar,
    adminProduct_tableRecord
}