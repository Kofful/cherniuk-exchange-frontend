import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserInfo} from "../../api/user";
import Page404 from "../errorPages/Page404";
import Spinner from "../spinner/Spinner";
import UserItems from "./UserItems";

const Profile = () => {
    const {id} = useParams();
    const userId = parseInt(id);

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className="container d-flex justify-content-center">
            {isLoading && <Spinner/>}

            {!isLoading && !user && <Page404/>}

            {!isLoading && user &&
                <div className="d-flex flex-column w-100">
                    <h2 className="align-self-center">
                        {user.username}
                    </h2>
                    <UserItems userId={userId}/>
                </div>
            }
        </div>
    );
};

export default Profile;
