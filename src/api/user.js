import {get} from "../services/httpService";

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const getUser = token => {
    return get(`${serverHost}/api/self`, {
        "Authorization": `Bearer ${token}`
    });
};
