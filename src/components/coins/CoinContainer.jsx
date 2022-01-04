import PropTypes from "prop-types";
import {getImage} from "../../services/imageService";
import "./styles.css";

const CoinContainer = ({coins}) => {
    return (
        <div className="d-flex text-white">
            <span className="coin-count">{coins}</span>
            <img className="ms-1 coin-icon" alt="Coin" src={getImage("/public/img/coin.png")}/>
        </div>
    );
};

CoinContainer.propTypes = {
    coins: PropTypes.number
};

CoinContainer.propTypes = {
    coins: 0
};

export default CoinContainer;
