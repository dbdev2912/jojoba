export default (props) => {
    const { name, icon, image } = props

    return (
        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
                className="instagram__item set-bg"
                data-setbg={image}
            >
                <div className="instagram__text">
                    <i className={`fa ${ icon }`}></i>
                    <a href="#">{ name }</a>
                </div>
            </div>
        </div>
    )
}