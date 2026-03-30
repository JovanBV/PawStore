import {useParams, Link} from "react-router-dom"
import "../styles/ProductDetail.css"
import { useProductStore } from "../stores/productStore"


function ProductDetail(){

    const {productId} = useParams()
    const thisProduct = useProductStore(state => state.products.find(prod => prod.id === parseInt(productId)))
    
    if (!thisProduct){
        return (
            <div className="product-container">
            <p>Producto no encontrado (puede haber sido eliminado).</p>
            <Link to="/products" className="detail-btn">
                Volver al catálogo
            </Link>
            </div>
        )
    }
    return (
        <div className="product-container">
            <div className="detail-image-container">
                <img className= "detail-img" src={thisProduct.image_url}/>
            </div>
            <div className="info-container">
                <h1>{thisProduct.name}</h1>
                <p>Price: ${thisProduct.price}</p>
                <p>{thisProduct.description}</p>
                <Link to="/products"className="detail-btn">Volver al catálogo</Link>
            </div>
        </div>
    )
}

export default ProductDetail