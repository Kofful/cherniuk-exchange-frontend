import axios from 'axios';

const fetchFunction = async requestConfig => {
    return await axios(requestConfig).catch(error => {
        let response = error.response;
        if(error.response.status >= 500) {
            response = {
                status: 500,
                message: "Something went wrong"
            };
        }
        return response;
    });
}

export const get = (url, headers) => {
    return fetchFunction({url, headers, method: "get"})
}

export const post = (url, data, headers) => {
    return fetchFunction({url, data, headers, method: "post"})
}
