import url from 'url';
export default {
    server: {
        url: url.format({
            protocol: process.env.GRAVIAD_SERVER_SCHEMA,
            hostname: process.env.GRAVIAD_SERVER_HOST,
            port: process.env.GRAVIAD_SERVER_PORT,
        }).toString(),
    },
    client: {
        url: `${process.env.REACT_APP_GRAVIAD_CLIENT_SCHEMA}://${process.env.REACT_APP_GRAVIAD_CLIENT_HOST}:${process.env.REACT_APP_GRAVIAD_CLIENT_PORT}`
    },
};
