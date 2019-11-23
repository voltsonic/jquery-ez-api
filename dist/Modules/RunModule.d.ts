/// <reference types="jquery" />
export declare namespace RunModule {
    namespace Types {
        type CallbackRequest = (err: boolean, code: number, data: string | any, took: number) => void;
    }
    class Const {
        static readonly POST_JSON: string;
        static readonly POST_FORM_DATA: string;
    }
    const Get: (uri: string, callback: Types.CallbackRequest, clientBaseOptions?: JQuery.AjaxSettings<any>) => JQuery.jqXHR<any>;
    const Post: (uri: string, dataJson: any, callback?: Types.CallbackRequest, clientBaseOptions?: JQuery.AjaxSettings<any>, dataType?: any) => JQuery.jqXHR<any>;
}
