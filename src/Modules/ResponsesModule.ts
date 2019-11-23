"use strict";

export namespace ResponsesModule {
    export namespace Types {
        export namespace GenericResponse {
            export type FailResponse = (code: number) => void;
            export type SuccessResponse = (data: string|any) => void;
        }
    }

    export namespace Interfaces {
        export namespace GenericResponse {
            export interface ConfigObject {
                err: boolean,
                code: number,
                data: string|any,
                callbackSuccess?: Types.GenericResponse.SuccessResponse|Types.GenericResponse.SuccessResponse[],
                callbackFailed?: Types.GenericResponse.FailResponse|Types.GenericResponse.FailResponse[]
            }
            export interface CoreClass {
                attachFailed(callback?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[]): CoreClass;
                attachSuccess(callback?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[]): CoreClass;
                run(): void;
            }
        }
    }

    export class GenericResponse implements Interfaces.GenericResponse.CoreClass {
        protected readonly err: boolean;
        protected readonly code: number;
        protected data: string | any;
        protected cbFailed: Types.GenericResponse.FailResponse[] = [];
        protected cbResponse: Types.GenericResponse.SuccessResponse[] = [];

        constructor(err: boolean, code: number, data: string|any) {
            this.err = err;
            this.code = code;
            this.data = data;
        }

        attachFailed(callback?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[]): Interfaces.GenericResponse.CoreClass {
            if(callback)
                (typeof callback === "function")
                    ?this.cbFailed.push(callback)
                    :callback.map(cb => this.cbFailed.push(cb));
            return this;
        }

        attachSuccess(callback?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[]): Interfaces.GenericResponse.CoreClass {
            if(callback)
                (typeof callback === "function")
                    ?this.cbResponse.push(callback)
                    :callback.map(cb => this.cbResponse.push(cb));
            return this;
        }

        run(): void {
            (this.err || this.code !== 200)
                ?this.cbFailed.map(cb => cb(this.code))
                :this.cbResponse.map(cb => cb(this.data))
            ;
        }

        static wrap(
            err: boolean,
            code: number,
            data: string|any,
            callbackSuccess?: Types.GenericResponse.SuccessResponse|Types.GenericResponse.SuccessResponse[],
            callbackFailed?: Types.GenericResponse.FailResponse|Types.GenericResponse.FailResponse[]
        ): void {
            (new this(err, code, data))
                .attachSuccess(callbackSuccess)
                .attachFailed(callbackFailed)
                .run();
        }
    }
}
