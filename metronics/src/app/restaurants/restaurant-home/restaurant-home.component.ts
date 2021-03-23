import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
// import { UserService } from '../_services/user.service';

@Component({
  selector: 'kt-home',
  templateUrl: './restaurant-home.component.html',
})
export class HomeComponent implements OnInit {
  restaurants = new Array<Restaurant>();
  public errorMessage = '';

  constructor(private restaurantService: RestaurantService, private router: Router,
              private title: Title) {}

  listData: MatTableDataSource<Restaurant>;
  displayedColumns: string[] = ['restaurantName', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit(): void {
    this.title.setTitle('Active Restaurants');

    this.restaurantService.getActiveRestaurantList().subscribe((data) => {
      console.log(data);
      console.log(data.length);
      this.restaurants = data;
      this.listData = new MatTableDataSource(this.restaurants);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
              // tslint:disable-next-line: no-shadowed-variable
      this.listData.filterPredicate = (data, filter) => {
                return this.displayedColumns.some(element => {
                  return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

                });
              };
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


}
