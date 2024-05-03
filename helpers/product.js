const functions = require('../configs/functions')

const product = (product, options) => {
  const {
    product_id,
    is_sale,
    is_new,
    stars,
    image,
    image_alt,
    product_name,
    price,
    sale_price,
    brand_name,
  } = product;

  return (
    `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="product__item ${is_sale ? "sale" : ""}">
          <div class="product__item__pic">
            <a href="/products/p/${ product_id }">
              <div class="product__image">
                <img src="${image}" alt="${ brand_name ? brand_name: "" } - ${product_name}"/>
              </div>
            </a>
                ${is_sale ? `<div class="label">sale</div> ` : ""}
                
              

                ${is_new ? ` <div class="label new">new</div>` : ""}

                ${(is_sale && is_new) ? `<div class="label new">new &amp; sale</div>` : ""}
              
            <ul class="product__hover">
              <li><a href="${image}" class="image-popup"><span class="arrow_expand"></span></a></li>
              <li><a><span class="icon_heart_alt"></span></a></li>
              <li><a><span class="icon_bag_alt cart__add" data="${product_id }"></span></a></li>
            </ul>
          </div>
          <div class="product__item__text">
            <h6><a href="/products/p/${ product_id }">${product_name}</a></h6>
            <div class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i></div>
            <div class="product__price">
              ${is_sale ?
      `${functions.renderPrice(sale_price)}<span>${functions.renderPrice(price)}</span>`
      :
      functions.renderPrice(price)
    }
          </div>
        </div>
        </div>  
      </div>    
    `)
}



const product_md4 = (product, options) => {
  const {
    product_id,
    is_sale,
    is_new,
    stars,
    image,
    image_alt,
    product_name,
    price,
    sale_price,
    brand_name
  } = product;

  return (
    `
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="product__item ${is_sale ? "sale" : ""}">
          <div class="product__item__pic">
            <a href="/products/p/${ product_id }">
              <div class="product__image">
                <img src="${image}" alt="${ brand_name ? brand_name: "" } - ${product_name}"/>
              </div>
            </a>
                ${is_sale ? `<div class="label">sale</div> ` : ""}
                
              

                ${is_new ? ` <div class="label new">new</div>` : ""}

                ${(is_sale && is_new) ? `<div class="label new">new &amp; sale</div>` : ""}
              
            <ul class="product__hover">
              <li><a href="${image}" class="image-popup"><span class="arrow_expand"></span></a></li>
              <li><a><span class="icon_heart_alt"></span></a></li>
              <li><a><span class="icon_bag_alt cart__add" data="${product_id }"></span></a></li>
            </ul>
          </div>
          <div class="product__item__text">
            <h6><a href="/products/p/${ product_id }">${product_name}</a></h6>
            <div class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i></div>
            <div class="product__price">
              ${is_sale ?
      `${functions.renderPrice(sale_price)}<span>${functions.renderPrice(price)}</span>`
      :
      functions.renderPrice(price)
    }
          </div>
        </div>
        </div>  
      </div>    
    `)
}

const product_record = (product, options) => {
  return (`<tr>
    <td class="cart__product__item">
        <img src="${product.image}" alt="${product.brand_name} - ${ product.product_name }" />
        <div class="cart__product__item__title">
            <h6>${product.product_name}</h6>
            
        </div>
    </td>
    ${ product.is_for_sale ? 
      `<td class="cart__price">${functions.renderPrice(product.price)} <i class="sale__off">-${ product.sale_off }%</i></td>`
      :
      `<td class="cart__price">${functions.renderPrice(product.price)}</td>`
    }
    <td class="cart__quantity">
        <div class="pro-qty" data="${ product.product_id }">
            <input class="product__quantity" price="${ product.price }" type="text" value=${product.quantity} />
        </div>
    </td>
    <td class="cart__total">${product.quantity * product.price}</td>
    <td class="cart__close"><span class="icon_close cart__remove" data="${ product.product_id }"></span></td>
</tr>`
  )
}



