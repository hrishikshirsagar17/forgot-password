// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AppConstants, AuthNoticeService, AuthService, Login, User, OauthService, OauthLoginService} from '../../../../core/auth';
import { TokenStorageService } from '../../../../core/auth/_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../restaurants/_services/user.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// tslint:disable-next-line: max-line-length
import { TokenDto } from '/home/hkshirsagar/Documents/Old-zoninos/Zonions-Application/Metronics-Theme/src/app/core/auth/_services/token-dto';
import { Constants } from '/home/hkshirsagar/Documents/forgot-password/metronics/src/app/core/auth/_services/constants';
/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'demo@demo.com',
	PASSWORD: 'demo'
};


const USER_ROLE = 'auth-role';

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	// Public params

socialUser: SocialUser;
userLogged: SocialUser;
isLogged: boolean;
user: User;
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	isLoggedIn = false;
	currentUser: any;
	roles: string[] = [];
	private unsubscribe: Subject<any>;
	googleURL = AppConstants.GOOGLE_AUTH_URL;
	facebookURL = AppConstants.FACEBOOK_AUTH_URL;
	private returnUrl: any;
	errorMessage: string;
	invalidLogin = false;
	rememberMe = false;
	display = 'none';
	verifyModalData = {};

	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private tokenStorage: TokenStorageService,
		private title: Title,
		private userService: UserService,
		private authService: SocialAuthService,
		// private oauthService: OauthService
		private oauthService: OauthLoginService,
	) {
		this.unsubscribe = new Subject();
	}
	ngOnInit() {
		this.loginForm = this.fb.group({
		  email: ['', [Validators.required, Validators.email]],
		  password: ['', Validators.required]
		});
		if (localStorage.getItem('email') && localStorage.getItem('password')) {
		  this.loginForm.patchValue({
			email: localStorage.getItem('email'),
			password: localStorage.getItem('password')
		  });
		}
		this.setVerifyModalData();
	  }
	  
	  get loginFormControl() {
		return this.loginForm.controls;
	  }

	  getLoginPage(provider: string): string {
		switch (provider) {
		  case 'facebook': return Constants.FACEBOOK_AUTH_URI;
		  case 'google': return Constants.GOOGLE_AUTH_URI;
		  case 'github': return Constants.GITHUB_AUTH_URI;
		  case 'linkedin': return Constants.GITHUB_AUTH_URI;
		  case 'twitter': return Constants.GITHUB_AUTH_URI;
		}
	  }

	  getLogo() {
		return Constants.LOGO_URL;
	  }
	  getAddon() {
		return Constants.ADDON_URL;
	  }

	  onSubmit() {
		const user = this.loginForm.value;
		this.oauthService.basicJwtAuthLogin(user).subscribe(
		  response => {
			console.log(response);
			this.invalidLogin = false;
			this.saveCredentials();
			this.store.dispatch(new Login({ authToken: this.oauthService.getAuthToken() }));
			this.currentUser = this.tokenStorage.getUser();
			this.returnUrl = '/restaurants/home';
			this.router.navigateByUrl(this.returnUrl);
		  },
		  error => {
			this.invalidLogin = true;
			if (error.error.message) {
			  this.errorMessage = error.error.message;
			} else {
			  this.errorMessage = 'Unknown error occured, try after some time..';
			}
		  }
		);
	  }

	  toggleValue(event) {
		if (event.target.checked) {
		  this.rememberMe = true;
		}
	  }

	  saveCredentials() {
		if (this.rememberMe) {
		  localStorage.setItem('email', this.loginForm.value.email);
		  localStorage.setItem('password', this.loginForm.value.password);
		}
	  }
	  openVerifyEmailModal() {
		this.setVerifyModalData('Verify email', 'Send link', 'verify');
		this.display = 'block';
	  }
	  openForgotPassModal() {
		this.setVerifyModalData('Reset Password', 'Send OTP', 'reset');
		this.display = 'block';
	  }
	  eventDisplay(event) {
		this.display = 'none';
	  }
	  setVerifyModalData(title: string = '', btn: string = '', type: string = '') {
		this.verifyModalData = {
		  title,
		  btn,
		  type
		};
	  }

// 	ngOnInit(): void {
// 		this.authService.authState.subscribe(
// 			data => {
// 			  this.userLogged = data;
// 			  this.isLogged = (this.userLogged != null && this.tokenStorage.getToken() != null);
// 			}
// 		  );
// 		const token: string = this.route.snapshot.queryParamMap.get('token');
// 		const error: string = this.route.snapshot.queryParamMap.get('error');
// 	 if (this.tokenStorage.getToken()) {
// 		  this.isLoggedIn = true;
// 		  this.currentUser = this.tokenStorage.getUser();
// 		} else if (token) {
// 			  this.tokenStorage.saveToken(token);
// 			  this.userService.getCurrentUser().subscribe(
// 					data => {
// 					  this.login(data);
// 					}
// 				);
// 		  }
// 	 this.title.setTitle('Zonions|Login');

