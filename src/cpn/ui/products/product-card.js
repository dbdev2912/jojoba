/**
 * 
 * DESC: Hàm tạo UI cho thẻ sản phẩm
 * 
 * PARAMS: 
 *  - is_new: <BOOL> => Sản phẩm này có phải là sản phẩm mới hay không
 *  - is_sale: <BOOL> => Sản phẩm này có đang sale hay không 
 *  - stars: <INT> => Số lượng sao được đánh giá cho sản phẩm này, mặc định là 5
 *  - image: <STRING> => Đường dẫn tuyệt đối của hình ảnh sản phẩm 
 *  - product_name: <String> => Tên sản phẩm
 *  - price: <INT> => Giá của sản phẩm
 *  - sale_price: <INT> => Giá của sản phẩm sau khi đã giảm giá 
 */


export default (props) => {
    const {
        is_sale,
        is_new,
        stars,
        image,
        product_name,
        price,
        sale_price,
    } = props;

    const renderClassType = () => {
        if (is_sale && sale_price) {
            return "sale"
        }

        if (is_new) {
            return "new"
        }

        return ""
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className={`product__item ${renderClassType()}`}>
                <div
                    className="product__item__pic set-bg"
                    data-setbg={image}
                >
                    {
                        is_sale && sale_price && <div className="label">Sale</div>
                    }

                    {
                        is_new && <div className="label new">New</div>
                    }
                    <ul className="product__hover">
                        <li>
                            <a href="img/product/product-1.jpg" className="image-popup">
                                <span className="arrow_expand"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon_heart_alt"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon_bag_alt"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6>
                        <a href="#">{product_name}</a>
                    </h6>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    {
                        is_sale && sale_price ?
                            <div className="product__price">
                                {sale_price}đ <span>{price}đ</span>
                            </div>
                            :
                            <div className="product__price">
                                {price}đ
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};
