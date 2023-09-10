import {Component, ElementRef, ViewChild} from '@angular/core';
import {HistoryService} from "../history.service";

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent {

  public progressPercentage: number;
  public showHistory: boolean = false;
  public service: HistoryService;
  public historyContent: String[];
  public progressStyle: String;

  constructor(service: HistoryService) {
    this.service = service;

    this.progressPercentage = 0
    this.progressStyle = "width: 0%"

    this.historyContent = service.history.getValue();

    this.service.history.subscribe(val => {
      this.historyContent = val;
    })

    this.service.progress.subscribe(val => {
      this.progressPercentage = val
      this.progressStyle = `width: ${this.progressPercentage}%`
    })
  }

  buttonCaption(): String {
    if (this.showHistory)
      return "Hide history"
    else
      return "Show history"
  }

}
