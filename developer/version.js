"use strict";

// Usage: node ./version.js -abcf
// -a = bump major by 1
// -b = bump minor by 1
// -c = bump patch by 1
// -f = set to specific version.

const VersionManager = require("version-management"),
    NodeTemplateModule = require("version-management/Templates/Modules/NodeJS/NodeTemplateModule");

// Bumps
let Version = new VersionManager.VersionProgram(__filename+'on');

// Run Templates
VersionManager
    .VersionTemplates
    .addTemplate(NodeTemplateModule.standard(require("path").join(__dirname, '..')))
    .runTemplate(Version.getUpdated());

require("badge-management").run();
