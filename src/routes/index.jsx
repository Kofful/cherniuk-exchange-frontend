import {Routes as ReactRoutes, Route} from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Confirm from "../components/confirm/Confirm";
import Admin from "../components/admin/Admin";
import Page404 from "../components/errorPages/Page404";
import Profile from "../components/profile/Profile";
import CreateTargetedOfferForm from "../components/offer/CreateOffer/CreateTargetedOfferForm";

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/confirm" element={<Confirm/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/user/:id" element={<Profile/>}/>
            <Route path="/offer/create" element={<CreateTargetedOfferForm/>}/>
            <Route path="/offer/create/:id" element={<CreateTargetedOfferForm/>}/>
            <Route path="*" element={<Page404/>}/>
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
        case "admin":
            path = "/admin";
            break;
        case "profile":
            path = "/user/%id%";
            break;
        case "createOffer":
            path = "/offer/create";
            break;
        case "createCounteroffer":
            path = "/offer/create/%id%";
            break;
        case "home":
        default:
            path = "/";
    }
    return path;
}

export default Routes;
