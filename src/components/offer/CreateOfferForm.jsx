import SelectingItemsForm from "./SelectingItemsForm";
import ItemsToGiveTemplate from "../../templates/offer/ItemsToGiveTemplate";
import ItemsToAcceptTemplate from "../../templates/offer/ItemsToAcceptTemplate";
import PropTypes from "prop-types";
import {getUserItems} from "../../api/user";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {useStore} from "../../stores";
import {observer} from "mobx-react";
import {getStickers} from "../../api/stickers";
import {FormattedMessage} from "react-intl";

const CreateOfferForm = ({addresseeId}) => {
    const {userStore} = useStore();
    const {user} = userStore;

    const [ownPage, changeOwnPage] = useState(1);
    const [maxOwnPages, changeMaxOwnPages] = useState(1);
    const [acceptPage, changeAcceptPage] = useState(1);
    const [maxAcceptPages, changeMaxAcceptPages] = useState(1);

    const [giveItems, updateGiveItems] = useState({
        payment: "0",
        selecting: [],
        selected: []
    });

    const [acceptItems, updateAcceptItems] = useState({
        payment: "0",
        selecting: [],
        selected: []
    });

    const [cookie] = useCookies();

    const getOwnItems = async () => {
        const items = await getUserItems(user.id, ownPage, cookie.token);
        const newSelecting = giveItems.selecting.concat(
            items.stickers.map(item => {
                    const newItem = {...item.sticker, id: item.id};
                    return newItem;
                }
            )
        );

        const maxPages = Math.floor((items.count - 1) / process.env.REACT_APP_USER_ITEMS_PER_PAGE) + 1;
        changeMaxOwnPages(maxPages)

        updateGiveItems({
            ...giveItems,
            selecting: newSelecting
        });
    };

    const getAcceptItems = async () => {
        let items;
        let maxPages;
        if (addresseeId === 0) {
            const response = await getStickers(acceptPage, cookie.token);
            items = response.stickers;
            maxPages = Math.floor((response.count - 1) / process.env.REACT_APP_STICKERS_PER_PAGE) + 1;
        } else {
            const response = await getUserItems(addresseeId, acceptPage, cookie.token);
            items = response.stickers.map(item => {
                return item.sticker;
            });
            maxPages = Math.floor((response.count - 1) / process.env.REACT_APP_USER_ITEMS_PER_PAGE) + 1;
        }
        changeMaxAcceptPages(maxPages)
        const newItems = acceptItems.selecting.concat(items);

        updateAcceptItems({
            ...acceptItems,
            selecting: newItems
        });
    };

    const loadMoreOwnItems = () => {
        if (ownPage < maxOwnPages) {
            changeOwnPage(ownPage + 1);
        }
    };

    const loadMoreAcceptItems = () => {
        if (acceptPage < maxAcceptPages) {
            changeAcceptPage(acceptPage + 1);
        }
    };

    const create = async () => {
        console.log(giveItems, acceptItems);
    };

    const userId = user ? user.id : 0;

    useEffect(() => {
        if (user) {
            getOwnItems();
        }
    }, [userId, ownPage]);

    useEffect(() => {
        if (user) {
            getAcceptItems();
        }
    }, [userId, acceptPage]);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mt-3">
                <SelectingItemsForm
                    template={ItemsToGiveTemplate}
                    items={giveItems}
                    updateItems={updateGiveItems}
                    loadMore={loadMoreOwnItems}
                />
                <SelectingItemsForm
                    template={ItemsToAcceptTemplate}
                    items={acceptItems}
                    updateItems={updateAcceptItems}
                    loadMore={loadMoreAcceptItems}
                />
            </div>
            <button className="btn btn-secondary w-50 fs-5 mt-4 align-self-center" onClick={create}>
                <FormattedMessage
                    id="offer.create"
                    defaultMessage="Create offer"
                />
            </button>
        </div>
    );
};

CreateOfferForm.propTypes = {
    addresseeId: PropTypes.number
};

CreateOfferForm.defaultProps = {
    addresseeId: 0
};

export default observer(CreateOfferForm);
