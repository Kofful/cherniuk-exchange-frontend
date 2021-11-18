import {useState} from "react";
import {route} from "../../routes";
import {Link, useLocation} from "react-router-dom";
import {confirmEmail} from "../../api/auth";
import queryString from "query-string";
import {isEmptyArray} from "formik";
import {FormattedMessage, useIntl} from "react-intl";

const Confirm = () => {
    const intl = useIntl();

    const [state, setState] = useState({
        isLoaded: false,
        isConfirmed: false,
        message: intl.formatMessage({
            id: "loading",
            defaultMessage: "Loading..."
        })
    });

    const location = useLocation();

    const printError = () => {
        setState({
            ...state,
            isLoaded: true,
            message: intl.formatMessage({
                id: "confirm.email.fail",
                defaultMessage: "Failed to confirm your email."
            })
        });
    };

    const confirm = async () => {
        try {
            const response = await confirmEmail(queryString.parse(location.search));
            if (isEmptyArray(response)) {
                setState({
                    ...state,
                    isLoaded: true,
                    isConfirmed: true
                })
            } else {
                printError();
            }
        } catch(e) {
            printError();
        }
    };

    if (!state.isLoaded) {
        confirm();
    }

    if (state.isConfirmed) {
        return (
            <div className="d-flex flex-column justify-content-center">
                <h3>
                    <FormattedMessage
                        id="confirm.email.confirmed"
                        defaultMessage="Email is confirmed!"
                    />
                </h3>
                <Link className="w-50 btn btn-success" to={route("home")}>
                    <FormattedMessage
                        id="return.home"
                        defaultMessage="Return to home page"
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className="d-flex align-content-center">
            <h3 className={state.isLoaded ? 'text-danger' : 'text-white'}>{state.message}</h3>
        </div>
    );
};

export default Confirm;
