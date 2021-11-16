import {get, post} from "../services/exchangeHttpService";

const getFormData = sticker => {
    const formData = new FormData();

    for(const key in sticker) {
        formData.append(key, sticker[key]);
    }

    return formData;
};

export const getStickers = (page, token) => {
    return get(`/api/stickers?page=${page}`, {
        "Authorization": `Bearer ${token}`
    });
};

//TODO change locale in localization feature
export const addSticker = (sticker, token) => {
    return post(
        `/en/api/sticker`,
        getFormData(sticker),
        {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        });
}

//TODO change locale in localization feature
export const updateSticker = (sticker, token) => {
    return post(
        `/en/api/sticker-update`,
        getFormData,
        {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        });
};
