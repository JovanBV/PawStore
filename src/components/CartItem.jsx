import '../styles/CartItem.css'
import CartItemButton from "../components/CartItemButton"
import CartDeleteButton from "../components/CartDeleteButton"



function CartItem({ data }){
    return(
        <div className='checkout-product-card'>
            <div className='checkout-product-section'>
                <img src={data.image_url} alt={data.name} className='checkout-product-img'/>
            </div>
            
            <div className='checkout-product-section'>
                <h2>{data.name}</h2>
            </div>

            <div className='checkout-product-section-buttons'>
                <CartItemButton data={data}/>
            </div>
            <div className='checkout-product-section-buttons'>
                <div className='checkout-product-price-section'>
                    <p className='checkout-product-price'>Precio: ${data.price}</p>
                    <p className='checkout-product-subtotal'>Subtotal: ${(data.price)*data.amount}</p>
                </div>
            </div>
            <div className='checkout-product-section'>
                <CartDeleteButton data={data}/>
            </div>
        </div>
    )
}

export default CartItem;