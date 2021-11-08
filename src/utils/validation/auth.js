import * as Yup from "yup";

const message = (error, fieldName, ...additional) => {
    let result = "";
    switch (error) {
        case "required":
            result = `${fieldName} is required`;
            break;
        case "email":
            result = "Email is not valid.";
            break;
        case "min":
            result = `${fieldName} must be longer than ${additional} characters.`;
            break;
        case "max":
            result = `${fieldName} must be shorter than ${additional} characters.`;
            break;
        case "regex":
            if (fieldName === "Username")
                result = "Username must contain only latin letters, numbers and specific symbols like: \"_\", \".\"";
            break;
        default:
    }
    return result;
}

const email = Yup.string()
    .required(message("required", "Email"))
    .email(message("email", "Email"));

const username = Yup.string()
    .required(message("required", "Username"))
    .min(3, message("min", "Username", 3))
    .max(64, message("max", "Username", 64))
    .matches(/^[0-9a-zA-Z_.]*$/, message("regex", "Username"));

const password = Yup.string()
    .required(message("required", "Password"))
    .min(8,  message("min", "Password", 8))
    .max(64,  message("max", "Password", 64));

export const loginSchema = Yup.object().shape({
    username,
    password
});

export const registrationSchema = Yup.object().shape({
    email,
    username,
    password
});
