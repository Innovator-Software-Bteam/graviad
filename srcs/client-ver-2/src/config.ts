
export default {
    server: {
        url: `${process.env.REACT_APP_GRAVIAD_SERVER_SCHEMA}://${process.env.REACT_APP_GRAVIAD_SERVER_HOST}:${process.env.REACT_APP_GRAVIAD_SERVER_PORT}`
    },
    client: {
        url: `${process.env.REACT_APP_GRAVIAD_CLIENT_SCHEMA}://${process.env.REACT_APP_GRAVIAD_CLIENT_HOST}:${process.env.REACT_APP_GRAVIAD_CLIENT_PORT}`
    },
};
