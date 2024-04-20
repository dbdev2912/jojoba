const functions = require('../configs/functions')

const order_record = (order, options) => {
  const { index, order_id, create_at, to_address, total, status, recipient } = order;

  return (`<tr class="order-record order__record__redirect" to="/u/order/${order_id}">
    <td >${index}</td>
      <td >${order_id}</td>
      <td >${functions.formatDate(create_at)}</td>
      <td class="cart__price">${functions.renderPrice(total)}</td>
      <td >${status}</td>      
      <td >${to_address?.length > 24 ? (to_address.slice(0, 24) + "...") : to_address}</td>
      <td >${recipient}</td>
  </tr>`
  )
}

const admin_order = (order, options) => {
  const {
    index,
    order_id,
    order_by,
    create_at,
    to_address,
    total,
    recipient,
    status } = order;

  return `
    <tr>
      <td>${index}</td>
      <td>${order_id}</td>
      <td>${create_at}</td>   
      <td>${order_by}</td>
      <td>${total}</td>
      <td>${to_address.slice(0, 50)}...</td>   
      <td>${recipient}</td>
      <td>${status}</td>
      <td>
            <div class="d-flex">
                <a href="/admin/orders/${order_id}" class="table__icon table__edit__icon"><i class="fa fa-edit"></i></a>
                <a class="table__icon table__delete__icon order__delete__icon" data="${order_id}"><i class="fa fa-trash"></i></a>
            </div>
        </td>
  </tr>
  `
}

module.exports = {
  order_record,
  admin_order
}