// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../../../../core/auth/_services/token-storage.service';
import { OauthLoginService } from '/home/hkshirsagar/Documents/forgot-password/metronics/src/app/core/auth/_services/oauth-login.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	constructor(private oauthService: OauthLoginService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {

	  const authToken = this.oauthService.getAuthToken();
	  if (authToken != null) {
		req = req.clone({
		  setHeaders: {
			Authorization: authToken
		  }
		});
	  }

   return next.handle(req).pipe(
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
