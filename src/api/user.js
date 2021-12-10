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

export const getUserItems = (id, token) => {
    return get(`/${getLang()}/api/user/${id}/items`, {
        "Authorization": `Bearer ${token}`
    });
}
