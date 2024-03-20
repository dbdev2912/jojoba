import { useState, useEffect } from "react";

import $ from "jquery";
import Navbar from '../navbar/navbar'
import Footer from '../navbar/footer'


export default ({ children }) => {
    useEffect(() => {
        const scripts = [
          "js/jquery-3.3.1.min.js",
          "js/bootstrap.min.js",
          "js/jquery.magnific-popup.min.js",
          "js/jquery-ui.min.js",
          "js/mixitup.min.js",
          "js/jquery.countdown.min.js",
          "js/jquery.slicknav.js",
          "js/owl.carousel.min.js",
          "js/jquery.nicescroll.min.js",
          "js/main.js",
        ];
    
        const $body = $("#body");
    
        for (let i = 0; i < scripts.length; i++) {
          const script = scripts[i];
          $body.append(`<script src="${script}"></script>`);
        }
      }, []);
    return(
        <div>
            {/* <div id="preloder">
                <div className="loader"></div>
            </div> */}

            {/* <div className="offcanvas-menu-overlay"></div> */}
            <div className="offcanvas-menu-wrapper">
                <div className="offcanvas__close">+</div>
                <ul className="offcanvas__widget">
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
                <div className="offcanvas__logo">
                <a href="./index.html">
                    <img src="img/logo.png" alt="" />
                </a>
                </div>
                <div id="mobile-menu-wrap"></div>
                <div className="offcanvas__auth">
                <a href="#">Login</a>
                <a href="#">Register</a>
                </div>
            </div>

            <Navbar />
            {children }
            <Footer/>
      </div>
    )
}