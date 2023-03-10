import "./login.css";
import {useState, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Context} from "../../context/context";
import useLocalState from '../../utils/localState'

export default function Login(){
    const navigate = useNavigate();
    const {baseUrl, user, saveUser, cartItems} = useContext(Context);
    const {alert, showAlert, hideAlert, loading, setLoading, success, setSuccess} = useLocalState();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        hideAlert();
        setLoading(true)
        const {email, password} = loginDetails;
        const loginInfo = {email, password};

        try {
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginInfo)
            }

            const response = await fetch(`${baseUrl}/auth/login`, requestOptions);
            const {user: loggedInUser, authToken} = await response.json();

            if(!response.ok){
                showAlert("An erro occurred. Try again!");
                setLoading(false);
                navigate("/login");
                hideAlert()
            }

            setLoginDetails({email: '', password: ''});
            setLoading(false);
            saveUser(loggedInUser);
            setLoading(false);

            if(loggedInUser.role === "user" && cartItems.length > 0){
                showAlert(`Welcome, ${loggedInUser.name}. Redirecting to Payment`, 'success');
            }

            if(loggedInUser.role === "admin"){
                navigate('/admin-homepage')
            }else if(loggedInUser.role === "user" && cartItems.length > 0){
                navigate('/order');
            }else{
                navigate("/");
            }
            
        } catch (error) {
            console.log(error);
            showAlert(error);
            setLoading(false);
            navigate('/login');
        }
    }

    return (
        <div className="login">
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.text}
                </div>
            )}
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="loginInputs">
                    <div className="loginItem">
                        <label>Email: </label>
                        <input type="email" placeholder="john.doe@domain.com" name="email" value={loginDetails.email} onChange={handleChange}/>
                    </div>
                    <div className="loginItem">
                        <label>Password: </label>
                        <input type="password" placeholder="####" name="password" value={loginDetails.password} onChange={handleChange}/>
                    </div>
                </div>
                <button className="loginBtn">{loading ? 'Loading...' : 'Login'}</button>
                <div className="regRoute">
                    Do not have an account?  
                    <Link to="/register" className="reg-link">  Register here</Link>
                </div>
            </form>
            
        </div>
    )
}