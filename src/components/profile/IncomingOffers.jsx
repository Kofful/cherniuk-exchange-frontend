import {useCookies, withCookies} from "react-cookie";
import {getIncomingOffers} from "../../api/user";
import OfferFormContainer from "../home/OfferFormContainer";

const IncomingOffers = () => {
    const [cookie] = useCookies();

    const getOffers = page => {
        return getIncomingOffers(page, cookie.token);
    };

    return (
        <OfferFormContainer getOffers={getOffers} isWithSearch={false} isOpen={true}/>
    );
};

export default withCookies(IncomingOffers);