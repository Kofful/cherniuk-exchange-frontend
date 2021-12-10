import PropTypes from "prop-types";
import {getImage} from "../../services/imageService";
import "./styles.css";

const StickerCard = ({itemId, sticker}) => {
    return (
        <div className="m-2">
            <img className="sticker-card" src={getImage(sticker.path)} alt={"Sticker"}/>
        </div>
    );
};

StickerCard.propTypes = {
    sticker: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string
    }),
    itemId: PropTypes.number
};

StickerCard.defaultProps = {
    sticker:{
        id: 0,
        name: "",
        path: ""
    },
    itemId: 0
};

export default StickerCard;
