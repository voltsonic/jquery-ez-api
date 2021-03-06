import { ResponsesModule } from "../../ResponsesModule";
declare namespace ApiResponseTypes {
    type Error = (errorResponse: string | any) => void;
    type Success = (data: any) => void;
}
export declare class ApiResponse extends ResponsesModule.GenericResponse {
    private cbApiError;
    private cbApiSuccess;
    attachApiError(callback?: ApiResponseTypes.Error | ApiResponseTypes.Error[]): ApiResponse;
    attachApiSuccess(callback?: ApiResponseTypes.Success | ApiResponseTypes.Success[]): ApiResponse;
    attachFailed(callback?: ResponsesModule.Types.GenericResponse.FailResponse | ResponsesModule.Types.GenericResponse.FailResponse[]): ApiResponse;
    attachSuccess(callback?: ResponsesModule.Types.GenericResponse.SuccessResponse | ResponsesModule.Types.GenericResponse.SuccessResponse[]): ApiResponse;
    run(): void;
    static wrap(err: boolean, code: number, data: string | any, callbackSuccess?: ResponsesModule.Types.GenericResponse.SuccessResponse | ResponsesModule.Types.GenericResponse.SuccessResponse[], callbackApiError?: ApiResponseTypes.Error | ApiResponseTypes.Error[], callbackFailed?: ResponsesModule.Types.GenericResponse.FailResponse | ResponsesModule.Types.GenericResponse.FailResponse[]): void;
}
export {};
