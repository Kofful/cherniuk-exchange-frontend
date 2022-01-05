import PropTypes from "prop-types";
import SearchRange from "./SearchRange";
import {FormattedMessage} from "react-intl";
import SearchQuery from "./SearchQuery";

const SearchPartsForm = ({template, query, updateQuery}) => {
    const {header} = template;

    const updatePayments = (newMin, newMax) => {
        updateQuery({
            ...query,
            minPayment: newMin,
            maxPayment: newMax
        });
    };

    const updateStickerName = newStickerName => {
        updateQuery({
            ...query,
            stickerName: newStickerName
        });
    };

    return (
        <div className="d-flex flex-column w-50 m-2 p-2">
            <h3 className="m-0">
                <FormattedMessage
                    id={header.id}
                    defaultMessage={header.defaultMessage}
                />
            </h3>
            <div className="mt-4">
                <label className="fs-6 m-0">
                    <FormattedMessage
                        id="sticker.name"
                        defaultMessage="Sticker name"
                    />
                </label>
                <SearchQuery updateQuery={updateStickerName}/>
            </div>
            <div className="mt-4">
                <label className="fs-6 m-0">
                    <FormattedMessage
                        id="offer.payment"
                        defaultMessage="Payment"
                    />
                    :
                </label>
                <SearchRange
                    minPayment={query.minPayment}
                    maxPayment={query.maxPayment}
                    updatePayments={updatePayments}
                />
            </div>
        </div>
    );
};

SearchPartsForm.propTypes = {
    template: PropTypes.shape({
        header: PropTypes.shape({
            id: PropTypes.string,
            defaultMessage: PropTypes.string
        })
    }),
    query: PropTypes.shape({
        minPayment: PropTypes.number,
        maxPayment: PropTypes.number,
        stickerName: PropTypes.string
    }),
    updateQuery: PropTypes.func
};

SearchPartsForm.defaultProps = {
    template: {
        header: {
            id: "",
            defaultMessage: ""
        }
    },
    query: PropTypes.shape({
        minPayment: 0,
        maxPayment: 10000,
        stickerName: ""
    }),
    updateQuery: PropTypes.func
};

export default SearchPartsForm;
