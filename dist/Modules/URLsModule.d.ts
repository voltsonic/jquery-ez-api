export declare namespace URLsModule {
    export namespace Interfaces {
        interface ConfigBase {
            disableAutoPrefix: boolean;
            urlBase: string;
            versionTag: string;
        }
        interface ConfigBaseMerge {
            disableAutoPrefix?: boolean;
            urlBase?: string;
            versionTag?: string;
        }
    }
    export class Configure {
        static any(to: Interfaces.ConfigBaseMerge): Configure;
        static disableAutoPrefix(): Configure;
        static enableAutoPrefix(): Configure;
        static setUrlBase(to: string): Configure;
        static setVersionTag(to: string): Configure;
    }
    class BuilderInner {
        private readonly version;
        private readonly versionTag;
        private readonly urlPrepend;
        constructor(version?: string);
        url(append?: string | string[], query?: any): string;
    }
    export const Builder: (version?: string) => BuilderInner;
    export {};
}
