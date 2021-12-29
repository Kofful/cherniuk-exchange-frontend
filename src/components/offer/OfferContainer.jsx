import OfferItemsContainer from "./OfferItemsContainer";
import PropTypes from "prop-types";
import AcceptOfferButtons from "./AcceptOffer/AcceptOfferButtons";
import OfferCreatorInfo from "./OfferCreatorInfo";
import RemoveOfferButtons from "./RemoveOffer/RemoveOfferButtons";
import OfferPaymentsInfo from "./OfferPayment/OfferPaymentsInfo";

const OfferContainer = (
    {
        giveItems,
        acceptItems,
        creatorPayment,
        targetPayment,
        creator,
        isAcceptingPermitted,
        isRemovingPermitted
    }
) => {
    const setReactKeys = items => {
        return items.map((item, index) => ({...item, reactKey: index}));
    };

    const give = setReactKeys(giveItems);
    const accept = setReactKeys(acceptItems);

    const acceptOffer = async () => {
        console.log("accept");
    };
    const removeOffer = async () => {
        console.log("remove");
    };

    return (
        <div className="w-100 mt-5 border border-3 border-secondary rounded">
            <OfferCreatorInfo creator={creator}/>
            <OfferPaymentsInfo creatorPayment={creatorPayment} targetPayment={targetPayment}/>
            <div className="d-flex w-100 p-2">
                <OfferItemsContainer stickers={give}/>
                <OfferItemsContainer stickers={accept}/>
            </div>
            {isAcceptingPermitted && <AcceptOfferButtons creatorId={creator.id} acceptOffer={acceptOffer}/>}
            {isRemovingPermitted && <RemoveOfferButtons removeOffer={removeOffer}/>}
        </div>
    );
};

OfferContainer.propTypes = {
    giveItems: PropTypes.array,
    acceptItems: PropTypes.array,
    creatorPayment: PropTypes.number,
    targetPayment: PropTypes.number,
    creator: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string
    }),
    isAcceptingPermitted: PropTypes.bool,
    isRemovingPermitted: PropTypes.bool
};

OfferContainer.defaultProps = {
    giveItems: [],
    acceptItems: [],
    creatorPayment: 0,
    targetPayment: 0,
    creator: {
        id: 0,
        username: ""
    },
    isAcceptingPermitted: false,
    isRemovingPermitted: false
};

export default OfferContainer;
