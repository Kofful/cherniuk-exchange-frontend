const serverHost = process.env.REACT_APP_SERVER_HOST;

export const getImage = path => {
    return `${serverHost}${path}`;
}
