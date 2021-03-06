import OfferItem from "./OfferItem";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";

const OfferItemsContainer = ({stickers, update, loadMore}) => {
    const STICKER_HEIGHT_WITH_PADDING = 95;

    const scrollRef = useRef(null);

    const onScroll = () => {
        const element = scrollRef.current;
        const distanceToBottom = element.scrollHeight - (element.clientHeight + element.scrollTop)
        if(distanceToBottom < STICKER_HEIGHT_WITH_PADDING &&
            stickers.length > 0) {
            loadMore();
        }
    };

    useEffect(() => {
        onScroll()
    });

    return (
      <div className="w-50">
          <div
              onScroll={onScroll}
              ref={scrollRef}
              className="sticker-container">
              {
                  stickers.map((item) => {
                      return (
                          <OfferItem sticker={item} update={update} key={item.reactKey}/>
                      );
                  })
              }
          </div>
      </div>
    );
};

OfferItemsContainer.propTypes = {
    stickers: PropTypes.array,
    update: PropTypes.func,
    loadMore: PropTypes.func
};

OfferItemsContainer.defaultProps = {
    stickers: [],
    update: () => {},
    loadMore: () => {}
};

export default OfferItemsContainer;
