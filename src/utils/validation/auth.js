import * as Yup from "yup";

const email = Yup.string()
    .required("user.email.required")
    .email("user.email.regex");

const username = Yup.string()
    .required("user.username.required")
    .min(3, "user.username.min")
    .max(64, "user.username.max")
    .matches(/^[0-9a-zA-Z_.]*$/, "user.username.regex");

const password = Yup.string()
    .required("user.password.required")
    .min(8,  "user.password.min")
    .max(64,  "user.password.max");

export const loginSchema = Yup.object().shape({
    username,
    password
});

export const registrationSchema = Yup.object().shape({
    email,
    username,
    password
});
