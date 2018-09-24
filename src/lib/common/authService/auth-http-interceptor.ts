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

import {throwError as observableThrowError, Observable} from 'rxjs';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	constructor(private router: Router) {

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401 || err.status === 403) {
					this.router.navigate(['sign-in']);
					return observableThrowError(err);
				}
			}
		});
	}
}