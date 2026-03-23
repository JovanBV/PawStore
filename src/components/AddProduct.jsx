import validationSchema from "../schemas/validationSchema.jsx"
import { Formik, Form } from "formik";
import "../styles/AddProduct.css"
import CustomInput from "../components/CustomInput.jsx"
import { useProductStore } from "../stores/productStore.jsx";
import CustomTextArea from "./CustonTextArea.jsx"


function AddProductForm(){
    const addProduct = useProductStore((state) => state.addProduct)

    const onSubmit = (values, actions) => {
        addProduct(values)
        actions.resetForm()
    }
    return(
        <div className="add-product-form">
            <h2>Agregar producto</h2>
            <Formik 
                initialValues={{nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", stock: ""}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {(props) => (
                <Form>
                    <CustomInput
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    width="50%"
                    />
                    <CustomTextArea
                    label="Descripcion"
                    name="descripcion"
                    type="text"
                    placeholder="Descripcion del product"
                    />
                    <div className="price-category">
                        <div className="sub-container">
                            <CustomInput
                            label="Precio"
                            name="precio"
                            type="number"
                            placeholder="0.00"
                            />
                        </div>
                        <div className="sub-container">
                            <CustomInput
                            label="Categoria"
                            name="categoria"
                            type="text"
                            placeholder="Categoria del producto (ej. Alimento, Juguetes)"
                            />
                        </div>
                    </div>
                    <CustomInput
                    label="URL de la imagen"
                    name="imagen"
                    type="url"
                    placeholder="/api/placehold.co/600x400"
                    />
                    <CustomInput
                    label="stock"
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    width="50%"
                    />
                    <button type="submit" className="submit-button">Agregar producto</button>
                    {Object.keys(props.errors).length >= 1 && props.submitCount > 0 ? <p className="error-message">Por favor completa todos los campos antes de agregar el producto.</p>: ""}
                </Form>
            )
            }
            </Formik>
        </div>
    )
}

export default AddProductForm
