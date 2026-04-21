import { useAuthStore } from "../stores/useAuthStore"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import loginShema from "../schemas/loginShema"
import CustomInput from "./CustomInput"
import "../styles/Login.css"
import { useState } from "react"
import Loading from "./Loading"

function Login() {
    const login = useAuthStore((state) => state.login);
    const isAdmin = useAuthStore((state) => state.isAdmin);
    const navigate = useNavigate();
    const [logInError, setLoginError] = useState("");

    const onSubmit = async (values) => {
        try {
            setLoginError("");
            await login(values);

            if(!isAdmin()){
                navigate("/products");
            }
            return navigate("/admin") 
        } catch (err) {
            setLoginError("Credenciales incorrectos. Inténtalo de nuevo.")
            console.log("Login error:", err);
        }
    }

    return (
        <div className="login-container">
            <Loading/>
            <h1>Iniciar sesión</h1>
            <div className="login-card">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginShema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form className="login-form">
                            {logInError && <p className="error-message">{logInError}</p>}
                            {Object.keys(props.errors).length >= 1 && props.submitCount > 0 ? (
                                <p className="error-message">Error con sus credenciales, intentelo de nuevo o registrese.</p>
                            ) : ""}

                            <CustomInput 
                                label="Correo electrónico"
                                type="email"
                                name="email"
                                placeholder="nombre.apellido@ejemplo.com"
                            />
                            <CustomInput 
                                label="Contraseña"
                                type="password"
                                name="password"
                                placeholder="***************"
                            />
                            <div className="login-buttons-container">
                                <button 
                                    className="log-in-button" 
                                    type="submit"
                                    disabled={props.isSubmitting}
                                >
                                {props.isSubmitting ? "Cargando..." : "Ingresar"}
                                </button>
                                <button onClick={()=> navigate("/")} className="back-home-button" type="button">Volver al inicio</button>
                            </div>
                        </Form>
                    )} 
                </Formik>
            </div>
        </div>
    )
}

export default Login