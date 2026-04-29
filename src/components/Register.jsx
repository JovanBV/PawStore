import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import registerSchema from "../schemas/registerSchema"
import CustomInput from "./CustomInput"
import "../styles/Register.css"
import Loading from "./Loading"

import { useAuth } from "../context/AuthContext"

function Register() {
    const { register, isAdmin } = useAuth()
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await register(values);
            if(!isAdmin){
                navigate("/products");
            }
            return navigate("/admin") 
        } catch (err) {
            console.log("Register error:", err);
        }
    }

    return (
        <div className="register-container">
            <Loading/>
            <h1>Crear cuenta</h1>
            <div className="register-card">
                <Formik
                    initialValues={{ name: "", email: "", password: "", confirmpassword: ""}}
                    validationSchema={registerSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form className="register-form">
                            <CustomInput 
                                label="Nombre completo"
                                type="text"
                                name="name"
                                placeholder="Introduce tu nombre completo"
                            />
                            <CustomInput 
                                label="Correo electrónico"
                                type="email"
                                name="email"
                                placeholder="ejemplo@dominio.com"
                            />
                            <CustomInput 
                                label="Contraseña"
                                type="password"
                                name="password"
                                placeholder="Introduce tu contraseña"
                            />
                            <CustomInput 
                                label="Confirmar contraseña"
                                type="password"
                                name="confirmpassword"
                                placeholder="Confirmar tu contraseña"
                            />
                            {Object.keys(props.errors).length >= 1 && props.submitCount > 0 ? (
                                <p className="register-error-message">Por favor completa todos los campos correctamente.</p>
                            ) : ""}
                            <div className="register-buttons-container">
                                <button 
                                    className="register-submit-button" 
                                    type="submit"
                                    disabled={props.isSubmitting}
                                >
                                    {props.isSubmitting ? "Cargando..." : "Registrarse"}
                                </button>
                                <button onClick={()=> navigate("/login")} className="register-back-button" type="button">Ya tengo una cuenta</button>
                            </div>
                        </Form>
                    )} 
                </Formik>
            </div>
        </div>
    )
}

export default Register