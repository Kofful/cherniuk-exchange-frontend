import {route} from "../routes";
import {Link} from "react-router-dom";
import {withCookies, Cookies} from "react-cookie";
import PropTypes from "prop-types";

const HeaderNav = ({cookies, allCookies}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div>
                        {allCookies.token && <Link to={route("logout")} className="btn btn-danger">Log out</Link>}

                        {!allCookies.token && <Link to={route("login")} className="btn btn-success">Log in</Link>}
                    </div>
                </div>
            </div>
        </nav>

    );
};

HeaderNav.propTypes = {
    cookies: PropTypes.instanceOf(Cookies),
    allCookies: PropTypes.object
};

HeaderNav.defaultProps = {
    cookies: new Cookies(),
    allCookies: {}
};

export default withCookies(HeaderNav);
