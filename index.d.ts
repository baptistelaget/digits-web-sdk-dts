// Type definitions for digits-web-sdk v1
// Project: https://docs.fabric.io/web/digits/installation.html | https://cdn.digits.com/1/sdk.js
// Definitions by: OctHuber Inc. / Antoine Beauvais-Lacasse <abeaulac@octhuber.com>

/**
 * The Digits web SDK uses the Zepto library, specifically zepto-deferred module:
 * https://github.com/madrobby/zepto/blob/master/src/deferred.js
 * Which is apparently: https://github.com/sudhirj/simply-deferred under the hood.
 */
type ZeptoPromiseState = 'pending' | 'resolved' | 'rejected';
type ZeptoWhenable<TResult> = ZeptoPromise<TResult> | TResult;
type ZeptoSuccessCB<T, TResult> = (value: T) => ZeptoWhenable<TResult>;
type ZeptoFailureCB<TResult> = (err: any) => ZeptoWhenable<TResult>;

interface ZeptoPromise<T> extends PromiseLike<T> {
    always(value: ZeptoWhenable<T>): ZeptoPromise<T>;

    then<TResult>(onFulfill?: ZeptoSuccessCB<T, TResult>,
                  onReject?: ZeptoFailureCB<TResult>): ZeptoPromise<TResult>;

    done<TResult>(successCb: ZeptoSuccessCB<T, TResult>): ZeptoPromise<TResult>;

    fail<TResult>(onReject: ZeptoFailureCB<TResult>): ZeptoPromise<TResult>;

    state(): ZeptoPromiseState;

    promise(target?: any): ZeptoPromise<T>;

    // Some additional methods we don't care too much about...
}

export interface DigitsInitOptions {
    consumerKey: string;
}

export interface DigitsEmbedOptions {
    container: string;
}

export interface DigitsStatusResponse {
    readonly status: string;
    readonly oauth_echo_headers?: DigitsStatusOAuthEchoHeaders;
}
export interface DigitsStatusOAuthEchoHeaders {
    readonly oauth_echo_header?: string;
    readonly oauth_echo_service?: string;
}

export interface DigitsLoginResponse {
    readonly oauth_echo_headers: DigitsLoginOAuthEchoHeaders;
}
export interface DigitsLoginOAuthEchoHeaders {
    readonly 'X-Auth-Service-Provider': string;
    readonly 'X-Verify-Credentials-Authorization': string;
}

export interface DigitsStatic {
    init(options: DigitsInitOptions): void;
    isInitialized(): boolean;
    getLoginStatus(): ZeptoPromise<DigitsStatusResponse>;
    logIn(): ZeptoPromise<DigitsLoginResponse>;
    embed(options: DigitsEmbedOptions): ZeptoPromise<DigitsLoginResponse>;
}
