import {Component} from '@angular/core';
import {User} from "../user.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html'
})
export class UserDisplayComponent {

  public users: User[]
  public service: UserService

  constructor(service: UserService) {
    this.service = service

    this.users = this.service.users.getValue()

    this.service.users.subscribe(u => {
      this.users = u
    })
  }

  protected readonly window = window;
}
