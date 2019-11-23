"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
var URLsModule;
(function (URLsModule) {
    let Config = {
        disableAutoPrefix: false,
        urlBase: "/api",
        versionTag: "/v{versionTag}"
    };
    class Configure {
        static any(to) {
            Config = deepmerge(Config, to);
            return this;
        }
        static disableAutoPrefix() {
            return this.any({ disableAutoPrefix: true });
        }
        static enableAutoPrefix() {
            return this.any({ disableAutoPrefix: false });
        }
        static setUrlBase(to) {
            return this.any({ urlBase: to });
        }
        static setVersionTag(to) {
            return this.any({ versionTag: to });
        }
    }
    URLsModule.Configure = Configure;
    class BuilderInner {
        constructor(version = "") {
            this.version = version;
            this.versionTag = Config.versionTag.replace('{versionTag}', this.version);
            this.urlPrepend = (Config.urlBase + this.versionTag);
        }
        url(append, query = {}) {
            query = ((query) => {
                return Object.keys(query).length === 0
                    ? ""
                    : ('?' + Object.keys(query)
                        .map((key) => (encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))).join('&'));
            })(query);
            let path = (typeof append === "undefined")
                ? ""
                : ((typeof append === "string")
                    ? append
                    : append.join("/"));
            if (!Config.disableAutoPrefix && path.substr(0, 1) !== "/")
                path = "/" + path;
            return this.urlPrepend + path + query;
        }
    }
    let generators = {};
    URLsModule.Builder = (version = "") => {
        return generators.hasOwnProperty(version)
            ? generators[version]
            : (generators[version] = new BuilderInner(version));
    };
})(URLsModule = exports.URLsModule || (exports.URLsModule = {}));
