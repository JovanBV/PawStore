import { useState } from "react";
import "../styles/AddToCartButton.css"
import { useCart } from "../context/CartContext";

function AddToCartButton( {data} ){
    const [click, handleIsClicked] = useState(false);
    const [value, setValue] = useState(0);

    const { addItem, deleteItem } = useCart()

    return(
        <>
        {(!click || value == 0) && (
            <button 
                onClick={() => {
                    handleIsClicked(true); 
                    setValue(value + 1)
                    addItem({...data})
                }} 
                className="add-to-cart-button">+ Agregar</button>
        )}
        {click && value > 0 && (
                <div className="add-to-cart-btns-card">
                    <button 
                        onClick={() => {
                            setValue(value <= 0 ? value: value - 1);
                            deleteItem({...data})
                        }}
                        className="add-to-cart-button">-</button>
                    <p className="add-to-cart-product-amount">{value}</p>
                    <button 
                        onClick={() => {
                            const newValue = value + 1
                            setValue(newValue)
                            addItem({...data})
                        }}
                        className="add-to-cart-button">+</button>
                </div>
        )}
        </>
    )
}

export default AddToCartButton;