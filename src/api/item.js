import {post} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const sellItem = (itemId, token) => {
    return post(`/${getLang()}/api/item/sell/${itemId}`,
        {},
        {
            "Authorization": `Bearer ${token}`
        });
};
