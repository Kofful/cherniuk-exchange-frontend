import {useNavigate} from "react-router-dom";
import {route} from "../../routes";
import {observer} from "mobx-react";
import {useStore} from "../../stores";
import {getUser} from "../../api/user";

const Login = () => {
    const navigate = useNavigate();

    const {userStore} = useStore();

    return (
        <>
        <h1>Login</h1>
        <button onClick={() => {
            //simulating successful login
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzY1NTk3NDksImV4cCI6MTYzNjU2MzM0OSwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6IktvZmZ1bCJ9.gyI_9OqdyQw4yqJq9pqAKfxFogkzrTD4XZSSCt41cjQGjCqZoyxAYM6gE5InfkYNkLVutaE-KmVzekfwZ2jvr9-WgDUYBeli4jqNUrvVGuRFmiO1AvSWyYaOe0fj9F5Z6plVtkLamVciXnlZlC9yBrrUzSptf3d-QIOLVpb5AabVrVLzmyBtSX_MM_bT3g-Lhw_4N012lvo-evNY1dLuoySLdy8GnCH9wMoOI_xdFXYQCaFQJWhmAJ_fQYg7y5vVo20QnufVscOGN3r_RWcYULUKjE--G4_YNG_96Elv79Hd0YOu2YyurMRVJlZjeH3209w6kxNI4KhtGqcUV5hZ6Q";
            const user = getUser(token);
            userStore.setUser({username: "Kofful"});
            navigate(route("home"));
        }}>Reload</button>
        </>
    );
}

export default observer(Login);
