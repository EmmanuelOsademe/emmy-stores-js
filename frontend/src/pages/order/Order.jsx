import "./order.css";
import {useContext, useEffect} from "react";
import {Context} from "../../context/context";
import CartItem from "../../components/cartItem/CartItem";
import {useNavigate} from "react-router-dom";

export default function Order() {

    const {cartItems, setShippingFee, user} = useContext(Context);
    const navigate = useNavigate();

    const cartElements = cartItems.map(prod => {
        return <CartItem key={prod.item.id} item={prod}/>
    })

    const getSubtotal = () => {
        const subtotals = cartItems.map(item => item.item.price * item.quantity);
        return subtotals.reduce((accumulator, subtotal) => accumulator + subtotal, 0)
    }

    const shippingCost = Math.floor(Math.random() * 10000);

    const addShippingFee = () => setShippingFee(shippingCost);

    const getTotal = () => {
        return getSubtotal() + shippingCost;
    }

    if(!user || user.role !== 'user'){
        useEffect(() => {
            navigate('/register');
        }, [])
    }else{
        return (
            <div className="order">
                <div className="orderContainer">
                    <div className="leftCont">
                        <div className="orderName">{user.name}</div>
                        <form className="orderOption">
                            <hr />
                            <div className="deliveryOption">
                                <label className="optionTitle">Choose your Delivery Option</label>
                                <div className="pickupOption">
                                    <input type="radio" name="deliveryOption" id="doorDelivery" value="doorDelivery"/>
                                    <label htmlFor="doorDelivery">Door delivery</label>
                                </div>
                                <div className="pickupOption">
                                    <input type="radio" name="deliveryOption" id="pickup" value="pickup"/>
                                    <label htmlFor="pickup">Pickup from our Store</label> 
                                </div>
                            </div>
                            <div className="address">
                                <label>Confirm your delivery address</label>
                                <input type="text" placeholder={user.address} />
                            </div>
                            <hr />
                        </form>
                        <hr />
                        <div className="orderSummary">
                            <div className="summaryTitle">Order Summary</div>
                            <div className="subtotal">Subtotal: {`$${getSubtotal()/100}`}</div>
                            <div className="shippingFee">Shipping Fee: {`$${shippingCost/100}`}</div>
                            <div className="total">Total: {`$${getTotal()/100}`}</div>
                        </div>
                        <button className="paymentBtn" onClick={() => [addShippingFee(), navigate('/pay')]}>Proceed to Payment</button>
                    </div>
                    <div className="rightContainer">
                        <div className="items">
                            {cartElements}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}