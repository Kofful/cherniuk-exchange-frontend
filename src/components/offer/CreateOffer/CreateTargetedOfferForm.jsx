import {useParams} from "react-router-dom";
import CreateOfferForm from "./CreateOfferForm";
import {observer} from "mobx-react";
import {useStore} from "../../../stores";
import Page403 from "../../errorPages/Page403";

const CreateTargetedOfferForm = () => {
    const {id} = useParams();
    const {userStore} = useStore();
    const {user, isLoading} = userStore;
    const addresseeId = isNaN(id) ? 0 : parseInt(id);

    const isForbidden = !isLoading && (!user || user.id === addresseeId);

    return (
        <>
            {isForbidden && <Page403/>}
            {!isForbidden && <CreateOfferForm addresseeId={addresseeId}/>}
        </>
    );
};

export default observer(CreateTargetedOfferForm);
