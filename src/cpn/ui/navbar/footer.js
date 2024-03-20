import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok } from "@fortawesome/free-brands-svg-icons"

export default () => {

  const { lang } = useSelector(state => state)

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="footer__widget">                
                <ul>
                  <li>
                    <a>{lang["tên công ty"]}: {lang["tên công ty-value"]}</a>
                  </li>
                  <li>
                    <a>{lang["giấy phép kinh doanh"]}: {lang["giấy phép kinh doanh-value"]}</a>
                  </li>
                  <li>
                    <a>{lang["mã số thuế"]}: {lang["mã số thuế-value"]}</a>
                  </li>
                  <li>
                    <a>{lang["hotline"]}: {lang["hotline-value"]}</a>
                  </li>
                  <li>
                    <a>{lang["địa chỉ"]}: {lang["địa chỉ-value"]}</a>
                  </li>
                </ul>
              </div>
              <p>

              </p>
              {/* <div className="footer__payment">
                <a href="#">
                  <img src="img/payment/payment-1.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-2.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-3.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-4.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-5.png" alt="" />
                </a>
              </div> */}
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
              <h6>{lang["lối tắt"]}</h6>
              <ul>
                <li>
                  <a href="#">{lang["giới thiệu"]}</a>
                </li>
                <li>
                  <a href="#">{lang["tin tức"]}</a>
                </li>
                <li>
                  <a href="#">{lang["liên hệ"]}</a>
                </li>
                <li>
                  <a href="#">{lang["giải đáp nhanh"]}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6>{lang["tài khoản"]}</h6>
              <ul>
                <li>
                  <a href="#">{lang["tài khoản của tôi"]}</a>
                </li>
                <li>
                  <a href="#">{lang["theo dõi đơn hàng"]}</a>
                </li>
                <li>
                  <a href="#">{lang["thanh toán"]}</a>
                </li>
                <li>
                  <a href="#">{lang["đóng góp"]}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
              <h6>{lang["nhận thông báo"]}</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit" className="site-btn">
                  {lang["đăng ký"]}
                </button>
              </form>
              <div className="footer__social">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-tiktok">
                    <FontAwesomeIcon icon={faTiktok} />
                  </i>
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright__text">
              <p>
                Copyright &copy;{" "}
                <script>document.write(new Date().getFullYear());</script> All
                rights reserved | JOJOBA

              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}