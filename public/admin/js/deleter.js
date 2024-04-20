$(() => {
    const proxy = "http://localhost:5000"
    // const proxy = "http://xuandung.com.vn"

    $('.category__delete__icon i').click((e) => {
        const $target = $(e.target).closest('.category__delete__icon')
        const cate_id = $target.attr('data')
        
        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa dòng sản phẩm ${ cate_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then( (confirm) => {
            if( confirm.isConfirmed ){


                fetch(`${ proxy }/admin/product/product-category`, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ cate_id })
               }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               })
            }else{

            }
         })

    })


    $('.type__delete__icon i').click((e) => {
        const $target = $(e.target).closest('.type__delete__icon')
        const type_id = $target.attr('data')
        
        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa loại sản phẩm ${ type_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then((confirm) => {
            if( confirm.isConfirmed ){


                fetch(`${ proxy }/admin/product/product-type`, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ type_id })
               }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {
                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               })
            }
         })

    })

    $('.group__delete__icon i').click((e) => {
        const $target = $(e.target).closest('.group__delete__icon')
        const group_id = $target.attr('data')

        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa nhóm sản phẩm ${ group_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then(( confirm ) => {
            if( confirm.isConfirmed ){
                /**
                 * 
                 * SEND REQUEST HERE
                 * 
                 */

               fetch(`${proxy}/admin/product/product-group`, {
                method: "delete",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ group_id })
               }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {
                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               }) 

            }else{
                
            }
         })
    })


    $('.unit__delete__icon i').click(e => {


        const $target = $(e.target).closest('.unit__delete__icon')
        const unit_id = $target.attr('data')

        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa đơn vị ${ unit_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then(( confirm ) => {
            if( confirm.isConfirmed ){
                /**
                 * 
                 * SEND REQUEST HERE
                 * 
                 */

                fetch(`${proxy}/admin/product/product-unit`, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ unit_id })
                }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {
                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               }) 

            }else{
                
            }
         })

    }) 


    $('.status__delete__icon i').click(e => {


        const $target = $(e.target).closest('.status__delete__icon')
        const status_id = $target.attr('data')

        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa trạng thái ${ status_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then(( confirm ) => {
            if( confirm.isConfirmed ){
                /**
                 * 
                 * SEND REQUEST HERE
                 * 
                 */

                console.log(status_id)

                fetch(`${proxy}/admin/status`, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ status_id })
                }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {
                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               }) 

            }else{
                
            }
         })

    }) 


    $('.product__delete__icon i').click(e => {
        const $target = $(e.target).closest('.product__delete__icon')
        const product_id = $target.attr('data')


        Swal.fire({
            title: 'Cảnh báo',
            text: `Xóa sản phẩm ${ product_id } ?` ,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
      
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
         }).then(( confirm ) => {
            if( confirm.isConfirmed ){
                /**
                 * 
                 * SEND REQUEST HERE
                 * 
                 */

                console.log(product_id)

                fetch(`${proxy}/admin/product`, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ product_id })
                }).then(res => res.json()).then( res => {
                    const { success, content } = res;
                    if( success ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',                                                
                        }).then(() => {
                            setTimeout(() => {                                
                                window.location.reload()
                            }, 1000)
                        });                       

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: content,                            
                        });
                    }
               }) 

            }else{
                
            }
         })


    })

})