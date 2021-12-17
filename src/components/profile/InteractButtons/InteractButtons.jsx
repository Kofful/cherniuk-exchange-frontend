import PropTypes from "prop-types";
import OfferCreatingButton from "./OfferCreatingButton";

const InteractButtons = ({loggedInUserId, userId, isCreatingOffer, setIsCreatingOffer}) => {
    const canShowOfferButton = loggedInUserId && userId !== loggedInUserId;

    return (
        <div className="flex-row px-5">
            {canShowOfferButton &&
                <OfferCreatingButton
                    isCreatingOffer={isCreatingOffer}
                    setIsCreatingOffer={setIsCreatingOffer}
                />
            }
        </div>
    );
};

InteractButtons.propTypes = {
    loggedInUserId: PropTypes.number,
    userId: PropTypes.number,
    isCreatingOffer: PropTypes.bool,
    setIsCreatingOffer: PropTypes.func
};

InteractButtons.defaultProps = {
    loggedInUserId: 0,
    userId: 0,
    isCreatingOffer: false,
    setIsCreatingOffer: () => {}
}

export default InteractButtons;
