import lock from "../assets/lock.svg"
import "../styles/Restricted.css"
import NavButton from "./NavButton"

function Restricted() {
    return(
        <div className="restricted-container">
            <div className="restricted-card">
                <img className="lock" src={lock} alt="lock"/>
                <h1>Debes iniciar sesión para continuar</h1>
                <h2>Protege tus compras y gestiona tu perfil con facilidad.</h2>
                <NavButton isButton={true} text="Ir a iniciar sesión" linkTo="/login"/>
            </div>
        </div>
    )
}

export default Restricted