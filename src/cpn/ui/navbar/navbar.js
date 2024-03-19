import { useSelector } from 'react-redux'

export default () => {

    const { lang } = useSelector(state => state)

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
              <ul>
                
                <li>
                  <a href="#">{lang["sản phẩm 1"]}</a>
                  <ul className="dropdown">
                    <li>
                      <a href="./product-details.html">{lang["thiết bị nhà vệ sinh"]}</a>
                    </li>
                    <li>
                      <a href="./shop-cart.html">{lang["thiết bị nhà tắm"]}</a>
                    </li>
                    <li>
                      <a href="./checkout.html">{ lang["thiết bị ngành nước"] }</a>
                    </li>
                    <li>
                      <a href="./blog-details.html">{ lang["dịch vụ"] }</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="./blog.html">{ lang["tin tức"] }</a>
                </li>
                <li>
                  <a href="./contact.html">{ lang["liên hệ"] }</a>
                </li>
                <li>
                  <a href="./contact.html">{ lang["giới thiệu"] }</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__right">
              <div className="header__right__auth">
                <a href="#">Login</a>
                <a href="#">Register</a>
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
