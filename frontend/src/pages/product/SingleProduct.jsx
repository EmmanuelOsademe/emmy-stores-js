import "./singleProduct.css";
import {Context} from "../../context/context";
import {useContext, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function Product(){
    const {addToCart, products, count, incrementCount, decrementCount} = useContext(Context);
    const {productId} = useParams();
    const navigate = useNavigate();

    const currentProduct = products.find(item => String(item.id) === productId);

    return (
        <div className="singleProduct">
            <div className="singleProductContainer">
                <div className="singleProductLeft">
                    <img className="singleProductImg" src={currentProduct.image} alt={currentProduct.name} />
                </div>
                <div className="singleProductRight">
                    <div className="singleProductName">{currentProduct.name}</div>
                    <div className="singleProductBrand">Brand: {currentProduct.company}</div>
                    <div>
                        <span className="singleProductRating">{currentProduct.rating}</span>
                        <span className="singleProductReviewsCount">{currentProduct.reviewCount}</span>
                    </div>
                    <hr />
                    <div className="singleProductPrice">Price: ${currentProduct.price/100}</div>
                    <hr />
                    <div className="singleProductBtns">
                        <div className="singleProductQuantity">Quantity: </div>
                        <button className="decrementBtn" onClick={() => decrementCount(currentProduct)}>-</button>
                        <button className="quantityBtn">{count}</button>
                        <button className="incrementBtn" onClick={() => incrementCount(currentProduct)}>+</button>
                    </div>
                    <button className="addToCartBtn" onClick={() => addToCart({item: currentProduct, quantity: count})}>Add to Cart</button>
                    <div className="otherBtnsContainer">
                        <button className="backToCartBtn" onClick={() => navigate("/")}>Back to Shopping</button>
                        <button className="proceedToCheckoutBtn" onClick={() => navigate("/carts")}>View Cart Summary</button>
                    </div>
                    <hr />
                    <div className="singleProductDescTitle">Product Details</div>
                    <div className="singleProductDesc">{currentProduct.description}</div>
                </div>
            </div>
        </div>
    )
    
}