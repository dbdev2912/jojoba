import ProductCardSmall from "./product-card-small"

export default (props) => {
    const { title, items } = props

    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
                <div className="section-title">
                    <h4>{ title }</h4>
                </div>
                { items.map( item => <ProductCardSmall { ...item }/> ) }
            </div>
        </div>
    )
}