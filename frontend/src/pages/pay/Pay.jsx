import './pay.css';
import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import {Context} from "../../context/context";
import CheckoutForm from '../checkoutForm/CheckoutForm';

export default function Pay(){
    const navigate = useNavigate();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const {baseUrl, cartItems, tax, shippingFee, user} = useContext(Context);

    useEffect(() => {
        fetch(`${baseUrl}/order/stripe/stripe-config`)
            .then(async (res) => {
                const {publishableKey} = await res.json();
                setStripePromise(loadStripe(publishableKey));
            })
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cartItems, tax, shippingFee, customer: user.name, address: user.address})
        }

        fetch(`${baseUrl}/order/`, requestOptions)
            .then(async (res) => {
                const {order} = await res.json();
                setClientSecret(order.clientSecret);
            })
    }, [])

    if(!user || user.role !== 'user'){
        navigate('/login');
    }

    return (
        <div className='pay'>
            <div className='paymentItems'>
                <div className='payHeader'>{`Hello ${user.name}. Kindly enter your payment details`}</div>
                {
                    stripePromise &&
                    clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret}} className="stripeElement">
                            <CheckoutForm />
                        </Elements>
                    )
                }
            </div>
            
        </div>
    )
}