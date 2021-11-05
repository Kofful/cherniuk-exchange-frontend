import {Link, useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {registrationSchema} from "../../utils/validation/auth";
import {useValidator} from "../../utils/hooks/useValidator";
import {useState} from "react";
import {register} from "../../api/auth";
import {useToasts} from "react-toast-notifications";


export default function Register() {
    const [state, updateField, setExplicitField] = useValidator({
        initialData: {
            email: null,
            username: null,
            password: null
        },
        schema: registrationSchema,
    });

    const [messages, setMessages] = useState([]);

    const {addToast} = useToasts();

    const navigate = useNavigate();

    const printErrors = errors => errors.map((error, index) =>
        <div className="invalid-feedback" key={index}>
            {error.$message}
        </div>
    );

    const submit = async (e) => {
        e.preventDefault();

        try {
            await register(state.$data);
            addToast("We sent confirmation link to your email. Please, check your inbox.", {
                appearance: "info",
                placement: "bottom-right",
                autoDismiss: false
            });
            navigate(route("home"));
        } catch(error) {
            if (error.status === 400) {
                setMessages(error.data.slice());
            } else {
                setMessages(["Something went wrong"]);
            }

        }
    }

    const errors = state.$errors;

    return (
        <form onSubmit={submit}
              className="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
            <div className="input-data">
                <div className="form-group">
                    <label className="mt-3" htmlFor="email-input">Email</label>
                    <input id="email-input" name="email"
                           type="text" autoComplete="off"
                           className={`login-input form-control ${errors.email.length > 0 ? "is-invalid" : ""}`}
                           onChange={e => updateField("email", e)}
                           onFocus={() => setExplicitField("email", true)}/>
                    {errors.email.length > 0 && printErrors(errors.email)}
                </div>
                <div className="form-group">
                    <label className="mt-3" htmlFor="username-input">Username</label>
                    <input id="username-input" name="username"
                           type="text" autoComplete="off"
                           className={`login-input form-control ${errors.username.length > 0 ? "is-invalid" : ""}`}
                           onChange={e => updateField("username", e)}
                           onFocus={() => setExplicitField("username", true)}/>
                    {errors.username.length > 0 && printErrors(errors.username)}
                </div>
                <div className="form-group">
                    <label className="mt-3" htmlFor="password-input">Username</label>
                    <input id="password-input" name="password"
                           type="password"
                           className={`login-input form-control ${errors.password.length > 0 ? "is-invalid" : ""}`}
                           onChange={e => updateField("password", e)}
                           onFocus={() => setExplicitField("password", true)}/>
                    {errors.password.length > 0 && printErrors(errors.password)}
                </div>
            </div>
            <div className="link-div mt-3 d-flex flex-column">
                <p>
                    Already have an account?
                    <Link to={route("login")}>Log in</Link>
                </p>
                <button className="btn btn-success w-50 align-self-center" disabled={!state.$validation_success}>Register</button>
                {messages.length > 0 && messages.map(message =>
                    <span className="text-danger align-self-center" key={message}>
                        {message}
                    </span>
                )}
            </div>
        </form>
    )
}