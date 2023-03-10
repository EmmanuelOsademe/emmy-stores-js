import "./createProduct.css";
import {useState, useEffect, useContext} from "react";
import {Context} from "../../context/context";
import Sidebar from "../../components/sidebar/Sidebar";
import useLocalState from '../../utils/localState';
import { useNavigate } from "react-router-dom";


export default function CreateProduct(){
    const {baseUrl} = useContext(Context);
    const navigate = useNavigate();
    const {alert, showAlert, hideAlert, loading, setLoading, success, setSuccess} = useLocalState();
    const [newProdData, setNewProdData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        colors: [],
        company: []
    });

    console.log(newProdData);

    const handleChange = event => {
        const {name, value} = event.target;
        setNewProdData(prevData => ({
            ...prevData,
            [name]: value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        hideAlert();
        setLoading(true);
        const productData = {...newProdData};

        try {
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productData)
            }

            const res = await fetch(`${baseUrl}/product`, requestOptions);
            const {product} = await res.json();
            setSuccess(true);
            setNewProdData({
                name: '',
                description: '',
                price: null,
                stock: null,
                category: '',
                colors: [],
                company: []
            });
            console.log(product);

            navigate('/admin-products-list');

        } catch (error) {
            const {msg} = error.response.data;
            showAlert(msg || 'An error occurred');
        }
    }

    return (
        <div className="container">
            <div className="sidebarContainer"><Sidebar/></div>
            <div className="mainPage">
                <form className="formContainer" onSubmit={handleSubmit}>
                    <div className="formInputContainer">
                        <div className="productInfoItem">
                            <input type="text" name="name" onChange={handleChange} value={newProdData.name} />
                            <label>Name</label>
                        </div>
                        <div className="productInfoItem">
                            <input type="text" name="price" onChange={handleChange} value={newProdData.price} />
                            <label>Price($)</label>
                        </div>
                        <div className="productInfoItem">
                            <input type="text" name="stock" onChange={handleChange} value={newProdData.stock} />
                            <label>Stock</label>
                        </div>
                        <div className="productInfoItem">
                            <input type="text" name="category" onChange={handleChange} value={newProdData.category} />
                            <label>Category</label>
                        </div>
                        <div className="productInfoItem">
                            <input type="text" name="colors" onChange={handleChange} value={newProdData.colors} />
                            <label>Colors</label>
                        </div>
                        <div className="productInfoItem">
                            <input type="text" name="company" onChange={handleChange} value={newProdData.company} />
                            <label>Company </label>
                        </div>
                    </div>
                    <div className="descContainer">
                            <input className="descInput" type="text" name="description" onChange={handleChange} value={newProdData.description} />
                            <label className="descLabel">Description </label>
                    </div>
                    <button className="createProductBtn">{loading ? 'Loading...' : 'Create Product'}</button>
                </form>
            </div>
        </div>
    )
    
}