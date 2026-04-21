import { Link } from "react-router-dom"
import { useProductStore } from "../stores/productStore"
import "../styles/CustomProductEntry.css"

function CustomProductEntry ({productInfo}){
    const deleteProduct = useProductStore((state) => state.deleteProduct)
    return(
        <tr>
            <td className="product-id">{productInfo.id}</td>
            <td className="product-name">{productInfo.name}</td>
            <td className="product-price">${productInfo.price}</td>
            <td className="product-categori">{productInfo.category}</td>
            <td className="product-stock">{productInfo.stock}</td>
            <td className="product-actions">
                <Link className="edit-action-button" to={`/edit/${productInfo.id}`}>Editar</Link>
                <button className="delete-action-button" onClick={() => deleteProduct(productInfo.id)}>Eliminar</button>
            </td>
        </tr>
    )
}
export default CustomProductEntry