"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
var RunModule;
(function (RunModule) {
    class Const {
    }
    Const.POST_JSON = "json";
    Const.POST_FORM_DATA = "formData";
    RunModule.Const = Const;
    const passed = (started) => {
        return (new Date().getTime() - started) / 1000;
    };
    const _call = (url, clientBase, callback = () => { }, dataType = Const.POST_JSON) => {
        const started = new Date().getTime();
        let contentType = "application/json";
        let processData = false;
        switch (dataType) {
            case Const.POST_FORM_DATA:
                contentType = false;
                dataType = false;
                break;
            case Const.POST_JSON:
                processData = true;
                break;
        }
        const xhr = $.ajax(deepmerge({
            contentType,
            dataType,
            processData,
            url,
        }, clientBase));
        xhr.then((body, textStatus, jqx) => {
            callback(false, jqx.status, body, passed(started));
        }).fail((jqx, textStatus, errorThrown) => {
            if (jqx.getAllResponseHeaders())
                callback(true, jqx.status, errorThrown, passed(started));
        });
        return xhr;
    };
    RunModule.Get = (uri, callback, clientBaseOptions = {}) => {
        return _call(uri, clientBaseOptions, callback);
    };
    RunModule.Post = (uri, dataJson, callback = () => { }, clientBaseOptions = {}, dataType = Const.POST_JSON) => {
        if (dataType === Const.POST_JSON) {
            dataJson = JSON.stringify(dataJson);
        }
        return _call(uri, deepmerge({
            data: dataJson,
            type: "POST",
        }, clientBaseOptions), callback, dataType);
    };
})(RunModule = exports.RunModule || (exports.RunModule = {}));
