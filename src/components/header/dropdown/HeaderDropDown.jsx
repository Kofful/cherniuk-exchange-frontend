import {FormattedMessage} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {route} from "../../../routes";
import {observer} from "mobx-react";
import {useStore} from "../../../stores";
import {useCookies} from "react-cookie";
import AdminDropDown from "./AdminDropDown";
import UserDropDown from "./UserDropDown";

const HeaderDropDown = () => {
    const {userStore} = useStore();
    const {user} = userStore;

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token", {path: "/"});
        navigate(route("home"));
    };

    const isAdmin = user && user.role.name === "ROLE_ADMIN";

    return (
        <>
            {user &&
            <div className="dropdown">
                <div className="btn btn-dark border-0 text-white" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.username}
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    {!isAdmin && <UserDropDown user={user}/>}

                    {isAdmin && <AdminDropDown/>}

                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li className="dropdown-item p-0" onClick={logout}>
                        <div className="btn w-100 text-left text-reset">
                            <FormattedMessage
                                id="logout"
                                defaultMessage="Log out"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            }

            {!user &&
            <Link to={route("login")} className="btn btn-success">
                <FormattedMessage
                    id="login"
                    defaultMessage="Log in"
                />
            </Link>
            }
        </>
    );
};

export default observer(HeaderDropDown);
