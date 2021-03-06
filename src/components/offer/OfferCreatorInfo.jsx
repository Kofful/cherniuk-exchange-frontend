import {Link} from "react-router-dom";
import {route} from "../../routes";
import PropTypes from "prop-types";

const OfferCreatorInfo = ({creator}) => {
    const profileLink = route("profile").replace("%id%", creator.id.toString());

    return (
        <div className="w-100 bg-dark border-bottom border-secondary h-auto py-1 px-3">
            <Link to={profileLink} className="fs-4">
                {creator.username}
            </Link>
        </div>
    );
};

OfferCreatorInfo.propTypes = {
    creator: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string
    })
};

OfferCreatorInfo.defaultProps = {
    creator: {
        id: 0,
        username: ""
    }
};

export default OfferCreatorInfo;
