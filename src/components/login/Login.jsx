import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../api/auth";
import {route} from "../../routes";
import {Formik} from "formik";
import {loginSchema} from "../../utils/validation/auth";
import Input from "../form/Input";
import {useCookies} from "react-cookie";

const Login = () => {

    const initialData = {
        username: "",
        password: ""
    };

    const [cookies, setCookie] = useCookies();

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const response = await login(values);
            setCookie("token", response.token);
            navigate(route("home"));
        } catch (error) {
            if (error.status === 401) {
                setMessage("Incorrect username or password");
            } else {
                setMessage("Something went wrong");
            }
        }
    }

    return (
        <Formik initialValues={initialData} onSubmit={submit} validationSchema={loginSchema}>
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
                            No account yet?
                            <Link to={route("register")}>Register</Link>
                        </p>
                        <button className="btn btn-success w-50 align-self-center" type={"submit"}
                                disabled={isSubmitting}>Login
                        </button>
                        <span className="text-danger align-self-center">
                                {message}
                        </span>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Login;
