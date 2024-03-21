import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import $ from 'jquery';


export default (props) => {

  const { lang } = useSelector(state => state)

  const { activePage } = props

  useEffect(() => {    
    try {
      $('#navbar-menu').find('> li')[activePage].className = "active"
    }catch{
      
    }
  }, [])


  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2">
            <div className="header__logo text-center">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <nav className="header__menu">
              <ul id="navbar-menu">
                <li>
                  <a href="/">{lang["trang chủ 1"]}</a>
                </li>
                <li>
                  <a href="/products">{lang["sản phẩm 1"]}</a>
                  <ul className="dropdown">
                    <li>
                      <a href="/">{lang["thiết bị nhà vệ sinh"]}</a>
                    </li>
                    <li>
                      <a href="/">{lang["thiết bị nhà tắm"]}</a>
                    </li>
                    <li>
                      <a href="/">{lang["thiết bị ngành nước"]}</a>
                    </li>
                    <li>
                      <a href="/">{lang["thiết bị nhà bếp"]}</a>
                    </li>
                    <li>
                      <a href="/">{lang["dịch vụ"]}</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/">{lang["tin tức"]}</a>
                </li>
                <li>
                  <a href="/u/cart">{lang["giỏ hàng"]}</a>
                  <ul className="dropdown">

                    <li>
                      <a href="/u/cart">{lang["giỏ hàng"]}</a>
                    </li>

                    <li>
                      <a href="/">{lang["thanh toán"]}</a>
                    </li>

                    <li>
                      <a href="/">{lang["lịch sử mua hàng"]}</a>
                    </li>
                    
                  </ul>
                </li>
                <li>
                  <a href="/contact">{lang["liên hệ"]}</a>
                </li>
                {/* <li>
                  <a href="/">{lang["giới thiệu"]}</a>
                </li> */}
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__right">
              <div className="header__right__auth">
                <a href="#">{lang["đăng nhập"]}</a>
                <a href="#">{lang["đăng ký"]}</a>
              </div>
              <ul className="header__right__widget">
                <li>
                  <span className="icon_search search-switch"></span>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};
