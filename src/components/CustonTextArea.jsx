import { useField } from "formik"
import "../styles/CustomTextArea.css"

function CustomTextArea ({label, ...props}) {
    const [field, meta] = useField(props);
    return(
        <div className="form-group">
            <label>{label}</label>
            <textarea {...field} {...props} className={meta.touched && meta.error ? "textarea-error" : ""}/>
        </div>
    )
}
export default CustomTextArea