import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

const PageButtons = ({changePage, page, maxPages}) => {
    return (
        <div className="d-flex justify-content-around">
            <button
                onClick={() => changePage(page - 1)}
                className={`btn btn-secondary w-25 ${page > 1 ? "" : "invisible"}`}>
                <FormattedMessage
                    id="page.prev"
                    defaultMessage="Previous page"
                />
            </button>

            <button
                onClick={() => changePage(page + 1)}
                className={`btn btn-secondary w-25 ${page < maxPages ? "" : "invisible"}`}>
                <FormattedMessage
                    id="page.next"
                    defaultMessage="Next page"
                />
            </button>
        </div>
    );
};

PageButtons.propTypes = {
    changePage: PropTypes.func,
    page: PropTypes.number,
    maxPages: PropTypes.number
};

PageButtons.defaultProps = {
    changePage: () => {},
    page: 1,
    maxPages: 1
}

export default PageButtons;
