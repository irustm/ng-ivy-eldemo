var hw = (function (exports) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
        return m.call(o);
    if (o && typeof o.length === "number")
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/ new Error();
            /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/ console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () { throw err; }, 0);
}

/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError(err);
        }
    },
    complete: function () { }
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x !== null && typeof x === 'object';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
    function UnsubscriptionErrorImpl(errors) {
        Error.call(this);
        this.message = errors ?
            errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
        return this;
    }
    UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
})();
var UnsubscriptionError = UnsubscriptionErrorImpl;

/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
var Subscription = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parentOrParents = _a._parentOrParents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
                var parent_1 = _parentOrParents[index];
                parent_1.remove(this);
            }
        }
        if (isFunction(_unsubscribe)) {
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject(sub)) {
                    try {
                        sub.unsubscribe();
                    }
                    catch (e) {
                        errors = errors || [];
                        if (e instanceof UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                        }
                        else {
                            errors.push(e);
                        }
                    }
                }
            }
        }
        if (errors) {
            throw new UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
        if (!teardown) {
            return Subscription.EMPTY;
        }
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (!(subscription instanceof Subscription)) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default: {
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
            subscription._parentOrParents = this;
        }
        else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
                return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
        }
        else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
        }
        else {
            return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = /*@__PURE__*/ (function () {
    return typeof Symbol === 'function'
        ? /*@__PURE__*/ Symbol('rxSubscriber')
        : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
})();

/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
var Subscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== empty) {
                context = Object.create(observerOrNext);
                if (isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}

/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber]) {
            return nextOrObserver[rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber(empty);
    }
    return new Subscriber(nextOrObserver, error, complete);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }

/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
var Observable = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            sink.add(operator.call(sink, this.source));
        }
        else {
            sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
    function ObjectUnsubscribedErrorImpl() {
        Error.call(this);
        this.message = 'object unsubscribed';
        this.name = 'ObjectUnsubscribedError';
        return this;
    }
    ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
    return ObjectUnsubscribedErrorImpl;
})();
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
var SubjectSubscription = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
var SubjectSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(Subscriber));
var Subject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
var ConnectableObservable = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
    };
    return ConnectableObservable;
}(Observable));
var connectableObservableDescriptor = /*@__PURE__*/ (function () {
    var connectableProto = ConnectableObservable.prototype;
    return {
        operator: { value: null },
        _refCount: { value: 0, writable: true },
        _subject: { value: null, writable: true },
        _connection: { value: null, writable: true },
        _subscribe: { value: connectableProto._subscribe },
        _isComplete: { value: connectableProto._isComplete, writable: true },
        getSubject: { value: connectableProto.getSubject },
        connect: { value: connectableProto.connect },
        refCount: { value: connectableProto.refCount }
    };
})();
var ConnectableSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(SubjectSubscriber));
var RefCountSubscriber$1 = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount$$1 = connectable._refCount;
        if (refCount$$1 <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount$$1 - 1;
        if (refCount$$1 > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */

var GroupBySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = (this.subjectSelector ? this.subjectSelector() : new Subject());
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber));
var GroupDurationSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(Subscriber));
var GroupedObservable = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable));
var InnerRefCountSubscription = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
var BehaviorSubject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject));

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
var Action = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
var AsyncAction = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action));

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
var QueueAction = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction));

var Scheduler = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = function () { return Date.now(); };
    return Scheduler;
}());

/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
var AsyncScheduler = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var QueueScheduler = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
var queue = /*@__PURE__*/ new QueueScheduler(QueueAction);

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
function empty$1(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    };
};

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var i = 0;
        sub.add(scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
                return;
            }
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
                sub.add(this.schedule());
            }
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable(subscribeToArray(input));
    }
    else {
        return scheduleArray(input, scheduler);
    }
}

/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
        args.pop();
        return scheduleArray(args, scheduler);
    }
    else {
        return fromArray(args);
    }
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable(function (subscriber) { return subscriber.error(error); });
    }
    else {
        return new Observable(function (subscriber) { return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber }); });
    }
}
function dispatch(_a) {
    var error = _a.error, subscriber = _a.subscriber;
    subscriber.error(error);
}

/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */
var NotificationKind = 
/*@__PURE__*/ /*@__PURE__*/ (function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
    return NotificationKind;
})({});
var Notification = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return of(this.value);
            case 'E':
                return throwError(this.error);
            case 'C':
                return empty$1();
        }
        throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());

/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

var ObserveOnSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        var destination = this.destination;
        destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification.createError(err));
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification.createComplete());
        this.unsubscribe();
    };
    return ObserveOnSubscriber;
}(Subscriber));
var ObserveOnMessage = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());

/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */
var ReplaySubject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        }
        else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.isStopped || this.hasError) {
            subscription = Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        }
        else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject));
var ReplayEvent = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());

/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */
var AsyncSubject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var RESOLVED = /*@__PURE__*/ (function () { return /*@__PURE__*/ Promise.resolve(); })();
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
var Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        RESOLVED.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};

/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */
var AsapAction = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var AsapScheduler = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
var asap = /*@__PURE__*/ new AsapScheduler(AsapAction);

/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
var async = /*@__PURE__*/ new AsyncScheduler(AsyncAction);

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
var AnimationFrameAction = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () { return scheduler.flush(null); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var AnimationFrameScheduler = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
var animationFrame = /*@__PURE__*/ new AnimationFrameScheduler(AnimationFrameAction);

/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
var VirtualTimeScheduler = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
            SchedulerAction = VirtualAction;
        }
        if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler));
var VirtualAction = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
            index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var EmptyErrorImpl = /*@__PURE__*/ (function () {
    function EmptyErrorImpl() {
        Error.call(this);
        this.message = 'no elements in sequence';
        this.name = 'EmptyError';
        return this;
    }
    EmptyErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
    return EmptyErrorImpl;
})();
var EmptyError = EmptyErrorImpl;

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
var MapSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
var OuterSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
var InnerSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
var subscribeToPromise = function (promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, hostReportError);
        return subscriber;
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = /*@__PURE__*/ getSymbolIterator();

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator$$1 = iterable[iterator]();
        do {
            var item = iterator$$1.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator$$1.return === 'function') {
            subscriber.add(function () {
                if (iterator$$1.return) {
                    iterator$$1.return();
                }
            });
        }
        return subscriber;
    };
};

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
var subscribeToObservable = function (obj) {
    return function (subscriber) {
        var obs = obj[observable]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        }
        else {
            return obs.subscribe(subscriber);
        }
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

/** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
var subscribeTo = function (result) {
    if (!!result && typeof result[observable] === 'function') {
        return subscribeToObservable(result);
    }
    else if (isArrayLike(result)) {
        return subscribeToArray(result);
    }
    else if (isPromise(result)) {
        return subscribeToPromise(result);
    }
    else if (!!result && typeof result[iterator] === 'function') {
        return subscribeToIterable(result);
    }
    else {
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};

/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
    if (innerSubscriber === void 0) {
        innerSubscriber = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    }
    if (innerSubscriber.closed) {
        return undefined;
    }
    if (result instanceof Observable) {
        return result.subscribe(innerSubscriber);
    }
    return subscribeTo(result)(innerSubscriber);
}

/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
var NONE = {};

var CombineLatestSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;
        try {
            result = this.resultSelector.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */
function scheduleObservable(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () {
            var observable$$1 = input[observable]();
            sub.add(observable$$1.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
function schedulePromise(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () {
            return input.then(function (value) {
                sub.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
            });
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */
function scheduleIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var iterator$$1;
        sub.add(function () {
            if (iterator$$1 && typeof iterator$$1.return === 'function') {
                iterator$$1.return();
            }
        });
        sub.add(scheduler.schedule(function () {
            iterator$$1 = input[iterator]();
            sub.add(scheduler.schedule(function () {
                if (subscriber.closed) {
                    return;
                }
                var value;
                var done;
                try {
                    var result = iterator$$1.next();
                    value = result.value;
                    done = result.done;
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            }));
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
function isInteropObservable(input) {
    return input && typeof input[observable] === 'function';
}

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
function isIterable(input) {
    return input && typeof input[iterator] === 'function';
}

/** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        else if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        else if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        else if (isIterable(input) || typeof input === 'string') {
            return scheduleIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}

/** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */
function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable) {
            return input;
        }
        return new Observable(subscribeTo(input));
    }
    else {
        return scheduled(input, scheduler);
    }
}

/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(mergeMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
}
var MergeMapOperator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function MergeMapOperator(project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
    };
    return MergeMapOperator;
}());
var MergeMapSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new InnerSubscriber(this, value, index);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = subscribeToResult(this, ish, undefined, undefined, innerSubscriber);
        if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
        }
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
        this.unsubscribe();
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */
function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMap(identity, concurrent);
}

/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */
function isNumeric(val) {
    return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
}

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable) {
        return observables[0];
    }
    return mergeAll(concurrent)(fromArray(observables, scheduler));
}

/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var FilterSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RaceSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */

var ZipSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, resultSelector, values) {
        if (values === void 0) {
            values = Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = (typeof resultSelector === 'function') ? resultSelector : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        this.unsubscribe();
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            if (iterator$$1.stillUnsubscribed) {
                var destination = this.destination;
                destination.add(iterator$$1.subscribe(iterator$$1, i));
            }
            else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            var result = iterator$$1.next();
            if (iterator$$1.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.resultSelector) {
            this._tryresultSelector(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;
        try {
            result = this.resultSelector.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber));
var StaticIterator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function StaticIterator(iterator$$1) {
        this.iterator = iterator$$1;
        this.nextResult = iterator$$1.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
var ZipBufferIterator = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[iterator] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var AuditSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = void 0;
            try {
                var durationSelector = this.durationSelector;
                duration = durationSelector(value);
            }
            catch (err) {
                return this.destination.error(err);
            }
            var innerSubscription = subscribeToResult(this, duration);
            if (!innerSubscription || innerSubscription.closed) {
                this.clearThrottle();
            }
            else {
                this.add(this.throttled = innerSubscription);
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var BufferSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.buffer = [];
        _this.add(subscribeToResult(_this, closingNotifier));
        return _this;
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var BufferCountSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber));
var BufferSkipCountSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this, buffers = _a.buffers, destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */

var Context = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function Context() {
        this.buffer = [];
    }
    return Context;
}());
var BufferTimeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.bufferTimeSpan = bufferTimeSpan;
        _this.bufferCreationInterval = bufferCreationInterval;
        _this.maxBufferSize = maxBufferSize;
        _this.scheduler = scheduler;
        _this.contexts = [];
        var context = _this.openContext();
        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (_this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
        else {
            var closeState = { subscriber: _this, context: context };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        return _this;
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;
        for (var i = 0; i < len; i++) {
            var context_1 = contexts[i];
            var buffer = context_1.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context_1;
            }
        }
        if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.contexts.length = 0;
        _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var _a = this, contexts = _a.contexts, destination = _a.destination;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            destination.next(context_2.buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.contexts = null;
    };
    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            var bufferTimeSpan = this.bufferTimeSpan;
            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    };
    BufferTimeSubscriber.prototype.openContext = function () {
        var context = new Context();
        this.contexts.push(context);
        return context;
    };
    BufferTimeSubscriber.prototype.closeContext = function (context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
        }
    };
    return BufferTimeSubscriber;
}(Subscriber));
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
    var context = subscriber.openContext();
    var action = this;
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber, context = arg.context;
    subscriber.closeContext(context);
}

/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */

var BufferToggleSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(subscribeToResult(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_1 = contexts.shift();
            context_1.subscription.unsubscribe();
            context_1.buffer = null;
            context_1.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            this.destination.next(context_2.buffer);
            context_2.subscription.unsubscribe();
            context_2.buffer = null;
            context_2.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscription,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var BufferWhenSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier;
        try {
            var closingSelector = this.closingSelector;
            closingNotifier = closingSelector();
        }
        catch (err) {
            return this.error(err);
        }
        closingSubscription = new Subscription();
        this.closingSubscription = closingSubscription;
        this.add(closingSubscription);
        this.subscribing = true;
        closingSubscription.add(subscribeToResult(this, closingNotifier));
        this.subscribing = false;
    };
    return BufferWhenSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var CatchSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            var innerSubscription = subscribeToResult(this, result, undefined, undefined, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                this.add(innerSubscription);
            }
        }
    };
    return CatchSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var CountSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DebounceSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        _this.durationSubscription = null;
        return _this;
    }
    DebounceSubscriber.prototype._next = function (value) {
        try {
            var result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult(this, duration);
        if (subscription && !subscription.closed) {
            this.add(this.durationSubscription = subscription);
        }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
        }
    };
    return DebounceSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */

var DebounceTimeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$2, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            var lastValue = this.lastValue;
            this.lastValue = null;
            this.hasValue = false;
            this.destination.next(lastValue);
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber));
function dispatchNext$2(subscriber) {
    subscriber.debouncedNext();
}

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var DefaultIfEmptySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */

var DelaySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            this.unsubscribe();
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        var destination = this.destination;
        destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
        this.unsubscribe();
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification.createComplete());
        this.unsubscribe();
    };
    return DelaySubscriber;
}(Subscriber));
var DelayMessage = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());

/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DelayWhenSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        _this.index = 0;
        return _this;
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        var index = this.index++;
        try {
            var delayNotifier = this.delayDurationSelector(value, index);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
        this.unsubscribe();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }
        return subscription.outerValue;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            var destination = this.destination;
            destination.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(OuterSubscriber));
var SubscriptionDelayObservable = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subscriptionDelay = subscriptionDelay;
        return _this;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(Observable));
var SubscriptionDelaySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.source = source;
        _this.sourceSubscribed = false;
        return _this;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.unsubscribe();
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var DeMaterializeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DistinctSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set();
        if (flushes) {
            _this.add(subscribeToResult(_this, flushes));
        }
        return _this;
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        }
        else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var DistinctUntilChangedSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.hasKey = false;
        if (typeof compare === 'function') {
            _this.compare = compare;
        }
        return _this;
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var key;
        try {
            var keySelector = this.keySelector;
            key = keySelector ? keySelector(value) : value;
        }
        catch (err) {
            return this.destination.error(err);
        }
        var result = false;
        if (this.hasKey) {
            try {
                var compare = this.compare;
                result = compare(this.key, key);
            }
            catch (err) {
                return this.destination.error(err);
            }
        }
        else {
            this.hasKey = true;
        }
        if (!result) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_EmptyError,_Subscriber PURE_IMPORTS_END */

var ThrowIfEmptySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ThrowIfEmptySubscriber, _super);
    function ThrowIfEmptySubscriber(destination, errorFactory) {
        var _this = _super.call(this, destination) || this;
        _this.errorFactory = errorFactory;
        _this.hasValue = false;
        return _this;
    }
    ThrowIfEmptySubscriber.prototype._next = function (value) {
        this.hasValue = true;
        this.destination.next(value);
    };
    ThrowIfEmptySubscriber.prototype._complete = function () {
        if (!this.hasValue) {
            var err = void 0;
            try {
                err = this.errorFactory();
            }
            catch (e) {
                err = e;
            }
            this.destination.error(err);
        }
        else {
            return this.destination.complete();
        }
    };
    return ThrowIfEmptySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */

var TakeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_concat,_observable_of PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var EverySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SwitchFirstSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasCompleted = false;
        _this.hasSubscription = false;
        return _this;
    }
    SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult(this, value));
        }
    };
    SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */

var ExhaustMapSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ExhaustMapSubscriber, _super);
    function ExhaustMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
    }
    ExhaustMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    };
    ExhaustMapSubscriber.prototype.tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.hasSubscription = true;
        this._innerSub(result, value, index);
    };
    ExhaustMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscriber = new InnerSubscriber(this, value, index);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
        }
    };
    ExhaustMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
        this.unsubscribe();
    };
    ExhaustMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    ExhaustMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    ExhaustMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        destination.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return ExhaustMapSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var ExpandSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
        }
        return _this;
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            try {
                var project = this.project;
                var result = project(value, index);
                if (!this.scheduler) {
                    this.subscribeToProjection(result, value, index);
                }
                else {
                    var state = { subscriber: this, result: result, value: value, index: index };
                    var destination_1 = this.destination;
                    destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
                }
            }
            catch (e) {
                destination.error(e);
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        var destination = this.destination;
        destination.add(subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
        this.unsubscribe();
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        var destination = this.destination;
        destination.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */

var FinallySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;
        _this.add(new Subscription(callback));
        return _this;
    }
    return FinallySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var FindValueSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
        this.unsubscribe();
    };
    FindValueSubscriber.prototype._next = function (value) {
        var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
        var index = this.index++;
        try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var IgnoreElementsSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
    };
    return IgnoreElementsSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var IsEmptySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */

var TakeLastSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var MapToSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        var _this = _super.call(this, destination) || this;
        _this.value = value;
        return _this;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

var MaterializeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var ScanSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber PURE_IMPORTS_END */

var MergeScanSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var destination = this.destination;
            var ish = void 0;
            try {
                var accumulator = this.accumulator;
                ish = accumulator(this.acc, value, index);
            }
            catch (e) {
                return destination.error(e);
            }
            this.active++;
            this._innerSub(ish, value, index);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new InnerSubscriber(this, value, index);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = subscribeToResult(this, ish, undefined, undefined, innerSubscriber);
        if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
        }
    };
    MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
        this.unsubscribe();
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        var destination = this.destination;
        destination.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    return MergeScanSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */
function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, connectableObservableDescriptor);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/ /*@__PURE__*/ (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());

/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */


var OnErrorResumeNextSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(OnErrorResumeNextSubscriber, _super);
    function OnErrorResumeNextSubscriber(destination, nextSources) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.nextSources = nextSources;
        return _this;
    }
    OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._error = function (err) {
        this.subscribeToNextSource();
        this.unsubscribe();
    };
    OnErrorResumeNextSubscriber.prototype._complete = function () {
        this.subscribeToNextSource();
        this.unsubscribe();
    };
    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
        var next = this.nextSources.shift();
        if (!!next) {
            var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = subscribeToResult(this, next, undefined, undefined, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                destination.add(innerSubscription);
            }
        }
        else {
            this.destination.complete();
        }
    };
    return OnErrorResumeNextSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var PairwiseSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        var pair;
        if (this.hasPrev) {
            pair = [this.prev, value];
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
        if (pair) {
            this.destination.next(pair);
        }
    };
    return PairwiseSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */

/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */

var RepeatSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RepeatSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RepeatWhenSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
        }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
                return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this._unsubscribe = _unsubscribe;
        return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new Subject();
        var retries;
        try {
            var notifier = this.notifier;
            retries = notifier(this.notifications);
        }
        catch (e) {
            return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult(this, retries);
    };
    return RepeatWhenSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var RetrySubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RetrySubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RetryWhenSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject();
                try {
                    var notifier = this.notifier;
                    retries = notifier(errors);
                }
                catch (e) {
                    return _super.prototype.error.call(this, e);
                }
                retriesSubscription = subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this._unsubscribeAndRecycle();
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        this._unsubscribeAndRecycle();
        this._unsubscribe = _unsubscribe;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SampleSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasValue = false;
        return _this;
    }
    SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    };
    return SampleSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */

var SampleTimeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber));
function dispatchNotification(state) {
    var subscriber = state.subscriber, period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var SequenceEqualSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparator) {
        var _this = _super.call(this, destination) || this;
        _this.compareTo = compareTo;
        _this.comparator = comparator;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        }
        else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
        this.unsubscribe();
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this, _a = _c._a, _b = _c._b, comparator = _c.comparator;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            try {
                areEqual = comparator ? comparator(a, b) : a === b;
            }
            catch (e) {
                this.destination.error(e);
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        }
        else {
            this._b.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype.completeB = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
    };
    return SequenceEqualSubscriber;
}(Subscriber));
var SequenceEqualCompareToSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        return _this;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
        this.unsubscribe();
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent.completeB();
        this.unsubscribe();
    };
    return SequenceEqualCompareToSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */
function shareSubjectFactory() {
    return new Subject();
}
function share() {
    return function (source) { return refCount()(multicast(shareSubjectFactory)(source)); };
}

/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */

var SingleSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this.tryNext(value, index);
        }
        else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value, index) {
        try {
            if (this.predicate(value, index, this.source)) {
                this.applySingleValue(value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError);
        }
    };
    return SingleSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var SkipSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */

var SkipLastSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SkipLastSubscriber, _super);
    function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;
        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
    }
    SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        }
        else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    };
    return SkipLastSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SkipUntilSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;
        _this.hasValue = false;
        var innerSubscriber = new InnerSubscriber(_this, undefined, undefined);
        _this.add(innerSubscriber);
        _this.innerSubscription = innerSubscriber;
        var innerSubscription = subscribeToResult(_this, notifier, undefined, undefined, innerSubscriber);
        if (innerSubscription !== innerSubscriber) {
            _this.add(innerSubscription);
            _this.innerSubscription = innerSubscription;
        }
        return _this;
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
            _super.prototype._next.call(this, value);
        }
    };
    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
        if (this.innerSubscription) {
            this.innerSubscription.unsubscribe();
        }
    };
    SkipUntilSubscriber.prototype.notifyComplete = function () {
    };
    return SkipUntilSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var SkipWhileSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.skipping = true;
        _this.index = 0;
        return _this;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    return SkipWhileSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _observable_concat,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */
var SubscribeOnObservable = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
            delayTime = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = asap;
        }
        return _this;
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) {
            delay = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable));

/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */

var SwitchMapSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.index = 0;
        return _this;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        var innerSubscriber = new InnerSubscriber(this, value, index);
        var destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        if (this.innerSubscription !== innerSubscriber) {
            destination.add(this.innerSubscription);
        }
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
        this.unsubscribe();
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        destination.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var TakeUntilSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.seenValue = false;
        return _this;
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.seenValue = true;
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
    };
    return TakeUntilSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var TakeWhileSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate, inclusive) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.inclusive = inclusive;
        _this.index = 0;
        return _this;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            if (this.inclusive) {
                destination.next(value);
            }
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */

var TapSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TapSubscriber, _super);
    function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;
        _this._tapNext = noop;
        _this._tapError = noop;
        _this._tapComplete = noop;
        _this._tapError = error || noop;
        _this._tapComplete = complete || noop;
        if (isFunction(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
        }
        else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || noop;
            _this._tapError = observerOrNext.error || noop;
            _this._tapComplete = observerOrNext.complete || noop;
        }
        return _this;
    }
    TapSubscriber.prototype._next = function (value) {
        try {
            this._tapNext.call(this._context, value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    };
    TapSubscriber.prototype._error = function (err) {
        try {
            this._tapError.call(this._context, err);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    };
    TapSubscriber.prototype._complete = function () {
        try {
            this._tapComplete.call(this._context);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    };
    return TapSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */


var ThrottleSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasValue = false;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        this._hasValue = true;
        this._sendValue = value;
        if (!this._throttled) {
            if (this._leading) {
                this.send();
            }
            else {
                this.throttle(value);
            }
        }
    };
    ThrottleSubscriber.prototype.send = function () {
        var _a = this, _hasValue = _a._hasValue, _sendValue = _a._sendValue;
        if (_hasValue) {
            this.destination.next(_sendValue);
            this.throttle(_sendValue);
        }
        this._hasValue = false;
        this._sendValue = null;
    };
    ThrottleSubscriber.prototype.throttle = function (value) {
        var duration = this.tryDurationSelector(value);
        if (!!duration) {
            this.add(this._throttled = subscribeToResult(this, duration));
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype.throttlingDone = function () {
        var _a = this, _throttled = _a._throttled, _trailing = _a._trailing;
        if (_throttled) {
            _throttled.unsubscribe();
        }
        this._throttled = null;
        if (_trailing) {
            this.send();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.throttlingDone();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this.throttlingDone();
    };
    return ThrottleSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */

var ThrottleTimeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
        var _this = _super.call(this, destination) || this;
        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.leading = leading;
        _this.trailing = trailing;
        _this._hasTrailingValue = false;
        _this._trailingValue = null;
        return _this;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        }
        else {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext$3, this.duration, { subscriber: this }));
            if (this.leading) {
                this.destination.next(value);
            }
            else if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        }
    };
    ThrottleTimeSubscriber.prototype._complete = function () {
        if (this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this.destination.complete();
        }
        else {
            this.destination.complete();
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(Subscriber));
function dispatchNext$3(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}

/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var TimeoutWithSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.withObservable = withObservable;
        _this.scheduler = scheduler;
        _this.action = null;
        _this.scheduleTimeout();
        return _this;
    }
    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
        var withObservable = subscriber.withObservable;
        subscriber._unsubscribeAndRecycle();
        subscriber.add(subscribeToResult(subscriber, withObservable));
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            this.action = action.schedule(this, this.waitFor);
        }
        else {
            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutWithSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.withObservable = null;
    };
    return TimeoutWithSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */

/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.window = new Subject();
        destination.next(_this.window);
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function () {
        this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject();
        destination.next(newWindow);
    };
    return WindowSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */

var WindowCountSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

var CountedSubject = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(CountedSubject, _super);
    function CountedSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._numberOfNextedValues = 0;
        return _this;
    }
    CountedSubject.prototype.next = function (value) {
        this._numberOfNextedValues++;
        _super.prototype.next.call(this, value);
    };
    Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
        get: function () {
            return this._numberOfNextedValues;
        },
        enumerable: true,
        configurable: true
    });
    return CountedSubject;
}(Subject));
var WindowTimeSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowTimeSpan = windowTimeSpan;
        _this.windowCreationInterval = windowCreationInterval;
        _this.maxWindowSize = maxWindowSize;
        _this.scheduler = scheduler;
        _this.windows = [];
        var window = _this.openWindow();
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var closeState = { subscriber: _this, window: window, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        }
        else {
            var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
        return _this;
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            var window_1 = windows[i];
            if (!window_1.closed) {
                window_1.next(value);
                if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                    this.closeWindow(window_1);
                }
            }
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            var window_2 = windows.shift();
            if (!window_2.closed) {
                window_2.complete();
            }
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new CountedSubject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
}(Subscriber));
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
    if (window) {
        subscriber.closeWindow(window);
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(state) {
    var subscriber = state.subscriber, window = state.window, context = state.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}

/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowToggleSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_1 = contexts[index];
                context_1.window.error(err);
                context_1.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_2 = contexts[index];
                context_2.window.complete();
                context_2.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_3 = contexts[index];
                context_3.window.unsubscribe();
                context_3.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingNotifier = void 0;
            try {
                var closingSelector = this.closingSelector;
                closingNotifier = closingSelector(innerValue);
            }
            catch (e) {
                return this.error(e);
            }
            var window_1 = new Subject();
            var subscription = new Subscription();
            var context_4 = { window: window_1, subscription: subscription };
            this.contexts.push(context_4);
            var innerSubscription = subscribeToResult(this, closingNotifier, context_4);
            if (innerSubscription.closed) {
                this.closeWindow(this.contexts.length - 1);
            }
            else {
                innerSubscription.context = context_4;
                subscription.add(innerSubscription);
            }
            this.destination.next(window_1);
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowSubscriber$1 = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.closingSelector = closingSelector;
        _this.openWindow();
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) {
            innerSub = null;
        }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new Subject();
        this.destination.next(window);
        var closingNotifier;
        try {
            var closingSelector = this.closingSelector;
            closingNotifier = closingSelector();
        }
        catch (e) {
            this.destination.error(e);
            this.window.error(e);
            return;
        }
        this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
    };
    return WindowSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WithLatestFromSubscriber = /*@__PURE__*/ /*@__PURE__*/ (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        var _this = _super.call(this, destination) || this;
        _this.observables = observables;
        _this.project = project;
        _this.toRespond = [];
        var len = observables.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            _this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            _this.add(subscribeToResult(_this, observable, observable, i));
        }
        return _this;
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/**
 * @license Angular v9.0.2
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ANNOTATIONS = '__annotations__';
var PARAMETERS = '__parameters__';
var PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 */
function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function DecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call.apply(metaCtor, __spread([this], args));
            return this;
        }
        var annotationInstance = new ((_a = DecoratorFactory).bind.apply(_a, __spread([void 0], args)))();
        return function TypeDecorator(cls) {
            if (typeFn)
                typeFn.apply(void 0, __spread([cls], args));
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                cls[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            if (additionalProcessing)
                additionalProcessing(cls);
            return cls;
        };
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = name;
    DecoratorFactory.annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
function makeMetadataCtor(props) {
    return function ctor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (props) {
            var values = props.apply(void 0, __spread(args));
            for (var propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
function makeParamDecorator(name, props, parentClass) {
    var metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, __spread([void 0], args)))();
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
        function ParamDecorator(cls, unusedKey, index) {
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var parameters = cls.hasOwnProperty(PARAMETERS) ?
                cls[PARAMETERS] :
                Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
function makePropDecorator(name, props, parentClass, additionalProcessing) {
    var metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, __spread([void 0], args)))();
        function PropDecorator(target, name) {
            var constructor = target.constructor;
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var meta = constructor.hasOwnProperty(PROP_METADATA) ?
                constructor[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            if (additionalProcessing)
                additionalProcessing.apply(void 0, __spread([target, name], args));
        }
        return PropDecorator;
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.ngMetadataName = name;
    PropDecoratorFactory.annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ɵ0 = function (token) { return ({ token: token }); };
/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Inject = /*@__PURE__*/ makeParamDecorator('Inject', ɵ0);
/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Optional = /*@__PURE__*/ makeParamDecorator('Optional');
/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Self = /*@__PURE__*/ makeParamDecorator('Self');
/**
 * SkipSelf decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var SkipSelf = /*@__PURE__*/ makeParamDecorator('SkipSelf');
/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Host = /*@__PURE__*/ makeParamDecorator('Host');
var ɵ1 = function (attributeName) { return ({ attributeName: attributeName }); };
/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Attribute = /*@__PURE__*/ makeParamDecorator('Attribute', ɵ1);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection flags for DI.
 *
 * @publicApi
 */
var InjectFlags = /*@__PURE__*/ (function (InjectFlags) {
    // TODO(alxhub): make this 'const' when ngc no longer writes exports of it into ngfactory files.
    /** Check self and check parent injector if needed */
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    InjectFlags[InjectFlags["Host"] = 1] = "Host";
    /** Don't ascend to ancestors of the node requesting injection. */
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
    /** Skip the node that is requesting injection. */
    InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
    /** Inject `defaultValue` instead if token not found. */
    InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
    return InjectFlags;
})({});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function getClosureSafeProperty(objWithPropertyToExtract) {
    for (var key in objWithPropertyToExtract) {
        if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
            return key;
        }
    }
    throw Error('Could not find renamed property on target object.');
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 */
function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token, providedIn: opts.providedIn || null, factory: opts.factory,
        value: undefined,
    };
}
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @publicApi
 */
function ɵɵdefineInjector(options) {
    return {
        factory: options.factory, providers: options.providers || [], imports: options.imports || [],
    };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
function getInjectableDef(type) {
    return getOwnDefinition(type, type[NG_PROV_DEF]) ||
        getOwnDefinition(type, type[NG_INJECTABLE_DEF]);
}
/**
 * Return `def` only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 *
 * The function `Object.hasOwnProperty` is not sufficient to distinguish this case because in older
 * browsers (e.g. IE10) static property inheritance is implemented by copying the properties.
 *
 * Instead, the definition's `token` is compared to the `type`, and if they don't match then the
 * property was not defined directly on the type itself, and was likely inherited. The definition
 * is only returned if the `type` matches the `def.token`.
 */
function getOwnDefinition(type, def) {
    return def && def.token === type ? def : null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in v10, where an error will occur in the scenario if we find the
 * `ɵprov` on an ancestor only.
 */
function getInheritedInjectableDef(type) {
    // See `jit/injectable.ts#compileInjectable` for context on NG_PROV_DEF_FALLBACK.
    var def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF] ||
        (type[NG_PROV_DEF_FALLBACK] && type[NG_PROV_DEF_FALLBACK]()));
    if (def) {
        var typeName = getTypeName(type);
        // TODO(FW-1307): Re-add ngDevMode when closure can handle it
        // ngDevMode &&
        console.warn("DEPRECATED: DI is instantiating a token \"" + typeName + "\" that inherits its @Injectable decorator but does not provide one itself.\n" +
            ("This will become an error in v10. Please add @Injectable() to the \"" + typeName + "\" class."));
        return def;
    }
    else {
        return null;
    }
}
/** Gets the name of a type, accounting for some cross-browser differences. */
function getTypeName(type) {
    // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
    // it'll always return the name of the function itself, no matter how many other functions it
    // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
    // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
    // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
    // the issue by converting the function to a string and parsing its name out that way via a regex.
    if (type.hasOwnProperty('name')) {
        return type.name;
    }
    var match = ('' + type).match(/^function\s*([^\s(]+)/);
    return match === null ? '' : match[1];
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
function getInjectorDef(type) {
    return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
        type[NG_INJ_DEF] :
        null;
}
var NG_PROV_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
var NG_INJ_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
// On IE10 properties defined via `defineProperty` won't be inherited by child classes,
// which will break inheriting the injectable definition from a grandparent through an
// undecorated parent class. We work around it by defining a fallback method which will be
// used to retrieve the definition. This should only be a problem in JIT mode, because in
// AOT TypeScript seems to have a workaround for static properties. When inheriting from an
// undecorated parent is no longer supported in v10, this can safely be removed.
var NG_PROV_DEF_FALLBACK = /*@__PURE__*/ getClosureSafeProperty({ ɵprovFallback: getClosureSafeProperty });
// We need to keep these around so we can read off old defs if new defs are unavailable
var NG_INJECTABLE_DEF = /*@__PURE__*/ getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
var NG_INJECTOR_DEF = /*@__PURE__*/ getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (Array.isArray(token)) {
        return '[' + token.map(stringify).join(', ') + ']';
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return "" + token.overriddenName;
    }
    if (token.name) {
        return "" + token.name;
    }
    var res = token.toString();
    if (res == null) {
        return '' + res;
    }
    var newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
/**
 * Concatenates two strings with separator, allocating new strings only when necessary.
 *
 * @param before before string.
 * @param separator separator string.
 * @param after after string.
 * @returns concatenated string.
 */
function concatStringsWithSpace(before, after) {
    return (before == null || before === '') ?
        (after === null ? '' : after) :
        ((after == null || after === '') ? before : before + ' ' + after);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __forward_ref__ = /*@__PURE__*/ getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
 * a query is not yet defined.
 *
 * @usageNotes
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @publicApi
 */
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return stringify(this()); };
    return forwardRefFn;
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * @see `forwardRef`
 * @publicApi
 */
function resolveForwardRef(type) {
    return isForwardRef(type) ? type() : type;
}
/** Checks whether a function is wrapped by a `forwardRef`. */
function isForwardRef(fn) {
    return typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
        fn.__forward_ref__ === forwardRef;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __globalThis = typeof globalThis !== 'undefined' && globalThis;
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
// Always use __globalThis if available, which is the spec-defined global variable across all
// environments, then fallback to __global first, because in Node tests both __global and
// __window may be defined and _global should be __global in that case.
var _global = __globalThis || __global || __window || __self;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var R3ResolvedDependencyType = /*@__PURE__*/ (function (R3ResolvedDependencyType) {
    R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
    R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
    R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 2] = "ChangeDetectorRef";
    R3ResolvedDependencyType[R3ResolvedDependencyType["Invalid"] = 3] = "Invalid";
    return R3ResolvedDependencyType;
})({});
var R3FactoryTarget = /*@__PURE__*/ (function (R3FactoryTarget) {
    R3FactoryTarget[R3FactoryTarget["Directive"] = 0] = "Directive";
    R3FactoryTarget[R3FactoryTarget["Component"] = 1] = "Component";
    R3FactoryTarget[R3FactoryTarget["Injectable"] = 2] = "Injectable";
    R3FactoryTarget[R3FactoryTarget["Pipe"] = 3] = "Pipe";
    R3FactoryTarget[R3FactoryTarget["NgModule"] = 4] = "NgModule";
    return R3FactoryTarget;
})({});
var ViewEncapsulation = /*@__PURE__*/ (function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    return ViewEncapsulation;
})({});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NG_COMP_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵcmp: getClosureSafeProperty });
var NG_DIR_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵdir: getClosureSafeProperty });
var NG_PIPE_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵpipe: getClosureSafeProperty });
var NG_MOD_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵmod: getClosureSafeProperty });
var NG_LOC_ID_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵloc: getClosureSafeProperty });
var NG_FACTORY_DEF = /*@__PURE__*/ getClosureSafeProperty({ ɵfac: getClosureSafeProperty });
/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
// TODO(misko): This is wrong. The NG_ELEMENT_ID should never be minified.
var NG_ELEMENT_ID = /*@__PURE__*/ getClosureSafeProperty({ __NG_ELEMENT_ID__: getClosureSafeProperty });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ngDevModeResetPerfCounters() {
    var locationString = typeof location !== 'undefined' ? location.toString() : '';
    var newCounters = {
        namedConstructors: locationString.indexOf('ngDevMode=namedConstructors') != -1,
        firstCreatePass: 0,
        tNode: 0,
        tView: 0,
        rendererCreateTextNode: 0,
        rendererSetText: 0,
        rendererCreateElement: 0,
        rendererAddEventListener: 0,
        rendererSetAttribute: 0,
        rendererRemoveAttribute: 0,
        rendererSetProperty: 0,
        rendererSetClassName: 0,
        rendererAddClass: 0,
        rendererRemoveClass: 0,
        rendererSetStyle: 0,
        rendererRemoveStyle: 0,
        rendererDestroy: 0,
        rendererDestroyNode: 0,
        rendererMoveNode: 0,
        rendererRemoveNode: 0,
        rendererAppendChild: 0,
        rendererInsertBefore: 0,
        rendererCreateComment: 0,
    };
    // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
    var allowNgDevModeTrue = locationString.indexOf('ngDevMode=false') === -1;
    _global['ngDevMode'] = allowNgDevModeTrue && newCounters;
    return newCounters;
}
/**
 * This function checks to see if the `ngDevMode` has been set. If yes,
 * then we honor it, otherwise we default to dev mode with additional checks.
 *
 * The idea is that unless we are doing production build where we explicitly
 * set `ngDevMode == false` we should be helping the developer by providing
 * as much early warning and errors as possible.
 *
 * `ɵɵdefineComponent` is guaranteed to have been called before any component template functions
 * (and thus Ivy instructions), so a single initialization there is sufficient to ensure ngDevMode
 * is defined for the entire instruction set.
 *
 * When using checking `ngDevMode` on toplevel, always init it before referencing it
 * (e.g. `((typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode())`), otherwise you can
 *  get a `ReferenceError` like in https://github.com/angular/angular/issues/31595.
 *
 * Details on possible values for `ngDevMode` can be found on its docstring.
 *
 * NOTE:
 * - changes to the `ngDevMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
function initNgDevMode() {
    // The below checks are to ensure that calling `initNgDevMode` multiple times does not
    // reset the counters.
    // If the `ngDevMode` is not an object, then it means we have not created the perf counters
    // yet.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (typeof ngDevMode !== 'object') {
            ngDevModeResetPerfCounters();
        }
        return !!ngDevMode;
    }
    return false;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parameterized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the `inject` function. See below for an example.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule`. As
 * mentioned above, `'root'` is the default value for `providedIn`.
 *
 * @usageNotes
 * ### Basic Example
 *
 * ### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * ### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 *
 * @publicApi
 */
var InjectionToken = /** @class */ /*@__PURE__*/ (function () {
    function InjectionToken(_desc, options) {
        this._desc = _desc;
        /** @internal */
        this.ngMetadataName = 'InjectionToken';
        this.ɵprov = undefined;
        if (typeof options == 'number') {
            // This is a special hack to assign __NG_ELEMENT_ID__ to this instance.
            // __NG_ELEMENT_ID__ is Used by Ivy to determine bloom filter id.
            // We are using it to assign `-1` which is used to identify `Injector`.
            this.__NG_ELEMENT_ID__ = options;
        }
        else if (options !== undefined) {
            this.ɵprov = ɵɵdefineInjectable({
                token: this,
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
    }
    InjectionToken.prototype.toString = function () { return "InjectionToken " + this._desc; };
    return InjectionToken;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * @publicApi
 */
var INJECTOR = /*@__PURE__*/ new InjectionToken('INJECTOR', -1 // `-1` is used by Ivy DI system as special value to recognize it as `Injector`.
);
var _THROW_IF_NOT_FOUND = {};
var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
var NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
var NG_TOKEN_PATH = 'ngTokenPath';
var NEW_LINE = /\n/gm;
var NO_NEW_LINE = 'ɵ';
var SOURCE = '__source';
var ɵ0$1 = getClosureSafeProperty;
var USE_VALUE = /*@__PURE__*/ getClosureSafeProperty({ provide: String, useValue: ɵ0$1 });
/**
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - `null`: `inject` can be called but there is no injector (limp-mode).
 * - Injector instance: Use the injector for resolution.
 */
var _currentInjector = undefined;
function setCurrentInjector(injector) {
    var former = _currentInjector;
    _currentInjector = injector;
    return former;
}
/**
 * Current implementation of inject.
 *
 * By default, it is `injectInjectorOnly`, which makes it `Injector`-only aware. It can be changed
 * to `directiveInject`, which brings in the `NodeInjector` system of ivy. It is designed this
 * way for two reasons:
 *  1. `Injector` should not depend on ivy logic.
 *  2. To maintain tree shake-ability we don't want to bring in unnecessary code.
 */
var _injectImplementation;
/**
 * Sets the current inject implementation.
 */
function setInjectImplementation(impl) {
    var previous = _injectImplementation;
    _injectImplementation = impl;
    return previous;
}
function injectInjectorOnly(token, flags) {
    if (flags === void 0) {
        flags = InjectFlags.Default;
    }
    if (_currentInjector === undefined) {
        throw new Error("inject() must be called from an injection context");
    }
    else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    }
    else {
        return _currentInjector.get(token, flags & InjectFlags.Optional ? null : undefined, flags);
    }
}
function ɵɵinject(token, flags) {
    if (flags === void 0) {
        flags = InjectFlags.Default;
    }
    return (_injectImplementation || injectInjectorOnly)(resolveForwardRef(token), flags);
}
/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * `InjectableDef`.
 */
function injectRootLimpMode(token, notFoundValue, flags) {
    var injectableDef = getInjectableDef(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
            injectableDef.value;
    }
    if (flags & InjectFlags.Optional)
        return null;
    if (notFoundValue !== undefined)
        return notFoundValue;
    throw new Error("Injector: NOT_FOUND [" + stringify(token) + "]");
}
function injectArgs(types) {
    var args = [];
    for (var i = 0; i < types.length; i++) {
        var arg = resolveForwardRef(types[i]);
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            var type = undefined;
            var flags = InjectFlags.Default;
            for (var j = 0; j < arg.length; j++) {
                var meta = arg[j];
                if (meta instanceof Optional || meta.ngMetadataName === 'Optional' || meta === Optional) {
                    flags |= InjectFlags.Optional;
                }
                else if (meta instanceof SkipSelf || meta.ngMetadataName === 'SkipSelf' || meta === SkipSelf) {
                    flags |= InjectFlags.SkipSelf;
                }
                else if (meta instanceof Self || meta.ngMetadataName === 'Self' || meta === Self) {
                    flags |= InjectFlags.Self;
                }
                else if (meta instanceof Inject || meta === Inject) {
                    type = meta.token;
                }
                else {
                    type = meta;
                }
            }
            args.push(ɵɵinject(type, flags));
        }
        else {
            args.push(ɵɵinject(arg));
        }
    }
    return args;
}
var NullInjector = /** @class */ /*@__PURE__*/ (function () {
    function NullInjector() {
    }
    NullInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) {
            notFoundValue = THROW_IF_NOT_FOUND;
        }
        if (notFoundValue === THROW_IF_NOT_FOUND) {
            // Intentionally left behind: With dev tools open the debugger will stop here. There is no
            // reason why correctly written application should cause this exception.
            // TODO(misko): uncomment the next line once `ngDevMode` works with closure.
            // if (ngDevMode) debugger;
            var error = new Error("NullInjectorError: No provider for " + stringify(token) + "!");
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    };
    return NullInjector;
}());
function catchInjectorError(e, token, injectorErrorName, source) {
    var tokenPath = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}
function formatError(text, obj, injectorErrorName, source) {
    if (source === void 0) {
        source = null;
    }
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    var context = stringify(obj);
    if (Array.isArray(obj)) {
        context = obj.map(stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        var parts = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
            }
        }
        context = "{" + parts.join(', ') + "}";
    }
    return "" + injectorErrorName + (source ? '(' + source + ')' : '') + "[" + context + "]: " + text.replace(NEW_LINE, '\n  ');
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @publicApi
 */
var NgModuleRef = /** @class */ /*@__PURE__*/ (function () {
    function NgModuleRef() {
    }
    return NgModuleRef;
}());
/**
 * @publicApi
 */
var NgModuleFactory = /** @class */ /*@__PURE__*/ (function () {
    function NgModuleFactory() {
    }
    return NgModuleFactory;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function assertNumber(actual, msg) {
    if (!(typeof actual === 'number')) {
        throwError$1(msg, typeof actual, 'number', '===');
    }
}
function assertString(actual, msg) {
    if (!(typeof actual === 'string')) {
        throwError$1(msg, actual === null ? 'null' : typeof actual, 'string', '===');
    }
}
function assertEqual(actual, expected, msg) {
    if (!(actual == expected)) {
        throwError$1(msg, actual, expected, '==');
    }
}
function assertNotEqual(actual, expected, msg) {
    if (!(actual != expected)) {
        throwError$1(msg, actual, expected, '!=');
    }
}
function assertSame(actual, expected, msg) {
    if (!(actual === expected)) {
        throwError$1(msg, actual, expected, '===');
    }
}
function assertNotSame(actual, expected, msg) {
    if (!(actual !== expected)) {
        throwError$1(msg, actual, expected, '!==');
    }
}
function assertLessThan(actual, expected, msg) {
    if (!(actual < expected)) {
        throwError$1(msg, actual, expected, '<');
    }
}
function assertGreaterThan(actual, expected, msg) {
    if (!(actual > expected)) {
        throwError$1(msg, actual, expected, '>');
    }
}
function assertDefined(actual, msg) {
    if (actual == null) {
        throwError$1(msg, actual, null, '!=');
    }
}
function throwError$1(msg, actual, expected, comparison) {
    // tslint:disable-next-line
    debugger; // Left intentionally for better debugger experience.
    throw new Error("ASSERTION ERROR: " + msg +
        (comparison == null ? '' : " [Expected=> " + expected + " " + comparison + " " + actual + " <=Actual]"));
}
function assertDomNode(node) {
    // If we're in a worker, `Node` will not be defined.
    assertEqual((typeof Node !== 'undefined' && node instanceof Node) ||
        (typeof node === 'object' && node != null &&
            node.constructor.name === 'WebWorkerRenderNode'), true, "The provided value must be an instance of a DOM Node but got " + stringify(node));
}
function assertDataInRange(arr, index) {
    var maxLen = arr ? arr.length : 0;
    assertLessThan(index, maxLen, "Index expected to be less than " + maxLen + " but got " + index);
}
/**
 * Flattens an array.
 */
function flatten(list, dst) {
    if (dst === undefined)
        dst = list;
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (Array.isArray(item)) {
            // we need to inline it.
            if (dst === list) {
                // Our assumption that the list was already flat was wrong and
                // we need to clone flat since we need to write to it.
                dst = list.slice(0, i);
            }
            flatten(item, dst);
        }
        else if (dst !== list) {
            dst.push(item);
        }
    }
    return dst;
}
function deepForEach(input, fn) {
    input.forEach(function (value) { return Array.isArray(value) ? deepForEach(value, fn) : fn(value); });
}
function addToArray(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        return arr.pop();
    }
    else {
        return arr.splice(index, 1)[0];
    }
}
function newArray(size, value) {
    var list = [];
    for (var i = 0; i < size; i++) {
        list.push(value);
    }
    return list;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The strategy that the default change detector uses to detect changes.
 * When set, takes effect the next time change detection is triggered.
 *
 * @publicApi
 */
var ChangeDetectionStrategy = /*@__PURE__*/ (function (ChangeDetectionStrategy) {
    /**
     * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
     * until reactivated by setting the strategy to `Default` (`CheckAlways`).
     * Change detection can still be explicitly invoked.
     * This strategy applies to all child directives and cannot be overridden.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    /**
     * Use the default `CheckAlways` strategy, in which change detection is automatic until
     * explicitly deactivated.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    return ChangeDetectionStrategy;
})({});
/**
 * Defines the possible states of the default change detector.
 * @see `ChangeDetectorRef`
 */
var ChangeDetectorStatus = /*@__PURE__*/ (function (ChangeDetectorStatus) {
    /**
     * A state in which, after calling `detectChanges()`, the change detector
     * state becomes `Checked`, and must be explicitly invoked or reactivated.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
    /**
     * A state in which change detection is skipped until the change detector mode
     * becomes `CheckOnce`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
    /**
     * A state in which change detection continues automatically until explicitly
     * deactivated.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
    /**
     * A state in which a change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
    /**
     * Indicates that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state do not detect changes.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
    /**
     * Indicates that the change detector has been destroyed.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
    return ChangeDetectorStatus;
})({});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/ts/metadata/encapsulation.ts region='longform'}
 *
 * @publicApi
 */
var ViewEncapsulation$1 = /*@__PURE__*/ (function (ViewEncapsulation) {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via {@link Component#styles styles} or
     * {@link Component#styleUrls styleUrls}, and adding the new Host Element attribute to all
     * selectors.
     *
     * This is the default option.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * @deprecated v6.1.0 - use {ViewEncapsulation.ShadowDom} instead.
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using the deprecated [Shadow DOM
     * v0](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't provide any template or style encapsulation.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    /**
     * Use Shadow DOM to encapsulate styles.
     *
     * For the DOM this means using modern [Shadow
     * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    return ViewEncapsulation;
})({});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Convince closure compiler that the wrapped function has no side-effects.
 *
 * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
 * allow us to execute a function but have closure compiler mark the call as no-side-effects.
 * It is important that the return value for the `noSideEffects` function be assigned
 * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
 * compiler.
 */
function noSideEffects(fn) {
    return '' + { toString: fn };
}
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
/**
 * This file contains reuseable "empty" symbols that can be used as default return values
 * in different parts of the rendering code. Because the same symbols are returned, this
 * allows for identity checks against these values to be consistently used by the framework
 * code.
 */
var EMPTY_OBJ = {};
var EMPTY_ARRAY = [];
// freezing the values prevents any code from accidentally inserting new values in
if ((typeof ngDevMode === 'undefined' || ngDevMode) && /*@__PURE__*/ initNgDevMode()) {
    // These property accesses can be ignored because ngDevMode will be set to false
    // when optimizing code and the whole if statement will be dropped.
    // tslint:disable-next-line:no-toplevel-property-access
    /*@__PURE__*/ Object.freeze(EMPTY_OBJ);
    // tslint:disable-next-line:no-toplevel-property-access
    /*@__PURE__*/ Object.freeze(EMPTY_ARRAY);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _renderCompCount = 0;
/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ɵcmp = defineComponent({
 *     ...
 *   });
 * }
 * ```
 * @codeGenApi
 */
function ɵɵdefineComponent(componentDefinition) {
    // Initialize ngDevMode. This must be the first statement in ɵɵdefineComponent.
    // See the `initNgDevMode` docstring for more information.
    (typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode();
    var type = componentDefinition.type;
    var typePrototype = type.prototype;
    var declaredInputs = {};
    var def = {
        type: type,
        providersResolver: null,
        decls: componentDefinition.decls,
        vars: componentDefinition.vars,
        factory: null,
        template: componentDefinition.template || null,
        consts: componentDefinition.consts || null,
        ngContentSelectors: componentDefinition.ngContentSelectors,
        hostBindings: componentDefinition.hostBindings || null,
        hostVars: componentDefinition.hostVars || 0,
        hostAttrs: componentDefinition.hostAttrs || null,
        contentQueries: componentDefinition.contentQueries || null,
        declaredInputs: declaredInputs,
        inputs: null,
        outputs: null,
        exportAs: componentDefinition.exportAs || null,
        onChanges: null,
        onInit: typePrototype.ngOnInit || null,
        doCheck: typePrototype.ngDoCheck || null,
        afterContentInit: typePrototype.ngAfterContentInit || null,
        afterContentChecked: typePrototype.ngAfterContentChecked || null,
        afterViewInit: typePrototype.ngAfterViewInit || null,
        afterViewChecked: typePrototype.ngAfterViewChecked || null,
        onDestroy: typePrototype.ngOnDestroy || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        selectors: componentDefinition.selectors || EMPTY_ARRAY,
        viewQuery: componentDefinition.viewQuery || null,
        features: componentDefinition.features || null,
        data: componentDefinition.data || {},
        // TODO(misko): convert ViewEncapsulation into const enum so that it can be used directly in the
        // next line. Also `None` should be 0 not 2.
        encapsulation: componentDefinition.encapsulation || ViewEncapsulation$1.Emulated,
        id: 'c',
        styles: componentDefinition.styles || EMPTY_ARRAY,
        _: null,
        setInput: null,
        schemas: componentDefinition.schemas || null,
        tView: null,
    };
    def._ = noSideEffects(function () {
        var directiveTypes = componentDefinition.directives;
        var feature = componentDefinition.features;
        var pipeTypes = componentDefinition.pipes;
        def.id += _renderCompCount++;
        def.inputs = invertObject(componentDefinition.inputs, declaredInputs), def.outputs = invertObject(componentDefinition.outputs), feature && feature.forEach(function (fn) { return fn(def); });
        def.directiveDefs = directiveTypes ?
            function () {
                return (typeof directiveTypes === 'function' ? directiveTypes() : directiveTypes)
                    .map(extractDirectiveDef);
            } :
            null;
        def.pipeDefs = pipeTypes ?
            function () { return (typeof pipeTypes === 'function' ? pipeTypes() : pipeTypes).map(extractPipeDef); } :
            null;
    });
    return def;
}
function extractDirectiveDef(type) {
    var def = getComponentDef(type) || getDirectiveDef(type);
    if (ngDevMode && !def) {
        throw new Error("'" + type.name + "' is neither 'ComponentType' or 'DirectiveType'.");
    }
    return def;
}
function extractPipeDef(type) {
    var def = getPipeDef(type);
    if (ngDevMode && !def) {
        throw new Error("'" + type.name + "' is not a 'PipeType'.");
    }
    return def;
}
/**
 * Inverts an inputs or outputs lookup such that the keys, which were the
 * minified keys, are part of the values, and the values are parsed so that
 * the publicName of the property is the new key
 *
 * e.g. for
 *
 * ```
 * class Comp {
 *   @Input()
 *   propName1: string;
 *
 *   @Input('publicName2')
 *   declaredPropName2: number;
 * }
 * ```
 *
 * will be serialized as
 *
 * ```
 * {
 *   propName1: 'propName1',
 *   declaredPropName2: ['publicName2', 'declaredPropName2'],
 * }
 * ```
 *
 * which is than translated by the minifier as:
 *
 * ```
 * {
 *   minifiedPropName1: 'propName1',
 *   minifiedPropName2: ['publicName2', 'declaredPropName2'],
 * }
 * ```
 *
 * becomes: (public name => minifiedName)
 *
 * ```
 * {
 *  'propName1': 'minifiedPropName1',
 *  'publicName2': 'minifiedPropName2',
 * }
 * ```
 *
 * Optionally the function can take `secondary` which will result in: (public name => declared name)
 *
 * ```
 * {
 *  'propName1': 'propName1',
 *  'publicName2': 'declaredPropName2',
 * }
 * ```
 *

 */
function invertObject(obj, secondary) {
    if (obj == null)
        return EMPTY_OBJ;
    var newLookup = {};
    for (var minifiedKey in obj) {
        if (obj.hasOwnProperty(minifiedKey)) {
            var publicName = obj[minifiedKey];
            var declaredName = publicName;
            if (Array.isArray(publicName)) {
                declaredName = publicName[1];
                publicName = publicName[0];
            }
            newLookup[publicName] = minifiedKey;
            if (secondary) {
                (secondary[publicName] = declaredName);
            }
        }
    }
    return newLookup;
}
/**
 * The following getter methods retrieve the definition form the type. Currently the retrieval
 * honors inheritance, but in the future we may change the rule to require that definitions are
 * explicit. This would require some sort of migration strategy.
 */
function getComponentDef(type) {
    return type[NG_COMP_DEF] || null;
}
function getDirectiveDef(type) {
    return type[NG_DIR_DEF] || null;
}
function getPipeDef(type) {
    return type[NG_PIPE_DEF] || null;
}
function getFactoryDef(type, throwNotFound) {
    var hasFactoryDef = type.hasOwnProperty(NG_FACTORY_DEF);
    if (!hasFactoryDef && throwNotFound === true && ngDevMode) {
        throw new Error("Type " + stringify(type) + " does not have '\u0275fac' property.");
    }
    return hasFactoryDef ? type[NG_FACTORY_DEF] : null;
}
function getNgModuleDef(type, throwNotFound) {
    var ngModuleDef = type[NG_MOD_DEF] || null;
    if (!ngModuleDef && throwNotFound === true) {
        throw new Error("Type " + stringify(type) + " does not have '\u0275mod' property.");
    }
    return ngModuleDef;
}
function getNgLocaleIdDef(type) {
    return type[NG_LOC_ID_DEF] || null;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
var HOST = 0;
var TVIEW = 1;
var FLAGS = 2;
var PARENT = 3;
var NEXT = 4;
var QUERIES = 5;
var T_HOST = 6;
var CLEANUP = 7;
var CONTEXT = 8;
var INJECTOR$1 = 9;
var RENDERER_FACTORY = 10;
var RENDERER = 11;
var SANITIZER = 12;
var CHILD_HEAD = 13;
var CHILD_TAIL = 14;
var DECLARATION_VIEW = 15;
var DECLARATION_COMPONENT_VIEW = 16;
var DECLARATION_LCONTAINER = 17;
var PREORDER_HOOK_FLAGS = 18;
/** Size of LView's header. Necessary to adjust for it when setting slots.  */
var HEADER_OFFSET = 19;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
var TYPE = 1;
/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
var ACTIVE_INDEX = 2;
// PARENT and NEXT are indices 3 and 4
// As we already have these constants in LView, we don't need to re-create them.
var MOVED_VIEWS = 5;
// T_HOST is index 6
// We already have this constants in LView, we don't need to re-create it.
var NATIVE = 7;
/**
 * Size of LContainer's header. Represents the index after which all views in the
 * container will be inserted. We need to keep a record of current views so we know
 * which views are already in the DOM (and don't need to be re-added) and so we can
 * remove views from the DOM when they are no longer required.
 */
var CONTAINER_HEADER_OFFSET = 9;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
* True if `value` is `LView`.
* @param value wrapped value of `RNode`, `LView`, `LContainer`
*/
function isLView(value) {
    return Array.isArray(value) && typeof value[TYPE] === 'object';
}
/**
 * True if `value` is `LContainer`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function isLContainer(value) {
    return Array.isArray(value) && value[TYPE] === true;
}
function isComponentHost(tNode) {
    return (tNode.flags & 2 /* isComponentHost */) === 2 /* isComponentHost */;
}
function isComponentDef(def) {
    return def.template !== null;
}
function isRootView(target) {
    return (target[FLAGS] & 512 /* IsRoot */) !== 0;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function assertTNodeForLView(tNode, lView) {
    tNode.hasOwnProperty('tView_') && assertEqual(tNode.tView_, lView[TVIEW], 'This TNode does not belong to this LView.');
}
function assertComponentType(actual, msg) {
    if (msg === void 0) {
        msg = 'Type passed in is not ComponentType, it does not have \'ɵcmp\' property.';
    }
    if (!getComponentDef(actual)) {
        throwError$1(msg);
    }
}
function assertLContainer(value) {
    assertDefined(value, 'LContainer must be defined');
    assertEqual(isLContainer(value), true, 'Expecting LContainer');
}
function assertLViewOrUndefined(value) {
    value && assertEqual(isLView(value), true, 'Expecting LView or undefined or null');
}
function assertLView(value) {
    assertDefined(value, 'LView must be defined');
    assertEqual(isLView(value), true, 'Expecting LView');
}
function assertFirstCreatePass(tView, errMessage) {
    assertEqual(tView.firstCreatePass, true, errMessage || 'Should only be called in first create pass.');
}
/**
 * This is a basic sanity check that an object is probably a directive def. DirectiveDef is
 * an interface, so we can't do a direct instanceof check.
 */
function assertDirectiveDef(obj) {
    if (obj.type === undefined || obj.selectors == undefined || obj.inputs === undefined) {
        throwError$1("Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.");
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var MATH_ML_NAMESPACE = 'http://www.w3.org/1998/MathML/';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var instructionState = {
    lFrame: /*@__PURE__*/ createLFrame(null),
    bindingsEnabled: true,
    checkNoChangesMode: false,
};
/**
 * Return the current `LView`.
 */
function getLView() {
    return instructionState.lFrame.lView;
}
/**
 * Return the current `TView`.
 */
function getTView() {
    return instructionState.lFrame.tView;
}
function getPreviousOrParentTNode() {
    return instructionState.lFrame.previousOrParentTNode;
}
function setPreviousOrParentTNode(tNode, isParent) {
    instructionState.lFrame.previousOrParentTNode = tNode;
    instructionState.lFrame.isParent = isParent;
}
function getIsParent() {
    return instructionState.lFrame.isParent;
}
function getCheckNoChangesMode() {
    // TODO(misko): remove this from the LView since it is ngDevMode=true mode only.
    return instructionState.checkNoChangesMode;
}
function setCheckNoChangesMode(mode) {
    instructionState.checkNoChangesMode = mode;
}
function getBindingIndex() {
    return instructionState.lFrame.bindingIndex;
}
function setBindingIndex(value) {
    return instructionState.lFrame.bindingIndex = value;
}
function nextBindingIndex() {
    return instructionState.lFrame.bindingIndex++;
}
/**
 * Set a new binding root index so that host template functions can execute.
 *
 * Bindings inside the host template are 0 index. But because we don't know ahead of time
 * how many host bindings we have we can't pre-compute them. For this reason they are all
 * 0 index and we just shift the root so that they match next available location in the LView.
 *
 * @param bindingRootIndex Root index for `hostBindings`
 * @param currentDirectiveIndex `TData[currentDirectiveIndex]` will point to the current directive
 *        whose `hostBindings` are being processed.
 */
function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
    var lFrame = instructionState.lFrame;
    lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex;
    lFrame.currentDirectiveIndex = currentDirectiveIndex;
}
function setCurrentQueryIndex(value) {
    instructionState.lFrame.currentQueryIndex = value;
}
/**
 * This is a light weight version of the `enterView` which is needed by the DI system.
 * @param newView
 * @param tNode
 */
function enterDI(newView, tNode) {
    ngDevMode && assertLViewOrUndefined(newView);
    var newLFrame = allocLFrame();
    instructionState.lFrame = newLFrame;
    newLFrame.previousOrParentTNode = tNode;
    newLFrame.lView = newView;
}
/**
 * Swap the current lView with a new lView.
 *
 * For performance reasons we store the lView in the top level of the module.
 * This way we minimize the number of properties to read. Whenever a new view
 * is entered we have to store the lView for later, and when the view is
 * exited the state has to be restored
 *
 * @param newView New lView to become active
 * @param tNode Element to which the View is a child of
 * @returns the previously active lView;
 */
function enterView(newView, tNode) {
    ngDevMode && assertLViewOrUndefined(newView);
    var newLFrame = allocLFrame();
    if (ngDevMode) {
        assertEqual(newLFrame.isParent, true, 'Expected clean LFrame');
        assertEqual(newLFrame.lView, null, 'Expected clean LFrame');
        assertEqual(newLFrame.tView, null, 'Expected clean LFrame');
        assertEqual(newLFrame.selectedIndex, 0, 'Expected clean LFrame');
        assertEqual(newLFrame.elementDepthCount, 0, 'Expected clean LFrame');
        assertEqual(newLFrame.currentDirectiveIndex, -1, 'Expected clean LFrame');
        assertEqual(newLFrame.currentNamespace, null, 'Expected clean LFrame');
        assertEqual(newLFrame.currentSanitizer, null, 'Expected clean LFrame');
        assertEqual(newLFrame.bindingRootIndex, -1, 'Expected clean LFrame');
        assertEqual(newLFrame.currentQueryIndex, 0, 'Expected clean LFrame');
    }
    var tView = newView[TVIEW];
    instructionState.lFrame = newLFrame;
    newLFrame.previousOrParentTNode = tNode;
    newLFrame.lView = newView;
    newLFrame.tView = tView;
    newLFrame.contextLView = newView;
    newLFrame.bindingIndex = tView.bindingStartIndex;
}
/**
 * Allocates next free LFrame. This function tries to reuse the `LFrame`s to lower memory pressure.
 */
function allocLFrame() {
    var currentLFrame = instructionState.lFrame;
    var childLFrame = currentLFrame === null ? null : currentLFrame.child;
    var newLFrame = childLFrame === null ? createLFrame(currentLFrame) : childLFrame;
    return newLFrame;
}
function createLFrame(parent) {
    var lFrame = {
        previousOrParentTNode: null,
        isParent: true,
        lView: null,
        tView: null,
        selectedIndex: 0,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentSanitizer: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: parent,
        child: null,
    };
    parent !== null && (parent.child = lFrame); // link the new LFrame for reuse.
    return lFrame;
}
/**
 * A lightweight version of leave which is used with DI.
 *
 * This function only resets `previousOrParentTNode` and `LView` as those are the only properties
 * used with DI (`enterDI()`).
 *
 * NOTE: This function is reexported as `leaveDI`. However `leaveDI` has return type of `void` where
 * as `leaveViewLight` has `LFrame`. This is so that `leaveViewLight` can be used in `leaveView`.
 */
function leaveViewLight() {
    var oldLFrame = instructionState.lFrame;
    instructionState.lFrame = oldLFrame.parent;
    oldLFrame.previousOrParentTNode = null;
    oldLFrame.lView = null;
    return oldLFrame;
}
/**
 * This is a lightweight version of the `leaveView` which is needed by the DI system.
 *
 * NOTE: this function is an alias so that we can change the type of the function to have `void`
 * return type.
 */
var leaveDI = leaveViewLight;
/**
 * Leave the current `LView`
 *
 * This pops the `LFrame` with the associated `LView` from the stack.
 *
 * IMPORTANT: We must zero out the `LFrame` values here otherwise they will be retained. This is
 * because for performance reasons we don't release `LFrame` but rather keep it for next use.
 */
function leaveView() {
    var oldLFrame = leaveViewLight();
    oldLFrame.isParent = true;
    oldLFrame.tView = null;
    oldLFrame.selectedIndex = 0;
    oldLFrame.contextLView = null;
    oldLFrame.elementDepthCount = 0;
    oldLFrame.currentDirectiveIndex = -1;
    oldLFrame.currentNamespace = null;
    oldLFrame.currentSanitizer = null;
    oldLFrame.bindingRootIndex = -1;
    oldLFrame.bindingIndex = -1;
    oldLFrame.currentQueryIndex = 0;
}
/**
 * Gets the currently selected element index.
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 */
function getSelectedIndex() {
    return instructionState.lFrame.selectedIndex;
}
/**
 * Sets the most recent index passed to {@link select}
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 *
 * (Note that if an "exit function" was set earlier (via `setElementExitFn()`) then that will be
 * run if and when the provided `index` value is different from the current selected index value.)
 */
function setSelectedIndex(index) {
    instructionState.lFrame.selectedIndex = index;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Adds all directive lifecycle hooks from the given `DirectiveDef` to the given `TView`.
 *
 * Must be run *only* on the first template pass.
 *
 * Sets up the pre-order hooks on the provided `tView`,
 * see {@link HookData} for details about the data structure.
 *
 * @param directiveIndex The index of the directive in LView
 * @param directiveDef The definition containing the hooks to setup in tView
 * @param tView The current TView
 */
function registerPreOrderHooks(directiveIndex, directiveDef, tView) {
    ngDevMode && assertFirstCreatePass(tView);
    var onChanges = directiveDef.onChanges, onInit = directiveDef.onInit, doCheck = directiveDef.doCheck;
    if (onChanges) {
        (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, onChanges);
        (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, onChanges);
    }
    if (onInit) {
        (tView.preOrderHooks || (tView.preOrderHooks = [])).push(-directiveIndex, onInit);
    }
    if (doCheck) {
        (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, doCheck);
        (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, doCheck);
    }
}
/**
 *
 * Loops through the directives on the provided `tNode` and queues hooks to be
 * run that are not initialization hooks.
 *
 * Should be executed during `elementEnd()` and similar to
 * preserve hook execution order. Content, view, and destroy hooks for projected
 * components and directives must be called *before* their hosts.
 *
 * Sets up the content, view, and destroy hooks on the provided `tView`,
 * see {@link HookData} for details about the data structure.
 *
 * NOTE: This does not set up `onChanges`, `onInit` or `doCheck`, those are set up
 * separately at `elementStart`.
 *
 * @param tView The current TView
 * @param tNode The TNode whose directives are to be searched for hooks to queue
 */
function registerPostOrderHooks(tView, tNode) {
    ngDevMode && assertFirstCreatePass(tView);
    // It's necessary to loop through the directives at elementEnd() (rather than processing in
    // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
    // hooks for projected components and directives must be called *before* their hosts.
    for (var i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
        var directiveDef = tView.data[i];
        if (directiveDef.afterContentInit) {
            (tView.contentHooks || (tView.contentHooks = [])).push(-i, directiveDef.afterContentInit);
        }
        if (directiveDef.afterContentChecked) {
            (tView.contentHooks || (tView.contentHooks = [])).push(i, directiveDef.afterContentChecked);
            (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, directiveDef.afterContentChecked);
        }
        if (directiveDef.afterViewInit) {
            (tView.viewHooks || (tView.viewHooks = [])).push(-i, directiveDef.afterViewInit);
        }
        if (directiveDef.afterViewChecked) {
            (tView.viewHooks || (tView.viewHooks = [])).push(i, directiveDef.afterViewChecked);
            (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, directiveDef.afterViewChecked);
        }
        if (directiveDef.onDestroy != null) {
            (tView.destroyHooks || (tView.destroyHooks = [])).push(i, directiveDef.onDestroy);
        }
    }
}
/**
 * Executing hooks requires complex logic as we need to deal with 2 constraints.
 *
 * 1. Init hooks (ngOnInit, ngAfterContentInit, ngAfterViewInit) must all be executed once and only
 * once, across many change detection cycles. This must be true even if some hooks throw, or if
 * some recursively trigger a change detection cycle.
 * To solve that, it is required to track the state of the execution of these init hooks.
 * This is done by storing and maintaining flags in the view: the {@link InitPhaseState},
 * and the index within that phase. They can be seen as a cursor in the following structure:
 * [[onInit1, onInit2], [afterContentInit1], [afterViewInit1, afterViewInit2, afterViewInit3]]
 * They are are stored as flags in LView[FLAGS].
 *
 * 2. Pre-order hooks can be executed in batches, because of the select instruction.
 * To be able to pause and resume their execution, we also need some state about the hook's array
 * that is being processed:
 * - the index of the next hook to be executed
 * - the number of init hooks already found in the processed part of the  array
 * They are are stored as flags in LView[PREORDER_HOOK_FLAGS].
 */
/**
 * Executes pre-order check hooks ( OnChanges, DoChanges) given a view where all the init hooks were
 * executed once. This is a light version of executeInitAndCheckPreOrderHooks where we can skip read
 * / write of the init-hooks related flags.
 * @param lView The LView where hooks are defined
 * @param hooks Hooks to be run
 * @param nodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function executeCheckHooks(lView, hooks, nodeIndex) {
    callHooks(lView, hooks, 3 /* InitPhaseCompleted */, nodeIndex);
}
/**
 * Executes post-order init and check hooks (one of AfterContentInit, AfterContentChecked,
 * AfterViewInit, AfterViewChecked) given a view where there are pending init hooks to be executed.
 * @param lView The LView where hooks are defined
 * @param hooks Hooks to be run
 * @param initPhase A phase for which hooks should be run
 * @param nodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
    ngDevMode && assertNotEqual(initPhase, 3 /* InitPhaseCompleted */, 'Init pre-order hooks should not be called more than once');
    if ((lView[FLAGS] & 3 /* InitPhaseStateMask */) === initPhase) {
        callHooks(lView, hooks, initPhase, nodeIndex);
    }
}
function incrementInitPhaseFlags(lView, initPhase) {
    ngDevMode &&
        assertNotEqual(initPhase, 3 /* InitPhaseCompleted */, 'Init hooks phase should not be incremented after all init hooks have been run.');
    var flags = lView[FLAGS];
    if ((flags & 3 /* InitPhaseStateMask */) === initPhase) {
        flags &= 1023 /* IndexWithinInitPhaseReset */;
        flags += 1 /* InitPhaseStateIncrementer */;
        lView[FLAGS] = flags;
    }
}
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * the first LView pass
 *
 * @param currentView The current view
 * @param arr The array in which the hooks are found
 * @param initPhaseState the current state of the init phase
 * @param currentNodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function callHooks(currentView, arr, initPhase, currentNodeIndex) {
    ngDevMode && assertEqual(getCheckNoChangesMode(), false, 'Hooks should never be run in the check no changes mode.');
    var startIndex = currentNodeIndex !== undefined ?
        (currentView[PREORDER_HOOK_FLAGS] & 65535 /* IndexOfTheNextPreOrderHookMaskMask */) :
        0;
    var nodeIndexLimit = currentNodeIndex != null ? currentNodeIndex : -1;
    var lastNodeIndexFound = 0;
    for (var i = startIndex; i < arr.length; i++) {
        var hook = arr[i + 1];
        if (typeof hook === 'number') {
            lastNodeIndexFound = arr[i];
            if (currentNodeIndex != null && lastNodeIndexFound >= currentNodeIndex) {
                break;
            }
        }
        else {
            var isInitHook = arr[i] < 0;
            if (isInitHook)
                currentView[PREORDER_HOOK_FLAGS] += 65536 /* NumberOfInitHooksCalledIncrementer */;
            if (lastNodeIndexFound < nodeIndexLimit || nodeIndexLimit == -1) {
                callHook(currentView, initPhase, arr, i);
                currentView[PREORDER_HOOK_FLAGS] =
                    (currentView[PREORDER_HOOK_FLAGS] & 4294901760 /* NumberOfInitHooksCalledMask */) + i +
                        2;
            }
            i++;
        }
    }
}
/**
 * Execute one hook against the current `LView`.
 *
 * @param currentView The current view
 * @param initPhaseState the current state of the init phase
 * @param arr The array in which the hooks are found
 * @param i The current index within the hook data array
 */
function callHook(currentView, initPhase, arr, i) {
    var isInitHook = arr[i] < 0;
    var hook = arr[i + 1];
    var directiveIndex = isInitHook ? -arr[i] : arr[i];
    var directive = currentView[directiveIndex];
    if (isInitHook) {
        var indexWithintInitPhase = currentView[FLAGS] >> 10;
        // The init phase state must be always checked here as it may have been recursively
        // updated
        if (indexWithintInitPhase <
            (currentView[PREORDER_HOOK_FLAGS] >> 16 /* NumberOfInitHooksCalledShift */) &&
            (currentView[FLAGS] & 3 /* InitPhaseStateMask */) === initPhase) {
            currentView[FLAGS] += 1024 /* IndexWithinInitPhaseIncrementer */;
            hook.call(directive);
        }
    }
    else {
        hook.call(directive);
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var TNODE = 8;
var PARENT_INJECTOR = 8;
var INJECTOR_BLOOM_PARENT_SIZE = 9;
var NO_PARENT_INJECTOR = -1;
/**
 * Each injector is saved in 9 contiguous slots in `LView` and 9 contiguous slots in
 * `TView.data`. This allows us to store information about the current node's tokens (which
 * can be shared in `TView`) as well as the tokens of its ancestor nodes (which cannot be
 * shared, so they live in `LView`).
 *
 * Each of these slots (aside from the last slot) contains a bloom filter. This bloom filter
 * determines whether a directive is available on the associated node or not. This prevents us
 * from searching the directives array at this level unless it's probable the directive is in it.
 *
 * See: https://en.wikipedia.org/wiki/Bloom_filter for more about bloom filters.
 *
 * Because all injectors have been flattened into `LView` and `TViewData`, they cannot typed
 * using interfaces as they were previously. The start index of each `LInjector` and `TInjector`
 * will differ based on where it is flattened into the main array, so it's not possible to know
 * the indices ahead of time and save their types here. The interfaces are still included here
 * for documentation purposes.
 *
 * export interface LInjector extends Array<any> {
 *
 *    // Cumulative bloom for directive IDs 0-31  (IDs are % BLOOM_SIZE)
 *    [0]: number;
 *
 *    // Cumulative bloom for directive IDs 32-63
 *    [1]: number;
 *
 *    // Cumulative bloom for directive IDs 64-95
 *    [2]: number;
 *
 *    // Cumulative bloom for directive IDs 96-127
 *    [3]: number;
 *
 *    // Cumulative bloom for directive IDs 128-159
 *    [4]: number;
 *
 *    // Cumulative bloom for directive IDs 160 - 191
 *    [5]: number;
 *
 *    // Cumulative bloom for directive IDs 192 - 223
 *    [6]: number;
 *
 *    // Cumulative bloom for directive IDs 224 - 255
 *    [7]: number;
 *
 *    // We need to store a reference to the injector's parent so DI can keep looking up
 *    // the injector tree until it finds the dependency it's looking for.
 *    [PARENT_INJECTOR]: number;
 * }
 *
 * export interface TInjector extends Array<any> {
 *
 *    // Shared node bloom for directive IDs 0-31  (IDs are % BLOOM_SIZE)
 *    [0]: number;
 *
 *    // Shared node bloom for directive IDs 32-63
 *    [1]: number;
 *
 *    // Shared node bloom for directive IDs 64-95
 *    [2]: number;
 *
 *    // Shared node bloom for directive IDs 96-127
 *    [3]: number;
 *
 *    // Shared node bloom for directive IDs 128-159
 *    [4]: number;
 *
 *    // Shared node bloom for directive IDs 160 - 191
 *    [5]: number;
 *
 *    // Shared node bloom for directive IDs 192 - 223
 *    [6]: number;
 *
 *    // Shared node bloom for directive IDs 224 - 255
 *    [7]: number;
 *
 *    // Necessary to find directive indices for a particular node.
 *    [TNODE]: TElementNode|TElementContainerNode|TContainerNode;
 *  }
 */
/**
* Factory for creating instances of injectors in the NodeInjector.
*
* This factory is complicated by the fact that it can resolve `multi` factories as well.
*
* NOTE: Some of the fields are optional which means that this class has two hidden classes.
* - One without `multi` support (most common)
* - One with `multi` values, (rare).
*
* Since VMs can cache up to 4 inline hidden classes this is OK.
*
* - Single factory: Only `resolving` and `factory` is defined.
* - `providers` factory: `componentProviders` is a number and `index = -1`.
* - `viewProviders` factory: `componentProviders` is a number and `index` points to `providers`.
*/
var NodeInjectorFactory = /** @class */ /*@__PURE__*/ (function () {
    function NodeInjectorFactory(
    /**
     * Factory to invoke in order to create a new instance.
     */
    factory, 
    /**
     * Set to `true` if the token is declared in `viewProviders` (or if it is component).
     */
    isViewProvider, injectImplementation) {
        this.factory = factory;
        /**
         * Marker set to true during factory invocation to see if we get into recursive loop.
         * Recursive loop causes an error to be displayed.
         */
        this.resolving = false;
        this.canSeeViewProviders = isViewProvider;
        this.injectImpl = injectImplementation;
    }
    return NodeInjectorFactory;
}());
function isFactory(obj) {
    return obj instanceof NodeInjectorFactory;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function assertNodeType(tNode, type) {
    assertDefined(tNode, 'should be called with a TNode');
    assertEqual(tNode.type, type, "should be a " + typeName(type));
}
function assertNodeOfPossibleTypes(tNode) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    assertDefined(tNode, 'should be called with a TNode');
    var found = types.some(function (type) { return tNode.type === type; });
    assertEqual(found, true, "Should be one of " + types.map(typeName).join(', ') + " but got " + typeName(tNode.type));
}
function typeName(type) {
    if (type == 1 /* Projection */)
        return 'Projection';
    if (type == 0 /* Container */)
        return 'Container';
    if (type == 5 /* IcuContainer */)
        return 'IcuContainer';
    if (type == 2 /* View */)
        return 'View';
    if (type == 3 /* Element */)
        return 'Element';
    if (type == 4 /* ElementContainer */)
        return 'ElementContainer';
    return '<unknown>';
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Most of the use of `document` in Angular is from within the DI system so it is possible to simply
 * inject the `DOCUMENT` token and are done.
 *
 * Ivy is special because it does not rely upon the DI and must get hold of the document some other
 * way.
 *
 * The solution is to define `getDocument()` and `setDocument()` top-level functions for ivy.
 * Wherever ivy needs the global document, it calls `getDocument()` instead.
 *
 * When running ivy outside of a browser environment, it is necessary to call `setDocument()` to
 * tell ivy what the global `document` is.
 *
 * Angular does this for us in each of the standard platforms (`Browser`, `Server`, and `WebWorker`)
 * by calling `setDocument()` when providing the `DOCUMENT` token.
 */
var DOCUMENT = undefined;
/**
 * Access the object that represents the `document` for this platform.
 *
 * Ivy calls this whenever it needs to access the `document` object.
 * For example to create the renderer or to do sanitization.
 */
function getDocument() {
    if (DOCUMENT !== undefined) {
        return DOCUMENT;
    }
    else if (typeof document !== 'undefined') {
        return document;
    }
    // No "document" can be found. This should only happen if we are running ivy outside Angular and
    // the current platform is not a browser. Since this is not a supported scenario at the moment
    // this should not happen in Angular apps.
    // Once we support running ivy outside of Angular we will need to publish `setDocument()` as a
    // public API. Meanwhile we just return `undefined` and let the application fail.
    return undefined;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: cleanup once the code is merged in angular/angular
var RendererStyleFlags3 = /*@__PURE__*/ (function (RendererStyleFlags3) {
    RendererStyleFlags3[RendererStyleFlags3["Important"] = 1] = "Important";
    RendererStyleFlags3[RendererStyleFlags3["DashCase"] = 2] = "DashCase";
    return RendererStyleFlags3;
})({});
/** Returns whether the `renderer` is a `ProceduralRenderer3` */
function isProceduralRenderer(renderer) {
    return !!(renderer.listen);
}
var ɵ0$2 = function (hostElement, rendererType) { return getDocument(); };
var domRendererFactory3 = {
    createRenderer: ɵ0$2
};
/**
 * Assigns all attribute values to the provided element via the inferred renderer.
 *
 * This function accepts two forms of attribute entries:
 *
 * default: (key, value):
 *  attrs = [key1, value1, key2, value2]
 *
 * namespaced: (NAMESPACE_MARKER, uri, name, value)
 *  attrs = [NAMESPACE_MARKER, uri, name, value, NAMESPACE_MARKER, uri, name, value]
 *
 * The `attrs` array can contain a mix of both the default and namespaced entries.
 * The "default" values are set without a marker, but if the function comes across
 * a marker value then it will attempt to set a namespaced value. If the marker is
 * not of a namespaced value then the function will quit and return the index value
 * where it stopped during the iteration of the attrs array.
 *
 * See [AttributeMarker] to understand what the namespace marker value is.
 *
 * Note that this instruction does not support assigning style and class values to
 * an element. See `elementStart` and `elementHostAttrs` to learn how styling values
 * are applied to an element.
 * @param renderer The renderer to be used
 * @param native The element that the attributes will be assigned to
 * @param attrs The attribute array of values that will be assigned to the element
 * @returns the index value that was last accessed in the attributes array
 */
function setUpAttributes(renderer, native, attrs) {
    var isProc = isProceduralRenderer(renderer);
    var i = 0;
    while (i < attrs.length) {
        var value = attrs[i];
        if (typeof value === 'number') {
            // only namespaces are supported. Other value types (such as style/class
            // entries) are not supported in this function.
            if (value !== 0 /* NamespaceURI */) {
                break;
            }
            // we just landed on the marker value ... therefore
            // we should skip to the next entry
            i++;
            var namespaceURI = attrs[i++];
            var attrName = attrs[i++];
            var attrVal = attrs[i++];
            ngDevMode && ngDevMode.rendererSetAttribute++;
            isProc ?
                renderer.setAttribute(native, attrName, attrVal, namespaceURI) :
                native.setAttributeNS(namespaceURI, attrName, attrVal);
        }
        else {
            // attrName is string;
            var attrName = value;
            var attrVal = attrs[++i];
            // Standard attributes
            ngDevMode && ngDevMode.rendererSetAttribute++;
            if (isAnimationProp(attrName)) {
                if (isProc) {
                    renderer.setProperty(native, attrName, attrVal);
                }
            }
            else {
                isProc ?
                    renderer.setAttribute(native, attrName, attrVal) :
                    native.setAttribute(attrName, attrVal);
            }
            i++;
        }
    }
    // another piece of code may iterate over the same attributes array. Therefore
    // it may be helpful to return the exact spot where the attributes array exited
    // whether by running into an unsupported marker or if all the static values were
    // iterated over.
    return i;
}
function isAnimationProp(name) {
    // Perf note: accessing charCodeAt to check for the first character of a string is faster as
    // compared to accessing a character at index 0 (ex. name[0]). The main reason for this is that
    // charCodeAt doesn't allocate memory to return a substring.
    return name.charCodeAt(0) === 64 /* AT_SIGN */;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// Parent Injector Utils ///////////////////////////////////////////////////////////////
function hasParentInjector(parentLocation) {
    return parentLocation !== NO_PARENT_INJECTOR;
}
function getParentInjectorIndex(parentLocation) {
    return parentLocation & 32767 /* InjectorIndexMask */;
}
function getParentInjectorViewOffset(parentLocation) {
    return parentLocation >> 16 /* ViewOffsetShift */;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @returns The LView instance that contains the parent injector
 */
function getParentInjectorView(location, startView) {
    var viewOffset = getParentInjectorViewOffset(location);
    var parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = parentView[DECLARATION_VIEW];
        viewOffset--;
    }
    return parentView;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used for stringify render output in Ivy.
 * Important! This function is very performance-sensitive and we should
 * be extra careful not to introduce megamorphic reads in it.
 */
function renderStringify(value) {
    if (typeof value === 'string')
        return value;
    if (value == null)
        return '';
    return '' + value;
}
/**
 * Used to stringify a value so that it can be displayed in an error message.
 * Important! This function contains a megamorphic read and should only be
 * used for error messages.
 */
function stringifyForError(value) {
    if (typeof value === 'function')
        return value.name || value.toString();
    if (typeof value === 'object' && value != null && typeof value.type === 'function') {
        return value.type.name || value.type.toString();
    }
    return renderStringify(value);
}
var ɵ0$3 = function () {
    return (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame || // browser only
        setTimeout // everything else
    ).bind(_global);
};
var defaultScheduler = /*@__PURE__*/ (ɵ0$3)();
/**
 * The special delimiter we use to separate property names, prefixes, and suffixes
 * in property binding metadata. See storeBindingMetadata().
 *
 * We intentionally use the Unicode "REPLACEMENT CHARACTER" (U+FFFD) as a delimiter
 * because it is a very uncommon character that is unlikely to be part of a user's
 * property names or interpolation strings. If it is in fact used in a property
 * binding, DebugElement.properties will not return the correct value for that
 * binding. However, there should be no runtime effect for real applications.
 *
 * This character is typically rendered as a question mark inside of a diamond.
 * See https://en.wikipedia.org/wiki/Specials_(Unicode_block)
 *
 */
var INTERPOLATION_DELIMITER = "\uFFFD";
/**
 * Unwrap a value which might be behind a closure (for forward declaration reasons).
 */
function maybeUnwrapFn(value) {
    if (value instanceof Function) {
        return value();
    }
    else {
        return value;
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines if the call to `inject` should include `viewProviders` in its resolution.
 *
 * This is set to true when we try to instantiate a component. This value is reset in
 * `getNodeInjectable` to a value which matches the declaration location of the token about to be
 * instantiated. This is done so that if we are injecting a token which was declared outside of
 * `viewProviders` we don't accidentally pull `viewProviders` in.
 *
 * Example:
 *
 * ```
 * @Injectable()
 * class MyService {
 *   constructor(public value: String) {}
 * }
 *
 * @Component({
 *   providers: [
 *     MyService,
 *     {provide: String, value: 'providers' }
 *   ]
 *   viewProviders: [
 *     {provide: String, value: 'viewProviders'}
 *   ]
 * })
 * class MyComponent {
 *   constructor(myService: MyService, value: String) {
 *     // We expect that Component can see into `viewProviders`.
 *     expect(value).toEqual('viewProviders');
 *     // `MyService` was not declared in `viewProviders` hence it can't see it.
 *     expect(myService.value).toEqual('providers');
 *   }
 * }
 *
 * ```
 */
var includeViewProviders = true;
function setIncludeViewProviders(v) {
    var oldValue = includeViewProviders;
    includeViewProviders = v;
    return oldValue;
}
/**
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
 */
var BLOOM_SIZE = 256;
var BLOOM_MASK = BLOOM_SIZE - 1;
/** Counter used to generate unique IDs for directives. */
var nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param injectorIndex The index of the node injector where this token should be registered
 * @param tView The TView for the injector's bloom filters
 * @param type The directive token to register
 */
function bloomAdd(injectorIndex, tView, type) {
    ngDevMode && assertEqual(tView.firstCreatePass, true, 'expected firstCreatePass to be true');
    var id = typeof type !== 'string' ? type[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = type[NG_ELEMENT_ID] = nextNgElementId++;
    }
    // We only have BLOOM_SIZE (256) slots in our bloom filter (8 buckets * 32 bits each),
    // so all unique IDs must be modulo-ed into a number from 0 - 255 to fit into the filter.
    var bloomBit = id & BLOOM_MASK;
    // Create a mask that targets the specific bit associated with the directive.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    var mask = 1 << bloomBit;
    // Use the raw bloomBit number to determine which bloom filter bucket we should check
    // e.g: bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc
    var b7 = bloomBit & 0x80;
    var b6 = bloomBit & 0x40;
    var b5 = bloomBit & 0x20;
    var tData = tView.data;
    if (b7) {
        b6 ? (b5 ? (tData[injectorIndex + 7] |= mask) : (tData[injectorIndex + 6] |= mask)) :
            (b5 ? (tData[injectorIndex + 5] |= mask) : (tData[injectorIndex + 4] |= mask));
    }
    else {
        b6 ? (b5 ? (tData[injectorIndex + 3] |= mask) : (tData[injectorIndex + 2] |= mask)) :
            (b5 ? (tData[injectorIndex + 1] |= mask) : (tData[injectorIndex] |= mask));
    }
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param tNode for which an injector should be retrieved / created.
 * @param hostView View where the node is stored
 * @returns Node injector
 */
function getOrCreateNodeInjectorForNode(tNode, hostView) {
    var existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    var tView = hostView[TVIEW];
    if (tView.firstCreatePass) {
        tNode.injectorIndex = hostView.length;
        insertBloom(tView.data, tNode); // foundation for node bloom
        insertBloom(hostView, null); // foundation for cumulative bloom
        insertBloom(tView.blueprint, null);
    }
    var parentLoc = getParentInjectorLocation(tNode, hostView);
    var injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        var parentIndex = getParentInjectorIndex(parentLoc);
        var parentLView = getParentInjectorView(parentLoc, hostView);
        var parentData = parentLView[TVIEW].data;
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (var i = 0; i < 8; i++) {
            hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
        }
    }
    hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
    return injectorIndex;
}
function insertBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
function getInjectorIndex(tNode, hostView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        hostView[tNode.injectorIndex + PARENT_INJECTOR] == null) {
        return -1;
    }
    else {
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 *
 * Returns a combination of number of `ViewData` we have to go up and index in that `Viewdata`
 */
function getParentInjectorLocation(tNode, view) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        return tNode.parent.injectorIndex; // ViewOffset is 0
    }
    // For most cases, the parent injector index can be found on the host node (e.g. for component
    // or container), so this loop will be skipped, but we must keep the loop here to support
    // the rarer case of deeply nested <ng-template> tags or inline views.
    var hostTNode = view[T_HOST];
    var viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = view[DECLARATION_VIEW];
        hostTNode = view ? view[T_HOST] : null;
        viewOffset++;
    }
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 16 /* ViewOffsetShift */) :
        -1;
}
/**
 * Makes a type or an injection token public to the DI system by adding it to an
 * injector's bloom filter.
 *
 * @param di The node injector in which a directive will be added
 * @param token The type or the injection token to be made public
 */
function diPublicInInjector(injectorIndex, tView, token) {
    bloomAdd(injectorIndex, tView, token);
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * This function patches `token` with `__NG_ELEMENT_ID__` which contains the id for the bloom
 * filter. Negative values are reserved for special objects.
 *   - `-1` is reserved for injecting `Injector` (implemented by `NodeInjector`)
 *
 * @param tNode The Node where the search for the injector should start
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
function getOrCreateInjectable(tNode, lView, token, flags, notFoundValue) {
    if (flags === void 0) {
        flags = InjectFlags.Default;
    }
    if (tNode !== null) {
        var bloomHash = bloomHashBitOrFactory(token);
        // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
        // so just call the factory function to create it.
        if (typeof bloomHash === 'function') {
            enterDI(lView, tNode);
            try {
                var value = bloomHash();
                if (value == null && !(flags & InjectFlags.Optional)) {
                    throw new Error("No provider for " + stringifyForError(token) + "!");
                }
                else {
                    return value;
                }
            }
            finally {
                leaveDI();
            }
        }
        else if (typeof bloomHash == 'number') {
            if (bloomHash === -1) {
                // `-1` is a special value used to identify `Injector` types.
                return new NodeInjector(tNode, lView);
            }
            // If the token has a bloom hash, then it is a token which could be in NodeInjector.
            // A reference to the previous injector TView that was found while climbing the element
            // injector tree. This is used to know if viewProviders can be accessed on the current
            // injector.
            var previousTView = null;
            var injectorIndex = getInjectorIndex(tNode, lView);
            var parentLocation = NO_PARENT_INJECTOR;
            var hostTElementNode = flags & InjectFlags.Host ? lView[DECLARATION_COMPONENT_VIEW][T_HOST] : null;
            // If we should skip this injector, or if there is no injector on this node, start by
            // searching
            // the parent injector.
            if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
                parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                    lView[injectorIndex + PARENT_INJECTOR];
                if (!shouldSearchParent(flags, false)) {
                    injectorIndex = -1;
                }
                else {
                    previousTView = lView[TVIEW];
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
            }
            // Traverse up the injector tree until we find a potential match or until we know there
            // *isn't* a match.
            while (injectorIndex !== -1) {
                parentLocation = lView[injectorIndex + PARENT_INJECTOR];
                // Check the current injector. If it matches, see if it contains token.
                var tView = lView[TVIEW];
                if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                    // At this point, we have an injector which *may* contain the token, so we step through
                    // the providers and directives associated with the injector's corresponding node to get
                    // the instance.
                    var instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                    if (instance !== NOT_FOUND) {
                        return instance;
                    }
                }
                if (shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + TNODE] === hostTElementNode) &&
                    bloomHasToken(bloomHash, injectorIndex, lView)) {
                    // The def wasn't found anywhere on this node, so it was a false positive.
                    // Traverse up the tree and continue searching.
                    previousTView = tView;
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
                else {
                    // If we should not search parent OR If the ancestor bloom filter value does not have the
                    // bit corresponding to the directive we can give up on traversing up to find the specific
                    // injector.
                    injectorIndex = -1;
                }
            }
        }
    }
    if (flags & InjectFlags.Optional && notFoundValue === undefined) {
        // This must be set or the NullInjector will throw for optional deps
        notFoundValue = null;
    }
    if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
        var moduleInjector = lView[INJECTOR$1];
        // switch to `injectInjectorOnly` implementation for module injector, since module injector
        // should not have access to Component/Directive DI scope (that may happen through
        // `directiveInject` implementation)
        var previousInjectImplementation = setInjectImplementation(undefined);
        try {
            if (moduleInjector) {
                return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
            }
            else {
                return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
            }
        }
        finally {
            setInjectImplementation(previousInjectImplementation);
        }
    }
    if (flags & InjectFlags.Optional) {
        return notFoundValue;
    }
    else {
        throw new Error("NodeInjector: NOT_FOUND [" + stringifyForError(token) + "]");
    }
}
var NOT_FOUND = {};
function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
    var currentTView = lView[TVIEW];
    var tNode = currentTView.data[injectorIndex + TNODE];
    // First, we need to determine if view providers can be accessed by the starting element.
    // There are two possibities
    var canAccessViewProviders = previousTView == null ?
        // 1) This is the first invocation `previousTView == null` which means that we are at the
        // `TNode` of where injector is starting to look. In such a case the only time we are allowed
        // to look into the ViewProviders is if:
        // - we are on a component
        // - AND the injector set `includeViewProviders` to true (implying that the token can see
        // ViewProviders because it is the Component or a Service which itself was declared in
        // ViewProviders)
        (isComponentHost(tNode) && includeViewProviders) :
        // 2) `previousTView != null` which means that we are now walking across the parent nodes.
        // In such a case we are only allowed to look into the ViewProviders if:
        // - We just crossed from child View to Parent View `previousTView != currentTView`
        // - AND the parent TNode is an Element.
        // This means that we just came from the Component's View and therefore are allowed to see
        // into the ViewProviders.
        (previousTView != currentTView && (tNode.type === 3 /* Element */));
    // This special case happens when there is a @host on the inject and when we are searching
    // on the host element node.
    var isHostSpecialCase = (flags & InjectFlags.Host) && hostTElementNode === tNode;
    var injectableIdx = locateDirectiveOrProvider(tNode, currentTView, token, canAccessViewProviders, isHostSpecialCase);
    if (injectableIdx !== null) {
        return getNodeInjectable(lView, currentTView, injectableIdx, tNode);
    }
    else {
        return NOT_FOUND;
    }
}
/**
 * Searches for the given token among the node's directives and providers.
 *
 * @param tNode TNode on which directives are present.
 * @param tView The tView we are currently processing
 * @param token Provider token or type of a directive to look for.
 * @param canAccessViewProviders Whether view providers should be considered.
 * @param isHostSpecialCase Whether the host special case applies.
 * @returns Index of a found directive or provider, or null when none found.
 */
function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
    var nodeProviderIndexes = tNode.providerIndexes;
    var tInjectables = tView.data;
    var injectablesStart = nodeProviderIndexes & 65535;
    var directivesStart = tNode.directiveStart;
    var directiveEnd = tNode.directiveEnd;
    var cptViewProvidersCount = nodeProviderIndexes >> 16;
    var startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
    // When the host special case applies, only the viewProviders and the component are visible
    var endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
    for (var i = startingIndex; i < endIndex; i++) {
        var providerTokenOrDef = tInjectables[i];
        if (i < directivesStart && token === providerTokenOrDef ||
            i >= directivesStart && providerTokenOrDef.type === token) {
            return i;
        }
    }
    if (isHostSpecialCase) {
        var dirDef = tInjectables[directivesStart];
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
            return directivesStart;
        }
    }
    return null;
}
/**
* Retrieve or instantiate the injectable from the `LView` at particular `index`.
*
* This function checks to see if the value has already been instantiated and if so returns the
* cached `injectable`. Otherwise if it detects that the value is still a factory it
* instantiates the `injectable` and caches the value.
*/
function getNodeInjectable(lView, tView, index, tNode) {
    var value = lView[index];
    var tData = tView.data;
    if (isFactory(value)) {
        var factory = value;
        if (factory.resolving) {
            throw new Error("Circular dep for " + stringifyForError(tData[index]));
        }
        var previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
        factory.resolving = true;
        var previousInjectImplementation = void 0;
        if (factory.injectImpl) {
            previousInjectImplementation = setInjectImplementation(factory.injectImpl);
        }
        enterDI(lView, tNode);
        try {
            value = lView[index] = factory.factory(undefined, tData, lView, tNode);
            // This code path is hit for both directives and providers.
            // For perf reasons, we want to avoid searching for hooks on providers.
            // It does no harm to try (the hooks just won't exist), but the extra
            // checks are unnecessary and this is a hot path. So we check to see
            // if the index of the dependency is in the directive range for this
            // tNode. If it's not, we know it's a provider and skip hook registration.
            if (tView.firstCreatePass && index >= tNode.directiveStart) {
                ngDevMode && assertDirectiveDef(tData[index]);
                registerPreOrderHooks(index, tData[index], tView);
            }
        }
        finally {
            if (factory.injectImpl)
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            leaveDI();
        }
    }
    return value;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param token the injection token
 * @returns the matching bit to check in the bloom filter or `null` if the token is not known.
 *   When the returned value is negative then it represents special values such as `Injector`.
 */
function bloomHashBitOrFactory(token) {
    ngDevMode && assertDefined(token, 'token must be defined');
    if (typeof token === 'string') {
        return token.charCodeAt(0) || 0;
    }
    var tokenId = token[NG_ELEMENT_ID];
    // Negative token IDs are used for special objects such as `Injector`
    return (typeof tokenId === 'number' && tokenId > 0) ? tokenId & BLOOM_MASK : tokenId;
}
function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    // Create a mask that targets the specific bit associated with the directive we're looking for.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    var mask = 1 << bloomHash;
    var b7 = bloomHash & 0x80;
    var b6 = bloomHash & 0x40;
    var b5 = bloomHash & 0x20;
    // Our bloom filter size is 256 bits, which is eight 32-bit bloom filter buckets:
    // bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc.
    // Get the bloom filter value from the appropriate bucket based on the directive's bloomBit.
    var value;
    if (b7) {
        value = b6 ? (b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6]) :
            (b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4]);
    }
    else {
        value = b6 ? (b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2]) :
            (b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]);
    }
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/** Returns true if flags prevent parent injector from being searched for tokens */
function shouldSearchParent(flags, isFirstHostTNode) {
    return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
}
var NodeInjector = /** @class */ /*@__PURE__*/ (function () {
    function NodeInjector(_tNode, _lView) {
        this._tNode = _tNode;
        this._lView = _lView;
    }
    NodeInjector.prototype.get = function (token, notFoundValue) {
        return getOrCreateInjectable(this._tNode, this._lView, token, undefined, notFoundValue);
    };
    return NodeInjector;
}());
var ERROR_DEBUG_CONTEXT = 'ngDebugContext';
var ERROR_ORIGINAL_ERROR = 'ngOriginalError';
var ERROR_LOGGER = 'ngErrorLogger';
function wrappedError(message, originalError) {
    var msg = message + " caused by: " + (originalError instanceof Error ? originalError.message : originalError);
    var error = Error(msg);
    error[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}
function getDebugContext(error) {
    return error[ERROR_DEBUG_CONTEXT];
}
function getOriginalError(error) {
    return error[ERROR_ORIGINAL_ERROR];
}
function getErrorLogger(error) {
    return error[ERROR_LOGGER] || defaultErrorLogger;
}
function defaultErrorLogger(console) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    console.error.apply(console, __spread(values));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * @publicApi
 */
var ErrorHandler = /** @class */ /*@__PURE__*/ (function () {
    function ErrorHandler() {
        /**
         * @internal
         */
        this._console = console;
    }
    ErrorHandler.prototype.handleError = function (error) {
        var originalError = this._findOriginalError(error);
        var context = this._findContext(error);
        // Note: Browser consoles show the place from where console.error was called.
        // We can use this to give users additional information about the error.
        var errorLogger = getErrorLogger(error);
        errorLogger(this._console, "ERROR", error);
        if (originalError) {
            errorLogger(this._console, "ORIGINAL ERROR", originalError);
        }
        if (context) {
            errorLogger(this._console, 'ERROR CONTEXT', context);
        }
    };
    /** @internal */
    ErrorHandler.prototype._findContext = function (error) {
        if (error) {
            return getDebugContext(error) ? getDebugContext(error) :
                this._findContext(getOriginalError(error));
        }
        return null;
    };
    /** @internal */
    ErrorHandler.prototype._findOriginalError = function (error) {
        var e = getOriginalError(error);
        while (e && getOriginalError(e)) {
            e = getOriginalError(e);
        }
        return e;
    };
    return ErrorHandler;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SafeValueImpl = /** @class */ /*@__PURE__*/ (function () {
    function SafeValueImpl(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
    }
    SafeValueImpl.prototype.toString = function () {
        return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)";
    };
    return SafeValueImpl;
}());
var SafeHtmlImpl = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(SafeHtmlImpl, _super);
    function SafeHtmlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeHtmlImpl.prototype.getTypeName = function () { return "HTML" /* Html */; };
    return SafeHtmlImpl;
}(SafeValueImpl));
var SafeStyleImpl = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(SafeStyleImpl, _super);
    function SafeStyleImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeStyleImpl.prototype.getTypeName = function () { return "Style" /* Style */; };
    return SafeStyleImpl;
}(SafeValueImpl));
var SafeScriptImpl = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(SafeScriptImpl, _super);
    function SafeScriptImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeScriptImpl.prototype.getTypeName = function () { return "Script" /* Script */; };
    return SafeScriptImpl;
}(SafeValueImpl));
var SafeUrlImpl = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(SafeUrlImpl, _super);
    function SafeUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeUrlImpl.prototype.getTypeName = function () { return "URL" /* Url */; };
    return SafeUrlImpl;
}(SafeValueImpl));
var SafeResourceUrlImpl = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(SafeResourceUrlImpl, _super);
    function SafeResourceUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeResourceUrlImpl.prototype.getTypeName = function () { return "ResourceURL" /* ResourceUrl */; };
    return SafeResourceUrlImpl;
}(SafeValueImpl));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This file is used to control if the default rendering pipeline should be `ViewEngine` or `Ivy`.
 *
 * For more information on how to run and debug tests with either Ivy or View Engine (legacy),
 * please see [BAZEL.md](./docs/BAZEL.md).
 */
var _devMode = true;
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @publicApi
 */
function isDevMode() {
    return _devMode;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function tagSet(tags) {
    var e_1, _a;
    var res = {};
    try {
        for (var _b = __values(tags.split(',')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var t = _c.value;
            res[t] = true;
        }
    }
    catch (e_1_1) {
        e_1 = { error: e_1_1 };
    }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
        }
        finally {
            if (e_1)
                throw e_1.error;
        }
    }
    return res;
}
function merge$2() {
    var e_2, _a;
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    var res = {};
    try {
        for (var sets_1 = __values(sets), sets_1_1 = sets_1.next(); !sets_1_1.done; sets_1_1 = sets_1.next()) {
            var s = sets_1_1.value;
            for (var v in s) {
                if (s.hasOwnProperty(v))
                    res[v] = true;
            }
        }
    }
    catch (e_2_1) {
        e_2 = { error: e_2_1 };
    }
    finally {
        try {
            if (sets_1_1 && !sets_1_1.done && (_a = sets_1.return))
                _a.call(sets_1);
        }
        finally {
            if (e_2)
                throw e_2.error;
        }
    }
    return res;
}
// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements
// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
var VOID_ELEMENTS = /*@__PURE__*/ tagSet('area,br,col,hr,img,wbr');
// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
var OPTIONAL_END_TAG_BLOCK_ELEMENTS = /*@__PURE__*/ tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
var OPTIONAL_END_TAG_INLINE_ELEMENTS = /*@__PURE__*/ tagSet('rp,rt');
var OPTIONAL_END_TAG_ELEMENTS = /*@__PURE__*/ merge$2(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
// Safe Block Elements - HTML5
var BLOCK_ELEMENTS = /*@__PURE__*/ merge$2(OPTIONAL_END_TAG_BLOCK_ELEMENTS, /*@__PURE__*/ tagSet('address,article,' +
    'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
    'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
// Inline Elements - HTML5
var INLINE_ELEMENTS = /*@__PURE__*/ merge$2(OPTIONAL_END_TAG_INLINE_ELEMENTS, /*@__PURE__*/ tagSet('a,abbr,acronym,audio,b,' +
    'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' +
    'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
var VALID_ELEMENTS = /*@__PURE__*/ merge$2(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
// Attributes that have href and hence need to be sanitized
var URI_ATTRS = /*@__PURE__*/ tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
// Attributes that have special href set hence need to be sanitized
var SRCSET_ATTRS = /*@__PURE__*/ tagSet('srcset');
var HTML_ATTRS = /*@__PURE__*/ tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' +
    'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' +
    'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' +
    'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' +
    'valign,value,vspace,width');
// Accessibility attributes as per WAI-ARIA 1.1 (W3C Working Draft 14 December 2018)
var ARIA_ATTRS = /*@__PURE__*/ tagSet('aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,' +
    'aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,' +
    'aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,' +
    'aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,' +
    'aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,' +
    'aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,' +
    'aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext');
// NB: This currently consciously doesn't support SVG. SVG sanitization has had several security
// issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
// innerHTML is required, SVG attributes should be added here.
// NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
// can be sanitized, but they increase security surface area without a legitimate use case, so they
// are left out here.
var VALID_ATTRS = /*@__PURE__*/ merge$2(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS, ARIA_ATTRS);
// Elements whose content should not be traversed/preserved, if the elements themselves are invalid.
//
// Typically, `<invalid>Some content</invalid>` would traverse (and in this case preserve)
// `Some content`, but strip `invalid-element` opening/closing tags. For some elements, though, we
// don't want to preserve the content, if the elements themselves are going to be removed.
var SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS = /*@__PURE__*/ tagSet('script,style,template');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
 * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
 * handled.
 *
 * See DomSanitizer for more details on security in Angular applications.
 *
 * @publicApi
 */
var SecurityContext = /*@__PURE__*/ (function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    return SecurityContext;
})({});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * THIS FILE CONTAINS CODE WHICH SHOULD BE TREE SHAKEN AND NEVER CALLED FROM PRODUCTION CODE!!!
 */
/**
 * Creates an `Array` construction with a given name. This is useful when
 * looking for memory consumption to see what time of array it is.
 *
 *
 * @param name Name to give to the constructor
 * @returns A subclass of `Array` if possible. This can only be done in
 *          environments which support `class` construct.
 */
function createNamedArrayType(name) {
    // This should never be called in prod mode, so let's verify that is the case.
    if (ngDevMode) {
        try {
            // We need to do it this way so that TypeScript does not down-level the below code.
            var FunctionConstructor = createNamedArrayType.constructor;
            return (new FunctionConstructor('Array', "return class " + name + " extends Array{}"))(Array);
        }
        catch (e) {
            // If it does not work just give up and fall back to regular Array.
            return Array;
        }
    }
    else {
        throw new Error('Looks like we are in \'prod mode\', but we are creating a named Array type, which is wrong! Check your code');
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function normalizeDebugBindingName(name) {
    // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
    name = camelCaseToDashCase(name.replace(/[$@]/g, '_'));
    return "ng-reflect-" + name;
}
var CAMEL_CASE_REGEXP = /([A-Z])/g;
function camelCaseToDashCase(input) {
    return input.replace(CAMEL_CASE_REGEXP, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        return '-' + m[1].toLowerCase();
    });
}
function normalizeDebugBindingValue(value) {
    try {
        // Limit the size of the value as otherwise the DOM just gets polluted.
        return value != null ? value.toString().slice(0, 30) : value;
    }
    catch (e) {
        return '[ERROR] Exception while trying to serialize the value';
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This property will be monkey-patched on elements, components and directives
 */
var MONKEY_PATCH_KEY_NAME = '__ngContext__';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * For efficiency reasons we often put several different data types (`RNode`, `LView`, `LContainer`)
 * in same location in `LView`. This is because we don't want to pre-allocate space for it
 * because the storage is sparse. This file contains utilities for dealing with such data types.
 *
 * How do we know what is stored at a given location in `LView`.
 * - `Array.isArray(value) === false` => `RNode` (The normal storage value)
 * - `Array.isArray(value) === true` => then the `value[0]` represents the wrapped value.
 *   - `typeof value[TYPE] === 'object'` => `LView`
 *      - This happens when we have a component at a given location
 *   - `typeof value[TYPE] === true` => `LContainer`
 *      - This happens when we have `LContainer` binding at a given location.
 *
 *
 * NOTE: it is assumed that `Array.isArray` and `typeof` operations are very efficient.
 */
/**
 * Returns `RNode`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function unwrapRNode(value) {
    while (Array.isArray(value)) {
        value = value[HOST];
    }
    return value;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
function getNativeByIndex(index, lView) {
    return unwrapRNode(lView[index + HEADER_OFFSET]);
}
/**
 * Retrieve an `RNode` for a given `TNode` and `LView`.
 *
 * This function guarantees in dev mode to retrieve a non-null `RNode`.
 *
 * @param tNode
 * @param lView
 */
function getNativeByTNode(tNode, lView) {
    ngDevMode && assertTNodeForLView(tNode, lView);
    ngDevMode && assertDataInRange(lView, tNode.index);
    var node = unwrapRNode(lView[tNode.index]);
    ngDevMode && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
    return node;
}
/**
 * Retrieve an `RNode` or `null` for a given `TNode` and `LView`.
 *
 * Some `TNode`s don't have associated `RNode`s. For example `Projection`
 *
 * @param tNode
 * @param lView
 */
function getNativeByTNodeOrNull(tNode, lView) {
    var index = tNode.index;
    if (index !== -1) {
        ngDevMode && assertTNodeForLView(tNode, lView);
        var node = unwrapRNode(lView[index]);
        ngDevMode && node !== null && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
        return node;
    }
    return null;
}
function getTNode(tView, index) {
    ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
    ngDevMode && assertLessThan(index, tView.data.length, 'wrong index for TNode');
    return tView.data[index + HEADER_OFFSET];
}
function getComponentLViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    ngDevMode && assertDataInRange(hostView, nodeIndex);
    var slotValue = hostView[nodeIndex];
    var lView = isLView(slotValue) ? slotValue : slotValue[HOST];
    return lView;
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    return target[MONKEY_PATCH_KEY_NAME] || null;
}
function readPatchedLView(target) {
    var value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : value.lView;
    }
    return null;
}
/** Checks whether a given view is in creation mode */
function isCreationMode(view) {
    return (view[FLAGS] & 4 /* CreationMode */) === 4 /* CreationMode */;
}
/**
 * Returns a boolean for whether the view is attached to the change detection tree.
 *
 * Note: This determines whether a view should be checked, not whether it's inserted
 * into a container. For that, you'll want `viewAttachedToContainer` below.
 */
function viewAttachedToChangeDetector(view) {
    return (view[FLAGS] & 128 /* Attached */) === 128 /* Attached */;
}
/**
 * Resets the pre-order hook flags of the view.
 * @param lView the LView on which the flags are reset
 */
function resetPreOrderHookFlags(lView) {
    lView[PREORDER_HOOK_FLAGS] = 0;
}
function getLContainerActiveIndex(lContainer) {
    return lContainer[ACTIVE_INDEX] >> 1 /* SHIFT */;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LView` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 *
 * @param target Component, Directive or DOM Node.
 */
function getLContext(target) {
    var mpValue = readPatchedData(target);
    if (mpValue) {
        // only when it's an array is it considered an LView instance
        // ... otherwise it's an already constructed LContext instance
        if (Array.isArray(mpValue)) {
            var lView = mpValue;
            var nodeIndex = void 0;
            var component = undefined;
            var directives = undefined;
            if (isComponentInstance(target)) {
                nodeIndex = findViaComponent(lView, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided component was not found in the application');
                }
                component = target;
            }
            else if (isDirectiveInstance(target)) {
                nodeIndex = findViaDirective(lView, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided directive was not found in the application');
                }
                directives = getDirectivesAtNodeIndex(nodeIndex, lView, false);
            }
            else {
                nodeIndex = findViaNativeElement(lView, target);
                if (nodeIndex == -1) {
                    return null;
                }
            }
            // the goal is not to fill the entire context full of data because the lookups
            // are expensive. Instead, only the target data (the element, component, container, ICU
            // expression or directive details) are filled into the context. If called multiple times
            // with different target values then the missing target data will be filled in.
            var native = unwrapRNode(lView[nodeIndex]);
            var existingCtx = readPatchedData(native);
            var context = (existingCtx && !Array.isArray(existingCtx)) ?
                existingCtx :
                createLContext(lView, nodeIndex, native);
            // only when the component has been discovered then update the monkey-patch
            if (component && context.component === undefined) {
                context.component = component;
                attachPatchData(context.component, context);
            }
            // only when the directives have been discovered then update the monkey-patch
            if (directives && context.directives === undefined) {
                context.directives = directives;
                for (var i = 0; i < directives.length; i++) {
                    attachPatchData(directives[i], context);
                }
            }
            attachPatchData(context.native, context);
            mpValue = context;
        }
    }
    else {
        var rElement = target;
        ngDevMode && assertDomNode(rElement);
        // if the context is not found then we need to traverse upwards up the DOM
        // to find the nearest element that has already been monkey patched with data
        var parent_1 = rElement;
        while (parent_1 = parent_1.parentNode) {
            var parentContext = readPatchedData(parent_1);
            if (parentContext) {
                var lView = void 0;
                if (Array.isArray(parentContext)) {
                    lView = parentContext;
                }
                else {
                    lView = parentContext.lView;
                }
                // the edge of the app was also reached here through another means
                // (maybe because the DOM was changed manually).
                if (!lView) {
                    return null;
                }
                var index = findViaNativeElement(lView, rElement);
                if (index >= 0) {
                    var native = unwrapRNode(lView[index]);
                    var context = createLContext(lView, index, native);
                    attachPatchData(native, context);
                    mpValue = context;
                    break;
                }
            }
        }
    }
    return mpValue || null;
}
/**
 * Creates an empty instance of a `LContext` context
 */
function createLContext(lView, nodeIndex, native) {
    return {
        lView: lView,
        nodeIndex: nodeIndex,
        native: native,
        component: undefined,
        directives: undefined,
        localRefs: undefined,
    };
}
/**
 * Takes a component instance and returns the view for that component.
 *
 * @param componentInstance
 * @returns The component's view
 */
function getComponentViewByInstance(componentInstance) {
    var lView = readPatchedData(componentInstance);
    var view;
    if (Array.isArray(lView)) {
        var nodeIndex = findViaComponent(lView, componentInstance);
        view = getComponentLViewByIndex(nodeIndex, lView);
        var context = createLContext(lView, nodeIndex, view[HOST]);
        context.component = componentInstance;
        attachPatchData(componentInstance, context);
        attachPatchData(context.native, context);
    }
    else {
        var context = lView;
        view = getComponentLViewByIndex(context.nodeIndex, context.lView);
    }
    return view;
}
/**
 * Assigns the given data to the given target (which could be a component,
 * directive or DOM node instance) using monkey-patching.
 */
function attachPatchData(target, data) {
    target[MONKEY_PATCH_KEY_NAME] = data;
}
function isComponentInstance(instance) {
    return instance && instance.constructor && instance.constructor.ɵcmp;
}
function isDirectiveInstance(instance) {
    return instance && instance.constructor && instance.constructor.ɵdir;
}
/**
 * Locates the element within the given LView and returns the matching index
 */
function findViaNativeElement(lView, target) {
    var tNode = lView[TVIEW].firstChild;
    while (tNode) {
        var native = getNativeByTNodeOrNull(tNode, lView);
        if (native === target) {
            return tNode.index;
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * Locates the next tNode (child, sibling or parent).
 */
function traverseNextElement(tNode) {
    if (tNode.child) {
        return tNode.child;
    }
    else if (tNode.next) {
        return tNode.next;
    }
    else {
        // Let's take the following template: <div><span>text</span></div><component/>
        // After checking the text node, we need to find the next parent that has a "next" TNode,
        // in this case the parent `div`, so that we can find the component.
        while (tNode.parent && !tNode.parent.next) {
            tNode = tNode.parent;
        }
        return tNode.parent && tNode.parent.next;
    }
}
/**
 * Locates the component within the given LView and returns the matching index
 */
function findViaComponent(lView, componentInstance) {
    var componentIndices = lView[TVIEW].components;
    if (componentIndices) {
        for (var i = 0; i < componentIndices.length; i++) {
            var elementComponentIndex = componentIndices[i];
            var componentView = getComponentLViewByIndex(elementComponentIndex, lView);
            if (componentView[CONTEXT] === componentInstance) {
                return elementComponentIndex;
            }
        }
    }
    else {
        var rootComponentView = getComponentLViewByIndex(HEADER_OFFSET, lView);
        var rootComponent = rootComponentView[CONTEXT];
        if (rootComponent === componentInstance) {
            // we are dealing with the root element here therefore we know that the
            // element is the very first element after the HEADER data in the lView
            return HEADER_OFFSET;
        }
    }
    return -1;
}
/**
 * Locates the directive within the given LView and returns the matching index
 */
function findViaDirective(lView, directiveInstance) {
    // if a directive is monkey patched then it will (by default)
    // have a reference to the LView of the current view. The
    // element bound to the directive being search lives somewhere
    // in the view data. We loop through the nodes and check their
    // list of directives for the instance.
    var tNode = lView[TVIEW].firstChild;
    while (tNode) {
        var directiveIndexStart = tNode.directiveStart;
        var directiveIndexEnd = tNode.directiveEnd;
        for (var i = directiveIndexStart; i < directiveIndexEnd; i++) {
            if (lView[i] === directiveInstance) {
                return tNode.index;
            }
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * Returns a list of directives extracted from the given view based on the
 * provided list of directive index values.
 *
 * @param nodeIndex The node index
 * @param lView The target view data
 * @param includeComponents Whether or not to include components in returned directives
 */
function getDirectivesAtNodeIndex(nodeIndex, lView, includeComponents) {
    var tNode = lView[TVIEW].data[nodeIndex];
    var directiveStartIndex = tNode.directiveStart;
    if (directiveStartIndex == 0)
        return EMPTY_ARRAY;
    var directiveEndIndex = tNode.directiveEnd;
    if (!includeComponents && tNode.flags & 2 /* isComponentHost */)
        directiveStartIndex++;
    return lView.slice(directiveStartIndex, directiveEndIndex);
}
function getComponentAtNodeIndex(nodeIndex, lView) {
    var tNode = lView[TVIEW].data[nodeIndex];
    var directiveStartIndex = tNode.directiveStart;
    return tNode.flags & 2 /* isComponentHost */ ? lView[directiveStartIndex] : null;
}
/**
 * Returns a map of local references (local reference name => element or directive instance) that
 * exist on a given element.
 */
function discoverLocalRefs(lView, nodeIndex) {
    var tNode = lView[TVIEW].data[nodeIndex];
    if (tNode && tNode.localNames) {
        var result = {};
        var localIndex = tNode.index + 1;
        for (var i = 0; i < tNode.localNames.length; i += 2) {
            result[tNode.localNames[i]] = lView[localIndex];
            localIndex++;
        }
        return result;
    }
    return null;
}
/** Called when directives inject each other (creating a circular dependency) */
function throwCyclicDependencyError(token) {
    throw new Error("Cannot instantiate cyclic dependency! " + token);
}
function throwMixedMultiProviderError() {
    throw new Error("Cannot mix multi providers and regular providers");
}
function throwInvalidProviderError(ngModuleType, providers, provider) {
    var ngModuleDetail = '';
    if (ngModuleType && providers) {
        var providerDetail = providers.map(function (v) { return v == provider ? '?' + provider + '?' : '...'; });
        ngModuleDetail =
            " - only instances of Provider and Type are allowed, got: [" + providerDetail.join(', ') + "]";
    }
    throw new Error("Invalid provider for the NgModule '" + stringify(ngModuleType) + "'" + ngModuleDetail);
}
/** Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on. */
function throwErrorIfNoChangesMode(creationMode, oldValue, currValue, propName) {
    var field = propName ? " for '" + propName + "'" : '';
    var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value" + field + ": '" + oldValue + "'. Current value: '" + currValue + "'.";
    if (creationMode) {
        msg +=
            " It seems like the view has been created after its parent and its children have been dirty checked." +
                " Has it been created in a change detection hook?";
    }
    // TODO: include debug context, see `viewDebugError` function in
    // `packages/core/src/view/errors.ts` for reference.
    // tslint:disable-next-line
    debugger; // Left intentionally for better debugger experience.
    throw new Error(msg);
}
function constructDetailsForInterpolation(lView, rootIndex, expressionIndex, meta, changedValue) {
    var _a = __read(meta.split(INTERPOLATION_DELIMITER)), propName = _a[0], prefix = _a[1], chunks = _a.slice(2);
    var oldValue = prefix, newValue = prefix;
    for (var i = 0; i < chunks.length; i++) {
        var slotIdx = rootIndex + i;
        oldValue += "" + lView[slotIdx] + chunks[i];
        newValue += "" + (slotIdx === expressionIndex ? changedValue : lView[slotIdx]) + chunks[i];
    }
    return { propName: propName, oldValue: oldValue, newValue: newValue };
}
/**
 * Constructs an object that contains details for the ExpressionChangedAfterItHasBeenCheckedError:
 * - property name (for property bindings or interpolations)
 * - old and new values, enriched using information from metadata
 *
 * More information on the metadata storage format can be found in `storePropertyBindingMetadata`
 * function description.
 */
function getExpressionChangedErrorDetails(lView, bindingIndex, oldValue, newValue) {
    var tData = lView[TVIEW].data;
    var metadata = tData[bindingIndex];
    if (typeof metadata === 'string') {
        // metadata for property interpolation
        if (metadata.indexOf(INTERPOLATION_DELIMITER) > -1) {
            return constructDetailsForInterpolation(lView, bindingIndex, bindingIndex, metadata, newValue);
        }
        // metadata for property binding
        return { propName: metadata, oldValue: oldValue, newValue: newValue };
    }
    // metadata is not available for this expression, check if this expression is a part of the
    // property interpolation by going from the current binding index left and look for a string that
    // contains INTERPOLATION_DELIMITER, the layout in tView.data for this case will look like this:
    // [..., 'id�Prefix � and � suffix', null, null, null, ...]
    if (metadata === null) {
        var idx = bindingIndex - 1;
        while (typeof tData[idx] !== 'string' && tData[idx + 1] === null) {
            idx--;
        }
        var meta = tData[idx];
        if (typeof meta === 'string') {
            var matches = meta.match(new RegExp(INTERPOLATION_DELIMITER, 'g'));
            // first interpolation delimiter separates property name from interpolation parts (in case of
            // property interpolations), so we subtract one from total number of found delimiters
            if (matches && (matches.length - 1) > bindingIndex - idx) {
                return constructDetailsForInterpolation(lView, idx, bindingIndex, meta, newValue);
            }
        }
    }
    return { propName: undefined, oldValue: oldValue, newValue: newValue };
}
function isPositive(mode) {
    return (mode & 1 /* NOT */) === 0;
}
function maybeWrapInNotSelector(isNegativeMode, chunk) {
    return isNegativeMode ? ':not(' + chunk.trim() + ')' : chunk;
}
function stringifyCSSSelector(selector) {
    var result = selector[0];
    var i = 1;
    var mode = 2;
    var currentChunk = '';
    var isNegativeMode = false;
    while (i < selector.length) {
        var valueOrMarker = selector[i];
        if (typeof valueOrMarker === 'string') {
            if (mode & 2 /* ATTRIBUTE */) {
                var attrValue = selector[++i];
                currentChunk +=
                    '[' + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : '') + ']';
            }
            else if (mode & 8 /* CLASS */) {
                currentChunk += '.' + valueOrMarker;
            }
            else if (mode & 4 /* ELEMENT */) {
                currentChunk += ' ' + valueOrMarker;
            }
        }
        else {
            //
            // Append current chunk to the final result in case we come across SelectorFlag, which
            // indicates that the previous section of a selector is over. We need to accumulate content
            // between flags to make sure we wrap the chunk later in :not() selector if needed, e.g.
            // ```
            //  ['', Flags.CLASS, '.classA', Flags.CLASS | Flags.NOT, '.classB', '.classC']
            // ```
            // should be transformed to `.classA :not(.classB .classC)`.
            //
            // Note: for negative selector part, we accumulate content between flags until we find the
            // next negative flag. This is needed to support a case where `:not()` rule contains more than
            // one chunk, e.g. the following selector:
            // ```
            //  ['', Flags.ELEMENT | Flags.NOT, 'p', Flags.CLASS, 'foo', Flags.CLASS | Flags.NOT, 'bar']
            // ```
            // should be stringified to `:not(p.foo) :not(.bar)`
            //
            if (currentChunk !== '' && !isPositive(valueOrMarker)) {
                result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
                currentChunk = '';
            }
            mode = valueOrMarker;
            // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
            // mode is maintained for remaining chunks of a selector.
            isNegativeMode = isNegativeMode || !isPositive(mode);
        }
        i++;
    }
    if (currentChunk !== '') {
        result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
    }
    return result;
}
/**
 * Generates string representation of CSS selector in parsed form.
 *
 * ComponentDef and DirectiveDef are generated with the selector in parsed form to avoid doing
 * additional parsing at runtime (for example, for directive matching). However in some cases (for
 * example, while bootstrapping a component), a string version of the selector is required to query
 * for the host element on the page. This function takes the parsed form of a selector and returns
 * its string representation.
 *
 * @param selectorList selector in parsed form
 * @returns string representation of a given selector
 */
function stringifyCSSSelectorList(selectorList) {
    return selectorList.map(stringifyCSSSelector).join(',');
}
/**
 * Extracts attributes and classes information from a given CSS selector.
 *
 * This function is used while creating a component dynamically. In this case, the host element
 * (that is created dynamically) should contain attributes and classes specified in component's CSS
 * selector.
 *
 * @param selector CSS selector in parsed form (in a form of array)
 * @returns object with `attrs` and `classes` fields that contain extracted information
 */
function extractAttrsAndClassesFromSelector(selector) {
    var attrs = [];
    var classes = [];
    var i = 1;
    var mode = 2;
    while (i < selector.length) {
        var valueOrMarker = selector[i];
        if (typeof valueOrMarker === 'string') {
            if (mode === 2 /* ATTRIBUTE */) {
                if (valueOrMarker !== '') {
                    attrs.push(valueOrMarker, selector[++i]);
                }
            }
            else if (mode === 8 /* CLASS */) {
                classes.push(valueOrMarker);
            }
        }
        else {
            // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
            // mode is maintained for remaining chunks of a selector. Since attributes and classes are
            // extracted only for "positive" part of the selector, we can stop here.
            if (!isPositive(mode))
                break;
            mode = valueOrMarker;
        }
        i++;
    }
    return { attrs: attrs, classes: classes };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** A special value which designates that a value has not changed. */
var NO_CHANGE = (typeof ngDevMode === 'undefined' || ngDevMode) ? { __brand__: 'NO_CHANGE' } : {};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Gets the parent LView of the passed LView, if the PARENT is an LContainer, will get the parent of
 * that LContainer, which is an LView
 * @param lView the lView whose parent to get
 */
function getLViewParent(lView) {
    ngDevMode && assertLView(lView);
    var parent = lView[PARENT];
    return isLContainer(parent) ? parent[PARENT] : parent;
}
/**
 * Retrieve the root view from any component or `LView` by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param componentOrLView any component or `LView`
 */
function getRootView(componentOrLView) {
    ngDevMode && assertDefined(componentOrLView, 'component');
    var lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView);
    while (lView && !(lView[FLAGS] & 512 /* IsRoot */)) {
        lView = getLViewParent(lView);
    }
    ngDevMode && assertLView(lView);
    return lView;
}
/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated. It does this by walking the parent views until it
 * gets to the root view, then getting the context off of that.
 *
 * @param viewOrComponent the `LView` or component to get the root context for.
 */
function getRootContext(viewOrComponent) {
    var rootView = getRootView(viewOrComponent);
    ngDevMode &&
        assertDefined(rootView[CONTEXT], 'RootView has no context. Perhaps it is disconnected?');
    return rootView[CONTEXT];
}
function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
    ngDevMode && assertGreaterThan(index, -1, 'Invalid index');
    ngDevMode && assertDataInRange(lView, index + HEADER_OFFSET);
    // Flush the initial hooks for elements in the view that have been added up to this point.
    // PERF WARNING: do NOT extract this to a separate function without running benchmarks
    if (!checkNoChangesMode) {
        var hooksInitPhaseCompleted = (lView[FLAGS] & 3 /* InitPhaseStateMask */) === 3;
        if (hooksInitPhaseCompleted) {
            var preOrderCheckHooks = tView.preOrderCheckHooks;
            if (preOrderCheckHooks !== null) {
                executeCheckHooks(lView, preOrderCheckHooks, index);
            }
        }
        else {
            var preOrderHooks = tView.preOrderHooks;
            if (preOrderHooks !== null) {
                executeInitAndCheckHooks(lView, preOrderHooks, 0 /* OnInitHooksToBeRun */, index);
            }
        }
    }
    // We must set the selected index *after* running the hooks, because hooks may have side-effects
    // that cause other template functions to run, thus updating the selected index, which is global
    // state. If we run `setSelectedIndex` *before* we run the hooks, in some cases the selected index
    // will be altered by the time we leave the `ɵɵadvance` instruction.
    setSelectedIndex(index);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Marks that the next string is for element.
 *
 * See `I18nMutateOpCodes` documentation.
 */
var ELEMENT_MARKER = {
    marker: 'element'
};
/**
 * Marks that the next string is for comment.
 *
 * See `I18nMutateOpCodes` documentation.
 */
var COMMENT_MARKER = {
    marker: 'comment'
};
function getTStylingRangePrev(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange >> 17 /* PREV_SHIFT */) & 32767 /* UNSIGNED_MASK */;
}
function getTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange & 2 /* PREV_DUPLICATE */) ==
        2 /* PREV_DUPLICATE */;
}
function getTStylingRangeNext(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange & 131068 /* NEXT_MASK */) >> 2 /* NEXT_SHIFT */;
}
function getTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange & 1 /* NEXT_DUPLICATE */) ===
        1 /* NEXT_DUPLICATE */;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function attachDebugObject(obj, debug) {
    Object.defineProperty(obj, 'debug', { value: debug, enumerable: false });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NG_DEV_MODE = ((typeof ngDevMode === 'undefined' || !!ngDevMode) && /*@__PURE__*/ initNgDevMode());
/*
 * This file contains conditionally attached classes which provide human readable (debug) level
 * information for `LView`, `LContainer` and other internal data structures. These data structures
 * are stored internally as array which makes it very difficult during debugging to reason about the
 * current state of the system.
 *
 * Patching the array with extra property does change the array's hidden class' but it does not
 * change the cost of access, therefore this patching should not have significant if any impact in
 * `ngDevMode` mode. (see: https://jsperf.com/array-vs-monkey-patch-array)
 *
 * So instead of seeing:
 * ```
 * Array(30) [Object, 659, null, …]
 * ```
 *
 * You get to see:
 * ```
 * LViewDebug {
 *   views: [...],
 *   flags: {attached: true, ...}
 *   nodes: [
 *     {html: '<div id="123">', ..., nodes: [
 *       {html: '<span>', ..., nodes: null}
 *     ]}
 *   ]
 * }
 * ```
 */
var LVIEW_COMPONENT_CACHE;
var LVIEW_EMBEDDED_CACHE;
var LVIEW_ROOT;
/**
 * This function clones a blueprint and creates LView.
 *
 * Simple slice will keep the same type, and we need it to be LView
 */
function cloneToLViewFromTViewBlueprint(tView) {
    var debugTView = tView;
    var lView = getLViewToClone(debugTView.type, tView.template && tView.template.name);
    return lView.concat(tView.blueprint);
}
function getLViewToClone(type, name) {
    switch (type) {
        case 0 /* Root */:
            if (LVIEW_ROOT === undefined)
                LVIEW_ROOT = new (createNamedArrayType('LRootView'))();
            return LVIEW_ROOT;
        case 1 /* Component */:
            if (LVIEW_COMPONENT_CACHE === undefined)
                LVIEW_COMPONENT_CACHE = new Map();
            var componentArray = LVIEW_COMPONENT_CACHE.get(name);
            if (componentArray === undefined) {
                componentArray = new (createNamedArrayType('LComponentView' + nameSuffix(name)))();
                LVIEW_COMPONENT_CACHE.set(name, componentArray);
            }
            return componentArray;
        case 2 /* Embedded */:
            if (LVIEW_EMBEDDED_CACHE === undefined)
                LVIEW_EMBEDDED_CACHE = new Map();
            var embeddedArray = LVIEW_EMBEDDED_CACHE.get(name);
            if (embeddedArray === undefined) {
                embeddedArray = new (createNamedArrayType('LEmbeddedView' + nameSuffix(name)))();
                LVIEW_EMBEDDED_CACHE.set(name, embeddedArray);
            }
            return embeddedArray;
    }
    throw new Error('unreachable code');
}
function nameSuffix(text) {
    if (text == null)
        return '';
    var index = text.lastIndexOf('_Template');
    return '_' + (index === -1 ? text : text.substr(0, index));
}
/**
 * This class is a debug version of Object literal so that we can have constructor name show up
 * in
 * debug tools in ngDevMode.
 */
var TViewConstructor = /** @class */ /*@__PURE__*/ (function () {
    function TView(type, //
    id, //
    blueprint, //
    template, //
    queries, //
    viewQuery, //
    node, //
    data, //
    bindingStartIndex, //
    expandoStartIndex, //
    expandoInstructions, //
    firstCreatePass, //
    firstUpdatePass, //
    staticViewQueries, //
    staticContentQueries, //
    preOrderHooks, //
    preOrderCheckHooks, //
    contentHooks, //
    contentCheckHooks, //
    viewHooks, //
    viewCheckHooks, //
    destroyHooks, //
    cleanup, //
    contentQueries, //
    components, //
    directiveRegistry, //
    pipeRegistry, //
    firstChild, //
    schemas, //
    consts) {
        this.type = type;
        this.id = id;
        this.blueprint = blueprint;
        this.template = template;
        this.queries = queries;
        this.viewQuery = viewQuery;
        this.node = node;
        this.data = data;
        this.bindingStartIndex = bindingStartIndex;
        this.expandoStartIndex = expandoStartIndex;
        this.expandoInstructions = expandoInstructions;
        this.firstCreatePass = firstCreatePass;
        this.firstUpdatePass = firstUpdatePass;
        this.staticViewQueries = staticViewQueries;
        this.staticContentQueries = staticContentQueries;
        this.preOrderHooks = preOrderHooks;
        this.preOrderCheckHooks = preOrderCheckHooks;
        this.contentHooks = contentHooks;
        this.contentCheckHooks = contentCheckHooks;
        this.viewHooks = viewHooks;
        this.viewCheckHooks = viewCheckHooks;
        this.destroyHooks = destroyHooks;
        this.cleanup = cleanup;
        this.contentQueries = contentQueries;
        this.components = components;
        this.directiveRegistry = directiveRegistry;
        this.pipeRegistry = pipeRegistry;
        this.firstChild = firstChild;
        this.schemas = schemas;
        this.consts = consts;
    }
    Object.defineProperty(TView.prototype, "template_", {
        get: function () {
            var buf = [];
            processTNodeChildren(this.firstChild, buf);
            return buf.join('');
        },
        enumerable: true,
        configurable: true
    });
    return TView;
}());
var TNode = /** @class */ /*@__PURE__*/ (function () {
    function TNode(tView_, //
    type, //
    index, //
    injectorIndex, //
    directiveStart, //
    directiveEnd, //
    directiveStylingLast, //
    propertyBindings, //
    flags, //
    providerIndexes, //
    tagName, //
    attrs, //
    mergedAttrs, //
    localNames, //
    initialInputs, //
    inputs, //
    outputs, //
    tViews, //
    next, //
    projectionNext, //
    child, //
    parent, //
    projection, //
    styles, //
    residualStyles, //
    classes, //
    residualClasses, //
    classBindings, //
    styleBindings) {
        this.tView_ = tView_;
        this.type = type;
        this.index = index;
        this.injectorIndex = injectorIndex;
        this.directiveStart = directiveStart;
        this.directiveEnd = directiveEnd;
        this.directiveStylingLast = directiveStylingLast;
        this.propertyBindings = propertyBindings;
        this.flags = flags;
        this.providerIndexes = providerIndexes;
        this.tagName = tagName;
        this.attrs = attrs;
        this.mergedAttrs = mergedAttrs;
        this.localNames = localNames;
        this.initialInputs = initialInputs;
        this.inputs = inputs;
        this.outputs = outputs;
        this.tViews = tViews;
        this.next = next;
        this.projectionNext = projectionNext;
        this.child = child;
        this.parent = parent;
        this.projection = projection;
        this.styles = styles;
        this.residualStyles = residualStyles;
        this.classes = classes;
        this.residualClasses = residualClasses;
        this.classBindings = classBindings;
        this.styleBindings = styleBindings;
    }
    Object.defineProperty(TNode.prototype, "type_", {
        get: function () {
            switch (this.type) {
                case 0 /* Container */:
                    return 'TNodeType.Container';
                case 3 /* Element */:
                    return 'TNodeType.Element';
                case 4 /* ElementContainer */:
                    return 'TNodeType.ElementContainer';
                case 5 /* IcuContainer */:
                    return 'TNodeType.IcuContainer';
                case 1 /* Projection */:
                    return 'TNodeType.Projection';
                case 2 /* View */:
                    return 'TNodeType.View';
                default:
                    return 'TNodeType.???';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode.prototype, "flags_", {
        get: function () {
            var flags = [];
            if (this.flags & 16 /* hasClassInput */)
                flags.push('TNodeFlags.hasClassInput');
            if (this.flags & 8 /* hasContentQuery */)
                flags.push('TNodeFlags.hasContentQuery');
            if (this.flags & 32 /* hasStyleInput */)
                flags.push('TNodeFlags.hasStyleInput');
            if (this.flags & 128 /* hasHostBindings */)
                flags.push('TNodeFlags.hasHostBindings');
            if (this.flags & 2 /* isComponentHost */)
                flags.push('TNodeFlags.isComponentHost');
            if (this.flags & 1 /* isDirectiveHost */)
                flags.push('TNodeFlags.isDirectiveHost');
            if (this.flags & 64 /* isDetached */)
                flags.push('TNodeFlags.isDetached');
            if (this.flags & 4 /* isProjected */)
                flags.push('TNodeFlags.isProjected');
            return flags.join('|');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode.prototype, "template_", {
        get: function () {
            var buf = [];
            buf.push('<', this.tagName || this.type_);
            if (this.attrs) {
                for (var i = 0; i < this.attrs.length;) {
                    var attrName = this.attrs[i++];
                    if (typeof attrName == 'number') {
                        break;
                    }
                    var attrValue = this.attrs[i++];
                    buf.push(' ', attrName, '="', attrValue, '"');
                }
            }
            buf.push('>');
            processTNodeChildren(this.child, buf);
            buf.push('</', this.tagName || this.type_, '>');
            return buf.join('');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode.prototype, "styleBindings_", {
        get: function () { return toDebugStyleBinding(this, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode.prototype, "classBindings_", {
        get: function () { return toDebugStyleBinding(this, true); },
        enumerable: true,
        configurable: true
    });
    return TNode;
}());
var TNodeDebug = TNode;
function toDebugStyleBinding(tNode, isClassBased) {
    var tData = tNode.tView_.data;
    var bindings = [];
    var range = isClassBased ? tNode.classBindings : tNode.styleBindings;
    var prev = getTStylingRangePrev(range);
    var next = getTStylingRangeNext(range);
    var isTemplate = next !== 0;
    var cursor = isTemplate ? next : prev;
    while (cursor !== 0) {
        var itemKey = tData[cursor];
        var itemRange = tData[cursor + 1];
        bindings.unshift({
            key: itemKey,
            index: cursor,
            isTemplate: isTemplate,
            prevDuplicate: getTStylingRangePrevDuplicate(itemRange),
            nextDuplicate: getTStylingRangeNextDuplicate(itemRange),
            nextIndex: getTStylingRangeNext(itemRange),
            prevIndex: getTStylingRangePrev(itemRange),
        });
        if (cursor === prev)
            isTemplate = false;
        cursor = getTStylingRangePrev(itemRange);
    }
    bindings.push((isClassBased ? tNode.residualClasses : tNode.residualStyles) || null);
    return bindings;
}
function processTNodeChildren(tNode, buf) {
    while (tNode) {
        buf.push(tNode.template_);
        tNode = tNode.next;
    }
}
var TViewData = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TViewData') || null;
var TVIEWDATA_EMPTY; // can't initialize here or it will not be tree shaken, because `LView`
// constructor could have side-effects.
/**
 * This function clones a blueprint and creates TData.
 *
 * Simple slice will keep the same type, and we need it to be TData
 */
function cloneToTViewData(list) {
    if (TVIEWDATA_EMPTY === undefined)
        TVIEWDATA_EMPTY = new TViewData();
    return TVIEWDATA_EMPTY.concat(list);
}
var LViewBlueprint = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('LViewBlueprint') || null;
var MatchesArray = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('MatchesArray') || null;
var TViewComponents = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TViewComponents') || null;
var TNodeLocalNames = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TNodeLocalNames') || null;
var TNodeInitialInputs = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TNodeInitialInputs') || null;
var TNodeInitialData = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TNodeInitialData') || null;
var LCleanup = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('LCleanup') || null;
var TCleanup = NG_DEV_MODE && /*@__PURE__*/ createNamedArrayType('TCleanup') || null;
function attachLViewDebug(lView) {
    attachDebugObject(lView, new LViewDebug(lView));
}
function toDebug(obj) {
    if (obj) {
        var debug = obj.debug;
        assertDefined(debug, 'Object does not have a debug representation.');
        return debug;
    }
    else {
        return obj;
    }
}
/**
 * Use this method to unwrap a native element in `LView` and convert it into HTML for easier
 * reading.
 *
 * @param value possibly wrapped native DOM node.
 * @param includeChildren If `true` then the serialized HTML form will include child elements
 * (same
 * as `outerHTML`). If `false` then the serialized HTML form will only contain the element
 * itself
 * (will not serialize child elements).
 */
function toHtml(value, includeChildren) {
    if (includeChildren === void 0) {
        includeChildren = false;
    }
    var node = unwrapRNode(value);
    if (node) {
        var isTextNode = node.nodeType === Node.TEXT_NODE;
        var outerHTML = (isTextNode ? node.textContent : node.outerHTML) || '';
        if (includeChildren || isTextNode) {
            return outerHTML;
        }
        else {
            var innerHTML = '>' + node.innerHTML + '<';
            return (outerHTML.split(innerHTML)[0]) + '>';
        }
    }
    else {
        return null;
    }
}
var LViewDebug = /** @class */ /*@__PURE__*/ (function () {
    function LViewDebug(_raw_lView) {
        this._raw_lView = _raw_lView;
    }
    Object.defineProperty(LViewDebug.prototype, "flags", {
        /**
         * Flags associated with the `LView` unpacked into a more readable state.
         */
        get: function () {
            var flags = this._raw_lView[FLAGS];
            return {
                __raw__flags__: flags,
                initPhaseState: flags & 3 /* InitPhaseStateMask */,
                creationMode: !!(flags & 4 /* CreationMode */),
                firstViewPass: !!(flags & 8 /* FirstLViewPass */),
                checkAlways: !!(flags & 16 /* CheckAlways */),
                dirty: !!(flags & 64 /* Dirty */),
                attached: !!(flags & 128 /* Attached */),
                destroyed: !!(flags & 256 /* Destroyed */),
                isRoot: !!(flags & 512 /* IsRoot */),
                indexWithinInitPhase: flags >> 10 /* IndexWithinInitPhaseShift */,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "parent", {
        get: function () { return toDebug(this._raw_lView[PARENT]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "host", {
        get: function () { return toHtml(this._raw_lView[HOST], true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "html", {
        get: function () { return (this.nodes || []).map(function (node) { return toHtml(node.native, true); }).join(''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "context", {
        get: function () { return this._raw_lView[CONTEXT]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "nodes", {
        /**
         * The tree of nodes associated with the current `LView`. The nodes have been normalized into
         * a
         * tree structure with relevant details pulled out for readability.
         */
        get: function () {
            var lView = this._raw_lView;
            var tNode = lView[TVIEW].firstChild;
            return toDebugNodes(tNode, lView);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "tView", {
        get: function () { return this._raw_lView[TVIEW]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "cleanup", {
        get: function () { return this._raw_lView[CLEANUP]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "injector", {
        get: function () { return this._raw_lView[INJECTOR$1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "rendererFactory", {
        get: function () { return this._raw_lView[RENDERER_FACTORY]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "renderer", {
        get: function () { return this._raw_lView[RENDERER]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "sanitizer", {
        get: function () { return this._raw_lView[SANITIZER]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "childHead", {
        get: function () { return toDebug(this._raw_lView[CHILD_HEAD]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "next", {
        get: function () { return toDebug(this._raw_lView[NEXT]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "childTail", {
        get: function () { return toDebug(this._raw_lView[CHILD_TAIL]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "declarationView", {
        get: function () { return toDebug(this._raw_lView[DECLARATION_VIEW]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "queries", {
        get: function () { return this._raw_lView[QUERIES]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "tHost", {
        get: function () { return this._raw_lView[T_HOST]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LViewDebug.prototype, "childViews", {
        /**
         * Normalized view of child views (and containers) attached at this location.
         */
        get: function () {
            var childViews = [];
            var child = this.childHead;
            while (child) {
                childViews.push(child);
                child = child.next;
            }
            return childViews;
        },
        enumerable: true,
        configurable: true
    });
    return LViewDebug;
}());
/**
 * Turns a flat list of nodes into a tree by walking the associated `TNode` tree.
 *
 * @param tNode
 * @param lView
 */
function toDebugNodes(tNode, lView) {
    if (tNode) {
        var debugNodes = [];
        var tNodeCursor = tNode;
        while (tNodeCursor) {
            debugNodes.push(buildDebugNode(tNodeCursor, lView, tNodeCursor.index));
            tNodeCursor = tNodeCursor.next;
        }
        return debugNodes;
    }
    else {
        return null;
    }
}
function buildDebugNode(tNode, lView, nodeIndex) {
    var rawValue = lView[nodeIndex];
    var native = unwrapRNode(rawValue);
    var componentLViewDebug = toDebug(readLViewValue(rawValue));
    return {
        html: toHtml(native),
        native: native,
        nodes: toDebugNodes(tNode.child, lView),
        component: componentLViewDebug,
    };
}
var LContainerDebug = /** @class */ /*@__PURE__*/ (function () {
    function LContainerDebug(_raw_lContainer) {
        this._raw_lContainer = _raw_lContainer;
    }
    Object.defineProperty(LContainerDebug.prototype, "activeIndex", {
        get: function () { return getLContainerActiveIndex(this._raw_lContainer); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "hasTransplantedViews", {
        get: function () {
            return (this._raw_lContainer[ACTIVE_INDEX] & 1 /* HAS_TRANSPLANTED_VIEWS */) ===
                1 /* HAS_TRANSPLANTED_VIEWS */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "views", {
        get: function () {
            return this._raw_lContainer.slice(CONTAINER_HEADER_OFFSET)
                .map(toDebug);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "parent", {
        get: function () { return toDebug(this._raw_lContainer[PARENT]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "movedViews", {
        get: function () { return this._raw_lContainer[MOVED_VIEWS]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "host", {
        get: function () { return this._raw_lContainer[HOST]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "native", {
        get: function () { return this._raw_lContainer[NATIVE]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LContainerDebug.prototype, "next", {
        get: function () { return toDebug(this._raw_lContainer[NEXT]); },
        enumerable: true,
        configurable: true
    });
    return LContainerDebug;
}());
/**
 * Return an `LView` value if found.
 *
 * @param value `LView` if any
 */
function readLViewValue(value) {
    while (Array.isArray(value)) {
        // This check is not quite right, as it does not take into account `StylingContext`
        // This is why it is in debug, not in util.ts
        if (value.length >= HEADER_OFFSET - 1)
            return value;
        value = value[HOST];
    }
    return null;
}
var I18NDebugItem = /** @class */ /*@__PURE__*/ (function () {
    function I18NDebugItem(__raw_opCode, _lView, nodeIndex, type) {
        this.__raw_opCode = __raw_opCode;
        this._lView = _lView;
        this.nodeIndex = nodeIndex;
        this.type = type;
    }
    Object.defineProperty(I18NDebugItem.prototype, "tNode", {
        get: function () { return getTNode(this._lView[TVIEW], this.nodeIndex); },
        enumerable: true,
        configurable: true
    });
    return I18NDebugItem;
}());
var I18nMutateOpCodesDebug = /** @class */ /*@__PURE__*/ (function () {
    function I18nMutateOpCodesDebug(__raw_opCodes, __lView) {
        this.__raw_opCodes = __raw_opCodes;
        this.__lView = __lView;
    }
    Object.defineProperty(I18nMutateOpCodesDebug.prototype, "operations", {
        /**
         * A list of operation information about how the OpCodes will act on the view.
         */
        get: function () {
            var _a = this, __lView = _a.__lView, __raw_opCodes = _a.__raw_opCodes;
            var results = [];
            for (var i = 0; i < __raw_opCodes.length; i++) {
                var opCode = __raw_opCodes[i];
                var result = void 0;
                if (typeof opCode === 'string') {
                    result = {
                        __raw_opCode: opCode,
                        type: 'Create Text Node',
                        nodeIndex: __raw_opCodes[++i],
                        text: opCode,
                    };
                }
                if (typeof opCode === 'number') {
                    switch (opCode & 7 /* MASK_OPCODE */) {
                        case 1 /* AppendChild */:
                            var destinationNodeIndex = opCode >>> 17;
                            result = new I18NDebugItem(opCode, __lView, destinationNodeIndex, 'AppendChild');
                            break;
                        case 0 /* Select */:
                            var nodeIndex = opCode >>> 3;
                            result = new I18NDebugItem(opCode, __lView, nodeIndex, 'Select');
                            break;
                        case 5 /* ElementEnd */:
                            var elementIndex = opCode >>> 3;
                            result = new I18NDebugItem(opCode, __lView, elementIndex, 'ElementEnd');
                            break;
                        case 4 /* Attr */:
                            elementIndex = opCode >>> 3 /* SHIFT_REF */;
                            result = new I18NDebugItem(opCode, __lView, elementIndex, 'Attr');
                            result['attrName'] = __raw_opCodes[++i];
                            result['attrValue'] = __raw_opCodes[++i];
                            break;
                    }
                }
                if (!result) {
                    switch (opCode) {
                        case COMMENT_MARKER:
                            result = {
                                __raw_opCode: opCode,
                                type: 'COMMENT_MARKER',
                                commentValue: __raw_opCodes[++i],
                                nodeIndex: __raw_opCodes[++i],
                            };
                            break;
                        case ELEMENT_MARKER:
                            result = {
                                __raw_opCode: opCode,
                                type: 'ELEMENT_MARKER',
                            };
                            break;
                    }
                }
                if (!result) {
                    result = {
                        __raw_opCode: opCode,
                        type: 'Unknown Op Code',
                        code: opCode,
                    };
                }
                results.push(result);
            }
            return results;
        },
        enumerable: true,
        configurable: true
    });
    return I18nMutateOpCodesDebug;
}());
var I18nUpdateOpCodesDebug = /** @class */ /*@__PURE__*/ (function () {
    function I18nUpdateOpCodesDebug(__raw_opCodes, icus, __lView) {
        this.__raw_opCodes = __raw_opCodes;
        this.icus = icus;
        this.__lView = __lView;
    }
    Object.defineProperty(I18nUpdateOpCodesDebug.prototype, "operations", {
        /**
         * A list of operation information about how the OpCodes will act on the view.
         */
        get: function () {
            var _a = this, __lView = _a.__lView, __raw_opCodes = _a.__raw_opCodes, icus = _a.icus;
            var results = [];
            for (var i = 0; i < __raw_opCodes.length; i++) {
                // bit code to check if we should apply the next update
                var checkBit = __raw_opCodes[i];
                // Number of opCodes to skip until next set of update codes
                var skipCodes = __raw_opCodes[++i];
                var value = '';
                for (var j = i + 1; j <= (i + skipCodes); j++) {
                    var opCode = __raw_opCodes[j];
                    if (typeof opCode === 'string') {
                        value += opCode;
                    }
                    else if (typeof opCode == 'number') {
                        if (opCode < 0) {
                            // It's a binding index whose value is negative
                            // We cannot know the value of the binding so we only show the index
                            value += "\uFFFD" + (-opCode - 1) + "\uFFFD";
                        }
                        else {
                            var nodeIndex = opCode >>> 2;
                            var tIcuIndex = void 0;
                            var tIcu = void 0;
                            switch (opCode & 3 /* MASK_OPCODE */) {
                                case 1 /* Attr */:
                                    var attrName = __raw_opCodes[++j];
                                    var sanitizeFn = __raw_opCodes[++j];
                                    results.push({
                                        __raw_opCode: opCode,
                                        checkBit: checkBit,
                                        type: 'Attr',
                                        attrValue: value, attrName: attrName, sanitizeFn: sanitizeFn,
                                    });
                                    break;
                                case 0 /* Text */:
                                    results.push({
                                        __raw_opCode: opCode,
                                        checkBit: checkBit,
                                        type: 'Text', nodeIndex: nodeIndex,
                                        text: value,
                                    });
                                    break;
                                case 2 /* IcuSwitch */:
                                    tIcuIndex = __raw_opCodes[++j];
                                    tIcu = icus[tIcuIndex];
                                    var result = new I18NDebugItem(opCode, __lView, nodeIndex, 'IcuSwitch');
                                    result['tIcuIndex'] = tIcuIndex;
                                    result['checkBit'] = checkBit;
                                    result['mainBinding'] = value;
                                    result['tIcu'] = tIcu;
                                    results.push(result);
                                    break;
                                case 3 /* IcuUpdate */:
                                    tIcuIndex = __raw_opCodes[++j];
                                    tIcu = icus[tIcuIndex];
                                    result = new I18NDebugItem(opCode, __lView, nodeIndex, 'IcuUpdate');
                                    result['tIcuIndex'] = tIcuIndex;
                                    result['checkBit'] = checkBit;
                                    result['tIcu'] = tIcu;
                                    results.push(result);
                                    break;
                            }
                        }
                    }
                }
                i += skipCodes;
            }
            return results;
        },
        enumerable: true,
        configurable: true
    });
    return I18nUpdateOpCodesDebug;
}());
var ɵ0$4 = function () { return Promise.resolve(null); };
/**
 * A permanent marker promise which signifies that the current CD tree is
 * clean.
 */
var _CLEAN_PROMISE = /*@__PURE__*/ (ɵ0$4)();
/**
 * Process the `TView.expandoInstructions`. (Execute the `hostBindings`.)
 *
 * @param tView `TView` containing the `expandoInstructions`
 * @param lView `LView` associated with the `TView`
 */
function setHostBindingsByExecutingExpandoInstructions(tView, lView) {
    ngDevMode && assertSame(tView, lView[TVIEW], '`LView` is not associated with the `TView`!');
    try {
        var expandoInstructions = tView.expandoInstructions;
        if (expandoInstructions !== null) {
            var bindingRootIndex = tView.expandoStartIndex;
            var currentDirectiveIndex = -1;
            var currentElementIndex = -1;
            // TODO(misko): PERF It is possible to get here with `TView.expandoInstructions` containing no
            // functions to execute. This is wasteful as there is no work to be done, but we still need
            // to iterate over the instructions.
            // In example of this is in this test: `host_binding_spec.ts`
            // `fit('should not cause problems if detectChanges is called when a property updates', ...`
            // In the above test we get here with expando [0, 0, 1] which requires a lot of processing but
            // there is no function to execute.
            for (var i = 0; i < expandoInstructions.length; i++) {
                var instruction = expandoInstructions[i];
                if (typeof instruction === 'number') {
                    if (instruction <= 0) {
                        // Negative numbers mean that we are starting new EXPANDO block and need to update
                        // the current element and directive index.
                        // Important: In JS `-x` and `0-x` is not the same! If `x===0` then `-x` will produce
                        // `-0` which requires non standard math arithmetic and it can prevent VM optimizations.
                        // `0-0` will always produce `0` and will not cause a potential deoptimization in VM.
                        // TODO(misko): PERF This should be refactored to use `~instruction` as that does not
                        // suffer from `-0` and it is faster/more compact.
                        currentElementIndex = 0 - instruction;
                        setSelectedIndex(currentElementIndex);
                        // Injector block and providers are taken into account.
                        var providerCount = expandoInstructions[++i];
                        bindingRootIndex += INJECTOR_BLOOM_PARENT_SIZE + providerCount;
                        currentDirectiveIndex = bindingRootIndex;
                    }
                    else {
                        // This is either the injector size (so the binding root can skip over directives
                        // and get to the first set of host bindings on this node) or the host var count
                        // (to get to the next set of host bindings on this node).
                        bindingRootIndex += instruction;
                    }
                }
                else {
                    // If it's not a number, it's a host binding function that needs to be executed.
                    if (instruction !== null) {
                        setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex);
                        var hostCtx = lView[currentDirectiveIndex];
                        instruction(2 /* Update */, hostCtx);
                    }
                    // TODO(misko): PERF Relying on incrementing the `currentDirectiveIndex` here is
                    // sub-optimal. The implications are that if we have a lot of directives but none of them
                    // have host bindings we nevertheless need to iterate over the expando instructions to
                    // update the counter. It would be much better if we could encode the
                    // `currentDirectiveIndex` into the `expandoInstruction` array so that we only need to
                    // iterate over those directives which actually have `hostBindings`.
                    currentDirectiveIndex++;
                }
            }
        }
    }
    finally {
        setSelectedIndex(-1);
    }
}
/** Refreshes all content queries declared by directives in a given view */
function refreshContentQueries(tView, lView) {
    var contentQueries = tView.contentQueries;
    if (contentQueries !== null) {
        for (var i = 0; i < contentQueries.length; i += 2) {
            var queryStartIdx = contentQueries[i];
            var directiveDefIdx = contentQueries[i + 1];
            if (directiveDefIdx !== -1) {
                var directiveDef = tView.data[directiveDefIdx];
                ngDevMode &&
                    assertDefined(directiveDef.contentQueries, 'contentQueries function should be defined');
                setCurrentQueryIndex(queryStartIdx);
                directiveDef.contentQueries(2 /* Update */, lView[directiveDefIdx], directiveDefIdx);
            }
        }
    }
}
/** Refreshes child components in the current view (update mode). */
function refreshChildComponents(hostLView, components) {
    for (var i = 0; i < components.length; i++) {
        refreshComponent(hostLView, components[i]);
    }
}
/** Renders child components in the current view (creation mode). */
function renderChildComponents(hostLView, components) {
    for (var i = 0; i < components.length; i++) {
        renderComponent(hostLView, components[i]);
    }
}
/**
 * Creates a native element from a tag name, using a renderer.
 * @param name the tag name
 * @param renderer A renderer to use
 * @returns the element created
 */
function elementCreate(name, renderer, namespace) {
    if (isProceduralRenderer(renderer)) {
        return renderer.createElement(name, namespace);
    }
    else {
        return namespace === null ? renderer.createElement(name) :
            renderer.createElementNS(namespace, name);
    }
}
function createLView(parentLView, tView, context, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector) {
    var lView = ngDevMode ? cloneToLViewFromTViewBlueprint(tView) : tView.blueprint.slice();
    lView[HOST] = host;
    lView[FLAGS] = flags | 4 /* CreationMode */ | 128 /* Attached */ | 8 /* FirstLViewPass */;
    resetPreOrderHookFlags(lView);
    lView[PARENT] = lView[DECLARATION_VIEW] = parentLView;
    lView[CONTEXT] = context;
    lView[RENDERER_FACTORY] = (rendererFactory || parentLView && parentLView[RENDERER_FACTORY]);
    ngDevMode && assertDefined(lView[RENDERER_FACTORY], 'RendererFactory is required');
    lView[RENDERER] = (renderer || parentLView && parentLView[RENDERER]);
    ngDevMode && assertDefined(lView[RENDERER], 'Renderer is required');
    lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null;
    lView[INJECTOR$1] = injector || parentLView && parentLView[INJECTOR$1] || null;
    lView[T_HOST] = tHostNode;
    ngDevMode && assertEqual(tView.type == 2 /* Embedded */ ? parentLView !== null : true, true, 'Embedded views must have parentLView');
    lView[DECLARATION_COMPONENT_VIEW] =
        tView.type == 2 /* Embedded */ ? parentLView[DECLARATION_COMPONENT_VIEW] : lView;
    ngDevMode && attachLViewDebug(lView);
    return lView;
}
function getOrCreateTNode(tView, tHostNode, index, type, name, attrs) {
    // Keep this function short, so that the VM will inline it.
    var adjustedIndex = index + HEADER_OFFSET;
    var tNode = tView.data[adjustedIndex] ||
        createTNodeAtIndex(tView, tHostNode, adjustedIndex, type, name, attrs);
    setPreviousOrParentTNode(tNode, true);
    return tNode;
}
function createTNodeAtIndex(tView, tHostNode, adjustedIndex, type, name, attrs) {
    var previousOrParentTNode = getPreviousOrParentTNode();
    var isParent = getIsParent();
    var parent = isParent ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent;
    // Parents cannot cross component boundaries because components will be used in multiple places,
    // so it's only set if the view is the same.
    var parentInSameView = parent && parent !== tHostNode;
    var tParentNode = parentInSameView ? parent : null;
    var tNode = tView.data[adjustedIndex] =
        createTNode(tView, tParentNode, type, adjustedIndex, name, attrs);
    // Assign a pointer to the first child node of a given view. The first node is not always the one
    // at index 0, in case of i18n, index 0 can be the instruction `i18nStart` and the first node has
    // the index 1 or more, so we can't just check node index.
    if (tView.firstChild === null) {
        tView.firstChild = tNode;
    }
    if (previousOrParentTNode) {
        if (isParent && previousOrParentTNode.child == null &&
            (tNode.parent !== null || previousOrParentTNode.type === 2 /* View */)) {
            // We are in the same view, which means we are adding content node to the parent view.
            previousOrParentTNode.child = tNode;
        }
        else if (!isParent) {
            previousOrParentTNode.next = tNode;
        }
    }
    return tNode;
}
function assignTViewNodeToLView(tView, tParentNode, index, lView) {
    // View nodes are not stored in data because they can be added / removed at runtime (which
    // would cause indices to change). Their TNodes are instead stored in tView.node.
    var tNode = tView.node;
    if (tNode == null) {
        ngDevMode && tParentNode &&
            assertNodeOfPossibleTypes(tParentNode, 3 /* Element */, 0 /* Container */);
        tView.node = tNode = createTNode(tView, tParentNode, //
        2 /* View */, index, null, null);
    }
    return lView[T_HOST] = tNode;
}
//////////////////////////
//// Render
//////////////////////////
/**
 * Processes a view in the creation mode. This includes a number of steps in a specific order:
 * - creating view query functions (if any);
 * - executing a template function in the creation mode;
 * - updating static queries (if any);
 * - creating child components defined in a given view.
 */
function renderView(tView, lView, context) {
    ngDevMode && assertEqual(isCreationMode(lView), true, 'Should be run in creation mode');
    enterView(lView, lView[T_HOST]);
    try {
        var viewQuery = tView.viewQuery;
        if (viewQuery !== null) {
            executeViewQueryFn(1 /* Create */, viewQuery, context);
        }
        // Execute a template associated with this view, if it exists. A template function might not be
        // defined for the root component views.
        var templateFn = tView.template;
        if (templateFn !== null) {
            executeTemplate(tView, lView, templateFn, 1 /* Create */, context);
        }
        // This needs to be set before children are processed to support recursive components.
        // This must be set to false immediately after the first creation run because in an
        // ngFor loop, all the views will be created together before update mode runs and turns
        // off firstCreatePass. If we don't set it here, instances will perform directive
        // matching, etc again and again.
        if (tView.firstCreatePass) {
            tView.firstCreatePass = false;
        }
        // We resolve content queries specifically marked as `static` in creation mode. Dynamic
        // content queries are resolved during change detection (i.e. update mode), after embedded
        // views are refreshed (see block above).
        if (tView.staticContentQueries) {
            refreshContentQueries(tView, lView);
        }
        // We must materialize query results before child components are processed
        // in case a child component has projected a container. The LContainer needs
        // to exist so the embedded views are properly attached by the container.
        if (tView.staticViewQueries) {
            executeViewQueryFn(2 /* Update */, tView.viewQuery, context);
        }
        // Render child component views.
        var components = tView.components;
        if (components !== null) {
            renderChildComponents(lView, components);
        }
    }
    finally {
        lView[FLAGS] &= ~4 /* CreationMode */;
        leaveView();
    }
}
/**
 * Processes a view in update mode. This includes a number of steps in a specific order:
 * - executing a template function in update mode;
 * - executing hooks;
 * - refreshing queries;
 * - setting host bindings;
 * - refreshing child (embedded and component) views.
 */
function refreshView(tView, lView, templateFn, context) {
    ngDevMode && assertEqual(isCreationMode(lView), false, 'Should be run in update mode');
    var flags = lView[FLAGS];
    if ((flags & 256 /* Destroyed */) === 256 /* Destroyed */)
        return;
    enterView(lView, lView[T_HOST]);
    var checkNoChangesMode = getCheckNoChangesMode();
    try {
        resetPreOrderHookFlags(lView);
        setBindingIndex(tView.bindingStartIndex);
        if (templateFn !== null) {
            executeTemplate(tView, lView, templateFn, 2 /* Update */, context);
        }
        var hooksInitPhaseCompleted = (flags & 3 /* InitPhaseStateMask */) === 3;
        // execute pre-order hooks (OnInit, OnChanges, DoCheck)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!checkNoChangesMode) {
            if (hooksInitPhaseCompleted) {
                var preOrderCheckHooks = tView.preOrderCheckHooks;
                if (preOrderCheckHooks !== null) {
                    executeCheckHooks(lView, preOrderCheckHooks, null);
                }
            }
            else {
                var preOrderHooks = tView.preOrderHooks;
                if (preOrderHooks !== null) {
                    executeInitAndCheckHooks(lView, preOrderHooks, 0 /* OnInitHooksToBeRun */, null);
                }
                incrementInitPhaseFlags(lView, 0 /* OnInitHooksToBeRun */);
            }
        }
        refreshDynamicEmbeddedViews(lView);
        // Content query results must be refreshed before content hooks are called.
        if (tView.contentQueries !== null) {
            refreshContentQueries(tView, lView);
        }
        // execute content hooks (AfterContentInit, AfterContentChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!checkNoChangesMode) {
            if (hooksInitPhaseCompleted) {
                var contentCheckHooks = tView.contentCheckHooks;
                if (contentCheckHooks !== null) {
                    executeCheckHooks(lView, contentCheckHooks);
                }
            }
            else {
                var contentHooks = tView.contentHooks;
                if (contentHooks !== null) {
                    executeInitAndCheckHooks(lView, contentHooks, 1 /* AfterContentInitHooksToBeRun */);
                }
                incrementInitPhaseFlags(lView, 1 /* AfterContentInitHooksToBeRun */);
            }
        }
        setHostBindingsByExecutingExpandoInstructions(tView, lView);
        // Refresh child component views.
        var components = tView.components;
        if (components !== null) {
            refreshChildComponents(lView, components);
        }
        // View queries must execute after refreshing child components because a template in this view
        // could be inserted in a child component. If the view query executes before child component
        // refresh, the template might not yet be inserted.
        var viewQuery = tView.viewQuery;
        if (viewQuery !== null) {
            executeViewQueryFn(2 /* Update */, viewQuery, context);
        }
        // execute view hooks (AfterViewInit, AfterViewChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!checkNoChangesMode) {
            if (hooksInitPhaseCompleted) {
                var viewCheckHooks = tView.viewCheckHooks;
                if (viewCheckHooks !== null) {
                    executeCheckHooks(lView, viewCheckHooks);
                }
            }
            else {
                var viewHooks = tView.viewHooks;
                if (viewHooks !== null) {
                    executeInitAndCheckHooks(lView, viewHooks, 2 /* AfterViewInitHooksToBeRun */);
                }
                incrementInitPhaseFlags(lView, 2 /* AfterViewInitHooksToBeRun */);
            }
        }
        if (tView.firstUpdatePass === true) {
            // We need to make sure that we only flip the flag on successful `refreshView` only
            // Don't do this in `finally` block.
            // If we did this in `finally` block then an exception could block the execution of styling
            // instructions which in turn would be unable to insert themselves into the styling linked
            // list. The result of this would be that if the exception would not be throw on subsequent CD
            // the styling would be unable to process it data and reflect to the DOM.
            tView.firstUpdatePass = false;
        }
        // Do not reset the dirty state when running in check no changes mode. We don't want components
        // to behave differently depending on whether check no changes is enabled or not. For example:
        // Marking an OnPush component as dirty from within the `ngAfterViewInit` hook in order to
        // refresh a `NgClass` binding should work. If we would reset the dirty state in the check
        // no changes cycle, the component would be not be dirty for the next update pass. This would
        // be different in production mode where the component dirty state is not reset.
        if (!checkNoChangesMode) {
            lView[FLAGS] &= ~(64 /* Dirty */ | 8 /* FirstLViewPass */);
        }
    }
    finally {
        leaveView();
    }
}
function renderComponentOrTemplate(tView, lView, templateFn, context) {
    var rendererFactory = lView[RENDERER_FACTORY];
    var normalExecutionPath = !getCheckNoChangesMode();
    var creationModeIsActive = isCreationMode(lView);
    try {
        if (normalExecutionPath && !creationModeIsActive && rendererFactory.begin) {
            rendererFactory.begin();
        }
        if (creationModeIsActive) {
            renderView(tView, lView, context);
        }
        refreshView(tView, lView, templateFn, context);
    }
    finally {
        if (normalExecutionPath && !creationModeIsActive && rendererFactory.end) {
            rendererFactory.end();
        }
    }
}
function executeTemplate(tView, lView, templateFn, rf, context) {
    var prevSelectedIndex = getSelectedIndex();
    try {
        setSelectedIndex(-1);
        if (rf & 2 /* Update */ && lView.length > HEADER_OFFSET) {
            // When we're updating, inherently select 0 so we don't
            // have to generate that instruction for most update blocks.
            selectIndexInternal(tView, lView, 0, getCheckNoChangesMode());
        }
        templateFn(rf, context);
    }
    finally {
        setSelectedIndex(prevSelectedIndex);
    }
}
/**
 * Gets TView from a template function or creates a new TView
 * if it doesn't already exist.
 *
 * @param def ComponentDef
 * @returns TView
 */
function getOrCreateTComponentView(def) {
    return def.tView ||
        (def.tView = createTView(1 /* Component */, -1, def.template, def.decls, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas, def.consts));
}
/**
 * Creates a TView instance
 *
 * @param viewIndex The viewBlockId for inline views, or -1 if it's a component/dynamic
 * @param templateFn Template function
 * @param decls The number of nodes, local refs, and pipes in this template
 * @param directives Registry of directives for this view
 * @param pipes Registry of pipes for this view
 * @param viewQuery View queries for this view
 * @param schemas Schemas for this view
 * @param consts Constants for this view
 */
function createTView(type, viewIndex, templateFn, decls, vars, directives, pipes, viewQuery, schemas, consts) {
    ngDevMode && ngDevMode.tView++;
    var bindingStartIndex = HEADER_OFFSET + decls;
    // This length does not yet contain host bindings from child directives because at this point,
    // we don't know which directives are active on this template. As soon as a directive is matched
    // that has a host binding, we will update the blueprint with that def's hostVars count.
    var initialViewLength = bindingStartIndex + vars;
    var blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
    return blueprint[TVIEW] = ngDevMode ?
        new TViewConstructor(type, viewIndex, // id: number,
        blueprint, // blueprint: LView,
        templateFn, // template: ComponentTemplate<{}>|null,
        null, // queries: TQueries|null
        viewQuery, // viewQuery: ViewQueriesFunction<{}>|null,
        null, // node: TViewNode|TElementNode|null,
        cloneToTViewData(blueprint).fill(null, bindingStartIndex), // data: TData,
        bindingStartIndex, // bindingStartIndex: number,
        initialViewLength, // expandoStartIndex: number,
        null, // expandoInstructions: ExpandoInstructions|null,
        true, // firstCreatePass: boolean,
        true, // firstUpdatePass: boolean,
        false, // staticViewQueries: boolean,
        false, // staticContentQueries: boolean,
        null, // preOrderHooks: HookData|null,
        null, // preOrderCheckHooks: HookData|null,
        null, // contentHooks: HookData|null,
        null, // contentCheckHooks: HookData|null,
        null, // viewHooks: HookData|null,
        null, // viewCheckHooks: HookData|null,
        null, // destroyHooks: HookData|null,
        null, // cleanup: any[]|null,
        null, // contentQueries: number[]|null,
        null, // components: number[]|null,
        typeof directives === 'function' ?
            directives() :
            directives, // directiveRegistry: DirectiveDefList|null,
        typeof pipes === 'function' ? pipes() : pipes, // pipeRegistry: PipeDefList|null,
        null, // firstChild: TNode|null,
        schemas, // schemas: SchemaMetadata[]|null,
        consts) : // consts: TConstants|null
        {
            type: type,
            id: viewIndex,
            blueprint: blueprint,
            template: templateFn,
            queries: null,
            viewQuery: viewQuery,
            node: null,
            data: blueprint.slice().fill(null, bindingStartIndex),
            bindingStartIndex: bindingStartIndex,
            expandoStartIndex: initialViewLength,
            expandoInstructions: null,
            firstCreatePass: true,
            firstUpdatePass: true,
            staticViewQueries: false,
            staticContentQueries: false,
            preOrderHooks: null,
            preOrderCheckHooks: null,
            contentHooks: null,
            contentCheckHooks: null,
            viewHooks: null,
            viewCheckHooks: null,
            destroyHooks: null,
            cleanup: null,
            contentQueries: null,
            components: null,
            directiveRegistry: typeof directives === 'function' ? directives() : directives,
            pipeRegistry: typeof pipes === 'function' ? pipes() : pipes,
            firstChild: null,
            schemas: schemas,
            consts: consts,
        };
}
function createViewBlueprint(bindingStartIndex, initialViewLength) {
    var blueprint = ngDevMode ? new LViewBlueprint() : [];
    for (var i = 0; i < initialViewLength; i++) {
        blueprint.push(i < bindingStartIndex ? null : NO_CHANGE);
    }
    return blueprint;
}
function createError(text, token) {
    return new Error("Renderer: " + text + " [" + stringifyForError(token) + "]");
}
function assertHostNodeExists(rElement, elementOrSelector) {
    if (!rElement) {
        if (typeof elementOrSelector === 'string') {
            throw createError('Host node with selector not found:', elementOrSelector);
        }
        else {
            throw createError('Host node is required:', elementOrSelector);
        }
    }
}
/**
 * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
 *
 * @param rendererFactory Factory function to create renderer instance.
 * @param elementOrSelector Render element or CSS selector to locate the element.
 * @param encapsulation View Encapsulation defined for component that requests host element.
 */
function locateHostElement(renderer, elementOrSelector, encapsulation) {
    if (isProceduralRenderer(renderer)) {
        // When using native Shadow DOM, do not clear host element to allow native slot projection
        var preserveContent = encapsulation === ViewEncapsulation$1.ShadowDom;
        return renderer.selectRootElement(elementOrSelector, preserveContent);
    }
    var rElement = typeof elementOrSelector === 'string' ?
        renderer.querySelector(elementOrSelector) :
        elementOrSelector;
    ngDevMode && assertHostNodeExists(rElement, elementOrSelector);
    // Always clear host element's content when Renderer3 is in use. For procedural renderer case we
    // make it depend on whether ShadowDom encapsulation is used (in which case the content should be
    // preserved to allow native slot projection). ShadowDom encapsulation requires procedural
    // renderer, and procedural renderer case is handled above.
    rElement.textContent = '';
    return rElement;
}
/**
 * Saves the cleanup function itself in LView.cleanupInstances.
 *
 * This is necessary for functions that are wrapped with their contexts, like in renderer2
 * listeners.
 *
 * On the first template pass, the index of the cleanup function is saved in TView.
 */
function storeCleanupFn(tView, lView, cleanupFn) {
    getLCleanup(lView).push(cleanupFn);
    if (tView.firstCreatePass) {
        getTViewCleanup(tView).push(lView[CLEANUP].length - 1, null);
    }
}
/**
 * Constructs a TNode object from the arguments.
 *
 * @param tView `TView` to which this `TNode` belongs (used only in `ngDevMode`)
 * @param type The type of the node
 * @param adjustedIndex The index of the TNode in TView.data, adjusted for HEADER_OFFSET
 * @param tagName The tag name of the node
 * @param attrs The attributes defined on this node
 * @param tViews Any TViews attached to this node
 * @returns the TNode object
 */
function createTNode(tView, tParent, type, adjustedIndex, tagName, attrs) {
    ngDevMode && ngDevMode.tNode++;
    var injectorIndex = tParent ? tParent.injectorIndex : -1;
    return ngDevMode ? new TNodeDebug(tView, // tView_: TView
    type, // type: TNodeType
    adjustedIndex, // index: number
    injectorIndex, // injectorIndex: number
    -1, // directiveStart: number
    -1, // directiveEnd: number
    -1, // directiveStylingLast: number
    null, // propertyBindings: number[]|null
    0, // flags: TNodeFlags
    0, // providerIndexes: TNodeProviderIndexes
    tagName, // tagName: string|null
    attrs, // attrs: (string|AttributeMarker|(string|SelectorFlags)[])[]|null
    null, // mergedAttrs
    null, // localNames: (string|number)[]|null
    undefined, // initialInputs: (string[]|null)[]|null|undefined
    null, // inputs: PropertyAliases|null
    null, // outputs: PropertyAliases|null
    null, // tViews: ITView|ITView[]|null
    null, // next: ITNode|null
    null, // projectionNext: ITNode|null
    null, // child: ITNode|null
    tParent, // parent: TElementNode|TContainerNode|null
    null, // projection: number|(ITNode|RNode[])[]|null
    null, // styles: string|null
    undefined, // residualStyles: string|null
    null, // classes: string|null
    undefined, // residualClasses: string|null
    0, // classBindings: TStylingRange;
    0) :
        {
            type: type,
            index: adjustedIndex,
            injectorIndex: injectorIndex,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            propertyBindings: null,
            flags: 0,
            providerIndexes: 0,
            tagName: tagName,
            attrs: attrs,
            mergedAttrs: null,
            localNames: null,
            initialInputs: undefined,
            inputs: null,
            outputs: null,
            tViews: null,
            next: null,
            projectionNext: null,
            child: null,
            parent: tParent,
            projection: null,
            styles: null,
            residualStyles: undefined,
            classes: null,
            residualClasses: undefined,
            classBindings: 0,
            styleBindings: 0,
        };
}
/**
 * Instantiate a root component.
 */
function instantiateRootComponent(tView, lView, def) {
    var rootTNode = getPreviousOrParentTNode();
    if (tView.firstCreatePass) {
        if (def.providersResolver)
            def.providersResolver(def);
        generateExpandoInstructionBlock(tView, rootTNode, 1);
        baseResolveDirective(tView, lView, def);
    }
    var directive = getNodeInjectable(lView, tView, lView.length - 1, rootTNode);
    attachPatchData(directive, lView);
    var native = getNativeByTNode(rootTNode, lView);
    if (native) {
        attachPatchData(native, lView);
    }
    return directive;
}
/**
 * Add `hostBindings` to the `TView.expandoInstructions`.
 *
 * @param tView `TView` to which the `hostBindings` should be added.
 * @param def `ComponentDef`/`DirectiveDef`, which contains the `hostVars`/`hostBindings` to add.
 */
function addHostBindingsToExpandoInstructions(tView, def) {
    ngDevMode && assertFirstCreatePass(tView);
    var expando = tView.expandoInstructions;
    // TODO(misko): PERF we are adding `hostBindings` even if there is nothing to add! This is
    // suboptimal for performance. `def.hostBindings` may be null,
    // but we still need to push null to the array as a placeholder
    // to ensure the directive counter is incremented (so host
    // binding functions always line up with the corrective directive).
    // This is suboptimal for performance. See `currentDirectiveIndex`
    //  comment in `setHostBindingsByExecutingExpandoInstructions` for more
    // details.  expando.push(def.hostBindings);
    expando.push(def.hostBindings);
    var hostVars = def.hostVars;
    if (hostVars !== 0) {
        expando.push(def.hostVars);
    }
}
/**
 * Grow the `LView`, blueprint and `TView.data` to accommodate the `hostBindings`.
 *
 * To support locality we don't know ahead of time how many `hostVars` of the containing directives
 * we need to allocate. For this reason we allow growing these data structures as we discover more
 * directives to accommodate them.
 *
 * @param tView `TView` which needs to be grown.
 * @param lView `LView` which needs to be grown.
 * @param count Size by which we need to grow the data structures.
 */
function growHostVarsSpace(tView, lView, count) {
    ngDevMode && assertFirstCreatePass(tView);
    ngDevMode && assertSame(tView, lView[TVIEW], '`LView` must be associated with `TView`!');
    for (var i = 0; i < count; i++) {
        lView.push(NO_CHANGE);
        tView.blueprint.push(NO_CHANGE);
        tView.data.push(null);
    }
}
/**
 * Invoke the host bindings in creation mode.
 *
 * @param def `DirectiveDef` which may contain the `hostBindings` function.
 * @param directive Instance of directive.
 */
function invokeHostBindingsInCreationMode(def, directive) {
    if (def.hostBindings !== null) {
        def.hostBindings(1 /* Create */, directive);
    }
}
/**
 * Generates a new block in TView.expandoInstructions for this node.
 *
 * Each expando block starts with the element index (turned negative so we can distinguish
 * it from the hostVar count) and the directive count. See more in VIEW_DATA.md.
 */
function generateExpandoInstructionBlock(tView, tNode, directiveCount) {
    ngDevMode && assertEqual(tView.firstCreatePass, true, 'Expando block should only be generated on first create pass.');
    // Important: In JS `-x` and `0-x` is not the same! If `x===0` then `-x` will produce `-0` which
    // requires non standard math arithmetic and it can prevent VM optimizations.
    // `0-0` will always produce `0` and will not cause a potential deoptimization in VM.
    var elementIndex = HEADER_OFFSET - tNode.index;
    var providerStartIndex = tNode.providerIndexes & 65535;
    var providerCount = tView.data.length - providerStartIndex;
    (tView.expandoInstructions || (tView.expandoInstructions = [])).push(elementIndex, providerCount, directiveCount);
}
/**
 * Marks a given TNode as a component's host. This consists of:
 * - setting appropriate TNode flags;
 * - storing index of component's host element so it will be queued for view refresh during CD.
*/
function markAsComponentHost(tView, hostTNode) {
    ngDevMode && assertFirstCreatePass(tView);
    hostTNode.flags |= 2 /* isComponentHost */;
    (tView.components || (tView.components = ngDevMode ? new TViewComponents() : [])).push(hostTNode.index);
}
/**
 * Initializes the flags on the current node, setting all indices to the initial index,
 * the directive count to 0, and adding the isComponent flag.
 * @param index the initial index
 */
function initTNodeFlags(tNode, index, numberOfDirectives) {
    ngDevMode && assertNotEqual(numberOfDirectives, tNode.directiveEnd - tNode.directiveStart, 'Reached the max number of directives');
    tNode.flags |= 1 /* isDirectiveHost */;
    // When the first directive is created on a node, save the index
    tNode.directiveStart = index;
    tNode.directiveEnd = index + numberOfDirectives;
    tNode.providerIndexes = index;
}
function baseResolveDirective(tView, viewData, def) {
    tView.data.push(def);
    var directiveFactory = def.factory || (def.factory = getFactoryDef(def.type, true));
    var nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
    tView.blueprint.push(nodeInjectorFactory);
    viewData.push(nodeInjectorFactory);
}
//////////////////////////
//// ViewContainer & View
//////////////////////////
// Not sure why I need to do `any` here but TS complains later.
var LContainerArray = ((typeof ngDevMode === 'undefined' || ngDevMode) && /*@__PURE__*/ initNgDevMode()) &&
    /*@__PURE__*/ createNamedArrayType('LContainer');
/**
 * Goes over dynamic embedded views (ones created through ViewContainerRef APIs) and refreshes
 * them by executing an associated template function.
 */
function refreshDynamicEmbeddedViews(lView) {
    var viewOrContainer = lView[CHILD_HEAD];
    while (viewOrContainer !== null) {
        // Note: viewOrContainer can be an LView or an LContainer instance, but here we are only
        // interested in LContainer
        var activeIndexFlag = void 0;
        if (isLContainer(viewOrContainer) &&
            (activeIndexFlag = viewOrContainer[ACTIVE_INDEX]) >> 1 /* SHIFT */ ===
                -1 /* DYNAMIC_EMBEDDED_VIEWS_ONLY */) {
            for (var i = CONTAINER_HEADER_OFFSET; i < viewOrContainer.length; i++) {
                var embeddedLView = viewOrContainer[i];
                var embeddedTView = embeddedLView[TVIEW];
                ngDevMode && assertDefined(embeddedTView, 'TView must be allocated');
                if (viewAttachedToChangeDetector(embeddedLView)) {
                    refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[CONTEXT]);
                }
            }
            if ((activeIndexFlag & 1 /* HAS_TRANSPLANTED_VIEWS */) !== 0) {
                // We should only CD moved views if the component where they were inserted does not match
                // the component where they were declared and insertion is on-push. Moved views also
                // contains intra component moves, or check-always which need to be skipped.
                refreshTransplantedViews(viewOrContainer, lView[DECLARATION_COMPONENT_VIEW]);
            }
        }
        viewOrContainer = viewOrContainer[NEXT];
    }
}
/**
 * Refresh transplanted LViews.
 *
 * See: `ActiveIndexFlag.HAS_TRANSPLANTED_VIEWS` and `LView[DECLARATION_COMPONENT_VIEW]` for
 * explanation of transplanted views.
 *
 * @param lContainer The `LContainer` which has transplanted views.
 * @param declaredComponentLView The `lContainer` parent component `LView`.
 */
function refreshTransplantedViews(lContainer, declaredComponentLView) {
    var movedViews = lContainer[MOVED_VIEWS];
    ngDevMode && assertDefined(movedViews, 'Transplanted View flags set but missing MOVED_VIEWS');
    for (var i = 0; i < movedViews.length; i++) {
        var movedLView = movedViews[i];
        var insertionLContainer = movedLView[PARENT];
        ngDevMode && assertLContainer(insertionLContainer);
        var insertedComponentLView = insertionLContainer[PARENT][DECLARATION_COMPONENT_VIEW];
        ngDevMode && assertDefined(insertedComponentLView, 'Missing LView');
        // Check if we have a transplanted view by compering declaration and insertion location.
        if (insertedComponentLView !== declaredComponentLView) {
            // Yes the `LView` is transplanted.
            // Here we would like to know if the component is `OnPush`. We don't have
            // explicit `OnPush` flag instead we set `CheckAlways` to false (which is `OnPush`)
            // Not to be confused with `ManualOnPush` which is used with wether a DOM event
            // should automatically mark a view as dirty.
            var insertionComponentIsOnPush = (insertedComponentLView[FLAGS] & 16 /* CheckAlways */) === 0;
            if (insertionComponentIsOnPush) {
                // Here we know that the template has been transplanted across components and is
                // on-push (not just moved within a component). If the insertion is marked dirty, then
                // there is no need to CD here as we will do it again later when we get to insertion
                // point.
                var movedTView = movedLView[TVIEW];
                ngDevMode && assertDefined(movedTView, 'TView must be allocated');
                refreshView(movedTView, movedLView, movedTView.template, movedLView[CONTEXT]);
            }
        }
    }
}
/////////////
/**
 * Refreshes components by entering the component view and processing its bindings, queries, etc.
 *
 * @param componentHostIdx  Element index in LView[] (adjusted for HEADER_OFFSET)
 */
function refreshComponent(hostLView, componentHostIdx) {
    ngDevMode && assertEqual(isCreationMode(hostLView), false, 'Should be run in update mode');
    var componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
    // Only attached components that are CheckAlways or OnPush and dirty should be refreshed
    if (viewAttachedToChangeDetector(componentView) &&
        componentView[FLAGS] & (16 /* CheckAlways */ | 64 /* Dirty */)) {
        var componentTView = componentView[TVIEW];
        refreshView(componentTView, componentView, componentTView.template, componentView[CONTEXT]);
    }
}
function renderComponent(hostLView, componentHostIdx) {
    ngDevMode && assertEqual(isCreationMode(hostLView), true, 'Should be run in creation mode');
    var componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
    var componentTView = componentView[TVIEW];
    syncViewWithBlueprint(componentTView, componentView);
    renderView(componentTView, componentView, componentView[CONTEXT]);
}
/**
 * Syncs an LView instance with its blueprint if they have gotten out of sync.
 *
 * Typically, blueprints and their view instances should always be in sync, so the loop here
 * will be skipped. However, consider this case of two components side-by-side:
 *
 * App template:
 * ```
 * <comp></comp>
 * <comp></comp>
 * ```
 *
 * The following will happen:
 * 1. App template begins processing.
 * 2. First <comp> is matched as a component and its LView is created.
 * 3. Second <comp> is matched as a component and its LView is created.
 * 4. App template completes processing, so it's time to check child templates.
 * 5. First <comp> template is checked. It has a directive, so its def is pushed to blueprint.
 * 6. Second <comp> template is checked. Its blueprint has been updated by the first
 * <comp> template, but its LView was created before this update, so it is out of sync.
 *
 * Note that embedded views inside ngFor loops will never be out of sync because these views
 * are processed as soon as they are created.
 *
 * @param tView The `TView` that contains the blueprint for syncing
 * @param lView The view to sync
 */
function syncViewWithBlueprint(tView, lView) {
    for (var i = lView.length; i < tView.blueprint.length; i++) {
        lView.push(tView.blueprint[i]);
    }
}
/**
 * Adds LView or LContainer to the end of the current view tree.
 *
 * This structure will be used to traverse through nested views to remove listeners
 * and call onDestroy callbacks.
 *
 * @param lView The view where LView or LContainer should be added
 * @param adjustedHostIndex Index of the view's host node in LView[], adjusted for header
 * @param lViewOrLContainer The LView or LContainer to add to the view tree
 * @returns The state passed in
 */
function addToViewTree(lView, lViewOrLContainer) {
    // TODO(benlesh/misko): This implementation is incorrect, because it always adds the LContainer
    // to the end of the queue, which means if the developer retrieves the LContainers from RNodes out
    // of order, the change detection will run out of order, as the act of retrieving the the
    // LContainer from the RNode is what adds it to the queue.
    if (lView[CHILD_HEAD]) {
        lView[CHILD_TAIL][NEXT] = lViewOrLContainer;
    }
    else {
        lView[CHILD_HEAD] = lViewOrLContainer;
    }
    lView[CHILD_TAIL] = lViewOrLContainer;
    return lViewOrLContainer;
}
///////////////////////////////
//// Change detection
///////////////////////////////
/**
 * Marks current view and all ancestors dirty.
 *
 * Returns the root view because it is found as a byproduct of marking the view tree
 * dirty, and can be used by methods that consume markViewDirty() to easily schedule
 * change detection. Otherwise, such methods would need to traverse up the view tree
 * an additional time to get the root view and schedule a tick on it.
 *
 * @param lView The starting LView to mark dirty
 * @returns the root LView
 */
function markViewDirty(lView) {
    while (lView) {
        lView[FLAGS] |= 64 /* Dirty */;
        var parent_1 = getLViewParent(lView);
        // Stop traversing up as soon as you find a root view that wasn't attached to any container
        if (isRootView(lView) && !parent_1) {
            return lView;
        }
        // continue otherwise
        lView = parent_1;
    }
    return null;
}
/**
 * Used to schedule change detection on the whole application.
 *
 * Unlike `tick`, `scheduleTick` coalesces multiple calls into one change detection run.
 * It is usually called indirectly by calling `markDirty` when the view needs to be
 * re-rendered.
 *
 * Typically `scheduleTick` uses `requestAnimationFrame` to coalesce multiple
 * `scheduleTick` requests. The scheduling function can be overridden in
 * `renderComponent`'s `scheduler` option.
 */
function scheduleTick(rootContext, flags) {
    var nothingScheduled = rootContext.flags === 0;
    rootContext.flags |= flags;
    if (nothingScheduled && rootContext.clean == _CLEAN_PROMISE) {
        var res_1;
        rootContext.clean = new Promise(function (r) { return res_1 = r; });
        rootContext.scheduler(function () {
            if (rootContext.flags & 1 /* DetectChanges */) {
                rootContext.flags &= ~1 /* DetectChanges */;
                tickRootContext(rootContext);
            }
            if (rootContext.flags & 2 /* FlushPlayers */) {
                rootContext.flags &= ~2 /* FlushPlayers */;
                var playerHandler = rootContext.playerHandler;
                if (playerHandler) {
                    playerHandler.flushPlayers();
                }
            }
            rootContext.clean = _CLEAN_PROMISE;
            res_1(null);
        });
    }
}
function tickRootContext(rootContext) {
    for (var i = 0; i < rootContext.components.length; i++) {
        var rootComponent = rootContext.components[i];
        var lView = readPatchedLView(rootComponent);
        var tView = lView[TVIEW];
        renderComponentOrTemplate(tView, lView, tView.template, rootComponent);
    }
}
function detectChangesInternal(tView, lView, context) {
    var rendererFactory = lView[RENDERER_FACTORY];
    if (rendererFactory.begin)
        rendererFactory.begin();
    try {
        refreshView(tView, lView, tView.template, context);
    }
    catch (error) {
        handleError(lView, error);
        throw error;
    }
    finally {
        if (rendererFactory.end)
            rendererFactory.end();
    }
}
/**
 * Synchronously perform change detection on a root view and its components.
 *
 * @param lView The view which the change detection should be performed on.
 */
function detectChangesInRootView(lView) {
    tickRootContext(lView[CONTEXT]);
}
function checkNoChangesInternal(tView, view, context) {
    setCheckNoChangesMode(true);
    try {
        detectChangesInternal(tView, view, context);
    }
    finally {
        setCheckNoChangesMode(false);
    }
}
/**
 * Checks the change detector on a root view and its components, and throws if any changes are
 * detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 *
 * @param lView The view which the change detection should be checked on.
 */
function checkNoChangesInRootView(lView) {
    setCheckNoChangesMode(true);
    try {
        detectChangesInRootView(lView);
    }
    finally {
        setCheckNoChangesMode(false);
    }
}
function executeViewQueryFn(flags, viewQueryFn, component) {
    ngDevMode && assertDefined(viewQueryFn, 'View queries function to execute must be defined.');
    setCurrentQueryIndex(0);
    viewQueryFn(flags, component);
}
var CLEAN_PROMISE = _CLEAN_PROMISE;
function getLCleanup(view) {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return view[CLEANUP] || (view[CLEANUP] = ngDevMode ? new LCleanup() : []);
}
function getTViewCleanup(tView) {
    return tView.cleanup || (tView.cleanup = ngDevMode ? new TCleanup() : []);
}
/** Handles an error thrown in an LView. */
function handleError(lView, error) {
    var injector = lView[INJECTOR$1];
    var errorHandler = injector ? injector.get(ErrorHandler, null) : null;
    errorHandler && errorHandler.handleError(error);
}
/**
 * Updates a text binding at a given index in a given LView.
 */
function textBindingInternal(lView, index, value) {
    ngDevMode && assertNotSame(value, NO_CHANGE, 'value should not be NO_CHANGE');
    ngDevMode && assertDataInRange(lView, index + HEADER_OFFSET);
    var element = getNativeByIndex(index, lView);
    ngDevMode && assertDefined(element, 'native element should exist');
    ngDevMode && ngDevMode.rendererSetText++;
    var renderer = lView[RENDERER];
    isProceduralRenderer(renderer) ? renderer.setValue(element, value) : element.textContent = value;
}
function getLContainer(tNode, embeddedView) {
    ngDevMode && assertLView(embeddedView);
    var container = embeddedView[PARENT];
    if (tNode.index === -1) {
        // This is a dynamically created view inside a dynamic container.
        // The parent isn't an LContainer if the embedded view hasn't been attached yet.
        return isLContainer(container) ? container : null;
    }
    else {
        ngDevMode && assertLContainer(container);
        // This is a inline view node (e.g. embeddedViewStart)
        return container;
    }
}
/**
 * Retrieves render parent for a given view.
 * Might be null if a view is not yet attached to any container.
 */
function getContainerRenderParent(tViewNode, view) {
    var container = getLContainer(tViewNode, view);
    return container ? nativeParentNode(view[RENDERER], container[NATIVE]) : null;
}
/**
 * NOTE: for performance reasons, the possible actions are inlined within the function instead of
 * being passed as an argument.
 */
function applyToElementOrContainer(action, renderer, parent, lNodeToHandle, beforeNode) {
    // If this slot was allocated for a text node dynamically created by i18n, the text node itself
    // won't be created until i18nApply() in the update block, so this node should be skipped.
    // For more info, see "ICU expressions should work inside an ngTemplateOutlet inside an ngFor"
    // in `i18n_spec.ts`.
    if (lNodeToHandle != null) {
        var lContainer = void 0;
        var isComponent = false;
        // We are expecting an RNode, but in the case of a component or LContainer the `RNode` is
        // wrapped in an array which needs to be unwrapped. We need to know if it is a component and if
        // it has LContainer so that we can process all of those cases appropriately.
        if (isLContainer(lNodeToHandle)) {
            lContainer = lNodeToHandle;
        }
        else if (isLView(lNodeToHandle)) {
            isComponent = true;
            ngDevMode && assertDefined(lNodeToHandle[HOST], 'HOST must be defined for a component LView');
            lNodeToHandle = lNodeToHandle[HOST];
        }
        var rNode = unwrapRNode(lNodeToHandle);
        ngDevMode && !isProceduralRenderer(renderer) && assertDomNode(rNode);
        if (action === 0 /* Create */ && parent !== null) {
            if (beforeNode == null) {
                nativeAppendChild(renderer, parent, rNode);
            }
            else {
                nativeInsertBefore(renderer, parent, rNode, beforeNode || null);
            }
        }
        else if (action === 1 /* Insert */ && parent !== null) {
            nativeInsertBefore(renderer, parent, rNode, beforeNode || null);
        }
        else if (action === 2 /* Detach */) {
            nativeRemoveNode(renderer, rNode, isComponent);
        }
        else if (action === 3 /* Destroy */) {
            ngDevMode && ngDevMode.rendererDestroyNode++;
            renderer.destroyNode(rNode);
        }
        if (lContainer != null) {
            applyContainer(renderer, action, lContainer, parent, beforeNode);
        }
    }
}
function createTextNode(value, renderer) {
    ngDevMode && ngDevMode.rendererCreateTextNode++;
    ngDevMode && ngDevMode.rendererSetText++;
    return isProceduralRenderer(renderer) ? renderer.createText(value) :
        renderer.createTextNode(value);
}
/**
 * Detach a `LView` from the DOM by detaching its nodes.
 *
 * @param tView The `TView' of the `LView` to be detached
 * @param lView the `LView` to be detached.
 */
function renderDetachView(tView, lView) {
    applyView(tView, lView, lView[RENDERER], 2 /* Detach */, null, null);
}
/**
 * Traverses down and up the tree of views and containers to remove listeners and
 * call onDestroy callbacks.
 *
 * Notes:
 *  - Because it's used for onDestroy calls, it needs to be bottom-up.
 *  - Must process containers instead of their views to avoid splicing
 *  when views are destroyed and re-added.
 *  - Using a while loop because it's faster than recursion
 *  - Destroy only called on movement to sibling or movement to parent (laterally or up)
 *
 *  @param rootView The view to destroy
 */
function destroyViewTree(rootView) {
    // If the view has no children, we can clean it up and return early.
    var lViewOrLContainer = rootView[CHILD_HEAD];
    if (!lViewOrLContainer) {
        return cleanUpView(rootView[TVIEW], rootView);
    }
    while (lViewOrLContainer) {
        var next = null;
        if (isLView(lViewOrLContainer)) {
            // If LView, traverse down to child.
            next = lViewOrLContainer[CHILD_HEAD];
        }
        else {
            ngDevMode && assertLContainer(lViewOrLContainer);
            // If container, traverse down to its first LView.
            var firstView = lViewOrLContainer[CONTAINER_HEADER_OFFSET];
            if (firstView)
                next = firstView;
        }
        if (!next) {
            // Only clean up view when moving to the side or up, as destroy hooks
            // should be called in order from the bottom up.
            while (lViewOrLContainer && !lViewOrLContainer[NEXT] && lViewOrLContainer !== rootView) {
                isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
                lViewOrLContainer = getParentState(lViewOrLContainer, rootView);
            }
            if (lViewOrLContainer === null)
                lViewOrLContainer = rootView;
            isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
            next = lViewOrLContainer && lViewOrLContainer[NEXT];
        }
        lViewOrLContainer = next;
    }
}
function detachMovedView(declarationContainer, lView) {
    ngDevMode && assertLContainer(declarationContainer);
    ngDevMode && assertDefined(declarationContainer[MOVED_VIEWS], 'A projected view should belong to a non-empty projected views collection');
    var movedViews = declarationContainer[MOVED_VIEWS];
    var declaredViewIndex = movedViews.indexOf(lView);
    movedViews.splice(declaredViewIndex, 1);
}
/**
 * A standalone function which destroys an LView,
 * conducting clean up (e.g. removing listeners, calling onDestroys).
 *
 * @param tView The `TView' of the `LView` to be destroyed
 * @param lView The view to be destroyed.
 */
function destroyLView(tView, lView) {
    if (!(lView[FLAGS] & 256 /* Destroyed */)) {
        var renderer = lView[RENDERER];
        if (isProceduralRenderer(renderer) && renderer.destroyNode) {
            applyView(tView, lView, renderer, 3 /* Destroy */, null, null);
        }
        destroyViewTree(lView);
    }
}
/**
 * Determines which LViewOrLContainer to jump to when traversing back up the
 * tree in destroyViewTree.
 *
 * Normally, the view's parent LView should be checked, but in the case of
 * embedded views, the container (which is the view node's parent, but not the
 * LView's parent) needs to be checked for a possible next property.
 *
 * @param lViewOrLContainer The LViewOrLContainer for which we need a parent state
 * @param rootView The rootView, so we don't propagate too far up the view tree
 * @returns The correct parent LViewOrLContainer
 */
function getParentState(lViewOrLContainer, rootView) {
    var tNode;
    if (isLView(lViewOrLContainer) && (tNode = lViewOrLContainer[T_HOST]) &&
        tNode.type === 2 /* View */) {
        // if it's an embedded view, the state needs to go up to the container, in case the
        // container has a next
        return getLContainer(tNode, lViewOrLContainer);
    }
    else {
        // otherwise, use parent view for containers or component views
        return lViewOrLContainer[PARENT] === rootView ? null : lViewOrLContainer[PARENT];
    }
}
/**
 * Calls onDestroys hooks for all directives and pipes in a given view and then removes all
 * listeners. Listeners are removed as the last step so events delivered in the onDestroys hooks
 * can be propagated to @Output listeners.
 *
 * @param tView `TView` for the `LView` to clean up.
 * @param lView The LView to clean up
 */
function cleanUpView(tView, lView) {
    if (!(lView[FLAGS] & 256 /* Destroyed */)) {
        // Usually the Attached flag is removed when the view is detached from its parent, however
        // if it's a root view, the flag won't be unset hence why we're also removing on destroy.
        lView[FLAGS] &= ~128 /* Attached */;
        // Mark the LView as destroyed *before* executing the onDestroy hooks. An onDestroy hook
        // runs arbitrary user code, which could include its own `viewRef.destroy()` (or similar). If
        // We don't flag the view as destroyed before the hooks, this could lead to an infinite loop.
        // This also aligns with the ViewEngine behavior. It also means that the onDestroy hook is
        // really more of an "afterDestroy" hook if you think about it.
        lView[FLAGS] |= 256 /* Destroyed */;
        executeOnDestroys(tView, lView);
        removeListeners(tView, lView);
        var hostTNode = lView[T_HOST];
        // For component views only, the local renderer is destroyed as clean up time.
        if (hostTNode && hostTNode.type === 3 /* Element */ &&
            isProceduralRenderer(lView[RENDERER])) {
            ngDevMode && ngDevMode.rendererDestroy++;
            lView[RENDERER].destroy();
        }
        var declarationContainer = lView[DECLARATION_LCONTAINER];
        // we are dealing with an embedded view that is still inserted into a container
        if (declarationContainer !== null && isLContainer(lView[PARENT])) {
            // and this is a projected view
            if (declarationContainer !== lView[PARENT]) {
                detachMovedView(declarationContainer, lView);
            }
            // For embedded views still attached to a container: remove query result from this view.
            var lQueries = lView[QUERIES];
            if (lQueries !== null) {
                lQueries.detachView(tView);
            }
        }
    }
}
/** Removes listeners and unsubscribes from output subscriptions */
function removeListeners(tView, lView) {
    var tCleanup = tView.cleanup;
    if (tCleanup !== null) {
        var lCleanup = lView[CLEANUP];
        for (var i = 0; i < tCleanup.length - 1; i += 2) {
            if (typeof tCleanup[i] === 'string') {
                // This is a native DOM listener
                var idxOrTargetGetter = tCleanup[i + 1];
                var target = typeof idxOrTargetGetter === 'function' ?
                    idxOrTargetGetter(lView) :
                    unwrapRNode(lView[idxOrTargetGetter]);
                var listener = lCleanup[tCleanup[i + 2]];
                var useCaptureOrSubIdx = tCleanup[i + 3];
                if (typeof useCaptureOrSubIdx === 'boolean') {
                    // native DOM listener registered with Renderer3
                    target.removeEventListener(tCleanup[i], listener, useCaptureOrSubIdx);
                }
                else {
                    if (useCaptureOrSubIdx >= 0) {
                        // unregister
                        lCleanup[useCaptureOrSubIdx]();
                    }
                    else {
                        // Subscription
                        lCleanup[-useCaptureOrSubIdx].unsubscribe();
                    }
                }
                i += 2;
            }
            else {
                // This is a cleanup function that is grouped with the index of its context
                var context = lCleanup[tCleanup[i + 1]];
                tCleanup[i].call(context);
            }
        }
        lView[CLEANUP] = null;
    }
}
/** Calls onDestroy hooks for this view */
function executeOnDestroys(tView, lView) {
    var destroyHooks;
    if (tView != null && (destroyHooks = tView.destroyHooks) != null) {
        for (var i = 0; i < destroyHooks.length; i += 2) {
            var context = lView[destroyHooks[i]];
            // Only call the destroy hook if the context has been requested.
            if (!(context instanceof NodeInjectorFactory)) {
                destroyHooks[i + 1].call(context);
            }
        }
    }
}
/**
 * Returns a native element if a node can be inserted into the given parent.
 *
 * There are two reasons why we may not be able to insert a element immediately.
 * - Projection: When creating a child content element of a component, we have to skip the
 *   insertion because the content of a component will be projected.
 *   `<component><content>delayed due to projection</content></component>`
 * - Parent container is disconnected: This can happen when we are inserting a view into
 *   parent container, which itself is disconnected. For example the parent container is part
 *   of a View which has not be inserted or is made for projection but has not been inserted
 *   into destination.
 */
function getRenderParent(tView, tNode, currentView) {
    // Skip over element and ICU containers as those are represented by a comment node and
    // can't be used as a render parent.
    var parentTNode = tNode.parent;
    while (parentTNode != null && (parentTNode.type === 4 /* ElementContainer */ ||
        parentTNode.type === 5 /* IcuContainer */)) {
        tNode = parentTNode;
        parentTNode = tNode.parent;
    }
    // If the parent tNode is null, then we are inserting across views: either into an embedded view
    // or a component view.
    if (parentTNode == null) {
        var hostTNode = currentView[T_HOST];
        if (hostTNode.type === 2 /* View */) {
            // We are inserting a root element of an embedded view We might delay insertion of children
            // for a given view if it is disconnected. This might happen for 2 main reasons:
            // - view is not inserted into any container(view was created but not inserted yet)
            // - view is inserted into a container but the container itself is not inserted into the DOM
            // (container might be part of projection or child of a view that is not inserted yet).
            // In other words we can insert children of a given view if this view was inserted into a
            // container and the container itself has its render parent determined.
            return getContainerRenderParent(hostTNode, currentView);
        }
        else {
            // We are inserting a root element of the component view into the component host element and
            // it should always be eager.
            ngDevMode && assertNodeOfPossibleTypes(hostTNode, 3 /* Element */);
            return currentView[HOST];
        }
    }
    else {
        var isIcuCase = tNode && tNode.type === 5;
        // If the parent of this node is an ICU container, then it is represented by comment node and we
        // need to use it as an anchor. If it is projected then it's direct parent node is the renderer.
        if (isIcuCase && tNode.flags & 4 /* isProjected */) {
            return getNativeByTNode(tNode, currentView).parentNode;
        }
        ngDevMode && assertNodeType(parentTNode, 3 /* Element */);
        if (parentTNode.flags & 2 /* isComponentHost */) {
            var tData = tView.data;
            var tNode_1 = tData[parentTNode.index];
            var encapsulation = tData[tNode_1.directiveStart].encapsulation;
            // We've got a parent which is an element in the current view. We just need to verify if the
            // parent element is not a component. Component's content nodes are not inserted immediately
            // because they will be projected, and so doing insert at this point would be wasteful.
            // Since the projection would then move it to its final destination. Note that we can't
            // make this assumption when using the Shadow DOM, because the native projection placeholders
            // (<content> or <slot>) have to be in place as elements are being inserted.
            if (encapsulation !== ViewEncapsulation$1.ShadowDom &&
                encapsulation !== ViewEncapsulation$1.Native) {
                return null;
            }
        }
        return getNativeByTNode(parentTNode, currentView);
    }
}
/**
 * Inserts a native node before another native node for a given parent using {@link Renderer3}.
 * This is a utility function that can be used when native nodes were determined - it abstracts an
 * actual renderer being used.
 */
function nativeInsertBefore(renderer, parent, child, beforeNode) {
    ngDevMode && ngDevMode.rendererInsertBefore++;
    if (isProceduralRenderer(renderer)) {
        renderer.insertBefore(parent, child, beforeNode);
    }
    else {
        parent.insertBefore(child, beforeNode, true);
    }
}
function nativeAppendChild(renderer, parent, child) {
    ngDevMode && ngDevMode.rendererAppendChild++;
    ngDevMode && assertDefined(parent, 'parent node must be defined');
    if (isProceduralRenderer(renderer)) {
        renderer.appendChild(parent, child);
    }
    else {
        parent.appendChild(child);
    }
}
function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode) {
    if (beforeNode !== null) {
        nativeInsertBefore(renderer, parent, child, beforeNode);
    }
    else {
        nativeAppendChild(renderer, parent, child);
    }
}
/** Removes a node from the DOM given its native parent. */
function nativeRemoveChild(renderer, parent, child, isHostElement) {
    if (isProceduralRenderer(renderer)) {
        renderer.removeChild(parent, child, isHostElement);
    }
    else {
        parent.removeChild(child);
    }
}
/**
 * Returns a native parent of a given native node.
 */
function nativeParentNode(renderer, node) {
    return (isProceduralRenderer(renderer) ? renderer.parentNode(node) : node.parentNode);
}
/**
 * Finds a native "anchor" node for cases where we can't append a native child directly
 * (`appendChild`) and need to use a reference (anchor) node for the `insertBefore` operation.
 * @param parentTNode
 * @param lView
 */
function getNativeAnchorNode(parentTNode, lView) {
    if (parentTNode.type === 2 /* View */) {
        var lContainer = getLContainer(parentTNode, lView);
        if (lContainer === null)
            return null;
        var index = lContainer.indexOf(lView, CONTAINER_HEADER_OFFSET) - CONTAINER_HEADER_OFFSET;
        return getBeforeNodeForView(index, lContainer);
    }
    else if (parentTNode.type === 4 /* ElementContainer */ ||
        parentTNode.type === 5 /* IcuContainer */) {
        return getNativeByTNode(parentTNode, lView);
    }
    return null;
}
/**
 * Appends the `child` native node (or a collection of nodes) to the `parent`.
 *
 * The element insertion might be delayed {@link canInsertNativeNode}.
 *
 * @param tView The `TView' to be appended
 * @param lView The current LView
 * @param childEl The native child (or children) that should be appended
 * @param childTNode The TNode of the child element
 * @returns Whether or not the child was appended
 */
function appendChild(tView, lView, childEl, childTNode) {
    var renderParent = getRenderParent(tView, childTNode, lView);
    if (renderParent != null) {
        var renderer = lView[RENDERER];
        var parentTNode = childTNode.parent || lView[T_HOST];
        var anchorNode = getNativeAnchorNode(parentTNode, lView);
        if (Array.isArray(childEl)) {
            for (var i = 0; i < childEl.length; i++) {
                nativeAppendOrInsertBefore(renderer, renderParent, childEl[i], anchorNode);
            }
        }
        else {
            nativeAppendOrInsertBefore(renderer, renderParent, childEl, anchorNode);
        }
    }
}
/**
 * Returns the first native node for a given LView, starting from the provided TNode.
 *
 * Native nodes are returned in the order in which those appear in the native tree (DOM).
 */
function getFirstNativeNode(lView, tNode) {
    if (tNode !== null) {
        ngDevMode && assertNodeOfPossibleTypes(tNode, 3 /* Element */, 0 /* Container */, 4 /* ElementContainer */, 5 /* IcuContainer */, 1 /* Projection */);
        var tNodeType = tNode.type;
        if (tNodeType === 3 /* Element */) {
            return getNativeByTNode(tNode, lView);
        }
        else if (tNodeType === 0 /* Container */) {
            return getBeforeNodeForView(-1, lView[tNode.index]);
        }
        else if (tNodeType === 4 /* ElementContainer */ || tNodeType === 5 /* IcuContainer */) {
            var elIcuContainerChild = tNode.child;
            if (elIcuContainerChild !== null) {
                return getFirstNativeNode(lView, elIcuContainerChild);
            }
            else {
                var rNodeOrLContainer = lView[tNode.index];
                if (isLContainer(rNodeOrLContainer)) {
                    return getBeforeNodeForView(-1, rNodeOrLContainer);
                }
                else {
                    return unwrapRNode(rNodeOrLContainer);
                }
            }
        }
        else {
            var componentView = lView[DECLARATION_COMPONENT_VIEW];
            var componentHost = componentView[T_HOST];
            var parentView = getLViewParent(componentView);
            var firstProjectedTNode = componentHost.projection[tNode.projection];
            if (firstProjectedTNode != null) {
                return getFirstNativeNode(parentView, firstProjectedTNode);
            }
            else {
                return getFirstNativeNode(lView, tNode.next);
            }
        }
    }
    return null;
}
function getBeforeNodeForView(viewIndexInContainer, lContainer) {
    var nextViewIndex = CONTAINER_HEADER_OFFSET + viewIndexInContainer + 1;
    if (nextViewIndex < lContainer.length) {
        var lView = lContainer[nextViewIndex];
        var firstTNodeOfView = lView[TVIEW].firstChild;
        if (firstTNodeOfView !== null) {
            return getFirstNativeNode(lView, firstTNodeOfView);
        }
    }
    return lContainer[NATIVE];
}
/**
 * Removes a native node itself using a given renderer. To remove the node we are looking up its
 * parent from the native tree as not all platforms / browsers support the equivalent of
 * node.remove().
 *
 * @param renderer A renderer to be used
 * @param rNode The native node that should be removed
 * @param isHostElement A flag indicating if a node to be removed is a host of a component.
 */
function nativeRemoveNode(renderer, rNode, isHostElement) {
    var nativeParent = nativeParentNode(renderer, rNode);
    if (nativeParent) {
        nativeRemoveChild(renderer, nativeParent, rNode, isHostElement);
    }
}
/**
 * Performs the operation of `action` on the node. Typically this involves inserting or removing
 * nodes on the LView or projection boundary.
 */
function applyNodes(renderer, action, tNode, lView, renderParent, beforeNode, isProjection) {
    while (tNode != null) {
        ngDevMode && assertTNodeForLView(tNode, lView);
        ngDevMode && assertNodeOfPossibleTypes(tNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */, 1 /* Projection */, 1 /* Projection */, 5 /* IcuContainer */);
        var rawSlotValue = lView[tNode.index];
        var tNodeType = tNode.type;
        if (isProjection) {
            if (action === 0 /* Create */) {
                rawSlotValue && attachPatchData(unwrapRNode(rawSlotValue), lView);
                tNode.flags |= 4 /* isProjected */;
            }
        }
        if ((tNode.flags & 64 /* isDetached */) !== 64 /* isDetached */) {
            if (tNodeType === 4 /* ElementContainer */ || tNodeType === 5 /* IcuContainer */) {
                applyNodes(renderer, action, tNode.child, lView, renderParent, beforeNode, false);
                applyToElementOrContainer(action, renderer, renderParent, rawSlotValue, beforeNode);
            }
            else if (tNodeType === 1 /* Projection */) {
                applyProjectionRecursive(renderer, action, lView, tNode, renderParent, beforeNode);
            }
            else {
                ngDevMode && assertNodeOfPossibleTypes(tNode, 3 /* Element */, 0 /* Container */);
                applyToElementOrContainer(action, renderer, renderParent, rawSlotValue, beforeNode);
            }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
    }
}
/**
 * `applyView` performs operation on the view as specified in `action` (insert, detach, destroy)
 *
 * Inserting a view without projection or containers at top level is simple. Just iterate over the
 * root nodes of the View, and for each node perform the `action`.
 *
 * Things get more complicated with containers and projections. That is because coming across:
 * - Container: implies that we have to insert/remove/destroy the views of that container as well
 *              which in turn can have their own Containers at the View roots.
 * - Projection: implies that we have to insert/remove/destroy the nodes of the projection. The
 *               complication is that the nodes we are projecting can themselves have Containers
 *               or other Projections.
 *
 * As you can see this is a very recursive problem. Yes recursion is not most efficient but the
 * code is complicated enough that trying to implemented with recursion becomes unmaintainable.
 *
 * @param tView The `TView' which needs to be inserted, detached, destroyed
 * @param lView The LView which needs to be inserted, detached, destroyed.
 * @param renderer Renderer to use
 * @param action action to perform (insert, detach, destroy)
 * @param renderParent parent DOM element for insertion/removal.
 * @param beforeNode Before which node the insertions should happen.
 */
function applyView(tView, lView, renderer, action, renderParent, beforeNode) {
    ngDevMode && assertNodeType(tView.node, 2 /* View */);
    var viewRootTNode = tView.node.child;
    applyNodes(renderer, action, viewRootTNode, lView, renderParent, beforeNode, false);
}
/**
 * `applyProjectionRecursive` performs operation on the projection specified by `action` (insert,
 * detach, destroy)
 *
 * Inserting a projection requires us to locate the projected nodes from the parent component. The
 * complication is that those nodes themselves could be re-projected from their parent component.
 *
 * @param renderer Render to use
 * @param action action to perform (insert, detach, destroy)
 * @param lView The LView which needs to be inserted, detached, destroyed.
 * @param tProjectionNode node to project
 * @param renderParent parent DOM element for insertion/removal.
 * @param beforeNode Before which node the insertions should happen.
 */
function applyProjectionRecursive(renderer, action, lView, tProjectionNode, renderParent, beforeNode) {
    var componentLView = lView[DECLARATION_COMPONENT_VIEW];
    var componentNode = componentLView[T_HOST];
    ngDevMode &&
        assertEqual(typeof tProjectionNode.projection, 'number', 'expecting projection index');
    var nodeToProjectOrRNodes = componentNode.projection[tProjectionNode.projection];
    if (Array.isArray(nodeToProjectOrRNodes)) {
        // This should not exist, it is a bit of a hack. When we bootstrap a top level node and we
        // need to support passing projectable nodes, so we cheat and put them in the TNode
        // of the Host TView. (Yes we put instance info at the T Level). We can get away with it
        // because we know that that TView is not shared and therefore it will not be a problem.
        // This should be refactored and cleaned up.
        for (var i = 0; i < nodeToProjectOrRNodes.length; i++) {
            var rNode = nodeToProjectOrRNodes[i];
            applyToElementOrContainer(action, renderer, renderParent, rNode, beforeNode);
        }
    }
    else {
        var nodeToProject = nodeToProjectOrRNodes;
        var projectedComponentLView = componentLView[PARENT];
        applyNodes(renderer, action, nodeToProject, projectedComponentLView, renderParent, beforeNode, true);
    }
}
/**
 * `applyContainer` performs an operation on the container and its views as specified by
 * `action` (insert, detach, destroy)
 *
 * Inserting a Container is complicated by the fact that the container may have Views which
 * themselves have containers or projections.
 *
 * @param renderer Renderer to use
 * @param action action to perform (insert, detach, destroy)
 * @param lContainer The LContainer which needs to be inserted, detached, destroyed.
 * @param renderParent parent DOM element for insertion/removal.
 * @param beforeNode Before which node the insertions should happen.
 */
function applyContainer(renderer, action, lContainer, renderParent, beforeNode) {
    ngDevMode && assertLContainer(lContainer);
    var anchor = lContainer[NATIVE]; // LContainer has its own before node.
    var native = unwrapRNode(lContainer);
    // An LContainer can be created dynamically on any node by injecting ViewContainerRef.
    // Asking for a ViewContainerRef on an element will result in a creation of a separate anchor node
    // (comment in the DOM) that will be different from the LContainer's host node. In this particular
    // case we need to execute action on 2 nodes:
    // - container's host node (this is done in the executeActionOnElementOrContainer)
    // - container's host node (this is done here)
    if (anchor !== native) {
        // This is very strange to me (Misko). I would expect that the native is same as anchor. I don't
        // see a reason why they should be different, but they are.
        //
        // If they are we need to process the second anchor as well.
        applyToElementOrContainer(action, renderer, renderParent, anchor, beforeNode);
    }
    for (var i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        var lView = lContainer[i];
        applyView(lView[TVIEW], lView, renderer, action, renderParent, anchor);
    }
}
/**
 * Write `cssText` to `RElement`.
 *
 * This function does direct write without any reconciliation. Used for writing initial values, so
 * that static styling values do not pull in the style parser.
 *
 * @param renderer Renderer to use
 * @param element The element which needs to be updated.
 * @param newValue The new class list to write.
 */
function writeDirectStyle(renderer, element, newValue) {
    ngDevMode && assertString(newValue, '\'newValue\' should be a string');
    if (isProceduralRenderer(renderer)) {
        renderer.setAttribute(element, 'style', newValue);
    }
    else {
        element.style.cssText = newValue;
    }
    ngDevMode && ngDevMode.rendererSetStyle++;
}
/**
 * Write `className` to `RElement`.
 *
 * This function does direct write without any reconciliation. Used for writing initial values, so
 * that static styling values do not pull in the style parser.
 *
 * @param renderer Renderer to use
 * @param element The element which needs to be updated.
 * @param newValue The new class list to write.
 */
function writeDirectClass(renderer, element, newValue) {
    ngDevMode && assertString(newValue, '\'newValue\' should be a string');
    if (isProceduralRenderer(renderer)) {
        if (newValue === '') {
            // There are tests in `google3` which expect `element.getAttribute('class')` to be `null`.
            renderer.removeAttribute(element, 'class');
        }
        else {
            renderer.setAttribute(element, 'class', newValue);
        }
    }
    else {
        element.className = newValue;
    }
    ngDevMode && ngDevMode.rendererSetClassName++;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ViewRef = /** @class */ /*@__PURE__*/ (function () {
    function ViewRef(
    /**
     * This represents `LView` associated with the component when ViewRef is a ChangeDetectorRef.
     *
     * When ViewRef is created for a dynamic component, this also represents the `LView` for the
     * component.
     *
     * For a "regular" ViewRef created for an embedded view, this is the `LView` for the embedded
     * view.
     *
     * @internal
     */
    _lView, 
    /**
     * This represents the `LView` associated with the point where `ChangeDetectorRef` was
     * requested.
     *
     * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
     */
    _cdRefInjectingView) {
        this._lView = _lView;
        this._cdRefInjectingView = _cdRefInjectingView;
        this._appRef = null;
        this._viewContainerRef = null;
        /**
         * @internal
         */
        this._tViewNode = null;
    }
    Object.defineProperty(ViewRef.prototype, "rootNodes", {
        get: function () {
            var lView = this._lView;
            if (lView[HOST] == null) {
                var hostTView = lView[T_HOST];
                return collectNativeNodes(lView[TVIEW], lView, hostTView.child, []);
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef.prototype, "context", {
        get: function () { return this._lView[CONTEXT]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef.prototype, "destroyed", {
        get: function () {
            return (this._lView[FLAGS] & 256 /* Destroyed */) === 256 /* Destroyed */;
        },
        enumerable: true,
        configurable: true
    });
    ViewRef.prototype.destroy = function () {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            var index = this._viewContainerRef.indexOf(this);
            if (index > -1) {
                this._viewContainerRef.detach(index);
            }
            this._viewContainerRef = null;
        }
        destroyLView(this._lView[TVIEW], this._lView);
    };
    ViewRef.prototype.onDestroy = function (callback) { storeCleanupFn(this._lView[TVIEW], this._lView, callback); };
    /**
     * Marks a view and all of its ancestors dirty.
     *
     * It also triggers change detection by calling `scheduleTick` internally, which coalesces
     * multiple `markForCheck` calls to into one change detection run.
     *
     * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush OnPush} component is
     * checked when it needs to be re-rendered but the two normal triggers haven't marked it
     * dirty (i.e. inputs haven't changed and events haven't fired in the view).
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Component({
     *   selector: 'my-app',
     *   template: `Number of ticks: {{numberOfTicks}}`
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     * })
     * class AppComponent {
     *   numberOfTicks = 0;
     *
     *   constructor(private ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks++;
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     * ```
     */
    ViewRef.prototype.markForCheck = function () { markViewDirty(this._cdRefInjectingView || this._lView); };
    /**
     * Detaches the view from the change detection tree.
     *
     * Detached views will not be checked during change detection runs until they are
     * re-attached, even if they are dirty. `detach` can be used in combination with
     * {@link ChangeDetectorRef#detectChanges detectChanges} to implement local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     */
    ViewRef.prototype.detach = function () { this._lView[FLAGS] &= ~128 /* Attached */; };
    /**
     * Re-attaches a view to the change detection tree.
     *
     * This can be used to re-attach views that were previously detached from the tree
     * using {@link ChangeDetectorRef#detach detach}. Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
     *
     *   set live(value) {
     *     if (value) {
     *       this.ref.reattach();
     *     } else {
     *       this.ref.detach();
     *     }
     *   }
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class AppComponent {
     *   live = true;
     * }
     * ```
     */
    ViewRef.prototype.reattach = function () { this._lView[FLAGS] |= 128 /* Attached */; };
    /**
     * Checks the view and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach detach} to implement
     * local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check every five seconds.
     *
     * See {@link ChangeDetectorRef#detach detach} for more information.
     */
    ViewRef.prototype.detectChanges = function () { detectChangesInternal(this._lView[TVIEW], this._lView, this.context); };
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't
     * introduce other changes.
     */
    ViewRef.prototype.checkNoChanges = function () { checkNoChangesInternal(this._lView[TVIEW], this._lView, this.context); };
    ViewRef.prototype.attachToViewContainerRef = function (vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    };
    ViewRef.prototype.detachFromAppRef = function () {
        this._appRef = null;
        renderDetachView(this._lView[TVIEW], this._lView);
    };
    ViewRef.prototype.attachToAppRef = function (appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    };
    return ViewRef;
}());
/** @internal */
var RootViewRef = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(RootViewRef, _super);
    function RootViewRef(_view) {
        var _this = _super.call(this, _view) || this;
        _this._view = _view;
        return _this;
    }
    RootViewRef.prototype.detectChanges = function () { detectChangesInRootView(this._view); };
    RootViewRef.prototype.checkNoChanges = function () { checkNoChangesInRootView(this._view); };
    Object.defineProperty(RootViewRef.prototype, "context", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return RootViewRef;
}(ViewRef));
function collectNativeNodes(tView, lView, tNode, result, isProjection) {
    if (isProjection === void 0) {
        isProjection = false;
    }
    while (tNode !== null) {
        ngDevMode && assertNodeOfPossibleTypes(tNode, 3 /* Element */, 0 /* Container */, 1 /* Projection */, 4 /* ElementContainer */, 5 /* IcuContainer */);
        var lNode = lView[tNode.index];
        if (lNode !== null) {
            result.push(unwrapRNode(lNode));
        }
        // A given lNode can represent either a native node or a LContainer (when it is a host of a
        // ViewContainerRef). When we find a LContainer we need to descend into it to collect root nodes
        // from the views in this container.
        if (isLContainer(lNode)) {
            for (var i = CONTAINER_HEADER_OFFSET; i < lNode.length; i++) {
                var lViewInAContainer = lNode[i];
                var lViewFirstChildTNode = lViewInAContainer[TVIEW].firstChild;
                if (lViewFirstChildTNode !== null) {
                    collectNativeNodes(lViewInAContainer[TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
                }
            }
        }
        var tNodeType = tNode.type;
        if (tNodeType === 4 /* ElementContainer */ || tNodeType === 5 /* IcuContainer */) {
            collectNativeNodes(tView, lView, tNode.child, result);
        }
        else if (tNodeType === 1 /* Projection */) {
            var componentView = lView[DECLARATION_COMPONENT_VIEW];
            var componentHost = componentView[T_HOST];
            var parentView = getLViewParent(componentView);
            var firstProjectedNode = componentHost.projection[tNode.projection];
            if (firstProjectedNode !== null && parentView !== null) {
                collectNativeNodes(parentView[TVIEW], parentView, firstProjectedNode, result, true);
            }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
    }
    return result;
}
var R3ElementRef;
/**
 * Creates an ElementRef given a node.
 *
 * @param ElementRefToken The ElementRef type
 * @param tNode The node for which you'd like an ElementRef
 * @param view The view to which the node belongs
 * @returns The ElementRef instance to use
 */
function createElementRef(ElementRefToken, tNode, view) {
    if (!R3ElementRef) {
        R3ElementRef = /** @class */ (function (_super) {
            __extends(ElementRef, _super);
            function ElementRef() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ElementRef;
        }(ElementRefToken));
    }
    return new R3ElementRef(getNativeByTNode(tNode, view));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Base class for Angular Views, provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be rerendered.
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](http://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="reattach"></code-example>
 *
 * @publicApi
 */
var ChangeDetectorRef = /** @class */ /*@__PURE__*/ (function () {
    function ChangeDetectorRef() {
    }
    /**
     * @internal
     * @nocollapse
     */
    ChangeDetectorRef.__NG_ELEMENT_ID__ = function () { return SWITCH_CHANGE_DETECTOR_REF_FACTORY(); };
    return ChangeDetectorRef;
}());
var SWITCH_CHANGE_DETECTOR_REF_FACTORY__PRE_R3__ = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};
var SWITCH_CHANGE_DETECTOR_REF_FACTORY = SWITCH_CHANGE_DETECTOR_REF_FACTORY__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
var Type = Function;
function isType(v) {
    return typeof v === 'function';
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Attention: These regex has to hold even if the code is minified!
 */
var DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;
var INHERITED_CLASS = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/;
var INHERITED_CLASS_WITH_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/;
var INHERITED_CLASS_WITH_DELEGATE_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{\s+super\(\.\.\.arguments\)/;
/**
 * Determine whether a stringified type is a class which delegates its constructor
 * to its parent.
 *
 * This is not trivial since compiled code can actually contain a constructor function
 * even if the original source code did not. For instance, when the child class contains
 * an initialized instance property.
 */
function isDelegateCtor(typeStr) {
    return DELEGATE_CTOR.test(typeStr) || INHERITED_CLASS_WITH_DELEGATE_CTOR.test(typeStr) ||
        (INHERITED_CLASS.test(typeStr) && !INHERITED_CLASS_WITH_CTOR.test(typeStr));
}
var ReflectionCapabilities = /** @class */ /*@__PURE__*/ (function () {
    function ReflectionCapabilities(reflect) {
        this._reflect = reflect || _global['Reflect'];
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    ReflectionCapabilities.prototype.factory = function (t) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (t.bind.apply(t, __spread([void 0], args)))();
        };
    };
    /** @internal */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
        var result;
        if (typeof paramTypes === 'undefined') {
            result = newArray(paramAnnotations.length);
        }
        else {
            result = newArray(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] && paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (paramAnnotations && paramAnnotations[i] != null) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    ReflectionCapabilities.prototype._ownParameters = function (type, parentCtor) {
        var typeStr = type.toString();
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (isDelegateCtor(typeStr)) {
            return null;
        }
        // Prefer the direct API.
        if (type.parameters && type.parameters !== parentCtor.parameters) {
            return type.parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        var tsickleCtorParams = type.ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            var ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            var paramTypes_1 = ctorParameters.map(function (ctorParam) { return ctorParam && ctorParam.type; });
            var paramAnnotations_1 = ctorParameters.map(function (ctorParam) {
                return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
            });
            return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
        }
        // API for metadata created by invoking the decorators.
        var paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS];
        var paramTypes = this._reflect && this._reflect.getOwnMetadata &&
            this._reflect.getOwnMetadata('design:paramtypes', type);
        if (paramTypes || paramAnnotations) {
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return newArray(type.length);
    };
    ReflectionCapabilities.prototype.parameters = function (type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        var parentCtor = getParentCtor(type);
        var parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    };
    ReflectionCapabilities.prototype._ownAnnotations = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
            var annotations = typeOrFunc.annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators) {
            return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
        }
        // API for metadata created by invoking the decorators.
        if (typeOrFunc.hasOwnProperty(ANNOTATIONS)) {
            return typeOrFunc[ANNOTATIONS];
        }
        return null;
    };
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return [];
        }
        var parentCtor = getParentCtor(typeOrFunc);
        var ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        var parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    };
    ReflectionCapabilities.prototype._ownPropMetadata = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (typeOrFunc.propMetadata &&
            typeOrFunc.propMetadata !== parentCtor.propMetadata) {
            var propMetadata = typeOrFunc.propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (typeOrFunc.propDecorators &&
            typeOrFunc.propDecorators !== parentCtor.propDecorators) {
            var propDecorators_1 = typeOrFunc.propDecorators;
            var propMetadata_1 = {};
            Object.keys(propDecorators_1).forEach(function (prop) {
                propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
            });
            return propMetadata_1;
        }
        // API for metadata created by invoking the decorators.
        if (typeOrFunc.hasOwnProperty(PROP_METADATA)) {
            return typeOrFunc[PROP_METADATA];
        }
        return null;
    };
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        var parentCtor = getParentCtor(typeOrFunc);
        var propMetadata = {};
        if (parentCtor !== Object) {
            var parentPropMetadata_1 = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata_1).forEach(function (propName) {
                propMetadata[propName] = parentPropMetadata_1[propName];
            });
        }
        var ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach(function (propName) {
                var decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push.apply(decorators, __spread(propMetadata[propName]));
                }
                decorators.push.apply(decorators, __spread(ownPropMetadata[propName]));
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    };
    ReflectionCapabilities.prototype.ownPropMetadata = function (typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        return this._ownPropMetadata(typeOrFunc, getParentCtor(typeOrFunc)) || {};
    };
    ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcProperty) {
        return type instanceof Type && lcProperty in type.prototype;
    };
    ReflectionCapabilities.prototype.guards = function (type) { return {}; };
    ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
    ReflectionCapabilities.prototype.setter = function (name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function (name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
    };
    // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
    ReflectionCapabilities.prototype.importUri = function (type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return "./" + stringify(type);
    };
    ReflectionCapabilities.prototype.resourceUri = function (type) { return "./" + stringify(type); };
    ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, members, runtime) {
        return runtime;
    };
    ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
    return ReflectionCapabilities;
}());
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(function (decoratorInvocation) {
        var decoratorType = decoratorInvocation.type;
        var annotationCls = decoratorType.annotationCls;
        var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new (annotationCls.bind.apply(annotationCls, __spread([void 0], annotationArgs)))();
    });
}
function getParentCtor(ctor) {
    var parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    var parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}
var ɵ0$6 = getClosureSafeProperty;
var USE_VALUE$1 = /*@__PURE__*/ getClosureSafeProperty({ provide: String, useValue: ɵ0$6 });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ɵ0$7 = getClosureSafeProperty;
var USE_VALUE$2 = /*@__PURE__*/ getClosureSafeProperty({ provide: String, useValue: ɵ0$7 });
var EMPTY_ARRAY$1 = [];
function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        var reflectionCapabilities = new ReflectionCapabilities();
        var deps_1 = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return function () { return new (type.bind.apply(type, __spread([void 0], injectArgs(deps_1))))(); };
    }
    if (USE_VALUE$2 in provider) {
        var valueProvider_1 = provider;
        return function () { return valueProvider_1.useValue; };
    }
    else if (provider.useExisting) {
        var existingProvider_1 = provider;
        return function () { return ɵɵinject(resolveForwardRef(existingProvider_1.useExisting)); };
    }
    else if (provider.useFactory) {
        var factoryProvider_1 = provider;
        return function () { return factoryProvider_1.useFactory.apply(factoryProvider_1, __spread(injectArgs(factoryProvider_1.deps || EMPTY_ARRAY$1))); };
    }
    else if (provider.useClass) {
        var classProvider_1 = provider;
        var deps_2 = provider.deps;
        if (!deps_2) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_2 = reflectionCapabilities.parameters(type);
        }
        return function () {
            var _a;
            return new ((_a = (resolveForwardRef(classProvider_1.useClass))).bind.apply(_a, __spread([void 0], injectArgs(deps_2))))();
        };
    }
    else {
        var deps_3 = provider.deps;
        if (!deps_3) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_3 = reflectionCapabilities.parameters(type);
        }
        return function () { return new (type.bind.apply(type, __spread([void 0], injectArgs(deps_3))))(); };
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ɵ0$8 = function (type, meta) { return SWITCH_COMPILE_INJECTABLE(type, meta); };
/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Injectable = /*@__PURE__*/ makeDecorator('Injectable', undefined, undefined, undefined, ɵ0$8);
/**
 * Supports @Injectable() in JIT mode for Render2.
 */
function render2CompileInjectable(injectableType, options) {
    if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
        injectableType.ɵprov = ɵɵdefineInjectable({
            token: injectableType,
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
var SWITCH_COMPILE_INJECTABLE__PRE_R3__ = render2CompileInjectable;
var SWITCH_COMPILE_INJECTABLE = SWITCH_COMPILE_INJECTABLE__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
var INJECTOR_SCOPE = /*@__PURE__*/ new InjectionToken('Set Injector scope.');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Marker which indicates that a value has not yet been created from the factory function.
 */
var NOT_YET = {};
/**
 * Marker which indicates that the factory function for a token is in the process of being called.
 *
 * If the injector is asked to inject a token with its value set to CIRCULAR, that indicates
 * injection of a dependency has recursively attempted to inject the original token, and there is
 * a circular dependency among the providers.
 */
var CIRCULAR = {};
var EMPTY_ARRAY$2 = [];
/**
 * A lazily initialized NullInjector.
 */
var NULL_INJECTOR = undefined;
function getNullInjector() {
    if (NULL_INJECTOR === undefined) {
        NULL_INJECTOR = new NullInjector();
    }
    return NULL_INJECTOR;
}
/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 *
 * @publicApi
 */
function createInjector(defType, parent, additionalProviders, name) {
    if (parent === void 0) {
        parent = null;
    }
    if (additionalProviders === void 0) {
        additionalProviders = null;
    }
    parent = parent || getNullInjector();
    return new R3Injector(defType, additionalProviders, parent, name);
}
var R3Injector = /** @class */ /*@__PURE__*/ (function () {
    function R3Injector(def, additionalProviders, parent, source) {
        var _this = this;
        if (source === void 0) {
            source = null;
        }
        this.parent = parent;
        /**
         * Map of tokens to records which contain the instances of those tokens.
         * - `null` value implies that we don't have the record. Used by tree-shakable injectors
         * to prevent further searches.
         */
        this.records = new Map();
        /**
         * The transitive set of `InjectorType`s which define this injector.
         */
        this.injectorDefTypes = new Set();
        /**
         * Set of values instantiated by this injector which contain `ngOnDestroy` lifecycle hooks.
         */
        this.onDestroy = new Set();
        this._destroyed = false;
        var dedupStack = [];
        // Start off by creating Records for every provider declared in every InjectorType
        // included transitively in additional providers then do the same for `def`. This order is
        // important because `def` may include providers that override ones in additionalProviders.
        additionalProviders && deepForEach(additionalProviders, function (provider) { return _this.processProvider(provider, def, additionalProviders); });
        deepForEach([def], function (injectorDef) { return _this.processInjectorType(injectorDef, [], dedupStack); });
        // Make sure the INJECTOR token provides this injector.
        this.records.set(INJECTOR, makeRecord(undefined, this));
        // Detect whether this injector has the APP_ROOT_SCOPE token and thus should provide
        // any injectable scoped to APP_ROOT_SCOPE.
        var record = this.records.get(INJECTOR_SCOPE);
        this.scope = record != null ? record.value : null;
        // Eagerly instantiate the InjectorType classes themselves.
        this.injectorDefTypes.forEach(function (defType) { return _this.get(defType); });
        // Source name, used for debugging
        this.source = source || (typeof def === 'object' ? null : stringify(def));
    }
    Object.defineProperty(R3Injector.prototype, "destroyed", {
        /**
         * Flag indicating that this injector was previously destroyed.
         */
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy the injector and release references to every instance or provider associated with it.
     *
     * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
     * hook was found.
     */
    R3Injector.prototype.destroy = function () {
        this.assertNotDestroyed();
        // Set destroyed = true first, in case lifecycle hooks re-enter destroy().
        this._destroyed = true;
        try {
            // Call all the lifecycle hooks.
            this.onDestroy.forEach(function (service) { return service.ngOnDestroy(); });
        }
        finally {
            // Release all references.
            this.records.clear();
            this.onDestroy.clear();
            this.injectorDefTypes.clear();
        }
    };
    R3Injector.prototype.get = function (token, notFoundValue, flags) {
        if (notFoundValue === void 0) {
            notFoundValue = THROW_IF_NOT_FOUND;
        }
        if (flags === void 0) {
            flags = InjectFlags.Default;
        }
        this.assertNotDestroyed();
        // Set the injection context.
        var previousInjector = setCurrentInjector(this);
        try {
            // Check for the SkipSelf flag.
            if (!(flags & InjectFlags.SkipSelf)) {
                // SkipSelf isn't set, check if the record belongs to this injector.
                var record = this.records.get(token);
                if (record === undefined) {
                    // No record, but maybe the token is scoped to this injector. Look for an injectable
                    // def with a scope matching this injector.
                    var def = couldBeInjectableType(token) && getInjectableDef(token);
                    if (def && this.injectableDefInScope(def)) {
                        // Found an injectable def and it's scoped to this injector. Pretend as if it was here
                        // all along.
                        record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
                    }
                    else {
                        record = null;
                    }
                    this.records.set(token, record);
                }
                // If a record was found, get the instance for it and return it.
                if (record != null /* NOT null || undefined */) {
                    return this.hydrate(token, record);
                }
            }
            // Select the next injector based on the Self flag - if self is set, the next injector is
            // the NullInjector, otherwise it's the parent.
            var nextInjector = !(flags & InjectFlags.Self) ? this.parent : getNullInjector();
            // Set the notFoundValue based on the Optional flag - if optional is set and notFoundValue
            // is undefined, the value is null, otherwise it's the notFoundValue.
            notFoundValue = (flags & InjectFlags.Optional) && notFoundValue === THROW_IF_NOT_FOUND ?
                null :
                notFoundValue;
            return nextInjector.get(token, notFoundValue);
        }
        catch (e) {
            if (e.name === 'NullInjectorError') {
                var path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
                path.unshift(stringify(token));
                if (previousInjector) {
                    // We still have a parent injector, keep throwing
                    throw e;
                }
                else {
                    // Format & throw the final error message when we don't have any previous injector
                    return catchInjectorError(e, token, 'R3InjectorError', this.source);
                }
            }
            else {
                throw e;
            }
        }
        finally {
            // Lastly, clean up the state by restoring the previous injector.
            setCurrentInjector(previousInjector);
        }
    };
    R3Injector.prototype.toString = function () {
        var tokens = [], records = this.records;
        records.forEach(function (v, token) { return tokens.push(stringify(token)); });
        return "R3Injector[" + tokens.join(', ') + "]";
    };
    R3Injector.prototype.assertNotDestroyed = function () {
        if (this._destroyed) {
            throw new Error('Injector has already been destroyed.');
        }
    };
    /**
     * Add an `InjectorType` or `InjectorTypeWithProviders` and all of its transitive providers
     * to this injector.
     *
     * If an `InjectorTypeWithProviders` that declares providers besides the type is specified,
     * the function will return "true" to indicate that the providers of the type definition need
     * to be processed. This allows us to process providers of injector types after all imports of
     * an injector definition are processed. (following View Engine semantics: see FW-1349)
     */
    R3Injector.prototype.processInjectorType = function (defOrWrappedDef, parents, dedupStack) {
        var _this = this;
        defOrWrappedDef = resolveForwardRef(defOrWrappedDef);
        if (!defOrWrappedDef)
            return false;
        // Either the defOrWrappedDef is an InjectorType (with injector def) or an
        // InjectorDefTypeWithProviders (aka ModuleWithProviders). Detecting either is a megamorphic
        // read, so care is taken to only do the read once.
        // First attempt to read the injector def (`ɵinj`).
        var def = getInjectorDef(defOrWrappedDef);
        // If that's not present, then attempt to read ngModule from the InjectorDefTypeWithProviders.
        var ngModule = (def == null) && defOrWrappedDef.ngModule || undefined;
        // Determine the InjectorType. In the case where `defOrWrappedDef` is an `InjectorType`,
        // then this is easy. In the case of an InjectorDefTypeWithProviders, then the definition type
        // is the `ngModule`.
        var defType = (ngModule === undefined) ? defOrWrappedDef : ngModule;
        // Check for circular dependencies.
        if (ngDevMode && parents.indexOf(defType) !== -1) {
            var defName = stringify(defType);
            throw new Error("Circular dependency in DI detected for type " + defName + ". Dependency path: " + parents.map(function (defType) { return stringify(defType); }).join(' > ') + " > " + defName + ".");
        }
        // Check for multiple imports of the same module
        var isDuplicate = dedupStack.indexOf(defType) !== -1;
        // Finally, if defOrWrappedType was an `InjectorDefTypeWithProviders`, then the actual
        // `InjectorDef` is on its `ngModule`.
        if (ngModule !== undefined) {
            def = getInjectorDef(ngModule);
        }
        // If no definition was found, it might be from exports. Remove it.
        if (def == null) {
            return false;
        }
        // Add providers in the same way that @NgModule resolution did:
        // First, include providers from any imports.
        if (def.imports != null && !isDuplicate) {
            // Before processing defType's imports, add it to the set of parents. This way, if it ends
            // up deeply importing itself, this can be detected.
            ngDevMode && parents.push(defType);
            // Add it to the set of dedups. This way we can detect multiple imports of the same module
            dedupStack.push(defType);
            var importTypesWithProviders_1;
            try {
                deepForEach(def.imports, function (imported) {
                    if (_this.processInjectorType(imported, parents, dedupStack)) {
                        if (importTypesWithProviders_1 === undefined)
                            importTypesWithProviders_1 = [];
                        // If the processed import is an injector type with providers, we store it in the
                        // list of import types with providers, so that we can process those afterwards.
                        importTypesWithProviders_1.push(imported);
                    }
                });
            }
            finally {
                // Remove it from the parents set when finished.
                ngDevMode && parents.pop();
            }
            // Imports which are declared with providers (TypeWithProviders) need to be processed
            // after all imported modules are processed. This is similar to how View Engine
            // processes/merges module imports in the metadata resolver. See: FW-1349.
            if (importTypesWithProviders_1 !== undefined) {
                var _loop_1 = function (i) {
                    var _a = importTypesWithProviders_1[i], ngModule_1 = _a.ngModule, providers = _a.providers;
                    deepForEach(providers, function (provider) { return _this.processProvider(provider, ngModule_1, providers || EMPTY_ARRAY$2); });
                };
                for (var i = 0; i < importTypesWithProviders_1.length; i++) {
                    _loop_1(i);
                }
            }
        }
        // Track the InjectorType and add a provider for it. It's important that this is done after the
        // def's imports.
        this.injectorDefTypes.add(defType);
        this.records.set(defType, makeRecord(def.factory, NOT_YET));
        // Next, include providers listed on the definition itself.
        var defProviders = def.providers;
        if (defProviders != null && !isDuplicate) {
            var injectorType_1 = defOrWrappedDef;
            deepForEach(defProviders, function (provider) { return _this.processProvider(provider, injectorType_1, defProviders); });
        }
        return (ngModule !== undefined &&
            defOrWrappedDef.providers !== undefined);
    };
    /**
     * Process a `SingleProvider` and add it.
     */
    R3Injector.prototype.processProvider = function (provider, ngModuleType, providers) {
        // Determine the token from the provider. Either it's its own token, or has a {provide: ...}
        // property.
        provider = resolveForwardRef(provider);
        var token = isTypeProvider(provider) ? provider : resolveForwardRef(provider && provider.provide);
        // Construct a `Record` for the provider.
        var record = providerToRecord(provider, ngModuleType, providers);
        if (!isTypeProvider(provider) && provider.multi === true) {
            // If the provider indicates that it's a multi-provider, process it specially.
            // First check whether it's been defined already.
            var multiRecord_1 = this.records.get(token);
            if (multiRecord_1) {
                // It has. Throw a nice error if
                if (multiRecord_1.multi === undefined) {
                    throwMixedMultiProviderError();
                }
            }
            else {
                multiRecord_1 = makeRecord(undefined, NOT_YET, true);
                multiRecord_1.factory = function () { return injectArgs(multiRecord_1.multi); };
                this.records.set(token, multiRecord_1);
            }
            token = provider;
            multiRecord_1.multi.push(provider);
        }
        else {
            var existing = this.records.get(token);
            if (existing && existing.multi !== undefined) {
                throwMixedMultiProviderError();
            }
        }
        this.records.set(token, record);
    };
    R3Injector.prototype.hydrate = function (token, record) {
        if (record.value === CIRCULAR) {
            throwCyclicDependencyError(stringify(token));
        }
        else if (record.value === NOT_YET) {
            record.value = CIRCULAR;
            record.value = record.factory();
        }
        if (typeof record.value === 'object' && record.value && hasOnDestroy(record.value)) {
            this.onDestroy.add(record.value);
        }
        return record.value;
    };
    R3Injector.prototype.injectableDefInScope = function (def) {
        if (!def.providedIn) {
            return false;
        }
        else if (typeof def.providedIn === 'string') {
            return def.providedIn === 'any' || (def.providedIn === this.scope);
        }
        else {
            return this.injectorDefTypes.has(def.providedIn);
        }
    };
    return R3Injector;
}());
function injectableDefOrInjectorDefFactory(token) {
    // Most tokens will have an injectable def directly on them, which specifies a factory directly.
    var injectableDef = getInjectableDef(token);
    var factory = injectableDef !== null ? injectableDef.factory : getFactoryDef(token);
    if (factory !== null) {
        return factory;
    }
    // If the token is an NgModule, it's also injectable but the factory is on its injector def
    // (`ɵinj`)
    var injectorDef = getInjectorDef(token);
    if (injectorDef !== null) {
        return injectorDef.factory;
    }
    // InjectionTokens should have an injectable def (ɵprov) and thus should be handled above.
    // If it's missing that, it's an error.
    if (token instanceof InjectionToken) {
        throw new Error("Token " + stringify(token) + " is missing a \u0275prov definition.");
    }
    // Undecorated types can sometimes be created if they have no constructor arguments.
    if (token instanceof Function) {
        return getUndecoratedInjectableFactory(token);
    }
    // There was no way to resolve a factory for this token.
    throw new Error('unreachable');
}
function getUndecoratedInjectableFactory(token) {
    // If the token has parameters then it has dependencies that we cannot resolve implicitly.
    var paramLength = token.length;
    if (paramLength > 0) {
        var args = newArray(paramLength, '?');
        throw new Error("Can't resolve all parameters for " + stringify(token) + ": (" + args.join(', ') + ").");
    }
    // The constructor function appears to have no parameters.
    // This might be because it inherits from a super-class. In which case, use an injectable
    // def from an ancestor if there is one.
    // Otherwise this really is a simple class with no dependencies, so return a factory that
    // just instantiates the zero-arg constructor.
    var inheritedInjectableDef = getInheritedInjectableDef(token);
    if (inheritedInjectableDef !== null) {
        return function () { return inheritedInjectableDef.factory(token); };
    }
    else {
        return function () { return new token(); };
    }
}
function providerToRecord(provider, ngModuleType, providers) {
    if (isValueProvider(provider)) {
        return makeRecord(undefined, provider.useValue);
    }
    else {
        var factory = providerToFactory(provider, ngModuleType, providers);
        return makeRecord(factory, NOT_YET);
    }
}
/**
 * Converts a `SingleProvider` into a factory function.
 *
 * @param provider provider to convert to factory
 */
function providerToFactory(provider, ngModuleType, providers) {
    var factory = undefined;
    if (isTypeProvider(provider)) {
        return injectableDefOrInjectorDefFactory(resolveForwardRef(provider));
    }
    else {
        if (isValueProvider(provider)) {
            factory = function () { return resolveForwardRef(provider.useValue); };
        }
        else if (isFactoryProvider(provider)) {
            factory = function () { return provider.useFactory.apply(provider, __spread(injectArgs(provider.deps || []))); };
        }
        else if (isExistingProvider(provider)) {
            factory = function () { return ɵɵinject(resolveForwardRef(provider.useExisting)); };
        }
        else {
            var classRef_1 = resolveForwardRef(provider &&
                (provider.useClass || provider.provide));
            if (!classRef_1) {
                throwInvalidProviderError(ngModuleType, providers, provider);
            }
            if (hasDeps(provider)) {
                factory = function () { return new ((classRef_1).bind.apply((classRef_1), __spread([void 0], injectArgs(provider.deps))))(); };
            }
            else {
                return injectableDefOrInjectorDefFactory(classRef_1);
            }
        }
    }
    return factory;
}
function makeRecord(factory, value, multi) {
    if (multi === void 0) {
        multi = false;
    }
    return {
        factory: factory,
        value: value,
        multi: multi ? [] : undefined,
    };
}
function isValueProvider(value) {
    return value !== null && typeof value == 'object' && USE_VALUE in value;
}
function isExistingProvider(value) {
    return !!(value && value.useExisting);
}
function isFactoryProvider(value) {
    return !!(value && value.useFactory);
}
function isTypeProvider(value) {
    return typeof value === 'function';
}
function hasDeps(value) {
    return !!value.deps;
}
function hasOnDestroy(value) {
    return value !== null && typeof value === 'object' &&
        typeof value.ngOnDestroy === 'function';
}
function couldBeInjectableType(value) {
    return (typeof value === 'function') ||
        (typeof value === 'object' && value instanceof InjectionToken);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function INJECTOR_IMPL__PRE_R3__(providers, parent, name) {
    return new StaticInjector(providers, parent, name);
}
var INJECTOR_IMPL = INJECTOR_IMPL__PRE_R3__;
/**
 * Concrete injectors implement this interface. Injectors are configured
 * with [providers](guide/glossary#provider) that associate
 * dependencies of various types with [injection tokens](guide/glossary#di-token).
 *
 * @see ["DI Providers"](guide/dependency-injection-providers).
 * @see `StaticProvider`
 *
 * @usageNotes
 *
 *  The following example creates a service injector instance.
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Usage example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
var Injector = /** @class */ /*@__PURE__*/ (function () {
    function Injector() {
    }
    Injector.create = function (options, parent) {
        if (Array.isArray(options)) {
            return INJECTOR_IMPL(options, parent, '');
        }
        else {
            return INJECTOR_IMPL(options.providers, options.parent, options.name || '');
        }
    };
    Injector.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    Injector.NULL = new NullInjector();
    /** @nocollapse */
    Injector.ɵprov = ɵɵdefineInjectable({
        token: Injector,
        providedIn: 'any',
        factory: function () { return ɵɵinject(INJECTOR); },
    });
    /**
     * @internal
     * @nocollapse
     */
    Injector.__NG_ELEMENT_ID__ = -1;
    return Injector;
}());
var IDENT = function (value) {
    return value;
};
var EMPTY$1 = [];
var CIRCULAR$1 = IDENT;
var MULTI_PROVIDER_FN = function () {
    return Array.prototype.slice.call(arguments);
};
var NO_NEW_LINE$1 = 'ɵ';
var StaticInjector = /** @class */ /*@__PURE__*/ (function () {
    function StaticInjector(providers, parent, source) {
        if (parent === void 0) {
            parent = Injector.NULL;
        }
        if (source === void 0) {
            source = null;
        }
        this.parent = parent;
        this.source = source;
        var records = this._records = new Map();
        records.set(Injector, { token: Injector, fn: IDENT, deps: EMPTY$1, value: this, useNew: false });
        records.set(INJECTOR, { token: INJECTOR, fn: IDENT, deps: EMPTY$1, value: this, useNew: false });
        this.scope = recursivelyProcessProviders(records, providers);
    }
    StaticInjector.prototype.get = function (token, notFoundValue, flags) {
        if (flags === void 0) {
            flags = InjectFlags.Default;
        }
        var records = this._records;
        var record = records.get(token);
        if (record === undefined) {
            // This means we have never seen this record, see if it is tree shakable provider.
            var injectableDef = getInjectableDef(token);
            if (injectableDef) {
                var providedIn = injectableDef && injectableDef.providedIn;
                if (providedIn === 'any' || providedIn != null && providedIn === this.scope) {
                    records.set(token, record = resolveProvider({ provide: token, useFactory: injectableDef.factory, deps: EMPTY$1 }));
                }
            }
            if (record === undefined) {
                // Set record to null to make sure that we don't go through expensive lookup above again.
                records.set(token, null);
            }
        }
        var lastInjector = setCurrentInjector(this);
        try {
            return tryResolveToken(token, record, records, this.parent, notFoundValue, flags);
        }
        catch (e) {
            return catchInjectorError(e, token, 'StaticInjectorError', this.source);
        }
        finally {
            setCurrentInjector(lastInjector);
        }
    };
    StaticInjector.prototype.toString = function () {
        var tokens = [], records = this._records;
        records.forEach(function (v, token) { return tokens.push(stringify(token)); });
        return "StaticInjector[" + tokens.join(', ') + "]";
    };
    return StaticInjector;
}());
function resolveProvider(provider) {
    var deps = computeDeps(provider);
    var fn = IDENT;
    var value = EMPTY$1;
    var useNew = false;
    var provide = resolveForwardRef(provider.provide);
    if (USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = provider.useValue;
    }
    else if (provider.useFactory) {
        fn = provider.useFactory;
    }
    else if (provider.useExisting) {
        // Just use IDENT
    }
    else if (provider.useClass) {
        useNew = true;
        fn = resolveForwardRef(provider.useClass);
    }
    else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    }
    else {
        throw staticError('StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable', provider);
    }
    return { deps: deps, fn: fn, useNew: useNew, value: value };
}
function multiProviderMixError(token) {
    return staticError('Cannot mix multi providers and regular providers', token);
}
function recursivelyProcessProviders(records, provider) {
    var scope = null;
    if (provider) {
        provider = resolveForwardRef(provider);
        if (Array.isArray(provider)) {
            // if we have an array recurse into the array
            for (var i = 0; i < provider.length; i++) {
                scope = recursivelyProcessProviders(records, provider[i]) || scope;
            }
        }
        else if (typeof provider === 'function') {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError('Function/Class not supported', provider);
        }
        else if (provider && typeof provider === 'object' && provider.provide) {
            // At this point we have what looks like a provider: {provide: ?, ....}
            var token = resolveForwardRef(provider.provide);
            var resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                // This is a multi provider.
                var multiProvider = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                }
                else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = {
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY$1
                    });
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({ token: token, options: 6 /* Default */ });
            }
            var record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            if (token === INJECTOR_SCOPE) {
                scope = resolvedProvider.value;
            }
            records.set(token, resolvedProvider);
        }
        else {
            throw staticError('Unexpected provider', provider);
        }
    }
    return scope;
}
function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    }
    catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        var path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (record && record.value == CIRCULAR$1) {
            // Reset the Circular flag.
            record.value = EMPTY$1;
        }
        throw e;
    }
}
function resolveToken(token, record, records, parent, notFoundValue, flags) {
    var _a;
    var value;
    if (record && !(flags & InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        value = record.value;
        if (value == CIRCULAR$1) {
            throw Error(NO_NEW_LINE$1 + 'Circular dependency');
        }
        else if (value === EMPTY$1) {
            record.value = CIRCULAR$1;
            var obj = undefined;
            var useNew = record.useNew;
            var fn = record.fn;
            var depRecords = record.deps;
            var deps = EMPTY$1;
            if (depRecords.length) {
                deps = [];
                for (var i = 0; i < depRecords.length; i++) {
                    var depRecord = depRecords[i];
                    var options = depRecord.options;
                    var childRecord = options & 2 /* CheckSelf */ ? records.get(depRecord.token) : undefined;
                    deps.push(tryResolveToken(
                    // Current Token to resolve
                    depRecord.token, 
                    // A record which describes how to resolve the token.
                    // If undefined, this means we don't have such a record
                    childRecord, 
                    // Other records we know about.
                    records, 
                    // If we don't know how to resolve dependency and we should not check parent for it,
                    // than pass in Null injector.
                    !childRecord && !(options & 4 /* CheckParent */) ? Injector.NULL : parent, options & 1 /* Optional */ ? null : Injector.THROW_IF_NOT_FOUND, InjectFlags.Default));
                }
            }
            record.value = value = useNew ? new ((_a = fn).bind.apply(_a, __spread([void 0], deps)))() : fn.apply(obj, deps);
        }
    }
    else if (!(flags & InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, InjectFlags.Default);
    }
    else if (!(flags & InjectFlags.Optional)) {
        value = Injector.NULL.get(token, notFoundValue);
    }
    else {
        value = Injector.NULL.get(token, typeof notFoundValue !== 'undefined' ? notFoundValue : null);
    }
    return value;
}
function computeDeps(provider) {
    var deps = EMPTY$1;
    var providerDeps = provider.deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (var i = 0; i < providerDeps.length; i++) {
            var options = 6;
            var token = resolveForwardRef(providerDeps[i]);
            if (Array.isArray(token)) {
                for (var j = 0, annotations = token; j < annotations.length; j++) {
                    var annotation = annotations[j];
                    if (annotation instanceof Optional || annotation == Optional) {
                        options = options | 1 /* Optional */;
                    }
                    else if (annotation instanceof SkipSelf || annotation == SkipSelf) {
                        options = options & ~2 /* CheckSelf */;
                    }
                    else if (annotation instanceof Self || annotation == Self) {
                        options = options & ~4 /* CheckParent */;
                    }
                    else if (annotation instanceof Inject) {
                        token = annotation.token;
                    }
                    else {
                        token = resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token: token, options: options });
        }
    }
    else if (provider.useExisting) {
        var token = resolveForwardRef(provider.useExisting);
        deps = [{ token: token, options: 6 /* Default */ }];
    }
    else if (!providerDeps && !(USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError('\'deps\' required', provider);
    }
    return deps;
}
function staticError(text, obj) {
    return new Error(formatError(text, obj, 'StaticInjectorError'));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var reversed = findFirstClosedCycle(keys.slice().reverse());
        var tokenStrs = reversed.map(function (k) { return stringify(k.token); });
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
function injectionError(injector, key, constructResolvingMessage, originalError) {
    var keys = [key];
    var errMsg = constructResolvingMessage(keys);
    var error = (originalError ? wrappedError(errMsg, originalError) : Error(errMsg));
    error.addKey = addKey;
    error.keys = keys;
    error.injectors = [injector];
    error.constructResolvingMessage = constructResolvingMessage;
    error[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}
function addKey(injector, key) {
    this.injectors.push(injector);
    this.keys.push(key);
    // Note: This updated message won't be reflected in the `.stack` property
    this.message = this.constructResolvingMessage(this.keys);
}
/**
 * Thrown when trying to retrieve a dependency by key from {@link Injector}, but the
 * {@link Injector} does not have a {@link Provider} for the given key.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 */
function noProviderError(injector, key) {
    return injectionError(injector, key, function (keys) {
        var first = stringify(keys[0].token);
        return "No provider for " + first + "!" + constructResolvingPath(keys);
    });
}
/**
 * Thrown when dependencies form a cycle.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 */
function cyclicDependencyError(injector, key) {
    return injectionError(injector, key, function (keys) {
        return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
    });
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 */
function instantiationError(injector, originalException, originalStack, key) {
    return injectionError(injector, key, function (keys) {
        var first = stringify(keys[0].token);
        return originalException.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".";
    }, originalException);
}
/**
 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 */
function invalidProviderError(provider) {
    return Error("Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 *
 */
function noAnnotationError(typeOrFunc, params) {
    var signature = [];
    for (var i = 0, ii = params.length; i < ii; i++) {
        var parameter = params[i];
        if (!parameter || parameter.length == 0) {
            signature.push('?');
        }
        else {
            signature.push(parameter.map(stringify).join(' '));
        }
    }
    return Error('Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
        signature.join(', ') + '). ' +
        'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
        stringify(typeOrFunc) + '\' is decorated with Injectable.');
}
/**
 * Thrown when getting an object by index.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 *
 */
function outOfBoundsError(index) {
    return Error("Index " + index + " is out-of-bounds.");
}
// TODO: add a working example after alpha38 is released
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
function mixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
    return Error("Cannot mix multi providers and regular providers, got: " + provider1 + " " + provider2);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 *
 * @deprecated No replacement
 * @publicApi
 */
var ReflectiveKey = /** @class */ /*@__PURE__*/ (function () {
    /**
     * Private
     */
    function ReflectiveKey(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
        this.displayName = stringify(this.token);
    }
    /**
     * Retrieves a `Key` for a token.
     */
    ReflectiveKey.get = function (token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    };
    Object.defineProperty(ReflectiveKey, "numberOfKeys", {
        /**
         * @returns the number of keys registered in the system.
         */
        get: function () { return _globalKeyRegistry.numberOfKeys; },
        enumerable: true,
        configurable: true
    });
    return ReflectiveKey;
}());
var KeyRegistry = /** @class */ /*@__PURE__*/ (function () {
    function KeyRegistry() {
        this._allKeys = new Map();
    }
    KeyRegistry.prototype.get = function (token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function () { return this._allKeys.size; },
        enumerable: true,
        configurable: true
    });
    return KeyRegistry;
}());
var _globalKeyRegistry = /*@__PURE__*/ new KeyRegistry();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = /** @class */ /*@__PURE__*/ (function () {
    function Reflector(reflectionCapabilities) {
        this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
    Reflector.prototype.factory = function (type) { return this.reflectionCapabilities.factory(type); };
    Reflector.prototype.parameters = function (typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    };
    Reflector.prototype.annotations = function (typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    };
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    };
    Reflector.prototype.hasLifecycleHook = function (type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    };
    Reflector.prototype.getter = function (name) { return this.reflectionCapabilities.getter(name); };
    Reflector.prototype.setter = function (name) { return this.reflectionCapabilities.setter(name); };
    Reflector.prototype.method = function (name) { return this.reflectionCapabilities.method(name); };
    Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
    Reflector.prototype.resourceUri = function (type) { return this.reflectionCapabilities.resourceUri(type); };
    Reflector.prototype.resolveIdentifier = function (name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    };
    Reflector.prototype.resolveEnum = function (identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    };
    return Reflector;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
var reflector = /*@__PURE__*/ new Reflector(/*@__PURE__*/ new ReflectionCapabilities());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var ReflectiveDependency = /** @class */ /*@__PURE__*/ (function () {
    function ReflectiveDependency(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null);
    };
    return ReflectiveDependency;
}());
var _EMPTY_LIST = [];
var ResolvedReflectiveProvider_ = /** @class */ /*@__PURE__*/ (function () {
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
        this.resolvedFactory = this.resolvedFactories[0];
    }
    return ResolvedReflectiveProvider_;
}());
/**
 * An internal resolved representation of a factory function created by resolving `Provider`.
 * @publicApi
 */
var ResolvedReflectiveFactory = /** @class */ /*@__PURE__*/ (function () {
    function ResolvedReflectiveFactory(
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory, 
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
/**
 * Resolve a single provider.
 */
function resolveReflectiveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (provider.useClass) {
        var useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = function () { return provider.useValue; };
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the `Provider` into `ResolvedProvider`.
 *
 * `Injector` internally only uses `ResolvedProvider`, `Provider` contains convenience provider
 * syntax.
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi || false);
}
/**
 * Resolve a list of Providers.
 */
function resolveReflectiveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveReflectiveProvider);
    var resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where each key is contained exactly once and
 * multi providers have been merged.
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        var existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var resolvedProvider = void 0;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
function _normalizeProviders(providers, res) {
    providers.forEach(function (b) {
        if (b instanceof Type) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && b.provide !== undefined) {
            res.push(b);
        }
        else if (Array.isArray(b)) {
            _normalizeProviders(b, res);
        }
        else {
            throw invalidProviderError(b);
        }
    });
    return res;
}
function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var params_1 = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params_1); });
    }
}
function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(function (p) { return p == null; })) {
        throw noAnnotationError(typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
function _extractToken(typeOrFunc, metadata, params) {
    var token = null;
    var optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata.token, optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    var visibility = null;
    for (var i = 0; i < metadata.length; ++i) {
        var paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
            visibility = paramMetadata;
        }
        else if (paramMetadata instanceof InjectionToken) {
            token = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw noAnnotationError(typeOrFunc, params);
    }
}
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Threshold for the dynamic version
var UNDEFINED = {};
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * @usageNotes
 * ### Example
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * @deprecated from v5 - slow and brings in a lot of code, Use `Injector.create` instead.
 * @publicApi
 */
var ReflectiveInjector = /** @class */ /*@__PURE__*/ (function () {
    function ReflectiveInjector() {
    }
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of `ResolvedReflectiveProvider`s.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     */
    ReflectiveInjector.resolve = function (providers) {
        return resolveReflectiveProviders(providers);
    };
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, `Provider`,
     * or a recursive array of more providers.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    ReflectiveInjector.resolveAndCreate = function (providers, parent) {
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    };
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
        return new ReflectiveInjector_(providers, parent);
    };
    return ReflectiveInjector;
}());
var ReflectiveInjector_ = /** @class */ /*@__PURE__*/ (function () {
    /**
     * Private
     */
    function ReflectiveInjector_(_providers, _parent) {
        /** @internal */
        this._constructionCounter = 0;
        this._providers = _providers;
        this.parent = _parent || null;
        var len = _providers.length;
        this.keyIds = [];
        this.objs = [];
        for (var i = 0; i < len; i++) {
            this.keyIds[i] = _providers[i].key.id;
            this.objs[i] = UNDEFINED;
        }
    }
    ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) {
            notFoundValue = THROW_IF_NOT_FOUND;
        }
        return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
    };
    ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    };
    ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
        var inj = new ReflectiveInjector_(providers);
        inj.parent = this;
        return inj;
    };
    ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    };
    ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
        return this._instantiateProvider(provider);
    };
    ReflectiveInjector_.prototype.getProviderAtIndex = function (index) {
        if (index < 0 || index >= this._providers.length) {
            throw outOfBoundsError(index);
        }
        return this._providers[index];
    };
    /** @internal */
    ReflectiveInjector_.prototype._new = function (provider) {
        if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
            throw cyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    };
    ReflectiveInjector_.prototype._getMaxNumberOfObjects = function () { return this.objs.length; };
    ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
        if (provider.multiProvider) {
            var res = [];
            for (var i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    };
    ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory) {
        var _this = this;
        var factory = ResolvedReflectiveFactory.factory;
        var deps;
        try {
            deps =
                ResolvedReflectiveFactory.dependencies.map(function (dep) { return _this._getByReflectiveDependency(dep); });
        }
        catch (e) {
            if (e.addKey) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        var obj;
        try {
            obj = factory.apply(void 0, __spread(deps));
        }
        catch (e) {
            throw instantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    };
    ReflectiveInjector_.prototype._getByReflectiveDependency = function (dep) {
        return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    };
    ReflectiveInjector_.prototype._getByKey = function (key, visibility, notFoundValue) {
        if (key === ReflectiveInjector_.INJECTOR_KEY) {
            return this;
        }
        if (visibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, visibility);
        }
    };
    ReflectiveInjector_.prototype._getObjByKeyId = function (keyId) {
        for (var i = 0; i < this.keyIds.length; i++) {
            if (this.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this._new(this._providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    };
    /** @internal */
    ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw noProviderError(this, key);
        }
    };
    /** @internal */
    ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
        var obj = this._getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    };
    /** @internal */
    ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, visibility) {
        var inj;
        if (visibility instanceof SkipSelf) {
            inj = this.parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            var inj_ = inj;
            var obj = inj_._getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_.parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
        get: function () {
            var providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
                .join(', ');
            return "ReflectiveInjector(providers: [" + providers + "])";
        },
        enumerable: true,
        configurable: true
    });
    ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
    ReflectiveInjector_.INJECTOR_KEY = ReflectiveKey.get(Injector);
    return ReflectiveInjector_;
}());
function _mapProviders(injector, fn) {
    var res = [];
    for (var i = 0; i < injector._providers.length; ++i) {
        res[i] = fn(injector.getProviderAtIndex(i));
    }
    return res;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * @usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @publicApi
 * @deprecated Since 9.0.0. With Ivy, this property is no longer necessary.
 */
var ANALYZE_FOR_ENTRY_COMPONENTS = /*@__PURE__*/ new InjectionToken('AnalyzeForEntryComponents');
/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * @publicApi
 */
var Query = /** @class */ /*@__PURE__*/ (function () {
    function Query() {
    }
    return Query;
}());
var ɵ0$a = function (selector, data) {
    if (data === void 0) {
        data = {};
    }
    return (__assign({ selector: selector, first: false, isViewQuery: false, descendants: false }, data));
};
/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
var ContentChildren = /*@__PURE__*/ makePropDecorator('ContentChildren', ɵ0$a, Query);
var ɵ1$2 = function (selector, data) {
    if (data === void 0) {
        data = {};
    }
    return (__assign({ selector: selector, first: true, isViewQuery: false, descendants: true }, data));
};
/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
var ContentChild = /*@__PURE__*/ makePropDecorator('ContentChild', ɵ1$2, Query);
var ɵ2 = function (selector, data) {
    if (data === void 0) {
        data = {};
    }
    return (__assign({ selector: selector, first: false, isViewQuery: true, descendants: true }, data));
};
/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var ViewChildren = /*@__PURE__*/ makePropDecorator('ViewChildren', ɵ2, Query);
var ɵ3 = function (selector, data) {
    return (__assign({ selector: selector, first: true, isViewQuery: true, descendants: true }, data));
};
/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var ViewChild = /*@__PURE__*/ makePropDecorator('ViewChild', ɵ3, Query);
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
/**
 * Compute the static styling (class/style) from `TAttributes`.
 *
 * This function should be called during `firstCreatePass` only.
 *
 * @param tNode The `TNode` into which the styling information should be loaded.
 * @param attrs `TAttributes` containing the styling information.
 */
function computeStaticStyling(tNode, attrs) {
    ngDevMode &&
        assertFirstCreatePass(getTView(), 'Expecting to be called in first template pass only');
    var styles = tNode.styles;
    var classes = tNode.classes;
    var mode = 0;
    for (var i = 0; i < attrs.length; i++) {
        var value = attrs[i];
        if (typeof value === 'number') {
            mode = value;
        }
        else if (mode == 1 /* Classes */) {
            classes = concatStringsWithSpace(classes, value);
        }
        else if (mode == 2 /* Styles */) {
            var style = value;
            var styleValue = attrs[++i];
            styles = concatStringsWithSpace(styles, style + ': ' + styleValue + ';');
        }
    }
    styles !== null && (tNode.styles = styles);
    classes !== null && (tNode.classes = classes);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _symbolIterator = null;
function getSymbolIterator$1() {
    if (!_symbolIterator) {
        var Symbol_1 = _global['Symbol'];
        if (Symbol_1 && Symbol_1.iterator) {
            _symbolIterator = Symbol_1.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// JS has NaN !== NaN
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function devModeEqual$1(a, b) {
    var isListLikeIterableA = isListLikeIterable$1(a);
    var isListLikeIterableB = isListLikeIterable$1(b);
    if (isListLikeIterableA && isListLikeIterableB) {
        return areIterablesEqual$1(a, b, devModeEqual$1);
    }
    else {
        var isAObject = a && (typeof a === 'object' || typeof a === 'function');
        var isBObject = b && (typeof b === 'object' || typeof b === 'function');
        if (!isListLikeIterableA && isAObject && !isListLikeIterableB && isBObject) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
}
/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the
 * reference has not changed.
 *
 * Wrapped values are unwrapped automatically during the change detection, and the unwrapped value
 * is stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 *
 * @publicApi
 */
var WrappedValue = /** @class */ /*@__PURE__*/ (function () {
    function WrappedValue(value) {
        this.wrapped = value;
    }
    /** Creates a wrapped value. */
    WrappedValue.wrap = function (value) { return new WrappedValue(value); };
    /**
     * Returns the underlying value of a wrapped value.
     * Returns the given `value` when it is not wrapped.
     **/
    WrappedValue.unwrap = function (value) { return WrappedValue.isWrapped(value) ? value.wrapped : value; };
    /** Returns true if `value` is a wrapped value. */
    WrappedValue.isWrapped = function (value) { return value instanceof WrappedValue; };
    return WrappedValue;
}());
function isListLikeIterable$1(obj) {
    if (!isJsObject$1(obj))
        return false;
    return Array.isArray(obj) ||
        (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
            getSymbolIterator$1() in obj); // JS Iterable have a Symbol.iterator prop
}
function areIterablesEqual$1(a, b, comparator) {
    var iterator1 = a[getSymbolIterator$1()]();
    var iterator2 = b[getSymbolIterator$1()]();
    while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
function iterateListLike$1(obj, fn) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[getSymbolIterator$1()]();
        var item = void 0;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
function isJsObject$1(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * Updates binding if changed, then returns whether it was updated.
 *
 * This function also checks the `CheckNoChangesMode` and throws if changes are made.
 * Some changes (Objects/iterables) during `CheckNoChangesMode` are exempt to comply with VE
 * behavior.
 *
 * @param lView current `LView`
 * @param bindingIndex The binding in the `LView` to check
 * @param value New value to check against `lView[bindingIndex]`
 * @returns `true` if the bindings has changed. (Throws if binding has changed during
 *          `CheckNoChangesMode`)
 */
function bindingUpdated(lView, bindingIndex, value) {
    ngDevMode && assertNotSame(value, NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
    ngDevMode &&
        assertLessThan(bindingIndex, lView.length, "Slot should have been initialized to NO_CHANGE");
    var oldValue = lView[bindingIndex];
    if (Object.is(oldValue, value)) {
        return false;
    }
    else {
        if (ngDevMode && getCheckNoChangesMode()) {
            // View engine didn't report undefined values as changed on the first checkNoChanges pass
            // (before the change detection was run).
            var oldValueToCompare = oldValue !== NO_CHANGE ? oldValue : undefined;
            if (!devModeEqual$1(oldValueToCompare, value)) {
                var details = getExpressionChangedErrorDetails(lView, bindingIndex, oldValueToCompare, value);
                throwErrorIfNoChangesMode(oldValue === NO_CHANGE, details.oldValue, details.newValue, details.propName);
            }
            // There was a change, but the `devModeEqual` decided that the change is exempt from an error.
            // For this reason we exit as if no change. The early exit is needed to prevent the changed
            // value to be written into `LView` (If we would write the new value that we would not see it
            // as change on next CD.)
            return false;
        }
        lView[bindingIndex] = value;
        return true;
    }
}
/**
 * Creates an interpolation binding with 1 expression.
 *
 * @param prefix static value used for concatenation only.
 * @param v0 value checked for change.
 * @param suffix static value used for concatenation only.
 */
function interpolation1(lView, prefix, v0, suffix) {
    var different = bindingUpdated(lView, nextBindingIndex(), v0);
    return different ? prefix + renderStringify(v0) + suffix : NO_CHANGE;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Synchronously perform change detection on a component (and possibly its sub-components).
 *
 * This function triggers change detection in a synchronous way on a component.
 *
 * @param component The component which the change detection should be performed on.
 */
function detectChanges(component) {
    var view = getComponentViewByInstance(component);
    detectChangesInternal(view[TVIEW], view, component);
}
/**
 * Marks the component as dirty (needing change detection). Marking a component dirty will
 * schedule a change detection on it at some point in the future.
 *
 * Marking an already dirty component as dirty won't do anything. Only one outstanding change
 * detection can be scheduled per component tree.
 *
 * @param component Component to mark as dirty.
 */
function markDirty(component) {
    ngDevMode && assertDefined(component, 'component');
    var rootView = markViewDirty(getComponentViewByInstance(component));
    ngDevMode && assertDefined(rootView[CONTEXT], 'rootContext should be defined');
    scheduleTick(rootView[CONTEXT], 1 /* DetectChanges */);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Determine if the argument is shaped like a Promise
 */
function isPromise$1(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is an Observable
 */
function isObservable$1(obj) {
    // TODO: use isObservable once we update pass rxjs 6.1
    // https://github.com/ReactiveX/rxjs/blob/master/CHANGELOG.md#610-2018-05-03
    return !!obj && typeof obj.subscribe === 'function';
}
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
/**
 * This file contains reuseable "empty" symbols that can be used as default return values
 * in different parts of the rendering code. Because the same symbols are returned, this
 * allows for identity checks against these values to be consistently used by the framework
 * code.
 */
var EMPTY_OBJ$1 = {};
var EMPTY_ARRAY$3 = [];
// freezing the values prevents any code from accidentally inserting new values in
if ((typeof ngDevMode === 'undefined' || ngDevMode) && /*@__PURE__*/ initNgDevMode()) {
    // These property accesses can be ignored because ngDevMode will be set to false
    // when optimizing code and the whole if statement will be dropped.
    // tslint:disable-next-line:no-toplevel-property-access
    /*@__PURE__*/ Object.freeze(EMPTY_OBJ$1);
    // tslint:disable-next-line:no-toplevel-property-access
    /*@__PURE__*/ Object.freeze(EMPTY_ARRAY$3);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Create static text node
 *
 * @param index Index of the node in the data array
 * @param value Static string value to write.
 *
 * @codeGenApi
 */
function ɵɵtext(index, value) {
    if (value === void 0) {
        value = '';
    }
    var lView = getLView();
    var tView = getTView();
    var adjustedIndex = index + HEADER_OFFSET;
    ngDevMode && assertEqual(getBindingIndex(), tView.bindingStartIndex, 'text nodes should be created before any bindings');
    ngDevMode && assertDataInRange(lView, adjustedIndex);
    var tNode = tView.firstCreatePass ?
        getOrCreateTNode(tView, lView[T_HOST], index, 3 /* Element */, null, null) :
        tView.data[adjustedIndex];
    var textNative = lView[adjustedIndex] = createTextNode(value, lView[RENDERER]);
    appendChild(tView, lView, textNative, tNode);
    // Text nodes are self closing.
    setPreviousOrParentTNode(tNode, false);
}
/**
 *
 * Update text content with single bound value surrounded by other text.
 *
 * Used when a text node has 1 interpolated value in it:
 *
 * ```html
 * <div>prefix{{v0}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate1('prefix', v0, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate1(prefix, v0, suffix) {
    var lView = getLView();
    var interpolated = interpolation1(lView, prefix, v0, suffix);
    if (interpolated !== NO_CHANGE) {
        textBindingInternal(lView, getSelectedIndex(), interpolated);
    }
    return ɵɵtextInterpolate1;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Retrieves the component instance associated with a given DOM element.
 *
 * @usageNotes
 * Given the following DOM structure:
 * ```html
 * <my-app>
 *   <div>
 *     <child-comp></child-comp>
 *   </div>
 * </my-app>
 * ```
 * Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
 * associated with this DOM element.
 *
 * Calling the function on `<my-app>` will return the `MyApp` instance.
 *
 *
 * @param element DOM element from which the component should be retrieved.
 * @returns Component instance associated with the element or `null` if there
 *    is no component associated with it.
 *
 * @publicApi
 * @globalApi ng
 */
function getComponent(element) {
    assertDomElement(element);
    var context = loadLContext(element, false);
    if (context === null)
        return null;
    if (context.component === undefined) {
        context.component = getComponentAtNodeIndex(context.nodeIndex, context.lView);
    }
    return context.component;
}
/**
 * If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
 * view that the element is part of. Otherwise retrieves the instance of the component whose view
 * owns the element (in this case, the result is the same as calling `getOwningComponent`).
 *
 * @param element Element for which to get the surrounding component instance.
 * @returns Instance of the component that is around the element or null if the element isn't
 *    inside any component.
 *
 * @publicApi
 * @globalApi ng
 */
function getContext(element) {
    assertDomElement(element);
    var context = loadLContext(element, false);
    return context === null ? null : context.lView[CONTEXT];
}
/**
 * Retrieves the component instance whose view contains the DOM element.
 *
 * For example, if `<child-comp>` is used in the template of `<app-comp>`
 * (i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
 * would return `<app-comp>`.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Component instance whose view owns the DOM element or null if the element is not
 *    part of a component view.
 *
 * @publicApi
 * @globalApi ng
 */
function getOwningComponent(elementOrDir) {
    var context = loadLContext(elementOrDir, false);
    if (context === null)
        return null;
    var lView = context.lView;
    var parent;
    ngDevMode && assertLView(lView);
    while (lView[HOST] === null && (parent = getLViewParent(lView))) {
        // As long as lView[HOST] is null we know we are part of sub-template such as `*ngIf`
        lView = parent;
    }
    return lView[FLAGS] & 512 /* IsRoot */ ? null : lView[CONTEXT];
}
/**
 * Retrieves all root components associated with a DOM element, directive or component instance.
 * Root components are those which have been bootstrapped by Angular.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Root components associated with the target object.
 *
 * @publicApi
 * @globalApi ng
 */
function getRootComponents(elementOrDir) {
    return __spread(getRootContext(elementOrDir).components);
}
/**
 * Retrieves an `Injector` associated with an element, component or directive instance.
 *
 * @param elementOrDir DOM element, component or directive instance for which to
 *    retrieve the injector.
 * @returns Injector associated with the element, component or directive instance.
 *
 * @publicApi
 * @globalApi ng
 */
function getInjector(elementOrDir) {
    var context = loadLContext(elementOrDir, false);
    if (context === null)
        return Injector.NULL;
    var tNode = context.lView[TVIEW].data[context.nodeIndex];
    return new NodeInjector(tNode, context.lView);
}
/**
 * Retrieve a set of injection tokens at a given DOM node.
 *
 * @param element Element for which the injection tokens should be retrieved.
 */
function getInjectionTokens(element) {
    var context = loadLContext(element, false);
    if (context === null)
        return [];
    var lView = context.lView;
    var tView = lView[TVIEW];
    var tNode = tView.data[context.nodeIndex];
    var providerTokens = [];
    var startIndex = tNode.providerIndexes & 65535;
    var endIndex = tNode.directiveEnd;
    for (var i = startIndex; i < endIndex; i++) {
        var value = tView.data[i];
        if (isDirectiveDefHack(value)) {
            // The fact that we sometimes store Type and sometimes DirectiveDef in this location is a
            // design flaw.  We should always store same type so that we can be monomorphic. The issue
            // is that for Components/Directives we store the def instead the type. The correct behavior
            // is that we should always be storing injectable type in this location.
            value = value.type;
        }
        providerTokens.push(value);
    }
    return providerTokens;
}
/**
 * Retrieves directive instances associated with a given DOM element. Does not include
 * component instances.
 *
 * @usageNotes
 * Given the following DOM structure:
 * ```
 * <my-app>
 *   <button my-button></button>
 *   <my-comp></my-comp>
 * </my-app>
 * ```
 * Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
 * directive that is associated with the DOM element.
 *
 * Calling `getDirectives` on `<my-comp>` will return an empty array.
 *
 * @param element DOM element for which to get the directives.
 * @returns Array of directives associated with the element.
 *
 * @publicApi
 * @globalApi ng
 */
function getDirectives(element) {
    var context = loadLContext(element);
    if (context.directives === undefined) {
        context.directives = getDirectivesAtNodeIndex(context.nodeIndex, context.lView, false);
    }
    // The `directives` in this case are a named array called `LComponentView`. Clone the
    // result so we don't expose an internal data structure in the user's console.
    return context.directives === null ? [] : __spread(context.directives);
}
function loadLContext(target, throwOnNotFound) {
    if (throwOnNotFound === void 0) {
        throwOnNotFound = true;
    }
    var context = getLContext(target);
    if (!context && throwOnNotFound) {
        throw new Error(ngDevMode ? "Unable to find context associated with " + stringifyForError(target) :
            'Invalid ng target');
    }
    return context;
}
/**
 * Retrieve map of local references.
 *
 * The references are retrieved as a map of local reference name to element or directive instance.
 *
 * @param target DOM element, component or directive instance for which to retrieve
 *    the local references.
 */
function getLocalRefs(target) {
    var context = loadLContext(target, false);
    if (context === null)
        return {};
    if (context.localRefs === undefined) {
        context.localRefs = discoverLocalRefs(context.lView, context.nodeIndex);
    }
    return context.localRefs || {};
}
/**
 * Retrieves the host element of a component or directive instance.
 * The host element is the DOM element that matched the selector of the directive.
 *
 * @param componentOrDirective Component or directive instance for which the host
 *     element should be retrieved.
 * @returns Host element of the target.
 *
 * @publicApi
 * @globalApi ng
 */
function getHostElement(componentOrDirective) {
    return getLContext(componentOrDirective).native;
}
/**
 * Retrieves a list of event listeners associated with a DOM element. The list does include host
 * listeners, but it does not include event listeners defined outside of the Angular context
 * (e.g. through `addEventListener`).
 *
 * @usageNotes
 * Given the following DOM structure:
 * ```
 * <my-app>
 *   <div (click)="doSomething()"></div>
 * </my-app>
 *
 * ```
 * Calling `getListeners` on `<div>` will return an object that looks as follows:
 * ```
 * {
 *   name: 'click',
 *   element: <div>,
 *   callback: () => doSomething(),
 *   useCapture: false
 * }
 * ```
 *
 * @param element Element for which the DOM listeners should be retrieved.
 * @returns Array of event listeners on the DOM element.
 *
 * @publicApi
 * @globalApi ng
 */
function getListeners(element) {
    assertDomElement(element);
    var lContext = loadLContext(element, false);
    if (lContext === null)
        return [];
    var lView = lContext.lView;
    var tView = lView[TVIEW];
    var lCleanup = lView[CLEANUP];
    var tCleanup = tView.cleanup;
    var listeners = [];
    if (tCleanup && lCleanup) {
        for (var i = 0; i < tCleanup.length;) {
            var firstParam = tCleanup[i++];
            var secondParam = tCleanup[i++];
            if (typeof firstParam === 'string') {
                var name_1 = firstParam;
                var listenerElement = unwrapRNode(lView[secondParam]);
                var callback = lCleanup[tCleanup[i++]];
                var useCaptureOrIndx = tCleanup[i++];
                // if useCaptureOrIndx is boolean then report it as is.
                // if useCaptureOrIndx is positive number then it in unsubscribe method
                // if useCaptureOrIndx is negative number then it is a Subscription
                var type = (typeof useCaptureOrIndx === 'boolean' || useCaptureOrIndx >= 0) ? 'dom' : 'output';
                var useCapture = typeof useCaptureOrIndx === 'boolean' ? useCaptureOrIndx : false;
                if (element == listenerElement) {
                    listeners.push({ element: element, name: name_1, callback: callback, useCapture: useCapture, type: type });
                }
            }
        }
    }
    listeners.sort(sortListeners);
    return listeners;
}
function sortListeners(a, b) {
    if (a.name == b.name)
        return 0;
    return a.name < b.name ? -1 : 1;
}
/**
 * This function should not exist because it is megamorphic and only mostly correct.
 *
 * See call site for more info.
 */
function isDirectiveDefHack(obj) {
    return obj.type !== undefined && obj.template !== undefined && obj.declaredInputs !== undefined;
}
/** Asserts that a value is a DOM Element. */
function assertDomElement(value) {
    if (typeof Element !== 'undefined' && !(value instanceof Element)) {
        throw new Error('Expecting instance of DOM Element');
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Marks a component for check (in case of OnPush components) and synchronously
 * performs change detection on the application this component belongs to.
 *
 * @param component Component to {@link ChangeDetectorRef#markForCheck mark for check}.
 *
 * @publicApi
 * @globalApi ng
 */
function applyChanges(component) {
    markDirty(component);
    getRootComponents(component).forEach(function (rootComponent) { return detectChanges(rootComponent); });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This file introduces series of globally accessible debug tools
 * to allow for the Angular debugging story to function.
 *
 * To see this in action run the following command:
 *
 *   bazel run --config=ivy
 *   //packages/core/test/bundling/todo:devserver
 *
 *  Then load `localhost:5432` and start using the console tools.
 */
/**
 * This value reflects the property on the window where the dev
 * tools are patched (window.ng).
 * */
var GLOBAL_PUBLISH_EXPANDO_KEY = 'ng';
var _published = false;
/**
 * Publishes a collection of default debug tools onto`window.ng`.
 *
 * These functions are available globally when Angular is in development
 * mode and are automatically stripped away from prod mode is on.
 */
function publishDefaultGlobalUtils() {
    if (!_published) {
        _published = true;
        publishGlobalUtil('getComponent', getComponent);
        publishGlobalUtil('getContext', getContext);
        publishGlobalUtil('getListeners', getListeners);
        publishGlobalUtil('getOwningComponent', getOwningComponent);
        publishGlobalUtil('getHostElement', getHostElement);
        publishGlobalUtil('getInjector', getInjector);
        publishGlobalUtil('getRootComponents', getRootComponents);
        publishGlobalUtil('getDirectives', getDirectives);
        publishGlobalUtil('applyChanges', applyChanges);
    }
}
/**
 * Publishes the given function to `window.ng` so that it can be
 * used from the browser console when an application is not in production.
 */
function publishGlobalUtil(name, fn) {
    if (typeof COMPILED === 'undefined' || !COMPILED) {
        // Note: we can't export `ng` when using closure enhanced optimization as:
        // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
        // - we can't declare a closure extern as the namespace `ng` is already used within Google
        //   for typings for AngularJS (via `goog.provide('ng....')`).
        var w = _global;
        ngDevMode && assertDefined(fn, 'function not defined');
        if (w) {
            var container = w[GLOBAL_PUBLISH_EXPANDO_KEY];
            if (!container) {
                container = w[GLOBAL_PUBLISH_EXPANDO_KEY] = {};
            }
            container[name] = fn;
        }
    }
}
/**
 * Bootstraps a Component into an existing host element and returns an instance
 * of the component.
 *
 * Use this function to bootstrap a component into the DOM tree. Each invocation
 * of this function will create a separate tree of components, injectors and
 * change detection cycles and lifetimes. To dynamically insert a new component
 * into an existing tree such that it shares the same injection, change detection
 * and object lifetime, use {@link ViewContainer#createComponent}.
 *
 * @param componentType Component to bootstrap
 * @param options Optional parameters which control bootstrapping
 */
function renderComponent$1(componentType /* Type as workaround for: Microsoft/TypeScript/issues/4881 */, opts) {
    if (opts === void 0) {
        opts = {};
    }
    ngDevMode && publishDefaultGlobalUtils();
    ngDevMode && assertComponentType(componentType);
    var rendererFactory = opts.rendererFactory || domRendererFactory3;
    var sanitizer = opts.sanitizer || null;
    var componentDef = getComponentDef(componentType);
    if (componentDef.type != componentType)
        componentDef.type = componentType;
    // The first index of the first selector is the tag name.
    var componentTag = componentDef.selectors[0][0];
    var hostRenderer = rendererFactory.createRenderer(null, null);
    var hostRNode = locateHostElement(hostRenderer, opts.host || componentTag, componentDef.encapsulation);
    var rootFlags = componentDef.onPush ? 64 /* Dirty */ | 512 /* IsRoot */ :
        16 /* CheckAlways */ | 512;
    var rootContext = createRootContext(opts.scheduler, opts.playerHandler);
    var renderer = rendererFactory.createRenderer(hostRNode, componentDef);
    var rootTView = createTView(0 /* Root */, -1, null, 1, 0, null, null, null, null, null);
    var rootView = createLView(null, rootTView, rootContext, rootFlags, null, null, rendererFactory, renderer, undefined, opts.injector || null);
    enterView(rootView, null);
    var component;
    try {
        if (rendererFactory.begin)
            rendererFactory.begin();
        var componentView = createRootComponentView(hostRNode, componentDef, rootView, rendererFactory, renderer, sanitizer);
        component = createRootComponent(componentView, componentDef, rootView, rootContext, opts.hostFeatures || null);
        // create mode pass
        renderView(rootTView, rootView, null);
        // update mode pass
        refreshView(rootTView, rootView, null, null);
    }
    finally {
        leaveView();
        if (rendererFactory.end)
            rendererFactory.end();
    }
    return component;
}
/**
 * Creates the root component view and the root component node.
 *
 * @param rNode Render host element.
 * @param def ComponentDef
 * @param rootView The parent view where the host node is stored
 * @param hostRenderer The current renderer
 * @param sanitizer The sanitizer, if provided
 *
 * @returns Component view created
 */
function createRootComponentView(rNode, def, rootView, rendererFactory, hostRenderer, sanitizer) {
    var tView = rootView[TVIEW];
    ngDevMode && assertDataInRange(rootView, 0 + HEADER_OFFSET);
    rootView[0 + HEADER_OFFSET] = rNode;
    var tNode = getOrCreateTNode(tView, null, 0, 3 /* Element */, null, null);
    var mergedAttrs = tNode.mergedAttrs = def.hostAttrs;
    if (mergedAttrs !== null) {
        computeStaticStyling(tNode, mergedAttrs);
        if (rNode !== null) {
            setUpAttributes(hostRenderer, rNode, mergedAttrs);
            if (tNode.classes !== null) {
                writeDirectClass(hostRenderer, rNode, tNode.classes);
            }
            if (tNode.styles !== null) {
                writeDirectStyle(hostRenderer, rNode, tNode.styles);
            }
        }
    }
    var viewRenderer = rendererFactory.createRenderer(rNode, def);
    var componentView = createLView(rootView, getOrCreateTComponentView(def), null, def.onPush ? 64 /* Dirty */ : 16 /* CheckAlways */, rootView[HEADER_OFFSET], tNode, rendererFactory, viewRenderer, sanitizer);
    if (tView.firstCreatePass) {
        diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), tView, def.type);
        markAsComponentHost(tView, tNode);
        initTNodeFlags(tNode, rootView.length, 1);
    }
    addToViewTree(rootView, componentView);
    // Store component view at node index, with node as the HOST
    return rootView[HEADER_OFFSET] = componentView;
}
/**
 * Creates a root component and sets it up with features and host bindings. Shared by
 * renderComponent() and ViewContainerRef.createComponent().
 */
function createRootComponent(componentView, componentDef, rootLView, rootContext, hostFeatures) {
    var tView = rootLView[TVIEW];
    // Create directive instance with factory() and store at next index in viewData
    var component = instantiateRootComponent(tView, rootLView, componentDef);
    rootContext.components.push(component);
    componentView[CONTEXT] = component;
    hostFeatures && hostFeatures.forEach(function (feature) { return feature(component, componentDef); });
    // We want to generate an empty QueryList for root content queries for backwards
    // compatibility with ViewEngine.
    if (componentDef.contentQueries) {
        componentDef.contentQueries(1 /* Create */, component, rootLView.length - 1);
    }
    var rootTNode = getPreviousOrParentTNode();
    if (tView.firstCreatePass &&
        (componentDef.hostBindings !== null || componentDef.hostAttrs !== null)) {
        var elementIndex = rootTNode.index - HEADER_OFFSET;
        setSelectedIndex(elementIndex);
        var rootTView = rootLView[TVIEW];
        addHostBindingsToExpandoInstructions(rootTView, componentDef);
        growHostVarsSpace(rootTView, rootLView, componentDef.hostVars);
        invokeHostBindingsInCreationMode(componentDef, component);
    }
    return component;
}
function createRootContext(scheduler, playerHandler) {
    return {
        components: [],
        scheduler: scheduler || defaultScheduler,
        clean: CLEAN_PROMISE,
        playerHandler: playerHandler || null,
        flags: 0 /* Empty */
    };
}
/**
 * Used to enable lifecycle hooks on the root component.
 *
 * Include this feature when calling `renderComponent` if the root component
 * you are rendering has lifecycle hooks defined. Otherwise, the hooks won't
 * be called properly.
 *
 * Example:
 *
 * ```
 * renderComponent(AppComponent, {hostFeatures: [LifecycleHooksFeature]});
 * ```
 */
function LifecycleHooksFeature(component, def) {
    var rootTView = readPatchedLView(component)[TVIEW];
    var dirIndex = rootTView.data.length - 1;
    // TODO(misko): replace `as TNode` with createTNode call. (needs refactoring to lose dep on
    // LNode).
    registerPostOrderHooks(rootTView, { directiveStart: dirIndex, directiveEnd: dirIndex + 1 });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents a basic change from a previous to a new value for a single
 * property on a directive instance. Passed as a value in a
 * {@link SimpleChanges} object to the `ngOnChanges` hook.
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
var SimpleChange = /** @class */ /*@__PURE__*/ (function () {
    function SimpleChange(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.firstChange; };
    return SimpleChange;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents a component created by a `ComponentFactory`.
 * Provides access to the component instance and related objects,
 * and provides the means of destroying the instance.
 *
 * @publicApi
 */
var ComponentRef = /** @class */ /*@__PURE__*/ (function () {
    function ComponentRef() {
    }
    return ComponentRef;
}());
/**
 * Base class for a factory that can create a component dynamically.
 * Instantiate a factory for a given type of component with `resolveComponentFactory()`.
 * Use the resulting `ComponentFactory.create()` method to create a component of that type.
 *
 * @see [Dynamic Components](guide/dynamic-component-loader)
 *
 * @publicApi
 */
var ComponentFactory = /** @class */ /*@__PURE__*/ (function () {
    function ComponentFactory() {
    }
    return ComponentFactory;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function noComponentFactoryError(component) {
    var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
    error[ERROR_COMPONENT] = component;
    return error;
}
var ERROR_COMPONENT = 'ngComponent';
var _NullComponentFactoryResolver = /** @class */ /*@__PURE__*/ (function () {
    function _NullComponentFactoryResolver() {
    }
    _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        throw noComponentFactoryError(component);
    };
    return _NullComponentFactoryResolver;
}());
/**
 * A simple registry that maps `Components` to generated `ComponentFactory` classes
 * that can be used to create instances of components.
 * Use to obtain the factory for a given component type,
 * then use the factory's `create()` method to create a component of that type.
 *
 * @see [Dynamic Components](guide/dynamic-component-loader)
 * @publicApi
 */
var ComponentFactoryResolver = /** @class */ /*@__PURE__*/ (function () {
    function ComponentFactoryResolver() {
    }
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    return ComponentFactoryResolver;
}());
var ComponentFactoryBoundToModule = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentFactoryBoundToModule, _super);
    function ComponentFactoryBoundToModule(factory, ngModule) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.ngModule = ngModule;
        _this.selector = factory.selector;
        _this.componentType = factory.componentType;
        _this.ngContentSelectors = factory.ngContentSelectors;
        _this.inputs = factory.inputs;
        _this.outputs = factory.outputs;
        return _this;
    }
    ComponentFactoryBoundToModule.prototype.create = function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
    };
    return ComponentFactoryBoundToModule;
}(ComponentFactory));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function noop$1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Do nothing.
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
// Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
// i.e. users have to ask for what they need. With that, we can build better analysis tools
// and could do better codegen in the future.
var ElementRef = /** @class */ /*@__PURE__*/ (function () {
    function ElementRef(nativeElement) {
        this.nativeElement = nativeElement;
    }
    /**
     * @internal
     * @nocollapse
     */
    ElementRef.__NG_ELEMENT_ID__ = function () { return SWITCH_ELEMENT_REF_FACTORY(ElementRef); };
    return ElementRef;
}());
var SWITCH_ELEMENT_REF_FACTORY__PRE_R3__ = noop$1;
var SWITCH_ELEMENT_REF_FACTORY = SWITCH_ELEMENT_REF_FACTORY__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Renderer2Interceptor = /*@__PURE__*/ new InjectionToken('Renderer2Interceptor');
/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * @publicApi
 */
var RendererFactory2 = /** @class */ /*@__PURE__*/ (function () {
    function RendererFactory2() {
    }
    return RendererFactory2;
}());
/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
var RendererStyleFlags2 = /*@__PURE__*/ (function (RendererStyleFlags2) {
    // TODO(misko): This needs to be refactored into a separate file so that it can be imported from
    // `node_manipulation.ts` Currently doing the import cause resolution order to change and fails
    // the tests. The work around is to have hard coded value in `node_manipulation.ts` for now.
    /**
     * Marks a style as important.
     */
    RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
    return RendererStyleFlags2;
})({});
/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * @publicApi
 */
var Renderer2 = /** @class */ /*@__PURE__*/ (function () {
    function Renderer2() {
    }
    /**
     * @internal
     * @nocollapse
     */
    Renderer2.__NG_ELEMENT_ID__ = function () { return SWITCH_RENDERER2_FACTORY(); };
    return Renderer2;
}());
var SWITCH_RENDERER2_FACTORY__PRE_R3__ = noop$1;
var SWITCH_RENDERER2_FACTORY = SWITCH_RENDERER2_FACTORY__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * @publicApi
 */
var Sanitizer = /** @class */ /*@__PURE__*/ (function () {
    function Sanitizer() {
    }
    /** @nocollapse */
    Sanitizer.ɵprov = ɵɵdefineInjectable({
        token: Sanitizer,
        providedIn: 'root',
        factory: function () { return null; },
    });
    return Sanitizer;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description Represents the version of Angular
 *
 * @publicApi
 */
var Version = /** @class */ /*@__PURE__*/ (function () {
    function Version(full) {
        this.full = full;
        this.major = full.split('.')[0];
        this.minor = full.split('.')[1];
        this.patch = full.split('.').slice(2).join('.');
    }
    return Version;
}());
/**
 * @publicApi
 */
var VERSION = /*@__PURE__*/ new Version('9.0.2');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DefaultIterableDifferFactory = /** @class */ /*@__PURE__*/ (function () {
    function DefaultIterableDifferFactory() {
    }
    DefaultIterableDifferFactory.prototype.supports = function (obj) { return isListLikeIterable$1(obj); };
    DefaultIterableDifferFactory.prototype.create = function (trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
    };
    return DefaultIterableDifferFactory;
}());
var trackByIdentity = function (index, item) { return item; };
/**
 * @deprecated v4.0.0 - Should not be part of public API.
 * @publicApi
 */
var DefaultIterableDiffer = /** @class */ /*@__PURE__*/ (function () {
    function DefaultIterableDiffer(trackByFn) {
        this.length = 0;
        // Keeps track of the used records at any point in time (during & across `_check()` calls)
        this._linkedRecords = null;
        // Keeps track of the removed records at any point in time during `_check()` calls.
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        // Keeps track of records where custom track by is the same, but item identity has changed
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = trackByFn || trackByIdentity;
    }
    DefaultIterableDiffer.prototype.forEachItem = function (fn) {
        var record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachOperation = function (fn) {
        var nextIt = this._itHead;
        var nextRemove = this._removalsHead;
        var addRemoveOffset = 0;
        var moveOffsets = null;
        while (nextIt || nextRemove) {
            // Figure out which is the next record to process
            // Order: remove, add, move
            var record = !nextRemove ||
                nextIt &&
                    nextIt.currentIndex <
                        getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                nextIt :
                nextRemove;
            var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
            var currentIndex = record.currentIndex;
            // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
            if (record === nextRemove) {
                addRemoveOffset--;
                nextRemove = nextRemove._nextRemoved;
            }
            else {
                nextIt = nextIt._next;
                if (record.previousIndex == null) {
                    addRemoveOffset++;
                }
                else {
                    // INVARIANT:  currentIndex < previousIndex
                    if (!moveOffsets)
                        moveOffsets = [];
                    var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                    var localCurrentIndex = currentIndex - addRemoveOffset;
                    if (localMovePreviousIndex != localCurrentIndex) {
                        for (var i = 0; i < localMovePreviousIndex; i++) {
                            var offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                            var index = offset + i;
                            if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                moveOffsets[i] = offset + 1;
                            }
                        }
                        var previousIndex = record.previousIndex;
                        moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                    }
                }
            }
            if (adjPreviousIndex !== currentIndex) {
                fn(record, adjPreviousIndex, currentIndex);
            }
        }
    };
    DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
        var record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
        var record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
        var record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.diff = function (collection) {
        if (collection == null)
            collection = [];
        if (!isListLikeIterable$1(collection)) {
            throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    };
    DefaultIterableDiffer.prototype.onDestroy = function () { };
    DefaultIterableDiffer.prototype.check = function (collection) {
        var _this = this;
        this._reset();
        var record = this._itHead;
        var mayBeDirty = false;
        var index;
        var item;
        var itemTrackBy;
        if (Array.isArray(collection)) {
            this.length = collection.length;
            for (var index_1 = 0; index_1 < this.length; index_1++) {
                item = collection[index_1];
                itemTrackBy = this._trackByFn(index_1, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index_1);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index_1);
                    }
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            iterateListLike$1(collection, function (item) {
                itemTrackBy = _this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = _this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        _this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            this.length = index;
        }
        this._truncate(record);
        this.collection = collection;
        return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
        /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
         * changes.
         */
        get: function () {
            return this._additionsHead !== null || this._movesHead !== null ||
                this._removalsHead !== null || this._identityChangesHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var record = void 0;
            var nextRecord = void 0;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
            // TODO(vicb): when assert gets supported
            // assert(!this.isDirty);
        }
    };
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
        // The previous record after which we will append the current one.
        var previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    };
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
        var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, record._prev, index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    };
    /**
     * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
     *
     * - `record` The first excess {@link IterableChangeRecord_}.
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._truncate = function (record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            var nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    };
    /** @internal */
    DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // TODO(vicb):
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // TODO(vicb):
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
        // TODO(vicb):
        // assert(record != prevRecord);
        // assert(record._next === null);
        // assert(record._prev === null);
        var next = prevRecord === null ? this._itHead : prevRecord._next;
        // TODO(vicb):
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._remove = function (record) {
        return this._addToRemovals(this._unlink(record));
    };
    /** @internal */
    DefaultIterableDiffer.prototype._unlink = function (record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        var prev = record._prev;
        var next = record._next;
        // TODO(vicb):
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
        // TODO(vicb):
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // TODO(vicb):
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // TODO(vicb):
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    };
    DefaultIterableDiffer.prototype._addToRemovals = function (record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // TODO(vicb):
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // TODO(vicb):
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    };
    return DefaultIterableDiffer;
}());
var IterableChangeRecord_ = /** @class */ /*@__PURE__*/ (function () {
    function IterableChangeRecord_(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prevDup = null;
        /** @internal */
        this._nextDup = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextMoved = null;
        /** @internal */
        this._nextIdentityChange = null;
    }
    return IterableChangeRecord_;
}());
// A linked list of CollectionChangeRecords with the same IterableChangeRecord_.item
var _DuplicateItemRecordList = /** @class */ /*@__PURE__*/ (function () {
    function _DuplicateItemRecordList() {
        /** @internal */
        this._head = null;
        /** @internal */
        this._tail = null;
    }
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     */
    _DuplicateItemRecordList.prototype.add = function (record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            // TODO(vicb):
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    };
    // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
    // IterableChangeRecord_.currentIndex >= atOrAfterIndex
    _DuplicateItemRecordList.prototype.get = function (trackById, atOrAfterIndex) {
        var record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex) &&
                looseIdentical(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    };
    /**
     * Remove one {@link IterableChangeRecord_} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     */
    _DuplicateItemRecordList.prototype.remove = function (record) {
        // TODO(vicb):
        // assert(() {
        //  // verify that the record being removed is in the list.
        //  for (IterableChangeRecord_ cursor = _head; cursor != null; cursor = cursor._nextDup) {
        //    if (identical(cursor, record)) return true;
        //  }
        //  return false;
        //});
        var prev = record._prevDup;
        var next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    };
    return _DuplicateItemRecordList;
}());
var _DuplicateMap = /** @class */ /*@__PURE__*/ (function () {
    function _DuplicateMap() {
        this.map = new Map();
    }
    _DuplicateMap.prototype.put = function (record) {
        var key = record.trackById;
        var duplicates = this.map.get(key);
        if (!duplicates) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    };
    /**
     * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
     * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the second `a`.
     */
    _DuplicateMap.prototype.get = function (trackById, atOrAfterIndex) {
        var key = trackById;
        var recordList = this.map.get(key);
        return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
    };
    /**
     * Removes a {@link IterableChangeRecord_} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     */
    _DuplicateMap.prototype.remove = function (record) {
        var key = record.trackById;
        var recordList = this.map.get(key);
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
        get: function () { return this.map.size === 0; },
        enumerable: true,
        configurable: true
    });
    _DuplicateMap.prototype.clear = function () { this.map.clear(); };
    return _DuplicateMap;
}());
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
    var previousIndex = item.previousIndex;
    if (previousIndex === null)
        return previousIndex;
    var moveOffset = 0;
    if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
    }
    return previousIndex + addRemoveOffset + moveOffset;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DefaultKeyValueDifferFactory = /** @class */ /*@__PURE__*/ (function () {
    function DefaultKeyValueDifferFactory() {
    }
    DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || isJsObject$1(obj); };
    DefaultKeyValueDifferFactory.prototype.create = function () { return new DefaultKeyValueDiffer(); };
    return DefaultKeyValueDifferFactory;
}());
var DefaultKeyValueDiffer = /** @class */ /*@__PURE__*/ (function () {
    function DefaultKeyValueDiffer() {
        this._records = new Map();
        this._mapHead = null;
        // _appendAfter is used in the check loop
        this._appendAfter = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
        get: function () {
            return this._additionsHead !== null || this._changesHead !== null ||
                this._removalsHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
        var record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
        var record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.diff = function (map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || isJsObject$1(map))) {
            throw new Error("Error trying to diff '" + stringify(map) + "'. Only maps and objects are allowed");
        }
        return this.check(map) ? this : null;
    };
    DefaultKeyValueDiffer.prototype.onDestroy = function () { };
    /**
     * Check the current state of the map vs the previous.
     * The algorithm is optimised for when the keys do no change.
     */
    DefaultKeyValueDiffer.prototype.check = function (map) {
        var _this = this;
        this._reset();
        var insertBefore = this._mapHead;
        this._appendAfter = null;
        this._forEach(map, function (value, key) {
            if (insertBefore && insertBefore.key === key) {
                _this._maybeAddToChanges(insertBefore, value);
                _this._appendAfter = insertBefore;
                insertBefore = insertBefore._next;
            }
            else {
                var record = _this._getOrCreateRecordForKey(key, value);
                insertBefore = _this._insertBeforeOrAppend(insertBefore, record);
            }
        });
        // Items remaining at the end of the list have been deleted
        if (insertBefore) {
            if (insertBefore._prev) {
                insertBefore._prev._next = null;
            }
            this._removalsHead = insertBefore;
            for (var record = insertBefore; record !== null; record = record._nextRemoved) {
                if (record === this._mapHead) {
                    this._mapHead = null;
                }
                this._records.delete(record.key);
                record._nextRemoved = record._next;
                record.previousValue = record.currentValue;
                record.currentValue = null;
                record._prev = null;
                record._next = null;
            }
        }
        // Make sure tails have no next records from previous runs
        if (this._changesTail)
            this._changesTail._nextChanged = null;
        if (this._additionsTail)
            this._additionsTail._nextAdded = null;
        return this.isDirty;
    };
    /**
     * Inserts a record before `before` or append at the end of the list when `before` is null.
     *
     * Notes:
     * - This method appends at `this._appendAfter`,
     * - This method updates `this._appendAfter`,
     * - The return value is the new value for the insertion pointer.
     */
    DefaultKeyValueDiffer.prototype._insertBeforeOrAppend = function (before, record) {
        if (before) {
            var prev = before._prev;
            record._next = before;
            record._prev = prev;
            before._prev = record;
            if (prev) {
                prev._next = record;
            }
            if (before === this._mapHead) {
                this._mapHead = record;
            }
            this._appendAfter = before;
            return before;
        }
        if (this._appendAfter) {
            this._appendAfter._next = record;
            record._prev = this._appendAfter;
        }
        else {
            this._mapHead = record;
        }
        this._appendAfter = record;
        return null;
    };
    DefaultKeyValueDiffer.prototype._getOrCreateRecordForKey = function (key, value) {
        if (this._records.has(key)) {
            var record_1 = this._records.get(key);
            this._maybeAddToChanges(record_1, value);
            var prev = record_1._prev;
            var next = record_1._next;
            if (prev) {
                prev._next = next;
            }
            if (next) {
                next._prev = prev;
            }
            record_1._next = null;
            record_1._prev = null;
            return record_1;
        }
        var record = new KeyValueChangeRecord_(key);
        this._records.set(key, record);
        record.currentValue = value;
        this._addToAdditions(record);
        return record;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var record = void 0;
            // let `_previousMapHead` contain the state of the map before the changes
            this._previousMapHead = this._mapHead;
            for (record = this._previousMapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            // Update `record.previousValue` with the value of the item before the changes
            // We need to update all changed items (that's those which have been added and changed)
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = null;
        }
    };
    // Add the record or a given key to the list of changes only when the value has actually changed
    DefaultKeyValueDiffer.prototype._maybeAddToChanges = function (record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    };
    DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    };
    DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            Object.keys(obj).forEach(function (k) { return fn(obj[k], k); });
        }
    };
    return DefaultKeyValueDiffer;
}());
var KeyValueChangeRecord_ = /** @class */ /*@__PURE__*/ (function () {
    function KeyValueChangeRecord_(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
    return KeyValueChangeRecord_;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
var IterableDiffers = /** @class */ /*@__PURE__*/ (function () {
    function IterableDiffers(factories) {
        this.factories = factories;
    }
    IterableDiffers.create = function (factories, parent) {
        if (parent != null) {
            var copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new IterableDiffers(factories);
    };
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    IterableDiffers.extend = function (factories) {
        return {
            provide: IterableDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
    };
    IterableDiffers.prototype.find = function (iterable) {
        var factory = this.factories.find(function (f) { return f.supports(iterable); });
        if (factory != null) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
        }
    };
    /** @nocollapse */
    IterableDiffers.ɵprov = ɵɵdefineInjectable({
        token: IterableDiffers,
        providedIn: 'root',
        factory: function () { return new IterableDiffers([new DefaultIterableDifferFactory()]); }
    });
    return IterableDiffers;
}());
function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 *
 * @publicApi
 */
var KeyValueDiffers = /** @class */ /*@__PURE__*/ (function () {
    function KeyValueDiffers(factories) {
        this.factories = factories;
    }
    KeyValueDiffers.create = function (factories, parent) {
        if (parent) {
            var copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new KeyValueDiffers(factories);
    };
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    KeyValueDiffers.extend = function (factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
    };
    KeyValueDiffers.prototype.find = function (kv) {
        var factory = this.factories.find(function (f) { return f.supports(kv); });
        if (factory) {
            return factory;
        }
        throw new Error("Cannot find a differ supporting object '" + kv + "'");
    };
    /** @nocollapse */
    KeyValueDiffers.ɵprov = ɵɵdefineInjectable({
        token: KeyValueDiffers,
        providedIn: 'root',
        factory: function () { return new KeyValueDiffers([new DefaultKeyValueDifferFactory()]); }
    });
    return KeyValueDiffers;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Structural diffing for `Object`s and `Map`s.
 */
var keyValDiff = [/*@__PURE__*/ new DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
var iterableDiff = [/*@__PURE__*/ new DefaultIterableDifferFactory()];
var defaultIterableDiffers = /*@__PURE__*/ new IterableDiffers(iterableDiff);
var defaultKeyValueDiffers = /*@__PURE__*/ new KeyValueDiffers(keyValDiff);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see `ViewContainerRef`
 * @see [Navigate the Component Tree with DI](guide/dependency-injection-navtree)
 *
 * @publicApi
 */
var TemplateRef = /** @class */ /*@__PURE__*/ (function () {
    function TemplateRef() {
    }
    /**
     * @internal
     * @nocollapse
     */
    TemplateRef.__NG_ELEMENT_ID__ = function () { return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef); };
    return TemplateRef;
}());
var SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__ = noop$1;
var SWITCH_TEMPLATE_REF_FACTORY = SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents a container where one or more views can be attached to a component.
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * A view container instance can contain other view containers,
 * creating a [view hierarchy](guide/glossary#view-tree).
 *
 * @see `ComponentRef`
 * @see `EmbeddedViewRef`
 *
 * @publicApi
 */
var ViewContainerRef = /** @class */ /*@__PURE__*/ (function () {
    function ViewContainerRef() {
    }
    /**
     * @internal
     * @nocollapse
     */
    ViewContainerRef.__NG_ELEMENT_ID__ = function () { return SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef); };
    return ViewContainerRef;
}());
var SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__ = noop$1;
var SWITCH_VIEW_CONTAINER_REF_FACTORY = SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function expressionChangedAfterItHasBeenCheckedError(context, oldValue, currValue, isFirstCheck) {
    var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
    if (isFirstCheck) {
        msg +=
            " It seems like the view has been created after its parent and its children have been dirty checked." +
                " Has it been created in a change detection hook ?";
    }
    return viewDebugError(msg, context);
}
function viewWrappedDebugError(err, context) {
    if (!(err instanceof Error)) {
        // errors that are not Error instances don't have a stack,
        // so it is ok to wrap them into a new Error object...
        err = new Error(err.toString());
    }
    _addDebugContext(err, context);
    return err;
}
function viewDebugError(msg, context) {
    var err = new Error(msg);
    _addDebugContext(err, context);
    return err;
}
function _addDebugContext(err, context) {
    err[ERROR_DEBUG_CONTEXT] = context;
    err[ERROR_LOGGER] = context.logError.bind(context);
}
function isViewDebugError(err) {
    return !!getDebugContext(err);
}
function viewDestroyedError(action) {
    return new Error("ViewDestroyedError: Attempt to use a destroyed view: " + action);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Called before each cycle of a view's check to detect whether this is in the
// initState for which we need to call ngOnInit, ngAfterContentInit or ngAfterViewInit
// lifecycle methods. Returns true if this check cycle should call lifecycle
// methods.
function shiftInitState(view, priorInitState, newInitState) {
    // Only update the InitState if we are currently in the prior state.
    // For example, only move into CallingInit if we are in BeforeInit. Only
    // move into CallingContentInit if we are in CallingInit. Normally this will
    // always be true because of how checkCycle is called in checkAndUpdateView.
    // However, if checkAndUpdateView is called recursively or if an exception is
    // thrown while checkAndUpdateView is running, checkAndUpdateView starts over
    // from the beginning. This ensures the state is monotonically increasing,
    // terminating in the AfterInit state, which ensures the Init methods are called
    // at least once and only once.
    var state = view.state;
    var initState = state & 1792;
    if (initState === priorInitState) {
        view.state = (state & ~1792 /* InitState_Mask */) | newInitState;
        view.initIndex = -1;
        return true;
    }
    return initState === newInitState;
}
// Returns true if the lifecycle init method should be called for the node with
// the given init index.
function shouldCallLifecycleInitHook(view, initState, index) {
    if ((view.state & 1792 /* InitState_Mask */) === initState && view.initIndex <= index) {
        view.initIndex = index + 1;
        return true;
    }
    return false;
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
function asTextData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
function asElementData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
function asProviderData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
function asPureExpressionData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
function asQueryList(view, index) {
    return view.nodes[index];
}
/**
 * This object is used to prevent cycles in the source files and to have a place where
 * debug mode can hook it. It is lazily filled when `isDevMode` is known.
 */
var Services = {
    setCurrentNode: undefined,
    createRootView: undefined,
    createEmbeddedView: undefined,
    createComponentView: undefined,
    createNgModuleRef: undefined,
    overrideProvider: undefined,
    overrideComponentView: undefined,
    clearOverrides: undefined,
    checkAndUpdateView: undefined,
    checkNoChangesView: undefined,
    destroyView: undefined,
    resolveDep: undefined,
    createDebugContext: undefined,
    handleEvent: undefined,
    updateDirectives: undefined,
    updateRenderer: undefined,
    dirtyParentQueries: undefined,
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NOOP = function () { };
var _tokenKeyCache = /*@__PURE__*/ new Map();
function tokenKey(token) {
    var key = _tokenKeyCache.get(token);
    if (!key) {
        key = stringify(token) + '_' + _tokenKeyCache.size;
        _tokenKeyCache.set(token, key);
    }
    return key;
}
function checkBinding(view, def, bindingIdx, value) {
    var oldValues = view.oldValues;
    if ((view.state & 2 /* FirstCheck */) ||
        !looseIdentical(oldValues[def.bindingIndex + bindingIdx], value)) {
        return true;
    }
    return false;
}
function checkAndUpdateBinding(view, def, bindingIdx, value) {
    if (checkBinding(view, def, bindingIdx, value)) {
        view.oldValues[def.bindingIndex + bindingIdx] = value;
        return true;
    }
    return false;
}
function checkBindingNoChanges(view, def, bindingIdx, value) {
    var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
    if ((view.state & 1 /* BeforeFirstCheck */) || !devModeEqual$1(oldValue, value)) {
        var bindingName = def.bindings[bindingIdx].name;
        throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, def.nodeIndex), bindingName + ": " + oldValue, bindingName + ": " + value, (view.state & 1 /* BeforeFirstCheck */) !== 0);
    }
}
function markParentViewsForCheck(view) {
    var currView = view;
    while (currView) {
        if (currView.def.flags & 2 /* OnPush */) {
            currView.state |= 8 /* ChecksEnabled */;
        }
        currView = currView.viewContainerParent || currView.parent;
    }
}
function markParentViewsForCheckProjectedViews(view, endView) {
    var currView = view;
    while (currView && currView !== endView) {
        currView.state |= 64 /* CheckProjectedViews */;
        currView = currView.viewContainerParent || currView.parent;
    }
}
function dispatchEvent(view, nodeIndex, eventName, event) {
    try {
        var nodeDef = view.def.nodes[nodeIndex];
        var startView = nodeDef.flags & 33554432 /* ComponentView */ ?
            asElementData(view, nodeIndex).componentView :
            view;
        markParentViewsForCheck(startView);
        return Services.handleEvent(view, nodeIndex, eventName, event);
    }
    catch (e) {
        // Attention: Don't rethrow, as it would cancel Observable subscriptions!
        view.root.errorHandler.handleError(e);
    }
}
function declaredViewContainer(view) {
    if (view.parent) {
        var parentView = view.parent;
        return asElementData(parentView, view.parentNodeDef.nodeIndex);
    }
    return null;
}
/**
 * for component views, this is the host element.
 * for embedded views, this is the index of the parent node
 * that contains the view container.
 */
function viewParentEl(view) {
    var parentView = view.parent;
    if (parentView) {
        return view.parentNodeDef.parent;
    }
    else {
        return null;
    }
}
function renderNode(view, def) {
    switch (def.flags & 201347067 /* Types */) {
        case 1 /* TypeElement */:
            return asElementData(view, def.nodeIndex).renderElement;
        case 2 /* TypeText */:
            return asTextData(view, def.nodeIndex).renderText;
    }
}
function elementEventFullName(target, name) {
    return target ? target + ":" + name : name;
}
function isComponentView(view) {
    return !!view.parent && !!(view.parentNodeDef.flags & 32768 /* Component */);
}
function isEmbeddedView(view) {
    return !!view.parent && !(view.parentNodeDef.flags & 32768 /* Component */);
}
function splitDepsDsl(deps, sourceName) {
    return deps.map(function (value) {
        var _a;
        var token;
        var flags;
        if (Array.isArray(value)) {
            _a = __read(value, 2), flags = _a[0], token = _a[1];
        }
        else {
            flags = 0 /* None */;
            token = value;
        }
        if (token && (typeof token === 'function' || typeof token === 'object') && sourceName) {
            Object.defineProperty(token, SOURCE, { value: sourceName, configurable: true });
        }
        return { flags: flags, token: token, tokenKey: tokenKey(token) };
    });
}
function getParentRenderElement(view, renderHost, def) {
    var renderParent = def.renderParent;
    if (renderParent) {
        if ((renderParent.flags & 1 /* TypeElement */) === 0 ||
            (renderParent.flags & 33554432 /* ComponentView */) === 0 ||
            (renderParent.element.componentRendererType &&
                renderParent.element.componentRendererType.encapsulation ===
                    ViewEncapsulation$1.Native)) {
            // only children of non components, or children of components with native encapsulation should
            // be attached.
            return asElementData(view, def.renderParent.nodeIndex).renderElement;
        }
    }
    else {
        return renderHost;
    }
}
var DEFINITION_CACHE = /*@__PURE__*/ new WeakMap();
function resolveDefinition(factory) {
    var value = DEFINITION_CACHE.get(factory);
    if (!value) {
        value = factory(function () { return NOOP; });
        value.factory = factory;
        DEFINITION_CACHE.set(factory, value);
    }
    return value;
}
function rootRenderNodes(view) {
    var renderNodes = [];
    visitRootRenderNodes(view, 0 /* Collect */, undefined, undefined, renderNodes);
    return renderNodes;
}
function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
    // We need to re-compute the parent node in case the nodes have been moved around manually
    if (action === 3 /* RemoveChild */) {
        parentNode = view.renderer.parentNode(renderNode(view, view.def.lastRenderRootNode));
    }
    visitSiblingRenderNodes(view, action, 0, view.def.nodes.length - 1, parentNode, nextSibling, target);
}
function visitSiblingRenderNodes(view, action, startIndex, endIndex, parentNode, nextSibling, target) {
    for (var i = startIndex; i <= endIndex; i++) {
        var nodeDef = view.def.nodes[i];
        if (nodeDef.flags & (1 /* TypeElement */ | 2 /* TypeText */ | 8 /* TypeNgContent */)) {
            visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target);
        }
        // jump to next sibling
        i += nodeDef.childCount;
    }
}
function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
    var compView = view;
    while (compView && !isComponentView(compView)) {
        compView = compView.parent;
    }
    var hostView = compView.parent;
    var hostElDef = viewParentEl(compView);
    var startIndex = hostElDef.nodeIndex + 1;
    var endIndex = hostElDef.nodeIndex + hostElDef.childCount;
    for (var i = startIndex; i <= endIndex; i++) {
        var nodeDef = hostView.def.nodes[i];
        if (nodeDef.ngContentIndex === ngContentIndex) {
            visitRenderNode(hostView, nodeDef, action, parentNode, nextSibling, target);
        }
        // jump to next sibling
        i += nodeDef.childCount;
    }
    if (!hostView.parent) {
        // a root view
        var projectedNodes = view.root.projectableNodes[ngContentIndex];
        if (projectedNodes) {
            for (var i = 0; i < projectedNodes.length; i++) {
                execRenderNodeAction(view, projectedNodes[i], action, parentNode, nextSibling, target);
            }
        }
    }
}
function visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target) {
    if (nodeDef.flags & 8 /* TypeNgContent */) {
        visitProjectedRenderNodes(view, nodeDef.ngContent.index, action, parentNode, nextSibling, target);
    }
    else {
        var rn = renderNode(view, nodeDef);
        if (action === 3 /* RemoveChild */ && (nodeDef.flags & 33554432 /* ComponentView */) &&
            (nodeDef.bindingFlags & 48 /* CatSyntheticProperty */)) {
            // Note: we might need to do both actions.
            if (nodeDef.bindingFlags & (16 /* SyntheticProperty */)) {
                execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
            }
            if (nodeDef.bindingFlags & (32 /* SyntheticHostProperty */)) {
                var compView = asElementData(view, nodeDef.nodeIndex).componentView;
                execRenderNodeAction(compView, rn, action, parentNode, nextSibling, target);
            }
        }
        else {
            execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
        }
        if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
            var embeddedViews = asElementData(view, nodeDef.nodeIndex).viewContainer._embeddedViews;
            for (var k = 0; k < embeddedViews.length; k++) {
                visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
            }
        }
        if (nodeDef.flags & 1 /* TypeElement */ && !nodeDef.element.name) {
            visitSiblingRenderNodes(view, action, nodeDef.nodeIndex + 1, nodeDef.nodeIndex + nodeDef.childCount, parentNode, nextSibling, target);
        }
    }
}
function execRenderNodeAction(view, renderNode, action, parentNode, nextSibling, target) {
    var renderer = view.renderer;
    switch (action) {
        case 1 /* AppendChild */:
            renderer.appendChild(parentNode, renderNode);
            break;
        case 2 /* InsertBefore */:
            renderer.insertBefore(parentNode, renderNode, nextSibling);
            break;
        case 3 /* RemoveChild */:
            renderer.removeChild(parentNode, renderNode);
            break;
        case 0 /* Collect */:
            target.push(renderNode);
            break;
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var UNDEFINED_VALUE = {};
var InjectorRefTokenKey = /*@__PURE__*/ tokenKey(Injector);
var INJECTORRefTokenKey = /*@__PURE__*/ tokenKey(INJECTOR);
var NgModuleRefTokenKey = /*@__PURE__*/ tokenKey(NgModuleRef);
function initNgModule(data) {
    var def = data._def;
    var providers = data._providers = newArray(def.providers.length);
    for (var i = 0; i < def.providers.length; i++) {
        var provDef = def.providers[i];
        if (!(provDef.flags & 4096 /* LazyProvider */)) {
            // Make sure the provider has not been already initialized outside this loop.
            if (providers[i] === undefined) {
                providers[i] = _createProviderInstance(data, provDef);
            }
        }
    }
}
function resolveNgModuleDep(data, depDef, notFoundValue) {
    if (notFoundValue === void 0) {
        notFoundValue = Injector.THROW_IF_NOT_FOUND;
    }
    var former = setCurrentInjector(data);
    try {
        if (depDef.flags & 8 /* Value */) {
            return depDef.token;
        }
        if (depDef.flags & 2 /* Optional */) {
            notFoundValue = null;
        }
        if (depDef.flags & 1 /* SkipSelf */) {
            return data._parent.get(depDef.token, notFoundValue);
        }
        var tokenKey_1 = depDef.tokenKey;
        switch (tokenKey_1) {
            case InjectorRefTokenKey:
            case INJECTORRefTokenKey:
            case NgModuleRefTokenKey:
                return data;
        }
        var providerDef = data._def.providersByKey[tokenKey_1];
        var injectableDef = void 0;
        if (providerDef) {
            var providerInstance = data._providers[providerDef.index];
            if (providerInstance === undefined) {
                providerInstance = data._providers[providerDef.index] =
                    _createProviderInstance(data, providerDef);
            }
            return providerInstance === UNDEFINED_VALUE ? undefined : providerInstance;
        }
        else if ((injectableDef = getInjectableDef(depDef.token)) && targetsModule(data, injectableDef)) {
            var index = data._providers.length;
            data._def.providers[index] = data._def.providersByKey[depDef.tokenKey] = {
                flags: 1024 /* TypeFactoryProvider */ | 4096 /* LazyProvider */,
                value: injectableDef.factory,
                deps: [], index: index,
                token: depDef.token,
            };
            data._providers[index] = UNDEFINED_VALUE;
            return (data._providers[index] =
                _createProviderInstance(data, data._def.providersByKey[depDef.tokenKey]));
        }
        else if (depDef.flags & 4 /* Self */) {
            return notFoundValue;
        }
        return data._parent.get(depDef.token, notFoundValue);
    }
    finally {
        setCurrentInjector(former);
    }
}
function moduleTransitivelyPresent(ngModule, scope) {
    return ngModule._def.modules.indexOf(scope) > -1;
}
function targetsModule(ngModule, def) {
    var providedIn = def.providedIn;
    return providedIn != null && (providedIn === 'any' || providedIn === ngModule._def.scope ||
        moduleTransitivelyPresent(ngModule, providedIn));
}
function _createProviderInstance(ngModule, providerDef) {
    var injectable;
    switch (providerDef.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            injectable = _createClass(ngModule, providerDef.value, providerDef.deps);
            break;
        case 1024 /* TypeFactoryProvider */:
            injectable = _callFactory(ngModule, providerDef.value, providerDef.deps);
            break;
        case 2048 /* TypeUseExistingProvider */:
            injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
            break;
        case 256 /* TypeValueProvider */:
            injectable = providerDef.value;
            break;
    }
    // The read of `ngOnDestroy` here is slightly expensive as it's megamorphic, so it should be
    // avoided if possible. The sequence of checks here determines whether ngOnDestroy needs to be
    // checked. It might not if the `injectable` isn't an object or if NodeFlags.OnDestroy is already
    // set (ngOnDestroy was detected statically).
    if (injectable !== UNDEFINED_VALUE && injectable !== null && typeof injectable === 'object' &&
        !(providerDef.flags & 131072 /* OnDestroy */) && typeof injectable.ngOnDestroy === 'function') {
        providerDef.flags |= 131072 /* OnDestroy */;
    }
    return injectable === undefined ? UNDEFINED_VALUE : injectable;
}
function _createClass(ngModule, ctor, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            var depValues = [];
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return new (ctor.bind.apply(ctor, __spread([void 0], depValues)))();
    }
}
function _callFactory(ngModule, factory, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            var depValues = [];
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return factory.apply(void 0, __spread(depValues));
    }
}
function callNgModuleLifecycle(ngModule, lifecycles) {
    var def = ngModule._def;
    var destroyed = new Set();
    for (var i = 0; i < def.providers.length; i++) {
        var provDef = def.providers[i];
        if (provDef.flags & 131072 /* OnDestroy */) {
            var instance = ngModule._providers[i];
            if (instance && instance !== UNDEFINED_VALUE) {
                var onDestroy = instance.ngOnDestroy;
                if (typeof onDestroy === 'function' && !destroyed.has(instance)) {
                    onDestroy.apply(instance);
                    destroyed.add(instance);
                }
            }
        }
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function attachEmbeddedView(parentView, elementData, viewIndex, view) {
    var embeddedViews = elementData.viewContainer._embeddedViews;
    if (viewIndex === null || viewIndex === undefined) {
        viewIndex = embeddedViews.length;
    }
    view.viewContainerParent = parentView;
    addToArray(embeddedViews, viewIndex, view);
    attachProjectedView(elementData, view);
    Services.dirtyParentQueries(view);
    var prevView = viewIndex > 0 ? embeddedViews[viewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
}
function attachProjectedView(vcElementData, view) {
    var dvcElementData = declaredViewContainer(view);
    if (!dvcElementData || dvcElementData === vcElementData ||
        view.state & 16 /* IsProjectedView */) {
        return;
    }
    // Note: For performance reasons, we
    // - add a view to template._projectedViews only 1x throughout its lifetime,
    //   and remove it not until the view is destroyed.
    //   (hard, as when a parent view is attached/detached we would need to attach/detach all
    //    nested projected views as well, even across component boundaries).
    // - don't track the insertion order of views in the projected views array
    //   (hard, as when the views of the same template are inserted different view containers)
    view.state |= 16 /* IsProjectedView */;
    var projectedViews = dvcElementData.template._projectedViews;
    if (!projectedViews) {
        projectedViews = dvcElementData.template._projectedViews = [];
    }
    projectedViews.push(view);
    // Note: we are changing the NodeDef here as we cannot calculate
    // the fact whether a template is used for projection during compilation.
    markNodeAsProjectedTemplate(view.parent.def, view.parentNodeDef);
}
function markNodeAsProjectedTemplate(viewDef, nodeDef) {
    if (nodeDef.flags & 4 /* ProjectedTemplate */) {
        return;
    }
    viewDef.nodeFlags |= 4 /* ProjectedTemplate */;
    nodeDef.flags |= 4 /* ProjectedTemplate */;
    var parentNodeDef = nodeDef.parent;
    while (parentNodeDef) {
        parentNodeDef.childFlags |= 4 /* ProjectedTemplate */;
        parentNodeDef = parentNodeDef.parent;
    }
}
function detachEmbeddedView(elementData, viewIndex) {
    var embeddedViews = elementData.viewContainer._embeddedViews;
    if (viewIndex == null || viewIndex >= embeddedViews.length) {
        viewIndex = embeddedViews.length - 1;
    }
    if (viewIndex < 0) {
        return null;
    }
    var view = embeddedViews[viewIndex];
    view.viewContainerParent = null;
    removeFromArray(embeddedViews, viewIndex);
    // See attachProjectedView for why we don't update projectedViews here.
    Services.dirtyParentQueries(view);
    renderDetachView$1(view);
    return view;
}
function detachProjectedView(view) {
    if (!(view.state & 16 /* IsProjectedView */)) {
        return;
    }
    var dvcElementData = declaredViewContainer(view);
    if (dvcElementData) {
        var projectedViews = dvcElementData.template._projectedViews;
        if (projectedViews) {
            removeFromArray(projectedViews, projectedViews.indexOf(view));
            Services.dirtyParentQueries(view);
        }
    }
}
function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
    var embeddedViews = elementData.viewContainer._embeddedViews;
    var view = embeddedViews[oldViewIndex];
    removeFromArray(embeddedViews, oldViewIndex);
    if (newViewIndex == null) {
        newViewIndex = embeddedViews.length;
    }
    addToArray(embeddedViews, newViewIndex, view);
    // Note: Don't need to change projectedViews as the order in there
    // as always invalid...
    Services.dirtyParentQueries(view);
    renderDetachView$1(view);
    var prevView = newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
    return view;
}
function renderAttachEmbeddedView(elementData, prevView, view) {
    var prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRenderRootNode) :
        elementData.renderElement;
    var parentNode = view.renderer.parentNode(prevRenderNode);
    var nextSibling = view.renderer.nextSibling(prevRenderNode);
    // Note: We can't check if `nextSibling` is present, as on WebWorkers it will always be!
    // However, browsers automatically do `appendChild` when there is no `nextSibling`.
    visitRootRenderNodes(view, 2 /* InsertBefore */, parentNode, nextSibling, undefined);
}
function renderDetachView$1(view) {
    visitRootRenderNodes(view, 3 /* RemoveChild */, null, null, undefined);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_CONTEXT = {};
function getComponentViewDefinitionFactory(componentFactory) {
    return componentFactory.viewDefFactory;
}
var ComponentFactory_ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentFactory_, _super);
    function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
        var _this = 
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        _super.call(this) || this;
        _this.selector = selector;
        _this.componentType = componentType;
        _this._inputs = _inputs;
        _this._outputs = _outputs;
        _this.ngContentSelectors = ngContentSelectors;
        _this.viewDefFactory = viewDefFactory;
        return _this;
    }
    Object.defineProperty(ComponentFactory_.prototype, "inputs", {
        get: function () {
            var inputsArr = [];
            var inputs = this._inputs;
            for (var propName in inputs) {
                var templateName = inputs[propName];
                inputsArr.push({ propName: propName, templateName: templateName });
            }
            return inputsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory_.prototype, "outputs", {
        get: function () {
            var outputsArr = [];
            for (var propName in this._outputs) {
                var templateName = this._outputs[propName];
                outputsArr.push({ propName: propName, templateName: templateName });
            }
            return outputsArr;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new component.
     */
    ComponentFactory_.prototype.create = function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        if (!ngModule) {
            throw new Error('ngModule should be provided');
        }
        var viewDef = resolveDefinition(this.viewDefFactory);
        var componentNodeIndex = viewDef.nodes[0].element.componentProvider.nodeIndex;
        var view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);
        var component = asProviderData(view, componentNodeIndex).instance;
        if (rootSelectorOrNode) {
            view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);
        }
        return new ComponentRef_(view, new ViewRef_(view), component);
    };
    return ComponentFactory_;
}(ComponentFactory));
var ComponentRef_ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentRef_, _super);
    function ComponentRef_(_view, _viewRef, _component) {
        var _this = _super.call(this) || this;
        _this._view = _view;
        _this._viewRef = _viewRef;
        _this._component = _component;
        _this._elDef = _this._view.def.nodes[0];
        _this.hostView = _viewRef;
        _this.changeDetectorRef = _viewRef;
        _this.instance = _component;
        return _this;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        get: function () {
            return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        get: function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        get: function () { return this._component.constructor; },
        enumerable: true,
        configurable: true
    });
    ComponentRef_.prototype.destroy = function () { this._viewRef.destroy(); };
    ComponentRef_.prototype.onDestroy = function (callback) { this._viewRef.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
function createViewContainerData(view, elDef, elData) {
    return new ViewContainerRef_(view, elDef, elData);
}
var ViewContainerRef_ = /** @class */ /*@__PURE__*/ (function () {
    function ViewContainerRef_(_view, _elDef, _data) {
        this._view = _view;
        this._elDef = _elDef;
        this._data = _data;
        /**
         * @internal
         */
        this._embeddedViews = [];
    }
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: function () { return new ElementRef(this._data.renderElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        get: function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        /** @deprecated No replacement */
        get: function () {
            var view = this._view;
            var elDef = this._elDef.parent;
            while (!elDef && view) {
                elDef = viewParentEl(view);
                view = view.parent;
            }
            return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
        },
        enumerable: true,
        configurable: true
    });
    ViewContainerRef_.prototype.clear = function () {
        var len = this._embeddedViews.length;
        for (var i = len - 1; i >= 0; i--) {
            var view = detachEmbeddedView(this._data, i);
            Services.destroyView(view);
        }
    };
    ViewContainerRef_.prototype.get = function (index) {
        var view = this._embeddedViews[index];
        if (view) {
            var ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: function () { return this._embeddedViews.length; },
        enumerable: true,
        configurable: true
    });
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
        var viewRef = templateRef.createEmbeddedView(context || {});
        this.insert(viewRef, index);
        return viewRef;
    };
    ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes, ngModuleRef) {
        var contextInjector = injector || this.parentInjector;
        if (!ngModuleRef && !(componentFactory instanceof ComponentFactoryBoundToModule)) {
            ngModuleRef = contextInjector.get(NgModuleRef);
        }
        var componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
        this.insert(componentRef.hostView, index);
        return componentRef;
    };
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        if (viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        var viewRef_ = viewRef;
        var viewData = viewRef_._view;
        attachEmbeddedView(this._view, this._data, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    };
    ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
        if (viewRef.destroyed) {
            throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        var previousIndex = this._embeddedViews.indexOf(viewRef._view);
        moveEmbeddedView(this._data, previousIndex, currentIndex);
        return viewRef;
    };
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return this._embeddedViews.indexOf(viewRef._view);
    };
    ViewContainerRef_.prototype.remove = function (index) {
        var viewData = detachEmbeddedView(this._data, index);
        if (viewData) {
            Services.destroyView(viewData);
        }
    };
    ViewContainerRef_.prototype.detach = function (index) {
        var view = detachEmbeddedView(this._data, index);
        return view ? new ViewRef_(view) : null;
    };
    return ViewContainerRef_;
}());
function createChangeDetectorRef(view) {
    return new ViewRef_(view);
}
var ViewRef_ = /** @class */ /*@__PURE__*/ (function () {
    function ViewRef_(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        get: function () { return rootRenderNodes(this._view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        get: function () { return (this._view.state & 128 /* Destroyed */) !== 0; },
        enumerable: true,
        configurable: true
    });
    ViewRef_.prototype.markForCheck = function () { markParentViewsForCheck(this._view); };
    ViewRef_.prototype.detach = function () { this._view.state &= ~4 /* Attached */; };
    ViewRef_.prototype.detectChanges = function () {
        var fs = this._view.root.rendererFactory;
        if (fs.begin) {
            fs.begin();
        }
        try {
            Services.checkAndUpdateView(this._view);
        }
        finally {
            if (fs.end) {
                fs.end();
            }
        }
    };
    ViewRef_.prototype.checkNoChanges = function () { Services.checkNoChangesView(this._view); };
    ViewRef_.prototype.reattach = function () { this._view.state |= 4 /* Attached */; };
    ViewRef_.prototype.onDestroy = function (callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(callback);
    };
    ViewRef_.prototype.destroy = function () {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        Services.destroyView(this._view);
    };
    ViewRef_.prototype.detachFromAppRef = function () {
        this._appRef = null;
        renderDetachView$1(this._view);
        Services.dirtyParentQueries(this._view);
    };
    ViewRef_.prototype.attachToAppRef = function (appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    };
    ViewRef_.prototype.attachToViewContainerRef = function (vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    };
    return ViewRef_;
}());
function createTemplateData(view, def) {
    return new TemplateRef_(view, def);
}
var TemplateRef_ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(TemplateRef_, _super);
    function TemplateRef_(_parentView, _def) {
        var _this = _super.call(this) || this;
        _this._parentView = _parentView;
        _this._def = _def;
        return _this;
    }
    TemplateRef_.prototype.createEmbeddedView = function (context) {
        return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, this._def.element.template, context));
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        get: function () {
            return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    return TemplateRef_;
}(TemplateRef));
function createInjector$1(view, elDef) {
    return new Injector_(view, elDef);
}
var Injector_ = /** @class */ /*@__PURE__*/ (function () {
    function Injector_(view, elDef) {
        this.view = view;
        this.elDef = elDef;
    }
    Injector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) {
            notFoundValue = Injector.THROW_IF_NOT_FOUND;
        }
        var allowPrivateServices = this.elDef ? (this.elDef.flags & 33554432 /* ComponentView */) !== 0 : false;
        return Services.resolveDep(this.view, this.elDef, allowPrivateServices, { flags: 0 /* None */, token: token, tokenKey: tokenKey(token) }, notFoundValue);
    };
    return Injector_;
}());
function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
    return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
}
var NgModuleRef_ = /** @class */ /*@__PURE__*/ (function () {
    function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
        this._moduleType = _moduleType;
        this._parent = _parent;
        this._bootstrapComponents = _bootstrapComponents;
        this._def = _def;
        this._destroyListeners = [];
        this._destroyed = false;
        this.injector = this;
        initNgModule(this);
    }
    NgModuleRef_.prototype.get = function (token, notFoundValue, injectFlags) {
        if (notFoundValue === void 0) {
            notFoundValue = Injector.THROW_IF_NOT_FOUND;
        }
        if (injectFlags === void 0) {
            injectFlags = InjectFlags.Default;
        }
        var flags = 0;
        if (injectFlags & InjectFlags.SkipSelf) {
            flags |= 1 /* SkipSelf */;
        }
        else if (injectFlags & InjectFlags.Self) {
            flags |= 4 /* Self */;
        }
        return resolveNgModuleDep(this, { token: token, tokenKey: tokenKey(token), flags: flags }, notFoundValue);
    };
    Object.defineProperty(NgModuleRef_.prototype, "instance", {
        get: function () { return this.get(this._moduleType); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
        get: function () { return this.get(ComponentFactoryResolver); },
        enumerable: true,
        configurable: true
    });
    NgModuleRef_.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        callNgModuleLifecycle(this, 131072 /* OnDestroy */);
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    NgModuleRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    return NgModuleRef_;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Renderer2TokenKey = /*@__PURE__*/ tokenKey(Renderer2);
var ElementRefTokenKey = /*@__PURE__*/ tokenKey(ElementRef);
var ViewContainerRefTokenKey = /*@__PURE__*/ tokenKey(ViewContainerRef);
var TemplateRefTokenKey = /*@__PURE__*/ tokenKey(TemplateRef);
var ChangeDetectorRefTokenKey = /*@__PURE__*/ tokenKey(ChangeDetectorRef);
var InjectorRefTokenKey$1 = /*@__PURE__*/ tokenKey(Injector);
var INJECTORRefTokenKey$1 = /*@__PURE__*/ tokenKey(INJECTOR);
function createProviderInstance(view, def) {
    return _createProviderInstance$1(view, def);
}
function createPipeInstance(view, def) {
    // deps are looked up from component.
    var compView = view;
    while (compView.parent && !isComponentView(compView)) {
        compView = compView.parent;
    }
    // pipes can see the private services of the component
    var allowPrivateServices = true;
    // pipes are always eager and classes!
    return createClass(compView.parent, viewParentEl(compView), allowPrivateServices, def.provider.value, def.provider.deps);
}
function createDirectiveInstance(view, def) {
    // components can see other private services, other directives can't.
    var allowPrivateServices = (def.flags & 32768 /* Component */) > 0;
    // directives are always eager and classes!
    var instance = createClass(view, def.parent, allowPrivateServices, def.provider.value, def.provider.deps);
    if (def.outputs.length) {
        for (var i = 0; i < def.outputs.length; i++) {
            var output = def.outputs[i];
            var outputObservable = instance[output.propName];
            if (isObservable$1(outputObservable)) {
                var subscription = outputObservable.subscribe(eventHandlerClosure(view, def.parent.nodeIndex, output.eventName));
                view.disposables[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
            }
            else {
                throw new Error("@Output " + output.propName + " not initialized in '" + instance.constructor.name + "'.");
            }
        }
    }
    return instance;
}
function eventHandlerClosure(view, index, eventName) {
    return function (event) { return dispatchEvent(view, index, eventName, event); };
}
function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var providerData = asProviderData(view, def.nodeIndex);
    var directive = providerData.instance;
    var changed = false;
    var changes = undefined;
    var bindLen = def.bindings.length;
    if (bindLen > 0 && checkBinding(view, def, 0, v0)) {
        changed = true;
        changes = updateProp(view, providerData, def, 0, v0, changes);
    }
    if (bindLen > 1 && checkBinding(view, def, 1, v1)) {
        changed = true;
        changes = updateProp(view, providerData, def, 1, v1, changes);
    }
    if (bindLen > 2 && checkBinding(view, def, 2, v2)) {
        changed = true;
        changes = updateProp(view, providerData, def, 2, v2, changes);
    }
    if (bindLen > 3 && checkBinding(view, def, 3, v3)) {
        changed = true;
        changes = updateProp(view, providerData, def, 3, v3, changes);
    }
    if (bindLen > 4 && checkBinding(view, def, 4, v4)) {
        changed = true;
        changes = updateProp(view, providerData, def, 4, v4, changes);
    }
    if (bindLen > 5 && checkBinding(view, def, 5, v5)) {
        changed = true;
        changes = updateProp(view, providerData, def, 5, v5, changes);
    }
    if (bindLen > 6 && checkBinding(view, def, 6, v6)) {
        changed = true;
        changes = updateProp(view, providerData, def, 6, v6, changes);
    }
    if (bindLen > 7 && checkBinding(view, def, 7, v7)) {
        changed = true;
        changes = updateProp(view, providerData, def, 7, v7, changes);
    }
    if (bindLen > 8 && checkBinding(view, def, 8, v8)) {
        changed = true;
        changes = updateProp(view, providerData, def, 8, v8, changes);
    }
    if (bindLen > 9 && checkBinding(view, def, 9, v9)) {
        changed = true;
        changes = updateProp(view, providerData, def, 9, v9, changes);
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
function checkAndUpdateDirectiveDynamic(view, def, values) {
    var providerData = asProviderData(view, def.nodeIndex);
    var directive = providerData.instance;
    var changed = false;
    var changes = undefined;
    for (var i = 0; i < values.length; i++) {
        if (checkBinding(view, def, i, values[i])) {
            changed = true;
            changes = updateProp(view, providerData, def, i, values[i], changes);
        }
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
function _createProviderInstance$1(view, def) {
    // private services can see other private services
    var allowPrivateServices = (def.flags & 8192 /* PrivateProvider */) > 0;
    var providerDef = def.provider;
    switch (def.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            return createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
        case 1024 /* TypeFactoryProvider */:
            return callFactory(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
        case 2048 /* TypeUseExistingProvider */:
            return resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);
        case 256 /* TypeValueProvider */:
            return providerDef.value;
    }
}
function createClass(view, elDef, allowPrivateServices, ctor, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            var depValues = [];
            for (var i = 0; i < len; i++) {
                depValues.push(resolveDep(view, elDef, allowPrivateServices, deps[i]));
            }
            return new (ctor.bind.apply(ctor, __spread([void 0], depValues)))();
    }
}
function callFactory(view, elDef, allowPrivateServices, factory, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            var depValues = [];
            for (var i = 0; i < len; i++) {
                depValues.push(resolveDep(view, elDef, allowPrivateServices, deps[i]));
            }
            return factory.apply(void 0, __spread(depValues));
    }
}
// This default value is when checking the hierarchy for a token.
//
// It means both:
// - the token is not provided by the current injector,
// - only the element injectors should be checked (ie do not check module injectors
//
//          mod1
//         /
//       el1   mod2
//         \  /
//         el2
//
// When requesting el2.injector.get(token), we should check in the following order and return the
// first found value:
// - el2.injector.get(token, default)
// - el1.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) -> do not check the module
// - mod2.injector.get(token, default)
var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
    if (notFoundValue === void 0) {
        notFoundValue = Injector.THROW_IF_NOT_FOUND;
    }
    if (depDef.flags & 8 /* Value */) {
        return depDef.token;
    }
    var startView = view;
    if (depDef.flags & 2 /* Optional */) {
        notFoundValue = null;
    }
    var tokenKey = depDef.tokenKey;
    if (tokenKey === ChangeDetectorRefTokenKey) {
        // directives on the same element as a component should be able to control the change detector
        // of that component as well.
        allowPrivateServices = !!(elDef && elDef.element.componentView);
    }
    if (elDef && (depDef.flags & 1 /* SkipSelf */)) {
        allowPrivateServices = false;
        elDef = elDef.parent;
    }
    var searchView = view;
    while (searchView) {
        if (elDef) {
            switch (tokenKey) {
                case Renderer2TokenKey: {
                    var compView = findCompView(searchView, elDef, allowPrivateServices);
                    return compView.renderer;
                }
                case ElementRefTokenKey:
                    return new ElementRef(asElementData(searchView, elDef.nodeIndex).renderElement);
                case ViewContainerRefTokenKey:
                    return asElementData(searchView, elDef.nodeIndex).viewContainer;
                case TemplateRefTokenKey: {
                    if (elDef.element.template) {
                        return asElementData(searchView, elDef.nodeIndex).template;
                    }
                    break;
                }
                case ChangeDetectorRefTokenKey: {
                    var cdView = findCompView(searchView, elDef, allowPrivateServices);
                    return createChangeDetectorRef(cdView);
                }
                case InjectorRefTokenKey$1:
                case INJECTORRefTokenKey$1:
                    return createInjector$1(searchView, elDef);
                default:
                    var providerDef_1 = (allowPrivateServices ? elDef.element.allProviders :
                        elDef.element.publicProviders)[tokenKey];
                    if (providerDef_1) {
                        var providerData = asProviderData(searchView, providerDef_1.nodeIndex);
                        if (!providerData) {
                            providerData = { instance: _createProviderInstance$1(searchView, providerDef_1) };
                            searchView.nodes[providerDef_1.nodeIndex] = providerData;
                        }
                        return providerData.instance;
                    }
            }
        }
        allowPrivateServices = isComponentView(searchView);
        elDef = viewParentEl(searchView);
        searchView = searchView.parent;
        if (depDef.flags & 4 /* Self */) {
            searchView = null;
        }
    }
    var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
    if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
        notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
        // Return the value from the root element injector when
        // - it provides it
        //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        // - the module injector should not be checked
        //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        return value;
    }
    return startView.root.ngModule.injector.get(depDef.token, notFoundValue);
}
function findCompView(view, elDef, allowPrivateServices) {
    var compView;
    if (allowPrivateServices) {
        compView = asElementData(view, elDef.nodeIndex).componentView;
    }
    else {
        compView = view;
        while (compView.parent && !isComponentView(compView)) {
            compView = compView.parent;
        }
    }
    return compView;
}
function updateProp(view, providerData, def, bindingIdx, value, changes) {
    if (def.flags & 32768 /* Component */) {
        var compView = asElementData(view, def.parent.nodeIndex).componentView;
        if (compView.def.flags & 2 /* OnPush */) {
            compView.state |= 8 /* ChecksEnabled */;
        }
    }
    var binding = def.bindings[bindingIdx];
    var propName = binding.name;
    // Note: This is still safe with Closure Compiler as
    // the user passed in the property name as an object has to `providerDef`,
    // so Closure Compiler will have renamed the property correctly already.
    providerData.instance[propName] = value;
    if (def.flags & 524288 /* OnChanges */) {
        changes = changes || {};
        var oldValue = WrappedValue.unwrap(view.oldValues[def.bindingIndex + bindingIdx]);
        var binding_1 = def.bindings[bindingIdx];
        changes[binding_1.nonMinifiedName] =
            new SimpleChange(oldValue, value, (view.state & 2 /* FirstCheck */) !== 0);
    }
    view.oldValues[def.bindingIndex + bindingIdx] = value;
    return changes;
}
// This function calls the ngAfterContentCheck, ngAfterContentInit,
// ngAfterViewCheck, and ngAfterViewInit lifecycle hooks (depending on the node
// flags in lifecycle). Unlike ngDoCheck, ngOnChanges and ngOnInit, which are
// called during a pre-order traversal of the view tree (that is calling the
// parent hooks before the child hooks) these events are sent in using a
// post-order traversal of the tree (children before parents). This changes the
// meaning of initIndex in the view state. For ngOnInit, initIndex tracks the
// expected nodeIndex which a ngOnInit should be called. When sending
// ngAfterContentInit and ngAfterViewInit it is the expected count of
// ngAfterContentInit or ngAfterViewInit methods that have been called. This
// ensure that despite being called recursively or after picking up after an
// exception, the ngAfterContentInit or ngAfterViewInit will be called on the
// correct nodes. Consider for example, the following (where E is an element
// and D is a directive)
//  Tree:       pre-order index  post-order index
//    E1        0                6
//      E2      1                1
//       D3     2                0
//      E4      3                5
//       E5     4                4
//        E6    5                2
//        E7    6                3
// As can be seen, the post-order index has an unclear relationship to the
// pre-order index (postOrderIndex === preOrderIndex - parentCount +
// childCount). Since number of calls to ngAfterContentInit and ngAfterViewInit
// are stable (will be the same for the same view regardless of exceptions or
// recursion) we just need to count them which will roughly correspond to the
// post-order index (it skips elements and directives that do not have
// lifecycle hooks).
//
// For example, if an exception is raised in the E6.onAfterViewInit() the
// initIndex is left at 3 (by shouldCallLifecycleInitHook() which set it to
// initIndex + 1). When checkAndUpdateView() is called again D3, E2 and E6 will
// not have their ngAfterViewInit() called but, starting with E7, the rest of
// the view will begin getting ngAfterViewInit() called until a check and
// pass is complete.
//
// This algorthim also handles recursion. Consider if E4's ngAfterViewInit()
// indirectly calls E1's ChangeDetectorRef.detectChanges(). The expected
// initIndex is set to 6, the recusive checkAndUpdateView() starts walk again.
// D3, E2, E6, E7, E5 and E4 are skipped, ngAfterViewInit() is called on E1.
// When the recursion returns the initIndex will be 7 so E1 is skipped as it
// has already been called in the recursively called checkAnUpdateView().
function callLifecycleHooksChildrenFirst(view, lifecycles) {
    if (!(view.def.nodeFlags & lifecycles)) {
        return;
    }
    var nodes = view.def.nodes;
    var initIndex = 0;
    for (var i = 0; i < nodes.length; i++) {
        var nodeDef = nodes[i];
        var parent_1 = nodeDef.parent;
        if (!parent_1 && nodeDef.flags & lifecycles) {
            // matching root node (e.g. a pipe)
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        if ((nodeDef.childFlags & lifecycles) === 0) {
            // no child matches one of the lifecycles
            i += nodeDef.childCount;
        }
        while (parent_1 && (parent_1.flags & 1 /* TypeElement */) &&
            i === parent_1.nodeIndex + parent_1.childCount) {
            // last child of an element
            if (parent_1.directChildFlags & lifecycles) {
                initIndex = callElementProvidersLifecycles(view, parent_1, lifecycles, initIndex);
            }
            parent_1 = parent_1.parent;
        }
    }
}
function callElementProvidersLifecycles(view, elDef, lifecycles, initIndex) {
    for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
        var nodeDef = view.def.nodes[i];
        if (nodeDef.flags & lifecycles) {
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        // only visit direct children
        i += nodeDef.childCount;
    }
    return initIndex;
}
function callProviderLifecycles(view, index, lifecycles, initIndex) {
    var providerData = asProviderData(view, index);
    if (!providerData) {
        return;
    }
    var provider = providerData.instance;
    if (!provider) {
        return;
    }
    Services.setCurrentNode(view, index);
    if (lifecycles & 1048576 /* AfterContentInit */ &&
        shouldCallLifecycleInitHook(view, 512 /* InitState_CallingAfterContentInit */, initIndex)) {
        provider.ngAfterContentInit();
    }
    if (lifecycles & 2097152 /* AfterContentChecked */) {
        provider.ngAfterContentChecked();
    }
    if (lifecycles & 4194304 /* AfterViewInit */ &&
        shouldCallLifecycleInitHook(view, 768 /* InitState_CallingAfterViewInit */, initIndex)) {
        provider.ngAfterViewInit();
    }
    if (lifecycles & 8388608 /* AfterViewChecked */) {
        provider.ngAfterViewChecked();
    }
    if (lifecycles & 131072 /* OnDestroy */) {
        provider.ngOnDestroy();
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ComponentFactoryResolver$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentFactoryResolver, _super);
    /**
     * @param ngModule The NgModuleRef to which all resolved factories are bound.
     */
    function ComponentFactoryResolver(ngModule) {
        var _this = _super.call(this) || this;
        _this.ngModule = ngModule;
        return _this;
    }
    ComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        ngDevMode && assertComponentType(component);
        var componentDef = getComponentDef(component);
        return new ComponentFactory$1(componentDef, this.ngModule);
    };
    return ComponentFactoryResolver;
}(ComponentFactoryResolver));
function toRefArray(map) {
    var array = [];
    for (var nonMinified in map) {
        if (map.hasOwnProperty(nonMinified)) {
            var minified = map[nonMinified];
            array.push({ propName: minified, templateName: nonMinified });
        }
    }
    return array;
}
function getNamespace$1(elementName) {
    var name = elementName.toLowerCase();
    return name === 'svg' ? SVG_NAMESPACE : (name === 'math' ? MATH_ML_NAMESPACE : null);
}
/**
 * A change detection scheduler token for {@link RootContext}. This token is the default value used
 * for the default `RootContext` found in the {@link ROOT_CONTEXT} token.
 */
var SCHEDULER = /*@__PURE__*/ new InjectionToken('SCHEDULER_TOKEN', {
    providedIn: 'root',
    factory: function () { return defaultScheduler; },
});
function createChainedInjector(rootViewInjector, moduleInjector) {
    return {
        get: function (token, notFoundValue, flags) {
            var value = rootViewInjector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
            if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
                notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
                // Return the value from the root element injector when
                // - it provides it
                //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
                // - the module injector should not be checked
                //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
                return value;
            }
            return moduleInjector.get(token, notFoundValue, flags);
        }
    };
}
/**
 * Render3 implementation of {@link viewEngine_ComponentFactory}.
 */
var ComponentFactory$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentFactory, _super);
    /**
     * @param componentDef The component definition.
     * @param ngModule The NgModuleRef to which the factory is bound.
     */
    function ComponentFactory(componentDef, ngModule) {
        var _this = _super.call(this) || this;
        _this.componentDef = componentDef;
        _this.ngModule = ngModule;
        _this.componentType = componentDef.type;
        _this.selector = stringifyCSSSelectorList(componentDef.selectors);
        _this.ngContentSelectors =
            componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [];
        _this.isBoundToModule = !!ngModule;
        return _this;
    }
    Object.defineProperty(ComponentFactory.prototype, "inputs", {
        get: function () {
            return toRefArray(this.componentDef.inputs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "outputs", {
        get: function () {
            return toRefArray(this.componentDef.outputs);
        },
        enumerable: true,
        configurable: true
    });
    ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        ngModule = ngModule || this.ngModule;
        var rootViewInjector = ngModule ? createChainedInjector(injector, ngModule.injector) : injector;
        var rendererFactory = rootViewInjector.get(RendererFactory2, domRendererFactory3);
        var sanitizer = rootViewInjector.get(Sanitizer, null);
        var hostRenderer = rendererFactory.createRenderer(null, this.componentDef);
        // Determine a tag name used for creating host elements when this component is created
        // dynamically. Default to 'div' if this component did not specify any tag name in its selector.
        var elementName = this.componentDef.selectors[0][0] || 'div';
        var hostRNode = rootSelectorOrNode ?
            locateHostElement(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation) :
            elementCreate(elementName, rendererFactory.createRenderer(null, this.componentDef), getNamespace$1(elementName));
        var rootFlags = this.componentDef.onPush ? 64 /* Dirty */ | 512 /* IsRoot */ :
            16 /* CheckAlways */ | 512;
        // Check whether this Component needs to be isolated from other components, i.e. whether it
        // should be placed into its own (empty) root context or existing root context should be used.
        // Note: this is internal-only convention and might change in the future, so it should not be
        // relied upon externally.
        var isIsolated = typeof rootSelectorOrNode === 'string' &&
            /^#root-ng-internal-isolated-\d+/.test(rootSelectorOrNode);
        var rootContext = createRootContext();
        // Create the root view. Uses empty TView and ContentTemplate.
        var rootTView = createTView(0 /* Root */, -1, null, 1, 0, null, null, null, null, null);
        var rootLView = createLView(null, rootTView, rootContext, rootFlags, null, null, rendererFactory, hostRenderer, sanitizer, rootViewInjector);
        // rootView is the parent when bootstrapping
        // TODO(misko): it looks like we are entering view here but we don't really need to as
        // `renderView` does that. However as the code is written it is needed because
        // `createRootComponentView` and `createRootComponent` both read global state. Fixing those
        // issues would allow us to drop this.
        enterView(rootLView, null);
        var component;
        var tElementNode;
        try {
            var componentView = createRootComponentView(hostRNode, this.componentDef, rootLView, rendererFactory, hostRenderer);
            if (hostRNode) {
                if (rootSelectorOrNode) {
                    setUpAttributes(hostRenderer, hostRNode, ['ng-version', VERSION.full]);
                }
                else {
                    // If host element is created as a part of this function call (i.e. `rootSelectorOrNode`
                    // is not defined), also apply attributes and classes extracted from component selector.
                    // Extract attributes and classes from the first selector only to match VE behavior.
                    var _a = extractAttrsAndClassesFromSelector(this.componentDef.selectors[0]), attrs = _a.attrs, classes = _a.classes;
                    if (attrs) {
                        setUpAttributes(hostRenderer, hostRNode, attrs);
                    }
                    if (classes && classes.length > 0) {
                        writeDirectClass(hostRenderer, hostRNode, classes.join(' '));
                    }
                }
            }
            tElementNode = getTNode(rootLView[TVIEW], 0);
            if (projectableNodes) {
                // projectable nodes can be passed as array of arrays or an array of iterables (ngUpgrade
                // case). Here we do normalize passed data structure to be an array of arrays to avoid
                // complex checks down the line.
                tElementNode.projection =
                    projectableNodes.map(function (nodesforSlot) { return Array.from(nodesforSlot); });
            }
            // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
            // executed here?
            // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
            component = createRootComponent(componentView, this.componentDef, rootLView, rootContext, [LifecycleHooksFeature]);
            renderView(rootTView, rootLView, null);
        }
        finally {
            leaveView();
        }
        var componentRef = new ComponentRef$1(this.componentType, component, createElementRef(ElementRef, tElementNode, rootLView), rootLView, tElementNode);
        if (!rootSelectorOrNode || isIsolated) {
            // The host element of the internal or isolated root view is attached to the component's host
            // view node.
            componentRef.hostView._tViewNode.child = tElementNode;
        }
        return componentRef;
    };
    return ComponentFactory;
}(ComponentFactory));
var componentFactoryResolver = /*@__PURE__*/ new ComponentFactoryResolver$1();
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
var ComponentRef$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ComponentRef, _super);
    function ComponentRef(componentType, instance, location, _rootLView, _tNode) {
        var _this = _super.call(this) || this;
        _this.location = location;
        _this._rootLView = _rootLView;
        _this._tNode = _tNode;
        _this.destroyCbs = [];
        _this.instance = instance;
        _this.hostView = _this.changeDetectorRef = new RootViewRef(_rootLView);
        _this.hostView._tViewNode = assignTViewNodeToLView(_rootLView[TVIEW], null, -1, _rootLView);
        _this.componentType = componentType;
        return _this;
    }
    Object.defineProperty(ComponentRef.prototype, "injector", {
        get: function () { return new NodeInjector(this._tNode, this._rootLView); },
        enumerable: true,
        configurable: true
    });
    ComponentRef.prototype.destroy = function () {
        if (this.destroyCbs) {
            this.destroyCbs.forEach(function (fn) { return fn(); });
            this.destroyCbs = null;
            !this.hostView.destroyed && this.hostView.destroy();
        }
    };
    ComponentRef.prototype.onDestroy = function (callback) {
        if (this.destroyCbs) {
            this.destroyCbs.push(callback);
        }
    };
    return ComponentRef;
}(ComponentRef));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * NOTE: changes to the `ngI18nClosureMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
if (typeof ngI18nClosureMode === 'undefined') {
    // These property accesses can be ignored because ngI18nClosureMode will be set to false
    // when optimizing code and the whole if statement will be dropped.
    // Make sure to refer to ngI18nClosureMode as ['ngI18nClosureMode'] for closure.
    // NOTE: we need to have it in IIFE so that the tree-shaker is happy.
    /*@__PURE__*/ (function () {
        // tslint:disable-next-line:no-toplevel-property-access
        _global['ngI18nClosureMode'] =
            // TODO(FW-1250): validate that this actually, you know, works.
            // tslint:disable-next-line:no-toplevel-property-access
            typeof goog !== 'undefined' && typeof goog.getMsg === 'function';
    })();
}
/**
 * Index of each type of locale data from the locale data array
 */
var LocaleDataIndex = /*@__PURE__*/ (function (LocaleDataIndex) {
    LocaleDataIndex[LocaleDataIndex["LocaleId"] = 0] = "LocaleId";
    LocaleDataIndex[LocaleDataIndex["DayPeriodsFormat"] = 1] = "DayPeriodsFormat";
    LocaleDataIndex[LocaleDataIndex["DayPeriodsStandalone"] = 2] = "DayPeriodsStandalone";
    LocaleDataIndex[LocaleDataIndex["DaysFormat"] = 3] = "DaysFormat";
    LocaleDataIndex[LocaleDataIndex["DaysStandalone"] = 4] = "DaysStandalone";
    LocaleDataIndex[LocaleDataIndex["MonthsFormat"] = 5] = "MonthsFormat";
    LocaleDataIndex[LocaleDataIndex["MonthsStandalone"] = 6] = "MonthsStandalone";
    LocaleDataIndex[LocaleDataIndex["Eras"] = 7] = "Eras";
    LocaleDataIndex[LocaleDataIndex["FirstDayOfWeek"] = 8] = "FirstDayOfWeek";
    LocaleDataIndex[LocaleDataIndex["WeekendRange"] = 9] = "WeekendRange";
    LocaleDataIndex[LocaleDataIndex["DateFormat"] = 10] = "DateFormat";
    LocaleDataIndex[LocaleDataIndex["TimeFormat"] = 11] = "TimeFormat";
    LocaleDataIndex[LocaleDataIndex["DateTimeFormat"] = 12] = "DateTimeFormat";
    LocaleDataIndex[LocaleDataIndex["NumberSymbols"] = 13] = "NumberSymbols";
    LocaleDataIndex[LocaleDataIndex["NumberFormats"] = 14] = "NumberFormats";
    LocaleDataIndex[LocaleDataIndex["CurrencyCode"] = 15] = "CurrencyCode";
    LocaleDataIndex[LocaleDataIndex["CurrencySymbol"] = 16] = "CurrencySymbol";
    LocaleDataIndex[LocaleDataIndex["CurrencyName"] = 17] = "CurrencyName";
    LocaleDataIndex[LocaleDataIndex["Currencies"] = 18] = "Currencies";
    LocaleDataIndex[LocaleDataIndex["PluralCase"] = 19] = "PluralCase";
    LocaleDataIndex[LocaleDataIndex["ExtraData"] = 20] = "ExtraData";
    return LocaleDataIndex;
})({});
/**
 * The locale id that the application is using by default (for translations and ICU expressions).
 */
var DEFAULT_LOCALE_ID = 'en-US';
/**
 * USD currency code that the application uses by default for CurrencyPipe when no
 * DEFAULT_CURRENCY_CODE is provided.
 */
var USD_CURRENCY_CODE = 'USD';
/**
 * The locale id that the application is currently using (for translations and ICU expressions).
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 */
var LOCALE_ID = DEFAULT_LOCALE_ID;
/**
 * Sets the locale id that will be used for translations and ICU expressions.
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 *
 * @param localeId
 */
function setLocaleId(localeId) {
    assertDefined(localeId, "Expected localeId to be defined");
    if (typeof localeId === 'string') {
        LOCALE_ID = localeId.toLowerCase().replace(/_/g, '-');
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Map of module-id to the corresponding NgModule.
 * - In pre Ivy we track NgModuleFactory,
 * - In post Ivy we track the NgModuleType
 */
var modules = /*@__PURE__*/ new Map();
function assertSameOrNotExisting(id, type, incoming) {
    if (type && type !== incoming) {
        throw new Error("Duplicate module registered for " + id + " - " + stringify(type) + " vs " + stringify(type.name));
    }
}
function registerNgModuleType(ngModuleType) {
    if (ngModuleType.ɵmod.id !== null) {
        var id = ngModuleType.ɵmod.id;
        var existing = modules.get(id);
        assertSameOrNotExisting(id, existing, ngModuleType);
        modules.set(id, ngModuleType);
    }
    var imports = ngModuleType.ɵmod.imports;
    if (imports instanceof Function) {
        imports = imports();
    }
    if (imports) {
        imports.forEach(function (i) { return registerNgModuleType(i); });
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var COMPONENT_FACTORY_RESOLVER = {
    provide: ComponentFactoryResolver,
    useClass: ComponentFactoryResolver$1,
    deps: [NgModuleRef],
};
var NgModuleRef$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(NgModuleRef$1, _super);
    function NgModuleRef$1(ngModuleType, _parent) {
        var _this = _super.call(this) || this;
        _this._parent = _parent;
        // tslint:disable-next-line:require-internal-with-underscore
        _this._bootstrapComponents = [];
        _this.injector = _this;
        _this.destroyCbs = [];
        var ngModuleDef = getNgModuleDef(ngModuleType);
        ngDevMode && assertDefined(ngModuleDef, "NgModule '" + stringify(ngModuleType) + "' is not a subtype of 'NgModuleType'.");
        var ngLocaleIdDef = getNgLocaleIdDef(ngModuleType);
        if (ngLocaleIdDef) {
            setLocaleId(ngLocaleIdDef);
        }
        _this._bootstrapComponents = maybeUnwrapFn(ngModuleDef.bootstrap);
        var additionalProviders = [
            {
                provide: NgModuleRef,
                useValue: _this,
            },
            COMPONENT_FACTORY_RESOLVER
        ];
        _this._r3Injector = createInjector(ngModuleType, _parent, additionalProviders, stringify(ngModuleType));
        _this.instance = _this.get(ngModuleType);
        return _this;
    }
    NgModuleRef$1.prototype.get = function (token, notFoundValue, injectFlags) {
        if (notFoundValue === void 0) {
            notFoundValue = Injector.THROW_IF_NOT_FOUND;
        }
        if (injectFlags === void 0) {
            injectFlags = InjectFlags.Default;
        }
        if (token === Injector || token === NgModuleRef || token === INJECTOR) {
            return this;
        }
        return this._r3Injector.get(token, notFoundValue, injectFlags);
    };
    Object.defineProperty(NgModuleRef$1.prototype, "componentFactoryResolver", {
        get: function () {
            return this.get(ComponentFactoryResolver);
        },
        enumerable: true,
        configurable: true
    });
    NgModuleRef$1.prototype.destroy = function () {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed');
        var injector = this._r3Injector;
        !injector.destroyed && injector.destroy();
        this.destroyCbs.forEach(function (fn) { return fn(); });
        this.destroyCbs = null;
    };
    NgModuleRef$1.prototype.onDestroy = function (callback) {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed');
        this.destroyCbs.push(callback);
    };
    return NgModuleRef$1;
}(NgModuleRef));
var NgModuleFactory$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(NgModuleFactory, _super);
    function NgModuleFactory(moduleType) {
        var _this = _super.call(this) || this;
        _this.moduleType = moduleType;
        var ngModuleDef = getNgModuleDef(moduleType);
        if (ngModuleDef !== null) {
            // Register the NgModule with Angular's module registry. The location (and hence timing) of
            // this call is critical to ensure this works correctly (modules get registered when expected)
            // without bloating bundles (modules are registered when otherwise not referenced).
            //
            // In View Engine, registration occurs in the .ngfactory.js file as a side effect. This has
            // several practical consequences:
            //
            // - If an .ngfactory file is not imported from, the module won't be registered (and can be
            //   tree shaken).
            // - If an .ngfactory file is imported from, the module will be registered even if an instance
            //   is not actually created (via `create` below).
            // - Since an .ngfactory file in View Engine references the .ngfactory files of the NgModule's
            //   imports,
            //
            // In Ivy, things are a bit different. .ngfactory files still exist for compatibility, but are
            // not a required API to use - there are other ways to obtain an NgModuleFactory for a given
            // NgModule. Thus, relying on a side effect in the .ngfactory file is not sufficient. Instead,
            // the side effect of registration is added here, in the constructor of NgModuleFactory,
            // ensuring no matter how a factory is created, the module is registered correctly.
            //
            // An alternative would be to include the registration side effect inline following the actual
            // NgModule definition. This also has the correct timing, but breaks tree-shaking - modules
            // will be registered and retained even if they're otherwise never referenced.
            registerNgModuleType(moduleType);
        }
        return _this;
    }
    NgModuleFactory.prototype.create = function (parentInjector) {
        return new NgModuleRef$1(this.moduleType, parentInjector);
    };
    return NgModuleFactory;
}(NgModuleFactory));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Use in components with the `@Output` directive to emit custom events
 * synchronously or asynchronously, and register handlers for those events
 * by subscribing to an instance.
 *
 * @usageNotes
 *
 * Extends
 * [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)
 * for Angular by adding the `emit()` method.
 *
 * In the following example, a component defines two output properties
 * that create event emitters. When the title is clicked, the emitter
 * emits an open or close event to toggle the current visibility state.
 *
 * ```html
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Access the event object with the `$event` argument passed to the output event
 * handler:
 *
 * ```html
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * @see [Observables in Angular](guide/observables-in-angular)
 * @publicApi
 */
var EventEmitter = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of this class that can
     * deliver events synchronously or asynchronously.
     *
     * @param isAsync When true, deliver events asynchronously.
     *
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) {
            isAsync = false;
        }
        var _this = _super.call(this) || this;
        _this.__isAsync = isAsync;
        return _this;
    }
    /**
     * Emits an event containing a given value.
     * @param value The value to emit.
     */
    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    /**
     * Registers handlers for events emitted by this instance.
     * @param generatorOrNext When supplied, a custom handler for emitted events.
     * @param error When supplied, a custom handler for an error notification
     * from this emitter.
     * @param complete When supplied, a custom handler for a completion
     * notification from this emitter.
     */
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? function (value) {
                setTimeout(function () { return generatorOrNext.next(value); });
            } : function (value) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                    function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                    function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                function (value) { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        var sink = _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
        if (generatorOrNext instanceof Subscription) {
            generatorOrNext.add(sink);
        }
        return sink;
    };
    return EventEmitter;
}(Subject));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function symbolIterator() {
    return this._results[getSymbolIterator$1()]();
}
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link ViewChildren}, {@link ContentChildren}, and {@link QueryList}
 * provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * @Component({...})
 * class Container {
 *   @ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 *
 * @publicApi
 */
var QueryList = /** @class */ /*@__PURE__*/ (function () {
    function QueryList() {
        this.dirty = true;
        this._results = [];
        this.changes = new EventEmitter();
        this.length = 0;
        // This function should be declared on the prototype, but doing so there will cause the class
        // declaration to have side-effects and become not tree-shakable. For this reason we do it in
        // the constructor.
        // [getSymbolIterator()](): Iterator<T> { ... }
        var symbol = getSymbolIterator$1();
        var proto = QueryList.prototype;
        if (!proto[symbol])
            proto[symbol] = symbolIterator;
    }
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    QueryList.prototype.map = function (fn) { return this._results.map(fn); };
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    QueryList.prototype.filter = function (fn) {
        return this._results.filter(fn);
    };
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    QueryList.prototype.find = function (fn) {
        return this._results.find(fn);
    };
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    QueryList.prototype.reduce = function (fn, init) {
        return this._results.reduce(fn, init);
    };
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    QueryList.prototype.some = function (fn) {
        return this._results.some(fn);
    };
    /**
     * Returns a copy of the internal results list as an Array.
     */
    QueryList.prototype.toArray = function () { return this._results.slice(); };
    QueryList.prototype.toString = function () { return this._results.toString(); };
    /**
     * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
     * on change detection, it will not notify of changes to the queries, unless a new change
     * occurs.
     *
     * @param resultsTree The query results to store
     */
    QueryList.prototype.reset = function (resultsTree) {
        this._results = flatten(resultsTree);
        this.dirty = false;
        this.length = this._results.length;
        this.last = this._results[this.length - 1];
        this.first = this._results[0];
    };
    /**
     * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
     */
    QueryList.prototype.notifyOnChanges = function () { this.changes.emit(this); };
    /** internal */
    QueryList.prototype.setDirty = function () { this.dirty = true; };
    /** internal */
    QueryList.prototype.destroy = function () {
        this.changes.complete();
        this.changes.unsubscribe();
    };
    return QueryList;
}());
var TQueries_ = /** @class */ /*@__PURE__*/ (function () {
    function TQueries_(queries) {
        if (queries === void 0) {
            queries = [];
        }
        this.queries = queries;
    }
    TQueries_.prototype.elementStart = function (tView, tNode) {
        ngDevMode && assertFirstCreatePass(tView, 'Queries should collect results on the first template pass only');
        for (var i = 0; i < this.queries.length; i++) {
            this.queries[i].elementStart(tView, tNode);
        }
    };
    TQueries_.prototype.elementEnd = function (tNode) {
        for (var i = 0; i < this.queries.length; i++) {
            this.queries[i].elementEnd(tNode);
        }
    };
    TQueries_.prototype.embeddedTView = function (tNode) {
        var queriesForTemplateRef = null;
        for (var i = 0; i < this.length; i++) {
            var childQueryIndex = queriesForTemplateRef !== null ? queriesForTemplateRef.length : 0;
            var tqueryClone = this.getByIndex(i).embeddedTView(tNode, childQueryIndex);
            if (tqueryClone) {
                tqueryClone.indexInDeclarationView = i;
                if (queriesForTemplateRef !== null) {
                    queriesForTemplateRef.push(tqueryClone);
                }
                else {
                    queriesForTemplateRef = [tqueryClone];
                }
            }
        }
        return queriesForTemplateRef !== null ? new TQueries_(queriesForTemplateRef) : null;
    };
    TQueries_.prototype.template = function (tView, tNode) {
        ngDevMode && assertFirstCreatePass(tView, 'Queries should collect results on the first template pass only');
        for (var i = 0; i < this.queries.length; i++) {
            this.queries[i].template(tView, tNode);
        }
    };
    TQueries_.prototype.getByIndex = function (index) {
        ngDevMode && assertDataInRange(this.queries, index);
        return this.queries[index];
    };
    Object.defineProperty(TQueries_.prototype, "length", {
        get: function () { return this.queries.length; },
        enumerable: true,
        configurable: true
    });
    TQueries_.prototype.track = function (tquery) { this.queries.push(tquery); };
    return TQueries_;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ɵ0$e = function (dir) {
    if (dir === void 0) {
        dir = {};
    }
    return dir;
};
var ɵ1$3 = function (type, meta) { return SWITCH_COMPILE_DIRECTIVE(type, meta); };
/**
 * Type of the Directive metadata.
 *
 * @publicApi
 */
var Directive = /*@__PURE__*/ makeDecorator('Directive', ɵ0$e, undefined, undefined, ɵ1$3);
var ɵ2$1 = function (c) {
    if (c === void 0) {
        c = {};
    }
    return (__assign({ changeDetection: ChangeDetectionStrategy.Default }, c));
};
var ɵ3$1 = function (type, meta) { return SWITCH_COMPILE_COMPONENT(type, meta); };
/**
 * Component decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
var Component = /*@__PURE__*/ makeDecorator('Component', ɵ2$1, Directive, undefined, ɵ3$1);
var ɵ4 = function (p) { return (__assign({ pure: true }, p)); };
var ɵ5 = function (type, meta) { return SWITCH_COMPILE_PIPE(type, meta); };
/**
 * @Annotation
 * @publicApi
 */
var Pipe = /*@__PURE__*/ makeDecorator('Pipe', ɵ4, undefined, undefined, ɵ5);
var ɵ6 = function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); };
/**
 * @Annotation
 * @publicApi
 */
var Input = /*@__PURE__*/ makePropDecorator('Input', ɵ6);
var ɵ7 = function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); };
/**
 * @Annotation
 * @publicApi
 */
var Output = /*@__PURE__*/ makePropDecorator('Output', ɵ7);
var ɵ8 = function (hostPropertyName) { return ({ hostPropertyName: hostPropertyName }); };
/**
 * @Annotation
 * @publicApi
 */
var HostBinding = /*@__PURE__*/ makePropDecorator('HostBinding', ɵ8);
var ɵ9 = function (eventName, args) { return ({ eventName: eventName, args: args }); };
/**
 * Decorator that binds a DOM event to a host listener and supplies configuration metadata.
 * Angular invokes the supplied handler method when the host element emits the specified event,
 * and updates the bound element with the result.
 *
 * If the handler method returns false, applies `preventDefault` on the bound element.
 *
 * @usageNotes
 *
 * The following example declares a directive
 * that attaches a click listener to a button and counts clicks.
 *
 * ```ts
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 *  }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: '<button counting>Increment</button>',
 * })
 * class App {}
 *
 * ```
 *
 * The following example registers another DOM event handler that listens for key-press events.
 * ``` ts
 * import { HostListener, Component } from "@angular/core";
 *
 * @Component({
 *   selector: 'app',
 *   template: `<h1>Hello, you have pressed keys {{counter}} number of times!</h1> Press any key to
 * increment the counter.
 *   <button (click)="resetCounter()">Reset Counter</button>`
 * })
 * class AppComponent {
 *   counter = 0;
 *   @HostListener('window:keydown', ['$event'])
 *   handleKeyDown(event: KeyboardEvent) {
 *     this.counter++;
 *   }
 *   resetCounter() {
 *     this.counter = 0;
 *   }
 * }
 * ```
 *
 * @Annotation
 * @publicApi
 */
var HostListener = /*@__PURE__*/ makePropDecorator('HostListener', ɵ9);
var SWITCH_COMPILE_COMPONENT__PRE_R3__ = noop$1;
var SWITCH_COMPILE_DIRECTIVE__PRE_R3__ = noop$1;
var SWITCH_COMPILE_PIPE__PRE_R3__ = noop$1;
var SWITCH_COMPILE_COMPONENT = SWITCH_COMPILE_COMPONENT__PRE_R3__;
var SWITCH_COMPILE_DIRECTIVE = SWITCH_COMPILE_DIRECTIVE__PRE_R3__;
var SWITCH_COMPILE_PIPE = SWITCH_COMPILE_PIPE__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ɵ0$f = function (ngModule) { return ngModule; };
var ɵ1$4 = 
/**
 * Decorator that marks the following class as an NgModule, and supplies
 * configuration metadata for it.
 *
 * * The `declarations` and `entryComponents` options configure the compiler
 * with information about what belongs to the NgModule.
 * * The `providers` options configures the NgModule's injector to provide
 * dependencies the NgModule members.
 * * The `imports` and `exports` options bring in members from other modules, and make
 * this module's members available to others.
 */
function (type, meta) { return SWITCH_COMPILE_NGMODULE(type, meta); };
/**
 * @Annotation
 * @publicApi
 */
var NgModule = /*@__PURE__*/ makeDecorator('NgModule', ɵ0$f, undefined, undefined, ɵ1$4);
function preR3NgModuleCompile(moduleType, metadata) {
    var imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = __spread(imports, [metadata.exports]);
    }
    moduleType.ɵinj = ɵɵdefineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
}
var SWITCH_COMPILE_NGMODULE__PRE_R3__ = preR3NgModuleCompile;
var SWITCH_COMPILE_NGMODULE = SWITCH_COMPILE_NGMODULE__PRE_R3__;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An injection token that allows you to provide one or more initialization functions.
 * These function are injected at application startup and executed during
 * app initialization. If any of these functions returns a Promise, initialization
 * does not complete until the Promise is resolved.
 *
 * You can, for example, create a factory function that loads language data
 * or an external configuration, and provide that function to the `APP_INITIALIZER` token.
 * That way, the function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * @publicApi
 */
var APP_INITIALIZER = /*@__PURE__*/ new InjectionToken('Application Initializer');
/**
 * A class that reflects the state of running {@link APP_INITIALIZER}s.
 *
 * @publicApi
 */
var ApplicationInitStatus = /** @class */ /*@__PURE__*/ (function () {
    function ApplicationInitStatus(appInits) {
        var _this = this;
        this.appInits = appInits;
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise(function (res, rej) {
            _this.resolve = res;
            _this.reject = rej;
        });
    }
    /** @internal */
    ApplicationInitStatus.prototype.runInitializers = function () {
        var _this = this;
        if (this.initialized) {
            return;
        }
        var asyncInitPromises = [];
        var complete = function () {
            _this.done = true;
            _this.resolve();
        };
        if (this.appInits) {
            for (var i = 0; i < this.appInits.length; i++) {
                var initResult = this.appInits[i]();
                if (isPromise$1(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        Promise.all(asyncInitPromises).then(function () { complete(); }).catch(function (e) { _this.reject(e); });
        if (asyncInitPromises.length === 0) {
            complete();
        }
        this.initialized = true;
    };
    return ApplicationInitStatus;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated ViewEncapsulation.Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @publicApi
 */
var APP_ID = /*@__PURE__*/ new InjectionToken('AppId');
function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @publicApi
 */
var APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: [],
};
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @publicApi
 */
var PLATFORM_INITIALIZER = /*@__PURE__*/ new InjectionToken('Platform Initializer');
/**
 * A token that indicates an opaque platform id.
 * @publicApi
 */
var PLATFORM_ID = /*@__PURE__*/ new InjectionToken('Platform ID');
/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @publicApi
 */
var APP_BOOTSTRAP_LISTENER = /*@__PURE__*/ new InjectionToken('appBootstrapListener');
/**
 * A token which indicates the root directory of the application
 * @publicApi
 */
var PACKAGE_ROOT_URL = /*@__PURE__*/ new InjectionToken('Application Packages Root URL');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Console = /** @class */ /*@__PURE__*/ (function () {
    function Console() {
    }
    Console.prototype.log = function (message) {
        // tslint:disable-next-line:no-console
        console.log(message);
    };
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    Console.prototype.warn = function (message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    };
    return Console;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provide this token to set the locale of your application.
 * It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
 * DecimalPipe and PercentPipe) and by ICU expressions.
 *
 * See the [i18n guide](guide/i18n#setting-up-locale) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { LOCALE_ID } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
 * });
 * ```
 *
 * @publicApi
 */
var LOCALE_ID$1 = /*@__PURE__*/ new InjectionToken('LocaleId');
/**
 * Provide this token to set the default currency code your application uses for
 * CurrencyPipe when there is no currency code passed into it. This is only used by
 * CurrencyPipe and has no relation to locale currency. Defaults to USD if not configured.
 *
 * See the [i18n guide](guide/i18n#setting-up-locale) for more information.
 *
 * <div class="alert is-helpful">
 *
 * **Deprecation notice:**
 *
 * The default currency code is currently always `USD` but this is deprecated from v9.
 *
 * **In v10 the default currency code will be taken from the current locale.**
 *
 * If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
 * your application `NgModule`:
 *
 * ```ts
 * {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
 * ```
 *
 * </div>
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
 * });
 * ```
 *
 * @publicApi
 */
var DEFAULT_CURRENCY_CODE = /*@__PURE__*/ new InjectionToken('DefaultCurrencyCode');
/**
 * Use this token at bootstrap to provide the content of your translation file (`xtb`,
 * `xlf` or `xlf2`) when you want to translate your application in another language.
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * // content of your translation file
 * const translations = '....';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS, useValue: translations }]
 * });
 * ```
 *
 * @publicApi
 */
var TRANSLATIONS = /*@__PURE__*/ new InjectionToken('Translations');
/**
 * Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
 * `xlf` or `xlf2`.
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS_FORMAT } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
 * });
 * ```
 *
 * @publicApi
 */
var TRANSLATIONS_FORMAT = /*@__PURE__*/ new InjectionToken('TranslationsFormat');
/**
 * Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
 * that the compiler should use in case of missing translations:
 * - Error: throw if you have missing translations.
 * - Warning (default): show a warning in the console and/or shell.
 * - Ignore: do nothing.
 *
 * See the [i18n guide](guide/i18n#missing-translation) for more information.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * import { MissingTranslationStrategy } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   missingTranslation: MissingTranslationStrategy.Error
 * });
 * ```
 *
 * @publicApi
 */
var MissingTranslationStrategy = /*@__PURE__*/ (function (MissingTranslationStrategy) {
    MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
    MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
    MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
    return MissingTranslationStrategy;
})({});
var SWITCH_IVY_ENABLED__PRE_R3__ = false;
var ivyEnabled = SWITCH_IVY_ENABLED__PRE_R3__;
function _throwError() {
    throw new Error("Runtime compiler is not loaded");
}
var Compiler_compileModuleSync__PRE_R3__ = _throwError;
var Compiler_compileModuleSync = Compiler_compileModuleSync__PRE_R3__;
var Compiler_compileModuleAsync__PRE_R3__ = _throwError;
var Compiler_compileModuleAsync = Compiler_compileModuleAsync__PRE_R3__;
var Compiler_compileModuleAndAllComponentsSync__PRE_R3__ = _throwError;
var Compiler_compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync__PRE_R3__;
var Compiler_compileModuleAndAllComponentsAsync__PRE_R3__ = _throwError;
var Compiler_compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync__PRE_R3__;
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 */
var Compiler = /** @class */ /*@__PURE__*/ (function () {
    function Compiler() {
        /**
         * Compiles the given NgModule and all of its components. All templates of the components listed
         * in `entryComponents` have to be inlined.
         */
        this.compileModuleSync = Compiler_compileModuleSync;
        /**
         * Compiles the given NgModule and all of its components
         */
        this.compileModuleAsync = Compiler_compileModuleAsync;
        /**
         * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
         */
        this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync;
        /**
         * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
         */
        this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync;
    }
    /**
     * Clears all caches.
     */
    Compiler.prototype.clearCache = function () { };
    /**
     * Clears the cache for the given component/ngModule.
     */
    Compiler.prototype.clearCacheFor = function (type) { };
    /**
     * Returns the id for a given NgModule, if one is defined and known to the compiler.
     */
    Compiler.prototype.getModuleId = function (moduleType) { return undefined; };
    return Compiler;
}());
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
var COMPILER_OPTIONS = /*@__PURE__*/ new InjectionToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
var CompilerFactory = /** @class */ /*@__PURE__*/ (function () {
    function CompilerFactory() {
    }
    return CompilerFactory;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var promise = /*@__PURE__*/ (function () { return Promise.resolve(0); })();
function scheduleMicroTask(fn) {
    if (typeof Zone === 'undefined') {
        // use promise to schedule microTask instead of use Zone
        promise.then(function () { fn && fn.apply(null, null); });
    }
    else {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function getNativeRequestAnimationFrame() {
    var nativeRequestAnimationFrame = _global['requestAnimationFrame'];
    var nativeCancelAnimationFrame = _global['cancelAnimationFrame'];
    if (typeof Zone !== 'undefined' && nativeRequestAnimationFrame && nativeCancelAnimationFrame) {
        // use unpatched version of requestAnimationFrame(native delegate) if possible
        // to avoid another Change detection
        var unpatchedRequestAnimationFrame = nativeRequestAnimationFrame[Zone.__symbol__('OriginalDelegate')];
        if (unpatchedRequestAnimationFrame) {
            nativeRequestAnimationFrame = unpatchedRequestAnimationFrame;
        }
        var unpatchedCancelAnimationFrame = nativeCancelAnimationFrame[Zone.__symbol__('OriginalDelegate')];
        if (unpatchedCancelAnimationFrame) {
            nativeCancelAnimationFrame = unpatchedCancelAnimationFrame;
        }
    }
    return { nativeRequestAnimationFrame: nativeRequestAnimationFrame, nativeCancelAnimationFrame: nativeCancelAnimationFrame };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * @publicApi
 */
var NgZone = /** @class */ /*@__PURE__*/ (function () {
    function NgZone(_a) {
        var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b, _c = _a.shouldCoalesceEventChangeDetection, shouldCoalesceEventChangeDetection = _c === void 0 ? false : _c;
        this.hasPendingMacrotasks = false;
        this.hasPendingMicrotasks = false;
        /**
         * Whether there are no outstanding microtasks or macrotasks.
         */
        this.isStable = true;
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        this.onUnstable = new EventEmitter(false);
        /**
         * Notifies when there is no more microtasks enqueued in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         */
        this.onMicrotaskEmpty = new EventEmitter(false);
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        this.onStable = new EventEmitter(false);
        /**
         * Notifies that an error has been delivered.
         */
        this.onError = new EventEmitter(false);
        if (typeof Zone == 'undefined') {
            throw new Error("In this configuration Angular requires Zone.js");
        }
        Zone.assertZonePatched();
        var self = this;
        self._nesting = 0;
        self._outer = self._inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
            self._inner = self._inner.fork(Zone['wtfZoneSpec']);
        }
        if (Zone['TaskTrackingZoneSpec']) {
            self._inner = self._inner.fork(new Zone['TaskTrackingZoneSpec']);
        }
        if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
            self._inner = self._inner.fork(Zone['longStackTraceZoneSpec']);
        }
        self.shouldCoalesceEventChangeDetection = shouldCoalesceEventChangeDetection;
        self.lastRequestAnimationFrameId = -1;
        self.nativeRequestAnimationFrame = getNativeRequestAnimationFrame().nativeRequestAnimationFrame;
        forkInnerZoneWithAngularBehavior(self);
    }
    NgZone.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
    NgZone.assertInAngularZone = function () {
        if (!NgZone.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    };
    NgZone.assertNotInAngularZone = function () {
        if (NgZone.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    };
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    NgZone.prototype.run = function (fn, applyThis, applyArgs) {
        return this._inner.run(fn, applyThis, applyArgs);
    };
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    NgZone.prototype.runTask = function (fn, applyThis, applyArgs, name) {
        var zone = this._inner;
        var task = zone.scheduleEventTask('NgZoneEvent: ' + name, fn, EMPTY_PAYLOAD, noop$1$1, noop$1$1);
        try {
            return zone.runTask(task, applyThis, applyArgs);
        }
        finally {
            zone.cancelTask(task);
        }
    };
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    NgZone.prototype.runGuarded = function (fn, applyThis, applyArgs) {
        return this._inner.runGuarded(fn, applyThis, applyArgs);
    };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    NgZone.prototype.runOutsideAngular = function (fn) {
        return this._outer.run(fn);
    };
    return NgZone;
}());
function noop$1$1() { }
var EMPTY_PAYLOAD = {};
function checkStable(zone) {
    if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
        try {
            zone._nesting++;
            zone.onMicrotaskEmpty.emit(null);
        }
        finally {
            zone._nesting--;
            if (!zone.hasPendingMicrotasks) {
                try {
                    zone.runOutsideAngular(function () { return zone.onStable.emit(null); });
                }
                finally {
                    zone.isStable = true;
                }
            }
        }
    }
}
function delayChangeDetectionForEvents(zone) {
    if (zone.lastRequestAnimationFrameId !== -1) {
        return;
    }
    zone.lastRequestAnimationFrameId = zone.nativeRequestAnimationFrame.call(_global, function () {
        zone.lastRequestAnimationFrameId = -1;
        updateMicroTaskStatus(zone);
        checkStable(zone);
    });
    updateMicroTaskStatus(zone);
}
function forkInnerZoneWithAngularBehavior(zone) {
    var delayChangeDetectionForEventsDelegate = function () { delayChangeDetectionForEvents(zone); };
    var maybeDelayChangeDetection = !!zone.shouldCoalesceEventChangeDetection &&
        zone.nativeRequestAnimationFrame && delayChangeDetectionForEventsDelegate;
    zone._inner = zone._inner.fork({
        name: 'angular',
        properties: { 'isAngularZone': true, 'maybeDelayChangeDetection': maybeDelayChangeDetection },
        onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
            try {
                onEnter(zone);
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            }
            finally {
                if (maybeDelayChangeDetection && task.type === 'eventTask') {
                    maybeDelayChangeDetection();
                }
                onLeave(zone);
            }
        },
        onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
            try {
                onEnter(zone);
                return delegate.invoke(target, callback, applyThis, applyArgs, source);
            }
            finally {
                onLeave(zone);
            }
        },
        onHasTask: function (delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (current === target) {
                // We are only interested in hasTask events which originate from our zone
                // (A child hasTask event is not interesting to us)
                if (hasTaskState.change == 'microTask') {
                    zone._hasPendingMicrotasks = hasTaskState.microTask;
                    updateMicroTaskStatus(zone);
                    checkStable(zone);
                }
                else if (hasTaskState.change == 'macroTask') {
                    zone.hasPendingMacrotasks = hasTaskState.macroTask;
                }
            }
        },
        onHandleError: function (delegate, current, target, error) {
            delegate.handleError(target, error);
            zone.runOutsideAngular(function () { return zone.onError.emit(error); });
            return false;
        }
    });
}
function updateMicroTaskStatus(zone) {
    if (zone._hasPendingMicrotasks ||
        (zone.shouldCoalesceEventChangeDetection && zone.lastRequestAnimationFrameId !== -1)) {
        zone.hasPendingMicrotasks = true;
    }
    else {
        zone.hasPendingMicrotasks = false;
    }
}
function onEnter(zone) {
    zone._nesting++;
    if (zone.isStable) {
        zone.isStable = false;
        zone.onUnstable.emit(null);
    }
}
function onLeave(zone) {
    zone._nesting--;
    checkStable(zone);
}
/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
var NoopNgZone = /** @class */ /*@__PURE__*/ (function () {
    function NoopNgZone() {
        this.hasPendingMicrotasks = false;
        this.hasPendingMacrotasks = false;
        this.isStable = true;
        this.onUnstable = new EventEmitter();
        this.onMicrotaskEmpty = new EventEmitter();
        this.onStable = new EventEmitter();
        this.onError = new EventEmitter();
    }
    NoopNgZone.prototype.run = function (fn, applyThis, applyArgs) {
        return fn.apply(applyThis, applyArgs);
    };
    NoopNgZone.prototype.runGuarded = function (fn, applyThis, applyArgs) {
        return fn.apply(applyThis, applyArgs);
    };
    NoopNgZone.prototype.runOutsideAngular = function (fn) { return fn(); };
    NoopNgZone.prototype.runTask = function (fn, applyThis, applyArgs, name) {
        return fn.apply(applyThis, applyArgs);
    };
    return NoopNgZone;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @publicApi
 */
var Testability = /** @class */ /*@__PURE__*/ (function () {
    function Testability(_ngZone) {
        var _this = this;
        this._ngZone = _ngZone;
        this._pendingCount = 0;
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        this._callbacks = [];
        this.taskTrackingZone = null;
        this._watchAngularEvents();
        _ngZone.run(function () {
            _this.taskTrackingZone =
                typeof Zone == 'undefined' ? null : Zone.current.get('TaskTrackingZone');
        });
    }
    Testability.prototype._watchAngularEvents = function () {
        var _this = this;
        this._ngZone.onUnstable.subscribe({
            next: function () {
                _this._didWork = true;
                _this._isZoneStable = false;
            }
        });
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.subscribe({
                next: function () {
                    NgZone.assertNotInAngularZone();
                    scheduleMicroTask(function () {
                        _this._isZoneStable = true;
                        _this._runCallbacksIfReady();
                    });
                }
            });
        });
    };
    /**
     * Increases the number of pending request
     * @deprecated pending requests are now tracked with zones.
     */
    Testability.prototype.increasePendingRequestCount = function () {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    };
    /**
     * Decreases the number of pending request
     * @deprecated pending requests are now tracked with zones
     */
    Testability.prototype.decreasePendingRequestCount = function () {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new Error('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    };
    /**
     * Whether an associated application is stable
     */
    Testability.prototype.isStable = function () {
        return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
    };
    Testability.prototype._runCallbacksIfReady = function () {
        var _this = this;
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            scheduleMicroTask(function () {
                while (_this._callbacks.length !== 0) {
                    var cb = _this._callbacks.pop();
                    clearTimeout(cb.timeoutId);
                    cb.doneCb(_this._didWork);
                }
                _this._didWork = false;
            });
        }
        else {
            // Still not stable, send updates.
            var pending_1 = this.getPendingTasks();
            this._callbacks = this._callbacks.filter(function (cb) {
                if (cb.updateCb && cb.updateCb(pending_1)) {
                    clearTimeout(cb.timeoutId);
                    return false;
                }
                return true;
            });
            this._didWork = true;
        }
    };
    Testability.prototype.getPendingTasks = function () {
        if (!this.taskTrackingZone) {
            return [];
        }
        // Copy the tasks data so that we don't leak tasks.
        return this.taskTrackingZone.macroTasks.map(function (t) {
            return {
                source: t.source,
                // From TaskTrackingZone:
                // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
                creationLocation: t.creationLocation,
                data: t.data
            };
        });
    };
    Testability.prototype.addCallback = function (cb, timeout, updateCb) {
        var _this = this;
        var timeoutId = -1;
        if (timeout && timeout > 0) {
            timeoutId = setTimeout(function () {
                _this._callbacks = _this._callbacks.filter(function (cb) { return cb.timeoutId !== timeoutId; });
                cb(_this._didWork, _this.getPendingTasks());
            }, timeout);
        }
        this._callbacks.push({ doneCb: cb, timeoutId: timeoutId, updateCb: updateCb });
    };
    /**
     * Wait for the application to be stable with a timeout. If the timeout is reached before that
     * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
     *
     * @param doneCb The callback to invoke when Angular is stable or the timeout expires
     *    whichever comes first.
     * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
     *    specified, whenStable() will wait forever.
     * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
     *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
     *    and no further updates will be issued.
     */
    Testability.prototype.whenStable = function (doneCb, timeout, updateCb) {
        if (updateCb && !this.taskTrackingZone) {
            throw new Error('Task tracking zone is required when passing an update callback to ' +
                'whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
        }
        // These arguments are 'Function' above to keep the public API simple.
        this.addCallback(doneCb, timeout, updateCb);
        this._runCallbacksIfReady();
    };
    /**
     * Get the number of pending requests
     * @deprecated pending requests are now tracked with zones
     */
    Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
    /**
     * Find providers by name
     * @param using The root element to search from
     * @param provider The name of binding variable
     * @param exactMatch Whether using exactMatch
     */
    Testability.prototype.findProviders = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    return Testability;
}());
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
var TestabilityRegistry = /** @class */ /*@__PURE__*/ (function () {
    function TestabilityRegistry() {
        /** @internal */
        this._applications = new Map();
        _testabilityGetter.addToWindow(this);
    }
    /**
     * Registers an application with a testability hook so that it can be tracked
     * @param token token of application, root element
     * @param testability Testability hook
     */
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        this._applications.set(token, testability);
    };
    /**
     * Unregisters an application.
     * @param token token of application, root element
     */
    TestabilityRegistry.prototype.unregisterApplication = function (token) { this._applications.delete(token); };
    /**
     * Unregisters all applications
     */
    TestabilityRegistry.prototype.unregisterAllApplications = function () { this._applications.clear(); };
    /**
     * Get a testability hook associated with the application
     * @param elem root element
     */
    TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem) || null; };
    /**
     * Get all registered testabilities
     */
    TestabilityRegistry.prototype.getAllTestabilities = function () { return Array.from(this._applications.values()); };
    /**
     * Get all registered applications(root elements)
     */
    TestabilityRegistry.prototype.getAllRootElements = function () { return Array.from(this._applications.keys()); };
    /**
     * Find testability of a node in the Tree
     * @param elem node
     * @param findInAncestors whether finding testability in ancestors if testability was not found in
     * current node
     */
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
        if (findInAncestors === void 0) {
            findInAncestors = true;
        }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    return TestabilityRegistry;
}());
var _NoopGetTestability = /** @class */ /*@__PURE__*/ (function () {
    function _NoopGetTestability() {
    }
    _NoopGetTestability.prototype.addToWindow = function (registry) { };
    _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        return null;
    };
    return _NoopGetTestability;
}());
var _testabilityGetter = /*@__PURE__*/ new _NoopGetTestability();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _platform;
var compileNgModuleFactory = compileNgModuleFactory__PRE_R3__;
function compileNgModuleFactory__PRE_R3__(injector, options, moduleType) {
    var compilerFactory = injector.get(CompilerFactory);
    var compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}
var isBoundToModule = isBoundToModule__PRE_R3__;
function isBoundToModule__PRE_R3__(cf) {
    return cf instanceof ComponentFactoryBoundToModule;
}
var ALLOW_MULTIPLE_PLATFORMS = /*@__PURE__*/ new InjectionToken('AllowMultipleToken');
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @publicApi
 */
function createPlatform(injector) {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    var inits = injector.get(PLATFORM_INITIALIZER, null);
    if (inits)
        inits.forEach(function (init) { return init(); });
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * @publicApi
 */
function createPlatformFactory(parentPlatformFactory, name, providers) {
    if (providers === void 0) {
        providers = [];
    }
    var desc = "Platform: " + name;
    var marker = new InjectionToken(desc);
    return function (extraProviders) {
        if (extraProviders === void 0) {
            extraProviders = [];
        }
        var platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                var injectedProviders = providers.concat(extraProviders).concat({ provide: marker, useValue: true }, {
                    provide: INJECTOR_SCOPE,
                    useValue: 'platform'
                });
                createPlatform(Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Checks that there currently is a platform which contains the given token as a provider.
 *
 * @publicApi
 */
function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Returns the current platform.
 *
 * @publicApi
 */
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when a platform is created via a platform factory
 * (e.g. {@link platformBrowser}), or explicitly by calling the {@link createPlatform} function.
 *
 * @publicApi
 */
var PlatformRef = /** @class */ /*@__PURE__*/ (function () {
    /** @internal */
    function PlatformRef(_injector) {
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * Creates an instance of an `@NgModule` for the given platform
     * for offline compilation.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {platformBrowser} from '@angular/platform-browser';
     *
     * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     */
    PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory, options) {
        var _this = this;
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        var ngZoneOption = options ? options.ngZone : undefined;
        var ngZoneEventCoalescing = (options && options.ngZoneEventCoalescing) || false;
        var ngZone = getNgZone(ngZoneOption, ngZoneEventCoalescing);
        var providers = [{ provide: NgZone, useValue: ngZone }];
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(function () {
            var ngZoneInjector = Injector.create({ providers: providers, parent: _this.injector, name: moduleFactory.moduleType.name });
            var moduleRef = moduleFactory.create(ngZoneInjector);
            var exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
            if (!exceptionHandler) {
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(function () { return remove(_this._modules, moduleRef); });
            ngZone.runOutsideAngular(function () { return ngZone.onError.subscribe({ next: function (error) { exceptionHandler.handleError(error); } }); });
            return _callAndReportToErrorHandler(exceptionHandler, ngZone, function () {
                var initStatus = moduleRef.injector.get(ApplicationInitStatus);
                initStatus.runInitializers();
                return initStatus.donePromise.then(function () {
                    if (ivyEnabled) {
                        // If the `LOCALE_ID` provider is defined at bootstrap then we set the value for ivy
                        var localeId = moduleRef.injector.get(LOCALE_ID$1, DEFAULT_LOCALE_ID);
                        setLocaleId(localeId || DEFAULT_LOCALE_ID);
                    }
                    _this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    };
    /**
     * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```typescript
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     *
     */
    PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        var _this = this;
        if (compilerOptions === void 0) {
            compilerOptions = [];
        }
        var options = optionsReducer({}, compilerOptions);
        return compileNgModuleFactory(this.injector, options, moduleType)
            .then(function (moduleFactory) { return _this.bootstrapModuleFactory(moduleFactory, options); });
    };
    PlatformRef.prototype._moduleDoBootstrap = function (moduleRef) {
        var appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef._bootstrapComponents.length > 0) {
            moduleRef._bootstrapComponents.forEach(function (f) { return appRef.bootstrap(f); });
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new Error("The module " + stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. " +
                "Please define one of these.");
        }
        this._modules.push(moduleRef);
    };
    /**
     * Register a listener to be called when the platform is disposed.
     */
    PlatformRef.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    PlatformRef.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(function (module) { return module.destroy(); });
        this._destroyListeners.forEach(function (listener) { return listener(); });
        this._destroyed = true;
    };
    Object.defineProperty(PlatformRef.prototype, "destroyed", {
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    return PlatformRef;
}());
function getNgZone(ngZoneOption, ngZoneEventCoalescing) {
    var ngZone;
    if (ngZoneOption === 'noop') {
        ngZone = new NoopNgZone();
    }
    else {
        ngZone = (ngZoneOption === 'zone.js' ? undefined : ngZoneOption) || new NgZone({
            enableLongStackTrace: isDevMode(),
            shouldCoalesceEventChangeDetection: ngZoneEventCoalescing
        });
    }
    return ngZone;
}
function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
    try {
        var result = callback();
        if (isPromise$1(result)) {
            return result.catch(function (e) {
                ngZone.runOutsideAngular(function () { return errorHandler.handleError(e); });
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        return result;
    }
    catch (e) {
        ngZone.runOutsideAngular(function () { return errorHandler.handleError(e); });
        // rethrow as the exception handler might not do it
        throw e;
    }
}
function optionsReducer(dst, objs) {
    if (Array.isArray(objs)) {
        dst = objs.reduce(optionsReducer, dst);
    }
    else {
        dst = __assign(__assign({}, dst), objs);
    }
    return dst;
}
/**
 * A reference to an Angular application running on a page.
 *
 * @usageNotes
 *
 * {@a is-stable-examples}
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * @publicApi
 */
var ApplicationRef = /** @class */ /*@__PURE__*/ (function () {
    /** @internal */
    function ApplicationRef(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
        var _this = this;
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        /** @internal */
        this._bootstrapListeners = [];
        this._views = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._stable = true;
        /**
         * Get a list of component types registered to this application.
         * This list is populated even before the component is created.
         */
        this.componentTypes = [];
        /**
         * Get a list of components registered to this application.
         */
        this.components = [];
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
        var isCurrentlyStable = new Observable(function (observer) {
            _this._stable = _this._zone.isStable && !_this._zone.hasPendingMacrotasks &&
                !_this._zone.hasPendingMicrotasks;
            _this._zone.runOutsideAngular(function () {
                observer.next(_this._stable);
                observer.complete();
            });
        });
        var isStable = new Observable(function (observer) {
            // Create the subscription to onStable outside the Angular Zone so that
            // the callback is run outside the Angular Zone.
            var stableSub;
            _this._zone.runOutsideAngular(function () {
                stableSub = _this._zone.onStable.subscribe(function () {
                    NgZone.assertNotInAngularZone();
                    // Check whether there are no pending macro/micro tasks in the next tick
                    // to allow for NgZone to update the state.
                    scheduleMicroTask(function () {
                        if (!_this._stable && !_this._zone.hasPendingMacrotasks &&
                            !_this._zone.hasPendingMicrotasks) {
                            _this._stable = true;
                            observer.next(true);
                        }
                    });
                });
            });
            var unstableSub = _this._zone.onUnstable.subscribe(function () {
                NgZone.assertInAngularZone();
                if (_this._stable) {
                    _this._stable = false;
                    _this._zone.runOutsideAngular(function () { observer.next(false); });
                }
            });
            return function () {
                stableSub.unsubscribe();
                unstableSub.unsubscribe();
            };
        });
        this.isStable =
            merge(isCurrentlyStable, isStable.pipe(share()));
    }
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * @usageNotes
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the componentType's
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * Optionally, a component can be mounted onto a DOM element that does not match the
     * componentType's selector.
     *
     * ### Example
     * {@example core/ts/platform/platform.ts region='longform'}
     */
    ApplicationRef.prototype.bootstrap = function (componentOrFactory, rootSelectorOrNode) {
        var _this = this;
        if (!this._initStatus.done) {
            throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        var componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory =
                this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this.componentTypes.push(componentFactory.componentType);
        // Create a factory associated with the current module if it's not bound to some other
        var ngModule = isBoundToModule(componentFactory) ? undefined : this._injector.get(NgModuleRef);
        var selectorOrNode = rootSelectorOrNode || componentFactory.selector;
        var compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
        compRef.onDestroy(function () { _this._unloadComponent(compRef); });
        var testability = compRef.injector.get(Testability, null);
        if (testability) {
            compRef.injector.get(TestabilityRegistry)
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
    };
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    ApplicationRef.prototype.tick = function () {
        var e_1, _a, e_2, _b;
        var _this = this;
        if (this._runningTick) {
            throw new Error('ApplicationRef.tick is called recursively');
        }
        try {
            this._runningTick = true;
            try {
                for (var _c = __values(this._views), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var view = _d.value;
                    view.detectChanges();
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return))
                        _a.call(_c);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            if (this._enforceNoNewChanges) {
                try {
                    for (var _e = __values(this._views), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var view = _f.value;
                        view.checkNoChanges();
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return))
                            _b.call(_e);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
            }
        }
        catch (e) {
            // Attention: Don't rethrow as it could cancel subscriptions to Observables!
            this._zone.runOutsideAngular(function () { return _this._exceptionHandler.handleError(e); });
        }
        finally {
            this._runningTick = false;
        }
    };
    /**
     * Attaches a view so that it will be dirty checked.
     * The view will be automatically detached when it is destroyed.
     * This will throw if the view is already attached to a ViewContainer.
     */
    ApplicationRef.prototype.attachView = function (viewRef) {
        var view = viewRef;
        this._views.push(view);
        view.attachToAppRef(this);
    };
    /**
     * Detaches a view from dirty checking again.
     */
    ApplicationRef.prototype.detachView = function (viewRef) {
        var view = viewRef;
        remove(this._views, view);
        view.detachFromAppRef();
    };
    ApplicationRef.prototype._loadComponent = function (componentRef) {
        this.attachView(componentRef.hostView);
        this.tick();
        this.components.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        var listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
        listeners.forEach(function (listener) { return listener(componentRef); });
    };
    ApplicationRef.prototype._unloadComponent = function (componentRef) {
        this.detachView(componentRef.hostView);
        remove(this.components, componentRef);
    };
    /** @internal */
    ApplicationRef.prototype.ngOnDestroy = function () {
        // TODO(alxhub): Dispose of the NgZone.
        this._views.slice().forEach(function (view) { return view.destroy(); });
    };
    Object.defineProperty(ApplicationRef.prototype, "viewCount", {
        /**
         * Returns the number of attached views.
         */
        get: function () { return this._views.length; },
        enumerable: true,
        configurable: true
    });
    return ApplicationRef;
}());
function remove(list, el) {
    var index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents an Angular [view](guide/glossary#view),
 * specifically the [host view](guide/glossary#view-tree) that is defined by a component.
 * Also serves as the base class
 * that adds destroy methods for [embedded views](guide/glossary#view-tree).
 *
 * @see `EmbeddedViewRef`
 *
 * @publicApi
 */
var ViewRef$1 = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(ViewRef, _super);
    function ViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ViewRef;
}(ChangeDetectorRef));
/**
 * Represents an Angular [view](guide/glossary#view) in a view container.
 * An [embedded view](guide/glossary#view-tree) can be referenced from a component
 * other than the hosting component whose template defines it, or it can be defined
 * independently by a `TemplateRef`.
 *
 * Properties of elements in a view can change, but the structure (number and order) of elements in
 * a view cannot. Change the structure of elements by inserting, moving, or
 * removing nested views in a view container.
 *
 * @see `ViewContainerRef`
 *
 * @usageNotes
 *
 * The following template breaks down into two separate `TemplateRef` instances,
 * an outer one and an inner one.
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * This is the outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * This is the inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * The outer and inner `TemplateRef` instances are assembled into views as follows:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @publicApi
 */
var EmbeddedViewRef = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmbeddedViewRef;
}(ViewRef$1));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @publicApi
 */
var DebugEventListener = /** @class */ /*@__PURE__*/ (function () {
    function DebugEventListener(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    return DebugEventListener;
}());
var DebugNode__PRE_R3__ = /** @class */ /*@__PURE__*/ (function () {
    function DebugNode__PRE_R3__(nativeNode, parent, _debugContext) {
        this.listeners = [];
        this.parent = null;
        this._debugContext = _debugContext;
        this.nativeNode = nativeNode;
        if (parent && parent instanceof DebugElement__PRE_R3__) {
            parent.addChild(this);
        }
    }
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "injector", {
        get: function () { return this._debugContext.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "componentInstance", {
        get: function () { return this._debugContext.component; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "context", {
        get: function () { return this._debugContext.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "references", {
        get: function () { return this._debugContext.references; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "providerTokens", {
        get: function () { return this._debugContext.providerTokens; },
        enumerable: true,
        configurable: true
    });
    return DebugNode__PRE_R3__;
}());
var DebugElement__PRE_R3__ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(DebugElement__PRE_R3__, _super);
    function DebugElement__PRE_R3__(nativeNode, parent, _debugContext) {
        var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
        _this.properties = {};
        _this.attributes = {};
        _this.classes = {};
        _this.styles = {};
        _this.childNodes = [];
        _this.nativeElement = nativeNode;
        return _this;
    }
    DebugElement__PRE_R3__.prototype.addChild = function (child) {
        if (child) {
            this.childNodes.push(child);
            child.parent = this;
        }
    };
    DebugElement__PRE_R3__.prototype.removeChild = function (child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    };
    DebugElement__PRE_R3__.prototype.insertChildrenAfter = function (child, newChildren) {
        var _a;
        var _this = this;
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            (_a = this.childNodes).splice.apply(_a, __spread([siblingIndex + 1, 0], newChildren));
            newChildren.forEach(function (c) {
                if (c.parent) {
                    c.parent.removeChild(c);
                }
                child.parent = _this;
            });
        }
    };
    DebugElement__PRE_R3__.prototype.insertBefore = function (refChild, newChild) {
        var refIndex = this.childNodes.indexOf(refChild);
        if (refIndex === -1) {
            this.addChild(newChild);
        }
        else {
            if (newChild.parent) {
                newChild.parent.removeChild(newChild);
            }
            newChild.parent = this;
            this.childNodes.splice(refIndex, 0, newChild);
        }
    };
    DebugElement__PRE_R3__.prototype.query = function (predicate) {
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    DebugElement__PRE_R3__.prototype.queryAll = function (predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    };
    DebugElement__PRE_R3__.prototype.queryAllNodes = function (predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    };
    Object.defineProperty(DebugElement__PRE_R3__.prototype, "children", {
        get: function () {
            return this
                .childNodes //
                .filter(function (node) { return node instanceof DebugElement__PRE_R3__; });
        },
        enumerable: true,
        configurable: true
    });
    DebugElement__PRE_R3__.prototype.triggerEventHandler = function (eventName, eventObj) {
        this.listeners.forEach(function (listener) {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    };
    return DebugElement__PRE_R3__;
}(DebugNode__PRE_R3__));
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function (node) {
        if (node instanceof DebugElement__PRE_R3__) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement__PRE_R3__) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement__PRE_R3__) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
var DebugNode__POST_R3__ = /** @class */ /*@__PURE__*/ (function () {
    function DebugNode__POST_R3__(nativeNode) {
        this.nativeNode = nativeNode;
    }
    Object.defineProperty(DebugNode__POST_R3__.prototype, "parent", {
        get: function () {
            var parent = this.nativeNode.parentNode;
            return parent ? new DebugElement__POST_R3__(parent) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "injector", {
        get: function () { return getInjector(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "componentInstance", {
        get: function () {
            var nativeElement = this.nativeNode;
            return nativeElement &&
                (getComponent(nativeElement) || getOwningComponent(nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "context", {
        get: function () {
            return getComponent(this.nativeNode) || getContext(this.nativeNode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "listeners", {
        get: function () {
            return getListeners(this.nativeNode).filter(function (listener) { return listener.type === 'dom'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "references", {
        get: function () { return getLocalRefs(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "providerTokens", {
        get: function () { return getInjectionTokens(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    return DebugNode__POST_R3__;
}());
var DebugElement__POST_R3__ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(DebugElement__POST_R3__, _super);
    function DebugElement__POST_R3__(nativeNode) {
        var _this = this;
        ngDevMode && assertDomNode(nativeNode);
        _this = _super.call(this, nativeNode) || this;
        return _this;
    }
    Object.defineProperty(DebugElement__POST_R3__.prototype, "nativeElement", {
        get: function () {
            return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "name", {
        get: function () {
            try {
                var context = loadLContext(this.nativeNode);
                var lView = context.lView;
                var tData = lView[TVIEW].data;
                var tNode = tData[context.nodeIndex];
                return tNode.tagName;
            }
            catch (e) {
                return this.nativeNode.nodeName;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "properties", {
        /**
         *  Gets a map of property names to property values for an element.
         *
         *  This map includes:
         *  - Regular property bindings (e.g. `[id]="id"`)
         *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
         *  - Interpolated property bindings (e.g. `id="{{ value }}")
         *
         *  It does not include:
         *  - input property bindings (e.g. `[myCustomInput]="value"`)
         *  - attribute bindings (e.g. `[attr.role]="menu"`)
         */
        get: function () {
            var context = loadLContext(this.nativeNode, false);
            if (context == null) {
                return {};
            }
            var lView = context.lView;
            var tData = lView[TVIEW].data;
            var tNode = tData[context.nodeIndex];
            var properties = {};
            // Collect properties from the DOM.
            copyDomProperties(this.nativeElement, properties);
            // Collect properties from the bindings. This is needed for animation renderer which has
            // synthetic properties which don't get reflected into the DOM.
            collectPropertyBindings(properties, tNode, lView, tData);
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "attributes", {
        get: function () {
            var attributes = {};
            var element = this.nativeElement;
            if (!element) {
                return attributes;
            }
            var context = loadLContext(element, false);
            if (context == null) {
                return {};
            }
            var lView = context.lView;
            var tNodeAttrs = lView[TVIEW].data[context.nodeIndex].attrs;
            var lowercaseTNodeAttrs = [];
            // For debug nodes we take the element's attribute directly from the DOM since it allows us
            // to account for ones that weren't set via bindings (e.g. ViewEngine keeps track of the ones
            // that are set through `Renderer2`). The problem is that the browser will lowercase all names,
            // however since we have the attributes already on the TNode, we can preserve the case by going
            // through them once, adding them to the `attributes` map and putting their lower-cased name
            // into an array. Afterwards when we're going through the native DOM attributes, we can check
            // whether we haven't run into an attribute already through the TNode.
            if (tNodeAttrs) {
                var i = 0;
                while (i < tNodeAttrs.length) {
                    var attrName = tNodeAttrs[i];
                    // Stop as soon as we hit a marker. We only care about the regular attributes. Everything
                    // else will be handled below when we read the final attributes off the DOM.
                    if (typeof attrName !== 'string')
                        break;
                    var attrValue = tNodeAttrs[i + 1];
                    attributes[attrName] = attrValue;
                    lowercaseTNodeAttrs.push(attrName.toLowerCase());
                    i += 2;
                }
            }
            var eAttrs = element.attributes;
            for (var i = 0; i < eAttrs.length; i++) {
                var attr = eAttrs[i];
                var lowercaseName = attr.name.toLowerCase();
                // Make sure that we don't assign the same attribute both in its
                // case-sensitive form and the lower-cased one from the browser.
                if (lowercaseTNodeAttrs.indexOf(lowercaseName) === -1) {
                    // Save the lowercase name to align the behavior between browsers.
                    // IE preserves the case, while all other browser convert it to lower case.
                    attributes[lowercaseName] = attr.value;
                }
            }
            return attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "styles", {
        get: function () {
            if (this.nativeElement && this.nativeElement.style) {
                return this.nativeElement.style;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "classes", {
        get: function () {
            var result = {};
            var element = this.nativeElement;
            // SVG elements return an `SVGAnimatedString` instead of a plain string for the `className`.
            var className = element.className;
            var classes = className && typeof className !== 'string' ? className.baseVal.split(' ') :
                className.split(' ');
            classes.forEach(function (value) { return result[value] = true; });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "childNodes", {
        get: function () {
            var childNodes = this.nativeNode.childNodes;
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "children", {
        get: function () {
            var nativeElement = this.nativeElement;
            if (!nativeElement)
                return [];
            var childNodes = nativeElement.children;
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    DebugElement__POST_R3__.prototype.query = function (predicate) {
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    DebugElement__POST_R3__.prototype.queryAll = function (predicate) {
        var matches = [];
        _queryAllR3(this, predicate, matches, true);
        return matches;
    };
    DebugElement__POST_R3__.prototype.queryAllNodes = function (predicate) {
        var matches = [];
        _queryAllR3(this, predicate, matches, false);
        return matches;
    };
    DebugElement__POST_R3__.prototype.triggerEventHandler = function (eventName, eventObj) {
        var node = this.nativeNode;
        var invokedListeners = [];
        this.listeners.forEach(function (listener) {
            if (listener.name === eventName) {
                var callback = listener.callback;
                callback.call(node, eventObj);
                invokedListeners.push(callback);
            }
        });
        // We need to check whether `eventListeners` exists, because it's something
        // that Zone.js only adds to `EventTarget` in browser environments.
        if (typeof node.eventListeners === 'function') {
            // Note that in Ivy we wrap event listeners with a call to `event.preventDefault` in some
            // cases. We use '__ngUnwrap__' as a special token that gives us access to the actual event
            // listener.
            node.eventListeners(eventName).forEach(function (listener) {
                // In order to ensure that we can detect the special __ngUnwrap__ token described above, we
                // use `toString` on the listener and see if it contains the token. We use this approach to
                // ensure that it still worked with compiled code since it cannot remove or rename string
                // literals. We also considered using a special function name (i.e. if(listener.name ===
                // special)) but that was more cumbersome and we were also concerned the compiled code could
                // strip the name, turning the condition in to ("" === "") and always returning true.
                if (listener.toString().indexOf('__ngUnwrap__') !== -1) {
                    var unwrappedListener = listener('__ngUnwrap__');
                    return invokedListeners.indexOf(unwrappedListener) === -1 &&
                        unwrappedListener.call(node, eventObj);
                }
            });
        }
    };
    return DebugElement__POST_R3__;
}(DebugNode__POST_R3__));
function copyDomProperties(element, properties) {
    if (element) {
        // Skip own properties (as those are patched)
        var obj = Object.getPrototypeOf(element);
        var NodePrototype = Node.prototype;
        while (obj !== null && obj !== NodePrototype) {
            var descriptors = Object.getOwnPropertyDescriptors(obj);
            for (var key in descriptors) {
                if (!key.startsWith('__') && !key.startsWith('on')) {
                    // don't include properties starting with `__` and `on`.
                    // `__` are patched values which should not be included.
                    // `on` are listeners which also should not be included.
                    var value = element[key];
                    if (isPrimitiveValue(value)) {
                        properties[key] = value;
                    }
                }
            }
            obj = Object.getPrototypeOf(obj);
        }
    }
}
function isPrimitiveValue(value) {
    return typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number' ||
        value === null;
}
function _queryAllR3(parentElement, predicate, matches, elementsOnly) {
    var context = loadLContext(parentElement.nativeNode, false);
    if (context !== null) {
        var parentTNode = context.lView[TVIEW].data[context.nodeIndex];
        _queryNodeChildrenR3(parentTNode, context.lView, predicate, matches, elementsOnly, parentElement.nativeNode);
    }
    else {
        // If the context is null, then `parentElement` was either created with Renderer2 or native DOM
        // APIs.
        _queryNativeNodeDescendants(parentElement.nativeNode, predicate, matches, elementsOnly);
    }
}
/**
 * Recursively match the current TNode against the predicate, and goes on with the next ones.
 *
 * @param tNode the current TNode
 * @param lView the LView of this TNode
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _queryNodeChildrenR3(tNode, lView, predicate, matches, elementsOnly, rootNativeNode) {
    var e_1, _a;
    var nativeNode = getNativeByTNodeOrNull(tNode, lView);
    // For each type of TNode, specific logic is executed.
    if (tNode.type === 3 /* Element */ || tNode.type === 4 /* ElementContainer */) {
        // Case 1: the TNode is an element
        // The native node has to be checked.
        _addQueryMatchR3(nativeNode, predicate, matches, elementsOnly, rootNativeNode);
        if (isComponentHost(tNode)) {
            // If the element is the host of a component, then all nodes in its view have to be processed.
            // Note: the component's content (tNode.child) will be processed from the insertion points.
            var componentView = getComponentLViewByIndex(tNode.index, lView);
            if (componentView && componentView[TVIEW].firstChild) {
                _queryNodeChildrenR3(componentView[TVIEW].firstChild, componentView, predicate, matches, elementsOnly, rootNativeNode);
            }
        }
        else {
            if (tNode.child) {
                // Otherwise, its children have to be processed.
                _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
            }
            // We also have to query the DOM directly in order to catch elements inserted through
            // Renderer2. Note that this is __not__ optimal, because we're walking similar trees multiple
            // times. ViewEngine could do it more efficiently, because all the insertions go through
            // Renderer2, however that's not the case in Ivy. This approach is being used because:
            // 1. Matching the ViewEngine behavior would mean potentially introducing a depedency
            //    from `Renderer2` to Ivy which could bring Ivy code into ViewEngine.
            // 2. We would have to make `Renderer3` "know" about debug nodes.
            // 3. It allows us to capture nodes that were inserted directly via the DOM.
            nativeNode && _queryNativeNodeDescendants(nativeNode, predicate, matches, elementsOnly);
        }
        // In all cases, if a dynamic container exists for this node, each view inside it has to be
        // processed.
        var nodeOrContainer = lView[tNode.index];
        if (isLContainer(nodeOrContainer)) {
            _queryNodeChildrenInContainerR3(nodeOrContainer, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
    else if (tNode.type === 0 /* Container */) {
        // Case 2: the TNode is a container
        // The native node has to be checked.
        var lContainer = lView[tNode.index];
        _addQueryMatchR3(lContainer[NATIVE], predicate, matches, elementsOnly, rootNativeNode);
        // Each view inside the container has to be processed.
        _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode);
    }
    else if (tNode.type === 1 /* Projection */) {
        // Case 3: the TNode is a projection insertion point (i.e. a <ng-content>).
        // The nodes projected at this location all need to be processed.
        var componentView = lView[DECLARATION_COMPONENT_VIEW];
        var componentHost = componentView[T_HOST];
        var head = componentHost.projection[tNode.projection];
        if (Array.isArray(head)) {
            try {
                for (var head_1 = __values(head), head_1_1 = head_1.next(); !head_1_1.done; head_1_1 = head_1.next()) {
                    var nativeNode_1 = head_1_1.value;
                    _addQueryMatchR3(nativeNode_1, predicate, matches, elementsOnly, rootNativeNode);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (head_1_1 && !head_1_1.done && (_a = head_1.return))
                        _a.call(head_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        }
        else if (head) {
            var nextLView = componentView[PARENT];
            var nextTNode = nextLView[TVIEW].data[head.index];
            _queryNodeChildrenR3(nextTNode, nextLView, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
    else if (tNode.child) {
        // Case 4: the TNode is a view.
        _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
    }
    // We don't want to go to the next sibling of the root node.
    if (rootNativeNode !== nativeNode) {
        // To determine the next node to be processed, we need to use the next or the projectionNext
        // link, depending on whether the current node has been projected.
        var nextTNode = (tNode.flags & 4 /* isProjected */) ? tNode.projectionNext : tNode.next;
        if (nextTNode) {
            _queryNodeChildrenR3(nextTNode, lView, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
}
/**
 * Process all TNodes in a given container.
 *
 * @param lContainer the container to be processed
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode) {
    for (var i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        var childView = lContainer[i];
        _queryNodeChildrenR3(childView[TVIEW].node, childView, predicate, matches, elementsOnly, rootNativeNode);
    }
}
/**
 * Match the current native node against the predicate.
 *
 * @param nativeNode the current native node
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _addQueryMatchR3(nativeNode, predicate, matches, elementsOnly, rootNativeNode) {
    if (rootNativeNode !== nativeNode) {
        var debugNode = getDebugNode$1(nativeNode);
        if (!debugNode) {
            return;
        }
        // Type of the "predicate and "matches" array are set based on the value of
        // the "elementsOnly" parameter. TypeScript is not able to properly infer these
        // types with generics, so we manually cast the parameters accordingly.
        if (elementsOnly && debugNode instanceof DebugElement__POST_R3__ && predicate(debugNode) &&
            matches.indexOf(debugNode) === -1) {
            matches.push(debugNode);
        }
        else if (!elementsOnly && predicate(debugNode) &&
            matches.indexOf(debugNode) === -1) {
            matches.push(debugNode);
        }
    }
}
/**
 * Match all the descendants of a DOM node against a predicate.
 *
 * @param nativeNode the current native node
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 */
function _queryNativeNodeDescendants(parentNode, predicate, matches, elementsOnly) {
    var nodes = parentNode.childNodes;
    var length = nodes.length;
    for (var i = 0; i < length; i++) {
        var node = nodes[i];
        var debugNode = getDebugNode$1(node);
        if (debugNode) {
            if (elementsOnly && debugNode instanceof DebugElement__POST_R3__ && predicate(debugNode) &&
                matches.indexOf(debugNode) === -1) {
                matches.push(debugNode);
            }
            else if (!elementsOnly && predicate(debugNode) &&
                matches.indexOf(debugNode) === -1) {
                matches.push(debugNode);
            }
            _queryNativeNodeDescendants(node, predicate, matches, elementsOnly);
        }
    }
}
/**
 * Iterates through the property bindings for a given node and generates
 * a map of property names to values. This map only contains property bindings
 * defined in templates, not in host bindings.
 */
function collectPropertyBindings(properties, tNode, lView, tData) {
    var bindingIndexes = tNode.propertyBindings;
    if (bindingIndexes !== null) {
        for (var i = 0; i < bindingIndexes.length; i++) {
            var bindingIndex = bindingIndexes[i];
            var propMetadata = tData[bindingIndex];
            var metadataParts = propMetadata.split(INTERPOLATION_DELIMITER);
            var propertyName = metadataParts[0];
            if (metadataParts.length > 1) {
                var value = metadataParts[1];
                for (var j = 1; j < metadataParts.length - 1; j++) {
                    value += renderStringify(lView[bindingIndex + j - 1]) + metadataParts[j + 1];
                }
                properties[propertyName] = value;
            }
            else {
                properties[propertyName] = lView[bindingIndex];
            }
        }
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var _nativeNodeToDebugNode = /*@__PURE__*/ new Map();
function getDebugNode__PRE_R3__(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode) || null;
}
var NG_DEBUG_PROPERTY = '__ng_debug__';
function getDebugNode__POST_R3__(nativeNode) {
    if (nativeNode instanceof Node) {
        if (!(nativeNode.hasOwnProperty(NG_DEBUG_PROPERTY))) {
            nativeNode[NG_DEBUG_PROPERTY] = nativeNode.nodeType == Node.ELEMENT_NODE ?
                new DebugElement__POST_R3__(nativeNode) :
                new DebugNode__POST_R3__(nativeNode);
        }
        return nativeNode[NG_DEBUG_PROPERTY];
    }
    return null;
}
/**
 * @publicApi
 */
var getDebugNode$1 = getDebugNode__PRE_R3__;
function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _CORE_PLATFORM_PROVIDERS = [
    // Set a default platform name for platforms that don't set it explicitly.
    { provide: PLATFORM_ID, useValue: 'unknown' },
    { provide: PlatformRef, deps: [Injector] },
    { provide: TestabilityRegistry, deps: [] },
    { provide: Console, deps: [] },
];
/**
 * This platform has to be included in any other platform
 *
 * @publicApi
 */
var platformCore = /*@__PURE__*/ createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function _iterableDiffersFactory() {
    return defaultIterableDiffers;
}
function _keyValueDiffersFactory() {
    return defaultKeyValueDiffers;
}
function _localeFactory(locale) {
    locale = locale || getGlobalLocale();
    if (ivyEnabled) {
        setLocaleId(locale);
    }
    return locale;
}
/**
 * Work out the locale from the potential global properties.
 *
 * * Closure Compiler: use `goog.LOCALE`.
 * * Ivy enabled: use `$localize.locale`
 */
function getGlobalLocale() {
    if (typeof ngI18nClosureMode !== 'undefined' && ngI18nClosureMode &&
        typeof goog !== 'undefined' && goog.LOCALE !== 'en') {
        // * The default `goog.LOCALE` value is `en`, while Angular used `en-US`.
        // * In order to preserve backwards compatibility, we use Angular default value over
        //   Closure Compiler's one.
        return goog.LOCALE;
    }
    else {
        // KEEP `typeof $localize !== 'undefined' && $localize.locale` IN SYNC WITH THE LOCALIZE
        // COMPILE-TIME INLINER.
        //
        // * During compile time inlining of translations the expression will be replaced
        //   with a string literal that is the current locale. Other forms of this expression are not
        //   guaranteed to be replaced.
        //
        // * During runtime translation evaluation, the developer is required to set `$localize.locale`
        //   if required, or just to provide their own `LOCALE_ID` provider.
        return (ivyEnabled && typeof $localize !== 'undefined' && $localize.locale) ||
            DEFAULT_LOCALE_ID;
    }
}
var ɵ0$g = USD_CURRENCY_CODE;
/**
 * A built-in [dependency injection token](guide/glossary#di-token)
 * that is used to configure the root injector for bootstrapping.
 */
var APPLICATION_MODULE_PROVIDERS = [
    {
        provide: ApplicationRef,
        useClass: ApplicationRef,
        deps: [NgZone, Console, Injector, ErrorHandler, ComponentFactoryResolver, ApplicationInitStatus]
    },
    { provide: SCHEDULER, deps: [NgZone], useFactory: zoneSchedulerFactory },
    {
        provide: ApplicationInitStatus,
        useClass: ApplicationInitStatus,
        deps: [[/*@__PURE__*/ new Optional(), APP_INITIALIZER]]
    },
    { provide: Compiler, useClass: Compiler, deps: [] },
    APP_ID_RANDOM_PROVIDER,
    { provide: IterableDiffers, useFactory: _iterableDiffersFactory, deps: [] },
    { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory, deps: [] },
    {
        provide: LOCALE_ID$1,
        useFactory: _localeFactory,
        deps: [[/*@__PURE__*/ new Inject(LOCALE_ID$1), /*@__PURE__*/ new Optional(), /*@__PURE__*/ new SkipSelf()]]
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: ɵ0$g },
];
/**
 * Schedule work at next available slot.
 *
 * In Ivy this is just `requestAnimationFrame`. For compatibility reasons when bootstrapped
 * using `platformRef.bootstrap` we need to use `NgZone.onStable` as the scheduling mechanism.
 * This overrides the scheduling mechanism in Ivy to `NgZone.onStable`.
 *
 * @param ngZone NgZone to use for scheduling.
 */
function zoneSchedulerFactory(ngZone) {
    var queue = [];
    ngZone.onStable.subscribe(function () {
        while (queue.length) {
            queue.pop()();
        }
    });
    return function (fn) { queue.push(fn); };
}
function createElement(view, renderHost, def) {
    var elDef = def.element;
    var rootSelectorOrNode = view.root.selectorOrNode;
    var renderer = view.renderer;
    var el;
    if (view.parent || !rootSelectorOrNode) {
        if (elDef.name) {
            el = renderer.createElement(elDef.name, elDef.ns);
        }
        else {
            el = renderer.createComment('');
        }
        var parentEl = getParentRenderElement(view, renderHost, def);
        if (parentEl) {
            renderer.appendChild(parentEl, el);
        }
    }
    else {
        // when using native Shadow DOM, do not clear the root element contents to allow slot projection
        var preserveContent = (!!elDef.componentRendererType &&
            elDef.componentRendererType.encapsulation === ViewEncapsulation$1.ShadowDom);
        el = renderer.selectRootElement(rootSelectorOrNode, preserveContent);
    }
    if (elDef.attrs) {
        for (var i = 0; i < elDef.attrs.length; i++) {
            var _a = __read(elDef.attrs[i], 3), ns = _a[0], name_2 = _a[1], value = _a[2];
            renderer.setAttribute(el, name_2, value, ns);
        }
    }
    return el;
}
function listenToElementOutputs(view, compView, def, el) {
    for (var i = 0; i < def.outputs.length; i++) {
        var output = def.outputs[i];
        var handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, elementEventFullName(output.target, output.eventName));
        var listenTarget = output.target;
        var listenerView = view;
        if (output.target === 'component') {
            listenTarget = null;
            listenerView = compView;
        }
        var disposable = listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure);
        view.disposables[def.outputIndex + i] = disposable;
    }
}
function renderEventHandlerClosure(view, index, eventName) {
    return function (event) { return dispatchEvent(view, index, eventName, event); };
}
function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var bindLen = def.bindings.length;
    var changed = false;
    if (bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9))
        changed = true;
    return changed;
}
function checkAndUpdateElementDynamic(view, def, values) {
    var changed = false;
    for (var i = 0; i < values.length; i++) {
        if (checkAndUpdateElementValue(view, def, i, values[i]))
            changed = true;
    }
    return changed;
}
function checkAndUpdateElementValue(view, def, bindingIdx, value) {
    if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
        return false;
    }
    var binding = def.bindings[bindingIdx];
    var elData = asElementData(view, def.nodeIndex);
    var renderNode = elData.renderElement;
    var name = binding.name;
    switch (binding.flags & 15 /* Types */) {
        case 1 /* TypeElementAttribute */:
            setElementAttribute(view, binding, renderNode, binding.ns, name, value);
            break;
        case 2 /* TypeElementClass */:
            setElementClass(view, renderNode, name, value);
            break;
        case 4 /* TypeElementStyle */:
            setElementStyle(view, binding, renderNode, name, value);
            break;
        case 8 /* TypeProperty */:
            var bindView = (def.flags & 33554432 /* ComponentView */ &&
                binding.flags & 32 /* SyntheticHostProperty */) ?
                elData.componentView :
                view;
            setElementProperty(bindView, binding, renderNode, name, value);
            break;
    }
    return true;
}
function setElementAttribute(view, binding, renderNode, ns, name, value) {
    var securityContext = binding.securityContext;
    var renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    renderValue = renderValue != null ? renderValue.toString() : null;
    var renderer = view.renderer;
    if (value != null) {
        renderer.setAttribute(renderNode, name, renderValue, ns);
    }
    else {
        renderer.removeAttribute(renderNode, name, ns);
    }
}
function setElementClass(view, renderNode, name, value) {
    var renderer = view.renderer;
    if (value) {
        renderer.addClass(renderNode, name);
    }
    else {
        renderer.removeClass(renderNode, name);
    }
}
function setElementStyle(view, binding, renderNode, name, value) {
    var renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
    if (renderValue != null) {
        renderValue = renderValue.toString();
        var unit = binding.suffix;
        if (unit != null) {
            renderValue = renderValue + unit;
        }
    }
    else {
        renderValue = null;
    }
    var renderer = view.renderer;
    if (renderValue != null) {
        renderer.setStyle(renderNode, name, renderValue);
    }
    else {
        renderer.removeStyle(renderNode, name);
    }
}
function setElementProperty(view, binding, renderNode, name, value) {
    var securityContext = binding.securityContext;
    var renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    view.renderer.setProperty(renderNode, name, renderValue);
}
function createQuery() {
    return new QueryList();
}
function dirtyParentQueries(view) {
    var queryIds = view.def.nodeMatchedQueries;
    while (view.parent && isEmbeddedView(view)) {
        var tplDef = view.parentNodeDef;
        view = view.parent;
        // content queries
        var end = tplDef.nodeIndex + tplDef.childCount;
        for (var i = 0; i <= end; i++) {
            var nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & 67108864 /* TypeContentQuery */) &&
                (nodeDef.flags & 536870912 /* DynamicQuery */) &&
                (nodeDef.query.filterId & queryIds) === nodeDef.query.filterId) {
                asQueryList(view, i).setDirty();
            }
            if ((nodeDef.flags & 1 /* TypeElement */ && i + nodeDef.childCount < tplDef.nodeIndex) ||
                !(nodeDef.childFlags & 67108864 /* TypeContentQuery */) ||
                !(nodeDef.childFlags & 536870912 /* DynamicQuery */)) {
                // skip elements that don't contain the template element or no query.
                i += nodeDef.childCount;
            }
        }
    }
    // view queries
    if (view.def.nodeFlags & 134217728 /* TypeViewQuery */) {
        for (var i = 0; i < view.def.nodes.length; i++) {
            var nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & 134217728 /* TypeViewQuery */) && (nodeDef.flags & 536870912 /* DynamicQuery */)) {
                asQueryList(view, i).setDirty();
            }
            // only visit the root nodes
            i += nodeDef.childCount;
        }
    }
}
function checkAndUpdateQuery(view, nodeDef) {
    var queryList = asQueryList(view, nodeDef.nodeIndex);
    if (!queryList.dirty) {
        return;
    }
    var directiveInstance;
    var newValues = undefined;
    if (nodeDef.flags & 67108864 /* TypeContentQuery */) {
        var elementDef = nodeDef.parent.parent;
        newValues = calcQueryValues(view, elementDef.nodeIndex, elementDef.nodeIndex + elementDef.childCount, nodeDef.query, []);
        directiveInstance = asProviderData(view, nodeDef.parent.nodeIndex).instance;
    }
    else if (nodeDef.flags & 134217728 /* TypeViewQuery */) {
        newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, nodeDef.query, []);
        directiveInstance = view.component;
    }
    queryList.reset(newValues);
    var bindings = nodeDef.query.bindings;
    var notify = false;
    for (var i = 0; i < bindings.length; i++) {
        var binding = bindings[i];
        var boundValue = void 0;
        switch (binding.bindingType) {
            case 0 /* First */:
                boundValue = queryList.first;
                break;
            case 1 /* All */:
                boundValue = queryList;
                notify = true;
                break;
        }
        directiveInstance[binding.propName] = boundValue;
    }
    if (notify) {
        queryList.notifyOnChanges();
    }
}
function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
    for (var i = startIndex; i <= endIndex; i++) {
        var nodeDef = view.def.nodes[i];
        var valueType = nodeDef.matchedQueries[queryDef.id];
        if (valueType != null) {
            values.push(getQueryValue(view, nodeDef, valueType));
        }
        if (nodeDef.flags & 1 /* TypeElement */ && nodeDef.element.template &&
            (nodeDef.element.template.nodeMatchedQueries & queryDef.filterId) ===
                queryDef.filterId) {
            var elementData = asElementData(view, i);
            // check embedded views that were attached at the place of their template,
            // but process child nodes first if some match the query (see issue #16568)
            if ((nodeDef.childMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                calcQueryValues(view, i + 1, i + nodeDef.childCount, queryDef, values);
                i += nodeDef.childCount;
            }
            if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                for (var k = 0; k < embeddedViews.length; k++) {
                    var embeddedView = embeddedViews[k];
                    var dvc = declaredViewContainer(embeddedView);
                    if (dvc && dvc === elementData) {
                        calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                    }
                }
            }
            var projectedViews = elementData.template._projectedViews;
            if (projectedViews) {
                for (var k = 0; k < projectedViews.length; k++) {
                    var projectedView = projectedViews[k];
                    calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                }
            }
        }
        if ((nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId) {
            // if no child matches the query, skip the children.
            i += nodeDef.childCount;
        }
    }
    return values;
}
function getQueryValue(view, nodeDef, queryValueType) {
    if (queryValueType != null) {
        // a match
        switch (queryValueType) {
            case 1 /* RenderElement */:
                return asElementData(view, nodeDef.nodeIndex).renderElement;
            case 0 /* ElementRef */:
                return new ElementRef(asElementData(view, nodeDef.nodeIndex).renderElement);
            case 2 /* TemplateRef */:
                return asElementData(view, nodeDef.nodeIndex).template;
            case 3 /* ViewContainerRef */:
                return asElementData(view, nodeDef.nodeIndex).viewContainer;
            case 4 /* Provider */:
                return asProviderData(view, nodeDef.nodeIndex).instance;
        }
    }
}
function appendNgContent(view, renderHost, def) {
    var parentEl = getParentRenderElement(view, renderHost, def);
    if (!parentEl) {
        // Nothing to do if there is no parent element.
        return;
    }
    var ngContentIndex = def.ngContent.index;
    visitProjectedRenderNodes(view, ngContentIndex, 1 /* AppendChild */, parentEl, null, undefined);
}
function createPureExpression(view, def) {
    return { value: undefined };
}
function checkAndUpdatePureExpressionInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var bindings = def.bindings;
    var changed = false;
    var bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    if (changed) {
        var data = asPureExpressionData(view, def.nodeIndex);
        var value = void 0;
        switch (def.flags & 201347067 /* Types */) {
            case 32 /* TypePureArray */:
                value = [];
                if (bindLen > 0)
                    value.push(v0);
                if (bindLen > 1)
                    value.push(v1);
                if (bindLen > 2)
                    value.push(v2);
                if (bindLen > 3)
                    value.push(v3);
                if (bindLen > 4)
                    value.push(v4);
                if (bindLen > 5)
                    value.push(v5);
                if (bindLen > 6)
                    value.push(v6);
                if (bindLen > 7)
                    value.push(v7);
                if (bindLen > 8)
                    value.push(v8);
                if (bindLen > 9)
                    value.push(v9);
                break;
            case 64 /* TypePureObject */:
                value = {};
                if (bindLen > 0)
                    value[bindings[0].name] = v0;
                if (bindLen > 1)
                    value[bindings[1].name] = v1;
                if (bindLen > 2)
                    value[bindings[2].name] = v2;
                if (bindLen > 3)
                    value[bindings[3].name] = v3;
                if (bindLen > 4)
                    value[bindings[4].name] = v4;
                if (bindLen > 5)
                    value[bindings[5].name] = v5;
                if (bindLen > 6)
                    value[bindings[6].name] = v6;
                if (bindLen > 7)
                    value[bindings[7].name] = v7;
                if (bindLen > 8)
                    value[bindings[8].name] = v8;
                if (bindLen > 9)
                    value[bindings[9].name] = v9;
                break;
            case 128 /* TypePurePipe */:
                var pipe = v0;
                switch (bindLen) {
                    case 1:
                        value = pipe.transform(v0);
                        break;
                    case 2:
                        value = pipe.transform(v1);
                        break;
                    case 3:
                        value = pipe.transform(v1, v2);
                        break;
                    case 4:
                        value = pipe.transform(v1, v2, v3);
                        break;
                    case 5:
                        value = pipe.transform(v1, v2, v3, v4);
                        break;
                    case 6:
                        value = pipe.transform(v1, v2, v3, v4, v5);
                        break;
                    case 7:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6);
                        break;
                    case 8:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7);
                        break;
                    case 9:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8);
                        break;
                    case 10:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8, v9);
                        break;
                }
                break;
        }
        data.value = value;
    }
    return changed;
}
function checkAndUpdatePureExpressionDynamic(view, def, values) {
    var bindings = def.bindings;
    var changed = false;
    for (var i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    if (changed) {
        var data = asPureExpressionData(view, def.nodeIndex);
        var value = void 0;
        switch (def.flags & 201347067 /* Types */) {
            case 32 /* TypePureArray */:
                value = values;
                break;
            case 64 /* TypePureObject */:
                value = {};
                for (var i = 0; i < values.length; i++) {
                    value[bindings[i].name] = values[i];
                }
                break;
            case 128 /* TypePurePipe */:
                var pipe = values[0];
                var params = values.slice(1);
                value = pipe.transform.apply(pipe, __spread(params));
                break;
        }
        data.value = value;
    }
    return changed;
}
function createText(view, renderHost, def) {
    var renderNode;
    var renderer = view.renderer;
    renderNode = renderer.createText(def.text.prefix);
    var parentEl = getParentRenderElement(view, renderHost, def);
    if (parentEl) {
        renderer.appendChild(parentEl, renderNode);
    }
    return { renderText: renderNode };
}
function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var changed = false;
    var bindings = def.bindings;
    var bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    if (changed) {
        var value = def.text.prefix;
        if (bindLen > 0)
            value += _addInterpolationPart(v0, bindings[0]);
        if (bindLen > 1)
            value += _addInterpolationPart(v1, bindings[1]);
        if (bindLen > 2)
            value += _addInterpolationPart(v2, bindings[2]);
        if (bindLen > 3)
            value += _addInterpolationPart(v3, bindings[3]);
        if (bindLen > 4)
            value += _addInterpolationPart(v4, bindings[4]);
        if (bindLen > 5)
            value += _addInterpolationPart(v5, bindings[5]);
        if (bindLen > 6)
            value += _addInterpolationPart(v6, bindings[6]);
        if (bindLen > 7)
            value += _addInterpolationPart(v7, bindings[7]);
        if (bindLen > 8)
            value += _addInterpolationPart(v8, bindings[8]);
        if (bindLen > 9)
            value += _addInterpolationPart(v9, bindings[9]);
        var renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
function checkAndUpdateTextDynamic(view, def, values) {
    var bindings = def.bindings;
    var changed = false;
    for (var i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    if (changed) {
        var value = '';
        for (var i = 0; i < values.length; i++) {
            value = value + _addInterpolationPart(values[i], bindings[i]);
        }
        value = def.text.prefix + value;
        var renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
function _addInterpolationPart(value, binding) {
    var valueStr = value != null ? value.toString() : '';
    return valueStr + binding.suffix;
}
function createEmbeddedView(parent, anchorDef, viewDef, context) {
    // embedded views are seen as siblings to the anchor, so we need
    // to get the parent of the anchor and use it as parentIndex.
    var view = createView(parent.root, parent.renderer, parent, anchorDef, viewDef);
    initView(view, parent.component, context);
    createViewNodes(view);
    return view;
}
function createRootView(root, def, context) {
    var view = createView(root, root.renderer, null, null, def);
    initView(view, context, context);
    createViewNodes(view);
    return view;
}
function createComponentView(parentView, nodeDef, viewDef, hostElement) {
    var rendererType = nodeDef.element.componentRendererType;
    var compRenderer;
    if (!rendererType) {
        compRenderer = parentView.root.renderer;
    }
    else {
        compRenderer = parentView.root.rendererFactory.createRenderer(hostElement, rendererType);
    }
    return createView(parentView.root, compRenderer, parentView, nodeDef.element.componentProvider, viewDef);
}
function createView(root, renderer, parent, parentNodeDef, def) {
    var nodes = new Array(def.nodes.length);
    var disposables = def.outputCount ? new Array(def.outputCount) : null;
    var view = {
        def: def,
        parent: parent,
        viewContainerParent: null, parentNodeDef: parentNodeDef,
        context: null,
        component: null, nodes: nodes,
        state: 13 /* CatInit */, root: root, renderer: renderer,
        oldValues: new Array(def.bindingCount), disposables: disposables,
        initIndex: -1
    };
    return view;
}
function initView(view, component, context) {
    view.component = component;
    view.context = context;
}
function createViewNodes(view) {
    var renderHost;
    if (isComponentView(view)) {
        var hostDef = view.parentNodeDef;
        renderHost = asElementData(view.parent, hostDef.parent.nodeIndex).renderElement;
    }
    var def = view.def;
    var nodes = view.nodes;
    for (var i = 0; i < def.nodes.length; i++) {
        var nodeDef = def.nodes[i];
        Services.setCurrentNode(view, i);
        var nodeData = void 0;
        switch (nodeDef.flags & 201347067 /* Types */) {
            case 1 /* TypeElement */:
                var el = createElement(view, renderHost, nodeDef);
                var componentView = undefined;
                if (nodeDef.flags & 33554432 /* ComponentView */) {
                    var compViewDef = resolveDefinition(nodeDef.element.componentView);
                    componentView = Services.createComponentView(view, nodeDef, compViewDef, el);
                }
                listenToElementOutputs(view, componentView, nodeDef, el);
                nodeData = {
                    renderElement: el,
                    componentView: componentView,
                    viewContainer: null,
                    template: nodeDef.element.template ? createTemplateData(view, nodeDef) : undefined
                };
                if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
                    nodeData.viewContainer = createViewContainerData(view, nodeDef, nodeData);
                }
                break;
            case 2 /* TypeText */:
                nodeData = createText(view, renderHost, nodeDef);
                break;
            case 512 /* TypeClassProvider */:
            case 1024 /* TypeFactoryProvider */:
            case 2048 /* TypeUseExistingProvider */:
            case 256 /* TypeValueProvider */: {
                nodeData = nodes[i];
                if (!nodeData && !(nodeDef.flags & 4096 /* LazyProvider */)) {
                    var instance = createProviderInstance(view, nodeDef);
                    nodeData = { instance: instance };
                }
                break;
            }
            case 16 /* TypePipe */: {
                var instance = createPipeInstance(view, nodeDef);
                nodeData = { instance: instance };
                break;
            }
            case 16384 /* TypeDirective */: {
                nodeData = nodes[i];
                if (!nodeData) {
                    var instance = createDirectiveInstance(view, nodeDef);
                    nodeData = { instance: instance };
                }
                if (nodeDef.flags & 32768 /* Component */) {
                    var compView = asElementData(view, nodeDef.parent.nodeIndex).componentView;
                    initView(compView, nodeData.instance, nodeData.instance);
                }
                break;
            }
            case 32 /* TypePureArray */:
            case 64 /* TypePureObject */:
            case 128 /* TypePurePipe */:
                nodeData = createPureExpression(view, nodeDef);
                break;
            case 67108864 /* TypeContentQuery */:
            case 134217728 /* TypeViewQuery */:
                nodeData = createQuery();
                break;
            case 8 /* TypeNgContent */:
                appendNgContent(view, renderHost, nodeDef);
                // no runtime data needed for NgContent...
                nodeData = undefined;
                break;
        }
        nodes[i] = nodeData;
    }
    // Create the ViewData.nodes of component views after we created everything else,
    // so that e.g. ng-content works
    execComponentViewsAction(view, ViewAction.CreateViewNodes);
    // fill static content and view queries
    execQueriesAction(view, 67108864 /* TypeContentQuery */ | 134217728 /* TypeViewQuery */, 268435456 /* StaticQuery */, 0 /* CheckAndUpdate */);
}
function checkNoChangesView(view) {
    markProjectedViewsForCheck(view);
    Services.updateDirectives(view, 1 /* CheckNoChanges */);
    execEmbeddedViewsAction(view, ViewAction.CheckNoChanges);
    Services.updateRenderer(view, 1 /* CheckNoChanges */);
    execComponentViewsAction(view, ViewAction.CheckNoChanges);
    // Note: We don't check queries for changes as we didn't do this in v2.x.
    // TODO(tbosch): investigate if we can enable the check again in v5.x with a nicer error message.
    view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
}
function checkAndUpdateView(view) {
    if (view.state & 1 /* BeforeFirstCheck */) {
        view.state &= ~1 /* BeforeFirstCheck */;
        view.state |= 2 /* FirstCheck */;
    }
    else {
        view.state &= ~2 /* FirstCheck */;
    }
    shiftInitState(view, 0 /* InitState_BeforeInit */, 256 /* InitState_CallingOnInit */);
    markProjectedViewsForCheck(view);
    Services.updateDirectives(view, 0 /* CheckAndUpdate */);
    execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, 67108864 /* TypeContentQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    var callInit = shiftInitState(view, 256 /* InitState_CallingOnInit */, 512 /* InitState_CallingAfterContentInit */);
    callLifecycleHooksChildrenFirst(view, 2097152 /* AfterContentChecked */ | (callInit ? 1048576 /* AfterContentInit */ : 0));
    Services.updateRenderer(view, 0 /* CheckAndUpdate */);
    execComponentViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, 134217728 /* TypeViewQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    callInit = shiftInitState(view, 512 /* InitState_CallingAfterContentInit */, 768 /* InitState_CallingAfterViewInit */);
    callLifecycleHooksChildrenFirst(view, 8388608 /* AfterViewChecked */ | (callInit ? 4194304 /* AfterViewInit */ : 0));
    if (view.def.flags & 2 /* OnPush */) {
        view.state &= ~8 /* ChecksEnabled */;
    }
    view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
    shiftInitState(view, 768 /* InitState_CallingAfterViewInit */, 1024 /* InitState_AfterInit */);
}
function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === 0 /* Inline */) {
        return checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        return checkAndUpdateNodeDynamic(view, nodeDef, v0);
    }
}
function markProjectedViewsForCheck(view) {
    var def = view.def;
    if (!(def.nodeFlags & 4 /* ProjectedTemplate */)) {
        return;
    }
    for (var i = 0; i < def.nodes.length; i++) {
        var nodeDef = def.nodes[i];
        if (nodeDef.flags & 4 /* ProjectedTemplate */) {
            var projectedViews = asElementData(view, i).template._projectedViews;
            if (projectedViews) {
                for (var i_1 = 0; i_1 < projectedViews.length; i_1++) {
                    var projectedView = projectedViews[i_1];
                    projectedView.state |= 32 /* CheckProjectedView */;
                    markParentViewsForCheckProjectedViews(projectedView, view);
                }
            }
        }
        else if ((nodeDef.childFlags & 4 /* ProjectedTemplate */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
function checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    switch (nodeDef.flags & 201347067 /* Types */) {
        case 1 /* TypeElement */:
            return checkAndUpdateElementInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 2 /* TypeText */:
            return checkAndUpdateTextInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 16384 /* TypeDirective */:
            return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 32 /* TypePureArray */:
        case 64 /* TypePureObject */:
        case 128 /* TypePurePipe */:
            return checkAndUpdatePureExpressionInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        default:
            throw 'unreachable';
    }
}
function checkAndUpdateNodeDynamic(view, nodeDef, values) {
    switch (nodeDef.flags & 201347067 /* Types */) {
        case 1 /* TypeElement */:
            return checkAndUpdateElementDynamic(view, nodeDef, values);
        case 2 /* TypeText */:
            return checkAndUpdateTextDynamic(view, nodeDef, values);
        case 16384 /* TypeDirective */:
            return checkAndUpdateDirectiveDynamic(view, nodeDef, values);
        case 32 /* TypePureArray */:
        case 64 /* TypePureObject */:
        case 128 /* TypePurePipe */:
            return checkAndUpdatePureExpressionDynamic(view, nodeDef, values);
        default:
            throw 'unreachable';
    }
}
function checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === 0 /* Inline */) {
        checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        checkNoChangesNodeDynamic(view, nodeDef, v0);
    }
    // Returning false is ok here as we would have thrown in case of a change.
    return false;
}
function checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var bindLen = nodeDef.bindings.length;
    if (bindLen > 0)
        checkBindingNoChanges(view, nodeDef, 0, v0);
    if (bindLen > 1)
        checkBindingNoChanges(view, nodeDef, 1, v1);
    if (bindLen > 2)
        checkBindingNoChanges(view, nodeDef, 2, v2);
    if (bindLen > 3)
        checkBindingNoChanges(view, nodeDef, 3, v3);
    if (bindLen > 4)
        checkBindingNoChanges(view, nodeDef, 4, v4);
    if (bindLen > 5)
        checkBindingNoChanges(view, nodeDef, 5, v5);
    if (bindLen > 6)
        checkBindingNoChanges(view, nodeDef, 6, v6);
    if (bindLen > 7)
        checkBindingNoChanges(view, nodeDef, 7, v7);
    if (bindLen > 8)
        checkBindingNoChanges(view, nodeDef, 8, v8);
    if (bindLen > 9)
        checkBindingNoChanges(view, nodeDef, 9, v9);
}
function checkNoChangesNodeDynamic(view, nodeDef, values) {
    for (var i = 0; i < values.length; i++) {
        checkBindingNoChanges(view, nodeDef, i, values[i]);
    }
}
/**
 * Workaround https://github.com/angular/tsickle/issues/497
 * @suppress {misplacedTypeAnnotation}
 */
function checkNoChangesQuery(view, nodeDef) {
    var queryList = asQueryList(view, nodeDef.nodeIndex);
    if (queryList.dirty) {
        throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, nodeDef.nodeIndex), "Query " + nodeDef.query.id + " not dirty", "Query " + nodeDef.query.id + " dirty", (view.state & 1 /* BeforeFirstCheck */) !== 0);
    }
}
function destroyView(view) {
    if (view.state & 128 /* Destroyed */) {
        return;
    }
    execEmbeddedViewsAction(view, ViewAction.Destroy);
    execComponentViewsAction(view, ViewAction.Destroy);
    callLifecycleHooksChildrenFirst(view, 131072 /* OnDestroy */);
    if (view.disposables) {
        for (var i = 0; i < view.disposables.length; i++) {
            view.disposables[i]();
        }
    }
    detachProjectedView(view);
    if (view.renderer.destroyNode) {
        destroyViewNodes(view);
    }
    if (isComponentView(view)) {
        view.renderer.destroy();
    }
    view.state |= 128 /* Destroyed */;
}
function destroyViewNodes(view) {
    var len = view.def.nodes.length;
    for (var i = 0; i < len; i++) {
        var def = view.def.nodes[i];
        if (def.flags & 1 /* TypeElement */) {
            view.renderer.destroyNode(asElementData(view, i).renderElement);
        }
        else if (def.flags & 2 /* TypeText */) {
            view.renderer.destroyNode(asTextData(view, i).renderText);
        }
        else if (def.flags & 67108864 /* TypeContentQuery */ || def.flags & 134217728 /* TypeViewQuery */) {
            asQueryList(view, i).destroy();
        }
    }
}
var ViewAction = /*@__PURE__*/ (function (ViewAction) {
    ViewAction[ViewAction["CreateViewNodes"] = 0] = "CreateViewNodes";
    ViewAction[ViewAction["CheckNoChanges"] = 1] = "CheckNoChanges";
    ViewAction[ViewAction["CheckNoChangesProjectedViews"] = 2] = "CheckNoChangesProjectedViews";
    ViewAction[ViewAction["CheckAndUpdate"] = 3] = "CheckAndUpdate";
    ViewAction[ViewAction["CheckAndUpdateProjectedViews"] = 4] = "CheckAndUpdateProjectedViews";
    ViewAction[ViewAction["Destroy"] = 5] = "Destroy";
    return ViewAction;
})({});
function execComponentViewsAction(view, action) {
    var def = view.def;
    if (!(def.nodeFlags & 33554432 /* ComponentView */)) {
        return;
    }
    for (var i = 0; i < def.nodes.length; i++) {
        var nodeDef = def.nodes[i];
        if (nodeDef.flags & 33554432 /* ComponentView */) {
            // a leaf
            callViewAction(asElementData(view, i).componentView, action);
        }
        else if ((nodeDef.childFlags & 33554432 /* ComponentView */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
function execEmbeddedViewsAction(view, action) {
    var def = view.def;
    if (!(def.nodeFlags & 16777216 /* EmbeddedViews */)) {
        return;
    }
    for (var i = 0; i < def.nodes.length; i++) {
        var nodeDef = def.nodes[i];
        if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
            // a leaf
            var embeddedViews = asElementData(view, i).viewContainer._embeddedViews;
            for (var k = 0; k < embeddedViews.length; k++) {
                callViewAction(embeddedViews[k], action);
            }
        }
        else if ((nodeDef.childFlags & 16777216 /* EmbeddedViews */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
function callViewAction(view, action) {
    var viewState = view.state;
    switch (action) {
        case ViewAction.CheckNoChanges:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
                    checkNoChangesView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews);
                }
            }
            break;
        case ViewAction.CheckNoChangesProjectedViews:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if (viewState & 32 /* CheckProjectedView */) {
                    checkNoChangesView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, action);
                }
            }
            break;
        case ViewAction.CheckAndUpdate:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
                    checkAndUpdateView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews);
                }
            }
            break;
        case ViewAction.CheckAndUpdateProjectedViews:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if (viewState & 32 /* CheckProjectedView */) {
                    checkAndUpdateView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, action);
                }
            }
            break;
        case ViewAction.Destroy:
            // Note: destroyView recurses over all views,
            // so we don't need to special case projected views here.
            destroyView(view);
            break;
        case ViewAction.CreateViewNodes:
            createViewNodes(view);
            break;
    }
}
function execProjectedViewsAction(view, action) {
    execEmbeddedViewsAction(view, action);
    execComponentViewsAction(view, action);
}
function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, checkType) {
    if (!(view.def.nodeFlags & queryFlags) || !(view.def.nodeFlags & staticDynamicQueryFlag)) {
        return;
    }
    var nodeCount = view.def.nodes.length;
    for (var i = 0; i < nodeCount; i++) {
        var nodeDef = view.def.nodes[i];
        if ((nodeDef.flags & queryFlags) && (nodeDef.flags & staticDynamicQueryFlag)) {
            Services.setCurrentNode(view, nodeDef.nodeIndex);
            switch (checkType) {
                case 0 /* CheckAndUpdate */:
                    checkAndUpdateQuery(view, nodeDef);
                    break;
                case 1 /* CheckNoChanges */:
                    checkNoChangesQuery(view, nodeDef);
                    break;
            }
        }
        if (!(nodeDef.childFlags & queryFlags) || !(nodeDef.childFlags & staticDynamicQueryFlag)) {
            // no child has a matching query
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var initialized = false;
function initServicesIfNeeded() {
    if (initialized) {
        return;
    }
    initialized = true;
    var services = isDevMode() ? createDebugServices() : createProdServices();
    Services.setCurrentNode = services.setCurrentNode;
    Services.createRootView = services.createRootView;
    Services.createEmbeddedView = services.createEmbeddedView;
    Services.createComponentView = services.createComponentView;
    Services.createNgModuleRef = services.createNgModuleRef;
    Services.overrideProvider = services.overrideProvider;
    Services.overrideComponentView = services.overrideComponentView;
    Services.clearOverrides = services.clearOverrides;
    Services.checkAndUpdateView = services.checkAndUpdateView;
    Services.checkNoChangesView = services.checkNoChangesView;
    Services.destroyView = services.destroyView;
    Services.resolveDep = resolveDep;
    Services.createDebugContext = services.createDebugContext;
    Services.handleEvent = services.handleEvent;
    Services.updateDirectives = services.updateDirectives;
    Services.updateRenderer = services.updateRenderer;
    Services.dirtyParentQueries = dirtyParentQueries;
}
function createProdServices() {
    return {
        setCurrentNode: function () { },
        createRootView: createProdRootView,
        createEmbeddedView: createEmbeddedView,
        createComponentView: createComponentView,
        createNgModuleRef: createNgModuleRef,
        overrideProvider: NOOP,
        overrideComponentView: NOOP,
        clearOverrides: NOOP,
        checkAndUpdateView: checkAndUpdateView,
        checkNoChangesView: checkNoChangesView,
        destroyView: destroyView,
        createDebugContext: function (view, nodeIndex) { return new DebugContext_(view, nodeIndex); },
        handleEvent: function (view, nodeIndex, eventName, event) {
            return view.def.handleEvent(view, nodeIndex, eventName, event);
        },
        updateDirectives: function (view, checkType) {
            return view.def.updateDirectives(checkType === 0 /* CheckAndUpdate */ ? prodCheckAndUpdateNode :
                prodCheckNoChangesNode, view);
        },
        updateRenderer: function (view, checkType) {
            return view.def.updateRenderer(checkType === 0 /* CheckAndUpdate */ ? prodCheckAndUpdateNode :
                prodCheckNoChangesNode, view);
        },
    };
}
function createDebugServices() {
    return {
        setCurrentNode: debugSetCurrentNode,
        createRootView: debugCreateRootView,
        createEmbeddedView: debugCreateEmbeddedView,
        createComponentView: debugCreateComponentView,
        createNgModuleRef: debugCreateNgModuleRef,
        overrideProvider: debugOverrideProvider,
        overrideComponentView: debugOverrideComponentView,
        clearOverrides: debugClearOverrides,
        checkAndUpdateView: debugCheckAndUpdateView,
        checkNoChangesView: debugCheckNoChangesView,
        destroyView: debugDestroyView,
        createDebugContext: function (view, nodeIndex) { return new DebugContext_(view, nodeIndex); },
        handleEvent: debugHandleEvent,
        updateDirectives: debugUpdateDirectives,
        updateRenderer: debugUpdateRenderer,
    };
}
function createProdRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
    var rendererFactory = ngModule.injector.get(RendererFactory2);
    return createRootView(createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode), def, context);
}
function debugCreateRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
    var rendererFactory = ngModule.injector.get(RendererFactory2);
    var root = createRootData(elInjector, ngModule, new DebugRendererFactory2(rendererFactory), projectableNodes, rootSelectorOrNode);
    var defWithOverride = applyProviderOverridesToView(def);
    return callWithDebugContext(DebugAction.create, createRootView, null, [root, defWithOverride, context]);
}
function createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode) {
    var sanitizer = ngModule.injector.get(Sanitizer);
    var errorHandler = ngModule.injector.get(ErrorHandler);
    var renderer = rendererFactory.createRenderer(null, null);
    return {
        ngModule: ngModule,
        injector: elInjector, projectableNodes: projectableNodes,
        selectorOrNode: rootSelectorOrNode, sanitizer: sanitizer, rendererFactory: rendererFactory, renderer: renderer, errorHandler: errorHandler
    };
}
function debugCreateEmbeddedView(parentView, anchorDef, viewDef, context) {
    var defWithOverride = applyProviderOverridesToView(viewDef);
    return callWithDebugContext(DebugAction.create, createEmbeddedView, null, [parentView, anchorDef, defWithOverride, context]);
}
function debugCreateComponentView(parentView, nodeDef, viewDef, hostElement) {
    var overrideComponentView = viewDefOverrides.get(nodeDef.element.componentProvider.provider.token);
    if (overrideComponentView) {
        viewDef = overrideComponentView;
    }
    else {
        viewDef = applyProviderOverridesToView(viewDef);
    }
    return callWithDebugContext(DebugAction.create, createComponentView, null, [parentView, nodeDef, viewDef, hostElement]);
}
function debugCreateNgModuleRef(moduleType, parentInjector, bootstrapComponents, def) {
    var defWithOverride = applyProviderOverridesToNgModule(def);
    return createNgModuleRef(moduleType, parentInjector, bootstrapComponents, defWithOverride);
}
var providerOverrides = /*@__PURE__*/ new Map();
var providerOverridesWithScope = /*@__PURE__*/ new Map();
var viewDefOverrides = /*@__PURE__*/ new Map();
function debugOverrideProvider(override) {
    providerOverrides.set(override.token, override);
    var injectableDef;
    if (typeof override.token === 'function' && (injectableDef = getInjectableDef(override.token)) &&
        typeof injectableDef.providedIn === 'function') {
        providerOverridesWithScope.set(override.token, override);
    }
}
function debugOverrideComponentView(comp, compFactory) {
    var hostViewDef = resolveDefinition(getComponentViewDefinitionFactory(compFactory));
    var compViewDef = resolveDefinition(hostViewDef.nodes[0].element.componentView);
    viewDefOverrides.set(comp, compViewDef);
}
function debugClearOverrides() {
    providerOverrides.clear();
    providerOverridesWithScope.clear();
    viewDefOverrides.clear();
}
// Notes about the algorithm:
// 1) Locate the providers of an element and check if one of them was overwritten
// 2) Change the providers of that element
//
// We only create new datastructures if we need to, to keep perf impact
// reasonable.
function applyProviderOverridesToView(def) {
    if (providerOverrides.size === 0) {
        return def;
    }
    var elementIndicesWithOverwrittenProviders = findElementIndicesWithOverwrittenProviders(def);
    if (elementIndicesWithOverwrittenProviders.length === 0) {
        return def;
    }
    // clone the whole view definition,
    // as it maintains references between the nodes that are hard to update.
    def = def.factory(function () { return NOOP; });
    for (var i = 0; i < elementIndicesWithOverwrittenProviders.length; i++) {
        applyProviderOverridesToElement(def, elementIndicesWithOverwrittenProviders[i]);
    }
    return def;
    function findElementIndicesWithOverwrittenProviders(def) {
        var elIndicesWithOverwrittenProviders = [];
        var lastElementDef = null;
        for (var i = 0; i < def.nodes.length; i++) {
            var nodeDef = def.nodes[i];
            if (nodeDef.flags & 1 /* TypeElement */) {
                lastElementDef = nodeDef;
            }
            if (lastElementDef && nodeDef.flags & 3840 /* CatProviderNoDirective */ &&
                providerOverrides.has(nodeDef.provider.token)) {
                elIndicesWithOverwrittenProviders.push(lastElementDef.nodeIndex);
                lastElementDef = null;
            }
        }
        return elIndicesWithOverwrittenProviders;
    }
    function applyProviderOverridesToElement(viewDef, elIndex) {
        for (var i = elIndex + 1; i < viewDef.nodes.length; i++) {
            var nodeDef = viewDef.nodes[i];
            if (nodeDef.flags & 1 /* TypeElement */) {
                // stop at the next element
                return;
            }
            if (nodeDef.flags & 3840 /* CatProviderNoDirective */) {
                var provider = nodeDef.provider;
                var override = providerOverrides.get(provider.token);
                if (override) {
                    nodeDef.flags = (nodeDef.flags & ~3840 /* CatProviderNoDirective */) | override.flags;
                    provider.deps = splitDepsDsl(override.deps);
                    provider.value = override.value;
                }
            }
        }
    }
}
// Notes about the algorithm:
// We only create new datastructures if we need to, to keep perf impact
// reasonable.
function applyProviderOverridesToNgModule(def) {
    var _a = calcHasOverrides(def), hasOverrides = _a.hasOverrides, hasDeprecatedOverrides = _a.hasDeprecatedOverrides;
    if (!hasOverrides) {
        return def;
    }
    // clone the whole view definition,
    // as it maintains references between the nodes that are hard to update.
    def = def.factory(function () { return NOOP; });
    applyProviderOverrides(def);
    return def;
    function calcHasOverrides(def) {
        var hasOverrides = false;
        var hasDeprecatedOverrides = false;
        if (providerOverrides.size === 0) {
            return { hasOverrides: hasOverrides, hasDeprecatedOverrides: hasDeprecatedOverrides };
        }
        def.providers.forEach(function (node) {
            var override = providerOverrides.get(node.token);
            if ((node.flags & 3840 /* CatProviderNoDirective */) && override) {
                hasOverrides = true;
                hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior;
            }
        });
        def.modules.forEach(function (module) {
            providerOverridesWithScope.forEach(function (override, token) {
                if (getInjectableDef(token).providedIn === module) {
                    hasOverrides = true;
                    hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior;
                }
            });
        });
        return { hasOverrides: hasOverrides, hasDeprecatedOverrides: hasDeprecatedOverrides };
    }
    function applyProviderOverrides(def) {
        for (var i = 0; i < def.providers.length; i++) {
            var provider = def.providers[i];
            if (hasDeprecatedOverrides) {
                // We had a bug where me made
                // all providers lazy. Keep this logic behind a flag
                // for migrating existing users.
                provider.flags |= 4096 /* LazyProvider */;
            }
            var override = providerOverrides.get(provider.token);
            if (override) {
                provider.flags = (provider.flags & ~3840 /* CatProviderNoDirective */) | override.flags;
                provider.deps = splitDepsDsl(override.deps);
                provider.value = override.value;
            }
        }
        if (providerOverridesWithScope.size > 0) {
            var moduleSet_1 = new Set(def.modules);
            providerOverridesWithScope.forEach(function (override, token) {
                if (moduleSet_1.has(getInjectableDef(token).providedIn)) {
                    var provider = {
                        token: token,
                        flags: override.flags | (hasDeprecatedOverrides ? 4096 /* LazyProvider */ : 0 /* None */),
                        deps: splitDepsDsl(override.deps),
                        value: override.value,
                        index: def.providers.length,
                    };
                    def.providers.push(provider);
                    def.providersByKey[tokenKey(token)] = provider;
                }
            });
        }
    }
}
function prodCheckAndUpdateNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var nodeDef = view.def.nodes[checkIndex];
    checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    return (nodeDef.flags & 224 /* CatPureExpression */) ?
        asPureExpressionData(view, checkIndex).value :
        undefined;
}
function prodCheckNoChangesNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var nodeDef = view.def.nodes[checkIndex];
    checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    return (nodeDef.flags & 224 /* CatPureExpression */) ?
        asPureExpressionData(view, checkIndex).value :
        undefined;
}
function debugCheckAndUpdateView(view) {
    return callWithDebugContext(DebugAction.detectChanges, checkAndUpdateView, null, [view]);
}
function debugCheckNoChangesView(view) {
    return callWithDebugContext(DebugAction.checkNoChanges, checkNoChangesView, null, [view]);
}
function debugDestroyView(view) {
    return callWithDebugContext(DebugAction.destroy, destroyView, null, [view]);
}
var DebugAction = /*@__PURE__*/ (function (DebugAction) {
    DebugAction[DebugAction["create"] = 0] = "create";
    DebugAction[DebugAction["detectChanges"] = 1] = "detectChanges";
    DebugAction[DebugAction["checkNoChanges"] = 2] = "checkNoChanges";
    DebugAction[DebugAction["destroy"] = 3] = "destroy";
    DebugAction[DebugAction["handleEvent"] = 4] = "handleEvent";
    return DebugAction;
})({});
var _currentAction;
var _currentView;
var _currentNodeIndex;
function debugSetCurrentNode(view, nodeIndex) {
    _currentView = view;
    _currentNodeIndex = nodeIndex;
}
function debugHandleEvent(view, nodeIndex, eventName, event) {
    debugSetCurrentNode(view, nodeIndex);
    return callWithDebugContext(DebugAction.handleEvent, view.def.handleEvent, null, [view, nodeIndex, eventName, event]);
}
function debugUpdateDirectives(view, checkType) {
    if (view.state & 128 /* Destroyed */) {
        throw viewDestroyedError(DebugAction[_currentAction]);
    }
    debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0));
    return view.def.updateDirectives(debugCheckDirectivesFn, view);
    function debugCheckDirectivesFn(view, nodeIndex, argStyle) {
        var values = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            values[_i - 3] = arguments[_i];
        }
        var nodeDef = view.def.nodes[nodeIndex];
        if (checkType === 0 /* CheckAndUpdate */) {
            debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
        }
        else {
            debugCheckNoChangesNode(view, nodeDef, argStyle, values);
        }
        if (nodeDef.flags & 16384 /* TypeDirective */) {
            debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex));
        }
        return (nodeDef.flags & 224 /* CatPureExpression */) ?
            asPureExpressionData(view, nodeDef.nodeIndex).value :
            undefined;
    }
}
function debugUpdateRenderer(view, checkType) {
    if (view.state & 128 /* Destroyed */) {
        throw viewDestroyedError(DebugAction[_currentAction]);
    }
    debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0));
    return view.def.updateRenderer(debugCheckRenderNodeFn, view);
    function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
        var values = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            values[_i - 3] = arguments[_i];
        }
        var nodeDef = view.def.nodes[nodeIndex];
        if (checkType === 0 /* CheckAndUpdate */) {
            debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
        }
        else {
            debugCheckNoChangesNode(view, nodeDef, argStyle, values);
        }
        if (nodeDef.flags & 3 /* CatRenderNode */) {
            debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex));
        }
        return (nodeDef.flags & 224 /* CatPureExpression */) ?
            asPureExpressionData(view, nodeDef.nodeIndex).value :
            undefined;
    }
}
function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) {
    var changed = checkAndUpdateNode.apply(void 0, __spread([view, nodeDef, argStyle], givenValues));
    if (changed) {
        var values = argStyle === 1 /* Dynamic */ ? givenValues[0] : givenValues;
        if (nodeDef.flags & 16384 /* TypeDirective */) {
            var bindingValues = {};
            for (var i = 0; i < nodeDef.bindings.length; i++) {
                var binding = nodeDef.bindings[i];
                var value = values[i];
                if (binding.flags & 8 /* TypeProperty */) {
                    bindingValues[normalizeDebugBindingName(binding.nonMinifiedName)] =
                        normalizeDebugBindingValue(value);
                }
            }
            var elDef = nodeDef.parent;
            var el = asElementData(view, elDef.nodeIndex).renderElement;
            if (!elDef.element.name) {
                // a comment.
                view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
            }
            else {
                // a regular element.
                for (var attr in bindingValues) {
                    var value = bindingValues[attr];
                    if (value != null) {
                        view.renderer.setAttribute(el, attr, value);
                    }
                    else {
                        view.renderer.removeAttribute(el, attr);
                    }
                }
            }
        }
    }
}
function debugCheckNoChangesNode(view, nodeDef, argStyle, values) {
    checkNoChangesNode.apply(void 0, __spread([view, nodeDef, argStyle], values));
}
function nextDirectiveWithBinding(view, nodeIndex) {
    for (var i = nodeIndex; i < view.def.nodes.length; i++) {
        var nodeDef = view.def.nodes[i];
        if (nodeDef.flags & 16384 /* TypeDirective */ && nodeDef.bindings && nodeDef.bindings.length) {
            return i;
        }
    }
    return null;
}
function nextRenderNodeWithBinding(view, nodeIndex) {
    for (var i = nodeIndex; i < view.def.nodes.length; i++) {
        var nodeDef = view.def.nodes[i];
        if ((nodeDef.flags & 3 /* CatRenderNode */) && nodeDef.bindings && nodeDef.bindings.length) {
            return i;
        }
    }
    return null;
}
var DebugContext_ = /** @class */ /*@__PURE__*/ (function () {
    function DebugContext_(view, nodeIndex) {
        this.view = view;
        this.nodeIndex = nodeIndex;
        if (nodeIndex == null) {
            this.nodeIndex = nodeIndex = 0;
        }
        this.nodeDef = view.def.nodes[nodeIndex];
        var elDef = this.nodeDef;
        var elView = view;
        while (elDef && (elDef.flags & 1 /* TypeElement */) === 0) {
            elDef = elDef.parent;
        }
        if (!elDef) {
            while (!elDef && elView) {
                elDef = viewParentEl(elView);
                elView = elView.parent;
            }
        }
        this.elDef = elDef;
        this.elView = elView;
    }
    Object.defineProperty(DebugContext_.prototype, "elOrCompView", {
        get: function () {
            // Has to be done lazily as we use the DebugContext also during creation of elements...
            return asElementData(this.elView, this.elDef.nodeIndex).componentView || this.view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "injector", {
        get: function () { return createInjector$1(this.elView, this.elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "component", {
        get: function () { return this.elOrCompView.component; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "context", {
        get: function () { return this.elOrCompView.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "providerTokens", {
        get: function () {
            var tokens = [];
            if (this.elDef) {
                for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                    var childDef = this.elView.def.nodes[i];
                    if (childDef.flags & 20224 /* CatProvider */) {
                        tokens.push(childDef.provider.token);
                    }
                    i += childDef.childCount;
                }
            }
            return tokens;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "references", {
        get: function () {
            var references = {};
            if (this.elDef) {
                collectReferences(this.elView, this.elDef, references);
                for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                    var childDef = this.elView.def.nodes[i];
                    if (childDef.flags & 20224 /* CatProvider */) {
                        collectReferences(this.elView, childDef, references);
                    }
                    i += childDef.childCount;
                }
            }
            return references;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "componentRenderElement", {
        get: function () {
            var elData = findHostElement(this.elOrCompView);
            return elData ? elData.renderElement : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext_.prototype, "renderNode", {
        get: function () {
            return this.nodeDef.flags & 2 /* TypeText */ ? renderNode(this.view, this.nodeDef) :
                renderNode(this.elView, this.elDef);
        },
        enumerable: true,
        configurable: true
    });
    DebugContext_.prototype.logError = function (console) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var logViewDef;
        var logNodeIndex;
        if (this.nodeDef.flags & 2 /* TypeText */) {
            logViewDef = this.view.def;
            logNodeIndex = this.nodeDef.nodeIndex;
        }
        else {
            logViewDef = this.elView.def;
            logNodeIndex = this.elDef.nodeIndex;
        }
        // Note: we only generate a log function for text and element nodes
        // to make the generated code as small as possible.
        var renderNodeIndex = getRenderNodeIndex(logViewDef, logNodeIndex);
        var currRenderNodeIndex = -1;
        var nodeLogger = function () {
            var _a;
            currRenderNodeIndex++;
            if (currRenderNodeIndex === renderNodeIndex) {
                return (_a = console.error).bind.apply(_a, __spread([console], values));
            }
            else {
                return NOOP;
            }
        };
        logViewDef.factory(nodeLogger);
        if (currRenderNodeIndex < renderNodeIndex) {
            console.error('Illegal state: the ViewDefinitionFactory did not call the logger!');
            console.error.apply(console, __spread(values));
        }
    };
    return DebugContext_;
}());
function getRenderNodeIndex(viewDef, nodeIndex) {
    var renderNodeIndex = -1;
    for (var i = 0; i <= nodeIndex; i++) {
        var nodeDef = viewDef.nodes[i];
        if (nodeDef.flags & 3 /* CatRenderNode */) {
            renderNodeIndex++;
        }
    }
    return renderNodeIndex;
}
function findHostElement(view) {
    while (view && !isComponentView(view)) {
        view = view.parent;
    }
    if (view.parent) {
        return asElementData(view.parent, viewParentEl(view).nodeIndex);
    }
    return null;
}
function collectReferences(view, nodeDef, references) {
    for (var refName in nodeDef.references) {
        references[refName] = getQueryValue(view, nodeDef, nodeDef.references[refName]);
    }
}
function callWithDebugContext(action, fn, self, args) {
    var oldAction = _currentAction;
    var oldView = _currentView;
    var oldNodeIndex = _currentNodeIndex;
    try {
        _currentAction = action;
        var result = fn.apply(self, args);
        _currentView = oldView;
        _currentNodeIndex = oldNodeIndex;
        _currentAction = oldAction;
        return result;
    }
    catch (e) {
        if (isViewDebugError(e) || !_currentView) {
            throw e;
        }
        throw viewWrappedDebugError(e, getCurrentDebugContext());
    }
}
function getCurrentDebugContext() {
    return _currentView ? new DebugContext_(_currentView, _currentNodeIndex) : null;
}
var DebugRendererFactory2 = /** @class */ /*@__PURE__*/ (function () {
    function DebugRendererFactory2(delegate) {
        this.delegate = delegate;
    }
    DebugRendererFactory2.prototype.createRenderer = function (element, renderData) {
        return new DebugRenderer2(this.delegate.createRenderer(element, renderData));
    };
    DebugRendererFactory2.prototype.begin = function () {
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    DebugRendererFactory2.prototype.end = function () {
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    DebugRendererFactory2.prototype.whenRenderingDone = function () {
        if (this.delegate.whenRenderingDone) {
            return this.delegate.whenRenderingDone();
        }
        return Promise.resolve(null);
    };
    return DebugRendererFactory2;
}());
var DebugRenderer2 = /** @class */ /*@__PURE__*/ (function () {
    function DebugRenderer2(delegate) {
        this.delegate = delegate;
        /**
         * Factory function used to create a `DebugContext` when a node is created.
         *
         * The `DebugContext` allows to retrieve information about the nodes that are useful in tests.
         *
         * The factory is configurable so that the `DebugRenderer2` could instantiate either a View Engine
         * or a Render context.
         */
        this.debugContextFactory = getCurrentDebugContext;
        this.data = this.delegate.data;
    }
    DebugRenderer2.prototype.createDebugContext = function (nativeElement) { return this.debugContextFactory(nativeElement); };
    DebugRenderer2.prototype.destroyNode = function (node) {
        var debugNode = getDebugNode$1(node);
        removeDebugNodeFromIndex(debugNode);
        if (debugNode instanceof DebugNode__PRE_R3__) {
            debugNode.listeners.length = 0;
        }
        if (this.delegate.destroyNode) {
            this.delegate.destroyNode(node);
        }
    };
    DebugRenderer2.prototype.destroy = function () { this.delegate.destroy(); };
    DebugRenderer2.prototype.createElement = function (name, namespace) {
        var el = this.delegate.createElement(name, namespace);
        var debugCtx = this.createDebugContext(el);
        if (debugCtx) {
            var debugEl = new DebugElement__PRE_R3__(el, null, debugCtx);
            debugEl.name = name;
            indexDebugNode(debugEl);
        }
        return el;
    };
    DebugRenderer2.prototype.createComment = function (value) {
        var comment = this.delegate.createComment(value);
        var debugCtx = this.createDebugContext(comment);
        if (debugCtx) {
            indexDebugNode(new DebugNode__PRE_R3__(comment, null, debugCtx));
        }
        return comment;
    };
    DebugRenderer2.prototype.createText = function (value) {
        var text = this.delegate.createText(value);
        var debugCtx = this.createDebugContext(text);
        if (debugCtx) {
            indexDebugNode(new DebugNode__PRE_R3__(text, null, debugCtx));
        }
        return text;
    };
    DebugRenderer2.prototype.appendChild = function (parent, newChild) {
        var debugEl = getDebugNode$1(parent);
        var debugChildEl = getDebugNode$1(newChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.addChild(debugChildEl);
        }
        this.delegate.appendChild(parent, newChild);
    };
    DebugRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        var debugEl = getDebugNode$1(parent);
        var debugChildEl = getDebugNode$1(newChild);
        var debugRefEl = getDebugNode$1(refChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.insertBefore(debugRefEl, debugChildEl);
        }
        this.delegate.insertBefore(parent, newChild, refChild);
    };
    DebugRenderer2.prototype.removeChild = function (parent, oldChild) {
        var debugEl = getDebugNode$1(parent);
        var debugChildEl = getDebugNode$1(oldChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.removeChild(debugChildEl);
        }
        this.delegate.removeChild(parent, oldChild);
    };
    DebugRenderer2.prototype.selectRootElement = function (selectorOrNode, preserveContent) {
        var el = this.delegate.selectRootElement(selectorOrNode, preserveContent);
        var debugCtx = getCurrentDebugContext();
        if (debugCtx) {
            indexDebugNode(new DebugElement__PRE_R3__(el, null, debugCtx));
        }
        return el;
    };
    DebugRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            var fullName = namespace ? namespace + ':' + name : name;
            debugEl.attributes[fullName] = value;
        }
        this.delegate.setAttribute(el, name, value, namespace);
    };
    DebugRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            var fullName = namespace ? namespace + ':' + name : name;
            debugEl.attributes[fullName] = null;
        }
        this.delegate.removeAttribute(el, name, namespace);
    };
    DebugRenderer2.prototype.addClass = function (el, name) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.classes[name] = true;
        }
        this.delegate.addClass(el, name);
    };
    DebugRenderer2.prototype.removeClass = function (el, name) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.classes[name] = false;
        }
        this.delegate.removeClass(el, name);
    };
    DebugRenderer2.prototype.setStyle = function (el, style, value, flags) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.styles[style] = value;
        }
        this.delegate.setStyle(el, style, value, flags);
    };
    DebugRenderer2.prototype.removeStyle = function (el, style, flags) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.styles[style] = null;
        }
        this.delegate.removeStyle(el, style, flags);
    };
    DebugRenderer2.prototype.setProperty = function (el, name, value) {
        var debugEl = getDebugNode$1(el);
        if (debugEl && debugEl instanceof DebugElement__PRE_R3__) {
            debugEl.properties[name] = value;
        }
        this.delegate.setProperty(el, name, value);
    };
    DebugRenderer2.prototype.listen = function (target, eventName, callback) {
        if (typeof target !== 'string') {
            var debugEl = getDebugNode$1(target);
            if (debugEl) {
                debugEl.listeners.push(new DebugEventListener(eventName, callback));
            }
        }
        return this.delegate.listen(target, eventName, callback);
    };
    DebugRenderer2.prototype.parentNode = function (node) { return this.delegate.parentNode(node); };
    DebugRenderer2.prototype.nextSibling = function (node) { return this.delegate.nextSibling(node); };
    DebugRenderer2.prototype.setValue = function (node, value) { return this.delegate.setValue(node, value); };
    return DebugRenderer2;
}());
function cloneNgModuleDefinition(def) {
    var providers = Array.from(def.providers);
    var modules = Array.from(def.modules);
    var providersByKey = {};
    for (var key in def.providersByKey) {
        providersByKey[key] = def.providersByKey[key];
    }
    return {
        factory: def.factory,
        scope: def.scope, providers: providers, modules: modules, providersByKey: providersByKey,
    };
}
var NgModuleFactory_ = /** @class */ /*@__PURE__*/ (function (_super) {
    __extends(NgModuleFactory_, _super);
    function NgModuleFactory_(moduleType, _bootstrapComponents, _ngModuleDefFactory) {
        var _this = 
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        _super.call(this) || this;
        _this.moduleType = moduleType;
        _this._bootstrapComponents = _bootstrapComponents;
        _this._ngModuleDefFactory = _ngModuleDefFactory;
        return _this;
    }
    NgModuleFactory_.prototype.create = function (parentInjector) {
        initServicesIfNeeded();
        // Clone the NgModuleDefinition so that any tree shakeable provider definition
        // added to this instance of the NgModuleRef doesn't affect the cached copy.
        // See https://github.com/angular/angular/issues/25018.
        var def = cloneNgModuleDefinition(resolveDefinition(this._ngModuleDefFactory));
        return Services.createNgModuleRef(this.moduleType, parentInjector || Injector.NULL, this._bootstrapComponents, def);
    };
    return NgModuleFactory_;
}(NgModuleFactory));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// clang-format on
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
if (ngDevMode) {
    // This helper is to give a reasonable error message to people upgrading to v9 that have not yet
    // installed `@angular/localize` in their app.
    // tslint:disable-next-line: no-toplevel-property-access
    _global.$localize = _global.$localize || function () {
        throw new Error('It looks like your application or one of its dependencies is using i18n.\n' +
            'Angular 9 introduced a global `$localize()` function that needs to be loaded.\n' +
            'Please run `ng add @angular/localize` from the Angular CLI.\n' +
            '(For non-CLI projects, add `import \'@angular/localize/init\';` to your `polyfills.ts` file.\n' +
            'For server-side rendering applications add the import to your `main.server.ts` file.)');
    };
}

let AppComponent = /*@__PURE__*/ (() => {
    class AppComponent extends HTMLElement {
        constructor() {
            super();
        }
        get title() { return AppComponent.title; }
        connectedCallback() {
            // браузер вызывает этот метод при добавлении элемента в документ
            // (может вызываться много раз, если элемент многократно добавляется/удаляется)
            renderComponent$1(AppComponent, { host: this });
        }
        disconnectedCallback() {
            // браузер вызывает этот метод при удалении элемента из документа
            // (может вызываться много раз, если элемент многократно добавляется/удаляется)
        }
        static get observedAttributes() {
            /* массив имён атрибутов для отслеживания их изменений */
            return ['title'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            // вызывается при изменении одного из перечисленных выше атрибутов
            console.log('attributeChangedCallback', name, oldValue, newValue);
            AppComponent.title = newValue;
        }
        adoptedCallback() {
            // вызывается, когда элемент перемещается в новый документ
            // (происходит в document.adoptNode, используется очень редко)
        }
        detectChanges() {
        }
    }
    AppComponent.title = 'Angular Ivy';
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
    AppComponent.ɵcmp = ɵɵdefineComponent({
        type: AppComponent,
        selectors: [["my-element"]],
        features: [],
        decls: 1,
        vars: 1,
        template: function AppComponent_Template(rf, ctx) {
            if (rf & 1) {
                ɵɵtext(0);
            }
            if (rf & 2) {
                ɵɵtextInterpolate1("", ctx.title, " hello!");
            }
        },
        encapsulation: 2
    });
    return AppComponent;
})();
customElements.define('my-element', AppComponent);

exports.AppComponent = AppComponent;

return exports;

}({}));
