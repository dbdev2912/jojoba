const state = {
    currentInput: "",
    currentPage: 1,
    maxPageIndex: 1,
    data: [],
    filtedData: []
}


$(async () => {
    const proxy = ''
    const url = '/api/admin/product/initial-info'
    const selectProductAPI = '/api/admin/order/add__product'
    const removeProductAPI = '/api/admin/order/remove__product'

    // const proxy = 'http://xuandung.com.vn'
    // const url = 'http://xuandung.com.vn/api/admin/product/initial-info'
    // const selectProductAPI = 'http://xuandung.com.vn/api/admin/order/add__product'
    // const removeProductAPI = 'http://xuandung.com.vn/api/admin/order/remove__product'

    const req = await fetch(url)
    const res = await req.json()

    const {
        products
    } = res.data


    state.origin = products;
    state.data = products;
    state.filtedData = products.slice(0, 12)
    state.maxPageIndex = Math.ceil(products.length / 12)
    state.order_id = $('#order_id').attr('order_id')


    const resetPage = () => {
        state.currentPage = 1
        $('#p_1').hide()
        $('#p_2').show().text(state.currentPage)
        $('#p_3').show().text(state.currentPage + 1)
    }


    const setFiltedDataToUI = () => {

        $('#rel__products').html(state.filtedData.map(product => `
            <div class="col-2 rel__product__card" product_id="${product.product_id}">
                <div class="rel__product_img">
                    <img src="${product.image}" alt=""/>
                </div>
                <div class="rel__product__content">
                    <h6>${product.product_id}</h6>
                    <p>${product.product_name}</p>
                </div>
            </div>
        ` ).join(' '))

        $('.rel__product__card').off('click')
        $('.rel__product__card').click(async (e) => {
            const product_id = $(e.target).closest('.rel__product__card').attr('product_id')
            $('#modal-canceler').click()

            const { order_id } = state;
            const req = await fetch(selectProductAPI, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ product_id, order_id })
            });
            const res = await req.json()
            const { success, error, product, content, total, shipping_fee, final } = res;

            /** EDIT ICON CURRENTLY HIIDEN DUE TO LACK OF FUNCTIONALITY  */

            if (success) {
                $('#order__total').html(total)
                $('#shipping__fee').html(shipping_fee)
                $('#order__final').html(final)

                $('#products').append(`
                    <tr>
                        <td>${product.product_id}</td>
                        <td>${product.product_name}</td>
                        <td class="text-center">1</td>
                        <td>${product.price}</td>
                        <td>${product.price}</td>
                        <td>${product.in_stock ? "Còn hàng" : "Hết hàng"}</td>
                        <td>
                            <div class="d-flex">
                                <a class="table__icon order__product__edit__icon" data="${product_id}" data-toggle="modal" data-target="#edit__order__product"><i class="fa fa-edit"></i></a>
                                <a class="table__icon table__delete__icon order__product__delete__icon" data="${product_id}"><i class="fa fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                `)
                initProductFunctionality()
            } else {
                /**
                 * 
                 * ERROR BUT CURRENTLY PAUSE
                 * 
                 */
                alert(content)
            }
        })
    }

    const initProductFunctionality = () => {

        $('#products .order__product__delete__icon').click(e => {
            const p_id = $(e.target).closest('.order__product__delete__icon').attr('data')


            const { order_id } = state;
            Swal.fire({
                title: 'Cảnh báo',
                text: `Xóa sản phẩm ${p_id} khỏi đơn hàng ?`,
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Có',

                cancelButtonColor: '#d33',
                cancelButtonText: 'Không',
            }).then((confirm) => {
                if (confirm.isConfirmed) {
                    /**
                     * 
                     * SEND REQUEST HERE
                     * 
                     */


                    fetch(removeProductAPI, {
                        method: "delete",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ product_id: p_id, order_id })
                    }).then(res => res.json()).then(res => {
                        const { success, content } = res;
                        if (success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Xóa thành công',
                            }).then(() => {
                                setTimeout(() => {
                                    window.location.reload()
                                }, 1000)
                            });

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: content,
                            });
                        }
                    })

                } else {

                }
            })


        })

        $('#products .order__product__edit__icon').click(async (e) => {
            const product_id = $(e.target).closest('.order__product__edit__icon').attr('data')

            const { data, order_id } = state

            const req = await fetch(`${proxy}/api/admin/order/d/${order_id}/product/${product_id}`)
            const res = await req.json();
            const { success, product, error, content } = res;
            if (success) {
                const {
                    ma_san_pham,
                    ten_san_pham,
                    so_luong,
                    don_gia
                } = product;

                $('#ma__san__pham').val(ma_san_pham)
                $('#ten__san__pham').val(ten_san_pham)
                $('#so__luong').val(so_luong)
                $('#don__gia').val(don_gia)
            } else {
                alert(content)
            }
        })
    }

    resetPage()

    /**  HIDE MODEL */

    setFiltedDataToUI()

    const filtDataByPageIndex = () => {
        const { currentPage } = state;
        const filtedData = state.data.slice(currentPage * 12, (currentPage + 1) * 12)
        return filtedData
    }

    $('.paginate__trigger').click(e => {

        const value = parseInt($(e.target).attr('value'))


        if (value) {
            state.currentPage = state.currentPage + value

            const filtedData = filtDataByPageIndex();
            state.filtedData = filtedData;
            setFiltedDataToUI()
            if (state.currentPage == 1) {
                $('#p_1').hide()
            } else {
                $('#p_1, #p_2, #p_3').show()
            }

            if (state.currentPage == state.maxPageIndex - 1) {
                $('#p_3').hide()
            } else {
                // $('#p_1, #p_2, #p_3').show()                
            }

            $('#p_1').text(state.currentPage - 1)
            $('#p_2').text(state.currentPage)
            $('#p_3').text(state.currentPage + 1)
        }
    })


    $('#product__search').on('keyup', e => {
        const value = e.target.value.toLowerCase()
        const data = state.origin.filter(data => {
            const serialized = JSON.stringify({ ...data, price: undefined })
            return serialized.toLowerCase().includes(value)
        })

        state.data = data;
        const filtedData = data.slice(0, 12)
        state.filtedData = filtedData
        state.maxPageIndex = Math.ceil(data.length / 12)
        setFiltedDataToUI()
        resetPage()
    })

    initProductFunctionality()

    $('#order__product__edit__submit').click(async (e) => {
        const ma_san_pham = $('#ma__san__pham').val()
        const ten_san_pham = $('#ten__san__pham').val()
        const so_luong = $('#so__luong').val()
        const don_gia = $('#don__gia').val()

        const { order_id } = state;

        const reqBody = {
            order_id, 
            product_id: ma_san_pham,
            quantity: so_luong,
            price: don_gia
        }

        const req = await fetch(`${ proxy }/api/admin/order/update__product`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(reqBody)
        })
        const res = await req.json()
        const { success, error, content } = res;

        

        if( success ){
            window.location.reload()
        }else{
            alert(content)
        }
    })
})