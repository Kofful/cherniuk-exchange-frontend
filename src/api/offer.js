import {get, post, del} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const getOffers = page => {
    return get(`/${getLang()}/api/offers?page=${page}`);
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
