# EzApi / Documentation

# INCOMPLETE

##### Add to your system.

```typescript
import {EzApi} from "jquery-ez-api";
```

##### URL Generators

This allows for multiple api url schemes to be used.

Generic:
```typescript
import {EzApi} from "jquery-ez-api";

// Configuration (can be run before each generator creation to adjust domains/paths per Generator)
EzApi.Configure
    .setUrlBase("/api")                 // Default
    .setVersionTag("/v{versionTag}");   // Default

// Configuration (object)
EzApi.Configure.any({
    disableAutoPrefix: true,
    urlBase: "https://some-other-api.example.com/api",
    versionTag: ""
});

// Creates: /api/v1/my/path?q=1
// Subsequent calls to EzApi.URLs.Generator.get with the same version tag will return the same instance versus creating 
// a new one so things like creating  
EzApi.URLs.Generator("1").url("my/path", {q:1}); 

// Best practice in each module where being used:
let api_v1 = EzApi.URLs.Builder("1");
api_v1.url("my/path", {q:1});
```