// 	 this.initLoginForm();
// 	 if (this.tokenStorage.getToken()) {
// 			this.isLoggedIn = true;
// 			this.roles = this.tokenStorage.getUser().roles;

// 		}
// 	 this.route.queryParams.subscribe(params => {
// 			this.returnUrl = '/restaurants/home';
// 		});
// 	}

// 	signInWithGoogle(): void {
// 		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
// 		  data => {
// 			this.socialUser = data;
// 			const tokenGoogle = new TokenDto(this.socialUser.idToken);
// 			this.oauthService.google(tokenGoogle).subscribe(
// 			  res => {
// 				this.tokenStorage.setToken(res.value);
// 				this.isLogged = true;
// 				this.store.dispatch(new Login({ authToken: this.tokenStorage.getToken() }));
// 				this.currentUser = this.tokenStorage.getUser();
// 				this.router.navigateByUrl(this.returnUrl);
// 			  },
// 			  err => {
// 				console.log(err);

// 			  }
// 			);
// 		  }
// 		).catch(
// 		  err => {
// 			console.log(err);
// 		  }
// 		);
// 	  }

// 	  signInWithFB(): void {
// 		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
// 		  data => {
// 			this.socialUser = data;
// 			const tokenFace = new TokenDto(this.socialUser.authToken);
// 			this.oauthService.facebook(tokenFace).subscribe(
// 			  res => {
// 				this.tokenStorage.setToken(res.value);
// 				this.isLogged = true;
// 				this.store.dispatch(new Login({ authToken: this.tokenStorage.getToken() }));
// 				this.currentUser = this.tokenStorage.getUser();
// 				this.router.navigateByUrl(this.returnUrl);
// 			  },
// 			  err => {
// 				console.log(err);
// 			  }
// 			);
// 		  }
// 		).catch(
// 		  err => {
// 			console.log(err);
// 		  }
// 		);
// 	  }

// 	login(user: User): void {
// 		this.tokenStorage.saveUser(user);
// 		this.isLoggedIn = true;
// 		this.currentUser = this.tokenStorage.getUser();
// 	  }

// 	ngOnDestroy(): void {
// 		this.authNoticeService.setNotice(null);
// 		this.unsubscribe.next();
// 		this.unsubscribe.complete();
// 		this.loading = false;
// 	}

// 	initLoginForm() {

// 		this.loginForm = this.fb.group({
// 			email: [DEMO_PARAMS.EMAIL, Validators.compose([
// 				Validators.required,
// 				Validators.minLength(8),
// 				Validators.maxLength(50),
// 				Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
// 			])
// 			],
// 		password: [DEMO_PARAMS.PASSWORD, Validators.compose([
// 				Validators.required,
// 				Validators.minLength(8),
// 				Validators.maxLength(50),
// 				Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
// 			])
// 			]
// 		});
// 	}


// submit() {
// 		const controls = this.loginForm.controls;
// 		if (this.loginForm.invalid) {
// 			Object.keys(controls).forEach(controlName =>
// 				controls[controlName].markAsTouched()
// 			);
// 			return;
// 		}

// 		this.loading = true;

// 		const authData = {
// 			email: controls.email.value,
// 			password: controls.password.value
// 		};
// 		this.auth
// 			.login(authData.email, authData.password)
// 			.pipe(
// 				tap(user => {
// 					if (user) {
// 						this.store.dispatch(new Login({ authToken: user.accessToken }));
// 						this.currentUser = this.tokenStorage.getUser();
// 						this.router.navigateByUrl(this.returnUrl); // Main page
// 					} else {
// 						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
// 					}
// 				}),
// 				takeUntil(this.unsubscribe),
// 				finalize(() => {
// 					this.loading = false;
// 					this.cdr.markForCheck();
// 				})
// 			)
// 			.subscribe(
// 				data => {
// 					this.tokenStorage.saveToken(data.accessToken);
// 					this.tokenStorage.saveUser(data);

// 					this.isLoggedIn = true;
// 					this.roles = this.tokenStorage.getUser().roles;
// 					sessionStorage.setItem(USER_ROLE, this.tokenStorage.getUser().roles);
// 					this.store.dispatch(new Login({ authToken: this.tokenStorage.getToken() }));
// 					this.currentUser = this.tokenStorage.getUser();
// 				}
// 			);
// 	}

// isControlHasError(controlName: string, validationType: string): boolean {
// 		const control = this.loginForm.controls[controlName];
// 		if (!control) {
// 			return false;
// 		}

// 		const result = control.hasError(validationType) && (control.dirty || control.touched);
// 		return result;
// 	}

}
