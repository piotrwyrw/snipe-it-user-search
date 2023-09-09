import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {HistoryService} from "../history.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent {

  @ViewChild("userID", {static: true}) inputUserID: ElementRef | undefined;

  public historyService: HistoryService;
  public userService: UserService;

  constructor(histService: HistoryService, usrService: UserService) {
    this.historyService = histService;
    this.userService = usrService;
  }

  async searchUser() {

    // There was no CLEAR indication the progress bar having to do anything more than just gradually fill up,
    // but I guess it doesn't make too much sense from the UI/UX perspective to be able to search for more users
    // if the progress bar is already full. Hence, why the following statement.
    if (this.historyService.progress.value >= 100) {
      alert('Cannot search for users: Progress bar is already full. Try resetting the view.')
      return;
    }

    let userID = Number.parseInt(this.inputUserID?.nativeElement.value)

    if (userID < 1 || userID > 20) {
      alert('The user ID must be between 1 and 20.')
      return;
    }

    const status: boolean = await this.userService.searchUser(userID);
    if (!status) {
      alert(`User with ID ${this.inputUserID?.nativeElement.value} does not exist.`)
      return;
    }

    this.historyService.history.next([...this.historyService.history.value, this.inputUserID?.nativeElement.value]);

    // Increment the value of the progress bar by 10% every time a search is requested (assuming that the search was successful)
    if (this.historyService.progress.value + 10 <= 100) {
      this.historyService.progress.next(this.historyService.progress.value + 10)
    }
  }

  resetView() {
    if (!this.inputUserID)
      return;

    this.inputUserID.nativeElement.value = 1;

    // We should also reset the history at this point (according to the exercise description)
    this.historyService.history.next([])

    // And for good measure let's also remove the old user cards
    this.userService.users.next([])

    // Also, reset the progress bar value to 0%
    this.historyService.progress.next(0)
  }

}
