import "../styles/Checkout.css"
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import CartDetail from "./CartDetail";
import CustomInput from "./CustomInput"
import CustomTextArea from "./CustonTextArea.jsx"
import { Formik, Form } from "formik";
import validationSchema from "../schemas/checkoutSchema.jsx"
import { useAuthStore } from "../stores/useAuthStore.jsx"
import { useRef } from "react";
import Loading from "./Loading.jsx";

function Checkout() {
    const navigate = useNavigate()
    const products = useCartStore((state) => state.shoppingCart)
    const checkoutCart = useCartStore((state) => state.allProcessCheckout)
    const cartId = useCartStore((state) => state.shoppingCartId)
    const userInfo = useAuthStore((state) => state.user)
    const formikRef = useRef(null)

    const handleSubmit = async () => {
        const success = await checkoutCart(cartId);
        if(success){
            navigate(`/receipt/${cartId}`)
        }
    }

    const handleButtonClick = () => {
        formikRef.current?.handleSubmit();
    }

    return(
        <div className="checkout-cards-container">
            <Loading />
            <div className="checkout-cards">
                <div className="checkout-user-info">
                    <div className="edit-form-container">
                        <h1>Informacion de compra</h1>
                        <Formik
                            innerRef={formikRef}
                            initialValues={{name: userInfo.name, email: userInfo.email, direction: "", phoneNumber: ""}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                            <Form>
                                {Object.keys(props.errors).length >= 1 && props.submitCount >= 1 ? <p className="error-message">Por favor completa todos los campos antes de completar el pedido.</p>: ""}
                                <CustomInput
                                    label="Nombre completo"
                                    name="name"
                                    type="text"
                                    placeholder="Juán Pérez"
                                />
                                <CustomTextArea
                                    label="Correo electrónico"
                                    name="email"
                                    type="email"
                                    placeholder="juan.perez@gmail.com"
                                />
                                <CustomInput
                                    label="Dirección"
                                    name="direction"
                                    type="text"
                                    placeholder="Calle Ficticia 456, San José, Costa Rica"
                                />
                                <CustomInput
                                    label="Teléfono"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="+506 8888-7777"
                                />
                            </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="checkout-cart-info">
                    <CartDetail products={products} /> 
                    <div className="edit-buttons">
                        <button className="submit-button" type="submit" onClick={handleButtonClick}>Confirmar compra</button> 
                        <button className="cancel-button" type="button" onClick={() => navigate('/')}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;