import { useProductStore } from "../stores/productStore"
import "../styles/AdminDashboard.css"
import AddProductForm from "./AddProductForm";
import CustomProductEntry from "./CustomProductEntry";
import { useEffect } from "react";
import Loading from "./Loading";

function AdminDashboard() {
    const products = useProductStore((state) => state.products);
    const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

    useEffect(() => {
        fetchAllProducts()
    }, []);

    return (
        <div className="admin-dashboard">
            <Loading/>
            <div className="admin-table-section">
                <div className="admin-table-header">
                    <h1>Administracion de productos</h1>
                    <h2>En esta seccion puedes gestionar el catalogo de productos de PawStore.</h2>       
                </div>
                    <h1>Listado de Productos</h1>
                <div className="admin-table-container">
                    <div className="admin-table-wrapper">
                        <table className="admin-products-table">
                            <thead>
                                <tr>
                                    <th className="id-header">ID</th>
                                    <th className="name-header">NOMBRE</th>
                                    <th className="price-header">PRECIO</th>
                                    <th className="category-header">CATEGORIA</th>
                                    <th className="stock-header">STOCK</th>
                                    <th className="admin-actions-col">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product)=>(
                                    <CustomProductEntry 
                                    productInfo={product}
                                    key={product.id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="admin-form-section">
                <AddProductForm />
            </div>
        </div>
    )
}

export default AdminDashboard