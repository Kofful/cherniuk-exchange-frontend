import {BrowserRouter} from "react-router-dom";
import HeaderNav from "../HeaderNav";
import Routes from "../../routes";
import {useStore} from "../../stores";
import {useCallback} from "react";
import {getUser} from "../../api/user";
import {Cookies, withCookies} from "react-cookie";
import PropTypes from "prop-types";

const Router = ({allCookies}) => {
    const {userStore} = useStore();

    const setUser = useCallback(async () => {
        try {
            const user = await getUser(allCookies.token);
            userStore.setUser(user);
        } catch (e) {
            userStore.setUser(null);
        }
    }, [userStore, allCookies]);

    setUser();

    return (
        <BrowserRouter>
            <HeaderNav/>
            <Routes/>
        </BrowserRouter>
    );
};

Router.propTypes = {
    cookies: PropTypes.instanceOf(Cookies),
    allCookies: PropTypes.object
};

Router.defaultProps = {
    cookies: new Cookies(),
    allCookies: {}
};

export default withCookies(Router);
