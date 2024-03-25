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
                    url: "/admin/products",
                },
                {
                    title: 'Dòng sản phẩm',
                    url: "/admin/product-categories",
                },
                {
                    title: 'Loại sản phẩm',
                    url: "/admin/product-types",
                },
                {
                    title: 'Nhóm sản phẩm',
                    url: "/admin/product-groups",
                },
                {
                    title: 'Đơn vị tính',
                    url: "/admin/units",
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
            color:  "#ff4405" 
        }
    ]

    return navigators.map( page => {
        const { title, url, icon, children, id, color, active } = page

        return `
            <li>
                <a ${ 
                    children ? 
                        `href="#${id}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"`: 
                        `href='${url}'` } ><i class="${ icon }" style="color: ${ color }"></i> <span>${ title }</span></a>
                <ul class="collapse list-unstyled" id="${id}">
                    ${ children?.map( child => {
                        const { title, url } = child;
                        return`
                            <li>
                                <a href="${ url }">> <span>${ title }</span></a>
                            </li>
                        `
                    }).join('') }
                    
                </ul>
            </li>
        `

    }).join('')
}

module.exports = {
    adminSideBar
}