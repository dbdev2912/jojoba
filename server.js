// Importing libraries
const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

// Importing files
const home = require('./routes/home');
const products = require('./routes/products')

// Sending static files with Express 
app.use(express.static('public'));


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
            /**
            * @type: function
            * 
            * @libr: uuid 
            * 
            * @desc: translate 1000 to 1,000
            * 
            */


            let numString = price.toString();
            let formattedNumber = '';
            let count = 0;

            for (let i = numString.length - 1; i >= 0; i--) {
                count++;
                formattedNumber = numString[i] + formattedNumber;
                if (count % 3 === 0 && i !== 0) {
                    formattedNumber = ',' + formattedNumber;
                }
            }

            return `<text>${ formattedNumber }<sup>₫</sup></text>`
        }
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