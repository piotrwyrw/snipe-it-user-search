import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

import api_config from "../../api_config";

import {decode} from "html-entities"

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

  constructor() {
  }

  async searchUser(userID: number): Promise<boolean> {
    const userJSON = await fetch(`https://develop.snipeitapp.com/api/v1/users/${userID}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${api_config.key}`,
      }
    }).then(val => val.json()).catch(reason => {
      console.log(`Failed to fetch user: ${reason}`)
      return undefined
    })

    if (userJSON) {
      if (userJSON['status'] === 'error') {
        return false
      }
      this.users.next([...this.users.value, User.fromJSON(userJSON)])
      console.log(this.users)
    }

    return true;
  }

}
