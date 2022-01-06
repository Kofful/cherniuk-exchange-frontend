import {useIntl} from "react-intl";
import PropTypes from "prop-types";

const SearchQuery = ({updateQuery}) => {
    const intl = useIntl();
    const placeholder = intl.formatMessage({
            id: "sticker.search.by.name",
            defaultMessage: "Search by name..."
    });

    return (
        <div className="d-flex align-items-center w-100">
            <input className="form-control w-100"
                   placeholder={placeholder}
                   onChange={e => updateQuery(e.target.value)}
            />
        </div>
    );
};

SearchQuery.propTypes = {
    updateQuery: PropTypes.func
};

SearchQuery.defaultProps = {
    updateQuery: () => {}
};

export default SearchQuery;
