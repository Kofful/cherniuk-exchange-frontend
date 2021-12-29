import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

const OfferPayment = ({payment}) => {
    return (
        <div>
            <span className="fs-4">
                <FormattedMessage
                    id="offer.payment"
                    defaultMessage="Payment"
                />
                : {payment}
            </span>
        </div>
    );
};

OfferPayment.propTypes = {
    payment: PropTypes.number
};

OfferPayment.defaultProps = {
    payment: 0
};

export default OfferPayment;
