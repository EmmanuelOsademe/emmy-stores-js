import "./adminHomepage.css";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { salesData } from "../../dummyData";
import {useState, useEffect, useContext} from "react";
import {Context} from "../../context/context";
import {DataGrid} from "@mui/x-data-grid";

export default function AdminHomepage() {

    const [allOrders, setAllOrders] = useState([]);
    const {baseUrl} = useContext(Context);


    useEffect(() => {
        fetch(`${baseUrl}/order`)
            .then(async (res) => {
                const data = await res.json();
                console.log(data.orders);
                setAllOrders(data.orders)
            })
    }, [])


    const columns = [
        {field: '_id', headerName: 'ID', width: 100},
        {field: 'customer', headerName: 'Customer', width: 200},
        {field: 'address', headerName: 'Location', width: 150},
        {field: 'createdAt', headerName: 'Date', width: 200},
        {field: 'total', headerName: 'Amount ($)', width: 150},
        {field: 'status', headerName: 'Status', width: 150, renderCell: (params) => {
            return (
                <button className={`widgetLgBtn ${params.row.status}`}>{params.row.status}</button>
            )
        }}
    ]

    return(
        <div className="container">
            <div className="sidebarContainer"><Sidebar /></div>
            <div className="mainPage">
                <FeaturedInfo />
                <Chart data={salesData} title="Sales Analytics" grid={true} dataKey="Sales"/>
                <div className="salesListTitle">Recent sales</div>
                <div className="salesContainer">
                    <div style={{ flexGrow: 1, height: "inherit", padding: "0px 20px 0px 20px"}}>
                        <DataGrid rows={allOrders} getRowId={(row) => row._id} columns={columns} disableSelectionOnClick pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>
                    </div>   
                </div>
            </div>
        </div>
    )
}