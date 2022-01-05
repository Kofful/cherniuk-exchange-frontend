import {useStore} from "../../stores";
import Spinner from "../spinner/Spinner";
import OfferContainer from "./OfferContainer";
import PageButtons from "../pagination/PageButtons";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

const OfferListContainer = ({isOpen, isLoading, offerList, setOfferList, page, setPage, maxPages}) => {
    const {userStore} = useStore();
    const {user} = userStore;

    const removeOffer = (offerId) => {
        const newOfferList = offerList.filter(item => item.id !== offerId);
        setOfferList(newOfferList);
    };

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
    isLoading: PropTypes.bool,
    offerList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            giveItems: PropTypes.array,
            acceptItems: PropTypes.array,
            creatorPayment: PropTypes.number,
            targetPayment: PropTypes.number,
            creator: PropTypes.shape({
                id: PropTypes.number,
                username: PropTypes.string
            })
        })
    ),
    setOfferList: PropTypes.func,
    isOpen: PropTypes.bool,
    page: PropTypes.number,
    setPage: PropTypes.func,
    maxPages: PropTypes.number,
};

OfferListContainer.defaultProps = {
    isLoading: false,
    offerList: [],
    setOfferList: () => {},
    isOpen: false,
    page: 1,
    setPage: () => {},
    maxPages: 1,
};

export default observer(OfferListContainer);
