export default (props) => {
    const { image, product_name, stars, price, sale_price, quantity } = props

    return (
        <tr>
            <td class="cart__product__item">
                <img src={image} alt="" />
                <div class="cart__product__item__title">
                    <h6>{product_name}</h6>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                </div>
            </td>
            <td class="cart__price">{price}</td>
            <td class="cart__quantity">
                <div class="pro-qty">
                    <input type="text" value={quantity} />
                </div>
            </td>
            <td class="cart__total">{ quantity * price }</td>
            <td class="cart__close"><span class="icon_close"></span></td>
        </tr>

    )
}