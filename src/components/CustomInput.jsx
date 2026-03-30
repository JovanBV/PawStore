import { useField } from "formik"
import "../styles/CustomInput.css"


function CustomInput ({label, ...props}) {
    const [field, meta] = useField(props);
    return(
        <div className="form-group">
            <label>{label}</label>
            <input {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""}/>
        </div>
    )
}
export default CustomInput