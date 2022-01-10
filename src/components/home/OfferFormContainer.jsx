import React, {useEffect, useState} from "react";
import OfferListContainer from "../offer/OfferListContainer";
import SearchForm from "./SearchForm";
import PropTypes from "prop-types";

const OfferFormContainer = ({isWithSearch, isOpen, getOffers}) => {
    const defaultQuery = {
        minPayment: 0,
        maxPayment: 10000,
        stickerName: ""
    };

    const [isLoading, setIsLoading] = useState(false);
    const [offerList, setOfferList] = useState([]);
    const [creatorQuery, setCreatorQuery] = useState(defaultQuery);
    const [targetQuery, setTargetQuery] = useState(defaultQuery);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [timer, setTimer] = useState({
        isActive: false,
        id: 0
    });

    const loadOffers = async searchPage => {
        setIsLoading(true);

        const response = await getOffers(
            searchPage,
            targetQuery.minPayment,
            targetQuery.maxPayment,
            targetQuery.stickerName,
            creatorQuery.minPayment,
            creatorQuery.maxPayment,
            creatorQuery.stickerName
        );
        const {offers, count} = response;
        const maxPagesCount = Math.floor((count - 1) / process.env.REACT_APP_OFFERS_PER_PAGE + 1);

        setMaxPages(maxPagesCount);
        setIsLoading(false);
        setOfferList(offers);
    };

    const clearTimer = () => {
        clearTimeout(timer.id);
    };

    useEffect(() => {
        //prevent double call when user is changing search params
        if (!timer.isActive) {
            loadOffers(page);
        }
    }, [page, timer.isActive]);

    // this effect is created to send request only
    // when user hasn't been changing search params in past few seconds
    // but not after every text or range change
    useEffect(() => {
        if (timer.isActive) {
            clearTimer();
        }

        const timeout = timer.id !== 0 ? 1500 : 0;
        const newTimerId = setTimeout(async () => {
            setPage(1);
            setTimer({
                id: newTimerId,
                isActive: false
            });
        }, timeout);

        setTimer({
            id: newTimerId,
            isActive: true
        });
        return clearTimer;
    }, [creatorQuery, targetQuery]);

    return (
        <>
            {isWithSearch &&
                <SearchForm
                    creatorQuery={creatorQuery}
                    setCreatorQuery={setCreatorQuery}
                    targetQuery={targetQuery}
                    setTargetQuery={setTargetQuery}
                />
            }
            <OfferListContainer
                isLoading={isLoading}
                offerList={offerList}
                setOfferList={setOfferList}
                isOpen={isOpen}
                page={page}
                setPage={setPage}
                maxPages={maxPages}
            />
        </>
    );
};

OfferFormContainer.propTypes = {
    getOffers: PropTypes.func,
    isWithSearch: PropTypes.bool,
    isOpen: PropTypes.bool,
};

OfferFormContainer.defaultProps = {
    getOffers: () => {
    },
    isWithSearch: false,
    isOpen: false
};

export default OfferFormContainer;
