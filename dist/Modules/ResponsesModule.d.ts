export declare namespace ResponsesModule {
    namespace Types {
        namespace GenericResponse {
            type FailResponse = (code: number) => void;
            type SuccessResponse = (data: string | any) => void;
        }
    }
    namespace Interfaces {
        namespace GenericResponse {
            interface ConfigObject {
                err: boolean;
                code: number;
                data: string | any;
                callbackSuccess?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[];
                callbackFailed?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[];
            }
            interface CoreClass {
                attachFailed(callback?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[]): CoreClass;
                attachSuccess(callback?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[]): CoreClass;
                run(): void;
            }
        }
    }
    class GenericResponse implements Interfaces.GenericResponse.CoreClass {
        protected readonly err: boolean;
        protected readonly code: number;
        protected data: string | any;
        protected cbFailed: Types.GenericResponse.FailResponse[];
        protected cbResponse: Types.GenericResponse.SuccessResponse[];
        constructor(err: boolean, code: number, data: string | any);
        attachFailed(callback?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[]): Interfaces.GenericResponse.CoreClass;
        attachSuccess(callback?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[]): Interfaces.GenericResponse.CoreClass;
        run(): void;
        static wrap(err: boolean, code: number, data: string | any, callbackSuccess?: Types.GenericResponse.SuccessResponse | Types.GenericResponse.SuccessResponse[], callbackFailed?: Types.GenericResponse.FailResponse | Types.GenericResponse.FailResponse[]): void;
    }
}
