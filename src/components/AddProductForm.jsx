import validationSchema from "../schemas/validationSchema.jsx"
import { Formik, Form } from "formik";
import "../styles/AddProductForm.css"
import CustomInput from "./CustomInput.jsx"
import { useProductStore } from "../stores/productStore.jsx";
import CustomTextArea from "./CustonTextArea.jsx"


function AddProductForm(){
    const addProduct = useProductStore((state) => state.addProduct)
    const isLoading = useProductStore((state) => state.loading)

    


    const onSubmit = (values, actions) => {
        addProduct(values)
        actions.resetForm()
    }
    return(
        <div className="add-product-form">
            <h2 className="form-title">Agregar nuevo producto</h2>
            <Formik 
                initialValues={{name: "", description: "", price: "", category: "", image_url: "", stock: ""}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {(props) => (
                <Form className="product-form">
                    <CustomInput
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Ej: Pelota de Juguete Resistente"
                    />
                    <CustomTextArea
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder="Una descripción detallada del producto..."
                    />
                    <CustomInput
                    label="Precio"
                    name="price"
                    type="number"
                    placeholder="Ej: 19.99"
                    />
                    <CustomInput
                    label="Categoria"
                    name="category"
                    type="text"
                    placeholder="Ej: Juguetes"
                    />
                    <CustomInput
                    label="URL de la imagen"
                    name="image_url"
                    type="url"
                    placeholder="Ej: https://example.com/imagen-pelota.jpg"
                    />
                    <CustomInput
                    label="stock"
                    name="stock"
                    type="number"
                    placeholder="Ej: 50"
                    />
                    <button type="submit" className="form-submit-btn">Agregar producto</button>
                    {Object.keys(props.errors).length >= 1 && props.submitCount >= 1 ? (
                        <p className="form-error-message">Por favor completa todos los campos antes de agregar el producto.</p>
                    ) : ""}
                </Form>
            )
            }
            </Formik>
        </div>
    )
}

export default AddProductForm