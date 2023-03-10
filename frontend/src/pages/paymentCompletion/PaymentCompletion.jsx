import "./paymentCompletion.css";
import {Link} from "react-router-dom";
import {Context} from "../../context/context";
import {useContext} from "react";

export default function PaymentCompletion(){
    const {user} = useContext(Context);

    return(
        <div className="paymentCompletion">
            <div>
                Payment successful. Thank you {user.name} for your patronage.
            </div>
            <Link to="/">
                <button className="homepageIcon">Back to shopping</button>
            </Link>
        </div>
    )
}