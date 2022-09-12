import { Component, OnInit } from '@angular/core';
import {user} from "../user";
import {userService} from "../user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarModule implements OnInit {
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
