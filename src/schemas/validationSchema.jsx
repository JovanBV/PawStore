import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("El nombre es obligatorio."),
    description: Yup.string().trim().required("La descripcion es obligatoria."),
    price: Yup.number().required("El precio es obligatorio."),
    category: Yup.string().trim().required("La categoria es obligatoria."),
    image_url: Yup.string().trim().url().required("La imagen es obligatoria."),
    stock: Yup.number().positive().required("El stock es obligatorio.")
});

export default validationSchema