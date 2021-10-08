import axios from 'axios';

const fetchFunction = async requestConfig => {
    const response = await axios(requestConfig).catch(() => {
        return {
            status: 200,
            data: {
                code: 500,
                message: "Something went wrong"
            }
        };
    });

    return response.data;
}

export const get = (url, headers) => {
    return fetchFunction({url, headers, method: "get"})
}

export const post = (url, data, headers) => {
    return fetchFunction({url, data, headers, method: "post"})
}
