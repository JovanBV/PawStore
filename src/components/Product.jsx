import "../styles/Product.css"
import { Link } from "react-router-dom"
import AddToCartButton from "./AddToCartButton";

function Product({ data }) {
    if (!data || !data.id) {
        return null;
    }
    return (
        <div className="product-link">
            <div className="product-card">
                <div className="product-poster">
                    <Link to={`/products/${data.id}`}>
                        <img src={data.image_url} alt={data.name} />
                    </Link>
                </div>
                <div className="product-info">
                    <Link to={`/products/${data.id}`} className="product-name">
                        <h3 >{data.name}</h3>
                    </Link>
                    <p className="product-price">${data.price}</p>
                    <p className="product-category">{data.category}</p>
                </div>
                <div className="product-card-btn">
                    <AddToCartButton data={data}/>
                </div>
            </div>
        </div>
    );
};

export default Product