import url from 'url';
export default {
    server: {
        url: url.format({
            host: process.env.REACT_APP_GRAVIAD_SERVER_HOST,
            port: process.env.REACT_APP_GRAVIAD_SERVER_PORT,
            protocol: process.env.REACT_APP_GRAVIAD_SERVER_SCHEMA
        }).toString(),
    },
    client: {
        url: `${process.env.REACT_APP_GRAVIAD_CLIENT_SCHEMA}://${process.env.REACT_APP_GRAVIAD_CLIENT_HOST}:${process.env.REACT_APP_GRAVIAD_CLIENT_PORT}`
    },
};
