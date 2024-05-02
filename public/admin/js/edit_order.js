$(() => {
    const proxy = ''
    // const proxy = 'http://xuandung.com.vn'

    const order_id = $('#order_id').attr('order_id')

    $('#order__edit__submit').click( async (e) => {
        const status_id = $('#trang__thai').val()
        const shipping_fee = $('#phi__van__chuyen').val()

        const req = await fetch(`${ proxy }/api/admin/order/edit__info`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status_id, order_id, shipping_fee })
        })
        const res = await req.json()
        const { success, content } = res
        if( success ){
            window.location.reload()
        }else{
            alert( content )
        }
    })
})