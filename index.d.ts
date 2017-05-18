// Type definitions for digits-web-sdk v1
// Project: https://docs.fabric.io/web/digits/installation.html | https://cdn.digits.com/1/sdk.js
// Definitions by: OctHuber Inc. / Antoine Beauvais-Lacasse <abeaulac@octhuber.com>

declare namespace Digits {
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

    interface DigitsInitOptions {
        consumerKey: string;
    }

    interface DigitsEmbedOptions {
        container: string;
    }

    interface DigitsOAuthEchoHeaders {
        oauth_echo_header: string;
        oauth_echo_service: string;
    }

    interface DigitsResponse {
        status: string;
        oauth_echo_headers: DigitsOAuthEchoHeaders;
    }

    function init(options: DigitsInitOptions): void;
    function isInitialized(): boolean;
    function getLoginStatus(): ZeptoPromise<DigitsResponse>;
    function logIn(): ZeptoPromise<DigitsResponse>;
    function embed(options: DigitsEmbedOptions): ZeptoPromise<DigitsResponse>;
}
