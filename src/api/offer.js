import {get, post, del} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const getOffers = (
    page,
    minTargetPayment,
    maxTargetPayment,
    targetQuery,
    minCreatorPayment,
    maxCreatorPayment,
    creatorQuery
) => {
    return get(`/${getLang()}/api/offers?page=${page}&minTargetPayment=${minTargetPayment}`
        + `&maxTargetPayment=${maxTargetPayment}&targetQuery=${targetQuery}&minCreatorPayment=${minCreatorPayment}`
        + `&maxCreatorPayment=${maxCreatorPayment}&creatorQuery=${creatorQuery}`);
};

export const createOffer = (offer, token) => {
    return post(`/${getLang()}/api/offer/create`, offer, {
        "Authorization": `Bearer ${token}`
    });
};

export const removeOffer = (offerId, token) => {
    return del(`/${getLang()}/api/offer/remove/${offerId}`, {
        "Authorization": `Bearer ${token}`
    });
}

export const acceptOffer = (offerId, token) => {
    return post(`/${getLang()}/api/offer/accept/${offerId}`, {}, {
        "Authorization": `Bearer ${token}`
    });
};
