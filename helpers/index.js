const { 
    product, product_admin,
    product_md4 , product_record, product_order_record,
    adminProduct_tableRecord, adminProduct_categoryRecord, adminProduct_typeRecord, adminProduct_groupRecord, adminProduct_unitRecord, adminProduct_statusRecord
} = require('./product');

const { order_record, admin_order } = require('./orders')

const { adminSideBar, paginate } = require('./admin')

const { paragraph } = require('./text')


module.exports = {
    product,
    product_admin,
    product_md4,
    product_record,
    order_record,
    product_order_record,
    adminSideBar,
    adminProduct_tableRecord,
    adminProduct_categoryRecord,
    adminProduct_typeRecord,
    adminProduct_groupRecord,
    adminProduct_unitRecord,
    adminProduct_statusRecord,
    paginate,
    paragraph,
    admin_order
}