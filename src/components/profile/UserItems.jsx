import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getUserItems} from "../../api/user";
import Spinner from "../spinner/Spinner";
import StickerCard from "./StickerCard";
import {FormattedMessage} from "react-intl";
import {useCookies, withCookies} from "react-cookie";

const UserItems = ({userId}) => {
    const [cookies] = useCookies();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadItems = async () => {
        try {
            const result = await getUserItems(userId, cookies.token);
            setItems(result);
        } catch (e) {
            setItems([]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, [userId]);

    return (
        <>
            {isLoading && <Spinner/>}

            {!isLoading && items.length > 0 &&
                <div>
                    <h2 className="ms-5">
                        <FormattedMessage
                            id="inventory"
                            defaultMessage="Inventory"
                        />
                    </h2>
                    <div className="d-flex flex-wrap">
                        {
                            items.map((item) => {
                                return (
                                    <StickerCard sticker={item.sticker} itemId={item.id} loadItems={loadItems} key={item.id}/>
                                );
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
};

UserItems.propTypes = {
    userId: PropTypes.number
};

UserItems.defaultProps = {
    userId: 0
};

export default withCookies(UserItems);
