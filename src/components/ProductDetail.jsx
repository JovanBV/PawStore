import {useParams, Link} from "react-router-dom"
import productsData from "../data/products.json"
import "../styles/ProductDetail.css"


function ProductDetail(){

    const {productId} = useParams()
    const thisProduct = productsData.find(prod => prod.id === parseInt(productId))
    
    return (
        <div className="product-container">
            <div className="detail-image-container">
                <img className= "detail-img" src={thisProduct.imagen}/>
            </div>
            <div className="info-container">
                <h1>{thisProduct.nombre}</h1>
                <p>Price: ${thisProduct.precio}</p>
                <p>{thisProduct.descripcion}</p>
                <Link to="/products"className="detail-btn">Volver al catálogo</Link>
            </div>
        </div>
    )
}

export default ProductDetail