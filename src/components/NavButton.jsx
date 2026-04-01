import { NavLink } from "react-router-dom";
import "../styles/Navbutton.css"

function NavButton({ onClick, text, linkTo, isButton = false }) {
  return (
    <NavLink onClick={onClick} to={linkTo} className={( {isActive} ) => (isButton ? "is-button" : (isActive ? "nav-active" : "nav-inactive"))}>
      {text}
    </NavLink>
  )
}
export default NavButton