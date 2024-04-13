const { 
    product, product_md4 , product_record, 
    adminProduct_tableRecord, adminProduct_categoryRecord, adminProduct_typeRecord, adminProduct_groupRecord, adminProduct_unitRecord, adminProduct_statusRecord
} = require('./product');

const { order_record } = require('./orders')

const { adminSideBar, paginate } = require('./admin')

const { paragraph } = require('./text')


module.exports = {
    product,
    product_md4,
    product_record,
    order_record,
    adminSideBar,
    adminProduct_tableRecord,
    adminProduct_categoryRecord,
    adminProduct_typeRecord,
    adminProduct_groupRecord,
    adminProduct_unitRecord,
    adminProduct_statusRecord,
    paginate,
    paragraph
}