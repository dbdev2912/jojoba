import { useSelector } from "react-redux";
import Breadcrumb from "../ui/navbar/breadcrumb";


const PHONES_NUMBERS = [
    "0868812249", "1900 0000"
]

const SUPPORT_MAIL = "cskh.xuandung@gmail.com"

export default (props) => {
    const { lang } = useSelector(state => state)

    const breadcrumb = [
        {
            name: lang["trang chủ 1"],
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: lang["liên hệ"],
        },
    ]

    return (
        <div>
            <Breadcrumb path={breadcrumb} />

            <section class="contact spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="contact__content">
                                <div class="contact__address">
                                    <h5>{ lang["thông tin liên hệ"] }</h5>
                                    <ul>
                                        <li>
                                            <h6><i class="fa fa-map-marker"></i>{ lang["địa chỉ"] }</h6>
                                            <p>{lang["địa chỉ-value"]}</p>
                                        </li>
                                        <li>
                                            <h6><i class="fa fa-phone"></i>{ lang["đường dây nóng"] }</h6>
                                            <p>{ PHONES_NUMBERS.map( numbers => <span>{numbers}</span> ) }</p>
                                        </li>
                                        <li>
                                            <h6><i class="fa fa-headphones"></i> { lang["email hổ trợ"] }</h6>
                                            <p>{ SUPPORT_MAIL }</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="contact__form">
                                    <h5>{lang["gửi thư liên hệ"]?.toUpperCase()}</h5>
                                    <form action="#">
                                        <input type="text" placeholder={ lang["quý danh"] } />
                                        <input type="text" placeholder={ lang["email"] } />
                                        <input type="text" placeholder={ lang["trang web"] } />
                                        <textarea placeholder={ lang["lời nhắn"] }></textarea>
                                        <button type="submit" class="site-btn">{ lang["gửi ngay"] }</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="contact__map">
                                <iframe
                                     src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d797.9046398775931!2d105.73048158574267!3d10.046668532440746!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1711008386863!5m2!1svi!2s"
                                    height="780" style={{ border: 0 }} allowfullscreen="">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}