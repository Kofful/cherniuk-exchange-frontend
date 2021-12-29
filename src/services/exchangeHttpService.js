import {get as httpGet, post as httpPost, del as httpDelete} from "./httpService";

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const get = (path, headers) => {
    return httpGet(`${serverHost}${path}`, headers);
};

export const post = (path, data, headers) => {
    return httpPost(`${serverHost}${path}`, data, headers);
};

export const del = (path, headers) => {
    return httpDelete(`${serverHost}${path}`, headers);
}
