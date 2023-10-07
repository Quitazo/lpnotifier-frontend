import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarModule implements OnInit {
  userRole: string | null = null;
  isLogin: boolean = false;

  constructor(
    public loginService: LoginService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ngOnInit(); // Vuelve a llamar a ngOnInit() cada vez que la ruta cambie
      });
  }

  ngOnInit() {
    this.isLogin = this.loginService.isLoggedIn();
    const token = this.loginService.getToken();

    if (token != null) {
      this.loginService.getUserRole(token).subscribe((role: string) => {
        this.userRole = role;
      },error => {
        this.loginService.logout();
      });
    }
  }

  public logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
