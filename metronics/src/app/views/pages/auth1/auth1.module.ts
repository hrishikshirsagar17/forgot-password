
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSpinnerModule } from 'ng-bootstrap-spinner';
import { Auth1Component } from './auth1.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Oauth2Handler } from './oauth2handler';
import { LogoutComponent } from './logout/logout.component';
import { HttpIntercpterService } from './services/http/http-intercpter.service';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { LoaderInterceptorService } from './services/http/loader-interceptor.service';
import { SocialLoginComponent } from './social-login/social-login.component';

import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from './home/home/home.component';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';
import { ExternalUrlDirective } from './directives/external-url.directive';
import { CommonModule } from '@angular/common';

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const routes: Routes = [
      {
        path: '',
        component: Auth1Component,
        children: [
          { path: 'login', component: LoginComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'signup', component: SignupComponent },
          {
            path: 'home',
            component: HomeComponent,
          },
          { path: 'oauth2/redirect', component: Oauth2Handler },
          { path: 'externalRedirect', canActivate: [externalUrlProvider],
           component: NotFoundComponent },
          { path: 'logout', component: LogoutComponent }
        ]
      }
    ];


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    Oauth2Handler,
    LogoutComponent,
    SocialLoginComponent,
    ExternalUrlDirective,
    NotFoundComponent,
    Auth1Component
  ],
  imports: [
    CommonModule,
		FormsModule,
    ReactiveFormsModule,
    NgSpinnerModule,
    AngularBootstrapToastsModule,
    RouterModule.forChild(routes),
    HomeModule,
    SharedModule,
    ToastNotificationsModule.forRoot(
      {
        duration: 6000, type: 'primary',
        position: 'bottom-right',
        preventDuplicates: true
      }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercpterService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      },
  },
  ],
})
export class Auth1Module {
  static forRoot(): ModuleWithProviders {
		return {
			ngModule: Auth1Module,
			providers: [
				HttpIntercpterService,
				LoaderInterceptorService
			]
		};
	}
}
