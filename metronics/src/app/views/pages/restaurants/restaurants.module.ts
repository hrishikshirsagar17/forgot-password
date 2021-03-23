import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsComponent } from './restaurants.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { UserDetailComponent } from './user-details/user-detail.component';
import { DeleteUserComponent } from './user-details/delete-user/delete-user.component';
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MatSnackBarModule,
	MatTooltipModule,
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
	MatToolbarModule,
	MatSlideToggleModule
} from '@angular/material';
import { DeleteRestaurantComponent } from './delete-restaurant/delete-restaurant.component';
import { NotificationComponent } from './notifications/notification.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LogService } from './_services/log.service';
import { BookTableComponent } from './book-table/book-table.component';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
	{
		path: '',
		component: RestaurantsComponent,
		data: { breadcrumb: 'Zonions'},
		children: [
			{
				path: 'home',
				component: HomeComponent,
				data: { breadcrumb: 'Active Restaurants'},

			},
			{
				path: 'create',
				component: CreateRestaurantComponent,
				data: { breadcrumb: 'Add Restaurant'}
            },
            {
                path: 'list',
				component: RestaurantListComponent,
				data: { breadcrumb: 'Restaurants List'}
			},
			{
				path: 'update/:id',
				component: UpdateRestaurantComponent,
				data: { breadcrumb: 'Update Restaurant'}
			},
			{
				path: 'restaurantDetail/:restaurantName',
				component: RestaurantDetailsComponent,
				data: { breadcrumb: ''}
			},
			{
				path: 'users',
				component: UserDetailComponent,
				data: { breadcrumb: 'User Management'}
			},
			{
				path: 'booktable',
				component: BookTableComponent,
				data: { breadcrumb: 'Book Table'}
			}

		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		NgbModule,
		CoreModule,
		MaterialPreviewModule,
		RouterModule.forChild(routes),
		TranslateModule.forChild(),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PerfectScrollbarModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatToolbarModule,
		MatSlideToggleModule
	],
	exports: [RouterModule],
	entryComponents: [UpdateRestaurantComponent, DeleteRestaurantComponent, DeleteUserComponent, NotificationComponent],
	declarations: [
		RestaurantsComponent,
		HomeComponent,
        CreateRestaurantComponent,
		RestaurantListComponent,
		UpdateRestaurantComponent,
		RestaurantDetailsComponent,
		UserDetailComponent,
		DeleteRestaurantComponent,
		DeleteUserComponent,
		NotificationComponent,
		BreadcrumbComponent,
		BookTableComponent,
	],
	providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
	LogService ],
})
export class RestaurantsModule {
}
