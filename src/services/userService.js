import {getUser} from "../api/auth";

export const refreshUser = async (token) => {
    if(token) {
        try {
            return await getUser(token);
        } catch {
            return null;
        }
    }
    return null;
}