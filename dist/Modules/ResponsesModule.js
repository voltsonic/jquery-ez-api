"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponsesModule;
(function (ResponsesModule) {
    class GenericResponse {
        constructor(err, code, data) {
            this.cbFailed = [];
            this.cbResponse = [];
            this.err = err;
            this.code = code;
            this.data = data;
        }
        attachFailed(callback) {
            if (callback)
                (typeof callback === "function")
                    ? this.cbFailed.push(callback)
                    : callback.map(cb => this.cbFailed.push(cb));
            return this;
        }
        attachSuccess(callback) {
            if (callback)
                (typeof callback === "function")
                    ? this.cbResponse.push(callback)
                    : callback.map(cb => this.cbResponse.push(cb));
            return this;
        }
        run() {
            (this.err || this.code !== 200)
                ? this.cbFailed.map(cb => cb(this.code))
                : this.cbResponse.map(cb => cb(this.data));
        }
        static wrap(err, code, data, callbackSuccess, callbackFailed) {
            (new this(err, code, data))
                .attachSuccess(callbackSuccess)
                .attachFailed(callbackFailed)
                .run();
        }
    }
    ResponsesModule.GenericResponse = GenericResponse;
})(ResponsesModule = exports.ResponsesModule || (exports.ResponsesModule = {}));
