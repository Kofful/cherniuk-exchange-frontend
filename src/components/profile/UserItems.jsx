import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getUserItems} from "../../api/user";
import Spinner from "../spinner/Spinner";
import StickerCard from "./StickerCard";
import {FormattedMessage} from "react-intl";
import {useCookies, withCookies} from "react-cookie";
import PageButtons from "../pagination/PageButtons";

const UserItems = ({userId}) => {
    const ITEMS_PER_PAGE = 25;
    const [cookies] = useCookies();

    const [page, changePage] = useState(1);
    const [maxPages, changeMaxPages] = useState(1);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadItems = async () => {
        try {
            const result = await getUserItems(userId, cookies.token);
            setItems(result.stickers);
            changeMaxPages(Math.floor((result.count - 1) / ITEMS_PER_PAGE) + 1);
        } catch (e) {
            setItems([]);
            changeMaxPages(1);
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
                <>
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
                                        <StickerCard sticker={item.sticker} itemId={item.id} loadItems={loadItems}
                                                     key={item.id}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <PageButtons changePage={changePage} page={page} maxPages={maxPages}/>
                </>
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
