import {useCookies, withCookies} from "react-cookie";
import OfferListContainer from "../offer/OfferListContainer";
import {getIncomingOffers} from "../../api/user";

const IncomingOffers = () => {
    const [cookie] = useCookies();

    const getOffers = page => {
        return getIncomingOffers(page, cookie.token);
    };

    return (
        <OfferListContainer getOffers={getOffers}/>
    );
};

export default withCookies(IncomingOffers);