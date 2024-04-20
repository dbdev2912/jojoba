const functions = require('../configs/functions');



const adminSideBar = () => {

    const navigators = [
        {
            title: "Dashboard",
            url: '/admin',
            icon: "fa fa-home",
            id: functions.getFormatedUUID(),
            color: "#555555",
        },
        {
            title: "Sản phẩm",
            id: functions.getFormatedUUID(),
            icon: "fa fa-cubes",
            color: "#4f34eb",
            active: true,

            children: [
                {
                    title: 'Sản phẩm',
                    url: "/admin/product/products",
                },
                {
                    title: 'Dòng sản phẩm',
                    url: "/admin/product/product-categories",
                },
                {
                    title: 'Loại sản phẩm',
                    url: "/admin/product/product-types",
                },
                {
                    title: 'Nhóm sản phẩm',
                    url: "/admin/product/product-groups",
                },
                {
                    title: 'Đơn vị tính',
                    url: "/admin/product/product-units",
                },
            ]
        },
        {
            title: 'Thương hiệu',
            url: "/admin/brands",
            icon: "fa fa-ils",
            id: functions.getFormatedUUID(),
            color: "#2b8c5c"
        },

        {
            title: 'Trạng thái',
            url: "/admin/status",
            icon: "fa fa-sliders",
            id: functions.getFormatedUUID(),
            color: "#3dff33"
        },

        {
            title: 'Đơn hàng',
            icon: "fa fa-shopping-cart",
            url: "/admin/orders",
            id: functions.getFormatedUUID(),
            color: "#ff4405"
        }
    ]

    return navigators.map(page => {
        const { title, url, icon, children, id, color, active } = page

        return `
            <li>
                <a ${children ?
                `href="#${id}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"` :
                `href='${url}'`} ><i class="${icon}" style="color: ${color}"></i> <span>${title}</span></a>
                <ul class="collapse list-unstyled ${active ? "show" : ""}" id="${id}">
                    ${children?.map(child => {
                    const { title, url } = child;
                    return `
                            <li>
                                <a href="${url}">> <span>${title}</span></a>
                            </li>
                        `
                }).join('')}
                    
                </ul>
            </li>
        `

    }).join('')
}


const paginate = (page = {}) => {
    const { origin, pageIndex, maxPageIndex, query } = page;
    
    
    return`<div class="row">

            <div class="col-lg-12 text-right">
                <div class="pagination__option">
                    <a href="${ origin }?page=1${ query ? `&query=${ query }`: "" }"><i class="fa fa-angle-double-left"></i></a>
                    <a style="display: ${ pageIndex === 1 ? "none": "inline-block" }" href="${ origin }?page=${ pageIndex - 1 }${ query ? `&query=${ query }`: "" }"><i class="fa fa-angle-left"></i></a>

                    <a style="display: ${ pageIndex === 1 ? "none": "inline-block" }" href="${ origin }?page=${ pageIndex - 1 }${ query ? `&query=${ query }`: "" }">${pageIndex - 1}</a>
                    <a class="active" href="#">${ pageIndex }</a>
                    <a style="display: ${ pageIndex === maxPageIndex ? "none": "inline-block" }" href="${ origin }?page=${ pageIndex + 1 }${ query ? `&query=${ query }`: "" }">${pageIndex + 1}</a>

                    <a style="display: ${ pageIndex === maxPageIndex ? "none": "inline-block" }" href="${ origin }?page=${ pageIndex + 1 }${ query ? `&query=${ query }`: "" }"><i class="fa fa-angle-right"></i></a>
                    <a href="${ origin }?page=${ maxPageIndex }${ query ? `&query=${ query }`: "" }"><i class="fa fa-angle-double-right"></i></a>
                </div>
            </div>

        </div>`

    
}

module.exports = {
    adminSideBar,
    paginate
}