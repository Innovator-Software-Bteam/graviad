export * as graviadConfig from './graviad.config';
export type TServerConfig = {
    url: URL,
}
export type TClientConfig = {
    url: URL,
}
export type TGoogleConfig = {
    clientId: string,
    clientSecret: string,
    callbackUrl: URL,
}
export type TFacebookConfig = {
    clientId: string,
    clientSecret: string,
    callbackUrl: string,
}
export type TGraviadConfig = {
    server: TServerConfig,
    client: TClientConfig,
    google: TGoogleConfig,
    facebook: TFacebookConfig,
}