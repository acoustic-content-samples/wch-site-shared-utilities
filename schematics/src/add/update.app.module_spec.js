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
const update_app_module_1 = require("./update.app.module");
const schematics_utils_1 = require("@ibm-wch-sdk/schematics-utils");
const operators_1 = require("rxjs/operators");
const APP_MODULE_PATH = '/schematics/app/app.module.ts';
const MAIN_PATH = '/schematics/main.ts';
const DEFAULT_MAIN = `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
`;
const DEFAULT_APP_MODULE = `
import { BrowserModule } from '@angular/platform-browser';
import { WchNgModule } from '@ibm-wch-sdk/ng';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgModule.forRoot(environment)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;
const APP_MODULE_WITH_IMPORTS = `
import { BrowserModule } from '@angular/platform-browser';
import { WchNgModule } from '@ibm-wch-sdk/ng';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WchNgEditModule } from '@ibm-wch-sdk/ng-edit';
import { SiteCommonModule } from '@ibm-wch/components-ng-shared-utilities';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgModule.forRoot(environment),
    BrowserAnimationsModule,
    WchNgEditModule.forRoot(),
    SiteCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;
describe('update.app.module', () => {
    const context = {
        engine: null,
        debug: false,
        strategy: schematics_1.MergeStrategy.Default
    };
    function _verifyAppModule(aTree) {
        // load the file
        const source = schematics_utils_1.getSourceFile(aTree, APP_MODULE_PATH);
        // check the imports
        expect(schematics_utils_1.isImported(source, 'SiteCommonModule', '@ibm-wch/components-ng-shared-utilities')).toBeTruthy();
    }
    function _testAddToAppModule(aAppModule) {
        const tree = new schematics_1.VirtualTree();
        const options = {
            project: 'abc',
            editable: true
        };
        const project = {
            root: '',
            prefix: 'app',
            projectType: 'application',
            architect: {
                build: {
                    options: {
                        main: 'schematics/main.ts'
                    }
                }
            }
        };
        tree.create(MAIN_PATH, DEFAULT_MAIN);
        tree.create(APP_MODULE_PATH, aAppModule);
        const rxResult = update_app_module_1.updateAppModule(options, project)(tree, context);
        return rxResult
            .pipe(operators_1.tap(tree => {
            const buf = tree.read(APP_MODULE_PATH);
            expect(!!buf).toBeTruthy();
            _verifyAppModule(tree);
        }))
            .toPromise();
    }
    it('should add to the app module', () => {
        return _testAddToAppModule(DEFAULT_APP_MODULE);
    });
    it('should be idempotent', () => {
        return _testAddToAppModule(APP_MODULE_WITH_IMPORTS);
    });
});
//# sourceMappingURL=update.app.module_spec.js.map