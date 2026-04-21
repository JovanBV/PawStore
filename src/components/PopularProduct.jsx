import "../styles/PopularProduct.css"
import { Link } from "react-router-dom"

function PopularProduct({ data }) {
    if (!data || !data.id) {
        return null;
    }
    return (
        <Link to={`/products/${data.id}`} className="popular-product-link">
            <article className="popular-product-card">
                <div className="popular-product-image-container">
                    <img src={data.image_url} alt={data.name}className="popular-product-image"/>
                </div>
                <div className="popular-product-content">
                    <h3 className="popular-product-title">{data.name}</h3>
                    <p className="popular-product-price">${data.price}</p>
                </div>
                <button className="popular-product-button">
                    Ver detalles
                </button>
            </article>
        </Link>
    );
};

export default PopularProduct;