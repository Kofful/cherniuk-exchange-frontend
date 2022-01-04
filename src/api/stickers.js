import {get, post} from "../services/exchangeHttpService";

const getLang = () => window.localStorage.getItem("locale") ?? "en";

const getFormData = sticker => {
    const formData = new FormData();

    for(const key in sticker) {
        formData.append(key, sticker[key]);
    }

    return formData;
};

export const getStickers = (page, token, query = "") => {
    return get(`/api/stickers?page=${page}&query=${query}`, {
        "Authorization": `Bearer ${token}`
    });
};

export const addSticker = (sticker, token) => {
    return post(
        `/${getLang()}/api/sticker/add`,
        getFormData(sticker),
        {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        });
};

export const updateSticker = (sticker, token) => {
    return post(
        `/${getLang()}/api/sticker/update`,
        getFormData(sticker),
        {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        });
};

export const giveSticker = token => {
    return get(
        `/${getLang()}/api/sticker/give`,
        {
            "Authorization": `Bearer ${token}`
        }
    );
};
