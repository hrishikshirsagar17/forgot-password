import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationComponent } from '../notifications/notification.component';
import { BookTable } from '../_helpers/bookTable';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
    selector: 'kt-book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
  })
export class BookTableComponent implements OnInit {
    seats: any = [1, 2, 3, 4, 5, 6];
    bookingForm: FormGroup;
    noOfSeats = '';
    date: Date = null;
    time = { hour: 13, minute: 30 };
    bookTime = '';
    restaurantName = '';
    IsAccepted = 0;
    bookTable: BookTable;
    startDate = new Date();
    submitted = false;
    data: any;
    component: string;
    constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private modalService: NgbModal,
                private router: Router) {
    }
        ngOnInit(): void {
          this.bookingForm = this.fb.group({
            restaurantName: new FormControl('', [Validators.required, Validators.maxLength(25),
              Validators.pattern('^[a-zA-Z ]*$')]),
              date: new FormControl(new Date()),
              bookTime: new FormControl('', [Validators.required]),
              noOfSeats: new FormControl('', [Validators.required])
          });
        }
        get f() { return this.bookingForm.controls; }

        onSubmit(fvalue: any): void {
          this.submitted = true;
          this.data = fvalue;
          this.bookTime =
          this.data.bookTime.hour + ':' + this.data.bookTime.minute;
          this.data.bookTime = this.bookTime;

          this.restaurantService.bookTable(this.bookingForm.value).subscribe(
            data => {
              console.log(data);
              const ref = this.modalService.open(NotificationComponent);
              this.component = 'BookTableComponent' ;
              ref.componentInstance.component = this.component;
              window.location.reload();
            }
          );


      }


}
