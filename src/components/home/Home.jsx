import OfferListContainer from "../offer/OfferListContainer";
import {getOffers} from "../../api/offer";

const Home = () => {
    return (
        <OfferListContainer getOffers={getOffers} isOpen={true}/>
    );
};

export default Home;
