import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import OfferItemsContainer from "../OfferItemsContainer";
import PaymentInput from "./PaymentInput";
import SearchInput from "./SearchInput";
import {getStickers} from "../../../api/stickers";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getUserItems} from "../../../api/user";

const SelectingItemsForm = ({template, items, updateItems, userId}) => {
    const {header} = template;

    const [cookie] = useCookies();

    const [page, changePage] = useState(1);
    const [maxPages, changeMaxPages] = useState(1);
    const [query, setQuery] = useState("");

    const getItems = async () => {
        let newItems;
        let maxPages;
        if (userId === 0) {
            const response = await getStickers(page, cookie.token, query);
            newItems = response.stickers.map(sticker => ({...sticker, reactKey: sticker.id}));
            maxPages = Math.floor((response.count - 1) / process.env.REACT_APP_STICKERS_PER_PAGE) + 1;
        } else {
            newItems = await getUserItems(userId, page, cookie.token, query);
            maxPages = Math.floor((newItems.count - 1) / process.env.REACT_APP_USER_ITEMS_PER_PAGE) + 1;
            newItems = newItems.stickers.map(item => {
                    return {...item.sticker, reactKey: item.id};
                }
            );
        }
        newItems = items.selecting.concat(newItems);

        changeMaxPages(maxPages)

        updateItems({
            ...items,
            selecting: newItems
        });
    };

    const loadMore = () => {
        if (page < maxPages) {
            changePage(page + 1);
        }
    };

    const updateQuery = (query) => {
        updateItems({
            payment: "0",
            selecting: [],
            selected: []
        });
        setQuery(query);
        changePage(1);
    };

    useEffect(() => {
        if(userId !== -1) {
            getItems();
        }
    }, [userId, page, query]);

    const moveItem = (source, destination, itemKey) => {
        const movedItem = {...source.find(item => item.reactKey === itemKey), reactKey: Date.now()};
        const newSource = source.filter(item => item.reactKey !== itemKey);
        const newDestination = destination.concat(movedItem);
        return [newSource, newDestination];
    };

    const selectItem = (itemKey) => {
        const {selecting, selected} = {...items};
        const [newSelecting, newSelected] = moveItem(selecting, selected, itemKey);
        //limitedSelecting decides either to remove items from selecting or leave them in array:
        //if items are limited (chosen from user inventory) - update selecting;
        //if items are unlimited (chosen from sticker list) - leave selecting as it was;
        const limitedSelecting = !!userId ? newSelecting : selecting;
        updateItems({
            ...items,
            selecting: limitedSelecting,
            selected: newSelected
        });
    };

    const unselectItem = (itemId) => {
        const {selecting, selected} = {...items};
        const [newSelected, newSelecting] = moveItem(selected, selecting, itemId);
        const limitedSelecting = !!userId ? newSelecting : selecting;
        updateItems({
            ...items,
            selecting: limitedSelecting,
            selected: newSelected
        });
    };

    const updatePayment = (payment) => {
        if(payment >= 0) {
            updateItems({
                ...items,
                payment
            });
        }
    };

    return (
        <div className="w-50">
            <div>
                <h3>
                    <FormattedMessage
                        id={header.id}
                        defaultMessage={header.defaultMessage}
                    />
                </h3>
                <PaymentInput payment={items.payment} updatePayment={updatePayment}/>
                <SearchInput updateQuery={updateQuery}/>
            </div>
            <div className="d-flex">
                <OfferItemsContainer stickers={items.selecting} update={selectItem} loadMore={loadMore}/>
                <OfferItemsContainer stickers={items.selected} update={unselectItem}/>
            </div>
        </div>
    );
};

SelectingItemsForm.propTypes = {
    template: PropTypes.shape({
        header: PropTypes.shape({
            id: PropTypes.string,
            defaultMessage: PropTypes.string
        })
    }),
    items: PropTypes.shape({
        payment: PropTypes.string,
        selecting: PropTypes.array,
        selected: PropTypes.array
    }),
    updateItems: PropTypes.func,
    userId: PropTypes.number
};

SelectingItemsForm.defaultProps = {
    template: {
        header: {
            id: "",
            defaultMessage: ""
        }
    },
    items: {
        payment: "0",
        selecting: [],
        selected: []
    },
    updateItems: () => {},
    userId: 0
};

export default SelectingItemsForm;
