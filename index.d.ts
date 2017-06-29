// Type definitions for digits-web-sdk 1.x
// Project: https://docs.fabric.io/web/digits/installation.html; https://cdn.digits.com/1/sdk.js
// Definitions by: Antoine Beauvais-Lacasse <https://github.com/beaulac>

interface DigitsInitOptions {
    consumerKey: string;
}

interface DigitsEmbedOptions {
    container: string;
}

interface DigitsStatusResponse {
    readonly status: string;
    readonly oauth_echo_headers?: DigitsStatusOAuthEchoHeaders;
}

interface DigitsStatusOAuthEchoHeaders {
    readonly oauth_echo_header?: string;
    readonly oauth_echo_service?: string;
}

interface DigitsLoginResponse {
    readonly oauth_echo_headers: DigitsLoginOAuthEchoHeaders;
}

interface DigitsLoginOAuthEchoHeaders {
    readonly 'X-Auth-Service-Provider': string;
    readonly 'X-Verify-Credentials-Authorization': string;
}

interface DigitsStatic {
    init(options: DigitsInitOptions): void;
    isInitialized(): boolean;
    getLoginStatus(): ZeptoPromise<DigitsStatusResponse>;
    logIn(): ZeptoPromise<DigitsLoginResponse>;
    embed(options: DigitsEmbedOptions): ZeptoPromise<DigitsLoginResponse>;
}

declare let Digits: DigitsStatic;
