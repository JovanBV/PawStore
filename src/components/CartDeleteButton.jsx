import trashIcon from '../assets/trash.svg';
import { useCartStore } from '../stores/cartStore';
import "../styles/CartDeleteButton.css"

function DeleteButton({data}) {
    const fullyDeleteItem = useCartStore((state) => state.fullyDeleteItem)

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