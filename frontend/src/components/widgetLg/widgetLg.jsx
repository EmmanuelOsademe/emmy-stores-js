import "./widgetLg.css";
import {Context} from "../../context/context";
import {useEffect, useContext, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";

export default function WidgetLg(){
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

    return (
        <div className="widgetLg">
            <DataGrid rows={allOrders} getRowId={(row) => row._id} columns={columns} disableSelectionOnClick pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>
        </div>
    )
}