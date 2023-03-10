import "./app.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TopBar from "./components/topBar/TopBar";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/product/SingleProduct";
import Carts from "./pages/carts/Carts";
import Order from "./pages/order/Order";
import Pay from "./pages/pay/Pay";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PaymentCompletion from "./pages/paymentCompletion/PaymentCompletion";
import AdminHomepage from "./pages/adminHomepage/AdminHomepage";
import AdminProductsList from "./pages/adminProductsList/AdminProductsList";
import AdminProduct from "./pages/adminProduct/AdminProduct";
import CreateProduct from "./pages/createProduct/CreateProduct";

export default function App(){
    return (
        <main className="container">
            <Router>
                <div className="subContainer">
                    <TopBar />
                    <Routes>
                        <Route path="/" exact element={<Products />}/>
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/:productId" exact element={<SingleProduct />} />
                        <Route path="/carts" exact element={<Carts />} />
                        <Route path="/order" exact element={<Order />} />
                        <Route path="/pay" exact element={<Pay />} />
                        <Route path="/payment-completion" exact element={<PaymentCompletion />} />
                        <Route path="/admin-homepage" exact element={<AdminHomepage />} />
                        <Route path="/admin-products-list" exact element={<AdminProductsList />} />
                        <Route path="/admin-product/:productId" exact element={<AdminProduct />} />
                        <Route path="/create-product" exact element={<CreateProduct />} />
                    </Routes>
                </div>
                
            </Router>
        </main>
    )
}