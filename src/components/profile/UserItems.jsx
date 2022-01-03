import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getUserItems} from "../../api/user";
import Spinner from "../spinner/Spinner";
import StickerCard from "./StickerCard";
import {useCookies, withCookies} from "react-cookie";
import PageButtons from "../pagination/PageButtons";

const UserItems = ({userId}) => {
    const [cookies] = useCookies();

    const [page, changePage] = useState(1);
    const [maxPages, changeMaxPages] = useState(1);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadItems = async () => {
        try {
            const result = await getUserItems(userId, page, cookies.token);
            setItems(result.stickers);
            changeMaxPages(Math.floor((result.count - 1) / process.env.REACT_APP_USER_ITEMS_PER_PAGE) + 1);
        } catch (e) {
            setItems([]);
            changeMaxPages(1);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, [userId, page]);

    return (
        <div className="d-flex flex-column align-items-center">
            {isLoading && <Spinner/>}

            {!isLoading && items.length > 0 &&
                <>
                    <div className="d-flex flex-wrap p-4 w-100">
                        {
                            items.map((item) => {
                                return (
                                    <StickerCard sticker={item.sticker} itemId={item.id} loadItems={loadItems}
                                                 key={item.id}/>
                                );
                            })
                        }
                    </div>
                    <PageButtons changePage={changePage} page={page} maxPages={maxPages}/>
                </>
            }
        </div>
    );
};

UserItems.propTypes = {
    userId: PropTypes.number
};

UserItems.defaultProps = {
    userId: 0
};

export default withCookies(UserItems);
