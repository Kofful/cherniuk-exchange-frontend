import PropTypes from "prop-types";
import {getUserHistory} from "../../api/user";
import OfferFormContainer from "../home/OfferFormContainer";

const PastOffers = ({userId}) => {
    const getOffers = page => {
        return getUserHistory(userId, page);
    };

    return (
        <OfferFormContainer getOffers={getOffers} isWithSearch={false} isOpen={false}/>
    );
};

PastOffers.propTypes = {
    userId: PropTypes.number
};

PastOffers.defaultProps = {
    userId: 0
};

export default PastOffers;
