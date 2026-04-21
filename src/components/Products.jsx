import Product from "./Product"
import "../styles/Products.css"

function Products ({data}){
    return(
        <div className="products-container">
            {data.map(product => ( 
                <Product key={product.id} data={product}/>
            ))}
        </div>
)}

export default Products;