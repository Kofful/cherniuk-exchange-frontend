import {helpers, maxLength, minLength, required, email as emailValidator} from "@vuelidate/validators/dist/raw.esm";

const email = {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Email is not valid.", emailValidator)
};

const username = {
    required: helpers.withMessage("Username is required.", required),
    minLengthValue: helpers.withMessage("Username must be longer than 3 characters.", minLength(3)),
    maxLengthValue: helpers.withMessage("Username must be shorter than 64 characters.", maxLength(64)),
    username: helpers.withMessage(
        "Username must contain only latin letters, numbers and specific symbols like: \"_\", \".\"",
        value => {
            return value.match(/^[0-9a-zA-Z_.]*$/)
        })
};

const password = {
    required: helpers.withMessage("Password is required.", required),
    minLengthValue: helpers.withMessage("Password must be longer than 8 characters.", minLength(8)),
    maxLengthValue: helpers.withMessage("Password must be shorter than 64 characters.", maxLength(64)),
};

export const loginSchema = {
    username,
    password
}

export const registrationSchema = {
    email,
    username,
    password
}
