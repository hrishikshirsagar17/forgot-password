import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kt-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['notification.component.scss']
})
export class NotificationComponent implements OnInit {

    component: string;
    dialog: boolean;
        ngOnInit(): void {
        }

}
