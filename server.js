// Importing libraries
const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

const session = require('express-session');
const bodyParser = require('body-parser');


// Importing files
const home = require('./routes/home');
const products = require('./routes/products')
const contact = require('./routes/contact')
const user = require('./routes/user')

const adminHome = require('./routes/admin.home.js')
const adminProducts = require('./routes/admin.products.js')

const { Auth } = require('./api')

const functions = require('./configs/functions')


// Sending static files with Express 
app.use(express.static('public'));


app.use(session({
    secret: 'your-secret-key',
    resave: false,
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

        product: Helpers.product,
        product_md4: Helpers.product_md4,
        product_record: Helpers.product_record,
        order_record: Helpers.order_record,

        adminSideBar: Helpers.adminSideBar,
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

app.use('/api/u', Auth)

app.use('/admin', adminHome)
app.use('/admin/products', adminProducts)

const PORT = 5000

app.listen(PORT, () => {
    console.log('Server is starting at port ', PORT);
});