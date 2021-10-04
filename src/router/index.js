import { createWebHistory, createRouter } from "vue-router";
import Home from "/src/components/home/Home";
import Login from "/src/components/login/Login";
import Register from "../components/register/Register";
import Confirm from "../components/confirm/Confirm";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/confirm",
        name: "Confirm",
        component: Confirm,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;