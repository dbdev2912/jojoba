const state = {
    currentInput: "",
    currentPage: 1,
    maxPageIndex: 1,
    data: [],
    filtedData: []
}


$(async () => {
    const url = 'http://localhost:5000/api/admin/product/initial-info'
    // const url = 'http://xuandung.com.vn/api/admin/product/initial-info'
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

    const resetPage = () => {
        state.currentPage = 1
        $('#p_1').hide()
        $('#p_2').show().text(state.currentPage - 1 )
        $('#p_3').show().text(state.currentPage)
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

        $('.rel__product__card *').off('click')
        $('.rel__product__card *').click(e => {
            const product_id = $(e.target).closest('.rel__product__card').attr('product_id')
            const product = state.filtedData.find( p => p.product_id == product_id )

            const img = $(state.currentInput).closest('.relative__product').find('img')
            $(img).attr('src', product.image)
            $(state.currentInput).val( product_id )
            $('#modal-canceler').click()
        })
    }

    /**  HIDE MODEL */

    setFiltedDataToUI()

    const filtDataByAttr = () => {
        const dong_san_pham = $('#rel__cate').val()
        const loai_san_pham = $('#rel__type').val()
        const nhom_san_pham = $('#rel__group').val()

        let filtedData = []
        let maxLength = 0
        if( dong_san_pham === '*' ){
            filtedData = products.slice( state.currentPage * 12, (state.currentPage + 1) * 12,  )
            maxLength = products.length
        }else{
            const filtedByCateData = state.data.filter( p => p.cate == dong_san_pham )

            if( loai_san_pham && loai_san_pham != "*" ){
                const filtedByTypeData = filtedByCateData.filter( p => p.type == loai_san_pham )

                if( nhom_san_pham && nhom_san_pham != '*' ){
                    const filtedByGroupData = filtedByTypeData.filter( p => p.group == nhom_san_pham )
                    filtedData = filtedByGroupData.slice( state.currentPage * 12, ( state.currentPage +1 ) * 12 )
                    maxLength = filtedByGroupData.length
                }else{
                    filtedData = filtedByTypeData.slice( state.currentPage * 12, ( state.currentPage +1 ) * 12 )    
                    maxLength = filtedByTypeData.length
                }
            }else{
                filtedData = filtedByCateData.slice( state.currentPage * 12, ( state.currentPage +1 ) * 12 )
                maxLength = filtedByCateData.length
            }
        }
        return { filtedData, maxPageIndex: Math.ceil(maxLength / 12) }
    }

    $('#p_1').hide()

    
    $('.paginate__trigger').click(e => {      

        const value = parseInt($(e.target).attr('value'))    
        

        if(value ){            
            state.currentPage = state.currentPage + value         

            const { filtedData, maxPageIndex } =  filtDataByAttr();
            state.filtedData = filtedData;
            state.maxPageIndex = maxPageIndex
            setFiltedDataToUI()  
            
            if( state.currentPage == 1 ){
                $('#p_1').hide()                
            }else{
                $('#p_1, #p_2, #p_3').show()                
            }

            if( state.currentPage == state.maxPageIndex - 1 ){
                $('#p_3').hide()
            }else{
                $('#p_1, #p_2, #p_3').show()
            }

            $('#p_1').text(state.currentPage - 1)
            $('#p_2').text(state.currentPage )
            $('#p_3').text(state.currentPage + 1)
        }        
    })

    $('#rel__cate').change( e => {
        const cate = e.target.value;
        
        /**  Lọc sản phẩm theo event change của 3 cái cate, type, group */

        const { data } = state;

        if( cate == "*" ){
            const productsByCate = data.slice(0, 12)
            
            state.filtedData = productsByCate
            $('#rel__type').html('')
        }else{
            const productsByCate = data.filter( product => product.cate == cate ).slice(0, 12)
            const corrTypes =  types.filter( t => t.dong_san_pham === cate)
            state.filtedData = productsByCate
    
            $('#rel__type').html(`
                <option value="*">Tất cả</option>
                ${ corrTypes.map( t => `
                    <option value="${t.ma_loai}">${t.ten_loai}</option>
                ` ).join(' ') }
                
            `)
        }
        $('#rel__group').html(' ')
        resetPage()
        setFiltedDataToUI()  
    })

    $('#rel__type').change(e => {
        const { data } = state;        
        const type = e.target.value;

        if( type=="*" ){
            const cate = $('#rel__cate').val()
            const productsByCate = data.filter( product => product.cate == cate ).slice(0, 12)
            state.filtedData = productsByCate
        }else{
            const productsByType = data.filter( product => product.type == type ).slice(0, 12)
            state.filtedData = productsByType
            const corrGroups = groups.filter( g => g.loai_san_pham == type )

            $('#rel__group').html(`
                <option value="*">Tất cả</option>
                ${ corrGroups.map( l => `
                    <option value="${l.ma_nhom}">${l.ten_nhom}</option>
                ` ).join(' ') }
            `)
        }
        resetPage()
        setFiltedDataToUI()  
    })
    $('#rel__group').change( e => {
        const { data } = state;
        const group = e.target.value;

        if( group == "*" ){
            const type = $('#rel__type').val()
            const productsByType = data.filter( product => product.type == type ).slice(0, 12)
            state.filtedData = productsByType            
        }else{
            const productsByGroup = data.filter( product => product.grou_p == group ).slice(0, 12)
            state.filtedData = productsByGroup

        }
        resetPage()
        setFiltedDataToUI()  
    })

    
    $('.relative__product *').click(e => {
        const targetInput = $(e.target).closest('.relative__product').attr('target')
        state.currentInput = targetInput
    })
    
    $('#submit-relative').click((e) => {
        console.log( state.currentInput)
    })

})