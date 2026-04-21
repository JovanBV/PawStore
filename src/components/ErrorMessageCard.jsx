import "../styles/ErrorMessageCard.css"

export default function ErrorMessageCard( {error, tittle, onAccept} ){
    const handleAccept = () => {
        if(onAccept) onAccept();
    };

    return(
        <div className="error-overlay">
            <div className="error-message-card">
                <div className="error-message-header">
                    <h2>{tittle}</h2>
                </div>
                <div className="error-message-body">
                    <p>{error}</p>
                </div>
                <div className="error-message-footer">
                    <button className="accept-button" onClick={handleAccept}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}