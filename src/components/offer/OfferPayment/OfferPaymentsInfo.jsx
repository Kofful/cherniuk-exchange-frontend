import PropTypes from "prop-types";
import OfferPayment from "./OfferPayment";

const OfferPaymentsInfo = ({creatorPayment, targetPayment}) => {
    return (
        <div className="w-100 d-flex text-white-50 justify-content-between border-bottom border-secondary px-3">
            <OfferPayment payment={creatorPayment}/>
            <OfferPayment payment={targetPayment}/>
        </div>
    );
};

OfferPaymentsInfo.propTypes = {
    creatorPayment: PropTypes.number,
    targetPayment: PropTypes.number
};

OfferPaymentsInfo.defaultProps = {
    creatorPayment: 0,
    targetPayment: 0
};

export default OfferPaymentsInfo;
