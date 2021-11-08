export function Input(props) {
    return (
        <div className="form-group">
            <label className="mt-3 text-capitalize" htmlFor={`${props.field}-input`}>{props.field}</label>
            <input id={`${props.field}-input`} name={props.field}
                   type={props.field === "password" ? "password" : "text"} autoComplete="off"
                   className={`login-input form-control ${props.errors && props.touched ? "is-invalid" : ""}`}
                   onChange={props.events.handleChange}
                   onBlur={props.events.handleBlur}
            />
            {props.touched && props.errors && <div className="invalid-feedback">
                {props.errors}
            </div>}
        </div>
    );
}