import {get, post} from '../services/exchangeHttpService';

const getLang = () => window.localStorage.getItem("locale") ?? "en";

export const register = data => {
    return post(`/${getLang()}/api/register`, data, {
        'Content-Type': 'application/json'
    });
};

export const login = data => {
    return post("/api/login_check", data, {
        'Content-Type': 'application/json'
    });
};

export const confirmEmail = data => {
    return get(`/${getLang()}/api/confirm?code=${data.code}&uid=${data.uid}`)
};
