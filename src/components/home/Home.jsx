import {useEffect, useState} from "react";
import {getOffers} from "../../api/offer";
import Spinner from "../spinner/Spinner";
import OfferContainer from "../offer/OfferContainer";
import PageButtons from "../pagination/PageButtons";
import {observer} from "mobx-react";
import {useStore} from "../../stores";

const Home = () => {
    const {userStore} = useStore();
    const {user} = userStore;
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [offerList, setOfferList] = useState([]);

    const loadOffers = async () => {
        setIsLoading(true);

        const response = await getOffers(page);
        const {offers, count} = response;
        const maxPagesCount = Math.floor((count - 1) / process.env.REACT_APP_OFFERS_PER_PAGE + 1);

        setMaxPages(maxPagesCount);
        setIsLoading(false);
        setOfferList(offers);
    };

    useEffect(() => {
        loadOffers();
    }, [page]);

    return (
        <div className="d-flex flex-column align-items-center">
            {isLoading && <Spinner/>}

            {!isLoading && offerList.map(offer => (
                <OfferContainer
                    giveItems={offer.giveItems}
                    acceptItems={offer.acceptItems}
                    creator={offer.creator}
                    isAcceptingPermitted={!!user && user.id !== offer.creator.id}
                    isRemovingPermitted={!!user && user.id === offer.creator.id}
                    key={offer.id}
                />
            ))}
            <PageButtons page={page} changePage={setPage} maxPages={maxPages}/>
        </div>
    );
}

export default observer(Home);
