import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import StickerGiver from "./StickerGiver";
import {route} from "../../../routes";

const UserDropDown = ({user}) => {
    /*TODO change links in future features when routes are created
    links to change:
        /offer/create
     */

    const linkToProfile = route("profile").replace("%id%", user.id);

    return (
        <>
            <li className="dropdown-item p-0">
                <Link to={linkToProfile} className="btn w-100 text-left text-reset text-decoration-none">
                    <FormattedMessage
                        id="user.profile"
                        defaultMessage="Profile"
                    />
                </Link>
            </li>
            <li className="dropdown-item p-0">
                <StickerGiver user={user}/>
            </li>
            <li className="dropdown-item p-0">
                <Link to={"/offer/create"} className="btn w-100 text-left text-reset text-decoration-none">
                    <FormattedMessage
                        id="offer.create"
                        defaultMessage="Create offer"
                    />
                </Link>
            </li>
        </>
    );
};

UserDropDown.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        wallet: PropTypes.number,
        rewardedAt: PropTypes.number
    }),
};

UserDropDown.defaultProps = {
    user: {
        id: 0,
        username: "",
        wallet: "",
        rewardedAt: Date.now()
    }
}

export default UserDropDown;
