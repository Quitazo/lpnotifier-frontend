import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarModule implements OnInit {

  constructor(public loginService:LoginService) {
  }

  ngOnInit() {
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
