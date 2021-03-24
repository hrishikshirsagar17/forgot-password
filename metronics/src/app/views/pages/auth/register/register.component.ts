// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
// tslint:disable-next-line: max-line-length
import { AuthNoticeService, AuthService, CustomValidationService, OauthLoginService, Register, TokenStorageService, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { Title } from '@angular/platform-browser';
import { Constants } from '/home/hkshirsagar/Documents/forgot-password/metronics/src/app/core/auth/_services/constants';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

	display = 'none';
	modalObject = {};
	errorMessage: string;
	signupForm: FormGroup;

	constructor(
	  private fb: FormBuilder,
	  private oauthService: OauthLoginService,
	  private customValidator: CustomValidationService) {
	}

	ngOnInit() {
	  // sign up form builder
	  this.signupForm = this.fb.group({
		name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
		confirmPassword: ['', [Validators.required]]
		}, {
		  validator: this.customValidator.MatchPassword('password', 'confirmPassword')
		}
	  );
	  this.modalObject = {
		title: '',
		body: ''
	  };
	}

	get signupFormControl(): any {
	  return this.signupForm.controls;
	}

	getLogo() {
	  return Constants.LOGO_URL;
	}

	getAddon() {
	  return Constants.ADDON_URL;
	}

	onSubmit() {
	  const user = {
		name: this.signupForm.value.name,
		email: this.signupForm.value.email,
		password: this.signupForm.value.password
	  };
	  this.oauthService.userSignup(user).subscribe(
		response => {
		  this.errorMessage = null;
		  this.showModal();
		  console.log(response);
		},
		error => {
		  this.signupForm.reset();
		  if (error.error.message) {
			this.errorMessage = error.error.message;
		  } else {
			this.errorMessage = 'Unknown error occured, try after some time..';
		  }
		}
	  );
	}

	displayChange(value) {
	  this.display = 'none';
	}

	showModal() {
	  this.display = 'block';
	  this.modalObject = {
		title: 'SignUp Successful',
		body: `Thanks for signing in!.
			  Account verification link is sent on your mail id
			  ${this.signupForm.value.email}.
			  Click on link to activate your account.`
	  };
	}
	// registerForm: FormGroup;
	// loading = false;
	// errors: any = [];
	// isValid = true;
	// username: any;
	// email: any;
	// password: any;

	// private unsubscribe: Subject<any>;


	// constructor(
	// 	private authNoticeService: AuthNoticeService,
	// 	private translate: TranslateService,
	// 	private router: Router,
	// 	private auth: AuthService,
	// 	private store: Store<AppState>,
	// 	private fb: FormBuilder,
	// 	private cdr: ChangeDetectorRef,
	// 	private tokenStorageService: TokenStorageService,
	// 	private title: Title
	// ) {
	// 	this.unsubscribe = new Subject();
	// }


	// ngOnInit() {
	// 	this.title.setTitle('Zonions|Signup');

	// 	this.initRegisterForm();
	// }


	// ngOnDestroy(): void {
	// 	this.unsubscribe.next();
	// 	this.unsubscribe.complete();
	// 	this.loading = false;
	// }


	// initRegisterForm() {
	// 	this.registerForm = this.fb.group({
	// 		username: ['', Validators.compose([
	// 			Validators.required,
	// 			Validators.minLength(3),
	// 			Validators.maxLength(20),
	// 			Validators.pattern('^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$')
	// 		])
	// 		],
	// 		email: ['', Validators.compose([
	// 			Validators.required,
	// 			Validators.email,
	// 			Validators.minLength(8),
	// 			Validators.maxLength(50),
	// 			Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')

	// 		]),
	// 		],
	// 		password: ['', Validators.compose([
	// 			Validators.required,
	// 			Validators.minLength(8),
	// 			Validators.maxLength(50),
	// 			Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')

	// 		])
	// 		],
	// 		confirmPassword: ['', Validators.compose([
	// 			Validators.required,
	// 			Validators.minLength(3),
	// 			Validators.maxLength(20)
	// 		])
	// 		],
	// 		agree: [false, Validators.compose([Validators.required])]
	// 	}, {
	// 		validator: ConfirmPasswordValidator.MatchPassword
	// 	});
	// }


	// submit() {
	// 	const controls = this.registerForm.controls;

	// 	if (this.registerForm.invalid) {
	// 		this.isValid = false;
	// 		alert(this.isValid);
	// 		Object.keys(controls).forEach(controlName =>
	// 			controls[controlName].markAsTouched()
	// 		);
	// 		return this.isValid;
	// 	}

	// 	this.loading = true;

	// 	if (!controls.agree.value) {

	// 		this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
	// 		return;
	// 	}

	// 	const user: User = new User();
	// 	user.clear();
	// 	user.email = controls.email.value;
	// 	user.username = controls.username.value;
	// 	user.password = controls.password.value;



	// 	this.auth.register(user).pipe(
	// 		tap(data => {
	// 			if (this.isValid) {
	// 				this.store.dispatch(new Register({authToken: data.accessToken}));
	// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
	// 				this.router.navigateByUrl('/auth/login');
	// 			} else {
	// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
	// 			}
	// 		}),
	// 		takeUntil(this.unsubscribe),
	// 		finalize(() => {
	// 			this.loading = false;
	// 			this.cdr.markForCheck();
	// 		})
	// 	).subscribe();
	// }


	// isControlHasError(controlName: string, validationType: string): boolean {
	// 	const control = this.registerForm.controls[controlName];
	// 	if (!control) {
	// 		return false;
	// 	}

	// 	const result = control.hasError(validationType) && (control.dirty || control.touched);
	// 	return result;
	// }
}
