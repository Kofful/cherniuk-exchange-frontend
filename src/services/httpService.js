import axios from 'axios';

const fetchFunction = async requestConfig => {
    const response = await axios(requestConfig).catch(e => {
        console.log(e);
        return {
            code: 500,
            messages: ["Something went wrong"]
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
