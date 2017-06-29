/// <reference types="../zepto" />

import TypeOrArray = ZeptoDeferred.TypeOrArray;
import ActionFilter = ZeptoDeferred.ActionFilter;

/**
 * This object provides a subset of the methods of the Deferred object (then, done, fail, always,
 * progress, state and promise) to prevent users from changing the state of the Deferred.
 */
interface ZeptoPromise<TResolve, TReject = any, TNotify = any> extends PromiseLike<TResolve> {
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     */
    then<UResolve = TResolve,
        UReject = TReject,
        UNotify = TNotify>(doneFilter: ActionFilter<TResolve, UResolve>,
                           failFilter?: ActionFilter<TReject, UReject>,
                           progressFilter?: ActionFilter<TNotify, UNotify>): ZeptoPromise<UResolve, UReject, UNotify>;
    /**
     * Add handlers to be called when the Deferred object is resolved.
     */
    done(doneCallback: TypeOrArray<ZeptoDeferred.DoneCallback<TResolve>>,
         ...doneCallbacks: Array<TypeOrArray<ZeptoDeferred.DoneCallback<TResolve>>>): this;
    /**
     * Add handlers to be called when the Deferred object is rejected.
     */
    fail(failCallback: TypeOrArray<ZeptoDeferred.FailCallback<TReject>>,
         ...failCallbacks: Array<TypeOrArray<ZeptoDeferred.FailCallback<TReject>>>): this;
    /**
     * Add handlers to be called when the Deferred object is either resolved or rejected.
     */
    always(alwaysCallback: TypeOrArray<ZeptoDeferred.AlwaysCallback<TResolve, TReject>>,
           ...alwaysCallbacks: Array<TypeOrArray<ZeptoDeferred.AlwaysCallback<TResolve, TReject>>>): this;
    /**
     * Determine the current state of a Deferred object.
     */
    state(): ZeptoDeferred.PromiseState;
    /**
     * Add handlers to be called when the Deferred object generates progress notifications.
     */
    progress(progressCallback: TypeOrArray<ZeptoDeferred.ProgressCallback<TNotify>>,
             ...progressCallbacks: Array<TypeOrArray<ZeptoDeferred.ProgressCallback<TNotify>>>): this;
    /**
     * Return a Deferred's Promise object, or return self if already a promise.
     */
    promise(): ZeptoPromise<TResolve>;
    /**
     * Extend target with Deferred's Promise object, then return it.
     */
    promise<TTarget extends object>(target: TTarget): ZeptoPromise<TResolve> & TTarget;
}

interface ZeptoDeferred<TResolve, TReject = any, TNotify = any> extends ZeptoPromise<TResolve, TReject, TNotify> {
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     */
    then<UResolve = TResolve,
        UReject = TReject,
        UNotify = TNotify>(doneFilter: ActionFilter<TResolve, UResolve>,
                           failFilter?: ActionFilter<TReject, UReject>,
                           progressFilter?: ActionFilter<TNotify, UNotify>): ZeptoDeferred<UResolve, UReject, UNotify>;
    /**
     * Call the progressCallbacks on a Deferred object with the given args.
     */
    notify(...args: TNotify[]): this;
    /**
     * Call the progressCallbacks on a Deferred object with the given context and args.
     */
    notifyWith(context: object, ...args: TNotify[]): this;
    /**
     * Reject a Deferred object and call any failCallbacks with the given args.
     */
    reject(...args: TReject[]): this;
    /**
     * Reject a Deferred object and call any failCallbacks with the given context and args.
     */
    rejectWith(context: object, ...args: TReject[]): this;
    /**
     * Resolve a Deferred object and call any doneCallbacks with the given args.
     */
    resolve(...args: TResolve[]): this;
    /**
     * Resolve a Deferred object and call any doneCallbacks with the given context and args.
     */
    resolveWith(context: object, ...args: TResolve[]): this;
}

declare namespace ZeptoDeferred {
    type PromiseState = 'pending' | 'resolved' | 'rejected';
    type TypeOrPromise<T> = T | ZeptoPromise<T>;
    type TypeOrArray<T> = T | T[];
    type DoneCallback<TResolve> = (...values: TResolve[]) => void;
    type FailCallback<TReject> = (...reasons: TReject[]) => void;
    type AlwaysCallback<TResolve, TReject> = (...values_reasons: Array<TResolve | TReject>) => void;
    type ProgressCallback<TNotify> = (...values: TNotify[]) => void;
    type ActionFilter<TAction, UAction> = (...valuesOrReasons: TAction[]) => TypeOrPromise<UAction> | null | undefined;
}

interface ZeptoStatic {
    Deferred<TResolve = any,
        TReject = any,
        TNotify = any>(beforeStart?: (this: ZeptoDeferred<TResolve, TReject, TNotify>,
                                      deferred: ZeptoDeferred<TResolve, TReject, TNotify>) => void): ZeptoDeferred<TResolve, TReject, TNotify>;

    when(...deferreds: any[]): ZeptoPromise<any>;
    /**
     * When Deferred module is included $.ajax() & $.ajaxJSONP() return promise interface for chaining callbacks.
     */
    ajax(options: ZeptoAjaxSettings): ZeptoPromise<any>;
    /** @deprecated use $.ajax instead. */
    ajaxJSONP(options: ZeptoAjaxSettings): ZeptoPromise<any>;
}
