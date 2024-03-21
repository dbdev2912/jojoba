import ProductRecord from "./product-record"


export default (props) => {
    const { products } = props
    return (
        <section class="shop-cart spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="shop__cart__table">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    { products?.map( product => <ProductRecord {...product}/> ) }
                                    
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}