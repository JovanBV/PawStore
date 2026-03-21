import "../styles/Product.css"
import { Link } from "react-router-dom"

function Product({ data }) {
    return (
        <Link to={`/products/${data.id}`} className="product-link">
            <div className="product-card">
                <div className="product-poster">
                    <img src={data.imagen} alt={data.nombre} />
                </div>
                <div className="product-info">
                    <h3 className="name">{data.nombre}</h3>
                    <p className="price">{data.precio}</p>
                    <p className="category">{data.categoria}</p>
                </div>
                <button className="btn">
                    Ver detalles
                </button>
            </div>
        </Link>

    )
}

export default Product