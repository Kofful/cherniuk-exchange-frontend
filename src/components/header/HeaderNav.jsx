import {route} from "../routes";
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../stores";
import {useCookies} from "react-cookie";
import {FormattedMessage} from "react-intl";
import LanguagePicker from "./localization/LanguagePicker";

const HeaderNav = () => {
    const {userStore} = useStore();
    const {user} = userStore;

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token");
        navigate(route("home"));
    };

    const isAdmin = user && user.roles.includes("ROLE_ADMIN");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div className="d-flex">
                        <LanguagePicker/>
                        {user && <div className="dropdown">
                            <div className="btn btn-dark border-0 text-white" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.username}
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                <li className="dropdown-item btn">
                                    <FormattedMessage
                                        id="user.profile"
                                        defaultMessage="Profile"
                                    />
                                </li>
                                {isAdmin &&
                                <li className="dropdown-item btn">
                                    <Link to={route("admin")} className="text-reset text-decoration-none">
                                        <FormattedMessage
                                            id="link.admin"
                                            defaultMessage={"Administration"}
                                        />
                                    </Link>
                                </li>
                                }
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li className="dropdown-item btn" onClick={logout}>
                                    <FormattedMessage
                                        id="logout"
                                        defaultMessage="Log out"
                                    />
                                </li>
                            </ul>
                        </div>}

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
