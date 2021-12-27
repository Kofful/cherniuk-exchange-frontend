import {get, post} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const getOffers = page => {
    return get(`/${getLang()}/api/offers?page=${page}`);
};

export const createOffer = (offer, token) => {
    return post(`/${getLang()}/api/offer/create`, offer, {
        "Authorization": `Bearer ${token}`
    });
};