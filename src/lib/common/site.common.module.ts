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
import {CommonModule} from '@angular/common';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


import {WchNgComponentsModule} from '@ibm-wch-sdk/ng';
import { WchNgEditComponentsModule } from '@ibm-wch-sdk/ng-edit';


/* utility pipes */
import {FormattedTextPipe} from './formattedtext/formatted-text.pipe';
import {ItemSortPipe} from './itemSort/item-sort.pipe';

import { ConfigServiceService } from './configService/config-service.service';
import { DateFilterPipe } from './dateFilter/date-filter.pipe';
import { UtilsService } from './utils/utils.service';
import { Link } from './link.component';

/* Comment out ShareSocialComponent because it is not used in npm modules */
// import { ShareSocialComponent } from '../components/share-social/share-social.component';

import { AuthService } from './authService/auth-service.service';
import {AuthHttpInterceptor} from './authService/auth-http-interceptor';

/* Moved from app.module.ts in prod-oob to site.common.module.ts in npm modules*/
import {HighlightService} from "./highlightService/highlight.service";




@NgModule({
    imports: [
        WchNgComponentsModule,
        WchNgEditComponentsModule,
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        FormattedTextPipe,
        ItemSortPipe,
        DateFilterPipe,
        Link
        // ShareSocialComponent
    ],
    entryComponents: [
    ],
    providers: [
        ConfigServiceService,
        UtilsService,
        AuthService,
        HighlightService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        }
    ],
    exports: [
        FormattedTextPipe,
        ItemSortPipe,
        DateFilterPipe,
        Link
        // ShareSocialComponent
    ]
})
export class SiteCommonModule {
}
