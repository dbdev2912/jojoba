const functions = require('../configs/functions')

const order_record = ( order, options ) => {
    const { order_id, create_at, to_address, total, status, recipient } = order;

    return(`<tr class="order-record" to="/u/order/${ order_id }">
      <td >${ order_id }</td>
      <td >${ functions.formatDate(create_at) }</td>
      <td class="cart__price">${ functions.renderPrice( total ) }</td>
      <td >${status }</td>      
      <td >${ to_address?.length > 24 ? (to_address.slice(0, 24) + "..." ): to_address }</td>
      <td >${ recipient }</td>
  </tr>`
  )
}

module.exports = {
    order_record
}