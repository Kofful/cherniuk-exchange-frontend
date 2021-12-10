import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getUserItems} from "../../api/user";
import Spinner from "../spinner/Spinner";
import StickerCard from "./StickerCard";

const UserItems = ({userId}) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const result = await getUserItems(userId);
                setItems(result);
            } catch (e) {
                setItems([]);
            }
            setIsLoading(false);
        };

        loadItems();
    }, [userId]);

    return (
        <>
            {isLoading && <Spinner/>}

            {!isLoading && items.length > 0 &&
                <div className="d-flex flex-wrap">
                    {
                        items.map((item) => {
                            return (
                                <StickerCard sticker={item.sticker} itemId={item.id} key={item.id}/>
                            );
                        })
                    }
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

export default UserItems;
