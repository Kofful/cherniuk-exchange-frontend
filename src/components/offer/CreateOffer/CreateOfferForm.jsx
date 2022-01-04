import SelectingItemsForm from "./SelectingItemsForm";
import ItemsToGiveTemplate from "../../../templates/offer/ItemsToGiveTemplate";
import ItemsToAcceptTemplate from "../../../templates/offer/ItemsToAcceptTemplate";
import PropTypes from "prop-types";
import {useCookies} from "react-cookie";
import {useState} from "react";
import {useStore} from "../../../stores";
import {observer} from "mobx-react";
import {FormattedMessage, useIntl} from "react-intl";
import {createOffer} from "../../../api/offer";
import {useToasts} from "react-toast-notifications";
import {useNavigate} from "react-router-dom";
import {route} from "../../../routes";

const CreateOfferForm = ({addresseeId}) => {
    const {userStore} = useStore();
    const {user} = userStore;
    const {addToast} = useToasts();
    const intl = useIntl();
    const navigate = useNavigate();

    const [giveItems, updateGiveItems] = useState({
        payment: "0",
        selecting: [],
        selected: []
    });

    const [acceptItems, updateAcceptItems] = useState({
        payment: "0",
        selecting: [],
        selected: []
    });

    const [message, updateMessage] = useState("");

    const [cookie] = useCookies();

    const create = async () => {
        let messageId = "";
        if (isNaN(parseInt(giveItems.payment)) || isNaN(parseInt(acceptItems.payment))) {
            messageId = "offer.payment.not.set";
        } else if (!giveItems.selected.length && !acceptItems.selected.length) {
            messageId = "offer.items.not.selected";
        } else if (giveItems.selected.length > process.env.REACT_APP_MAX_ITEMS_IN_OFFER
            || acceptItems.selected.length > process.env.REACT_APP_MAX_ITEMS_IN_OFFER) {
            messageId = "offer.items.too.much";
        } else {
            const give = giveItems.selected.map(item => item.id);
            const accept = acceptItems.selected.map(item => item.id);

            const offer = {
                targetId: addresseeId,
                creatorPayment: parseInt(giveItems.payment),
                targetPayment: parseInt(acceptItems.payment),
                give,
                accept
            };

            try {
                await createOffer(offer, cookie.token);
                navigate(route("myOffers"));
                addToast(
                    intl.formatMessage({
                        id: "offer.created",
                        defaultMessage: "Offer created successfully"
                    }),
                    {
                        appearance: "info",
                        placement: "bottom-right",
                        autoDismiss: false
                    }
                );
            } catch (error) {
                if (error.status === 400 && error.status === 403) {
                    addToast(
                        error.data,
                        {
                            appearance: "info",
                            placement: "bottom-right",
                            autoDismiss: false
                        }
                    );
                } else {
                    addToast(
                        intl.formatMessage({
                            id: "something.went.wrong",
                            defaultMessage: "Something went wrong"
                        }),
                        {
                            appearance: "error",
                            placement: "bottom-right",
                            autoDismiss: false
                        }
                    );
                }
            }

            messageId = "";
        }
        updateMessage(messageId);
    };

    //userId 0 means we select from sticker list, -1 means user is not loaded yet
    const userId = user ? user.id : -1;

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mt-3">
                <SelectingItemsForm
                    template={ItemsToGiveTemplate}
                    items={giveItems}
                    updateItems={updateGiveItems}
                    userId={userId}
                />
                <SelectingItemsForm
                    template={ItemsToAcceptTemplate}
                    items={acceptItems}
                    updateItems={updateAcceptItems}
                    userId={addresseeId}
                />
            </div>
            <button className="btn btn-secondary w-50 fs-5 mt-4 align-self-center" onClick={create}>
                <FormattedMessage
                    id="offer.create"
                    defaultMessage="Create offer"
                />
            </button>
            {message !== "" &&
                <span className="text-danger align-self-center">
                    <FormattedMessage
                        id={message}
                    />
                </span>
            }
        </div>
    );
};

CreateOfferForm.propTypes = {
    addresseeId: PropTypes.number
};

CreateOfferForm.defaultProps = {
    addresseeId: 0
};

export default observer(CreateOfferForm);
