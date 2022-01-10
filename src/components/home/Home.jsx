import OfferFormContainer from "./OfferFormContainer";
import {getOffers} from "../../api/offer";

const Home = () => {
    return (
        <div>
            <OfferFormContainer getOffers={getOffers} isWithSearch={true} isOpen={true}/>
        </div>
    );
};

export default Home;
