import {Link, useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {registrationSchema} from "../../utils/validation/auth";
import {useState} from "react";
import {register} from "../../api/auth";
import {useToasts} from "react-toast-notifications";
import {Formik} from "formik";
import {Input} from "../form/Input";


export default function Register() {

    const initialData = {
        email: "",
        username: "",
        password: ""
    };

    const [messages, setMessages] = useState([]);

    const {addToast} = useToasts();

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            await register(values);
            addToast("We sent confirmation link to your email. Please, check your inbox.", {
                appearance: "info",
                placement: "bottom-right",
                autoDismiss: false
            });
            navigate(route("home"));
        } catch (error) {
            if (error.status === 400) {
                setMessages(error.data.slice());
            } else {
                setMessages(["Something went wrong"]);
            }
        }
    }

    return (
        <Formik initialValues={initialData} onSubmit={submit} validationSchema={registrationSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}
                      className="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
                    <div className="input-data">
                        <Input
                            field="email"
                            errors={errors.email}
                            touched={touched.email}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange
                            }}
                        />
                        <Input
                            field="username"
                            errors={errors.username}
                            touched={touched.username}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange
                            }}
                        />
                        <Input
                            field="password"
                            errors={errors.password}
                            touched={touched.password}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange
                            }}
                        />
                    </div>
                    <div className="link-div mt-3 d-flex flex-column">
                        <p>
                            Already have an account?
                            <Link to={route("login")}>Log in</Link>
                        </p>
                        <button className="btn btn-success w-50 align-self-center" type={"submit"}
                                disabled={isSubmitting}>Register
                        </button>
                        {messages.map(message =>
                            <span className="text-danger align-self-center" key={message}>
                                {message}
                            </span>
                        )}
                    </div>
                </form>
            )}
        </Formik>
    );
}
