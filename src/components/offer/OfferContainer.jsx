import OfferItemsContainer from "./OfferItemsContainer";
import PropTypes from "prop-types";
import AcceptOfferButtons from "./AcceptOffer/AcceptOfferButtons";
import OfferCreatorInfo from "./OfferCreatorInfo";
import RemoveOfferButtons from "./RemoveOffer/RemoveOfferButtons";
import OfferPaymentsInfo from "./OfferPayment/OfferPaymentsInfo";
import {useCookies, withCookies} from "react-cookie";
import {removeOffer} from "../../api/offer";
import {useToasts} from "react-toast-notifications";
import {useIntl} from "react-intl";

const OfferContainer = (
    {
        giveItems,
        acceptItems,
        creatorPayment,
        targetPayment,
        creator,
        isAcceptingPermitted,
        isRemovingPermitted,
        offerId,
        removeFromList
    }
) => {
    const [cookie] = useCookies();
    const {addToast} = useToasts();
    const intl = useIntl();

    const setReactKeys = items => {
        return items.map((item, index) => ({...item, reactKey: index}));
    };

    const give = setReactKeys(giveItems);
    const accept = setReactKeys(acceptItems);

    const acceptOffer = async () => {
        console.log("accept");
    };

    const remove = async () => {
        try {
            await removeOffer(offerId, cookie.token);
            removeFromList(offerId);
            addToast(
                intl.formatMessage({
                    id: "offer.removed",
                    defaultMessage: "The offer has ben removed"
                }),
                {
                    appearance: "info",
                    placement: "bottom-right",
                    autoDismiss: false
                })
        } catch (e) {
            if (e.status === 403) {
                e.data.forEach(message => {
                    addToast(
                        message,
                        {
                            appearance: "error",
                            placement: "bottom-right",
                            autoDismiss: false
                        }
                    );
                })
            } else {
                addToast(intl.formatMessage({
                    id: "error.appeared",
                    defaultMessage: "Some error appeared. Please, retry later."
                }), {
                    appearance: "error",
                    placement: "bottom-right",
                    autoDismiss: false
                });
            }
        }
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
            {isRemovingPermitted && <RemoveOfferButtons removeOffer={remove}/>}
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
    isRemovingPermitted: PropTypes.bool,
    offerId: PropTypes.number,
    removeFromList: PropTypes.func
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
    isRemovingPermitted: false,
    offerId: 0,
    removeFromList: () => {}
};

export default withCookies(OfferContainer);
