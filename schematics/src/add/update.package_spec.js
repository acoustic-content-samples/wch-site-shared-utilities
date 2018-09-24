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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const update_package_1 = require("./update.package");
describe('update.package', () => {
    const context = {
        engine: null,
        debug: false,
        strategy: schematics_1.MergeStrategy.Default
    };
    it('should update an existing package json', () => {
        const tree = new schematics_1.VirtualTree();
        const options = {
            project: 'abc',
            editable: true
        };
        const pkg = {};
        tree.create(update_package_1.PACKAGE_PATH, JSON.stringify(pkg));
        const res = update_package_1.updatePackage(options)(tree, context);
        const rxRes = rxjs_1.isObservable(res) ? res : rxjs_1.of(res);
        return rxRes
            .pipe(operators_1.tap(tree => {
            // verify the url
            expect(tree).toBeTruthy();
            if (tree) {
                // check that we have the file
                expect(tree.exists(update_package_1.PACKAGE_PATH)).toBeTruthy();
                // read
                const pkg = JSON.parse(tree.read(update_package_1.PACKAGE_PATH).toString());
                expect(pkg.dependencies['@ibm-wch/components-ng-shared-utilities']).toBeTruthy();
            }
        }))
            .toPromise();
    });
});
//# sourceMappingURL=update.package_spec.js.map