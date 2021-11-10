import {useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {observer} from "mobx-react";
import getUserStore, {User} from "../../stores/UserStore";
import PropTypes from "prop-types";

const Login = ({userStore}) => {
    const navigate = useNavigate();

    return (
        <>
        <h1>Login</h1>
        <button onClick={() => {
            //simulating successful login
            userStore.updateUsername("Kofful");
            navigate(route("home"));
        }}>Reload</button>
        </>
    );
}

Login.propTypes = {
    userStore: PropTypes.instanceOf(User)
};

Login.defaultProps = {
    userStore: getUserStore()
};

export default observer(Login);