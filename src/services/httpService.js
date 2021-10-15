import axios from 'axios';

const fetchFunction = async requestConfig => {
    const response =  await axios(requestConfig).catch(error => {
        return error.response.status >= 500 ?
            {
                status: error.response.status,
                message: "Something went wrong"
            }
            : error.response;
    });

    return response;
}

export const get = (url, headers) => {
    return fetchFunction({url, headers, method: "get"})
}

export const post = (url, data, headers) => {
    return fetchFunction({url, data, headers, method: "post"})
}
