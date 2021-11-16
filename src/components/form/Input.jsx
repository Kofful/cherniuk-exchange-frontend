import PropTypes from "prop-types";

const Input = ({field, errors, touched, events}) => {
    return (
        <div className="form-group">
            <label className="mt-3 text-capitalize" htmlFor={`${field}-input`}>{field}</label>
            <input id={`${field}-input`} name={field}
                   type={field === "password" ? "password" : "text"} autoComplete="off"
                   className={`login-input form-control ${errors && touched ? "is-invalid" : ""}`}
                   onChange={events.handleChange}
                   onBlur={events.handleBlur}
            />
            {touched && errors && <div className="invalid-feedback">
                {errors}
            </div>}
        </div>
    );
};

Input.propTypes = {
    field: PropTypes.string,
    errors: PropTypes.string,
    touched: PropTypes.bool,
    events: PropTypes.shape({
        handleChange: PropTypes.func,
        handleBlur: PropTypes.func
    })
};

Input.defaultProps = {
    field: "",
    errors: "",
    touched: false,
    events: {
        handleChange: ()=>{},
        handleBlur: ()=>{}
    }
};

export default Input;
