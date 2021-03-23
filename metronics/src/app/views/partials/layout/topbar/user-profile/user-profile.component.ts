// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, TokenStorageService, User } from '../../../../../core/auth';


@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

	user$: Observable<User>;
	
	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;


	constructor(private store: Store<AppState>, private tokenStorageService: TokenStorageService) {
	}


	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		
	}


	logout() {
		this.tokenStorageService.signOut();
		this.store.dispatch(new Logout());
	}
}
