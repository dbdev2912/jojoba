import { useSelector } from "react-redux";
import Breadcrumb from "../ui/navbar/breadcrumb";
import { useEffect, useState } from "react";


import Cart from "../ui/cart/cart";

export default ( props ) => {

    const { lang, functions } = useSelector(state => state)

    const breadcrumb = [
        {
            name: lang["trang chủ 1"],
            url: "/",
            icon: "fa fa-home",
        },
        {
            name: lang["giỏ hàng"],
            url: "/u/cart"
        },
        {
            name: lang["giỏ hàng"],
        },
    ]


    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const sampleProducts = [
            {
                product_name: "Chain bucket bag",
                image: "/img/shop-cart/cp-1.jpg",
                price: 1700000,
                quantity: 2,
                start: 5,                
            },
            {
                product_name: "Zip-pockets pebbled tote briefcase",
                image: "/img/shop-cart/cp-2.jpg",
                price: 1000000,
                quantity: 1,
                start: 5,                
            },
            {
                product_name: "Black jean",
                image: "/img/shop-cart/cp-3.jpg",
                price: 2000000,
                quantity: 3,
                start: 5,                
            },
        ]
        setProducts( sampleProducts )

    }, [])


    return(
        <div>
            <Breadcrumb path={ breadcrumb }/>
            <Cart products={ products }/>
        </div>
    )
}