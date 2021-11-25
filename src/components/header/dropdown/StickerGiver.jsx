import {FormattedMessage, useIntl} from "react-intl";
import {useState} from "react";
import {giveSticker} from "../../../api/stickers";
import {useCookies} from "react-cookie";
import {useToasts} from "react-toast-notifications";
import {useStore} from "../../../stores";

const StickerGiver = () => {
    const {userStore} = useStore();
    const {user, setUser} = userStore;
    const difference = Math.floor(Date.now() / 1000 - user.rewardedAt);

    const [interval, updateInterval] = useState(600 - difference);

    const [cookies] = useCookies();

    const {addToast} = useToasts();

    const intl = useIntl();

    const getSticker = async () => {
        try {
            await giveSticker(cookies.token);
            const newUser = Object.assign({}, user);
            newUser.rewardedAt = Math.round(Date.now() / 1000);
            setUser(newUser);
            updateInterval(600);
        } catch (e) {
            addToast(intl.formatMessage({
                id: "error.appeared",
                defaultMessage: "Some error appeared. Please, retry later."
            }), {
                appearance: "error",
                placement: "bottom-right",
                autoDismiss: false
            });
        }
    };

    const updateTimer = () => {
        const newDifference = Math.floor(Date.now() / 1000 - user.rewardedAt);
        updateInterval(600 - newDifference);
    };

    if(interval > 0) {
        setTimeout(updateTimer, 1000);
    }

    const minutesLeft = Math.floor(interval / 60);
    const secondsLeft = ("0" + Math.round(interval % 60)).slice(-2);
    const timeLeft = minutesLeft + ":" + secondsLeft;

    return (
        <div className={"btn w-100 text-left text-reset " + (interval > 0 ? "disabled" : "")}  onClick={getSticker}>
            <FormattedMessage
                id="get.sticker"
                defaultMessage="Get sticker"
            />
            <span className="ps-3 fs-6 text-danger">
                {interval > 0 && timeLeft}
            </span>
        </div>
    );
};


export default StickerGiver;
