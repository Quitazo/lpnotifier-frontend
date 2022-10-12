import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {user} from "../user";
import {userService} from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
