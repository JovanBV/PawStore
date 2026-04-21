import * as Yup from "yup";

const loginShema = Yup.object().shape({
    email: Yup.string().trim().required("El correo es obligatorio."),
    password: Yup.string().trim().required("La contrasena es obligatoria."),
});

export default loginShema