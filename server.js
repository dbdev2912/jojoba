// Importing libraries
const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

// Importing files
const home = require('./routes/home');
const products = require('./routes/products')

const functions = require('./configs/functions')

// Sending static files with Express 
app.use(express.static('public'));


const Helpers = require('./helpers')

const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
    partialsDir: path.join(__dirname, 'views/pieces'), // change partials folder name

    // create custom express handlebars helpers
    helpers: {
        calculation: function (value) {
            return value * 5;
        },

        list: function (value, options) {
            // let out = "<ul>";
            // for (let i = 0; i < value.length; i++) {
            //     out = out + "<li>" +  options.fn(value[i]) + "</li>";
            // }
            // return out + "</ul>";
        },

        eq: function (x, y, options) {
            return x == y
        },
        and: function (x, y, options) {
            return x && y
        },
        formatPrice: function (price, options) {
            return functions.renderPrice(price)
        },
        product: Helpers.product,
        product_md4: Helpers.product_md4,
    }
});


// Express Handlebars Configuration
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Configure Routes
app.use('/', home);
app.use('/products', products);

const PORT = 5000

app.listen(PORT, () => {
    console.log('Server is starting at port ', PORT);
});