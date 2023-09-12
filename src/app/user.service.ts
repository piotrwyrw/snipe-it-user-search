import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

import api_config from "../../api_config";

import {decode} from "html-entities"
import {HttpClient, HttpHeaders} from "@angular/common/http";

export class User {

  public id: String;
  public avatar: string;
  public username: String;
  public jobTitle: String;
  public firstName: String;
  public lastName: String;
  public language: String

  constructor(id: String, avatar: string, username: String, jobTitle: String, firstName: String, lastName: String, language: String) {
    this.id = id;
    this.avatar = String(avatar);
    this.username = decode(String(username));
    this.jobTitle = decode(String(jobTitle));
    this.firstName = decode(String(firstName));
    this.lastName = decode(String(lastName));
    this.language = decode(String(language));
  }

  static fromJSON(jsonObj: any): User {
    return new User(jsonObj['id'], jsonObj['avatar'], jsonObj['name'], jsonObj['jobtitle'], jsonObj['first_name'], jsonObj['last_name'], jsonObj['locale'])
  }

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor(private http: HttpClient) {
  }

  async searchUser(userID: number): Promise<boolean> {

    this.http.get<any>(`https://develop.snipeitapp.com/api/v1/users/${userID}`, {
      headers: new HttpHeaders()
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${api_config.key}`)
    }).subscribe({
      next: userJSON => {
        if (userJSON) {
          if (userJSON['status'] === 'error') {
            return
          }
          this.users.next([...this.users.value, User.fromJSON(userJSON)])
          console.log(this.users)
        }
      }
    })


    return true;
  }

}

