import SelectingItemsForm from "./SelectingItemsForm";
import ItemsToGiveTemplate from "../../templates/offer/ItemsToGiveTemplate";
import ItemsToAcceptTemplate from "../../templates/offer/ItemsToAcceptTemplate";
import PropTypes from "prop-types";
import {getUserItems as getItems} from "../../api/user";
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

    const [message, updateMessage] = useState("");

    const [cookie] = useCookies();

    const getUserItems = async (userId, page) => {
        let items = await getItems(userId, page, cookie.token);
        const maxPages = Math.floor((items.count - 1) / process.env.REACT_APP_USER_ITEMS_PER_PAGE) + 1;
        items = items.stickers.map(item => {
                return {...item.sticker, reactKey: item.id};
            }
        )
        return [items, maxPages];
    };

    const getOwnItems = async () => {
        const [items, maxPages] = await getUserItems(user.id, ownPage);
        const selecting = giveItems.selecting.concat(items);

        changeMaxOwnPages(maxPages);
        updateGiveItems({
            ...giveItems,
            selecting
        });
    };

    const getAcceptItems = async () => {
        let items;
        let maxPages;
        if (addresseeId === 0) {
            const response = await getStickers(acceptPage, cookie.token);
            items = response.stickers.map(sticker => ({...sticker, reactKey: sticker.id}));
            maxPages = Math.floor((response.count - 1) / process.env.REACT_APP_STICKERS_PER_PAGE) + 1;
        } else {
            [items, maxPages] = await getUserItems(addresseeId, acceptPage)
        }
        const newItems = acceptItems.selecting.concat(items);

        changeMaxAcceptPages(maxPages)

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
                    isLimited={true}
                />
                <SelectingItemsForm
                    template={ItemsToAcceptTemplate}
                    items={acceptItems}
                    updateItems={updateAcceptItems}
                    loadMore={loadMoreAcceptItems}
                    isLimited={false}
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
