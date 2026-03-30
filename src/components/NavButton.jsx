import { NavLink } from "react-router-dom";
import "../styles/Navbutton.css"

function NavButton({ text, linkTo, isButton = false }) {
  return (
    <NavLink to={linkTo} className={( navigate ) => isButton ? "is-button" : (navigate.isActive ? "nav-active" : "nav-inactive")}>
      {text}
    </NavLink>
  )
}
export default NavButton