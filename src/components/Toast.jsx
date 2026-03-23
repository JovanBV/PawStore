import "../styles/EditProduct.css"

function Toast({ message }) {
    return (
        <div className="toast-overlay">
            <div className="toast-box">
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Toast