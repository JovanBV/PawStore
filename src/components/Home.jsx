import "../styles/Home.css"
import { Link } from "react-router-dom"

function Home(){
    return (
        <div className="home-page">
            <h1>Bienvenido a PawStore</h1>
            <p>Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.</p>
            <p>Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.</p>
            <Link className="home-link" to="/products">Ver productos</Link>
            <p>Esta es la página principal de la aplicación. Más adelante aquí se podrán mostrar productos destacados.</p>
        </div>
    )
}

export default Home