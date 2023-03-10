import "./adminProductsList.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../context/context";

export default function AdminProductsList(){
    const {products} = useContext(Context);
    
    const productsList = products.map(product => {
        return {...product, stock: product.stock || 100}
    });
   
    const handleDelete = (id) => {
        setTempProds(tempProds.filter(item => item._id !== id))
    }

    const columns = [
        {field: '_id', headerName: 'ID', width: 100},
        {field: 'product', headerName: 'Product', width: 250, renderCell: (params) =>{
            return(
                <div className="productListProduct">
                    <img className="productListImg" src={params.row.image} alt={params.row.name} />
                    {params.row.name.toUpperCase()}
                </div>
            )
        }},
        {field: 'price', headerName: 'Price ($)', width: 100, renderCell: (params) => {
            return params.row.price/100;
        }},
        {field: 'category', headerName: 'Category', width: 100, renderCell: (params) => {
            return params.row.category.toUpperCase();
        }},
        {field: 'stock', headerName: 'Stock', width: 150},
        {field: 'colors', headerName: 'Colors', width: 150},
        {field: 'actions', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <>
                    <Link to={`/admin-product/${params.row._id}`}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
                </>
            )
        }}
    ];

    return (
        <div className="container">
            <div className="sidebarContainer"><Sidebar /></div>
            <div className="mainContainer">
                <Link to="/create-product">
                    <button className="addProductBtn">Create New Product</button>
                </Link>
                <div className="productsListContainer">
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid rows={productsList} getRowId={(row) => row.id} columns={columns} disableSelectionOnClick pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
                    </div>
                </div>
            </div>
        </div>
    )
}