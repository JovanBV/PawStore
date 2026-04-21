import { NavLink } from "react-router-dom";


export default function UserDisplay({ userName }) {
  return (
    <NavLink className="nav-inactive" onClick={(e) => e.preventDefault()}>
      Usuario: {userName}
    </NavLink>
  );
}