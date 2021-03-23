import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../notifications/notification.component';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-update-restaurant',
  templateUrl: './update-restaurant.component.html',
})
export class UpdateRestaurantComponent implements OnInit {
  data: any;
  restaurantData: any;
  restaurant: Restaurant;
  id: number;
  imagename: string ;
  url: string;
  finalurl: string;
  file: any;
  hour: number;
  minute: number;
  isSubmitted = false;
  component: string;
  // tslint:disable-next-line: variable-name
  open_time = {
    hour: 10,
    minute: 30
  };
  // tslint:disable-next-line: variable-name
  close_time = {
    hour: 21,
    minute: 30
  };
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
              private router: Router, public modal: NgbActiveModal, private modalService: NgbModal,
              private title: Title) {
              this.restaurant = new Restaurant();
  }
  ngOnInit(): void {

      this.title.setTitle('Update Restaurant');
      // tslint:disable-next-line: radix
      this.hour = parseInt(this.restaurant.open_time.slice(0, 2));
      // tslint:disable-next-line: radix
      this.minute = parseInt(this.restaurant.open_time.slice(3, 5));
      this.open_time = { hour: this.hour, minute: this.minute};
      // tslint:disable-next-line: radix
      this.hour = parseInt(this.restaurant.close_time.slice(0, 2));
      // tslint:disable-next-line: radix
      this.minute = parseInt(this.restaurant.close_time.slice(3, 5));
      this.close_time = { hour: this.hour, minute: this.minute};
      this.finalurl = 'http://localhost:8080/zonions/file';
      this.url = `${this.finalurl}/${this.restaurant.name}/${this.id}`;
  }
  updateResto(): void {

    this.restaurantService.update(this.id, this.restaurant).subscribe(data => {
      this.restaurant = new Restaurant();

      this.backEvent();
    }, error => console.log(error));
  }
  onSubmit(): void {
    this.restaurant.open_time = this.open_time.hour + ':' + this.open_time.minute;
    this.restaurant.close_time = this.close_time.hour + ':' + this.close_time.minute;
    this.updateResto();
    this.backEvent();
    this.modalService.dismissAll();
    const ref = this.modalService.open(NotificationComponent, {centered: true});
    this.component = 'UpdateRestaurantComponent' ;
    ref.componentInstance.component = this.component;
    window.location.reload();
  }
  onChange(file: any): void {
      this.file = file;

  }
  updateImage(): void {
    console.log('I am in upload' + this.file);
    this.restaurantService.uploadMenu(this.file, this.id).subscribe((resp: any) => {
      console.log(resp);
      this.isSubmitted = true;
    }, error => {
        if (error.status === 500) {
            this.router.navigate(['error/500']);
          }
    });
  }

  backEvent(): void {
    this.router.navigate(['restaurants', 'home']);

  }

}
