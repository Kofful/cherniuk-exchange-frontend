import {useStore} from "../../stores";
import {observer} from "mobx-react";
import Page403 from "../errorPages/Page403";
import Spinner from "../spinner/Spinner";
import StickerList from "./StickerList/StickerList";
import StickerForm from "./StickerForm/StickerForm";

const Admin = () => {
    const {userStore} = useStore();
    const {user, isLoading} = userStore;

    if (!isLoading && (!user || !(user.role.name === "ROLE_ADMIN"))) {
        return (
            <Page403/>
        );
    }

    return (
        <>
            {!isLoading && user &&
            <>
                <StickerList/>
                <StickerForm/>
            </>
            }
            {isLoading === true &&
            <div
                className="position-absolute d-flex justify-content-center align-items-center top-50 start-50 translate-middle">
                <Spinner/>
            </div>
            }
        </>
    );
};

export default observer(Admin);
