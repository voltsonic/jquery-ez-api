"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URLsModule_1 = require("./Modules/URLsModule");
const RunModule_1 = require("./Modules/RunModule");
const ResponsesModule_1 = require("./Modules/ResponsesModule");
var EzApi;
(function (EzApi) {
    EzApi.Responses = ResponsesModule_1.ResponsesModule;
    EzApi.Run = RunModule_1.RunModule;
    EzApi.URLs = URLsModule_1.URLsModule;
})(EzApi = exports.EzApi || (exports.EzApi = {}));
