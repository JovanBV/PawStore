import "../styles/Products.css"
import Product from "./Product"
import { useProductStore } from "../stores/productStore"

function Catalog(){
    const products = useProductStore(state => state.products);

    const productsList = products.map(product => (
        <Product key={product.id} data={product} />
    ))
    return(
        productsList.length >= 1 ? (
            <div className="products-page">
                <h1>Catálogo de productos</h1>
                <div className="products-container">
                    {productsList}
                </div>
            </div>
        ) : (
            <div className="products-not-found">
                <h1>No hay productos disponibles por el momento.</h1>
                <p>Try by changing filters or search.</p>
            </div>
        )
    )
}

export default Catalog