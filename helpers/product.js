const functions = require('../configs/functions')

const product = (product, options) => {
    const {
        is_sale,
        is_new,
        stars,
        image,
        image_alt,
        product_name,
        price,
        sale_price,
    } = product;

    return(
        `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="product__item ${ is_sale ? "sale": "" }">
          <div class="product__item__pic set-bg" 
            style="background-image: url(${ image });">
                ${ is_sale ? `<div class="label">sale</div> `: ""}
                
              

                ${ is_new ?` <div class="label new">new</div>`:"" }

                ${ (is_sale && is_new) ?  `<div class="label new">new &amp; sale</div>`: "" }
              
            <ul class="product__hover">
              <li><a href="${ image }" class="image-popup"><span class="arrow_expand"></span></a></li>
              <li><a href="#"><span class="icon_heart_alt"></span></a></li>
              <li><a href="#"><span class="icon_bag_alt"></span></a></li>
            </ul>
          </div>
          <div class="product__item__text">
            <h6><a href="#">${ product_name }</a></h6>
            <div class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i></div>
            <div class="product__price">
              ${ is_sale ? 
                `${functions.renderPrice( sale_price )}<span>${ functions.renderPrice(price) }</span>`
                :
                functions.renderPrice( price )
                }
          </div>
        </div>
        </div>  
      </div>    
    `)
}



const product_md4 = (product, options) => {
    const {
        is_sale,
        is_new,
        stars,
        image,
        image_alt,
        product_name,
        price,
        sale_price,
    } = product;

    return(
        `
        <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="product__item ${ is_sale ? "sale": "" }">
          <div class="product__item__pic set-bg" 
            style="background-image: url(${ image });">
                ${ is_sale ? `<div class="label">sale</div> `: ""}
                
              

                ${ is_new ?` <div class="label new">new</div>`:"" }

                ${ (is_sale && is_new) ?  `<div class="label new">new &amp; sale</div>`: "" }
              
            <ul class="product__hover">
              <li><a href="${ image }" class="image-popup"><span class="arrow_expand"></span></a></li>
              <li><a href="#"><span class="icon_heart_alt"></span></a></li>
              <li><a href="#"><span class="icon_bag_alt"></span></a></li>
            </ul>
          </div>
          <div class="product__item__text">
            <h6><a href="#">${ product_name }</a></h6>
            <div class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i></div>
            <div class="product__price">
              ${ is_sale ? 
                `${functions.renderPrice( sale_price )}<span>${ functions.renderPrice(price) }</span>`
                :
                functions.renderPrice( price )
                }
          </div>
        </div>
        </div>  
      </div>    
    `)
}



module.exports = {
    product,
    product_md4  
}