import { useParams, useNavigate } from "react-router-dom"
import { useProductStore } from "../stores/productStore"
import CustomInput from "./CustomInput"
import { Formik, Form } from "formik";
import validationSchema from "../schemas/validationSchema.jsx"
import "../styles/EditProduct.css"
import CustomTextArea from "./CustonTextArea.jsx"
import Toast from "../components/Toast.jsx"
import { useState } from "react";

function EditProduct() {
    const editProduct = useProductStore((state)=> state.editProduct)
    const {productId} = useParams()
    const productToEdit = useProductStore((state)=> state.products.find((p) => p.id === Number(productId)))

    const [showToast, setShowToast] = useState(false)

    const navigate = useNavigate();

    const onSubmit = (values) => {
        editProduct({...values, id: productToEdit.id})
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            navigate("/admin")
        }, 1000)
    }
    return(
            <div className="edit-form-container">
                <h1>Editar producto</h1>
                <div className="edit-card">
                    <Formik
                        initialValues={{nombre: productToEdit.nombre, descripcion: productToEdit.descripcion, precio: productToEdit.precio, categoria: productToEdit.categoria, imagen: productToEdit.imagen, stock: productToEdit.stock}}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(props) => (
                        <Form>

                        {Object.keys(props.errors).length >= 1 && props.submitCount > 0 ? <p className="error-message">Por favor completa todos los campos antes de agregar el producto.</p>: ""}


                        <CustomInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        />
                        <CustomTextArea
                        label="Descripcion"
                        name="descripcion"
                        type="text"
                        placeholder="descripcion"
                        />
                                                <CustomInput
                        label="Precio"
                        name="precio"
                        type="number"
                        placeholder="precio"
                        />
                                                <CustomInput
                        label="Categoria"
                        name="categoria"
                        type="text"
                        placeholder="categoria"
                        />
                                                <CustomInput
                        label="URL de la imagen"
                        name="imagen"
                        type="url"
                        placeholder="imagen"
                        />
                                                <CustomInput
                        label="Stock"
                        name="stock"
                        type="number"
                        placeholder="stoci"
                        />

                        <div className="edit-buttons">
                            <button className="cancel-button" type="button" onClick={() => navigate('/admin')}>Cancelar</button>
                            <button className="submit-button" type="submit">Guardar cambios</button> 
                        </div>
                        </Form>
                        )}
                    </Formik>
                    {showToast && (
                        <Toast
                            message="Producto guardado con éxito"
                            onClose={() => setShowToast(false)}
                        />
                    )}
                </div>
            </div>
    )
}

export default EditProduct