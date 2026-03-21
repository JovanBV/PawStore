import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es obligatorio."),
    descripcion: Yup.string().trim().required("La descripcion es obligatoria."),
    precio: Yup.number().required("El precio es obligatorio."),
    categoria: Yup.string().trim().required("La categoria es obligatoria."),
    imagen: Yup.string().trim().url().required("La imagen es obligatoria."),
    stock: Yup.number().positive().required("El stock es obligatorio.")
});

export default validationSchema