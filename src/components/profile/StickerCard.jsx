import PropTypes from "prop-types";
import {getImage} from "../../services/imageService";
import "./styles.css";
import {FormattedMessage} from "react-intl";
import {sellItem} from "../../api/item";
import {useCookies} from "react-cookie";
import {useToasts} from "react-toast-notifications";
import CoinContainer from "../coins/CoinContainer";
import {useStore} from "../../stores";

const StickerCard = ({itemId, sticker, loadItems}) => {
    const {userStore} = useStore();
    const [cookie] = useCookies();
    const {addToast} = useToasts();

    const sell = async () => {
        try {
            await sellItem(itemId, cookie.token);
            userStore.setUser({...userStore.user, wallet: userStore.user.wallet + sticker.price});
            loadItems();
        } catch(error) {
            addToast(
                error.data,
                {
                    appearance: "info",
                    placement: "bottom-right",
                    autoDismiss: false
                });
        }
    };

    return (
        <div className="m-0 user-select-none inventory-item dropend" title={sticker.name}>
            <img className="sticker-card" src={getImage(sticker.path)} alt={"Sticker"} data-bs-toggle="dropdown"/>
            {sticker.price &&
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-dark context-menu">
                    <div className="dropdown-item p-0" onClick={sell}>
                        <div className="btn w-100 text-left text-reset d-flex justify-content-between">
                            <FormattedMessage
                                id="sell"
                                defaultMessage="Sell"
                            />
                            <div className="ms-5">
                                <CoinContainer coins={sticker.price}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

StickerCard.propTypes = {
    sticker: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string,
        price: PropTypes.number
    }),
    itemId: PropTypes.number,
    loadItems: PropTypes.func
};

StickerCard.defaultProps = {
    sticker:{
        id: 0,
        name: "",
        path: "",
        price: 0
    },
    itemId: 0,
    loadItems: () => {}
};

export default StickerCard;
