import "../styles/Footer.css"
import instagram from "../assets/instagram.png"
import facebook from "../assets/facebook.png"
import whatsapp from "../assets/whatsapp.png"

function Footer() {
    return(
        <div className="footer">
            <div className="footer-subunit">
                <p className="footer-license">© PawStore 2025 — Todos los derechos reservados.</p>
            </div>
            <div className="footer-subunit">
                <div className="footer-logos-box">
                    <img className="footer-logo" src={whatsapp}/>
                    <img className="footer-logo" src={facebook}/>
                    <img className="footer-logo" src={instagram}/>
                </div>
            </div>
        </div>
    )
}

export default Footer