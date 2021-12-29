import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import AcceptOfferButtons from "../AcceptOffer/AcceptOfferButtons";

const RemoveOfferButtons = ({removeOffer}) => {
    return (
        <div className="w-100 d-flex justify-content-end border-top border-secondary">
            <button
                className="btn btn-danger m-2"
                onClick={removeOffer}
            >
                <FormattedMessage
                    id="offer.remove"
                    defaultMessage="Remove offer"
                />
            </button>
        </div>
    );
};

AcceptOfferButtons.propTypes = {
    removeOffer: PropTypes.func
};

AcceptOfferButtons.defaultProps = {
    removeOffer: () => {}
};

export default RemoveOfferButtons;