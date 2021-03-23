import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../notifications/notification.component';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'kt-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

    id: number;
    component: string;
    constructor(private userService: UserService, private router: Router,
                private modalService: NgbModal, private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle('User Management');
    }

    delete(): void {
       this.userService.deleteUser(this.id).subscribe(
      (data) => {
        console.log(data);
        this.modalService.dismissAll();
        const ref = this.modalService.open(NotificationComponent, {centered: true});
        this.component = 'DeleteUserComponent' ;
        ref.componentInstance.component = this.component;
        window.location.reload();
      },
      (error) => {
          console.log(error);
      }
    );
}

    cancel(): void {
        this.modalService.dismissAll();
    }
}
