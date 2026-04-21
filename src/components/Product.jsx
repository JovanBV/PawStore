import "../styles/Product.css"
import { Link } from "react-router-dom"

function Product({ data }) {
    if (!data || !data.id) {
        return null;
    }
    return (
        <Link to={`/products/${data.id}`} className="product-link">
            <div className="product-card">
                <div className="product-poster">
                    <img src={data.image_url} alt={data.name} />
                </div>
                <div className="product-info">
                    <h3 className="name">{data.name}</h3>
                    <p className="price">{data.price}</p>
                    <p className="category">{data.category}</p>
                </div>
                <button className="btn">
                    Ver detalles
                </button>
            </div>
        </Link>

    )
}

export default Product