import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    name: Yup.string().trim().required("El nombre es obligatorio"),
    email: Yup.string().trim().required("El correo es obligatorio."),
    password: Yup.string().required("La contraseña es obligatoria."),
    confirmpassword: Yup.string().required("Las contraseñas deben ser iguales").oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales.')
});

export default registerSchema