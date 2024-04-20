// Importing libraries
const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


// Importing files
const home = require('./routes/home');
const products = require('./routes/products')
const contact = require('./routes/contact')
const user = require('./routes/user')
const userError = require('./routes/user.error.js')

const adminHome = require('./routes/admin.home.js')
const adminProducts = require('./routes/admin.products.js')
const adminErrors = require('./routes/admin.errors.js')
const adminBrands = require('./routes/admin.brands.js')
const adminStatus = require('./routes/admin.status.js')
const adminOrders = require('./routes/admin.orders.js')


const { Auth, AdminApi_Product, ApiProducts, AdminApi_Order } = require('./api')

const functions = require('./configs/functions')

const { COMPANY, ROLES } = require('./configs/enum.js')

// Sending static files with Express 
app.use(fileUpload());


app.use(express.static('public'));

app.use(cors())

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    cookie: { maxAge: 1000*60*60*12 },
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





const Helpers = require('./helpers')

const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
    partialsDir: path.join(__dirname, 'views/pieces'), // change partials folder name

    // create custom express handlebars helpers
    helpers: {
        calculation: (value) => {
            return value * 5;
        },

        list: (value, options) => {           
        },

        eq: (x, y, options) => {           
            return x == y
        },
        and: (x, y, options) => {
            return x && y
        },

        add: (x, y) => {
            return x + y
        },
        mul: (x, y, options) => {
            return x*y
        },

        formatPrice: (price, options) => {
            return functions.renderPrice(price)
        },
        renderTax: (price, TAX, options) => {
            return functions.renderPrice( Math.floor(price * TAX  / 100) )
        },
        formatPriceAfterTax: (price, TAX, options) => {
            return functions.renderPrice( price + Math.floor(price * TAX  / 100) )
        },

        paragraph: Helpers.paragraph,

        product: Helpers.product,
        product_md4: Helpers.product_md4,
        product_record: Helpers.product_record,
        order_record: Helpers.order_record,
        product_order_record: Helpers.product_order_record,

        adminSideBar: Helpers.adminSideBar,
        adminProduct_tableRecord: Helpers.adminProduct_tableRecord,
        adminProduct_categoryRecord: Helpers.adminProduct_categoryRecord,
        adminProduct_typeRecord: Helpers.adminProduct_typeRecord,
        adminProduct_groupRecord: Helpers.adminProduct_groupRecord,
        adminProduct_unitRecord : Helpers.adminProduct_unitRecord,
        adminProduct_statusRecord: Helpers.adminProduct_statusRecord, 
        admin_order: Helpers.admin_order,
        
        tablePaginate: Helpers.paginate
    }
});


// Express Handlebars Configuration
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Configure Routes
app.use('/', home);
app.use('/products', products);
app.use('/contact', contact)
app.use('/u', user)
app.use('/e/', userError)

app.use('/api/u', Auth)
app.use('/api/admin/product/', AdminApi_Product)
app.use('/api/admin/order/', AdminApi_Order)
app.use('/api/product/', ApiProducts)

app.use('/admin', adminHome)
app.use('/admin/product', adminProducts)
app.use('/admin/e', adminErrors )
app.use('/admin/brands', adminBrands )
app.use('/admin/status', adminStatus )
app.use('/admin/orders', adminOrders )



const PORT = 5000


app.use((req, res) => {

    const { auth } = req.session;
    if( !auth || auth.role === ROLES.khachhang){
        res.render('404_not_found', {
            title: `404 - Not found| ${COMPANY }`,
        });
    }else{

        res.render('admin_404_not_found', {
            layout: "admin",
            title: `404 - Not found| ${COMPANY }`,
        });
    }

})

app.listen(PORT, () => {
    console.log('Server is starting at port ', PORT);
});