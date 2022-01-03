import {useStore} from "../../stores";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import OfferContainer from "./OfferContainer";
import PageButtons from "../pagination/PageButtons";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

const OfferListContainer = ({getOffers, isOpen}) => {
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

    const removeOffer = (offerId) => {
        const newOfferList = offerList.filter(item => item.id !== offerId);
        setOfferList(newOfferList);
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
                    creatorPayment={offer.creatorPayment}
                    targetPayment={offer.targetPayment}
                    creator={offer.creator}
                    isAcceptingPermitted={isOpen && !!user && user.id !== offer.creator.id}
                    isRemovingPermitted={isOpen && !!user && user.id === offer.creator.id}
                    offerId={offer.id}
                    removeFromList={removeOffer}
                    key={offer.id}
                />
            ))}

            {!isLoading && offerList.length === 0 &&
                <div className="my-5 py-5 fs-1 text-secondary w-100 d-flex justify-content-center">
                    <FormattedMessage
                        id="no.offers"
                        defaultMessage="There are no offers"
                    />
                </div>
            }
            <PageButtons page={page} changePage={setPage} maxPages={maxPages}/>
        </div>
    );
};

OfferListContainer.propTypes = {
    getOffers: PropTypes.func,
    isOpen: PropTypes.bool
};

OfferListContainer.defaultProps = {
    getOffers: () => {},
    isOpen: false
};

export default observer(OfferListContainer);
