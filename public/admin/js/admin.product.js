

$(async () => {
    const url = '/api/admin/product/initial-info'
    // const url = 'http://xuandung.com.vn/api/admin/product/initial-info'
    const req = await fetch(url)
    const res = await req.json()


    const {
        types,
        groups
    } = res.data

    /**
     * 
     * SET TRIGGER
     * 
     */


    $('#cates').change((e) => {

        /**
         * 
         *  Khi thay đổi dòng sản phẩm thì.
         *  - Lọc ra toàn bộ loại sản phẩm tương ứng => Đặt lại toàn bộ options trong box types
         *      Nếu tồn tại ít nhất một loại => Lọc ra toàn bộ nhóm tương ứng với loại 1st rồi đặt lại options trong box groups
         * 
         */

        const currentCate = e.target.value;
        const corespondingTypes = types.filter(type => type.dong_san_pham == currentCate)

        $('#types').html(`
            <option value="none">Không</option>
            ${corespondingTypes.map(type => `
                <option value="${type.ma_loai}" >${type.ten_loai}</option>
            `).join(' ')}
        `)

        const firstType = corespondingTypes[0]
        if (firstType) {
            const corespondingGroups = groups.filter(group => group.loai_san_pham == firstType.ma_loai)

            $('#groups').html(`
                    <option value="none">Không</option>
                    ${corespondingGroups.map(group => `
                        <option value="${group.ma_nhom}" >${group.ten_nhom}</option>
                    `).join(' ')}
                `)
        } else {
            $('#groups').html('')
        }
    })

    $('#types').change((e) => {

        /**
         * 
         *  Khi thay đổi loại sản phẩm thì.
         *  - Lọc ra toàn bộ nhóm sản phẩm tương ứng => Đặt lại toàn bộ options trong box groups
         * 
         */


        const currentType = e.target.value;
        const corespondingGroups = groups.filter(group => group.loai_san_pham == currentType)
        $('#groups').html(`
            <option value="none">Không</option>
            ${corespondingGroups.map(group => `
                <option value="${group.ma_nhom}" >${group.ten_nhom}</option>
            `).join(' ')}
        `)
    })


    /**
     *  SET INITIAL DATA
     */


    const selectedCate = $('#cates').val()
    if (selectedCate) {
        const corespondingTypes = types.filter(type => type.dong_san_pham == selectedCate);
        if (corespondingTypes && corespondingTypes.length > 0) {
            $('#types').html(`
                <option value="none">Không</option>
                ${corespondingTypes.map(type => `
                    <option value="${type.ma_loai}" >${type.ten_loai}</option>
                `).join(' ')}
            `)
            const firstType = corespondingTypes[0]
            const corespondingGroups = groups.filter(group => group.loai_san_pham == firstType.ma_loai)
            if (corespondingGroups && corespondingGroups.length > 0) {
                $('#groups').html(`
                    <option value="none">Không</option>
                    ${corespondingGroups.map(group => `
                        <option value="${group.ma_nhom}" >${group.ten_nhom}</option>
                    `).join(' ')}
                `)
            }
        }
    }




    /**
     * PREVIEW TRIGGER
     */

    $('#preview-btn, #preview-img').click(() => {
        $('#preview-file-input').click()
    })


    $('#preview-file-input').change(e => {

        const rawFile = e.target.files[0]
        const reader = new FileReader();

        reader.readAsDataURL(rawFile);

        reader.onload = (e) => {
            $('#preview-img').attr("src", e.target.result)
            $('#preview-img').show()
            $('#preview-btn').hide();
        }
    })


    /**
     *  PREVIEW TECHICAL IMAGES
     */

    $('#tech-preview-btn, #tech-images').click( () => {
        $('#preview-tech-file-input').click()
    }) 

    $('#preview-tech-file-input').change((e) => {
        const { files } = e.target;        
        if( files && files.length > 0 ){
            $('#tech-images').html(' ')
            $('#tech-preview-btn').hide()
            $('#tech-images').show()

            for( let i = 0 ; i < files.length; i++ ){
                const file = files[i]

                const reader = new FileReader();
                reader.readAsDataURL( file )

                reader.onload = function(e){
                    $('#tech-images').append(`
                        <div class="tech-img">
                            <img class="preview-img" src="${ e.target.result }" alt="">
                        </div>
                    `)
                }
            }
        }
    })


})