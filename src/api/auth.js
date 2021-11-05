import {get, post} from '../services/httpService';

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const register = data => {
    return post(`${serverHost}/api/register`, data, {
        'Content-Type': 'application/json'
    });
}

export const login = data => {
    return post(`${serverHost}/api/login_check`, data, {
        'Content-Type': 'application/json'
    });
}

export const confirmEmail = data => {
    return get(`${serverHost}/api/confirm?code=${data.code}&uid=${data.uid}`)
}
