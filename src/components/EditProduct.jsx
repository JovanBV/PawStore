import { useParams, useNavigate } from "react-router-dom"
import { useProductStore } from "../stores/productStore"
import CustomInput from "./CustomInput"
import { Formik, Form } from "formik";
import validationSchema from "../schemas/validationSchema.jsx"
import "../styles/EditProduct.css"
import CustomTextArea from "./CustonTextArea.jsx"

function EditProduct() {
    const products = useProductStore((state) => state.products)
    const editProduct = useProductStore((state)=> state.editProduct)
    const {productId} = useParams()
    const productToEdit = products.find((p) => p.id === Number(productId))
    const navigate = useNavigate();

    const onSubmit = (values) => {
        editProduct(values, productToEdit.id)
        navigate("/admin")
    }
    return(
            <div className="edit-form-container">
                <h1>Editar producto</h1>
                <div className="edit-card">
                    <Formik
                        initialValues={{name: productToEdit.name, description: productToEdit.description, price: productToEdit.price, category: productToEdit.category, image_url: productToEdit.image_url, stock: productToEdit.stock}}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(props) => (
                        <Form>
                        {Object.keys(props.errors).length >= 1 && props.submitCount >= 1 ? <p className="error-message">Por favor completa todos los campos antes de agregar el producto.</p>: ""}
                        <CustomInput
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        />
                        <CustomTextArea
                        label="Descripcion"
                        name="description"
                        type="text"
                        placeholder="Descripcion"
                        />
                        <CustomInput
                        label="Precio"
                        name="price"
                        type="number"
                        placeholder="precio"
                        />
                        <CustomInput
                        label="Categoria"
                        name="category"
                        type="text"
                        placeholder="categoria"
                        />
                        <CustomInput
                        label="URL de la imagen"
                        name="image_url"
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
                </div>
            </div>
    )
}

export default EditProduct