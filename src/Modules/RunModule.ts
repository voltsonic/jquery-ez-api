"use strict";

import deepmerge = require("deepmerge");

export namespace RunModule {
    export namespace Types {
        export type CallbackRequest = (err: boolean, code: number, data: string|any, took: number) => void
    }

    export class Const {
        static readonly POST_JSON: string = "json";
        static readonly POST_FORM_DATA: string = "formData";
    }

    const passed = (started: number) => {
        return (new Date().getTime() - started) / 1000;
    };

    const _call = (url: string, clientBase: any, callback: Types.CallbackRequest = () => {}, dataType: any = Const.POST_JSON): JQuery.jqXHR => {
        const started = new Date().getTime();

        let contentType: any = "application/json";
        let processData: boolean = false;

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

        xhr.then((body: string, textStatus: JQuery.Ajax.SuccessTextStatus, jqx: JQuery.jqXHR) => {
            callback(false, jqx.status, body, passed(started));
        }).fail((jqx: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: any) => {
            if(jqx.getAllResponseHeaders())
                callback(true, jqx.status, errorThrown, passed(started));
        });

        return xhr;
    };

    export const Get = (uri: string, callback: Types.CallbackRequest, clientBaseOptions: JQuery.AjaxSettings = {}): JQuery.jqXHR => {
        return _call(
            uri,
            clientBaseOptions,
            callback);
    };
    
    export const Post = (uri: string, dataJson: any, callback: Types.CallbackRequest = () => {}, clientBaseOptions: JQuery.AjaxSettings = {}, dataType: any = Const.POST_JSON): JQuery.jqXHR => {
        if (dataType === Const.POST_JSON) {
            dataJson = JSON.stringify(dataJson);
        }

        return _call(
            uri,
            deepmerge({
                data: dataJson,
                type: "POST",
            }, clientBaseOptions),
            callback,
            dataType);
    };
}
