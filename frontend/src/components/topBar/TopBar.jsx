import "./topBar.css";
import {PermIdentity, ShoppingCartOutlined, HelpOutline, Search} from '@mui/icons-material';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Context} from '../../context/context';

export default function TopBar(){
    const {cartItems} = useContext(Context);

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to="/" className="link">
                        <span className="logo">EmmyStores</span>
                    </Link>
                </div>
                <form className="topMiddleForm">
                        <input className="topInputBox" type="text" placeholder="Search by Name, Category, Manufacturer, etc"/>
                        <button className="topFormBtn">
                            <Search className="topbarIcon"/>
                        </button>
                </form>
                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <Link to="/register" className="link">
                            <PermIdentity className="topbarIcon"/>
                        </Link>
                        <span className="topbarIconTitle">Account</span>
                    </div>
                    <div className="topbarIconsContainer">
                        <Link to="/carts" className="link">
                            <ShoppingCartOutlined className="topbarIcon"/>
                        </Link>
                        {cartItems.length > 0 && <span className="itemsCount">{cartItems.length}</span>}
                        <span className="topbarIconTitle">Cart</span>
                    </div>
                    <div className="topbarIconsContainer">
                        <HelpOutline className="topbarIcon"/>
                        <span className="topbarIconTitle">Help</span>
                    </div>
                </div>
            </div>
        </div>
    )
}