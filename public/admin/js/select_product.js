const state = {
    currentInput: "",
    currentPage: 1,
    maxPageIndex: 1,
    data: [],
    filtedData: []
}


$(async () => {
    const url = 'http://localhost:5000/api/admin/product/initial-info'
    const selectProductAPI = 'http://localhost:5000/api/admin/order/add__product'
    
    // const url = 'http://xuandung.com.vn/api/admin/product/initial-info'
    // const selectProductAPI = 'http://xuandung.com.vn/api/admin/order/add__product'

    const req = await fetch(url)
    const res = await req.json()

    const {
        types,
        groups,
        products
    } = res.data


    state.origin = products;
    state.data = products;
    state.filtedData = products.slice(0, 12)
    state.maxPageIndex = Math.ceil( products.length / 12 )
    state.order_id = $('#order_id').attr('order_id')
    console.log(state.order_id)

    const resetPage = () => {
        state.currentPage = 1
        $('#p_1').hide()
        $('#p_2').show().text(state.currentPage )
        $('#p_3').show().text(state.currentPage + 1)
    }


    const setFiltedDataToUI = () => {

        $('#rel__products').html(state.filtedData.map( product => `
            <div class="col-2 rel__product__card" product_id="${ product.product_id }">
                <div class="rel__product_img">
                    <img src="${product.image}" alt=""/>
                </div>
                <div class="rel__product__content">
                    <h6>${product.product_id}</h6>
                    <p>${ product.product_name }</p>
                </div>
            </div>
        ` ).join(' '))

        $('.rel__product__card').off('click')
        $('.rel__product__card').click( async (e) => {
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
            const { success, error, product } = res;
            
            if( success ){
                $('#products').append(`
                    <tr>
                        <td>${ product.product_id }</td>
                        <td>${ product.product_name }</td>
                        <td class="text-center">1</td>
                        <td>${ product.price }</td>
                        <td>${ product.price }</td>
                        <td>${ product.in_stock ? "Còn hàng": "Hết hàng" }</td>
                        <td>
                            <div class="d-flex">
                                <a class="table__icon order__product__edit__icon" data="${ product_id }"><i class="fa fa-edit"></i></a>
                                <a class="table__icon table__delete__icon order__product__delete__icon" data="${ product_id }"><i class="fa fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                `)
                initProductFunctionality()
            }
        })
    }

    const initProductFunctionality = () => {

        $('#products .order__product__delete__icon').click(e => {
            const p_id = $(e.target).closest('.order__product__delete__icon').attr('data')
            console.log(p_id)
        })

        $('#products .order__product__edit__icon').click(e => {
            const p_id = $(e.target).closest('.order__product__edit__icon').attr('data')
            
        })


    }

    resetPage()

    /**  HIDE MODEL */

    setFiltedDataToUI()

    const filtDataByPageIndex = () => {
        const { currentPage } = state;
        const filtedData = state.data.slice( currentPage * 12 , (currentPage + 1 ) * 12)
        return filtedData
    }

    $('.paginate__trigger').click(e => {      

        const value = parseInt($(e.target).attr('value'))    
        

        if(value ){            
            state.currentPage = state.currentPage + value         

            const filtedData =  filtDataByPageIndex();
            state.filtedData = filtedData;            
            setFiltedDataToUI()              
            if( state.currentPage == 1 ){
                $('#p_1').hide()                
            }else{
                $('#p_1, #p_2, #p_3').show()                
            }

            if( state.currentPage == state.maxPageIndex - 1 ){
                $('#p_3').hide()
            }else{
                // $('#p_1, #p_2, #p_3').show()                
            }

            $('#p_1').text(state.currentPage - 1)
            $('#p_2').text(state.currentPage )
            $('#p_3').text(state.currentPage + 1)
        }        
    })


    $('#product__search').on('keyup', e => {
        const value = e.target.value.toLowerCase()
        const data = state.origin.filter( data  => {            
            const serialized = JSON.stringify({...data, price: undefined})
            return serialized.toLowerCase().includes( value )
        })        
    
        state.data = data;
        const filtedData = data.slice(0, 12)
        state.filtedData = filtedData
        state.maxPageIndex = Math.ceil( data.length / 12 )
        setFiltedDataToUI()
        resetPage()        
    })

   

    initProductFunctionality()

})