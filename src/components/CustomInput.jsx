import { useField } from "formik"

function CustomInput ({label, ...props}) {
    const [field, meta] = useField(props);
    return(
        <>
            <label>{label}</label>
            <input {...field} {...props} className={meta.touched && meta.error ? "input-error": ""}/>
        </>
    )
}
export default CustomInput