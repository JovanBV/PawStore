import { useProductStore } from "../stores/productStore"
import "../styles/AdminDashboard.css"

function AdminDashboard() {
    const products = useProductStore((state) => state.products);

    return (
        <div className="admin-dashboard">

            <div className="dashboard-card">
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
                            {products.map((products)=>(
                                <tr key={products.id}>
                                    <td>{products.id}</td>
                                    <td>{products.nombre}</td>
                                    <td>${products.precio.toFixed(2)}</td>
                                    <td><button className="category">{products.categoria}</button></td>
                                    <td >{products.stock}</td>
                                    <td className="btns">
                                        <button>Edit</button>
                                        <button onClick={products.delete}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="dashboard-card">
                <form className="add-product-form">
                    <h2>Agregar Nuevo Producto</h2>
                    <input type="text" placeholder="Nombre" />
                    <input type="number" placeholder="Precio" />
                    <input type="text" placeholder="Categoría" />
                    <input type="number" placeholder="Stock" />
                    <button type="submit">Agregar Producto</button>
                </form>
            </div>
        </div>
    )
}

export default AdminDashboard