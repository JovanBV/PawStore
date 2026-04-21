import "../styles/LoadingSpinner.css"
import loadingSpinner from "../assets/loading_spinner.svg"
import { useLoadingStore } from "../stores/LoadingStore";

function Loading() {
  const loading = useLoadingStore((state) => state.loading);
  if (!loading) return null;
  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <img src={loadingSpinner} className="loader"/>
        <p>Procesando...</p>
      </div>
    </div>
  );
}

export default Loading;