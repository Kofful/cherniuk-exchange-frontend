import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserInfo} from "../../api/user";
import Page404 from "../errorPages/Page404";
import Spinner from "../spinner/Spinner";

const Profile = () => {
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await getUserInfo(id);
                setUser(result);
            } catch (e) {
                setUser(null);
            }
            setIsLoading(false);
        };

        loadUser();
    }, [id]);

    return (
        <div className="d-flex justify-content-center">
            {isLoading && <Spinner/>}

            {!isLoading && !user && <Page404/>}

            {!isLoading && user &&
            <h2>
                {user.username}
            </h2>
            }
        </div>
    );
};

export default Profile;
