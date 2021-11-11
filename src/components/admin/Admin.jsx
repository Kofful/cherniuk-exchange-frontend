import {useStore} from "../../stores";
import {observer} from "mobx-react";
import Page403 from "../errorPages/Page403";
import Loader from "react-loader-spinner";

const Admin = () => {
    const {userStore} = useStore();
    const {user, isLoading} = userStore;

    if (!isLoading && (!user || !user.roles.includes("ROLE_ADMIN"))) {
        return (
            <Page403/>
        );
    }

    return (
        <>
            {user && <p>{user.username}</p>}
            {isLoading === true && <div className="position-absolute d-flex justify-content-center align-items-center top-50 w-100">
                <Loader type="BallTriangle"
                                           color="#6600CC"
                                           height={100}
                                           width={100}/>
            </div>}
        </>
    );
};

export default observer(Admin);
