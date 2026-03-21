import { Link } from "react-router-dom"
import { useProductStore } from "../stores/productStore"


function CustomProductEntry ({productInfo}){
    const deleteProduct = useProductStore((state) => state.deleteProduct)
    return(
    <tr>
        <td>{productInfo.id}</td>
        <td>{productInfo.nombre}</td>
        <td>${productInfo.precio}</td>
        <td><button className="category">{productInfo.categoria}</button></td>
        <td >{productInfo.stock}</td>
        <td className="btns">
            <Link className="entry-button" to={`/edit/${productInfo.id}`}>Edit</Link>
            <button className="entry-button" onClick={() => deleteProduct(productInfo.id)}>Delete</button>
        </td>
    </tr>
    )
}
export default CustomProductEntry