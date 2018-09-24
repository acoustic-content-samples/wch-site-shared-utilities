"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_utils_1 = require("@ibm-wch-sdk/schematics-utils");
const operators_1 = require("rxjs/operators");
function updateAppModule(options, project) {
    return (host, context) => {
        const mainPath = project.architect.build.options.main;
        const appModulePath = schematics_utils_1.getAppModulePath(host, mainPath);
        // find package json
        const rxPkg = schematics_utils_1.findPackageJson(__dirname);
        return rxPkg.pipe(operators_1.map(pkg => {
            // optionally add the edit module
            if (!!options.editable) {
                // add edit module
                schematics_utils_1.changeSourceFile(appModulePath, (path, source) => schematics_utils_1.addImportToModule(source, path, 'WchNgEditModule.forRoot()', '@ibm-wch-sdk/ng-edit'), host);
            }
            // add component module
            schematics_utils_1.changeSourceFile(appModulePath, (path, source) => schematics_utils_1.addImportToModule(source, path, 'SiteCommonModule', pkg.name), host);
            return host;
        }));
    };
}
exports.updateAppModule = updateAppModule;
//# sourceMappingURL=update.app.module.js.map