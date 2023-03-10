import "./checkoutForm.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import {Context} from "../../context/context";

export default function CheckoutForm() {
    const {emptyCart} = useContext(Context)
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`
            },
            redirect: "if_required"
        })

        if(error){
            setMessage(error.message);
        }else if(paymentIntent && paymentIntent.status === "succeeded"){
            setMessage(`Payment status: ${paymentIntent.status}!`);
            emptyCart()
            navigate('/payment-completion');
        }else{
            setMessage('Unexpected state');
        }

        setIsProcessing(false);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="checkoutForm">
            <PaymentElement />
            <button disabled={isProcessing} id="submit" className="payBtn">
                <span id="button-text">
                    {isProcessing ? "Processing..." : "Pay now"}
                </span>
            </button>
        </form>
    )
}