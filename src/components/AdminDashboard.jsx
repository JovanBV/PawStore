import { useProductStore } from "../stores/productStore"
import "../styles/AdminDashboard.css"
import AddProductForm from "./AddProduct";
import CustomProductEntry from "./CustomProductEntry";

function AdminDashboard() {
    const products = useProductStore((state) => state.products);
    return (
        <div className="admin-dashboard">
            <div className="dashboard-card-one">
                <div className="tittle-card">
                    <h1>Administracion de productos</h1>
                    <h2>En esta seccion puedes gestionar el catalogo de productos de PawStore.</h2>       
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr className="headers">
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>PRECIO</th>
                                <th>CATEGORIA</th>
                                <th>STOCK</th>
                                <th className="actions">ACCIONES</th>
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
            <div className="dashboard-card-two">
                <AddProductForm className="add-product-form"/>
            </div>
        </div>
    )
}

export default AdminDashboard