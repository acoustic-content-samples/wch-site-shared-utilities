"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_utils_1 = require("@ibm-wch-sdk/schematics-utils");
const utils_1 = require("@ibm-wch-sdk/utils");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const semver_1 = require("semver");
exports.PACKAGE_PATH = '/package.json';
exports.FONT_AWESOME = 'font-awesome';
const WCHTOOLS_DEPENDENCIES = 'wchtools-dependencies';
// function _addToWchToolsDependencies(aDeps: string[], aPkg: any) {
//   // add the key
//   const deps = assertArray(WCHTOOLS_DEPENDENCIES, aPkg);
//   // filter
//   deps.push(...aDeps.filter(dep => !deps.includes(dep)));
// }
function _updatePackage(aDstPkg, aSrcPkg, aSdkVersion, aOptions) {
    // prepare the structures
    const deps = utils_1.assertObject('dependencies', aDstPkg);
    // add to the dependencies
    const name = aSrcPkg.name;
    // update the package version
    schematics_utils_1.updateMinVersion(name, aSrcPkg.version, aDstPkg, schematics_utils_1.DEP_TYPE.RUNTIME);
    // check the version of web animations
    const fontAwesome = aSrcPkg.devDependencies[exports.FONT_AWESOME];
    if (utils_1.isNotNil(fontAwesome)) {
        // update
        const ver = semver_1.coerce(fontAwesome);
        if (ver) {
            // update the version
            schematics_utils_1.updateMinVersion(exports.FONT_AWESOME, ver.version, aDstPkg, schematics_utils_1.DEP_TYPE.RUNTIME);
        }
    }
    // check the SDK version
    if (!!aOptions.editable) {
        // parse the SDK
        const sdkVersion = semver_1.coerce(aSdkVersion).version;
        // make sure we depend on the edit lib
        schematics_utils_1.updateMinVersion('@ibm-wch-sdk/ng-edit', sdkVersion, aDstPkg, schematics_utils_1.DEP_TYPE.RUNTIME);
    }
    // add this dependency
    // _addToWchToolsDependencies([aSrcPkg.name], aDstPkg);
    return aDstPkg;
}
function updatePackage(options) {
    return (host, context) => {
        // load
        const rxPkg = schematics_utils_1.findPackageJson(__dirname);
        const rxSdk = schematics_utils_1.findSdkVersion(host);
        return rxjs_1.combineLatest(rxPkg, rxSdk).pipe(operators_1.switchMap(([pkg, sdkVersion]) => schematics_utils_1.rxTransformJsonFile(exports.PACKAGE_PATH, (aBuild) => rxjs_1.of(_updatePackage(aBuild || {}, pkg, sdkVersion, options)), host)), operators_1.mapTo(host));
    };
}
exports.updatePackage = updatePackage;
//# sourceMappingURL=update.package.js.map