import { useParams } from "react-router-dom";
import "../styles/CheckoutSuccess.css"
import { useEffect } from "react";
import { useState } from "react";
import NavButton from "../components/NavButton"
import iconCheck from "../assets/icons-check.svg"
import { useRef } from "react";
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

function CheckoutSuccess() {
    const { cartId } = useParams()
    const { getCheckedCart } = useCart()
    const { user } = useAuth()
    const [items, setItems] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchData = async () => {
            try {
                const data = await getCheckedCart(cartId, user.email);
                setItems(data?.items || []);
            } catch (error) {
                console.log("Error fetching cart: ", error)
            }
        }
        fetchData();
    }, [cartId]);


    return(
        <div className="success-container">
            <div className="success-message-card">
                <img src={iconCheck} className="success-check-icon"/>
                <p className="success-tittle">Compra realizada con éxito</p>
                <p className="success-info">Tu pedido ha sido procesado correctamente. Recibirás un correo con la confirmación y los detalles de tu compra</p>
            </div>
            <div className="success-checkout-card">
                <p className="success-checkout-title">Resumen de la compra</p>
                <div className="success-checkout-products">
                    <table className="checkout-table">
                        <thead className="checkout-table__head">
                            <tr className="checkout-table__header-row">
                                <th className="checkout-table__th">Producto</th>
                                <th className="checkout-table__th">Cantidad</th>
                                <th className="checkout-table__th">Precio Unitario</th>
                                <th className="checkout-table__th">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="checkout-table__body">
                            {items.map((p) => (
                            <tr className="checkout-table__row" key={p.id}>
                                <td className="checkout-table__td checkout-table__td--name">{p.name}</td>
                                <td className="checkout-table__td checkout-table__td--amount">{p.amount}</td>
                                <td className="checkout-table__td checkout-table__td--price">${p.price}</td>
                                <td className="checkout-table__td checkout-table__td--subtotal">${p.amount * p.price}</td>
                            </tr>
                            ))}
                        </tbody>
                        <tfoot className="checkout-table__foot">
                            <tr className="checkout-table__total-row">
                                <td className="checkout-table__td--total-label" colSpan={3}>Total</td>
                                <td className="checkout-table__td--total-value">
                                    ${items.reduce((acc, p) => acc + p.amount * p.price, 0).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="checkout-navbuttons-container">
                <NavButton text="Volver al catálogo" linkTo="/products" isButton={true}/>
                <NavButton text="Ir al inicio" linkTo="/" isButton={true} className="checkout-navbutton-home"/>
            </div>
        </div>
    )
}

export default CheckoutSuccess;