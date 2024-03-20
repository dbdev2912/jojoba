import { useSelector } from "react-redux";

import Breadcrumb from "../ui/navbar/breadcrumb";
import { CriteriaCard } from "../ui/sidebar";

import { ProductCard33 } from "../ui/products";


export default () => {

    const { lang } = useSelector(state => state)
    const breadcrumb = [
        {
            name: lang["trang chủ 1"],
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: lang["sản phẩm 1"]
        },
    ]

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

    const products = [
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
        {
            image: "img/product/product-2.jpg",
            product_name: "Flowy striped skirt",
            price: "59",
            sale_price: "48",
            stars: 5,
            is_new: true,
        },

    ]

    return (
        <div>

            <Breadcrumb path={breadcrumb} />

            <section class="shop spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3">
                            <div class="shop__sidebar">
                                <div class="sidebar__categories">
                                    <div class="section-title">
                                        <h4>Categories</h4>
                                    </div>
                                    <div class="categories__accordion">
                                        <div class="accordion" id="accordionExample">
                                            {categoriesFilter.map(filter => <CriteriaCard criteria={filter} cpnID={filter.id} parentId={"accordionExample"} />)}
                                        </div>
                                    </div>
                                </div>

                                {/*  FILTER BY PRICE  */}
                                <div class="sidebar__filter">
                                    <div class="section-title">
                                        <h4>Shop by price</h4>
                                    </div>
                                    <div class="filter-range-wrap">
                                        <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                            data-min="0" data-max="10000000"></div>
                                        <div class="range-slider">
                                            <div class="price-input">
                                                <p>Price:</p>
                                                <input type="text" id="minamount" />
                                                <input type="text" id="maxamount" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="sidebar__filter" style={{ marginBottom: "104px" }}>
                                    <a href="#">Filter</a>
                                </div>



                                {/*  FILTER BY MATERIAL  */}

                                <div class="sidebar__sizes" >
                                    <div class="section-title">
                                        <h4>Shop by material</h4>
                                    </div>
                                    <div class="size__list">
                                        <label for="porcelain">
                                            Porcelain
                                            <input type="checkbox" id="porcelain" />
                                            <span class="checkmark"></span>
                                        </label>
                                        <label for="inox">
                                            Inox
                                            <input type="checkbox" id="inox" />
                                            <span class="checkmark"></span>
                                        </label>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-9 col-md-9">
                            <div class="row">


                                {products.map(product => <ProductCard33 {...product} />)}


                                <div class="col-lg-12 text-center">
                                    <div class="pagination__option">
                                        <a href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#"><i class="fa fa-angle-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
