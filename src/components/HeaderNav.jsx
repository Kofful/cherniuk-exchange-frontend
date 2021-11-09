import {Cookies, withCookies} from "react-cookie";
import PropTypes from "prop-types";

const HeaderNav = ({cookies}) => {
    console.log("token", cookies.get("token"))
    //temporary log for checking when cookies refresh
    return (
        <h1>HEADER</h1>
    );
};


HeaderNav.propTypes = {
    cookies: PropTypes.instanceOf(Cookies)
};

HeaderNav.defaultProps = {
    cookies: new Cookies()
};

export default withCookies(HeaderNav);
