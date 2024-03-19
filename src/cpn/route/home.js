import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import $ from "jquery";
import ProductCard from "../ui/products/product-card";

export default (props) => {
    
    
    const { lang } = useSelector(state => state)
    
    
    const newProducts = [
        {
            image: "img/product/product-1.jpg",
            product_name: "Buttons tweed blazer",
            price: "5.900.000",
            sale_price: "4.800.000",
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


    useEffect(() => {
        const scripts = [

        ];

        const $body = $("#body");

        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            $body.append(`<script src="${script}"></script>`);
        }
    }, []);

    return (
        <div>




            <section className="categories">
                <div className="container-fluid">
                    <div className="row">
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
                                <h4>New product</h4>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">
                                    { lang["tất cả"] }
                                </li>
                                <li >{ lang["bồn cầu"] }</li>
                                <li >{ lang["lavabo"] }</li>
                                <li >{ lang["gương"] }</li>
                                <li >{ lang["vòi sen"] }</li>
                                <li >{ lang["khác"] }</li>
                            </ul>
                        </div>
                    </div>

                    {/* HOT PRODUCT HERE */}
                    <div className="row property__gallery">
                        { newProducts.map( product => <ProductCard { ...product }/> ) }                        
                    </div>
                </div>
            </section>

            <section className="banner set-bg" data-setbg="img/banner/banner-1.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-8 m-auto">
                            <div className="banner__slider owl-carousel">
                                <div className="banner__item">
                                    <div className="banner__text">
                                        <span>The Chloe Collection</span>
                                        <h1>The Project Jacket</h1>
                                        <a href="#">Shop now</a>
                                    </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text">
                                        <span>The Chloe Collection</span>
                                        <h1>The Project Jacket</h1>
                                        <a href="#">Shop now</a>
                                    </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text">
                                        <span>The Chloe Collection</span>
                                        <h1>The Project Jacket</h1>
                                        <a href="#">Shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="trend spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="trend__content">
                                <div className="section-title">
                                    <h4>Hot Trend</h4>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/ht-1.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Chain bucket bag</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/ht-2.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Pendant earrings</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/ht-3.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Cotton T-Shirt</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="trend__content">
                                <div className="section-title">
                                    <h4>Best seller</h4>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/bs-1.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Cotton T-Shirt</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/bs-2.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>
                                            Zip-pockets pebbled tote <br />
                                            briefcase
                                        </h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/bs-3.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Round leather bag</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="trend__content">
                                <div className="section-title">
                                    <h4>Feature</h4>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/f-1.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Bow wrap skirt</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/f-2.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Metallic earrings</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                                <div className="trend__item">
                                    <div className="trend__item__pic">
                                        <img src="img/trend/f-3.jpg" alt="" />
                                    </div>
                                    <div className="trend__item__text">
                                        <h6>Flap cross-body bag</h6>
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="product__price">$ 59.0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="discount">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="discount__pic">
                                <img src="img/discount.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="discount__text">
                                <div className="discount__text__title">
                                    <span>Discount</span>
                                    <h2>Summer 2019</h2>
                                    <h5>
                                        <span>Sale</span> 50%
                                    </h5>
                                </div>
                                <div className="discount__countdown" id="countdown-time">
                                    <div className="countdown__item">
                                        <span>22</span>
                                        <p>Days</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>18</span>
                                        <p>Hour</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>46</span>
                                        <p>Min</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>05</span>
                                        <p>Sec</p>
                                    </div>
                                </div>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>Free Shipping</h6>
                                <p>For all oder over $99</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>Money Back Guarantee</h6>
                                <p>If good have Problems</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>Online Support 24/7</h6>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>Payment Secure</h6>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="instagram">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-1.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-2.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-3.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-4.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-5.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div
                                className="instagram__item set-bg"
                                data-setbg="img/instagram/insta-6.jpg"
                            >
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">@ ashion_shop</a>
                                </div>
                            </div>
                        </div>
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
