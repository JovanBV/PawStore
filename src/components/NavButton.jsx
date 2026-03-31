import { NavLink } from "react-router-dom";
import "../styles/Navbutton.css"

function NavButton({ text, linkTo, isButton = false }) {
  return (
    <NavLink to={linkTo} className={( {isActive} ) => (isButton ? "is-button" : (isActive ? "nav-active" : "nav-inactive"))}>
      {text}
    </NavLink>
  )
}
export default NavButton