import {Component, OnInit} from '@angular/core';
import {user} from "./user";
import {HttpErrorResponse} from "@angular/common/http";
import {userService} from "./user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  users: user[];

  constructor(private usrServices: userService) {
    this.users =[];
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.usrServices.getUsers().subscribe(
      (response: user[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
