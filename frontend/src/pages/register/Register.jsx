import "./register.css";
import {useState, useContext} from "react";
import {Link} from 'react-router-dom';
import {Context} from "../../context/context";
import useLocalState from '../../utils/localState'

export default function Register(){
    const {baseUrl} = useContext(Context);
    const {alert, showAlert, hideAlert, loading, setLoading, success, setSuccess} = useLocalState();

    const [regDetails, setRegDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        password1: "",
        password2: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRegDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        hideAlert();
        setLoading(true);
        const {firstname, lastname, phone, email, address, password1, password2} = regDetails;
        const userDetails = {firstname, lastname, phone, email, address, password1, password2};

        if(password1 !== password2){
            showAlert("Passwords do not match");
        }

        try {
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userDetails)
            }

            const res = await fetch(`${baseUrl}/auth/register`, requestOptions)
            const {user, msg} = await res.json();

            setSuccess(true);
            setRegDetails({
                firstname: "",
                lastname: "",
                email: "",
                address: "",
                phone: "",
                password1: "",
                password2: ""
            })

            showAlert(msg, 'success');

        } catch (error) {
            const {msg} = error.response.data;
            showAlert(msg || 'An error occurred');
        }
    }

    return (
        <div className="register">
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.text}
                </div>
            )}
            {!success && (
                <>
                    <h1 className="registerTitle">Please enter your details</h1>
                    <form  onSubmit={handleSubmit} className="regForm">
                        <div className="formInputs">
                            <div className="newUserItem">
                                <label>First Name: </label>
                                <input type="text" placeholder="John" name="firstname" value={regDetails.firstname} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Last Name: </label>
                                <input type="text" placeholder="Doe" name="lastname" value={regDetails.lastname} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Phone: </label>
                                <input type="phone" placeholder="+2348012345678" name="phone" value={regDetails.phone} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Email: </label>
                                <input type="email" placeholder="john.doe@domain.com" name="email" value={regDetails.email} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Address: </label>
                                <input type="text" placeholder="City || Country" name="address" value={regDetails.address} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Password: </label>
                                <input type="password" placeholder="####" name="password1" value={regDetails.password1} onChange={handleChange}/>
                            </div>
                            <div className="newUserItem">
                                <label>Confirm Password: </label>
                                <input type="password" placeholder="####" name="password2" value={regDetails.password2} onChange={handleChange}/>
                            </div>
                        </div>
                        <button className="regBtn">{loading ? 'Loading...' : 'Register'}</button>
                    </form>
                    <div className="loginRoute">
                        Already have an account?  
                        <Link to="/login" className="login-link">  Login here</Link>
                    </div>
                </>
            )}
            
        </div>
    )
}