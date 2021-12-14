import OfferItem from "./OfferItem";
import PropTypes from "prop-types";

const SelectingItemsContainer = ({stickers, update}) => {
    return (
      <div className="w-50">
          <div className="sticker-container">
              {
                  stickers.map((item) => {
                      return (
                          <OfferItem sticker={item} update={update} key={item.id}/>
                      );
                  })
              }
          </div>
      </div>
    );
};

SelectingItemsContainer.propTypes = {
    stickers: PropTypes.array,
    update: PropTypes.func
};

SelectingItemsContainer.defaultProps = {
    stickers: [],
    update: () => {}
};

export default SelectingItemsContainer;
