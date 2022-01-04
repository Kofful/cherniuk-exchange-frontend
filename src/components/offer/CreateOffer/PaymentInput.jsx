import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

const PaymentInput = ({payment, updatePayment}) => {
    return (
        <div className="my-2 d-flex align-items-center">
            <label className="fs-5 mb-0 w-25">
                <FormattedMessage
                    id="offer.payment"
                    defaultMessage="Payment"
                />
                :
            </label>
            <input
                className="form-control w-25"
                type="number"
                value={payment}
                onChange={e => updatePayment(e.target.value)}
            />
        </div>
    );
};

PaymentInput.propTypes = {
    payment: PropTypes.string,
    updatePayment: PropTypes.func
};

PaymentInput.defaultProps = {
    payment: "0",
    updatePayment: () => {}
};

export default PaymentInput;
