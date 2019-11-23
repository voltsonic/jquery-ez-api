"use strict";

import deepmerge = require("deepmerge");

export namespace URLsModule {
    export namespace Interfaces {
        export interface ConfigBase {
            disableAutoPrefix: boolean,
            urlBase: string,
            versionTag: string
        }
        export interface ConfigBaseMerge {
            disableAutoPrefix?: boolean,
            urlBase?: string,
            versionTag?: string
        }
    }

    let Config: Interfaces.ConfigBase = {
        disableAutoPrefix: false,
        urlBase: "/api",
        versionTag: "/v{versionTag}"
    };

    export class Configure {
        public static any(to: Interfaces.ConfigBaseMerge): Configure {
            Config = deepmerge(Config, to);
            return this;
        }
        public static disableAutoPrefix(): Configure {
            return this.any({disableAutoPrefix: true});
        }
        public static enableAutoPrefix(): Configure {
            return this.any({disableAutoPrefix: false});
        }
        public static setUrlBase(to: string): Configure {
            return this.any({urlBase: to});
        }
        public static setVersionTag(to: string): Configure {
            return this.any({versionTag: to});
        }
    }

    class BuilderInner {
        private readonly version: string;
        private readonly versionTag: string;
        private readonly urlPrepend: string;
        constructor(version: string = ""){
            this.version = version;
            this.versionTag = Config.versionTag.replace('{versionTag}', this.version);
            this.urlPrepend = (Config.urlBase + this.versionTag);
        }

        url(append?: string|string[], query: any = {}){
            query = ((query) => {
                return Object.keys(query).length === 0
                    ?""
                    :('?'+Object.keys(query)
                        .map((key: any) => (encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))).join('&'));
            })(query);

            let path = (typeof append === "undefined")
                ?""
                :((typeof append === "string")
                    ?append
                    :append.join("/"));

            if(!Config.disableAutoPrefix && path.substr(0, 1) !== "/")
                path = "/"+path;

            return this.urlPrepend + path + query;
        }
    }

    let generators: {
        [version: string]: BuilderInner
    } = {};

    export const Builder = (version:string = ""): BuilderInner => {
        return generators.hasOwnProperty(version)
            ?generators[version]
            :(generators[version] = new BuilderInner(version));
    };
}
