import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SearchAreaComponent} from './search-area/search-area.component';
import {UserDisplayComponent} from './user-display/user-display.component';
import {SearchHistoryComponent} from './search-history/search-history.component';
import {NgOptimizedImage} from "@angular/common";
import {HistoryService} from "./history.service";
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    SearchAreaComponent,
    UserDisplayComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage
  ],
  providers: [
    HistoryService,
    UserService
  ],
  bootstrap: [
    UserDisplayComponent,
    SearchHistoryComponent,
    SearchAreaComponent
  ]
})
export class AppModule {
}
