import trashIcon from '../assets/trash.svg';
import { useCart } from '../context/CartContext';
import "../styles/CartDeleteButton.css"

function DeleteButton({data}) {
    const { fullyDeleteItem } = useCart()

    return(
        <button
        onClick={() => fullyDeleteItem(data)}
        className='checkout-product-delete-button'>
            <img src={trashIcon} alt='Eliminar' className='checkout-product-delete-icon'/>
            Eliminar
        </button>
    )
}
export default DeleteButton;