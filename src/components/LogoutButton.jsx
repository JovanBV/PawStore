import "../styles/LogoutButton.css"

export default function LogoutButton({ onClick }) {
  return (
    <button onClick={onClick} className="logout-button">
      Cerrar sesión
    </button>
  );
}
