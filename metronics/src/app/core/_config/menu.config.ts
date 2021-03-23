import { Input, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth';

const USER_ROLE = 'auth-role';

export class MenuConfig implements OnInit {

	private roles: string[] = [];
	isLoggedIn = false;
	role = window.sessionStorage.getItem(USER_ROLE);
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD'
				},
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.RESTAURANTS',
					submenu: [
								{
									title: 'Restaurant List',
									page: '/restaurants/list',
									translate: 'MENU.RESTAURANT_LIST'
								},
								{
									title: 'Active Restaurants',
									page: '/restaurants/home',
									translate: 'MENU.ACTIVE_RESTAURANT'
								},
					]
				},
				{
					title: 'User Management',
					root: true,
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.USER_MANAGEMENT',
					submenu: [
						{

								title: 'Active Users',
								page: '/restaurants/users',
								translate: 'MENU.ACTIVE_USERS'

						}
					]
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				// {
				// 	title: 'Layout Builder',
				// 	root: true,
				// 	icon: 'flaticon2-expand',
				// 	page: '/builder'
				// },
				{
					title: 'Restaurants',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-expand',
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.RESTAURANTS',
					submenu: [
								{
									title: 'Restaurant List',
									page: '/restaurants/list',
									translate: 'MENU.RESTAURANT_LIST'
								},
								{
									title: 'Active Restaurants',
									page: '/restaurants/home',
									translate: 'MENU.ACTIVE_RESTAURANT'

								},


					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.USER_MANAGEMENT',
					submenu: [
						{

								title: 'Active Users',
								page: '/restaurants/users',
								translate: 'MENU.ACTIVE_USERS'

						}
					]
				}
			]
		},
	};

	public defaults1: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.RESTAURANTS',
					submenu: [
						{
							title: 'Active Restaurants',
							page: '/restaurants/home',
							translate: 'MENU.ACTIVE_RESTAURANT'
						},
						{
							title: 'Book Table',
							page: '/restaurants/booktable',
							translate: 'MENU.BOOK_TABLE'
						}
					]
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					translate: 'MENU.RESTAURANTS',
					submenu: [
								{
									title: 'Active Restaurants',
									page: '/restaurants/home',
									translate: 'MENU.ACTIVE_RESTAURANT'
								},
								{
									title: 'Book Table',
									page: '/restaurants/booktable',
									translate: 'MENU.BOOK_TABLE'
								}
					]
				}
			]
		}
	};
	constructor(private tokenStorageService: TokenStorageService) { }
	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorageService.getToken();
		if (this.isLoggedIn) {
			const user = this.tokenStorageService.getUser();
			this.roles = user.roles;
			this.role = sessionStorage.getItem(USER_ROLE);

	}
}
	public get configs(): any {
		if (this.role === 'ROLE_ADMIN') {
			return this.defaults;
		} else {
			return this.defaults1;
		}

	}





}


