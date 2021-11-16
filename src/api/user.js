import {get} from "../services/exchangeHttpService";

export const getUser = token => {
    return get("/api/self", {
        "Authorization": `Bearer ${token}`
    });
};
