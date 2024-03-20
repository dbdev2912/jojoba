import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import $ from "jquery";
import { ProductCard, ProductList } from "../ui/products";
import { CollectionBanner } from "../ui/carousel";

import { SocialLink } from "../ui/social-media";

export default () => {


    const { lang, functions } = useSelector(state => state)

    const [remainingTime, setRemainingTime] = useState({
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0
    })

    const newProducts = [
        {
            image: "img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5900000",
            sale_price: "4800000",
            stars: 5,
            is_sale: true,
            is_new: true
        },
        {
            image: "img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },
        {
            image: "img/product/product-3.jpg",
            product_name: "Cotton T-shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_sale: true,
        },
        {
            image: "img/product/product-4.jpg",
            product_name: "Slim strped pocket shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-5.jpg",
            product_name: "Fit micro codouroy shirt",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-6.jpg",
            product_name: "Tropical kimono",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-7.jpg",
            product_name: "Contrasting sunglasses",
            price: "59",
            sale_price: "48",
            stars: 5,
        },
        {
            image: "img/product/product-8.jpg",
            product_name: "Water resistant backpack",
            price: "59",
            sale_price: "48",
            stars: 5,
        },

    ]


    const trendingItems = [
        {
            title: lang["sản phẩm mới"],
            items: [
                { product_name: "Chain bucket bag", image: "img/trend/ht-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Predant earings", image: "img/trend/ht-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Cotton T-shirt", image: "img/trend/ht-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
        {
            title: lang["bán chạy"],
            items: [
                { product_name: "Cotton T-Shirt", image: "img/trend/bs-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Zip-pockets pebbled tote", image: "img/trend/bs-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Round leather bag", image: "img/trend/bs-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
        {
            title: lang["phụ kiện"],
            items: [
                { product_name: "Bow wrap skirt", image: "img/trend/f-1.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Metallic earrings", image: "img/trend/f-2.jpg", image_alt: "", price: 5900000, stars: 5 },
                { product_name: "Flap cross-body bag", image: "img/trend/f-3.jpg", image_alt: "", price: 5900000, stars: 5 },
            ]
        },
    ]


    const multiMediaLinks = [
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-1.jpg"
        },
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-2.jpg"
        },
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-3.jpg"
        },
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-4.jpg"
        },
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-5.jpg"
        },
        {
            name: "@Jojoba taiwan",
            icon: "fa-instagram",
            image: "img/instagram/insta-6.jpg"
        },
    ]


    useEffect(() => {
        const scripts = [

        ];

        const $body = $("#body");

        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            $body.append(`<script src="${script}"></script>`);
        }

        setInterval(() => {

            /**
             * 
             * FUNC: Count down thời gian còn lại trong ngày
             * 
             */

            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            const remainingMilliseconds = endOfDay - now;
            const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));

            const remainingMinutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

            setRemainingTime({
                remainingHours,
                remainingMinutes,
                remainingSeconds,
            })
        }, 1000)

    }, []);

    const calculateNextSeason = () => {

        /**
         * 
         * FUNC: Tính toán mùa tiếp theo trong năm dựa theo tháng hiện tại
         * 
         * - Nếu tháng hiện tại nhỏ hơn 10 => Năm nay
         * - Nếu tháng hiện tại lớn hơn 10 => Năm tiếp theo
         * 
         */

        const date = new Date()
        const month = date.getMonth() + 1;

        const months = {
            "1": "hè",
            "2": "hè",
            "3": "hè",
            "4": "thu",
            "5": "thu",
            "6": "thu",
            "7": "đông",
            "8": "đông",
            "9": "đông",
            "10": "xuân",
            "11": "xuân",
            "12": "xuân",
        }
        if (month < 10) {
            return `${lang[months[`${month}`]]} ${date.getFullYear()}`
        } else {
            return `${lang[months[`${month}`]]} ${date.getFullYear() + 1}`
        }
    }



    return (
        <div>

            <section className="categories">
                <div className="container-fluid">
                    <div className="row">
                        { functions.isMobile() ?
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                        <div
                                            className="categories__item set-bg"
                                            data-setbg="img/categories/category-1.jpg"
                                        >
                                            <div className="categories__text">
                                                <h1>Women’s fashion</h1>
                                                <p>
                                                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                                                    incidid-unt labore edolore magna aliquapendisse ultrices
                                                    gravida.
                                                </p>
                                                <a href="#">Shop now</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="col-lg-6 p-0">
                                <div
                                    className="categories__item categories__large__item set-bg"
                                    data-setbg="img/categories/category-1.jpg"
                                >
                                    <div className="categories__text">
                                        <h1>Women’s fashion</h1>
                                        <p>
                                            Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incidid-unt labore edolore magna aliquapendisse ultrices
                                            gravida.
                                        </p>
                                        <a href="#">Shop now</a>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div
                                        className="categories__item set-bg"
                                        data-setbg="img/categories/category-2.jpg"
                                    >
                                        <div className="categories__text">
                                            <h4>Men’s fashion</h4>
                                            <p>358 items</p>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div
                                        className="categories__item set-bg"
                                        data-setbg="img/categories/category-3.jpg"
                                    >
                                        <div className="categories__text">
                                            <h4>Kid’s fashion</h4>
                                            <p>273 items</p>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div
                                        className="categories__item set-bg"
                                        data-setbg="img/categories/category-4.jpg"
                                    >
                                        <div className="categories__text">
                                            <h4>Cosmetics</h4>
                                            <p>159 items</p>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div
                                        className="categories__item set-bg"
                                        data-setbg="img/categories/category-5.jpg"
                                    >
                                        <div className="categories__text">
                                            <h4>Accessories</h4>
                                            <p>792 items</p>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="section-title">
                                <h4>{lang["danh mục sản phâm mới"]}</h4>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">
                                    {lang["tất cả"]}
                                </li>
                                <li >{lang["bồn cầu"]}</li>
                                <li >{lang["lavabo"]}</li>
                                <li >{lang["gương"]}</li>
                                <li >{lang["vòi sen"]}</li>
                                <li >{lang["khác"]}</li>
                            </ul>
                        </div>
                    </div>

                    {/* HOT PRODUCT HERE */}
                    <div className="row property__gallery">
                        {newProducts.map(product => <ProductCard {...product} />)}
                    </div>
                </div>
            </section>

            <CollectionBanner />

            <section className="trend spad">
                <div className="container">
                    <div className="row">

                        {trendingItems.map(items => <ProductList {...items} />)}

                    </div>
                </div>
            </section>

            <section className="discount">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 p-0">
                            <div className="discount__text">
                                <div className="discount__text__title">
                                    <span>{lang["ưu đãi"]}</span>
                                    <h2>{calculateNextSeason()}</h2>
                                    <h5>
                                        <span>Sale</span> 30%
                                    </h5>
                                </div>
                                <div className="discount__countdown" id="countdown-time">
                                    <div className="countdown__item">
                                        <span>22</span>
                                        <p>{lang["ngày"]}</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{remainingTime.remainingHours}</span>
                                        <p>{lang["giờ"]}</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{remainingTime.remainingMinutes}</span>
                                        <p>{lang["phút"]}</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{remainingTime.remainingSeconds}</span>
                                        <p>{lang["giây"]}</p>
                                    </div>
                                </div>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                        {
                            !functions.isMobile() &&
                            <div className="col-lg-6 p-0">
                                <div className="discount__pic">
                                    <img src="img/discount.jpg" alt="" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>

            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>{lang["giao hàng miễn phí"]}</h6>
                                <p>{lang["miễn phí và nhanh chóng cho tất cả đơn hàng"]}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>{lang["bảo hành miễn phí"]}</h6>
                                <p>{lang["---"]}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>{lang["hỗ trợ onl 24/7"]}</h6>
                                <p> {lang["tận tâm hổ trợ mọi lúc mọi nơi trên nhiều nền tảng"]} </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>{lang["hỗ trợ đa ngôn ngữ"]}</h6>
                                <p>{lang["---"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="instagram">
                <div className="container-fluid">
                    <div className="row">
                        {multiMediaLinks.map(link => <SocialLink {...link} />)}
                    </div>
                </div>
            </div>



            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form">
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Search here....."
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
