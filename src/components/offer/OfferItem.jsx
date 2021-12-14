import {useCookies} from "react-cookie";
import {getImage} from "../../services/imageService";
import PropTypes from "prop-types";
import "./styles.css";

const OfferItem = ({sticker, update}) => {
    return (
        <div className="m-0 user-select-none" title={sticker.name} onClick={() => update(sticker.id)}>
            <img className="offer-item" src={getImage(sticker.path)} alt={"Sticker"}/>
        </div>
    );
};

OfferItem.propTypes = {
    sticker: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string,
        price: PropTypes.number
    }),
    update: PropTypes.func
};

OfferItem.defaultProps = {
    sticker: {
        id: 0,
        name: "",
        path: "",
        price: 0
    },
    update: () => {}
};

export default OfferItem;
