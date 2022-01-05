import {Handle, Range, SliderTooltip} from "rc-slider";
import 'rc-slider/assets/index.css';
import PropTypes from "prop-types";

const SearchRange = ({minPayment, maxPayment, updatePayments}) => {
    const handle = props => {
        const { value, dragging, index, ...restProps} = props;
        return (
            <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    };

    const change = props => {
        const [newMin, newMax] = props;
        updatePayments(newMin, newMax);
    };

    return (
        <Range
            min={0}
            max={10000}
            value={[minPayment, maxPayment]}
            defaultValue={[0, 10000]}
            handle={handle}
            onChange={change}
        />
    );
};

SearchRange.propTypes = {
    minPayment: PropTypes.number,
    maxPayment: PropTypes.number,
    updatePayments: PropTypes.func,
};

SearchRange.defaultProps = {
    minPayment: 0,
    maxPayment: 10000,
    updatePayments: () => {},
};

export default SearchRange;
