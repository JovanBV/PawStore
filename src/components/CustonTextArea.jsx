import { useField } from "formik"

function CustomTextArea({label, ...props}) {
    const [field, meta] = useField(props);
    return(
        <>
            <label>{label}</label>
            <textarea {...field} {...props} className={meta.touched && meta.error ? "input-error": ""}/>
        </>
    )
}

export default CustomTextArea