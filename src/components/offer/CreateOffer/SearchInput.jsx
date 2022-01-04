import {useIntl} from "react-intl";
import PropTypes from "prop-types";

const SearchInput = ({updateQuery}) => {
    const intl = useIntl();
    const placeholder = intl.formatMessage({
            id: "sticker.search.by.name",
            defaultMessage: "Search by name..."
    });

    return (
        <div className="my-2 d-flex align-items-center">
            <input className="form-control w-50"
                   placeholder={placeholder}
                   onChange={e => updateQuery(e.target.value)}
            />
        </div>
    );
};

SearchInput.propTypes = {
    updateQuery: PropTypes.func
};

SearchInput.defaultProps = {
    updateQuery: () => {}
};

export default SearchInput;
