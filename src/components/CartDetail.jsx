import "../styles/CartDetail.css"
import { useCart } from "../context/CartContext"

function CartDetail( { products } ){
    const { sumTotalPrice } = useCart()
    
    return(
    <div className="checkout-cart-item-info">
        <p className="checkout-cart-tittle">Resumen del pedido</p>
        {products.map((p) => (
            <div key={p.key} className="checkout-cart-item-info-card">
                <div className="checkout-cart-product-info">
                    <p className="checkout-cart-product-name">{p.name}</p>
                    <p className="checkout-cart-product-price-amount">{`${p.amount} x $${p.price}`}</p>
                </div>
                <div>
                    <p>${p.amount * p.price}</p>
                </div>
            </div>
        ))}
        <div className="checkout-total-card">
            <p>Total: </p>
            <p>${sumTotalPrice()}</p>
        </div>
    </div>
    )
}
export default CartDetail;