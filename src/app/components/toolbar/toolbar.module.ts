import { Component, OnInit } from '@angular/core';
import {userService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {user} from "../../services/user";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarModule implements OnInit {
  // users: user[];
  // usr: string;

  constructor() {
    // this.users =[];
    // this.usr = "";
  }

  ngOnInit() {
    // this.getUsers();
  }

  // public getUsers(): void {
  //   this.usrServices.getUsers().subscribe(
  //     (response: user[]) => {
  //       this.users = response;
  //       this.usr = this.users[0].name;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
}
