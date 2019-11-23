"use strict";

const chai = require("chai");
const EzApi = require("../dist/EzApi.js").EzApi;

describe("Test Url Generator (Same URL)", () => {
    const api_v1 = EzApi.URLs.Builder("1");
    const api_v2 = EzApi.URLs.Builder("2");
    const Calls = {
        v1: '/api/v1/call1',
        v2: '/api/v2/call1',
    };
    it(Calls.v1, async () => chai.assert.equal(api_v1.url("call1"), Calls.v1));
    it(Calls.v2, async () => chai.assert.equal(api_v2.url("call1"), Calls.v2));
});

describe("Test Url Generator (Alternate URL)", () => {
    EzApi.URLs.Configure.any({urlBase:"https://fake-api.com/api", versionTag: "/{versionTag}"});

    const Calls = {
        v2018: 'https://fake-api.com/api/2018/call1',
        v2019: 'https://fake-api.com/api/2019/call1',
    };
    const api_fakeApi2018 = EzApi.URLs.Builder("2018");
    const api_fakeApi2019 = EzApi.URLs.Builder("2019");
    it(Calls.v2018, async () => chai.assert.equal(api_fakeApi2018.url("call1"), Calls.v2018));
    it(Calls.v2019, async () => chai.assert.equal(api_fakeApi2019.url("call1"), Calls.v2019));
});
