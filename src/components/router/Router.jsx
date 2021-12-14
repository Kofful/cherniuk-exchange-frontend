import {BrowserRouter} from "react-router-dom";
import HeaderNav from "../header/HeaderNav";
import Routes from "../../routes";
import {useStore} from "../../stores";
import {useEffect} from "react";
import {getUser} from "../../api/user";
import {useCookies} from "react-cookie";

const Router = () => {
    const {userStore} = useStore();

    const [cookies] = useCookies();

    useEffect(() => {
        const setUser = async () => {
            userStore.setIsLoading(true);
            try {
                const json = await getUser(cookies.token);
                json.user.rewardedAt = Math.round(new Date(json.user.rewarded_at).getTime() / 1000);
                userStore.setUser(json.user);
            } catch (e) {
                userStore.setUser(null);
            }
        }
        setUser();
    }, [userStore, cookies.token]);


    return (
        <BrowserRouter>
            <HeaderNav/>
            <div className="container">
                <Routes/>
            </div>
        </BrowserRouter>
    );
};

export default Router;
