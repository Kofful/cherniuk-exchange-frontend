import {route} from "../routes";
import {Link} from "react-router-dom";
import {withCookies, Cookies} from "react-cookie";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import getUserStore, {User} from "../stores/UserStore";

const HeaderNav = ({cookies, allCookies, userStore}) => {
    const {username} = userStore;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div>
                        {username && <Link to={route("logout")} className="btn btn-danger">Log out</Link>}

                        {!username && <Link to={route("login")} className="btn btn-success">Log in</Link>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

HeaderNav.propTypes = {
    cookies: PropTypes.instanceOf(Cookies),
    allCookies: PropTypes.object,
    userStore: PropTypes.instanceOf(User)
};

HeaderNav.defaultProps = {
    cookies: new Cookies(),
    allCookies: {},
    userStore: getUserStore()
};

export default (withCookies(observer(HeaderNav)));
