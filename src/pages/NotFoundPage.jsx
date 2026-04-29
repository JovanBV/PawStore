import NavButton from "../components/NavButton";
import "../styles/NotFound.css"
import NotFoundIcon from "../assets/not_found_icon.svg"

function NotFoundPage(){
    return(
        <div className="not-found-page-container">
            <img src={NotFoundIcon} alt="Página no encontrada"/>
            <p className="not-found-tittle">Página no encontrada</p>
            <p className="not-found-subtittle">La ruta solicitada no existe o ha sido movida</p>
            <NavButton isButton={true} text="Volver al inicio" linkTo="/"/>
        </div>
    )
}

export default NotFoundPage;