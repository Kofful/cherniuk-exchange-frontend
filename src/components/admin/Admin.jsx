import {useStore} from "../../stores";
import {observer} from "mobx-react";
import Page403 from "../errorPages/Page403";

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
            {isLoading === true && <p>Loading...</p>}
        </>
    );
};

export default observer(Admin);
