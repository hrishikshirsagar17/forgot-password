import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../services/data/profile-data.service';
import { OauthLoginService } from '../../services/oauth-login.service';

@Component({
  selector: 'kt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() user: User;
  constructor(public oauthService: OauthLoginService) { }

  ngOnInit() {
    console.log(this.user)
  }

}
