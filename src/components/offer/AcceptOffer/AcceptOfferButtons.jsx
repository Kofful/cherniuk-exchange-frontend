import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {route} from "../../../routes";
import PropTypes from "prop-types";

const AcceptOfferButtons = ({creatorId, acceptOffer}) => {
    const navigate = useNavigate();

    const counterofferLink = route("createCounteroffer").replace("%id%", creatorId.toString());

    const makeCounteroffer = () => {
        navigate(counterofferLink);
    };

    return (
        <div className="w-100 d-flex justify-content-end border-top border-secondary">
            <button
                className="btn btn-secondary m-2"
                onClick={makeCounteroffer}
            >
                <FormattedMessage
                    id="offer.make.counteroffer"
                    defaultMessage="Make a counteroffer"
                />
            </button>
            <button
                className="btn btn-danger m-2"
                onClick={acceptOffer}
            >
                <FormattedMessage
                    id="offer.accept"
                    defaultMessage="Accept offer"
                />
            </button>
        </div>
    );
};

AcceptOfferButtons.propTypes = {
    creatorId: PropTypes.number,
    acceptOffer: PropTypes.func
};

AcceptOfferButtons.defaultProps = {
    creatorId: 0,
    acceptOffer: () => {}
};

export default AcceptOfferButtons;
