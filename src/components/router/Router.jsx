import {BrowserRouter} from "react-router-dom";
import HeaderNav from "../HeaderNav";
import Routes from "../../routes";
import {useStore} from "../../stores";
import {useCallback} from "react";
import {getUser} from "../../api/user";
import {useCookies} from "react-cookie";

const Router = () => {
    const {userStore} = useStore();

    const [cookies] = useCookies();

    const setUser = useCallback(async () => {
        userStore.setIsLoading(true);
        try {
            const json = await getUser(cookies.token);
            userStore.setUser(json.user);
        } catch (e) {
            userStore.setUser(null);
        }
    }, [userStore, cookies]);

    setUser();

    return (
        <BrowserRouter>
            <HeaderNav/>
            <Routes/>
        </BrowserRouter>
    );
};

export default Router;
