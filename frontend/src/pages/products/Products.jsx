import "./products.css";
import Product from "../../components/product/Product";
import {useState, useContext} from "react";
import {Context} from "../../context/context";

export default function Products(){
    const {products} = useContext(Context)

    const prodElements = products.map(item => {
        return <Product key={item.id} item={item} />
    })

    return (
        <div className="products">
            {prodElements}
        </div>
    )
}