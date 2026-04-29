import CartItem from "./CartItem";
import { useCartStore } from "../stores/cartStore";
import "../styles/Cart.css"
import NavButton from "./NavButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessageCard from "./ErrorMessageCard";

function Cart(){
    const products = useCartStore((state) => state.shoppingCart)
    const deleteAll = useCartStore((state) => state.deleteAll)
    const sumTotalPrice = useCartStore((state) => state.sumTotalPrice)
    const createCart = useCartStore((state) => state.createCart)
    const navigate = useNavigate()
    const [navigateTo, setNavigateTo] = useState('');
    const [error, setError] = useState(null);


    const handleContinue = async () => {
        const created = await createCart();
        if(!created.error){
            setNavigateTo(created && "/checkout");
        }else{
            setError(created)
        }
    }

    useEffect(() => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    }, [navigateTo, navigate]);

    return(
        <div className="shopping-cart-container">
            <div className="shopping-cart-card">
                <div className="shopping-cart-products-container">
                    {products.map((product) => (
                        <CartItem key={product.key} data={product} />
                    ))}
                    {error &&   <ErrorMessageCard
                            tittle="Error"
                            error={error.error}
                            onAccept={() => setError(null)}
                        />
                    }
                    <div className="shopping-cart-empty-container">
                        <button 
                            className="shopping-cart-empty-cart-button"
                            onClick={() => deleteAll()}
                            >Mostrar carrito vacio
                        </button>
                    </div>
                </div>
                <div className="shopping-cart-total-card">
                    <div className="shopping-cart-price-card">
                        <p>Total:</p>
                        <p>$ {sumTotalPrice()}</p>
                    </div>
                    <NavButton 
                        onClick={handleContinue}
                        linkTo={navigateTo} 
                        text="Continuar al checkout" 
                        isButton={true} 
                        className="shopping-cart-checkout-button"
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart;