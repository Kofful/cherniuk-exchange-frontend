import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

const Input = ({field, errors, touched, events, value}) => {
    let type;
    switch (field) {
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
            <label className="mt-3 text-capitalize" htmlFor={`${field}-input`}>
                <FormattedMessage
                    id={`sticker.${field}`}
                    defaultMessage={field}
                />
            </label>
            <input id={`${field}-input`} name={field}
                   type={type}
                   accept={type === "file" ? "image/png" : null}
                   autoComplete="off"
                   className={`login-input form-control ${errors && touched ? "is-invalid" : ""}`}
                   onChange={events.handleChange}
                   onBlur={events.handleBlur}
                   value={value}
            />
            {touched && errors && <div className="invalid-feedback">
                <FormattedMessage
                    id={errors}
                />
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
