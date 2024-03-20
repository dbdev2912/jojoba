
/**
 * 
 * DESC: Hàm tạo UI cho thẻ sản phẩm
 * 
 * PARAMS: 
 *  - stars: <INT> => Số lượng sao được đánh giá cho sản phẩm này, mặc định là 5
 *  - image: <STRING> => Đường dẫn tuyệt đối của hình ảnh sản phẩm 
 *  - image_alt: <String> => Miêu tả hình ảnh => Dùng tăng SEO và ghi chú khi không load đc hình ảnh
 *  - product_name: <String> => Tên sản phẩm
 *  - price: <INT> => Giá của sản phẩm
 *  - sale_price: <INT> => Giá của sản phẩm sau khi đã giảm giá 
 */


import { useSelector } from "react-redux"

export default ( props ) => {

    const { functions } = useSelector( state => state )
    const { product_name, stars, price, image, image_alt } = props


    return (
        <div className="trend__item">
            <div className="trend__item__pic">
                <img src={ image } alt={image_alt} />
            </div>
            <div className="trend__item__text">
                <h6>{ product_name }</h6>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
                <div className="product__price">{ functions.renderPrice( price ) }</div>
            </div>
        </div>
    )
}