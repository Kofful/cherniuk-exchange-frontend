import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

const OfferCreatingButton = ({isCreatingOffer, setIsCreatingOffer}) => {
    const changeIsCreatingOffer = () => {
        setIsCreatingOffer(!isCreatingOffer);
    };

    return (
        <button className="btn btn-secondary float-right" onClick={changeIsCreatingOffer}>
            {isCreatingOffer ?
                <FormattedMessage
                    id="hide"
                    defaultMessage="Hide"
                />
                :
                <FormattedMessage
                    id="offer.create"
                    defaultMessage="Create offer"
                />
            }
        </button>
    );
};

OfferCreatingButton.propTypes = {
    isCreatingOffer: PropTypes.bool,
    setIsCreatingOffer: PropTypes.func
};

OfferCreatingButton.defaultProps = {
    isCreatingOffer: false,
    setIsCreatingOffer: () => {}
};

export default OfferCreatingButton;
