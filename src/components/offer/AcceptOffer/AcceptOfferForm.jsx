import SelectingItemsContainer from "../SelectingItemsContainer";
import PropTypes from "prop-types";
import AcceptOfferButtons from "./AcceptOfferButtons";
import AcceptOfferCreator from "./AcceptOfferCreator";

const AcceptOfferForm = ({giveItems, acceptItems, creator, isAcceptPermitted}) => {
    const setReactKeys = items => {
        return items.map((item, index) => ({...item, reactKey: index}));
    };

    const give = setReactKeys(giveItems);
    const accept = setReactKeys(acceptItems);

    return (
        <div className="w-100 mt-5 border border-3 border-secondary rounded">
            <AcceptOfferCreator creator={creator}/>
            <div className="d-flex w-100 p-2">
                <SelectingItemsContainer stickers={give}/>
                <SelectingItemsContainer stickers={accept}/>
            </div>
            <AcceptOfferButtons creatorId={creator.id} isAcceptPermitted={isAcceptPermitted}/>
        </div>
    );
};

AcceptOfferForm.propTypes = {
    giveItems: PropTypes.array,
    acceptItems: PropTypes.array,
    creator: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string
    }),
    isAcceptPermitted: PropTypes.bool
};

AcceptOfferForm.defaultProps = {
    giveItems: [],
    acceptItems: [],
    creator: {
        id: 0,
        username: ""
    },
    isAcceptPermitted: false
};

export default AcceptOfferForm;
