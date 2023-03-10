import "./sidebar.css";
import {LineStyle, TrendingUp, TrendingDown,
        PermIdentity, Person, ShoppingBag,
        Email, Feedback, Sms, Report, Analytics, Inventory}
from "@mui/icons-material";
import {Link} from "react-router-dom";

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListContainer">
                            <Link to="/admin-homepage" className="link sidebarListContainer">
                                <li className="sidebarListItem active">
                                    <LineStyle  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Home</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/sales" className="link">
                                <li className="sidebarListItem">
                                    <TrendingUp  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Sales</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/expenses" className="link">
                                <li className="sidebarListItem">
                                    <TrendingDown  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Expenses</div>
                                </li>
                            </Link>
                        </div>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListContainer">
                            <Link to="/admin-products-list" className="link">
                                <li className="sidebarListItem">
                                    <ShoppingBag  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Products</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/manage-users" className="link">
                                <li className="sidebarListItem">
                                    <Person  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Customers</div>
                                </li>
                            </Link>
                        </div>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListContainer">
                            <Link to="/mails" className="link">
                                <li className="sidebarListItem">
                                    <Email  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Emails</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/messages" className="link">
                                <li className="sidebarListItem">
                                    <Sms  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Messages</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/feedbacks" className="link">
                                <li className="sidebarListItem">
                                    <Feedback  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Feedbacks</div>
                                </li>
                            </Link>
                        </div>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListContainer">
                            <Link to="/manage-staff" className="link">
                                <li className="sidebarListItem">
                                    <PermIdentity  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Manage</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/staff-analytics" className="link">
                                <li className="sidebarListItem">
                                    <Analytics  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Analytics</div>
                                </li>
                            </Link>
                        </div>
                        <div className="sidebarListContainer">
                            <Link to="/staff-reports" className="link">
                                <li className="sidebarListItem">
                                    <Report  className="sidebarIcon"/>
                                    <div className="sidebarIconName">Reports</div>
                                </li>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}