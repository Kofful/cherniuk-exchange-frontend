import {get} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const getUser = token => {
    return get("/api/self", {
        "Authorization": `Bearer ${token}`
    });
};

export const getUserInfo = (id) => {
    return get(`/${getLang()}/api/user/${id}`);
};

export const getUserItems = (id, page, token) => {
    return get(`/${getLang()}/api/user/${id}/items?page=${page}`, {
        "Authorization": token ? `Bearer ${token}` : null
    });
};

export const getUserOffers = (id, page, token) => {
    return get(`/${getLang()}/api/user/${id}/offers?page=${page}`, {
        "Authorization": token ? `Bearer ${token}` : null
    });
};

export const getIncomingOffers = (page, token) => {
    return get(`/${getLang()}/api/incoming?page=${page}`, {
        "Authorization": token ? `Bearer ${token}` : null
    });
};

export const getUserHistory = (id, page) => {
    return get(`/${getLang()}/api/user/${id}/history?page=${page}`);
};
