"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponsesModule_1 = require("../../ResponsesModule");
let configBase = {
    errorKey: "e",
    dataKey: "d"
};
class ApiResponse extends ResponsesModule_1.ResponsesModule.GenericResponse {
    constructor() {
        super(...arguments);
        this.cbApiError = [];
    }
    attachApiError(callback) {
        if (callback)
            (typeof callback === "function")
                ? this.cbApiError.push(callback)
                : callback.map(cb => this.cbApiError.push(cb));
        return this;
    }
    attachFailed(callback) {
        super.attachFailed(callback);
        return this;
    }
    attachSuccess(callback) {
        super.attachSuccess(callback);
        return this;
    }
    run() {
        if (typeof this.data === "string")
            this.data = JSON.parse(this.data);
        (this.err || this.code !== 200)
            ? this.cbFailed.map(cb => cb(this.code))
            : ((this.data[configBase.errorKey])
                ? this.cbApiError.map(cb => cb(this.data[configBase.dataKey]))
                : this.cbResponse.map(cb => cb(this.data[configBase.dataKey])));
    }
    static wrap(err, code, data, callbackSuccess, callbackApiError, callbackFailed) {
        (new this(err, code, data))
            .attachSuccess(callbackSuccess)
            .attachApiError(callbackApiError)
            .attachFailed(callbackFailed)
            .run();
    }
}
exports.ApiResponse = ApiResponse;
