import { useSelector } from "react-redux";

import Breadcrumb from "../ui/navbar/breadcrumb";

export default () => {

    const { lang } = useSelector(state => state)
    const breadcrumb = [
        {
            name: lang["trang chủ 1"],
            url: "/",
            icon: "fa fa-home",            
        },
        {
            name: lang["sản phẩm 1"]    
        },
    ]
    return (
        <div>           
            
            <Breadcrumb path={ breadcrumb }/>

        </div>
    );
};
