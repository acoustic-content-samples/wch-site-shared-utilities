"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*******************************************************************************
 * Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
const schematics_1 = require("@angular-devkit/schematics");
const schematics_utils_1 = require("@ibm-wch-sdk/schematics-utils");
const utils_1 = require("@ibm-wch-sdk/utils");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const FONT_AWESOME_IMPORT = './node_modules/font-awesome/css/font-awesome.css';
function _updateWorkspace(aWorkspace, aOptions) {
    // the project name
    const project = aOptions.project;
    if (!utils_1.isNil(project)) {
        // access the config
        const prj = aWorkspace.projects[project];
        if (!utils_1.isNil(prj)) {
            // access the config
            const styles = prj.architect.build.options.styles;
            // update the style
            if (styles.indexOf(FONT_AWESOME_IMPORT) < 0) {
                // include the import
                styles.push(FONT_AWESOME_IMPORT);
            }
        }
    }
    // return the workspace
    return aWorkspace;
}
function updateAngularJson(options) {
    return (host, context) => {
        // access the workspace
        const workspacePath = schematics_utils_1.getWorkspacePath(host);
        if (utils_1.isNil(workspacePath)) {
            // error
            throw new schematics_1.SchematicsException('Workspace not found.');
        }
        if (!options.project) {
            throw new schematics_1.SchematicsException('Option "project" is required.');
        }
        // load the workspace
        return schematics_utils_1.rxTransformJsonFile(workspacePath, (aConfig, aPath) => rxjs_1.of(_updateWorkspace(aConfig, options)), host).pipe(operators_1.mapTo(host));
    };
}
exports.updateAngularJson = updateAngularJson;
//# sourceMappingURL=update.angular.json.js.map