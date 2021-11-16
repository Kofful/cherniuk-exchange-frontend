import {get, post} from '../services/exchangeHttpService';

export const register = data => {
    return post("/api/register", data, {
        'Content-Type': 'application/json'
    });
}

export const login = data => {
    return post("/api/login_check", data, {
        'Content-Type': 'application/json'
    });
}

export const confirmEmail = data => {
    return get(`/api/confirm?code=${data.code}&uid=${data.uid}`)
}
