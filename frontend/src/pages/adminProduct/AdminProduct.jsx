import "./adminProduct.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import { salesData } from "../../dummyData";
import { Context } from "../../context/context";
import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {Publish} from "@mui/icons-material";
import useLocalState from '../../utils/localState';

export default function AdminProduct(){
    const {baseUrl} = useContext(Context);
    const productId = useParams();
    const {alert, showAlert, hideAlert, loading, setLoading, success, setSuccess} = useLocalState();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [updateData, setUpdateData] = useState({
        name: '',
        price: '',
        stock: '',
        colors: '',
        category: '',
        company: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/product/${productId.productId}`)
            .then(res => res.json())
            .then(data => setCurrentProduct(data.product))
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleImage = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        hideAlert();
        setLoading(true);
        const {name, price, category, company, stock, colors} = updateData;
        const productDetails = {
            name: name || currentProduct.name,
            price: price || currentProduct.price,
            category: category || currentProduct.category,
            company: company || currentProduct.company, 
            stock: stock || currentProduct.stock, 
            colors: colors || currentProduct.colors
        };

        try {
            const requestOptions = {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productDetails)
            }

            const res = await fetch(`${baseUrl}/product/${productId.productId}`, requestOptions)
            const {product} = await res.json();
            setSuccess(true);
            setUpdateData({
                name: '',
                price: '',
                stock: '',
                colors: [],
                category: '',
                company: ''
            });
            setCurrentProduct(product)
            
        } catch (error) {
            const {msg} = error.response.data;
            showAlert(msg || 'An error occurred');
        }
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        if(!file)return;

        const formData = new FormData();
        formData.append('product-image', file);

        try {
            const requestOptions = {
                method: "POST",
                body: formData
            }

            const res = await fetch(`${baseUrl}/product/uploadProductImage/${productId.productId}`, requestOptions);
            const {product} = await res.json();
            setCurrentProduct(product);
            
        } catch (error) {
            const {msg} = error.response.data;
            showAlert(msg || 'An error occured');
        }
    }

    if(currentProduct){
        return (
            <div className="container">
                <div className="sidebarContainer"><Sidebar /></div>
                <div className="mainPage">
                    <Chart data={salesData} title={`${currentProduct.name.toUpperCase()} Sales Analytics`} grid={true} dataKey="Sales" />
                    <div className="productInfo">
                        <div className="productTitle">{`${currentProduct.name.toUpperCase()} General Information`}</div>
                        <div className="productInfoContainer">
                            <form className="productInfoContainerUpper">
                                <div className="productInfoItem">
                                    <label className="labelTitle">ID: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct._id} name="productId" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Name: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.name.toUpperCase()} name="productName" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Price: </label>
                                    <input className="inputContainer" type="number" placeholder={`$${currentProduct.price/100}`} name="productPrice" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Stock: </label>
                                    <input className="inputContainer" type="number" placeholder={currentProduct.stock || 100} name="productStock" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Category: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.category.toUpperCase()} name="productCategory" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Colors: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.colors} name="productColors" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Company: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.company.toUpperCase()} name="productCompany" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Reviews Count: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.numOfReviews} name="productReviews" disabled/>
                                </div>
                                <div className="productInfoItem">
                                    <label className="labelTitle">Average Rating: </label>
                                    <input className="inputContainer" type="text" placeholder={currentProduct.aveRating || 4.2} name="productRating" disabled/>
                                </div>
                            </form>
                            <div className="productInfoContainerLower">
                                <div className="productInfoContainerLowerLeft">
                                    <label className="productImgTitle">Product Image: </label>
                                    <img src={currentProduct.image} alt={currentProduct.name} className="productImg"/>
                                </div>
                                <div className="productInfoContainerLowerRight">
                                    <label className="productDescTitle">Product Description: </label>
                                    <div className="productDesc">{currentProduct.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productUpdateContainer">
                        <div className="productTitle">{`${currentProduct.name.toUpperCase()} Information Update`}</div>
                        <div className="productUploadContainer">
                            <div className="productInfoContainerLeft">
                                <form className="productUpdateContainerUpper" onSubmit={handleSubmit}>
                                    <div className="formInputContainer">
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Name: </label>
                                            <input className="inputContainer" type="text" placeholder={currentProduct.name.toUpperCase()} name="name" onChange={handleChange} value={updateData.name}/>
                                        </div>
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Price: </label>
                                            <input className="inputContainer" type="text" placeholder={`$${currentProduct.price/100}`} name="price" onChange={handleChange} value={updateData.price}/>
                                        </div>
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Stock: </label>
                                            <input className="inputContainer" type="text" placeholder={currentProduct.stock || 100} name="stock" onChange={handleChange} value={updateData.stock} />
                                        </div>
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Category: </label>
                                            <input className="inputContainer" type="text" placeholder={currentProduct.category.toUpperCase()} name="category" onChange={handleChange} value={updateData.category}/>
                                        </div>
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Colors: </label>
                                            <input className="inputContainer" type="text" placeholder={currentProduct.colors} name="colors" onChange={handleChange} value={updateData.colors}/>
                                        </div>
                                        <div className="productInfoItem">
                                            <label className="labelTitle">Company: </label>
                                            <input className="inputContainer" type="text" placeholder={currentProduct.company.toUpperCase()} name="company" onChange={handleChange} value={updateData.company} />
                                        </div>
                                    </div>
                                    <button className="updateDetailsBtn">Update Details</button>
                                </form>
                            </div>
                            <div className="productInfoContainerRight">
                                <div className="productFormRight">
                                    <div className="productUpload">
                                        <img className="productUploadImg" src={currentProduct.image} alt={currentProduct.name} />
                                        <form className="uploadForm" onSubmit={handleUpload} encType="multipart/form-data">
                                            <label htmlFor="file" style={{cursor: "pointer"}} ><Publish /></label>
                                            <input type="file" id="file" filename='product-image' accept="image/*" onChange={handleImage} style={{display: "none", cursor:"pointer"}}/>
                                            <button className="updateDetailsBtn">Upload Image</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}