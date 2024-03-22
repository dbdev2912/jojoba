const express = require('express');
const router = express.Router(); 
const lang = require('../configs/lang')

// Routing 
router.get('/', (req, res) => {
    
    const categoriesFilter = [
        {
            name: "Women",
            id: "category_1",
            options: [
                { url: "/", label: "Coats" },
                { url: "/", label: "Long" },
                { url: "/", label: "Short" },
            ]
        },
        {
            name: "Men",
            id: "category_2",
            options: [
                { url: "/", label: "Last" },
                { url: "/", label: "Chance" },
                { url: "/", label: "You surrender" },
            ]
        },
        {
            name: "Kids",
            id: "category_3",
            options: [
                { url: "/", label: "Or you die" },
                { url: "/", label: "Long" },
                { url: "/", label: "Short" },
            ]
        }
    ]

    const previousPages = [
        {
            name: "Trang chủ",
            url: "/",
            icon: "fa fa-home",
        },
    ]

    const lastPage = {
        name: "Sản phẩm"
    }

    res.render('products', {
        title: "Sản phẩm | Cửa hàng Xuân Dũng",
        filter: categoriesFilter,
        previousPages,
        lastPage
    })
});






module.exports = router;
