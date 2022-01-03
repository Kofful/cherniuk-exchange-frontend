import PropTypes from "prop-types";
import OfferListContainer from "../offer/OfferListContainer";
import {getUserOffers} from "../../api/user";
import {useCookies, withCookies} from "react-cookie";

const ActiveOffers = ({userId}) => {
    const [cookie] = useCookies();

    const getOffers = page => {
        return getUserOffers(userId, page, cookie.token);
    };

    return (
        <OfferListContainer getOffers={getOffers} isOpen={true}/>
    );
};

ActiveOffers.propTypes = {
    userId: PropTypes.number
};

ActiveOffers.defaultProps = {
    userId: 0
};

export default withCookies(ActiveOffers);
