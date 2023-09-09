import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public history: BehaviorSubject<String[]> = new BehaviorSubject<String[]>([]);
  public progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
  }
}
