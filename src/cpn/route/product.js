/**
 * 
 *  @Note 
 *      PREVIEW đang được ẩn xuống vì tính năng này sẽ được làm sau cùng. 
 *      Số sao sản phẩm đc đánh giá sẽ luôn là 5*
 * 
 */


import { useSelector } from "react-redux";

import Breadcrumb from "../ui/navbar/breadcrumb";
import { useEffect, useState } from "react";
import { ProductCard } from "../ui/products";


export default (props) => {
    const { lang, functions } = useSelector(state => state)

    const initialBreadcrumb = [
        {
            name: lang["trang chủ 1"],
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: lang["sản phẩm 1"],
            url: "/products",
        },
    ]

    const [breadcrumb, setBreadCrumb] = useState(initialBreadcrumb)
    const [product, setProduct] = useState({})

    const [relatedProducts, setRP] = useState([])

    useEffect(() => {
        setBreadCrumb([...breadcrumb, { name: "Sản phẩm 01" }])


        const sampleProduct = {
            product_id: 0,
            product_name: "Joboba smart toilet",
            rating: 5,
            brand_id: 0,
            brand_name: "Jojoba taiwan",
            price: 8300000,
            sale_price: 7900000,
            availability: true,
            instroducing: "Đây là phần giới thiệu tổng quan về sản phẩm.",
            description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret. Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla consequat massa quis enim.

            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`,

            specification: `Thông số kĩ thuật`,
            preview: [],
            is_new: false,
            is_sale: true,
        }


        const relatives = [
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
        ]

        setProduct(sampleProduct)
        setRP(relatives)


        
    }, [])

    return (
        <div>

            <Breadcrumb path={breadcrumb} />

            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product__details__pic">

                                <div className="product__details__slider__content">
                                    <div className="product__details__pic__slider owl-carousel">
                                        <img data-hash="product-1" className="product__big__img" src="/img/product/details/product-1.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                {/* lang here  */}
                                <h3>{product.product_name}<span style={{ textTransform: "upperCase" }}>{lang["thương hiệu"]}: {product.brand_name}</span></h3>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    {/* <span>( 138 reviews )</span> priviews*/}
                                </div>
                                {product.is_sale ?
                                    <div className="product__details__price">{functions.renderPrice(product.sale_price)} <span>{functions.renderPrice(product.price)}</span></div>
                                    :
                                    <div className="product__details__price price__no__sale">{functions.renderPrice(product.price)}</div>
                                }

                                {/* Product intro */}
                                <p>{product.instroducing}</p>



                                <div className="product__details__button">
                                    <div className="quantity">
                                        <span>{lang["số lượng"]}</span>
                                        <div className="pro-qty">
                                            <input type="text" value="1" />
                                        </div>
                                    </div>
                                    <a href="#" className="cart-btn"><span className="icon_bag_alt"></span>{lang["thêm vào giỏ"]}</a>
                                    {/* <ul>
                                <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span className="icon_adjust-horiz"></span></a></li>
                            </ul> */}
                                </div>
                                <div className="product__details__widget">
                                    <ul>
                                        <li>
                                            <span>{lang["trạng thái"]}</span>
                                            <p>{lang["còn hàng"]}</p>
                                        </li>

                                        <li>
                                            <span>{lang["khuyến mãi"]}</span>
                                            <p>{lang["miễn phí vẫn chuyển"]}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">{lang["mô tả"]}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">{lang["thông số kĩ thuật"]}</a>
                                    </li>
                                    {/* <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">{ lang["đánh giá"] }</a>
                            </li> */}
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <h6>{lang["mô tả"]}</h6>
                                        <p>{product.description}</p>

                                    </div>
                                    <div className="tab-pane" id="tabs-2" role="tabpanel">
                                        <h6>{lang["thông số kĩ thuật"]}</h6>

                                        <p>{product.specification}</p>
                                    </div>
                                    {/* <div className="tab-pane" id="tabs-3" role="tabpanel">
                                PREVIEWS GOES HERE
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="related__title">
                                <h5>RELATED PRODUCTS</h5>
                            </div>
                        </div>


                        { relatedProducts.map( product => <ProductCard {...product}/> ) }

                    </div>
                </div>
            </section>

        </div>
    )
}