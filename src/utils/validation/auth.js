import Joi from "joi";

const setCustomMessages = (errors, fieldName) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = `${fieldName} is required`;
                break;
            case "string.email":
                err.message = "Email is not valid.";
                break;
            case "string.min":
                err.message = `${fieldName} must be longer than ${err.local.limit} characters.`;
                break;
            case "string.max":
                err.message = `${fieldName} must be shorter than ${err.local.limit} characters.`;
                break;
            case "string.pattern.base":
                if (fieldName === "Username")
                    err.message = "Username must contain only latin letters, numbers and specific symbols like: \"_\", \".\"";
                break;
            default:
        }
    });
    return errors;
}

const email = Joi.string()
    .required()
    .email({tlds: {allow: false}})
    .error(errors => (setCustomMessages(errors, "Email")));

const username = Joi.string()
    .required()
    .min(3)
    .max(64)
    .regex(/^[0-9a-zA-Z_.]*$/)
    .error(errors => (setCustomMessages(errors, "Username")));

const password = Joi.string()
    .required()
    .min(8)
    .max(64)
    .error(errors => (setCustomMessages(errors, "Email")));

export const loginSchema = Joi.object({
   username,
   password
});

export const registrationSchema = Joi.object({
    email,
    username,
    password
});
