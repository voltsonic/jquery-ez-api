"use strict";

import {URLsModule} from "./Modules/URLsModule";
import {RunModule} from "./Modules/RunModule";
import {ResponsesModule} from "./Modules/ResponsesModule";

export namespace EzApi {
    export import Responses = ResponsesModule;
    export import Run = RunModule;
    export import URLs = URLsModule;
}
