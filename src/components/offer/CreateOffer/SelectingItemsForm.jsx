import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import OfferItemsContainer from "../OfferItemsContainer";

const SelectingItemsForm = ({template, items, updateItems, loadMore, isLimited}) => {
    const {header} = template;

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
        const limitedSelecting = isLimited ? newSelecting : selecting;
        updateItems({
            ...items,
            selecting: limitedSelecting,
            selected: newSelected
        });
    };

    const unselectItem = (itemId) => {
        const {selecting, selected} = {...items};
        const [newSelected, newSelecting] = moveItem(selected, selecting, itemId);
        const limitedSelecting = isLimited ? newSelecting : selecting;
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
            <h3>
                <FormattedMessage
                    id={header.id}
                    defaultMessage={header.defaultMessage}
                />
            </h3>
            <div className="d-flex">
                <label className="fs-5 me-3">
                    <FormattedMessage
                        id="offer.payment"
                        defaultMessage="Payment"
                    />
                    :
                </label>
                <input className="form-control w-25" type="number" value={items.payment} onChange={e => updatePayment(e.target.value)}/>
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
    loadMore: PropTypes.func,
    isLimited: PropTypes.bool
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
    loadMore: () => {},
    isLimited: true
};

export default SelectingItemsForm;
