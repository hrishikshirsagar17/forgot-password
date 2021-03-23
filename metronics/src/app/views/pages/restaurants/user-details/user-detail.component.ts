import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../notifications/notification.component';
import { User } from '../_helpers/user';
import { UserService } from '../_services/user.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['user-details.component.scss']
})
export class UserDetailComponent implements OnInit {
  users: User[];
  role: any[];
  user: User = new User();
  component: string;
  searchKey: string;
  constructor(private router: Router, private userService: UserService,
              private activatedRoute: ActivatedRoute, private modalService: NgbModal,
              private title: Title) { }

  listData: MatTableDataSource<User>;
  displayedColumns: string[] = ['email', 'roles', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit(): void {
    this.title.setTitle('User Management');
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      this.listData = new MatTableDataSource(this.users);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      // tslint:disable-next-line: no-shadowed-variable
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

        });
      };
   }, error => console.log(error));
  }


  deleteUser(user: User) {
    const ref = this.modalService.open(DeleteUserComponent, { centered: true });
    ref.componentInstance.id = user.id;

  }

  changeRole(id: number, ) {
    console.log('id in change status=', id);
    this.userService.getUserById(id).subscribe((resp) => {
      console.log(resp);
      this.user = resp;
      console.log(this.user);
      this.userService.changeUserRole(id, this.user).subscribe(
        (data) => {
          console.log(data);
          const ref = this.modalService.open(NotificationComponent, {centered: true});
          this.component = 'UserDetailComponent' ;
          ref.componentInstance.component = this.component;
          window.location.reload();
        },
        (error) => console.log(error)
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

}
