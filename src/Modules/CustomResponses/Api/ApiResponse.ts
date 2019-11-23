"use strict";

import {ResponsesModule} from "../../ResponsesModule";

namespace ApiResponseTypes {
    export type Error = (errorResponse: string|any) => void;
    export type Success = (data: any) => void;
}

let configBase = {
    errorKey: "e",
    dataKey: "d"
};

export class ApiResponse extends ResponsesModule.GenericResponse {
    private cbApiError: ApiResponseTypes.Error[] = [];
    private cbApiSuccess: ApiResponseTypes.Success[] = [];

    attachApiError(callback?: ApiResponseTypes.Error|ApiResponseTypes.Error[]): ApiResponse {
        if(callback)
            (typeof callback === "function")
                ?this.cbApiError.push(callback)
                :callback.map(cb => this.cbApiError.push(cb));
        return this;
    }

    attachApiSuccess(callback?: ApiResponseTypes.Success|ApiResponseTypes.Success[]): ApiResponse {
        if(callback)
            (typeof callback === "function")
                ?this.cbApiSuccess.push(callback)
                :callback.map(cb => this.cbApiSuccess.push(cb));
        return this;
    }

    attachFailed(callback?: ResponsesModule.Types.GenericResponse.FailResponse | ResponsesModule.Types.GenericResponse.FailResponse[]): ApiResponse {
        super.attachFailed(callback);
        return this;
    }

    attachSuccess(callback?: ResponsesModule.Types.GenericResponse.SuccessResponse | ResponsesModule.Types.GenericResponse.SuccessResponse[]): ApiResponse {
        super.attachSuccess(callback);
        return this;
    }

    run(): void {
        if(typeof this.data === "string") this.data = JSON.parse(this.data);

        (this.err || this.code !== 200)
            ?this.cbFailed.map(cb => cb(this.code))
            :((this.data[configBase.errorKey])
                ?this.cbApiError.map(cb => cb(this.data[configBase.dataKey]))
                :(this.cbResponse.map(cb => cb(this.data)) && this.cbApiSuccess.map(cb => cb(this.data[configBase.dataKey]))));
    }

    static wrap(
        err: boolean,
        code: number,
        data: string|any,
        callbackSuccess?: ResponsesModule.Types.GenericResponse.SuccessResponse|ResponsesModule.Types.GenericResponse.SuccessResponse[],
        callbackApiError?: ApiResponseTypes.Error|ApiResponseTypes.Error[],
        callbackFailed?: ResponsesModule.Types.GenericResponse.FailResponse|ResponsesModule.Types.GenericResponse.FailResponse[]
    ): void {
        (new this(err, code, data))
            .attachSuccess(callbackSuccess)
            .attachApiError(callbackApiError)
            .attachFailed(callbackFailed)
            .run();
    }
}
