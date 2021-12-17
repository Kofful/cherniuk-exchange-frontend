import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserInfo} from "../../api/user";
import Page404 from "../errorPages/Page404";
import Spinner from "../spinner/Spinner";
import UserItems from "./UserItems";
import CreateOfferForm from "../offer/CreateOfferForm";
import {useStore} from "../../stores";
import {observer} from "mobx-react";
import InteractButtons from "./InteractButtons/InteractButtons";

const Profile = () => {
    const {id} = useParams();
    const userId = parseInt(id);
    const {userStore} = useStore();
    const loggedInUserId = userStore.user?.id;

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingOffer, setIsCreatingOffer] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await getUserInfo(userId);
                setUser(result);
            } catch (e) {
                setUser(null);
            }
            setIsLoading(false);
        };

        loadUser();
    }, [userId]);

    return (
        <div className="d-flex justify-content-center">
            {isLoading && <Spinner/>}

            {!isLoading && !user && <Page404/>}

            {!isLoading && user &&
                <div className="d-flex flex-column w-100">
                    <h2 className="align-self-center">
                        {user.username}
                    </h2>
                    <InteractButtons
                        loggedInUserId={loggedInUserId}
                        userId={userId}
                        isCreatingOffer={isCreatingOffer}
                        setIsCreatingOffer={setIsCreatingOffer}
                    />
                    {isCreatingOffer &&
                        <CreateOfferForm addresseeId={userId}/>
                    }
                    <UserItems userId={userId}/>
                </div>
            }
        </div>
    );
};

export default observer(Profile);
