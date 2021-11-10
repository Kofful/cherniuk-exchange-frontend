import {useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {observer} from "mobx-react";
import {useStore} from "../../stores";

const Login = () => {
    const navigate = useNavigate();

    const {userStore} = useStore();

    return (
        <>
        <h1>Login</h1>
        <button onClick={() => {
            //simulating successful login
            userStore.setUser({username: "Kofful"});
            navigate(route("home"));
        }}>Reload</button>
        </>
    );
}

export default observer(Login);
