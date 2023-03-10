import "./carts.css"
import {useContext} from "react";
import {Context} from "../../context/context";
import CartItem from "../../components/cartItem/CartItem";
import {useNavigate} from "react-router-dom";

export default function Carts(){
    const {cartItems} = useContext(Context);
    const navigate = useNavigate();

    const cartElements = cartItems.map(prod => {
        return <CartItem key={prod.item.id} item={prod}/>
    })

    const getSubtotal = () => {
        const subtotals = cartItems.map(item => item.item.price * item.quantity);
        return subtotals.reduce((accumulator, subtotal) => accumulator + subtotal, 0)
    }

    return (
        <div className="carts">
            <div className="cartsContainer">
                <div className="cartsLeft">
                    {cartElements}
                </div>
                <div className="cartsRight">
                    <div className="cartSummary">
                        <div className="summaryTitle">Cart Summary</div>
                        {cartItems.length > 0 && <div className="summaryCount">{cartItems.length} {cartItems.length === 1 ? "Item" : "items"}</div>}
                    </div>
                    <div className="orderSubtotal">
                        <div className="subtotalTitle">Subtotal: </div>
                        <div className="subtotalValue">{`$${getSubtotal()/100}`}</div>
                    </div>
                    <div className="deliveryChargesInfo">
                        Subtotal does not include taxes and shipping charges.
                        <br />
                        Shipping charges may apply based on preferred delivery option.
                        <br />
                        Add your address at checkout to see delivery charges.
                    </div>
                    <button className="checkoutBtn" onClick={() => navigate('/order')}>Confirm your Order</button>
                    <button className="shoppingBtn" onClick={() => navigate('/')}>Back to Shopping</button>
                </div>
            </div> 
        </div>
    )
}