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
/**
 * Do not modify this file, it will be auto-generated.
 */
import {FormattedTextPipe} from './common/formattedtext/formatted-text.pipe';
import {ItemSortPipe} from './common/itemSort/item-sort.pipe';

import { ConfigServiceService } from './common/configService/config-service.service';
import { DateFilterPipe } from './common/dateFilter/date-filter.pipe';
import { UtilsService } from './common/utils/utils.service';
import { Link } from './common/link.component';

import { AuthService } from './common/authService/auth-service.service';
import {AuthHttpInterceptor} from './common/authService/auth-http-interceptor';
import {HighlightService} from "./common/highlightService/highlight.service";
// import {Ng2LoggerFactory} from "./common/Ng2LoggerFactory"

export const LAYOUTS = [
    FormattedTextPipe,
    ItemSortPipe,
    ConfigServiceService,
    DateFilterPipe,
    UtilsService,
    Link,
    AuthService,
    AuthHttpInterceptor,
    HighlightService
    // Ng2LoggerFactory
];