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
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Constants} from '../../Constants';
import {HttpClient} from '@angular/common/http';
import { WchInfoService } from '@ibm-wch-sdk/ng';
import { luceneEscapeTerm } from '@ibm-wch-sdk/utils';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishReplay';




@Injectable()
export class ConfigServiceService {

	// cache config results
	public config: Map<string, any> = new Map();


	constructor(private http: HttpClient, private wchInfoService: WchInfoService) {

	}

	getConfig(name: string): Observable<any> {
		if (this.config.has(name)) {
			return Observable.of(this.config.get(name));
		}

		const apiUrl = this.wchInfoService.apiUrl;
        	let searchURL = `${apiUrl}/delivery/v1/search?q=name:%22${this.escapeUrl(name)}%22&fl=document:%5Bjson%5D`;

		if (name.indexOf(Constants.HEADER_CONFIG) !== -1) {
			const searchParams = name.split(':');
			if (searchParams.length < 2) {
                		const headerId = '90d184ea-eb9c-4316-97a8-9d1ebc3029fc';
                		return this.http.get(`${apiUrl}/delivery/v1/content/${headerId}`)
                    			.do(res => this.config.set(name, res))
                    			.publishReplay(1)
                    			.refCount();
			} else {
                		searchURL = `${apiUrl}/delivery/v1/search?q=type:%22Header%22&fq=tags:(%22${this.escapeUrl(searchParams[1])}%22)&fl=document:%5Bjson%5D`;
			}
        	} else if (name.indexOf(Constants.FOOTER_CONFIG) !== -1) {
            		const searchParams = name.split(':');
            		if (searchParams.length < 2) {
                		const footerId = 'ae72d304-ad18-4bf3-b213-4a79c829e458';
                		return this.http.get(`${apiUrl}/delivery/v1/content/${footerId}`)
                    			.do(res => this.config.set(name, res))
                    			.publishReplay(1)
                    		.refCount();
            		} else {
                		searchURL = `${apiUrl}/delivery/v1/search?q=type:%22Footer%22&fq=tags:(%22${this.escapeUrl(searchParams[1])}%22)&fl=document:%5Bjson%5D`;
			}
        	}

		return this.http.get(searchURL)
			.do((res) => {
				this.config.set(name, res);
			})
			.map((response: any) => {
				if (response && response.numFound > 0) {
					return response.documents.shift().document
				} else {
					return {};
				}
			})
			.publishReplay(1)
			.refCount();
	}

	escapeUrl(url: string){
		return luceneEscapeTerm(url);
	}

}
