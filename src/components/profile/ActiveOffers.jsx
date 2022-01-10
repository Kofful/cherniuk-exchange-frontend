import PropTypes from "prop-types";
import {getUserOffers} from "../../api/user";
import {useCookies, withCookies} from "react-cookie";
import OfferFormContainer from "../home/OfferFormContainer";

const ActiveOffers = ({userId}) => {
    const [cookie] = useCookies();

    const getOffers = page => {
        return getUserOffers(userId, page, cookie.token);
    };

    return (
        <OfferFormContainer getOffers={getOffers} isWithSearch={false} isOpen={true}/>
    );
};

ActiveOffers.propTypes = {
    userId: PropTypes.number
};

ActiveOffers.defaultProps = {
    userId: 0
};

export default withCookies(ActiveOffers);
