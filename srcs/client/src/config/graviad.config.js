// URL of Server
const portServer = process.env.REACT_APP_GRAVIAD_SERVER_PORT;
const schemeServer = process.env.REACT_APP_GRAVIAD_SERVER_SCHEME;
const hostServer = process.env.REACT_APP_GRAVIAD_SERVER_HOST;
export const urlServer = new URL(`${schemeServer}://${hostServer}:${portServer}`);
export const urlServerAuthByGoogle = new URL(`${schemeServer}://${hostServer}:${portServer}/auth/google`);
export const urlServerAuthByFacebook = new URL(`${schemeServer}://${hostServer}:${portServer}/auth/facebook`);