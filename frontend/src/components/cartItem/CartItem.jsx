import "./cartItem.css";
import {useContext, useState} from "react";
import {Context} from "../../context/context";

export default function CartItem({item}){
    const {updateCart, removeFromCart} = useContext(Context);
    const [count, setCount] = useState(item.quantity);

    const incrementQuantity = (item) => {
        setCount(prevCount => prevCount + 1);
        updateCart({...item, quantity: count + 1});
    };

    const decrementQuantity = (item) => {
        const updatedCount = count > 1 ? count - 1 : 1;
        setCount(updatedCount);
        updateCart({...item, quantity: count - 1 > 1 ? count - 1: 1})
    }

    return (
        <div className="cartItem">
            <hr />
            <div className="cartItemsContainer">
                <div className="leftContainer">
                    <img className="itemImg" src={item.item.image} alt={item.item.name} />
                    <button className="removeFromCartBtn" onClick={() => removeFromCart(item.item.id)}>Remove from Cart</button>
                </div>
                <div className="midContainer">
                    <div className="itemName">{item.item.name}</div>
                    <div className="itemCompany">Brand: {item.item.company}</div>
                    <div className="itemPrice">Unit Price: ${item.item.price/100}</div>
                </div>
                <div className="rightCont">
                    <div className="quantityInfo">
                        <div className="itemQuantity">Quantity: </div>
                        <button className="decrementQuantityBtn" onClick={() => decrementQuantity(item)} disabled={count === 1}>-</button>
                        <button className="quantityCount">{count}</button>
                        <button className="incrementQuantityBtn" onClick={() => incrementQuantity(item)}>+</button>
                    </div>
                    <div className="itemTotalPrice">Item Price: ${item.item.price * item.quantity /100}</div>
                    <div className="priceBreakdown">{`$${item.item.price/100} x ${item.quantity} ${item.quantity > 1 ? 'quantities' : 'quantity'}`}</div>
                </div>
            </div>
        </div>
    )
}