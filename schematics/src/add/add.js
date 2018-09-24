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
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_utils_1 = require("@ibm-wch-sdk/schematics-utils");
const update_app_module_1 = require("./update.app.module");
const update_package_1 = require("./update.package");
const update_angular_json_1 = require("./update.angular.json");
function addComponents(options) {
    return (host, context) => {
        const workspace = schematics_utils_1.getWorkspace(host);
        if (!options.project) {
            throw new schematics_1.SchematicsException('Option "project" is required.');
        }
        const project = workspace.projects[options.project];
        if (project.projectType !== 'application') {
            throw new schematics_1.SchematicsException('Project must be of type "application".');
        }
        // add the install task
        context.addTask(new tasks_1.NodePackageInstallTask());
        return schematics_1.chain([
            update_package_1.updatePackage(options),
            update_app_module_1.updateAppModule(options, project),
            update_angular_json_1.updateAngularJson(options)
        ])(host, context);
    };
}
exports.addComponents = addComponents;
//# sourceMappingURL=add.js.map