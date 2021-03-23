import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantsComponent } from './restaurants.component';

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

} from '@angular/material';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LogService } from './_services/log.service';
import { NotificationComponent } from './notifications/notification.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';


const routes: Routes = [
	{
		path: '',
		component: RestaurantsComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'restaurantDetail/:restaurantName',
				component: RestaurantDetailsComponent,
			}


		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		RouterModule.forChild(routes),
		MatCarouselModule.forRoot(),
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

	],
	exports: [RouterModule],
	entryComponents: [NotificationComponent],
	declarations: [
		RestaurantsComponent,
		HomeComponent,
		RestaurantDetailsComponent,
		NotificationComponent,
		BreadcrumbComponent
	],
	providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
	LogService ],
})
export class RestaurantModule {
}
