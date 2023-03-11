import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarModule implements OnInit {

  constructor(public loginService:LoginService, public router:Router) {
  }

  ngOnInit() {
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
