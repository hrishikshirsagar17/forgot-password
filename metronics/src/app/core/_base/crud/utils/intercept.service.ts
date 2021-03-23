// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../../../../core/auth/_services/token-storage.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	constructor(private tokenStorage: TokenStorageService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.tokenStorage.getToken()}`
			}
		});
		console.log(request);

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {

					}
				},
				error => {

					console.error(error.status);
					console.error(error.message);

				}
			)
		);
	}
}
