import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../notifications/notification.component';
import { Restaurant } from '../_helpers/restaurant';
import { LogService } from '../_services/log.service';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
    selector: 'kt-delete-restaurant',
    templateUrl: './delete-restaurant.component.html',
    styleUrls: ['delete-restaurant.component.scss']
})
export class DeleteRestaurantComponent implements OnInit {

    id: number;
    component: string;
    constructor(private restaurantService: RestaurantService, private router: Router,
                private modalService: NgbModal, private title: Title, private logger: LogService) { }

    ngOnInit(): void {
        this.title.setTitle('Manage Restaurants');
    }

    delete(): void {
        this.logger.info('Inside Delete Method');
        this.restaurantService.deleteRestaurant(this.id).subscribe(
            (data) => {
                this.logger.info('Inside Delete Restaurant Service' + data);
                this.modalService.dismissAll();
                const ref = this.modalService.open(NotificationComponent);
                this.component = 'DeleteRestaurantComponent' ;
                ref.componentInstance.component = this.component;
                window.location.reload();
            }, error => {
                if (error.status === 500) {
                    this.router.navigate(['error/500']);
                }
            }
        );
    }

    cancel(): void {
        this.modalService.dismissAll();
    }
}
