import * as Yup from "yup";

const checkoutSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required("El nombre es obligatorio."),
    email: Yup.string()
        .trim()
        .email("El correo debe ser válido.")
        .required("El correo es obligatorio."),
    direction: Yup.string()
        .trim()
        .required("La dirección es obligatoria.")
        .min(10, "La dirección debe tener al menos 10 caracteres."),
    phoneNumber: Yup.string()
        .trim()
        .matches(
            /^(\+506\s?)?(\d{8}|\d{4}-\d{4})$/,
            "El teléfono debe estar en formato costarricense: +506 8888-7777 u 8888-7777"
        )
        .required("El teléfono es obligatorio.")
});

export default checkoutSchema;