import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UpdateRestaurantComponent } from '../update-restaurant/update-restaurant.component';
import { DeleteRestaurantComponent } from '../delete-restaurant/delete-restaurant.component';
import { Title } from '@angular/platform-browser';
import { NotificationComponent } from '../notifications/notification.component';
import { LogService } from '../_services/log.service';

@Component({
  selector: 'kt-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['restaurant-list.component.scss']

})
export class RestaurantListComponent implements OnInit {

  restaurants = new Array<Restaurant>();
  id: number;
  restaurantObject = new Array<Restaurant>();
  closeResult: string;
  restaurant: Restaurant = new Restaurant();
  data: any;
  file: any;
  restaurantId: any;
  restaurantData: any;
  component: string;
  isSubmitted = false;
  dialog: boolean;
  // tslint:disable-next-line: variable-name
  open_time = '';
  // tslint:disable-next-line: variable-name
  close_time = '';
  time = { hour: 13, minute: 30 };
  restaurantForm: FormGroup;
  constructor(
    private restaurantService: RestaurantService,
    private router: Router, private modalService: NgbModal,  private formBuilder: FormBuilder,
    private title: Title, private logger: LogService) {

  }

  listData: MatTableDataSource<Restaurant>;
  displayedColumns: string[] = ['restaurantName', 'address', 'phoneNo', 'open_time', 'close_time', 'updatedTime', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  get form(): any {
    return this.restaurantForm.controls;
  }
  ngOnInit(): void {
    this.title.setTitle('Manage Restaurants');

    this.restaurantForm = this.formBuilder.group({
      restaurantName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25),
                Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]),
       address: new FormControl('', [Validators.required]),
       phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
          Validators.pattern('[7-9][0-9]{9}')]),
       open_time: new FormControl('', [Validators.required]),
       close_time: new FormControl('', [Validators.required])
 });

    this.restaurantService.getRestaurantList().subscribe(
      (data) => {
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
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }

  saveRestaurant(fvalue: any): void {
    console.log(this.restaurantForm.value);
    this.data = fvalue;
    console.log('console data object=', this.data);
    console.log('close time on data object=', this.data.close_time);
    this.close_time =
      this.data.close_time.hour + ':' + this.data.close_time.minute;
    this.data.close_time = this.close_time;
    this.open_time =
      this.data.open_time.hour + ':' + this.data.open_time.minute;
    this.data.open_time = this.open_time;
    this.isSubmitted = true;
    this.restaurantService.createRestaurant(this.restaurantForm.value).subscribe(
      (res) => {
        console.log('after adding resto', res);
        this.restaurantData = res;

        console.log('id from restaurant data', this.restaurantData.id);
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }
  uploadFile(): void {
    console.log('I am in upload' + this.file);
    this.restaurantService
      .uploadMenu(this.file, this.restaurantData.id)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.modalService.dismissAll();
          const ref = this.modalService.open(NotificationComponent, {centered: true});
          this.dialog = true;
          ref.componentInstance.dialog = this.dialog;
          window.location.reload();
        },
        error => {
          if (error.status === 500) {
            this.router.navigate(['error/500']);
          }
        }
      );
  }
  onFileChangeEvent(file: any): void {
    this.file = file;
    console.log('file change event=', this.file);
  }

  backEvent(): void {
    this.router.navigate(['restaurants', 'home']);
  }
  deleteRestaurant(restaurant: Restaurant): void {
    const ref = this.modalService.open(DeleteRestaurantComponent, { centered: true });
    ref.componentInstance.id = restaurant.id;
  }
  edit(restaurant: Restaurant): void {
    const ref = this.modalService.open(UpdateRestaurantComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', size: 'lg' });
    ref.componentInstance.restaurant = restaurant;
    ref.componentInstance.id = restaurant.id;
  }
  back(): void {
    this.router.navigate(['restaurants', 'home']);
  }

  changeStatus(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe((resp) => {
      this.restaurantObject = resp;
      this.restaurantService.changeStatus(id, this.restaurantObject).subscribe(
        (data) => {
          const ref = this.modalService.open(NotificationComponent, {centered: true});
          this.component = 'UpdateRestaurantComponent' ;
          ref.componentInstance.component = this.component;
          window.location.reload();
        }, error => {
          if (error.status === 500) {
            this.router.navigate(['error/500']);
          }
        }
      );
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  open(content): void {
    this.logger.info('Add method');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', size: 'lg' });
  }
}
