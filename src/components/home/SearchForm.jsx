import {FormattedMessage} from "react-intl";
import SearchPartsForm from "./SearchPastsForm";
import ItemsToAcceptTemplate from "../../templates/offer/ItemsToAcceptTemplate";
import ItemsToGiveTemplate from "../../templates/offer/ItemsToGiveTemplate";
import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({creatorQuery, setCreatorQuery, targetQuery, setTargetQuery}) => {
    return (
        <div className="d-flex flex-column mt-3 align-items-center border border-secondary rounded">
                <span className="fs-3">
                    <FormattedMessage
                        id="offers.search"
                        defaultMessage="Search offers"
                    />
                </span>
        <div className="d-flex w-100">
            <SearchPartsForm
                template={ItemsToAcceptTemplate}
                query={creatorQuery}
                updateQuery={setCreatorQuery}
            />
            <SearchPartsForm
                template={ItemsToGiveTemplate}
                query={targetQuery}
                updateQuery={setTargetQuery}
            />
        </div>
    </div>
    );
};

const queryShape = PropTypes.shape({
    minPayment: PropTypes.number,
    maxPayment: PropTypes.number,
    stickerName: PropTypes.string
});

const defaultQuery = {
    minPayment: 0,
    maxPayment: 10000,
    stickerName: ""
};

SearchForm.propTypes = {
    creatorQuery: queryShape,
    setCreatorQuery: PropTypes.func,
    targetQuery: queryShape,
    setTargetQuery: PropTypes.func
};

SearchForm.defaultProps = {
    creatorQuery: defaultQuery,
    setCreatorQuery: () => {},
    targetQuery: defaultQuery,
    setTargetQuery: () => {}
};

export default SearchForm;
