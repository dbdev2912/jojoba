/*  ---------------------------------------------------
Template Name: Ashion
Description: Ashion ecommerce template
Author: Colorib
Author URI: https://colorlib.com/
Version: 1.0
Created: Colorib
---------------------------------------------------------  */

'use strict';


const formatComnaSeperatedNumber = (number) => {
    /**
     * @type: function
     * 
     * @libr: uuid 
     * 
     * @desc: translate 1000 to 1,000
     * 
     */


    let numString = number.toString();
    let formattedNumber = '';
    let count = 0;

    for (let i = numString.length - 1; i >= 0; i--) {
        count++;
        formattedNumber = numString[i] + formattedNumber;
        if (count % 3 === 0 && i !== 0) {
            formattedNumber = ',' + formattedNumber;
        }
    }

    return formattedNumber;
}


const reCalculateTotal = () => {
    const $quantities = $('.shop__cart__table .product__quantity')
    let total = 0
    for (let i = 0; i < $quantities.length; i++) {
        const $item = $($quantities[i])

        const quan = $item.val()
        const price = parseInt($item.attr("price"))

        total += quan * price
    }

    $('#cart__total text').html(`${formatComnaSeperatedNumber(total)}<sup>đ</sup>`)
}


(function ($) {
    const proxy = "http://127.0.0.1:5000";
    // const proxy = "http://xuandung.com.vn"

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Product filter
        --------------------*/
        $('.filter__controls li').on('click', function (e) {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');

            const filter = $(e.target).attr("data-filter")
            $('.product__gallary').hide()
            $(`#${filter}`).show()
        });

    });

    /*------------------
        Background Set
    --------------------*/
    // $('.set-bg').each(function () {
    //     var bg = $(this).data('setbg');
    //     $(this).css('background-image', 'url(' + bg + ')');
    // });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val(''); 
        });
    });

    $('#search-input').on('keyup', (e) => {
        const keyCode = e.keyCode;
        if(keyCode == 13){
            window.location = `/search?query=${ e.target.value }`
        }
    })

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        console.log("CANVAS CLICK")
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Product Details Slider
    ----------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).on('changed.owl.carousel', function (event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs(num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if (e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }


    /*------------------
        Magnific
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });


    $(".nice-scroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#dddddd",
        boxzoom: false,
        cursorwidth: 5,
        background: 'rgba(0, 0, 0, 0.2)',
        cursorborderradius: 50,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

    $("#countdown-time").countdown(timerdate, function (event) {
        $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Ngày</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Giờ</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Phút</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Giây</p> </div>"));
    });

    /*-------------------
        Range Slider
    --------------------- */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val(ui.values[0]);
            maxamount.val(ui.values[1]);
        }
    });
    minamount.val(rangeSlider.slider("values", 0));
    maxamount.val(rangeSlider.slider("values", 1));

    /*------------------
        Single Product
    --------------------*/
    $('.product__thumb .pt').on('click', function () {
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__big__img').attr('src');
        if (imgurl != bigImg) {
            $('.product__big__img').attr({ src: imgurl });
        }
    });

    /*-------------------
        Quantity change
    --------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);

        const product_id = $button.parent().attr("data")               
        
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;

        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);        
        reCalculateTotal()

        fetch(`${ proxy }/api/product/cart__update`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ product_id, quantity: newVal })
        })
    });    


    $('.product__quantity').on('change', e => {
        const $input = $(e.target)
        const quantity = e.target.value;

        const product_id = $input.parent().attr("data")        


        fetch(`${ proxy }/api/product/cart__update`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ product_id, quantity })
        })
        reCalculateTotal()
    })

    /*-------------------
        Radio Btn
    --------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });



    $('.cart__add').click(async (e) => {
        const $target = $(e.target)

        const req = await fetch(`${proxy}/api/product/add__cart`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ product_id: $target.attr("data"), amount: 1 })
        })
        const res = await req.json()
        const { success, type, len } = res
        if (success) {
            $('.cart__count').text(len)
        }
    })

    $('#product__add__cart').click(async (e) => {
        const $target = $(e.target)
        const amount = $('#add__cart__quantity').val()
        const req = await fetch(`${proxy}/api/product/add__cart`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ product_id: $target.attr("data"), amount })
        })
        const res = await req.json()
        const { success, type, len } = res
        if (success) {
            $('.cart__count').text(len)
        }
    })

    fetch(`${proxy}/api/product/cart__count`).then(res => res.json()).then(res => {
        $('.cart__count').text(res.data)
    })


    $('.cart__remove').click((e) => {

        const $target = $(e.target)
         
        reCalculateTotal()

        fetch(`${ proxy }/api/product/cart__remove`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ product_id: $target.attr("data") })
        }).then(res => res.json()).then(res => {
            $target.closest('tr').remove()
            reCalculateTotal()
        })
    })


    $('.order__record__redirect').click(e => {
        const link = $(e.target).closest('.order__record__redirect').attr('to')
        window.location = link
    })


    $('#price-filter').click(e => {
        const min = $('#minamount').val()
        const max = $('#maxamount').val()
        window.location = `${ window.location.pathname }?query=${min};${max}` 
    })

})(jQuery);