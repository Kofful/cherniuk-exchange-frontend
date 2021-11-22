import {Link, useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {registrationSchema} from "../../utils/validation/auth";
import {useState} from "react";
import {register} from "../../api/auth";
import {useToasts} from "react-toast-notifications";
import {Formik} from "formik";
import Input from "../form/Input";
import {FormattedMessage, useIntl} from "react-intl";


const Register = () => {

    const initialData = {
        email: "",
        username: "",
        password: ""
    };

    const [messages, setMessages] = useState([]);

    const intl = useIntl();

    const {addToast} = useToasts();

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            await register(values);
            addToast(
                intl.formatMessage({
                    id: "confirmation.sent",
                    defaultMessage: "We sent confirmation link to your email. Please, check your inbox."
                }), {
                appearance: "info",
                placement: "bottom-right",
                autoDismiss: false
            });
            navigate(route("home"));
        } catch (error) {
            if (error.status === 400) {
                setMessages(error.data.slice());
            } else {
                setMessages([
                    intl.formatMessage({
                        id: "something.went.wrong",
                        defaultMessage: "Something went wrong"
                    })
                ]);
            }
        }
    }

    return (
        <Formik initialValues={initialData} onSubmit={submit} validationSchema={registrationSchema}>
            {({
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
                                handleBlur,
                                handleChange
                            }}
                        />
                        <Input
                            field="username"
                            errors={errors.username}
                            touched={touched.username}
                            events={{
                                handleBlur,
                                handleChange
                            }}
                        />
                        <Input
                            field="password"
                            errors={errors.password}
                            touched={touched.password}
                            events={{
                                handleBlur,
                                handleChange
                            }}
                        />
                    </div>
                    <div className="link-div mt-3 d-flex flex-column">
                        <p>
                            <FormattedMessage
                                id="already.have.account"
                                defaultMessage="Already have an account?"
                            />
                            <Link to={route("login")}>
                                <FormattedMessage
                                    id="login"
                                    defaultMessage="Log in"
                                />
                            </Link>
                        </p>
                        <button className="btn btn-success w-50 align-self-center" type={"submit"}
                                disabled={isSubmitting}>
                            <FormattedMessage
                                id="auth.register"
                                defaultMessage="Register"
                            />
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
};

export default Register;
