import {route} from "../routes";
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../stores";
import {useCookies} from "react-cookie";
import {FormattedMessage} from "react-intl";

const HeaderNav = () => {
    const {userStore} = useStore();
    const {user} = userStore;

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token");
        navigate(route("home"));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div>
                        {user && <div className="btn btn-danger" onClick={logout}>
                            <FormattedMessage
                                id="logout"
                                defaultMessage="Log out"
                            /></div>}

                        {!user && <Link to={route("login")} className="btn btn-success">
                            <FormattedMessage
                                id="login"
                                defaultMessage="Log in"
                            />
                        </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default observer(HeaderNav);
