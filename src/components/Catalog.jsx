import "../styles/Catalog.css"
import { useProductStore } from "../stores/productStore"
import { useEffect } from "react";
import Products from "./Products";

function Catalog(){
    const products = useProductStore((state) => state.products);
    const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

    useEffect(() => {
        fetchAllProducts()
    }, []);

    return(
        products.length >= 1 ? (
            <div className="products-return">
                <h1>Catálogo de productos</h1>
                <div className="products-card">
                    <Products data={products}/>
                </div>
            </div>
        ) : (
            <div className="products-not-found">
                <h1>No hay productos disponibles por el momento.</h1>
                <p>Intente filtrar.</p>
            </div>
        )
    )
}

export default Catalog