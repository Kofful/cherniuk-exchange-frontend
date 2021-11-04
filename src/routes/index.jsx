import {Routes as ReactRoutes, Route} from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Confirm from "../components/confirm/Confirm";

export default function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/confirm" element={<Confirm/>}/>
        </ReactRoutes>
    )
}
