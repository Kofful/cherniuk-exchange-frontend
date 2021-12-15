import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import SelectingItemsContainer from "./SelectingItemsContainer";

const SelectingItemsForm = ({template, items, updateItems, loadMore}) => {
    const {header} = template;

    const moveItem = (source, destination, itemKey) => {
        const movedItem = source.find(item => item.reactKey === itemKey);
        const newSource = source.filter(item => item.reactKey !== itemKey);
        const newDestination = destination.concat(movedItem);
        return [newSource, newDestination];
    };

    const selectItem = (itemKey) => {
        const {selecting, selected} = {...items};
        const [newSelecting, newSelected] = moveItem(selecting, selected, itemKey)
        updateItems({
            ...items,
            selecting: newSelecting,
            selected: newSelected
        });
    };

    const unselectItem = (itemId) => {
        const {selecting, selected} = {...items};
        const [newSelected, newSelecting] = moveItem(selected, selecting, itemId);
        updateItems({
            ...items,
            selecting: newSelecting,
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
                <SelectingItemsContainer stickers={items.selecting} update={selectItem} loadMore={loadMore}/>
                <SelectingItemsContainer stickers={items.selected} update={unselectItem}/>
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
    loadMore: PropTypes.func
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
    loadMore: () => {}
};

export default SelectingItemsForm;
