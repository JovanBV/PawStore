import "../styles/Home.css"
import NavButton from "../components/NavButton"
import PopularProduct from "./PopularProduct";
import { useProductStore } from "../stores/productStore";
import { useEffect } from "react";

function Home(){
    const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
    const products = useProductStore((state) => state.products)

    useEffect(() => {
        fetchAllProducts()
    }, []);

    return (
        <div className="home-page">
            <div className="welcome-card">
                <h1>Bienvenido a PawStore</h1>
                <p>Tu destino online para encontrar los mejores productos para tus queridas mascotas: desde alimentos y juguetes hasta accesorios y salud.</p>
                <NavButton linkTo="/products" text="Ver productos" isButton={true}/>
            </div>
            <h2>Productos Destacados</h2>
            <div className="recommended-products-card">
                {products.slice(0, 6).map((data) => (
                    <PopularProduct key={data.key} data={data}/>
                ))}
            </div>
        </div>
    )
}

export default Home