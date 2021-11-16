export function Input(props) {
    let type;
    switch (props.field) {
        case "password":
            type = "password";
            break;
        case "stickerPath":
            type = "file";
            break;
        default:
            type = "text";
    }
    return (
        <div className="form-group">
            <label className="mt-3 text-capitalize" htmlFor={`${props.field}-input`}>{props.field}</label>
            <input id={`${props.field}-input`} name={props.field}
                   type={type}
                   accept={type === "file" ? "image/png" : null}
                   autoComplete="off"
                   className={`login-input form-control ${props.errors && props.touched ? "is-invalid" : ""}`}
                   onChange={props.events.handleChange}
                   onBlur={props.events.handleBlur}
                   value={props.value}
            />
            {props.touched && props.errors && <div className="invalid-feedback">
                {props.errors}
            </div>}
        </div>
    );
}