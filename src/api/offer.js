import {post} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const createOffer = (offer, token) => {
    return post(`/${getLang()}/api/offer/create`, offer, {
        "Authorization": `Bearer ${token}`
    });
};