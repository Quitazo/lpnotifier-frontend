import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  goBack() {
    if (!this.loginService.isLoggedIn()){
      this.router.navigate(['..']);
    }else {
      if (this.loginService.getUserRole() == 'ADMIN'){
        this.router.navigate(['/admin'])
      }else if (this.loginService.getUserRole() == 'USER'){
        this.router.navigate(['/user'])
      }
    }
  }
}
