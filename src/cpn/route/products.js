import { useSelector } from "react-redux";

import Breadcrumb from "../ui/navbar/breadcrumb";
import { CriteriaCard } from "../ui/sidebar";

import { ProductCard33 } from "../ui/products";
import { useEffect, useState } from "react";


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

    const [ products, setProducts ] = useState([])

    useEffect( ()  => {
        const initialProducts = [
            {
                image: "/img/product/product-1.jpg",
                product_name: "Buttons tweed blazer",
                price: "5900000",
                sale_price: "4800000",
                stars: 5,
                is_sale: true,
                is_new: true
            },
            {
                image: "/img/product/product-2.jpg",
                product_name: "Flowy striped skirt",
                price: "59",
                sale_price: "48",
                stars: 5,
                is_new: true,
            },
            {
                image: "/img/product/product-3.jpg",
                product_name: "Cotton T-shirt",
                price: "59",
                sale_price: "48",
                stars: 5,
                is_sale: true,
            },
            {
                image: "/img/product/product-4.jpg",
                product_name: "Slim strped pocket shirt",
                price: "59",
                sale_price: "48",
                stars: 5,
            },
            {
                image: "/img/product/product-5.jpg",
                product_name: "Fit micro codouroy shirt",
                price: "59",
                sale_price: "48",
                stars: 5,
            },
            {
                image: "/img/product/product-6.jpg",
                product_name: "Tropical kimono",
                price: "59",
                sale_price: "48",
                stars: 5,
            },
            {
                image: "/img/product/product-7.jpg",
                product_name: "Contrasting sunglasses",
                price: "59",
                sale_price: "48",
                stars: 5,
            },
            {
                image: "/img/product/product-8.jpg",
                product_name: "Water resistant backpack",
                price: "59",
                sale_price: "48",
                stars: 5,
            },
            {
                image: "/img/product/product-2.jpg",
                product_name: "Flowy striped skirt",
                price: "59",
                sale_price: "48",
                stars: 5,
                is_new: true,
            },
    
        ]
        setProducts(initialProducts)
    }, [])


    return (
        <div>

            <Breadcrumb path={breadcrumb} />

            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="shop__sidebar">
                                <div className="sidebar__categories">
                                    <div className="section-title">
                                        <h4>{ lang["dòng sản phẩm"] }</h4>
                                    </div>
                                    <div className="categories__accordion">
                                        <div className="accordion" id="accordionExample">
                                            {categoriesFilter.map(filter => <CriteriaCard criteria={filter} cpnID={filter.id} parentId={"accordionExample"} />)}
                                        </div>
                                    </div>
                                </div>

                                {/*  FILTER BY PRICE  */}
                                <div className="sidebar__filter">
                                    <div className="section-title">
                                        <h4>{ lang["giá"] }</h4>
                                    </div>
                                    <div className="filter-range-wrap">
                                        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                            data-min="0" data-max="10000000"></div>
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <p>{ lang["từ"] }</p>
                                                <input type="text" id="minamount" />
                                                <input type="text" id="maxamount" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="sidebar__filter" style={{ marginBottom: "104px" }}>
                                    <a href="#">{ lang["lọc"] }</a>
                                </div>



                                {/*  FILTER BY MATERIAL  */}

                                <div className="sidebar__sizes" >
                                    <div className="section-title">
                                        <h4>{ lang["chất liệu"] }</h4>
                                    </div>
                                    <div className="size__list">
                                        <label for="porcelain">
                                            Porcelain
                                            <input type="checkbox" id="porcelain" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label for="inox">
                                            Inox
                                            <input type="checkbox" id="inox" />
                                            <span className="checkmark"></span>
                                        </label>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="row">


                                {products.map(product => <ProductCard33 {...product} />)}


                                <div className="col-lg-12 text-center">
                                    <div className="pagination__option">
                                        <a href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#"><i className="fa fa-angle-right"></i></a>
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
