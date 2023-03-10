import "./product.css";
import {useContext} from "react";
import {Context} from "../../context/context";
import {Link} from "react-router-dom";

export default function Product({item}){
    const {addToCart} = useContext(Context);

    return (
        <div className="product">
            <Link to={`/${item.id}`}>
                <img src={item.image} alt={item.name} className="productImg" />
            </Link>
            <div className="productName">{item.name.toUpperCase()}</div>
            <div className="productPrice">${item.price/100}</div>
            <div className="productManufacturer">Manufactured by {item.company}</div>
            <div className="productReview">{item.review}</div>
            <button className="productBtn" onClick={() => addToCart({item, quantity: 1})}>Add to Cart</button>
        </div>
    )
}