const product_order_record = (product, options) => {
  return (`<tr>
    <td class="cart__product__item">
        <img src="${product.image}" alt="${product.brand_name} - ${ product.product_name }" />
        <div class="cart__product__item__title">
            <h6>${product.product_name}</h6>           
        </div>
    </td>
    ${ product.is_for_sale ? 
      `<td class="cart__price">${functions.renderPrice(product.price)} <i class="sale__off">-${ product.sale_off }%</i></td>`
      :
      `<td class="cart__price">${functions.renderPrice(product.price)}</td>`
    }
    <td class="cart__quantity">
        <div class="pro-qty-disabled text-center">            
            <span>${product.quantity}</span>
        </div>
    </td>
    <td class="cart__total">${product.quantity * product.price}</td>
    <td class="cart__close" style="display: none"><span class="icon_close cart__remove" data="${ product.product_id }"></span></td>
</tr>`
  )
}

const adminProduct_tableRecord = (product) => {
  const {
    index,
    product_id,
    product_name,
    status,
    category,
    type,
    group,
  } = product

  return `
    <tr>
      <td>${index}</td>
      <td>${product_id}</td>
      <td>${product_name}</td>
      <td style="color: ${status ? "green" : "red"}">${status ? "Còn hàng" : "Hết hàng"}</td>
      <td>${category}</td>
      <td>${type}</td>
      <td>${group}</td>
      <td>
          <div class="d-flex">
              <a href="/admin/product/products/edit/${product_id}" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
              <a class="table__icon table__delete__icon product__delete__icon" data="${product_id}"><i class="fa fa-trash"></i></a>
          </div>
      </td>
    </tr>
  `
}


const adminProduct_categoryRecord = (category) => {
  const { index, category_id, category_name, note } = category;
  return `
  <tr>
    <td>${index}</td>
    <td>${category_id}</td>
    <td>${category_name}</td>    
    <td>${note}</td>
    <td>
          <div class="d-flex">
              <a href="/admin/product/product-categories/edit/${ category_id }" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
              <a class="table__icon table__delete__icon category__delete__icon" data="${ category_id }"><i class="fa fa-trash"></i></a>
          </div>
      </td>
  </tr>
`
}

const adminProduct_typeRecord = (category) => {
  const { index, type_id, type_name, note, cate_name } = category;
  return `
    <tr>
      <td>${index}</td>
      <td>${type_id}</td>
      <td>${type_name}</td>   
      <td>${cate_name}</td>   
      <td>${note}</td>
      <td>
            <div class="d-flex">
                <a href="/admin/product/product-types/edit/${ type_id }" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
                <a class="table__icon table__delete__icon type__delete__icon" data="${ type_id }"><i class="fa fa-trash"></i></a>
            </div>
        </td>
    </tr>
  `
}


const adminProduct_groupRecord = (category) => {
  const { index, group_id, group_name, note, type_name } = category;
  return `
  <tr>
    <td>${index}</td>
    <td>${group_id}</td>
    <td>${group_name}</td>    
    <td>${type_name}</td>
    <td>${note}</td>
    <td>
          <div class="d-flex">
              <a href="/admin/product/product-groups/edit/${ group_id }" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
              <a class="table__icon table__delete__icon group__delete__icon" data="${ group_id }"><i class="fa fa-trash"></i></a>
          </div>
      </td>
  </tr>
`
}

const adminProduct_unitRecord = (category) => {
  const { index, unit_id, unit_name, note } = category;
  return `
  <tr>
    <td>${index}</td>
    <td>${unit_id}</td>
    <td>${unit_name}</td>    
    <td>${note}</td>
    <td>
          <div class="d-flex">
              <a href="/admin/product/product-units/edit/${ unit_id }" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
              <a class="table__icon table__delete__icon unit__delete__icon" data="${ unit_id }"><i class="fa fa-trash"></i></a>
          </div>
      </td>
  </tr>
`
}

const adminProduct_statusRecord = (category) => {
  const { index, status_id, status_name, note, is_default } = category;
  return `
  <tr>
    <td>${index}</td>
    <td>${status_id}</td>
    <td>${status_name}</td>    
    <td>${note}</td>
    <td>${ is_default ? "Mặc định": "" }</td>
    <td>
          <div class="d-flex">
              <a href="/admin/status/edit/${ status_id }" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
              <a class="table__icon table__delete__icon status__delete__icon" data="${ status_id }"><i class="fa fa-trash"></i></a>
          </div>
      </td>
  </tr>
`
}


module.exports = {
  product,
  product_md4,
  product_record,
  adminProduct_tableRecord,
  adminProduct_categoryRecord,
  adminProduct_typeRecord,
  adminProduct_groupRecord,
  adminProduct_unitRecord,
  adminProduct_statusRecord,
  product_order_record
}