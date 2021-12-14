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
        const items = await getUserItems(user.id, cookie.token);
        const selecting = items.stickers.map(item => {
            const newItem = {...item.sticker, id: item.id};
            return newItem;
        });

        updateGiveItems({
            ...giveItems,
            selecting
        });
    };

    const getAcceptItems = async () => {
        let items;
        if (addresseeId === 0) {
            const response = await getStickers(1, cookie.token);
            items = response.stickers;
        } else {
            items = await getUserItems(addresseeId, cookie.token);
            items = items.stickers.map(item => {
                return item.sticker;
            });
        }
        updateAcceptItems({
            ...acceptItems,
            selecting: items
        });
    };

    const create = async () => {
        console.log(giveItems, acceptItems);
    };

    useEffect(() => {
        if (user) {
            getOwnItems();
            getAcceptItems();
        }
    }, [user]);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mt-3">
                <SelectingItemsForm
                    template={ItemsToGiveTemplate}
                    items={giveItems}
                    updateItems={updateGiveItems}
                />
                <SelectingItemsForm
                    template={ItemsToAcceptTemplate}
                    items={acceptItems}
                    updateItems={updateAcceptItems}
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
