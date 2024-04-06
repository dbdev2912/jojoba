$( async () => {
    const url = 'http://localhost:5000/api/admin/product/initial-info'
    const req = await fetch(url)
    const res = await req.json()    

    const {
        types,
        groups,
        products
    } = res.data

    
    
    const selectedCate = $('#cates').attr('value')
    const selectedType = $('#types').attr('value')
    const selectedGroup = $('#groups').attr('value')

    const selectedUnit = $('#units').attr('value')

    $(`#cates option[value="${ selectedCate }"]`).attr("selected", "true")
    $(`#units option[value="${ selectedUnit }"]`).attr("selected", "true")
    const corespondingTypes = types.filter( type => type.dong_san_pham == selectedCate )
    
    $('#types').html(`
        <option value="none">Không</option>
        ${ corespondingTypes.map( type => `
            <option value="${type.ma_loai}" ${ type.ma_loai == selectedType ? 'selected="true"' : "" }>${ type.ten_loai }</option>
        `).join(' ') }
    `)

    const corespondingGroups = groups.filter(gr => gr.loai_san_pham == selectedType)

    $('#groups').html(`
        <option value="none">Không</option>
        ${ corespondingGroups.map( group => `
            <option value="${group.ma_nhom}" ${ group.ma_nhom == selectedGroup ? 'selected="true"' : "" }>${ group.ten_nhom }</option>
        ` ).join(' ') }
    `)
    
    
})