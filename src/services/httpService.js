import axios from 'axios';

const fetchFunction = async requestConfig => {
    try {
        const response = await axios(requestConfig);
        return response.data;
    } catch (error) {
        return Promise.reject(error?.response);
    }
}

export const get = (url, headers) => {
    return fetchFunction({url, headers, method: "get"})
}

export const post = (url, data, headers) => {
    return fetchFunction({url, data, headers, method: "post"})
}
