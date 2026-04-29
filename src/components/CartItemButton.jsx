import "../styles/CartItemButton.css"
import { useState, useEffect } from "react";
import "../styles/CartItemButton.css"
import { useCart } from "../context/CartContext";

function CartItemButton({ data }) {
    const { addItem, deleteItem, updateItem: update } = useCart()
    const [inputValue, setInputValue] = useState(data.amount);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setInputValue(data.amount);
    }, [data.amount])

    const handleUpdate = () => {
        setIsEditing(false);
        update(data, parseInt(inputValue));
    }

    const handleAdd = () => {
        addItem({...data})
    }

    const handleDelete = () => {
        deleteItem({...data})
    }

    return(
        <div className="cart-item-button-container">
        {data.amount > 0 && (
                <div className="cart-item-button-card">
                    <button 
                        onClick={handleDelete}
                        className="cart-item-button">-</button>
                    <div className="cart-item-product-amount-card">
                        {!isEditing && (<p 
                            onClick={() => setIsEditing(true)} 
                            className="item-amount"
                            >{data.amount}</p>)}

                        {isEditing && <input
                            type="number"
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleUpdate()}
                            autoFocus
                            onBlur={() => handleUpdate()}
                            className="item-amount-update"
                            ></input>}
                    </div>
                    <button 
                        onClick={handleAdd}
                        className="cart-item-button">+</button>
                </div>
        )}
        </div>
    )
}

export default CartItemButton;