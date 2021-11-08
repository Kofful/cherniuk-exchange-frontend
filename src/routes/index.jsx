import {Routes as ReactRoutes, Route} from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Confirm from "../components/confirm/Confirm";

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/confirm" element={<Confirm/>}/>
        </ReactRoutes>
    )
}

export const route = (routeName) => {
    let path;
    switch(routeName) {
        case "login":
            path = "/login";
            break;
        case "register":
            path = "/register";
            break;
        case "home":
        default:
            path = "/";
    }
    return path;
}

export default Routes;
